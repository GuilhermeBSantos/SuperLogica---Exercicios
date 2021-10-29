export const set_token = (token) => {
    localStorage.setItem('token', token);
    return token;
}

export const get_token = () => {
    return localStorage.getItem('token');
}

export const remove_token = () => {
    localStorage.removeItem('token');
    return null;
}

export const login = (form_values, callback) => {
    var formData = new FormData();
    formData.append('email', form_values.email);
    formData.append('password', form_values.password);

    axios.post('/api/user/login', formData)
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var data = e.response.data;
        callback(data)
    })
}

export const info = (callback, logout) => {
    axios.get('/api/user', { headers: {"Authorization" : `Bearer ${get_token()}`} })
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var status = e.response.status;
        if(status === 401){
            logout();
        }
    })
}

export const list = (form_search = null, callback) => {
    let params = '?';

    if(form_search !== null){
        params += form_search.selector + '=' + form_search.search;
    }

    axios.get(`/api/user/list${params}`, { headers: {"Authorization" : `Bearer ${get_token()}`} })
    .then((response) => {
        var data = response.data;
        callback(data);
    })
}

export const store_user = (form_values, callback) => {
    var formData = new FormData();
    formData.append('full_name', form_values.full_name);
    formData.append('user_name', form_values.user_name);
    formData.append('zipcode', form_values.zipcode);
    formData.append('email', form_values.email);
    formData.append('password', form_values.password);

    axios.post('/api/user/store', formData)
    .then((response) => {
        var data = response.data;
        callback(data);
    })
    .catch(e => {
        var data = e.response.data;
        callback(data)
    })
}