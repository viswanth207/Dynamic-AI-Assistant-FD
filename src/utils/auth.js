const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dynamic-ai-assistant-bd.onrender.com';

const fetchWithTimeout = async (url, options = {}) => {
  const { timeout = 15000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const authAPI = {
  async signup(email, password) {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }

    return response.json();
  },

  async login(email, password) {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },

  async logout() {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    return response.json();
  },

  async getCurrentUser() {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/auth/me`, {
      credentials: 'include'
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  },

  async checkAuth() {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/api/auth/check`, {
        credentials: 'include'
      });
      if (!response.ok) return { authenticated: false };
      return response.json();
    } catch (error) {
      console.error('Check auth error:', error);
      return { authenticated: false };
    }
  }
};
