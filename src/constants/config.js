

// export const server = import.meta.env.VITE_SERVER;

export const BACKEND_URL = process.env.NODE_ENV === 'PRODUCTION'
    ? process.env.VITE_SERVER_URL
    : process.env.VITE_SERVER_PORT;
