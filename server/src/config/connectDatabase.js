import mongoose from "mongoose";
import Project from '../models/projectModel.js';
import Todo from '../models/todoModel.js';

export const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.info("Database Status: \tConnected");
        })
        .catch((err) => console.error(err));
};

export { Project, Todo };