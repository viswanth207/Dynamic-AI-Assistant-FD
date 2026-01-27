const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://7ba3a0ff89c0.ngrok-free.app';

export const fetchWithTimeout = async (url, options = {}) => {
    const { timeout = 15000, ...fetchOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    // Handle relative URLs
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    try {
        const response = await fetch(fullUrl, {
            ...fetchOptions,
            headers: {
                ...fetchOptions.headers,
                'ngrok-skip-browser-warning': 'true'
            },
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
