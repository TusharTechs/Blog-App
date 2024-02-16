export const isLoggedIn = () => {
    const token = localStorage.getItem('blogToken');
    return token ? true : false;
}