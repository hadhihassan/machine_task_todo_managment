import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'pending',
    },
}, {
    timestamps: true
})

const Todo = model('Todo', todoSchema);

export default Todo;