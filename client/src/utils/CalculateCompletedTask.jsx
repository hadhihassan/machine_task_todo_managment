export const calculateCompletedTask = (todos) => {
    const totalCompleted = todos?.reduce((acc, todo) => {
        if (todo.status === "Completed") {
            return acc + 1
        }
        return acc
    }, 0)
    return totalCompleted
}