import app from "./app.js";
import { connectDatabase } from "./config/connectDatabase.js";
const port = process.env.PORT || 3000;

connectDatabase();
app.listen(port, () => {
    console.log(`Server Status: \t\tRunning on http://localhost:${port}`);
});