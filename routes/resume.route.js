import express from "express";
import {resumeController} from "../controller/resume.controller.js"
import {fileValidator} from "../middlewares/fileValidator.js"

const resumeRouter=express.Router();

resumeRouter.post("/analyze-resume",fileValidator("PDF",5),resumeController)

export default resumeRouter;