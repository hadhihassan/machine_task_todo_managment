import { describe, it, expect } from '@jest/globals';
import { calculateCompletedTask } from './CalculateCompletedTask.jsx';

describe('calculateCompletedTask', () => {
    it('should return 0 for an empty array', () => {
        expect(calculateCompletedTask([])).toBe(0);
    });

    it('should return 0 for an array with no completed tasks', () => {
        expect(calculateCompletedTask([{ status: 'Pending' }])).toBe(0);
    });

    it('should count completed tasks correctly', () => {
        expect(calculateCompletedTask([
            { status: 'Completed' },
            { status: 'Pending' },
            { status: 'Completed' },
        ])).toBe(2);
    });
});
