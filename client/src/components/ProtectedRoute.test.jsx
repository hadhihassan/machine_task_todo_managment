import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogedUsers } from './ProtectedRoute';

describe('LogedUsers', () => {
    it('renders children when user is authenticated', () => {
        const mockAuth = { isAuthenticated: true }; 
        render(
            <MemoryRouter initialEntries={['/logged-users']}>
                <AuthContext.Provider value={mockAuth}>
                    <LogedUsers>
                        <div>Logged Users Content</div>
                    </LogedUsers>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Logged Users Content')).toBeInTheDocument();
    });

    it('redirects to / when user is not authenticated', () => {
        const mockAuth = { isAuthenticated: false };
        render(
            <MemoryRouter initialEntries={['/logged-users']}>
                <AuthContext.Provider value={mockAuth}>
                    <LogedUsers />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.queryByText('Logged Users Content')).not.toBeInTheDocument();
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
});
