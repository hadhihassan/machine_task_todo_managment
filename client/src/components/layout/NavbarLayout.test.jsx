import { describe, it, expect, jest, require } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavBarLayout from './NavBarLayout';

describe('NavBarLayout Component', () => {
    it('should render the NavBarLayout component correctly', () => {
        const mockLogout = jest.fn();
        render(
            <Router>
                <AuthContext.Provider value={{ logout: mockLogout }}>
                    <NavBarLayout />
                </AuthContext.Provider>
            </Router>
        );
        expect(screen.getByText('Project managment')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /LogOut/i })).toBeInTheDocument();
    });

    it('should call logout function when logout button is clicked', () => {
        const mockLogout = jest.fn();
        const mockNavigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

        render(
            <Router>
                <AuthContext.Provider value={{ logout: mockLogout }}>
                    <NavBarLayout />
                </AuthContext.Provider>
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /LogOut/i }));
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
