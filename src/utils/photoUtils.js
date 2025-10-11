// Utility functions for handling photo data

/**
 * Normalizes photo data to ensure it's always an array of valid URLs
 * @param {any} photo - Photo data (can be string, array, or undefined)
 * @returns {string[]} Array of photo URLs
 */
export const normalizePhotoData = (photo) => {
    console.log('normalizePhotoData input:', photo, 'type:', typeof photo);

    if (!photo) return [];

    if (Array.isArray(photo)) {
        const result = photo.filter(url => url && typeof url === 'string' && url.trim());
        console.log('normalizePhotoData array result:', result);
        return result;
    }

    if (typeof photo === 'string') {
        if (photo.includes(',')) {
            const result = photo.split(',')
                .map(url => url.trim())
                .filter(url => url);
            console.log('normalizePhotoData comma-separated result:', result);
            return result;
        }
        const result = [photo];
        console.log('normalizePhotoData single string result:', result);
        return result;
    }

    console.log('normalizePhotoData fallback result: []');
    return [];
};

/**
 * Gets the first photo URL from photo data
 * @param {any} photo - Photo data
 * @returns {string|null} First photo URL or null
 */
export const getFirstPhoto = (photo) => {
    const normalized = normalizePhotoData(photo);
    return normalized.length > 0 ? normalized[0] : null;
};

/**
 * Checks if photo data contains valid URLs
 * @param {any} photo - Photo data
 * @returns {boolean} True if valid photos exist
 */
export const hasValidPhotos = (photo) => {
    return normalizePhotoData(photo).length > 0;
};
