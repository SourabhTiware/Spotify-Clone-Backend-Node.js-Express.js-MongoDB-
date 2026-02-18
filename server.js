import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";


const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            // "listening" is the standard terminology
            console.log(`Server is listening for requests on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // Exit if the server can't reach the DB
    });