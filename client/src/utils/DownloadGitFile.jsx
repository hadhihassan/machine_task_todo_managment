import FileSaver from 'file-saver';

export const downloadMarkdown = (markdownContent, title) => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    FileSaver.saveAs(blob, `${title}.md`);
    return true
};