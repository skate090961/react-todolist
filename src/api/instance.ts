import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'fadf5351-5596-4e7a-8405-6f1c81b53b0d'
    }
})