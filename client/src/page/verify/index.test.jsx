import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

import { toast } from 'react-hot-toast';
import VerifyPage from './index';
import { verifyUser } from '../../services/AuthService';

jest.mock('../../services/AuthService', () => ({
    verifyUser: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

describe('VerifyPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form correctly', () => {
        render(
            <Router>
                <VerifyPage />
            </Router>
        );

        expect(screen.getByLabelText(/Verification code/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it('should show validation error if code is empty', async () => {
        render(
            <Router>
                <VerifyPage />
            </Router>
        );

        fireEvent.submit(screen.getByRole('form'));

        expect(await screen.findByText(/Verify code is required/i)).toBeInTheDocument();
    });

    it('should call verifyUser on form submit and navigate on success', async () => {
        verifyUser.mockResolvedValue({ data: { success: true } });

        render(
            <Router>
                <VerifyPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Verification code/i), {
            target: { value: '123456' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => expect(verifyUser).toHaveBeenCalledWith({ code: '123456' }));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
        expect(toast.success).toHaveBeenCalled();
    });

    it('should show toast error on API failure', async () => {
        verifyUser.mockRejectedValue({
            response: { data: { errors: [{ msg: 'Invalid code' }] } },
        });

        render(
            <Router>
                <VerifyPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Verification code/i), {
            target: { value: '123456' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Invalid code'));
    });

    it('should show a toast error for generic failure', async () => {
        verifyUser.mockRejectedValue(new Error('Server error'));

        render(
            <Router>
                <VerifyPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Verification code/i), {
            target: { value: '123456' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Server error'));
    });
});
