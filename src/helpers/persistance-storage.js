export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        console.log(error);
    }
}

export const getItem = (key) => {
    const token = localStorage.getItem(key)
    return token
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}