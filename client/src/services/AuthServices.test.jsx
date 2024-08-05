import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import axios from './Axios';
import { loginUser, registerUser, verifyUser } from './AuthService';

jest.mock('./Axios');
describe('Auth API Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call axios.post with correct URL and values for loginUser', async () => {
        const mockResponse = { data: 'login success' };
        axios.post.mockResolvedValue(mockResponse);

        const values = { username: 'testuser', password: 'testpass' };
        const response = await loginUser(values);
        expect(axios.post).toHaveBeenCalledWith('/login', values, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.post with correct URL and values for registerUser', async () => {
        const mockResponse = { data: 'registration success' };
        axios.post.mockResolvedValue(mockResponse);

        const values = { username: 'newuser', password: 'newpass' };
        const response = await registerUser(values);

        expect(axios.post).toHaveBeenCalledWith('/register', values, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.patch with correct URL and values for verifyUser', async () => {
        const mockResponse = { data: 'verification success' };
        axios.patch.mockResolvedValue(mockResponse);
        const values = { token: 'verificationToken' };
        const response = await verifyUser(values);

        expect(axios.patch).toHaveBeenCalledWith('/verify', values, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });
});
