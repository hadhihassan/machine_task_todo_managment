import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import Login from './index';
import * as AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../services/AuthService', () => ({
    loginUser: jest.fn()
}));

const mockLogin = jest.fn();

const renderWithContext = (ui) => {
    return render(
        <Router>
            <AuthContext.Provider value={{ login: mockLogin }}>
                {ui}
            </AuthContext.Provider>
        </Router>
    );
};

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the login form', () => {
        renderWithContext(<Login />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('shows validation errors with invalid input', async () => {
        renderWithContext(<Login />);

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    it('submits form and handles success', async () => {
        const userData = { token: '123456', userName: 'John Doe', success: true, message: 'Login successful' };
        AuthService.loginUser.mockResolvedValueOnce({ data: userData });

        renderWithContext(<Login />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(AuthService.loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
            expect(mockLogin).toHaveBeenCalledWith('John Doe');
            expect(localStorage.getItem('auth')).toEqual(JSON.stringify({ name: 'John Doe' }));
        });
    });

    it('handles errors on submit', async () => {
        AuthService.loginUser.mockRejectedValueOnce({
            response: { data: { errors: [{ msg: 'Invalid credentials' }] } }
        });

        renderWithContext(<Login />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        });
    });
});
