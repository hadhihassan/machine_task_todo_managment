import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Project = model('Project', projectSchema);

export default Project;