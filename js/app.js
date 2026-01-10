// Initialize Appwrite
const client = new Appwrite.Client();

client
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('695fba17000e4455e53d');

const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);
const storage = new Appwrite.Storage(client);
const functions = new Appwrite.Functions(client);

// Constants
const DB_ID = '695fba61000840feb7f5';
const BUCKET_ID = 'wardrobe_assets';

// Collection IDs
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

// Utils
async function getCurrentUser() {
    try {
        return await account.get();
    } catch (e) {
        console.log('No active session');
        return null;
    }
}

async function logout() {
    try {
        await account.deleteSession('current');
        window.location.href = '/index.html';
    } catch (e) {
        console.error('Logout failed', e);
    }
}

// Check auth and redirect if needed
async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '/pages/login.html';
    }
    return user;
}
