
import express from "express";
import fileUpload from "express-fileupload";
import { GoogleGenAI } from "@google/genai";
import path from "path"


const GEMINI_API_KEY=process.env.GEMINI_API_KEY
const app=express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use(fileUpload({
    // 1. BOYUT LİMİTİ (Otomatik kontrol)
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    
    // Limit aşılırsa ne olsun? (True derseniz 413 hatası döner ve işlem durur)
    abortOnLimit: true,
    
    // 2. KLASÖR OLUŞTURMA (Path otomatik yaratılır)
    createParentPath: true,
}));

export const resumeController=async(req,res)=>{
    if(!GEMINI_API_KEY){
        res.json({err:"servis baslatilamadi"})
    }
    const files=req.files;
    if(!files) return
    const uploadedPath=path.join(path._dirname,"/uploads",files.name);    
    files.mv(uploadedPath,(err)=>{
        res.json({err})
    });
    await client.set("Pdf",files);
    
    const genAI = new GoogleGenAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const resume = await handleUpload(req, res);
       
    const prompt = `You are an experienced HR professional. Please analyze the following resume and provide a comprehensive evaluation. 

    Resume Content:
    ${resume}

    Your analysis should include:
    1. A summary of the candidate's key qualifications and experience.
    2. Strengths of the resume.
    3. Areas for improvement in the resume.
    4. A rating (out of 5) for overall suitability for a general professional role.
    5. Suggestions for tailoring the resume for a specific role (e.g., "Software Engineer").`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ analysis: text,status:200,data:text });
}