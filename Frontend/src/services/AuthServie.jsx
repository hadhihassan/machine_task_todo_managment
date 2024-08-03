import { SERVER_URL } from "../constants/server";
import axios from "./axios";

export async function loginUser(values) {
    return await axios.post(`/login`, values, {
        withCredentials: true,
    });
}

export async function registerUser(values) {
    return await axios.post(`/register`, values, {
        withCredentials: true,
    });
}

export async function verifyUser(values) {
    return await axios.patch(`/verify`, values, {
        withCredentials: true,
    });
}