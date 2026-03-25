const API_URL = 'http://localhost:5000/api';

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
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};
