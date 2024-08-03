import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref : "Todo"
    }]
}, {
    timestamps: true
})

const Project = model('Project', projectSchema);

export default Project;