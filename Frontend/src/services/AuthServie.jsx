import { SERVER_URL } from "../constants/server";
import axios from "axios";

export async function loginUser(values) {
    return await axios.post(`${SERVER_URL}/login`, values, {
        withCredentials: true,
    });
}

export async function registerUser(values) {
    return await axios.post(`${SERVER_URL}/register`, values, {
        withCredentials: true,
    });
}

export async function verifyUser(values) {
    return await axios.patch(`${SERVER_URL}/verify`, values, {
        withCredentials: true,
    });
}