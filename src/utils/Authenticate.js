import CryptoJS from "crypto-js";


class Authentication {
    constructor () {
        this.allCookies = this.#decodingAllCookies();
    }

    cookieExpDays = 1;
    passphrase = process.env.REACT_APP_ENCRYPTION_PASSPHRASE;

    #decodingAllCookies = () => {
        if (document.cookie && document.cookie !== '') {
            const decodedCookie = decodeURIComponent(document.cookie);
            const splittedCookies = decodedCookie.split(";");
            let cookies = {};
            splittedCookies.forEach(data => {
                let innerArr = data.split("=");
                let name = innerArr[0].trim();
                let value = innerArr[1];
                innerArr.shift();
                if (innerArr.length > 0) value = innerArr.join('=');
                cookies[name] = value;
            });
            return cookies;
        }
        return null;
    }

    getAllCookies = () => {
        return this.allCookies;
    }

    setCookie = (cname, cvalue, expiration = null) => {
        try {
            const encCvalue = CryptoJS.AES.encrypt(JSON.stringify(cvalue), this.passphrase).toString();
            const d = new Date();
            d.setTime(d.getTime() + (this.cookieExpDays * 24 * 60 * 60 * 1000));
            let expires = expiration ?? "expires=" + d.toUTCString();
            document.cookie = cname + "=" + encCvalue + ";" + expires + ";path=/";
        } catch (error) {
            return error.message;
        }
    }

    deleteCookies = () => {
        this.setCookie('_pat', '', "expires=Thu, 01 Jan 1970 00:00:00 UTC");
        this.setCookie('_pau', '', "expires=Thu, 01 Jan 1970 00:00:00 UTC");
    }

    getCookie = (name) => {
        try {
            return this.allCookies?.[name]
                ?
                JSON.parse(CryptoJS.AES.decrypt(this.allCookies[name], this.passphrase).toString(CryptoJS.enc.Utf8))
                :
                null;
        } catch (error) {
            return null;
        }
    }

    getUser = () => {
        try {
            return this.allCookies?.['_pau']
                ?
                JSON.parse(CryptoJS.AES.decrypt(this.allCookies['_pau'], this.passphrase).toString(CryptoJS.enc.Utf8))?.user
                :
                null;
        } catch (error) {
            return null;
        }
    }

    isAuthenticated = () => {
        return (!this.allCookies?.['_pat']) ? false : true;
    }
}

export default Authentication;