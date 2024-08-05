export const gitTemplate = (project) => {
    
    const completedTodos = project.todos.filter(todo => todo.status === 'Completed');
    const pendingTodos = project.todos.filter(todo => todo.status === 'Pending');
    return `# ${project.title}

**Summary**: ${completedTodos.length} / ${project.todos.length} completed.

**Description**: ${project.description}

## Pending Todos
${pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n')}

## Completed Todos
${completedTodos.map(todo => `- [x] ${todo.description}`).join('\n')}`
}