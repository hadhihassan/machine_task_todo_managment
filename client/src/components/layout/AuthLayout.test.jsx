import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthLayout from './AuthLayout';

describe('AuthLayout Component', () => {
    it('should render the Outlet component', () => {
        render(
            <Router>
                <AuthLayout />
            </Router>
        );

        // Check if the main container is in the document
        expect(screen.getByRole('main')).toBeInTheDocument();
    });
});
