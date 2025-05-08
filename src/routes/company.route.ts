import express from "express";
import { createCompany } from "../controllers/company.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create", authenticateJWT, createCompany);

export default router;
