import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        tirm: true
    },
    status: {
        type: String,
        enum: ['pending', 'Completed'],
        default: 'pending',
    },
}, {
    timestamps: true
})

const Todo = model('Todo', todoSchema);

export default Todo;