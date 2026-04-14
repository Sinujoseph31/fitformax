const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5000/api' 
  : '/server-api';

export const apiCall = async (endpoint, method = 'GET', body = null, isFormData = false) => {
    const token = localStorage.getItem('fx_token');
    
    const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const fullUrl = `${API_URL}${endpoint}`;
        console.log(`[API] Fetching: ${method} ${fullUrl}`);
        const response = await fetch(fullUrl, config);
        
        let data = {};
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await response.json();
        } else {
            // Handle non-JSON response (like a 404 or 500 HTML)
            const text = await response.text();
            if (!response.ok) {
                throw new Error(text || `Error ${response.status}: ${response.statusText}`);
            }
        }
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};
