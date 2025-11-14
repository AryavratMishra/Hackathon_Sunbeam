const TOKEN_KEY = 'hackathon_token'

export const setTokenLocal = (token) => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const clearAuth = () => localStorage.removeItem(TOKEN_KEY)