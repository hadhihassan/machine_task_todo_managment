import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { getProjects } from '../../services/ProjectService';
import HomeScreen from './HomeScreen';
import Modal from '../../components/Modal';
import ProjectForm from '../../components/ProjectForm';
import ProjectCard from '../../components/ProjectCard';


jest.mock('../../services/ProjectService');
jest.mock('react-hot-toast', () => ({
    toast: jest.fn(),
}));

jest.mock('../../components/Modal', () => ({ isOpen, onClose, children }) => (
    isOpen ? <div role="dialog" onClick={onClose}>{children}</div> : null
));

jest.mock('../../components/ProjectForm', () => () => <form>Project Form</form>);
jest.mock('../../components/ProjectCard', () => ({ project }) => <div>{project.title}</div>);

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component and fetch projects', async () => {
        const mockProjects = [{ _id: '1', title: 'Project 1' }];
        getProjects.mockResolvedValue({ data: { projects: mockProjects } });

        render(<HomeScreen />);

        expect(screen.getByText('New Project')).toBeInTheDocument();

        await waitFor(() => {
            expect(getProjects).toHaveBeenCalled();
            expect(screen.getByText('Project 1')).toBeInTheDocument();
        });
    });

    it('should toggle the modal on button click', () => {
        render(<HomeScreen />);

        fireEvent.click(screen.getByText('New Project'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('dialog'));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should handle fetch error', async () => {
        getProjects.mockRejectedValue(new Error('Fetch error'));

        render(<HomeScreen />);

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith('Somthing went wrong!, tru again!');
        });
    });
});
