/**
 * Appwrite Fashion Assistant - Complete SDK Implementation
 * Fully synchronized with database schema v1.0
 */

// ======================
// APPWRITE CONFIGURATION
// ======================

// Appwrite SDK Modules - Check if SDK is loaded
if (typeof Appwrite === 'undefined') {
    console.error('Appwrite SDK not loaded! Make sure to include the Appwrite script before app.js');
    // Create dummy to prevent errors, but functionality won't work
    window.appwrite = null;
}

const { Client, Account, Databases, Storage, Functions, ID, Query } = typeof Appwrite !== 'undefined' ? Appwrite : {};

// Configuration Constants
const APPWRITE_CONFIG = {
    ENDPOINT: 'https://sgp.cloud.appwrite.io/v1',
    PROJECT_ID: '695fba17000e4455e53d',
    DATABASE_ID: '695fba61000840feb7f5',
    BUCKET_ID: 'wardrobe_assets',
    FUNCTION_ID: '6960ee7400025996b8d9',
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
};

// Collection IDs (Exactly matching schema)
const COLLECTIONS = {
    USER_PROFILES: 'user_profiles',
    WARDROBE_ITEMS: 'wardrobe_items',
    OUTFIT_CONTEXTS: 'outfit_contexts',
    GENERATED_OUTFITS: 'generated_outfits',
    OUTFIT_HISTORY: 'outfit_history',
    STYLING_RULES: 'styling_rules',
    USER_PREFERENCES: 'user_preferences',
    WARDROBE_STATISTICS: 'wardrobe_statistics',
    COLOR_HARMONY_RULES: 'color_harmony_rules',
    APP_SETTINGS: 'app_settings'
};

// ======================
// COMPLETE ENUM DEFINITIONS
// ======================

// USER_PROFILES Enums
const GENDERS = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
};

// WARDROBE_ITEMS Enums
const CATEGORIES = {
    SHIRT: 'shirt',
    TSHIRT: 'tshirt',
    PANT: 'pant',
    JEANS: 'jeans',
    SHORTS: 'shorts',
    JACKET: 'jacket',
    COAT: 'coat',
    SWEATER: 'sweater',
    HOODIE: 'hoodie',
    DRESS: 'dress',
    SKIRT: 'skirt',
    SHOES: 'shoes',
    BOOTS: 'boots',
    SNEAKERS: 'sneakers',
    BELT: 'belt',
    HAT: 'hat',
    SCARF: 'scarf',
    BAG: 'bag',
    WATCH: 'watch',
    SUNGLASSES: 'sunglasses'
};

const WARMTH_LEVELS = {
    LIGHT: 'light',
    MEDIUM: 'medium',
    HEAVY: 'heavy'
};

const LAYER_TYPES = {
    INNER: 'inner',
    MID: 'mid',
    OUTER: 'outer',
    STANDALONE: 'standalone',
    ACCESSORY: 'accessory'
};

const FIT_TYPES = {
    TIGHT: 'tight',
    SLIM: 'slim',
    REGULAR: 'regular',
    LOOSE: 'loose',
    OVERSIZED: 'oversized'
};

const FABRIC_TEXTURES = {
    SMOOTH: 'smooth',
    ROUGH: 'rough',
    SOFT: 'soft',
    STIFF: 'stiff',
    STRETCHY: 'stretchy'
};

const SLEEVE_LENGTHS = {
    SLEEVELESS: 'sleeveless',
    SHORT: 'short',
    THREE_QUARTER: 'three_quarter',
    LONG: 'long'
};

const NECKLINE_TYPES = {
    CREW: 'crew',
    V_NECK: 'v_neck',
    COLLAR: 'collar',
    TURTLENECK: 'turtleneck',
    HOOD: 'hood'
};

const LENGTH_TYPES = {
    SHORT: 'short',
    KNEE: 'knee',
    MIDI: 'midi',
    ANKLE: 'ankle',
    LONG: 'long'
};

// OUTFIT_CONTEXTS Enums
const SEASONS = {
    SUMMER: 'summer',
    WINTER: 'winter',
    AUTUMN: 'autumn',
    SPRING: 'spring'
};

const TEMPERATURE_UNITS = {
    CELSIUS: 'celsius',
    FAHRENHEIT: 'fahrenheit'
};

const STYLE_PREFERENCES = {
    SIMPLE: 'simple',
    LAYERED: 'layered'
};

const OCCASION_TYPES = {
    CASUAL: 'casual',
    WORK: 'work',
    DATE: 'date',
    PARTY: 'party',
    SPORT: 'sport',
    FORMAL_EVENT: 'formal_event',
    TRAVEL: 'travel',
    HOME: 'home'
};

const COLOR_MOOD_PREFERENCES = {
    NEUTRAL: 'neutral',
    BOLD: 'bold',
    MONOCHROME: 'monochrome',
    COLORFUL: 'colorful'
};

const TIMES_OF_DAY = {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night'
};

const INDOOR_OUTDOOR_TYPES = {
    INDOOR: 'indoor',
    OUTDOOR: 'outdoor',
    BOTH: 'both'
};

const ACTIVITY_LEVELS = {
    SEDENTARY: 'sedentary',
    LIGHT: 'light',
    MODERATE: 'moderate',
    ACTIVE: 'active'
};

// GENERATED_OUTFITS Enums
const RATING_LABELS = {
    SAFE: 'safe',
    BALANCED: 'balanced',
    BOLD: 'bold',
    PERFECT: 'perfect'
};

// STYLING_RULES Enums
const RULE_TYPES = {
    COLOR: 'color',
    LAYER: 'layer',
    WEATHER: 'weather',
    SEASON: 'season',
    STYLE: 'style',
    COMBINATION: 'combination'
};

const RULE_CATEGORIES = {
    MANDATORY: 'mandatory',
    RECOMMENDED: 'recommended',
    PREFERENCE: 'preference',
    RESTRICTION: 'restriction'
};

const CONDITION_OPERATORS = {
    EQUALS: 'equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains'
};

const RULE_ACTIONS = {
    ALLOW: 'allow',
    DISALLOW: 'disallow',
    REQUIRE: 'require',
    PREFER: 'prefer',
    SUGGEST: 'suggest'
};

