export default {
    getSession: function(name) {
        if(!name) return;
        return window.sessionStorage.getItem(name);
    },
    setSession: function(name, value) {
        if(!name) return;
        if(typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.sessionStorage.setItem(name, value);
    },
    removeSession: function(name) {
        if(!name) return;
        window.sessionStorage.removeItem(name);
    },
    getLocal: function(name) {
        if(!name) return;
        return window.localStorage.getItem(name);
    },
    setLocal: function(name, value) {
        if(!name) return;
        if(typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(name, value);
    },
    removeLocal: function(name) {
        if(!name) return;
        window.localStorage.removeItem(name);
    }
};