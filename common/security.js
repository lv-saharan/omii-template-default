class Security {
    #tokenKey = "--my-token-key--"
    #token = null
    //120 minutes expired
    #expireMinute = 120
    #expireTime = null
    #userId = null
    #userName = null
    #loginCallbacks = []
    #logoutCallbacks = []

    get userId() {
        return this.#userId
    }
    get userName() {
        return this.#userName
    }
    get logined() {
        return this.token != null
    }

    get token() {
        if (this.#token == null) {
            this.#token = sessionStorage.getItem(this.#tokenKey)
        }
        return this.#token
    }
    onLogin(...callback) {
        this.#loginCallbacks.push(...callback)
        return this;
    }
    onLogout(...callback) {
        this.#logoutCallbacks.push(...callback)
        return this
    }
    get expireTime() {
        return this.#expireTime
    }

    async #refreshToken() {
        //refresh token api
        setTimeout(() => {
            this.#refreshToken()
        }, (this.#expireMinute - 1) * 60 * 1000);
    }
    async checkLogin() {
        if (this.token != null) {
            this.fetchUserInfo().then(() => {
                return true
            }).catch(() => {
                return false
            })
        }
        else {
            return false
        }
    }
    async fetchUserInfo() {
        return Promise.resolve({ userId: 1, userName: "admin" }).then(userInfo => {
            return userInfo
        })
    }
    async login(userName, password, code) {
        if (userName != "admin") {
            throw new Error("user is not exsists")
        }
        const { token, expire } = await Promise.resolve({
            token: "token123",
            expire: 120
        })
        this.#token = token;
        this.#expireMinute = expire
        this.#refreshToken()
        //减去一分钟
        this.#expireTime = Date.now() + (expire - 1) * 60 * 1000
        sessionStorage.setItem(this.#tokenKey, token)

        //fetch user info
        const userInfo = await this.fetchUserInfo()
        this.#loginCallbacks.forEach(cb => {
            cb(userInfo)
        })
        return userInfo
    }
    async logout() {
        //logout api
        this.#token = null;
        sessionStorage.removeItem(this.#tokenKey)
        this.#logoutCallbacks.forEach(cb => {
            cb()
        })

    }
}
const security = new Security()

export default security