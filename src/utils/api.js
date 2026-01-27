const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://protocols-minister-petition-wide.trycloudflare.com';

export const fetchWithTimeout = async (url, options = {}) => {
    const { timeout = 15000, ...fetchOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    // Handle relative URLs
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    try {
        const response = await fetch(fullUrl, {
            ...fetchOptions,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

export { API_BASE_URL };
