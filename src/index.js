import app from './app.js';
import { connectDB } from "./db.js";

connectDB();
app.listen(1080);
console.log('Server listen in port 1080');
