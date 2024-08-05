import FileSaver from 'file-saver';
import { describe, it, expect, jest } from '@jest/globals';
import { downloadMarkdown } from './downloadMarkdown';

jest.mock('file-saver', () => ({
    saveAs: jest.fn(),
}));

describe('downloadMarkdown', () => {
    it('should create a Blob and call FileSaver.saveAs with correct arguments', () => {
        const markdownContent = '# Sample Markdown content';
        const title = 'Project Title';

        const result = downloadMarkdown(markdownContent, title);


        expect(FileSaver.saveAs).toHaveBeenCalledWith(
            expect.any(Blob),
            'Project Title.md'
        );

        expect(result).toBe(true);

        const blob = FileSaver.saveAs.mock.calls[0][0];
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/markdown;charset=utf-8');
        expect(blob.size).toBe(markdownContent.length); 
    });
});