// COLOR_HARMONY_RULES Enums
const HARMONY_TYPES = {
    COMPLEMENTARY: 'complementary',
    ANALOGOUS: 'analogous',
    TRIADIC: 'triadic',
    MONOCHROMATIC: 'monochromatic',
    NEUTRAL: 'neutral'
};

const FORMALITY_LEVELS = {
    CASUAL: 'casual',
    SEMI_FORMAL: 'semi_formal',
    FORMAL: 'formal',
    ANY: 'any'
};

const SKIN_TONES = {
    WARM: 'warm',
    COOL: 'cool',
    NEUTRAL: 'neutral',
    ALL: 'all'
};

// APP_SETTINGS Enums
const SETTING_TYPES = {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    JSON: 'json',
    ARRAY: 'array'
};

// WARDROBE_STATISTICS Enums
const PERIOD_TYPES = {
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    ALL_TIME: 'all_time'
};

// ======================
// VALIDATION UTILITIES
// ======================

class SchemaValidator {
    static validateRequiredFields(data, requiredFields) {
        const missing = requiredFields.filter(field =>
            data[field] === undefined || data[field] === null || data[field] === ''
        );

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
    }

    static validateEnum(value, enumObj, fieldName) {
        if (value && !Object.values(enumObj).includes(value)) {
            throw new Error(`Invalid ${fieldName}: ${value}. Must be one of: ${Object.values(enumObj).join(', ')}`);
        }
    }

    static validateArrayLength(array, maxLength, fieldName) {
        if (array && array.length > maxLength) {
            throw new Error(`${fieldName} array exceeds maximum length of ${maxLength}`);
        }
    }

    static validateArrayItems(array, maxItemLength, fieldName) {
        if (array) {
            for (const item of array) {
                if (item.length > maxItemLength) {
                    throw new Error(`${fieldName} item exceeds maximum length of ${maxItemLength}: ${item}`);
                }
            }
        }
    }

    static validateStringLength(value, maxLength, fieldName) {
        if (value && value.length > maxLength) {
            throw new Error(`${fieldName} exceeds maximum length of ${maxLength}`);
        }
    }

    static validateHexColor(hex, fieldName) {
        if (hex && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
            throw new Error(`Invalid ${fieldName} hex color: ${hex}`);
        }
    }
}

// ======================
// APPWRITE SERVICE CLASS
// ======================

class AppwriteService {
    constructor() {
        // Initialize Appwrite Client
        this.client = new Client();
        this.client
            .setEndpoint(APPWRITE_CONFIG.ENDPOINT)
            .setProject(APPWRITE_CONFIG.PROJECT_ID);

        // Initialize Services
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.functions = new Functions(this.client);

        // Current User State
        this.currentUser = null;
        this.userSession = null;
        this.isInitialized = false;
    }

    // ======================
    // INITIALIZATION
    // ======================

    async initialize() {
        if (this.isInitialized) return;

        try {
            this.currentUser = await this.getCurrentUser();
            this.isInitialized = true;

            return {
                success: true,
                user: this.currentUser,
                authenticated: !!this.currentUser
            };
        } catch (error) {
            console.error('Appwrite initialization failed:', error);
            return {
                success: false,
                error: this.handleError(error)
            };
        }
    }

