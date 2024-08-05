import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, act, screen } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

describe('AuthProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
        };
    });

    it('should provide initial auth state', () => {
        global.localStorage.getItem.mockReturnValueOnce(null);

        render(
            <Router>
                <AuthProvider>
                    <AuthContext.Consumer>
                        {({ auth }) => <div data-testid="context-test">{auth ? 'Authenticated' : 'Not Authenticated'}</div>}
                    </AuthContext.Consumer>
                </AuthProvider>
            </Router>
        );

        expect(screen.getByTestId("context-test")).toHaveTextContent("Not Authenticated");
    });

    it('should update auth state on login', async () => {
        const userData = { name: 'John Doe' };
        global.localStorage.setItem.mockImplementation((key, value) => {
            if (key === 'auth') {
                global.storedAuth = value;
            }
        });

        const TestComponent = () => {
            const { login } = React.useContext(AuthContext);
            return <button onClick={() => login(userData)}>Login</button>;
        };

        await act(async () => {
            render(
                <Router>
                    <AuthProvider>
                        <TestComponent />
                    </AuthProvider>
                </Router>
            );
        });

        expect(global.localStorage.setItem).toHaveBeenCalledWith('auth', JSON.stringify(userData));
        expect(JSON.parse(global.storedAuth)).toEqual(userData);
    });

    it('should reset auth state on logout', async () => {
        global.localStorage.getItem.mockReturnValueOnce(JSON.stringify({ name: 'John Doe' }));

        const TestComponent = () => {
            const { logout } = React.useContext(AuthContext);
            return <button onClick={logout}>Logout</button>;
        };

        await act(async () => {
            render(
                <Router>
                    <AuthProvider>
                        <TestComponent />
                    </AuthProvider>
                </Router>
            );
        });

        expect(global.localStorage.removeItem).toHaveBeenCalledWith('auth');
    });
});
