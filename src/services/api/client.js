import { errorResponse } from '@shared/utils/response';

const API_TIMEOUT = 15000;

export const apiClient = {
  async request(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        return errorResponse(
          'API_ERROR',
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      return { success: true, data, error: null };
    } catch (err) {
      if (err.name === 'AbortError') {
        return errorResponse('TIMEOUT', 'Request timed out');
      }
      return errorResponse('NETWORK_ERROR', 'Network request failed');
    } finally {
      clearTimeout(timeout);
    }
  },

  get(url, params = {}) {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;
    return this.request(fullUrl, { method: 'GET' });
  },

  post(url, body) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(url, body) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete(url) {
    return this.request(url, { method: 'DELETE' });
  },
};

export default apiClient;
