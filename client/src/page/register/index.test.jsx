import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './index';
import { describe, expect, jest, test } from '@jest/globals';
import { registerUser } from '../../services/AuthService';
import { toast } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../services/AuthService', () => ({
    registerUser: jest.fn()
}));
jest.mock('react-hot-toast', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

describe('Register Component', () => {
    test('renders Register form correctly', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    test('shows validation errors and calls registerUser on submit', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: '1234' } });

        fireEvent.click(screen.getByText(/register/i));

        expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        expect(await screen.findByText(/passwords must match/i)).toBeInTheDocument();

        registerUser.mockResolvedValueOnce({ data: { success: true } });

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText(/register/i));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalled();
        });
    });
});