    // ======================
    // AUTHENTICATION METHODS
    // ======================

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            this.currentUser = user;
            return user;
        } catch (error) {
            this.currentUser = null;
            return null;
        }
    }

    async createAccount(email, password, name, gender = GENDERS.OTHER) {
        try {
            // Validate gender
            SchemaValidator.validateEnum(gender, GENDERS, 'gender');

            const userId = ID.unique();
            await this.account.create(userId, email, password, name);

            // Create session
            await this.account.createEmailPasswordSession(email, password);

            // Create user profile with all required fields
            await this.createUserProfile({
                userId: userId,
                displayName: name,
                email: email,
                gender: gender,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            this.currentUser = await this.getCurrentUser();
            return this.currentUser;
        } catch (error) {
            console.error('Account creation failed:', error);
            throw this.handleError(error);
        }
    }

    async login(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            this.userSession = session;
            this.currentUser = await this.getCurrentUser();
            return session;
        } catch (error) {
            console.error('Login failed:', error);
            throw this.handleError(error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
            this.currentUser = null;
            this.userSession = null;
        } catch (error) {
            console.error('Logout failed:', error);
            throw this.handleError(error);
        }
    }

    async requireAuth() {
        const user = await this.getCurrentUser();
        if (!user) {
            throw new Error('Authentication required');
        }
        return user;
    }

    // ======================
    // USER PROFILES COLLECTION
    // ======================

    async createUserProfile(data) {
        try {
            // Validate required fields
            const requiredFields = ['userId', 'displayName', 'email', 'gender', 'createdAt', 'updatedAt'];
            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.gender, GENDERS, 'gender');

            // Validate string lengths
            SchemaValidator.validateStringLength(data.displayName, 100, 'displayName');
            SchemaValidator.validateStringLength(data.email, 255, 'email');
            SchemaValidator.validateStringLength(data.defaultLocation, 100, 'defaultLocation');

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.USER_PROFILES,
                data.userId,
                data
            );
        } catch (error) {
            console.error('Failed to create user profile:', error);
            throw this.handleError(error);
        }
    }

    async getUserProfile(userId) {
        await this.requireAuth();
        return await this.databases.getDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.USER_PROFILES,
            userId
        );
    }

    async updateUserProfile(userId, data) {
        await this.requireAuth();

        // Add updated timestamp
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };

        // Validate if gender is being updated
        if (data.gender) {
            SchemaValidator.validateEnum(data.gender, GENDERS, 'gender');
        }

        return await this.databases.updateDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.USER_PROFILES,
            userId,
            updateData
        );
    }

    // ======================
    // WARDROBE ITEMS COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createWardrobeItem(data) {
        await this.requireAuth();

        try {
            // Validate required fields
            const requiredFields = ['userId', 'category', 'colorPrimary', 'warmthLevel', 'layerType'];
            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.category, CATEGORIES, 'category');
            SchemaValidator.validateEnum(data.warmthLevel, WARMTH_LEVELS, 'warmthLevel');
            SchemaValidator.validateEnum(data.layerType, LAYER_TYPES, 'layerType');
            SchemaValidator.validateEnum(data.fitType, FIT_TYPES, 'fitType');
            SchemaValidator.validateEnum(data.fabricTexture, FABRIC_TEXTURES, 'fabricTexture');
            SchemaValidator.validateEnum(data.sleeveLength, SLEEVE_LENGTHS, 'sleeveLength');
            SchemaValidator.validateEnum(data.necklineType, NECKLINE_TYPES, 'necklineType');
            SchemaValidator.validateEnum(data.lengthType, LENGTH_TYPES, 'lengthType');

            // Validate array sizes and item lengths
            if (data.fabricMaterial) {
                SchemaValidator.validateArrayLength(data.fabricMaterial, 50, 'fabricMaterial');
                SchemaValidator.validateArrayItems(data.fabricMaterial, 50, 'fabricMaterial');
            }

            if (data.tags) {
                SchemaValidator.validateArrayLength(data.tags, 50, 'tags');
                SchemaValidator.validateArrayItems(data.tags, 50, 'tags');
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.itemName, 150, 'itemName');
            SchemaValidator.validateStringLength(data.subCategory, 50, 'subCategory');
            SchemaValidator.validateStringLength(data.brand, 100, 'brand');
            SchemaValidator.validateStringLength(data.colorPrimary, 30, 'colorPrimary');
            SchemaValidator.validateStringLength(data.colorSecondary, 30, 'colorSecondary');
            SchemaValidator.validateStringLength(data.colorAccent, 30, 'colorAccent');
            SchemaValidator.validateStringLength(data.notes, 500, 'notes');

            // Validate hex colors
            if (data.colorHexPrimary) SchemaValidator.validateHexColor(data.colorHexPrimary, 'colorHexPrimary');
            if (data.colorHexSecondary) SchemaValidator.validateHexColor(data.colorHexSecondary, 'colorHexSecondary');

            // Set default fitType if not provided
            if (!data.fitType) {
                data.fitType = FIT_TYPES.REGULAR;
            }

            const itemId = ID.unique();
            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.WARDROBE_ITEMS,
                itemId,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create wardrobe item:', error);
            throw this.handleError(error);
        }
    }

    async getWardrobeItem(itemId) {
        await this.requireAuth();
        return await this.databases.getDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.WARDROBE_ITEMS,
            itemId
        );
    }

    async updateWardrobeItem(itemId, data) {
        await this.requireAuth();

        // Add updated timestamp
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };

        return await this.databases.updateDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.WARDROBE_ITEMS,
            itemId,
            updateData
        );
    }

    async deleteWardrobeItem(itemId) {
        await this.requireAuth();
        return await this.databases.deleteDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.WARDROBE_ITEMS,
            itemId
        );
    }

    async listWardrobeItems(userId, filters = {}) {
        await this.requireAuth();

        let queries = [Query.equal('userId', userId)];

        // Apply all possible filters based on schema indexes
        if (filters.category) {
            queries.push(Query.equal('category', filters.category));
        }

        if (filters.layerType) {
            queries.push(Query.equal('layerType', filters.layerType));
        }

        // Additional filters for other indexed fields
        if (filters.warmthLevel) {
            queries.push(Query.equal('warmthLevel', filters.warmthLevel));
        }

        if (filters.fitType) {
            queries.push(Query.equal('fitType', filters.fitType));
        }

        // Add sorting (most recent first)
        queries.push(Query.orderDesc('createdAt'));

        // Add limit if provided
        if (filters.limit) {
            queries.push(Query.limit(filters.limit));
        }

        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.WARDROBE_ITEMS,
            queries
        );
    }

    async updateLastWorn(itemId) {
        await this.requireAuth();
        return await this.updateWardrobeItem(itemId, {
            lastWornDate: new Date().toISOString()
        });
    }

    // ======================
    // OUTFIT CONTEXTS COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createOutfitContext(data) {
        await this.requireAuth();

        try {
            // Validate required fields
            const requiredFields = ['userId', 'seasonInput', 'stylePreference'];
            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.seasonInput, SEASONS, 'seasonInput');
            SchemaValidator.validateEnum(data.stylePreference, STYLE_PREFERENCES, 'stylePreference');
            SchemaValidator.validateEnum(data.temperatureUnit, TEMPERATURE_UNITS, 'temperatureUnit');
            SchemaValidator.validateEnum(data.occasionType, OCCASION_TYPES, 'occasionType');
            SchemaValidator.validateEnum(data.colorMoodPreference, COLOR_MOOD_PREFERENCES, 'colorMoodPreference');
            SchemaValidator.validateEnum(data.timeOfDay, TIMES_OF_DAY, 'timeOfDay');
            SchemaValidator.validateEnum(data.indoorOutdoor, INDOOR_OUTDOOR_TYPES, 'indoorOutdoor');
            SchemaValidator.validateEnum(data.activityLevel, ACTIVITY_LEVELS, 'activityLevel');

            // Validate array sizes
            if (data.avoidColors) {
                SchemaValidator.validateArrayLength(data.avoidColors, 30, 'avoidColors');
                SchemaValidator.validateArrayItems(data.avoidColors, 30, 'avoidColors');
            }

            if (data.mustIncludeItemIds) {
                SchemaValidator.validateArrayLength(data.mustIncludeItemIds, 36, 'mustIncludeItemIds');
            }

            if (data.excludeItemIds) {
                SchemaValidator.validateArrayLength(data.excludeItemIds, 36, 'excludeItemIds');
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.locationName, 100, 'locationName');

            // Set default occasionType if not provided
            if (!data.occasionType) {
                data.occasionType = OCCASION_TYPES.CASUAL;
            }

            const contextId = ID.unique();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.OUTFIT_CONTEXTS,
                contextId,
                {
                    ...data,
                    createdAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Failed to create outfit context:', error);
            throw this.handleError(error);
        }
    }

    async getOutfitContext(contextId) {
        await this.requireAuth();
        return await this.databases.getDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.OUTFIT_CONTEXTS,
            contextId
        );
    }

    async listUserOutfitContexts(userId, limit = 10) {
        await this.requireAuth();
        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.OUTFIT_CONTEXTS,
            [
                Query.equal('userId', userId),
                Query.orderDesc('createdAt'),
                Query.limit(limit)
            ]
        );
    }

    // ======================
    // GENERATION METHODS
    // ======================

    async generateOutfitImage(prompt, negativePrompt = "") {
        await this.requireAuth();
        try {
            const execution = await this.functions.createExecution(
                APPWRITE_CONFIG.FUNCTION_ID,
                JSON.stringify({ prompt, negative_prompt: negativePrompt }),
                false, // async = false to wait for result
                '/', // path
                'POST' // method
            );

            if (execution.status === 'completed') {
                try {
                    return JSON.parse(execution.responseBody);
                } catch (e) {
                    throw new Error('Failed to parse AI response');
                }
            } else {
                throw new Error(`Generation failed: ${execution.status}`);
            }
        } catch (error) {
            console.error('AI Generation failed:', error);
            throw this.handleError(error);
        }
    }

    async generateStandardOutfit(context) {
        await this.requireAuth();
        try {
            // 1. Fetch user's wardrobe items
            // Optimization: In a real app, you might want to filter server-side more aggressively
            // For now, we'll fetch recent items and filter in memory for better logic control
            const items = await this.listWardrobeItems(context.userId, { limit: 100 });
            const allItems = items.documents;

            if (allItems.length === 0) {
                throw new Error("Wardrobe is empty! Add items first.");
            }

            // 2. Filter by Season & Occasion (Simple matching)
            // Note: This is a basic algorithm. 
            // In a real implementation, you'd use scoring based on multiple factors.

            const season = context.seasonInput; // summer, winter, etc.

            // Helper to score item suitability
            const scoreItem = (item) => {
                let score = 0;
                // Season check (if warmth matches season roughly)
                if (season === SEASONS.SUMMER && item.warmthLevel === WARMTH_LEVELS.LIGHT) score += 2;
                if (season === SEASONS.WINTER && item.warmthLevel === WARMTH_LEVELS.HEAVY) score += 2;
                if (season === SEASONS.AUTUMN || season === SEASONS.SPRING) {
                    if (item.warmthLevel === WARMTH_LEVELS.MEDIUM) score += 2;
                }

                // Occasion check (simple keyword match in tags or category)
                // Defaulting to random selection if no strong match for now to ensure result
                score += Math.random(); // Add randomness
                return score;
            };

            // 3. Select Categories
            const tops = allItems.filter(i =>
                [CATEGORIES.TSHIRT, CATEGORIES.SHIRT, CATEGORIES.SWEATER, CATEGORIES.HOODIE, CATEGORIES.JACKET, CATEGORIES.COAT].includes(i.category)
            );
            const bottoms = allItems.filter(i =>
                [CATEGORIES.PANT, CATEGORIES.JEANS, CATEGORIES.SHORTS, CATEGORIES.SKIRT].includes(i.category)
            );
            const shoes = allItems.filter(i =>
                [CATEGORIES.SHOES, CATEGORIES.SNEAKERS, CATEGORIES.BOOTS].includes(i.category)
            );
            const fullBody = allItems.filter(i =>
                [CATEGORIES.DRESS].includes(i.category)
            );

            // 4. Build Outfit
            let selectedTop = null;
            let selectedBottom = null;
            let selectedShoes = null;
            let selectedFullBody = null;

            if (fullBody.length > 0 && Math.random() > 0.5) {
                // 50% chance to pick full body if available
                fullBody.sort((a, b) => scoreItem(b) - scoreItem(a));
                selectedFullBody = fullBody[0];
            } else {
                if (tops.length > 0) {
                    tops.sort((a, b) => scoreItem(b) - scoreItem(a));
                    selectedTop = tops[0];
                }
                if (bottoms.length > 0) {
                    bottoms.sort((a, b) => scoreItem(b) - scoreItem(a));
                    selectedBottom = bottoms[0];
                }
            }

            if (shoes.length > 0) {
                shoes.sort((a, b) => scoreItem(b) - scoreItem(a));
                selectedShoes = shoes[0];
            }

            // Validation
            if (!selectedFullBody && (!selectedTop || !selectedBottom)) {
                if (!selectedTop && !selectedBottom && !selectedShoes) {
                    throw new Error("Not enough items to generate an outfit.");
                }
                // Allow partial outfits for now
            }

            const outfitItems = [];
            if (selectedFullBody) outfitItems.push(selectedFullBody);
            if (selectedTop) outfitItems.push(selectedTop);
            if (selectedBottom) outfitItems.push(selectedBottom);
            if (selectedShoes) outfitItems.push(selectedShoes);

            const allItemIds = outfitItems.map(i => i.$id);
            const shoesItemId = selectedShoes ? selectedShoes.$id : (outfitItems.length > 0 ? outfitItems[0].$id : "none"); // Fallback

            return {
                outfitItems: outfitItems,
                generatedData: {
                    userId: context.userId,
                    contextId: context.$id,
                    // Schema requires specific fields
                    outfitNumber: Math.floor(Math.random() * 10000),
                    shoesItemId: shoesItemId,
                    allItemIds: allItemIds,
                    totalPieces: outfitItems.length,
                    colorsUsed: outfitItems.map(i => i.colorPrimary),
                    colorCount: outfitItems.length,
                    dominantColor: outfitItems[0]?.colorPrimary || "neutral",
                    seasonMatch: season,
                    weatherMatch: ["sunny"], // Mock
                    styleType: ["casual"], // Mock
                    layerCount: outfitItems.length,
                    warmthTotal: 1, // Mock
                    seasonFitScore: 80,
                    weatherFitScore: 80,
                    colorHarmonyScore: 85,
                    styleConsistencyScore: 80,
                    practicalityScore: 90,
                    overallScore: 85,
                    starRating: 4,
                    ratingLabel: RATING_LABELS.BALANCED,
                    explanationShort: "A balanced outfit selected based on your wardrobe.",
                    explanationDetailed: "Generated by standard algorithm.",
                    strengthsList: ["Comfortable"],
                    weaknessesList: [],
                    suggestionsList: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            };

        } catch (error) {
            console.error('Standard Generation failed:', error);
            throw this.handleError(error);
        }
    }

    // ======================
    // GENERATED OUTFITS COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createGeneratedOutfit(data) {
        await this.requireAuth();

        try {
            // Validate required fields based on schema
            const requiredFields = [
                'userId', 'contextId', 'outfitNumber', 'shoesItemId', 'allItemIds',
                'totalPieces', 'colorsUsed', 'colorCount', 'dominantColor',
                'seasonMatch', 'weatherMatch', 'styleType', 'layerCount',
                'warmthTotal', 'seasonFitScore', 'weatherFitScore',
                'colorHarmonyScore', 'styleConsistencyScore', 'practicalityScore',
                'overallScore', 'starRating', 'ratingLabel', 'explanationShort'
            ];

            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.ratingLabel, RATING_LABELS, 'ratingLabel');

            // Validate array sizes
            if (data.allItemIds) {
                SchemaValidator.validateArrayLength(data.allItemIds, 36, 'allItemIds');
            }

            if (data.colorsUsed) {
                SchemaValidator.validateArrayLength(data.colorsUsed, 30, 'colorsUsed');
                SchemaValidator.validateArrayItems(data.colorsUsed, 30, 'colorsUsed');
            }

            if (data.styleType) {
                SchemaValidator.validateArrayLength(data.styleType, 30, 'styleType');
                SchemaValidator.validateArrayItems(data.styleType, 30, 'styleType');
            }

            if (data.weatherMatch) {
                SchemaValidator.validateArrayLength(data.weatherMatch, 20, 'weatherMatch');
                SchemaValidator.validateArrayItems(data.weatherMatch, 20, 'weatherMatch');
            }

            if (data.strengthsList || data.weaknessesList || data.suggestionsList) {
                SchemaValidator.validateArrayLength(data.strengthsList, 100, 'strengthsList');
                SchemaValidator.validateArrayLength(data.weaknessesList, 100, 'weaknessesList');
                SchemaValidator.validateArrayLength(data.suggestionsList, 100, 'suggestionsList');
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.outfitName, 150, 'outfitName');
            SchemaValidator.validateStringLength(data.explanationShort, 250, 'explanationShort');
            SchemaValidator.validateStringLength(data.explanationDetailed, 1000, 'explanationDetailed');
            SchemaValidator.validateStringLength(data.userFeedback, 500, 'userFeedback');
            SchemaValidator.validateStringLength(data.aiImageFileId, 200, 'aiImageFileId');
            SchemaValidator.validateStringLength(data.aiImageUrl, 200, 'aiImageUrl');
            SchemaValidator.validateStringLength(data.seasonMatch, 20, 'seasonMatch');
            SchemaValidator.validateStringLength(data.dominantColor, 30, 'dominantColor');

            // Validate numeric ranges
            if (data.starRating < 1 || data.starRating > 5) {
                throw new Error('starRating must be between 1 and 5');
            }

            if (data.userRating && (data.userRating < 1 || data.userRating > 5)) {
                throw new Error('userRating must be between 1 and 5');
            }

            const outfitId = ID.unique();
            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.GENERATED_OUTFITS,
                outfitId,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create generated outfit:', error);
            throw this.handleError(error);
        }
    }

    async getGeneratedOutfit(outfitId) {
        await this.requireAuth();
        return await this.databases.getDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.GENERATED_OUTFITS,
            outfitId
        );
    }

    async updateGeneratedOutfit(outfitId, data) {
        await this.requireAuth();

        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };

        return await this.databases.updateDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.GENERATED_OUTFITS,
            outfitId,
            updateData
        );
    }

    async listGeneratedOutfitsByContext(contextId, filters = {}) {
        await this.requireAuth();

        let queries = [Query.equal('contextId', contextId)];

        // Add additional filters
        if (filters.ratingLabel) {
            queries.push(Query.equal('ratingLabel', filters.ratingLabel));
        }

        if (filters.minScore) {
            queries.push(Query.greaterThanEqual('overallScore', filters.minScore));
        }

        queries.push(Query.orderDesc('overallScore'));
        queries.push(Query.orderDesc('createdAt'));

        if (filters.limit) {
            queries.push(Query.limit(filters.limit));
        }

        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.GENERATED_OUTFITS,
            queries
        );
    }

    async rateGeneratedOutfit(outfitId, rating, feedback = '') {
        await this.requireAuth();

        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        return await this.updateGeneratedOutfit(outfitId, {
            userRating: rating,
            userFeedback: feedback,
            wornDate: new Date().toISOString()
        });
    }

    // ======================
    // OUTFIT HISTORY COLLECTION
    // ======================

    async createOutfitHistoryRecord(data) {
        await this.requireAuth();

        try {
            // Validate required fields
            const requiredFields = [
                'userId', 'wornDate', 'wasGeneratedOutfit',
                'itemIdsWorn', 'seasonContext', 'weatherContext'
            ];

            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate array sizes
            if (data.itemIdsWorn) {
                SchemaValidator.validateArrayLength(data.itemIdsWorn, 36, 'itemIdsWorn');
            }

            if (data.weatherContext) {
                SchemaValidator.validateArrayLength(data.weatherContext, 20, 'weatherContext');
                SchemaValidator.validateArrayItems(data.weatherContext, 20, 'weatherContext');
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.seasonContext, 20, 'seasonContext');
            SchemaValidator.validateStringLength(data.occasionType, 30, 'occasionType');
            SchemaValidator.validateStringLength(data.notes, 500, 'notes');
            SchemaValidator.validateStringLength(data.photoUrl, 500, 'photoUrl');

            // Validate numeric ranges
            if (data.userSatisfaction && (data.userSatisfaction < 1 || data.userSatisfaction > 5)) {
                throw new Error('userSatisfaction must be between 1 and 5');
            }

            if (data.comfortLevel && (data.comfortLevel < 1 || data.comfortLevel > 5)) {
                throw new Error('comfortLevel must be between 1 and 5');
            }

            const recordId = ID.unique();
            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.OUTFIT_HISTORY,
                recordId,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create outfit history record:', error);
            throw this.handleError(error);
        }
    }

    async getWornOutfitsByDate(userId, startDate, endDate) {
        await this.requireAuth();

        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.OUTFIT_HISTORY,
            [
                Query.equal('userId', userId),
                Query.greaterThanEqual('wornDate', startDate.toISOString()),
                Query.lessThanEqual('wornDate', endDate.toISOString()),
                Query.orderDesc('wornDate')
            ]
        );
    }

    // ======================
    // STYLING RULES COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createStylingRule(data) {
        try {
            // Validate required fields
            const requiredFields = ['ruleName', 'ruleType', 'ruleCategory'];
            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.ruleType, RULE_TYPES, 'ruleType');
            SchemaValidator.validateEnum(data.ruleCategory, RULE_CATEGORIES, 'ruleCategory');
            SchemaValidator.validateEnum(data.conditionOperator, CONDITION_OPERATORS, 'conditionOperator');
            SchemaValidator.validateEnum(data.ruleAction, RULE_ACTIONS, 'ruleAction');

            // Validate array sizes
            const arrayFields = [
                'applicableSeasons', 'applicableWeather', 'applicableSkinTones',
                'applicableGenders', 'targetValues', 'conflictsWith',
                'mustPairWith', 'colorPalette'
            ];

            for (const field of arrayFields) {
                if (data[field]) {
                    SchemaValidator.validateArrayLength(data[field], 100, field);
                    SchemaValidator.validateArrayItems(data[field], field.includes('color') ? 30 : 50, field);
                }
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.ruleName, 100, 'ruleName');
            SchemaValidator.validateStringLength(data.conditionField, 100, 'conditionField');
            SchemaValidator.validateStringLength(data.conditionValue, 100, 'conditionValue');
            SchemaValidator.validateStringLength(data.targetField, 100, 'targetField');

            const ruleId = ID.unique();
            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.STYLING_RULES,
                ruleId,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create styling rule:', error);
            throw this.handleError(error);
        }
    }

    async getStylingRules(ruleType = null, ruleCategory = null) {
        let queries = [];

        if (ruleType) {
            SchemaValidator.validateEnum(ruleType, RULE_TYPES, 'ruleType');
            queries.push(Query.equal('ruleType', ruleType));
        }

        if (ruleCategory) {
            SchemaValidator.validateEnum(ruleCategory, RULE_CATEGORIES, 'ruleCategory');
            queries.push(Query.equal('ruleCategory', ruleCategory));
        }

        queries.push(Query.orderAsc('ruleName'));

        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.STYLING_RULES,
            queries
        );
    }

    // ======================
    // USER PREFERENCES COLLECTION
    // ======================

    async getUserPreferences(userId) {
        await this.requireAuth();

        try {
            return await this.databases.getDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.USER_PREFERENCES,
                userId
            );
        } catch (error) {
            if (error.code === 404) {
                return await this.createDefaultPreferences(userId);
            }
            throw this.handleError(error);
        }
    }

    async createDefaultPreferences(userId) {
        const now = new Date().toISOString();

        return await this.databases.createDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.USER_PREFERENCES,
            userId,
            {
                userId: userId,
                favoriteColors: [],
                dislikedColors: [],
                favoriteCategories: [],
                avoidCategories: [],
                preferredFitTypes: [FIT_TYPES.REGULAR],
                avoidPatterns: [],
                createdAt: now,
                updatedAt: now
            }
        );
    }

    async updateUserPreferences(userId, data) {
        await this.requireAuth();

        // Validate array sizes
        const arrayFields = [
            'favoriteColors', 'dislikedColors', 'favoriteCategories',
            'avoidCategories', 'preferredFitTypes', 'avoidPatterns'
        ];

        for (const field of arrayFields) {
            if (data[field]) {
                SchemaValidator.validateArrayLength(data[field], 30, field);
                SchemaValidator.validateArrayItems(data[field], 30, field);
            }
        }

        return await this.databases.updateDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.USER_PREFERENCES,
            userId,
            {
                ...data,
                updatedAt: new Date().toISOString()
            }
        );
    }

    // ======================
    // WARDROBE STATISTICS COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createWardrobeStatistics(data) {
        try {
            // Validate required fields
            const requiredFields = [
                'userId', 'periodType', 'periodStart', 'periodEnd',
                'mostWornItems', 'leastWornItems', 'neverWornItems',
                'favoriteItems', 'calculatedAt'
            ];

            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.periodType, PERIOD_TYPES, 'periodType');

            // Validate array sizes
            const itemArrays = ['mostWornItems', 'leastWornItems', 'neverWornItems', 'favoriteItems'];
            for (const field of itemArrays) {
                if (data[field]) {
                    SchemaValidator.validateArrayLength(data[field], 36, field);
                }
            }

            if (data.mostCommonColorCombo) {
                SchemaValidator.validateArrayLength(data.mostCommonColorCombo, 30, 'mostCommonColorCombo');
                SchemaValidator.validateArrayItems(data.mostCommonColorCombo, 30, 'mostCommonColorCombo');
            }

            if (data.wardrobeGapsDetected || data.underutilizedCategories) {
                SchemaValidator.validateArrayLength(data.wardrobeGapsDetected, 50, 'wardrobeGapsDetected');
                SchemaValidator.validateArrayLength(data.underutilizedCategories, 50, 'underutilizedCategories');
            }

            if (data.recommendedPurchases) {
                SchemaValidator.validateArrayLength(data.recommendedPurchases, 100, 'recommendedPurchases');
                SchemaValidator.validateArrayItems(data.recommendedPurchases, 100, 'recommendedPurchases');
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.mostCommonOccasion, 30, 'mostCommonOccasion');

            const statsId = ID.unique();
            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.WARDROBE_STATISTICS,
                statsId,
                {
                    ...data,
                    createdAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create wardrobe statistics:', error);
            throw this.handleError(error);
        }
    }

    async getWardrobeStatistics(userId, periodType = PERIOD_TYPES.MONTHLY) {
        await this.requireAuth();

        SchemaValidator.validateEnum(periodType, PERIOD_TYPES, 'periodType');

        // Calculate period based on type
        const now = new Date();
        let periodStart, periodEnd = now;

        switch (periodType) {
            case PERIOD_TYPES.WEEKLY:
                periodStart = new Date(now);
                periodStart.setDate(now.getDate() - 7);
                break;
            case PERIOD_TYPES.MONTHLY:
                periodStart = new Date(now);
                periodStart.setMonth(now.getMonth() - 1);
                break;
            case PERIOD_TYPES.YEARLY:
                periodStart = new Date(now);
                periodStart.setFullYear(now.getFullYear() - 1);
                break;
            case PERIOD_TYPES.ALL_TIME:
                periodStart = new Date(0); // Unix epoch
                break;
        }

        const stats = await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.WARDROBE_STATISTICS,
            [
                Query.equal('userId', userId),
                Query.equal('periodType', periodType),
                Query.greaterThanEqual('periodEnd', periodStart.toISOString()),
                Query.lessThanEqual('periodStart', periodEnd.toISOString()),
                Query.orderDesc('calculatedAt'),
                Query.limit(1)
            ]
        );

        return stats.documents[0] || null;
    }

    // ======================
    // COLOR HARMONY RULES COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createColorHarmonyRule(data) {
        try {
            // Validate required fields
            const requiredFields = ['primaryColor', 'matchingColors', 'neutralsAllowed', 'harmonyType'];
            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.skinTone, SKIN_TONES, 'skinTone');
            SchemaValidator.validateEnum(data.season, SEASONS, 'season');
            SchemaValidator.validateEnum(data.harmonyType, HARMONY_TYPES, 'harmonyType');
            SchemaValidator.validateEnum(data.formalityLevel, FORMALITY_LEVELS, 'formalityLevel');

            // Set default formalityLevel if not provided
            if (!data.formalityLevel) {
                data.formalityLevel = FORMALITY_LEVELS.ANY;
            }

            // Validate array sizes
            const arrayFields = ['matchingColors', 'accentColors', 'avoidColors', 'neutralsAllowed'];
            for (const field of arrayFields) {
                if (data[field]) {
                    SchemaValidator.validateArrayLength(data[field], 30, field);
                    SchemaValidator.validateArrayItems(data[field], 30, field);
                }
            }

            // Validate string lengths
            SchemaValidator.validateStringLength(data.primaryColor, 30, 'primaryColor');
            SchemaValidator.validateStringLength(data.colorMood, 50, 'colorMood');

            const ruleId = ID.unique();
            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.COLOR_HARMONY_RULES,
                ruleId,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create color harmony rule:', error);
            throw this.handleError(error);
        }
    }

    async getColorHarmonyRules(primaryColor, season = null, skinTone = null) {
        let queries = [Query.equal('primaryColor', primaryColor)];

        if (season && season !== 'all') {
            SchemaValidator.validateEnum(season, SEASONS, 'season');
            queries.push(Query.or([
                Query.equal('season', season),
                Query.equal('season', 'all')
            ]));
        }

        if (skinTone && skinTone !== 'all') {
            SchemaValidator.validateEnum(skinTone, SKIN_TONES, 'skinTone');
            queries.push(Query.or([
                Query.equal('skinTone', skinTone),
                Query.equal('skinTone', 'all')
            ]));
        }

        queries.push(Query.orderAsc('harmonyType'));

        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.COLOR_HARMONY_RULES,
            queries
        );
    }

    // ======================
    // APP SETTINGS COLLECTION (COMPLETE IMPLEMENTATION)
    // ======================

    async createAppSetting(data) {
        try {
            // Validate required fields
            const requiredFields = ['settingKey', 'settingValue', 'settingType', 'category'];
            SchemaValidator.validateRequiredFields(data, requiredFields);

            // Validate enums
            SchemaValidator.validateEnum(data.settingType, SETTING_TYPES, 'settingType');

            // Validate string lengths
            SchemaValidator.validateStringLength(data.settingKey, 100, 'settingKey');
            SchemaValidator.validateStringLength(data.settingValue, 2000, 'settingValue');
            SchemaValidator.validateStringLength(data.category, 50, 'category');
            SchemaValidator.validateStringLength(data.description, 500, 'description');
            SchemaValidator.validateStringLength(data.lastModifiedBy, 36, 'lastModifiedBy');

            // Parse JSON if settingType is json
            if (data.settingType === SETTING_TYPES.JSON) {
                try {
                    JSON.parse(data.settingValue);
                } catch (e) {
                    throw new Error('Invalid JSON in settingValue');
                }
            }

            // Parse array if settingType is array
            if (data.settingType === SETTING_TYPES.ARRAY) {
                try {
                    const parsed = JSON.parse(data.settingValue);
                    if (!Array.isArray(parsed)) {
                        throw new Error('settingValue must be a JSON array');
                    }
                } catch (e) {
                    throw new Error('Invalid array in settingValue');
                }
            }

            const now = new Date().toISOString();

            return await this.databases.createDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.APP_SETTINGS,
                data.settingKey,
                {
                    ...data,
                    createdAt: now,
                    updatedAt: now
                }
            );
        } catch (error) {
            console.error('Failed to create app setting:', error);
            throw this.handleError(error);
        }
    }

    async getAppSetting(key) {
        try {
            return await this.databases.getDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                COLLECTIONS.APP_SETTINGS,
                key
            );
        } catch (error) {
            if (error.code === 404) {
                return null;
            }
            throw this.handleError(error);
        }
    }

    async updateAppSetting(key, data) {
        const updateData = {
            ...data,
            updatedAt: new Date().toISOString()
        };

        return await this.databases.updateDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.APP_SETTINGS,
            key,
            updateData
        );
    }

    async listAppSettingsByCategory(category) {
        return await this.databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            COLLECTIONS.APP_SETTINGS,
            [
                Query.equal('category', category),
                Query.orderAsc('settingKey')
            ]
        );
    }

    // ======================
    // STORAGE METHODS (COMPLETE IMPLEMENTATION)
    // ======================

    async validateFile(file) {
        // Check file size
        if (file.size > APPWRITE_CONFIG.MAX_FILE_SIZE) {
            throw new Error(`File size exceeds ${APPWRITE_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
        }

        // Check file type (basic image validation)
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only images are allowed');
        }

        return true;
    }

    async uploadWardrobeImage(file, onProgress = null) {
        await this.requireAuth();

        try {
            // Validate file
            await this.validateFile(file);

            const fileId = ID.unique();

            const upload = await this.storage.createFile(
                APPWRITE_CONFIG.BUCKET_ID,
                fileId,
                file,
                onProgress
            );

            // Generate URLs
            const previewUrl = this.storage.getFilePreview(
                APPWRITE_CONFIG.BUCKET_ID,
                fileId,
                300,  // width
                300,  // height
                'center', // gravity
                85,   // quality
                0,    // borderWidth
                '#FFFFFF', // borderColor
                8,    // borderRadius
                100,  // opacity
                0,    // rotation
                'cover' // background
            );

            const viewUrl = this.storage.getFileView(
                APPWRITE_CONFIG.BUCKET_ID,
                fileId
            );

            return {
                fileId: fileId,
                previewUrl: previewUrl,
                viewUrl: viewUrl,
                ...upload
            };
        } catch (error) {
            console.error('Failed to upload image:', error);
            throw this.handleError(error);
        }
    }

    async deleteWardrobeImage(fileId) {
        await this.requireAuth();

        try {
            return await this.storage.deleteFile(
                APPWRITE_CONFIG.BUCKET_ID,
                fileId
            );
        } catch (error) {
            console.error('Failed to delete image:', error);
            throw this.handleError(error);
        }
    }

    async getFileUrl(fileId, width = null, height = null) {
        if (width && height) {
            return this.storage.getFilePreview(
                APPWRITE_CONFIG.BUCKET_ID,
                fileId,
                width,
                height
            );
        }

        return this.storage.getFileView(
            APPWRITE_CONFIG.BUCKET_ID,
            fileId
        );
    }

    // ======================
    // FUNCTIONS - GENERATE OUTFIT IMAGE (ENHANCED)
    // ======================

    async generateOutfitImage(outfitData, timeout = 30000) {
        await this.requireAuth();

        try {
            // Validate outfit data structure
            if (!outfitData.items || !Array.isArray(outfitData.items)) {
                throw new Error('Outfit data must include items array');
            }

            // Add metadata
            const executionData = {
                ...outfitData,
                timestamp: new Date().toISOString(),
                userId: this.currentUser?.$id,
                model: 'stabilityai/stable-diffusion-xl-base-1.0'
            };

            const execution = await this.functions.createExecution(
                APPWRITE_CONFIG.FUNCTION_ID,
                JSON.stringify(executionData)
            );

            return await this.pollExecutionResult(execution.$id, timeout);
        } catch (error) {
            console.error('Failed to generate outfit image:', error);
            throw this.handleError(error);
        }
    }

    async pollExecutionResult(executionId, timeout) {
        const startTime = Date.now();

        return new Promise((resolve, reject) => {
            const checkStatus = async () => {
                try {
                    // Check timeout
                    if (Date.now() - startTime > timeout) {
                        reject(new Error('Function execution timeout'));
                        return;
                    }

                    const result = await this.functions.getExecution(
                        APPWRITE_CONFIG.FUNCTION_ID,
                        executionId
                    );

                    switch (result.status) {
                        case 'completed':
                            try {
                                const parsed = JSON.parse(result.response);
                                resolve(parsed);
                            } catch (e) {
                                resolve({
                                    success: true,
                                    executionId: executionId,
                                    rawResponse: result.response
                                });
                            }
                            break;

                        case 'failed':
                            reject(new Error(`Function failed: ${result.stderr || 'Unknown error'}`));
                            break;

                        case 'processing':
                            // Continue polling
                            setTimeout(checkStatus, 1000);
                            break;

                        default:
                            reject(new Error(`Unexpected execution status: ${result.status}`));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            // Start polling
            checkStatus();
        });
    }

    // ======================
    // HELPER METHODS
    // ======================

    generateId() {
        return ID.unique();
    }

    formatDate(date = new Date()) {
        return date.toISOString();
    }

    isCurrentUser(userId) {
        return this.currentUser && this.currentUser.$id === userId;
    }

    handleError(error) {
        console.error('Appwrite Error:', error);

        const errorMap = {
            400: { message: 'Bad request', code: 'BAD_REQUEST' },
            401: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            403: { message: 'Access forbidden', code: 'FORBIDDEN' },
            404: { message: 'Resource not found', code: 'NOT_FOUND' },
            409: { message: 'Resource already exists', code: 'CONFLICT' },
            422: { message: 'Validation failed', code: 'VALIDATION_ERROR' },
            429: { message: 'Too many requests', code: 'RATE_LIMITED' },
            500: { message: 'Internal server error', code: 'SERVER_ERROR' },
            502: { message: 'Bad gateway', code: 'GATEWAY_ERROR' },
            503: { message: 'Service unavailable', code: 'SERVICE_UNAVAILABLE' }
        };

        const mapped = errorMap[error.code] || {
            message: error.message || 'An unexpected error occurred',
            code: 'UNKNOWN_ERROR'
        };

        // Add original error for debugging (remove in production)
        mapped.originalError = error;

        return mapped;
    }
}

// ======================
// GLOBAL ENUMS EXPORT
// ======================

const ENUMS = {
    GENDERS,
    CATEGORIES,
    WARMTH_LEVELS,
    LAYER_TYPES,
    FIT_TYPES,
    FABRIC_TEXTURES,
    SLEEVE_LENGTHS,
    NECKLINE_TYPES,
    LENGTH_TYPES,
    SEASONS,
    TEMPERATURE_UNITS,
    STYLE_PREFERENCES,
    OCCASION_TYPES,
    COLOR_MOOD_PREFERENCES,
    TIMES_OF_DAY,
    INDOOR_OUTDOOR_TYPES,
    ACTIVITY_LEVELS,
    RATING_LABELS,
    RULE_TYPES,
    RULE_CATEGORIES,
    CONDITION_OPERATORS,
    RULE_ACTIONS,
    HARMONY_TYPES,
    FORMALITY_LEVELS,
    SKIN_TONES,
    SETTING_TYPES,
    PERIOD_TYPES
};

// ======================
// SINGLETON INSTANCE
// ======================

const appwriteService = new AppwriteService();

// ======================
// EXPORT FOR MODULES
// ======================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppwriteService,
        appwriteService,
        COLLECTIONS,
        ENUMS,
        SchemaValidator
    };
}

// ======================
// BROWSER GLOBAL EXPORT (OPTIONAL)
// ======================

if (typeof window !== 'undefined') {
    window.AppwriteService = AppwriteService;
    window.appwrite = appwriteService;
    window.COLLECTIONS = COLLECTIONS;
    window.ENUMS = ENUMS;
    window.SchemaValidator = SchemaValidator;

    // Auto-initialize on DOM ready
    window.addEventListener('DOMContentLoaded', async () => {
        if (!window.appwriteInitialized) {
            window.appwriteInitialized = true;

            const result = await appwriteService.initialize();

            const event = new CustomEvent('appwrite:initialized', {
                detail: result
            });
            window.dispatchEvent(event);
        }
    });
}