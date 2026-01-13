const sdk = require('node-appwrite');
const fetch = require('node-fetch');

// Destructure required Appwrite SDK classes
const { Client, Storage, ID, InputFile } = sdk;

// Server-side error codes
const SERVER_ERRORS = {
    PARSE_ERROR: 'S001',
    MISSING_HF_TOKEN: 'S002',
    HF_API_ERROR: 'S003',
    HF_TIMEOUT: 'S004',
    NO_IMAGE_DATA: 'S005',
    STORAGE_ERROR: 'S006',
    SDK_ERROR: 'S007',
    UNKNOWN_ERROR: 'S999'
};

module.exports = async ({ req, res, log, error }) => {
    const startTime = Date.now();

    // Debug logging helper
    const debugLog = (stage, message, data = null) => {
        const timestamp = new Date().toISOString();
        if (data) {
            log(`[${timestamp}] [${stage}] ${message}: ${JSON.stringify(data)}`);
        } else {
            log(`[${timestamp}] [${stage}] ${message}`);
        }
    };

    debugLog('INIT', 'Function execution started');

    // 1. Parse Input
    let payload;
    try {
        const rawBody = req.body || req.payload;
        debugLog('PARSE', 'Raw body type', { type: typeof rawBody, length: rawBody?.length });
        payload = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
        debugLog('PARSE', 'Payload parsed successfully', { prompt: payload.prompt?.substring(0, 100) });
    } catch (e) {
        error(`[${SERVER_ERRORS.PARSE_ERROR}] Payload parse error: ${e.message}`);
        payload = {};
    }

    const prompt = payload.prompt || "Fashion outfit flat lay";
    const negative_prompt = payload.negative_prompt || "";

    debugLog('PROMPT', `Using prompt (${prompt.length} chars)`, { preview: prompt.substring(0, 100) });

    // 2. Validate HF_TOKEN
    if (!process.env.HF_TOKEN) {
        error(`[${SERVER_ERRORS.MISSING_HF_TOKEN}] HF_TOKEN environment variable is missing`);
        return res.json({
            success: false,
            error: `[${SERVER_ERRORS.MISSING_HF_TOKEN}] Server Configuration Error: HF_TOKEN missing`,
            serverError: SERVER_ERRORS.MISSING_HF_TOKEN
        });
    }
    debugLog('CONFIG', 'HF_TOKEN present', { length: process.env.HF_TOKEN.length });

    // 3. Initialize Appwrite
    debugLog('APPWRITE', 'Initializing Appwrite client');
    const client = new Client()
        .setEndpoint('https://sgp.cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const storage = new Storage(client);
    const BUCKET_ID = 'wardrobe_assets';

    debugLog('APPWRITE', 'Client initialized', {
        projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID,
        bucketId: BUCKET_ID
    });

    try {
        // 4. Set timeout and call Hugging Face API
        debugLog('HF_API', 'Preparing Hugging Face API call');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            debugLog('HF_API', 'Timeout triggered (45s)');
            controller.abort();
        }, 45000);

        const hfPayload = {
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            prompt: prompt,
            negative_prompt: negative_prompt,
            num_inference_steps: 25,
            width: 768,
            height: 768,
            guidance_scale: 7.5,
            response_format: "b64_json"
        };

        debugLog('HF_API', 'Calling HF API', { model: hfPayload.model, size: `${hfPayload.width}x${hfPayload.height}` });
        const hfStartTime = Date.now();

        const response = await fetch(
            "https://router.huggingface.co/nscale/v1/images/generations",
            {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(hfPayload),
            }
        );

        clearTimeout(timeoutId);
        const hfDuration = Date.now() - hfStartTime;
        debugLog('HF_API', `Response received in ${hfDuration}ms`, { status: response.status, ok: response.ok });

        // 5. Handle HF API errors
        if (!response.ok) {
            const errText = await response.text();
            error(`[${SERVER_ERRORS.HF_API_ERROR}] HF API Error: ${response.status} - ${errText}`);
            return res.json({
                success: false,
                error: `[${SERVER_ERRORS.HF_API_ERROR}] HF API Error: ${response.status}: ${errText.substring(0, 200)}`,
                serverError: SERVER_ERRORS.HF_API_ERROR,
                httpStatus: response.status
            });
        }

        // 6. Parse HF response
        debugLog('HF_API', 'Parsing HF response');
        const result = await response.json();
        debugLog('HF_API', 'Response parsed', {
            hasData: !!result.data,
            dataLength: result.data?.length,
            hasImage: !!result.image,
            keys: Object.keys(result)
        });

        // 7. Extract base64 image
        let base64Image = '';
        if (result.data && result.data[0] && result.data[0].b64_json) {
            base64Image = result.data[0].b64_json;
            debugLog('IMAGE', 'Extracted b64_json from data[0]', { length: base64Image.length });
        } else if (result.image) {
            base64Image = result.image;
            debugLog('IMAGE', 'Extracted image field', { length: base64Image.length });
        } else {
            error(`[${SERVER_ERRORS.NO_IMAGE_DATA}] No image data in HF response`);
            log("Full HF response keys: " + Object.keys(result).join(', '));
            log("Full HF response: " + JSON.stringify(result).substring(0, 500));
            return res.json({
                success: false,
                error: `[${SERVER_ERRORS.NO_IMAGE_DATA}] AI Provider returned no image data. Response keys: ${Object.keys(result).join(', ')}`,
                serverError: SERVER_ERRORS.NO_IMAGE_DATA,
                responseKeys: Object.keys(result)
            });
        }

        // 8. Clean and convert to buffer
        debugLog('STORAGE', 'Preparing image for upload');
        const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(cleanBase64, 'base64');
        const fileId = ID.unique();

        debugLog('STORAGE', 'Buffer created', {
            originalLength: base64Image.length,
            cleanLength: cleanBase64.length,
            bufferSize: buffer.length,
            fileId: fileId
        });

        // 9. Check SDK
        if (!InputFile) {
            error(`[${SERVER_ERRORS.SDK_ERROR}] SDK InputFile is undefined`);
            return res.json({
                success: false,
                error: `[${SERVER_ERRORS.SDK_ERROR}] SDK InputFile is undefined. Check node-appwrite version.`,
                serverError: SERVER_ERRORS.SDK_ERROR
            });
        }

        // 10. Upload to Appwrite Storage
        debugLog('STORAGE', `Uploading to bucket ${BUCKET_ID}`);
        const uploadStartTime = Date.now();

        const file = await storage.createFile(
            BUCKET_ID,
            fileId,
            InputFile.fromBuffer(buffer, `ai_gen_${fileId}.png`)
        );

        const uploadDuration = Date.now() - uploadStartTime;
        debugLog('STORAGE', `Upload complete in ${uploadDuration}ms`, {
            fileId: file.$id,
            fileName: file.name,
            fileSize: file.sizeOriginal
        });

        // 11. Construct View URL
        const imageUrl = `https://sgp.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${process.env.APPWRITE_FUNCTION_PROJECT_ID}`;

        const totalDuration = Date.now() - startTime;
        debugLog('SUCCESS', `Completed in ${totalDuration}ms`, {
            fileId: file.$id,
            imageUrl: imageUrl,
            hfDuration,
            uploadDuration,
            totalDuration
        });

        // 12. Return success response
        return res.json({
            success: true,
            imageUrl: imageUrl,
            fileId: file.$id,
            debug: {
                totalDuration,
                hfDuration,
                uploadDuration,
                bufferSize: buffer.length
            }
        });

    } catch (e) {
        const totalDuration = Date.now() - startTime;
        error(`[${SERVER_ERRORS.UNKNOWN_ERROR}] Execution Error after ${totalDuration}ms: ${e.message}`);
        error(`Stack: ${e.stack}`);

        if (e.name === 'AbortError') {
            return res.json({
                success: false,
                error: `[${SERVER_ERRORS.HF_TIMEOUT}] Request timeout - AI model is taking too long (45s limit)`,
                serverError: SERVER_ERRORS.HF_TIMEOUT,
                duration: totalDuration
            });
        }

        return res.json({
            success: false,
            error: `[${SERVER_ERRORS.UNKNOWN_ERROR}] ${e.message}`,
            serverError: SERVER_ERRORS.UNKNOWN_ERROR,
            duration: totalDuration
        });
    }
};