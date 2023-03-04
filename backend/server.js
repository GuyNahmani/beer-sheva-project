import express from "express";
import dotenv from "dotenv";
import { apiRoute } from "./routes/apiRoute.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("hello");
});
app.use('/api/allshelters', apiRoute);

app.listen(port, () => console.log(`server running on port: ${port}`));