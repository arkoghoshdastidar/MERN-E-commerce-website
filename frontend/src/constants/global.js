export const BACKEND_HOSTNAME = 'http://localhost:5000';
export const CATEGORIES = ['Electronics', 'Laptop', 'Mobile', 'Watch', 'Toy', 'Fashion', 'Beauty', 'Health', 'Personal', 'Household', 'Furniture', 'Utensil', 'Stationery'
];
export const MIN_PRICE = 100;
export const MAX_PRICE = 10000;
export const STEPS = 1000;

export function getToken() {
    const key = 'token=';
    const cookie = document.cookie;
    const cookieArray = cookie.split(';');
    let token = null;
    cookieArray.forEach(cookie => {
        if (cookie.includes(key)) {
            token = cookie.split('=')[1];
        }
    });
    return token
}