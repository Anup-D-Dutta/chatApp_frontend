

// export const server = import.meta.env.VITE_SERVER_PORT;

// export const BACKEND_URL = process.env.VITE_SERVER_URL

export const API_URL = import.meta.env.MODE === "PRODUCTION"
    ? import.meta.env.VITE_SERVER_URL
    : `http://localhost:${import.meta.env.VITE_SERVER_PORT}`; // For development
