// Utility functions for handling photo data

/**
 * Normalizes photo data to ensure it's always an array of valid URLs
 * @param {any} photo - Photo data (can be string, array, or undefined)
 * @returns {string[]} Array of photo URLs
 */
export const normalizePhotoData = (photo) => {
    console.log('normalizePhotoData input:', photo, 'type:', typeof photo);

    // Handle null, undefined, or empty values
    if (!photo || photo === null || photo === undefined) {
        console.log('normalizePhotoData: empty input, returning []');
        return [];
    }

    // Handle arrays
    if (Array.isArray(photo)) {
        const result = photo.filter(url => url && typeof url === 'string' && url.trim());
        console.log('normalizePhotoData: array input, result:', result);
        return result;
    }

    // Handle strings
    if (typeof photo === 'string') {
        // Handle JSON string arrays like '["url1", "url2"]'
        if (photo.startsWith('[') && photo.endsWith(']')) {
            try {
                const parsed = JSON.parse(photo);
                if (Array.isArray(parsed)) {
                    const result = parsed.filter(url => url && typeof url === 'string' && url.trim());
                    console.log('normalizePhotoData: JSON array string, result:', result);
                    return result;
                }
            } catch (e) {
                console.log('Failed to parse JSON array:', e);
            }
        }

        // Handle comma-separated URLs
        if (photo.includes(',')) {
            const result = photo.split(',')
                .map(url => url.trim())
                .filter(url => url);
            console.log('normalizePhotoData: comma-separated string, result:', result);
            return result;
        }

        // Single URL
        console.log('normalizePhotoData: single URL string, result:', [photo]);
        return [photo];
    }

    // Fallback for any other type
    console.log('normalizePhotoData: unknown type, returning []');
    return [];
};

/**
 * Gets the first photo URL from photo data
 * @param {any} photo - Photo data
 * @returns {string|null} First photo URL or null
 */
export const getFirstPhoto = (photo) => {
    try {
        const normalized = normalizePhotoData(photo);
        const result = normalized.length > 0 ? normalized[0] : null;
        console.log('getFirstPhoto result:', result);
        return result;
    } catch (error) {
        console.error('Error getting first photo:', error);
        return null;
    }
};

/**
 * Checks if photo data contains valid URLs
 * @param {any} photo - Photo data
 * @returns {boolean} True if valid photos exist
 */
export const hasValidPhotos = (photo) => {
    try {
        return normalizePhotoData(photo).length > 0;
    } catch (error) {
        console.error('Error checking valid photos:', error);
        return false;
    }
};
