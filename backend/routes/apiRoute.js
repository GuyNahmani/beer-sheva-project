import express from "express";
const router = express.Router();
import { getInfo } from '../controllers/apiController.js'

router.get('/', getInfo);

export { router as apiRoute };
