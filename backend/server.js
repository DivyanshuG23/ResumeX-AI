import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import ResumeHistory from "./models/ResumeHistory.js";
import { GoogleGenAI } from "@google/genai";
import mammoth from "mammoth";
import dotenv from "dotenv";


dotenv.config();


const GROQ_API_KEY = process.env.GROQ_API_KEY;

const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY;


const DEEPINFRA_API_KEY = process.env.DEEPINFRA_API_KEY;


const GEMINI_API_KEY =  process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

 



   

  

const app = express();

import dns from 'dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);


// mongoose.connect("mongodb+srv://divyanshugangwar663_db_user:dg%40100@cluster0.mdjv4no.mongodb.net/")
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log("MongoDB Error ❌", err);
});

// middleware
app.use(cors());
app.use(express.json());

// multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
function extractEmail(text) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex);

  return emails ? emails[0] : "Not Found";
}

function extractPhone(text) {
  const phoneRegex = /(?:\+91[- ]?)?[6-9]\d{9}/g;

  const phones = text.match(phoneRegex);

  return phones ? phones[0] : "Not Found";
}

function extractEducation(text) {
  const education = [];

  if (text.toLowerCase().includes("bachelor of technology")) {
    education.push("Bachelor of Technology");
  }

  if (text.toLowerCase().includes("class 12")) {
    education.push("Class 12");
  }

  if (text.toLowerCase().includes("class 10")) {
    education.push("Class 10");
  }

  return education;
}


function extractName(text) {

  const firstPart = text.substring(0, 100);

  const match = firstPart.match(/[A-Z][a-z]+ [A-Z][a-z]+/);

  return match ? match[0] : "Not Found";

}

function generateSuggestions(score) {
  const suggestions = [];

  if (score < 60) {
    suggestions.push("Add more technical skills");
    suggestions.push("Add projects section");
    suggestions.push("Add certifications");
  }

  if (score >= 60 && score < 80) {
    suggestions.push("Improve project descriptions");
    suggestions.push("Add measurable achievements");
  }

  if (score >= 80) {
    suggestions.push("Resume looks strong");
  }

  return suggestions;
}

/* =======================
   ATS SCORE FUNCTION
======================= */
function calculateATSScore(text) {
  let score = 0;

  const keywords = [
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "python",
    "java",
    "html",
    "css",
    "sql",
    "api",
    "project",
    "developer"
  ];

  const lowerText = text.toLowerCase();

  keywords.forEach((word) => {
    if (lowerText.includes(word)) {
      score += 7;
    }
  });

  if (text.length > 1000) score += 10;
  if (text.length > 2000) score += 10;

  if (score > 100) score = 100;

  return score;
}

/* =======================
   SKILL DETECTION FUNCTION
======================= */
function extractSkills(text) {
  const skillsList = [
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "python",
    "java",
    "html",
    "css",
    "sql",
    "api",
    "typescript",
    "bootstrap",
     "c++",
"tensorflow",
"pandas",
"numpy",
"power bi",
"matplotlib",
"git",
"github",
"mysql"
  ];

  const lowerText = text.toLowerCase();

  return skillsList.filter(skill =>
    lowerText.includes(skill)
  );
}


async function analyzeWithGroq(text) {
  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Analyze this resume like an ATS system.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "jobRole": "",
  "summary": "",
  "strengths": [],
  "suggestions": []
}

Rules:

- atsScore must be between 0 and 100
- strengths should contain 4 to 6 items
- suggestions should contain 4 to 6 items
- Return ONLY JSON
- No markdown
- No explanation

Resume:

${text}
`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let aiText = response.data.choices[0].message.content;

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return aiText;

  } catch (error) {

    console.log("Groq Error:");
    console.log(error.response?.data || error.message);

    throw error;

  }
}


async function analyzeWithCerebras(text) {
  try {

    const response = await axios.post(
      "https://api.cerebras.ai/v1/chat/completions",
      {
        model: "llama-3.3-70b",
        messages: [
          {
            role: "user",
            content: `
Analyze this resume like an ATS system.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "jobRole": "",
  "summary": "",
  "strengths": [],
  "suggestions": []
}

Rules:
- atsScore must be between 0 and 100
- strengths should contain 4 to 6 items
- suggestions should contain 4 to 6 items
- Return ONLY JSON
- No markdown
- No explanation

Resume:

${text}
`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${CEREBRAS_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let aiText = response.data.choices[0].message.content;

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return aiText;

  } catch (error) {

    console.log("Cerebras Failed...");
    throw error;

  }
}

async function analyzeWithDeepInfra(text) {
  try {

    const response = await axios.post(
      "https://api.deepinfra.com/v1/openai/chat/completions",
      {
        model: "meta-llama/Llama-3.3-70B-Instruct",
        messages: [
          {
            role: "user",
            content: `
Analyze this resume like an ATS system.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "jobRole": "",
  "summary": "",
  "strengths": [],
  "suggestions": []
}

Rules:
- atsScore must be between 0 and 100
- strengths should contain 4 to 6 items
- suggestions should contain 4 to 6 items
- Return ONLY JSON
- No markdown
- No explanation

Resume:

${text}
`
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPINFRA_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let aiText = response.data.choices[0].message.content;

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return aiText;

  } catch (error) {

    console.log("DeepInfra Failed...");
    throw error;

  }
}


async function analyzeResumeWithAI(text) {
  const prompt = `
Analyze this resume like an ATS system.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "jobRole": "",
  "summary": "",
  "strengths": [],
  "suggestions": []
}

Rules:
- atsScore must be between 0 and 100
- strengths should contain 4 to 6 items
- suggestions should contain 4 to 6 items
- Return ONLY JSON
- No markdown
- No explanation

Resume:
${text}
`;

  try {

    // ===== GEMINI =====
    try {

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      let aiText = response.text;

      if (typeof aiText === "function") {
        aiText = aiText();
      }

      aiText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return aiText;

    } catch (geminiError) {

      console.log("❌ Gemini Failed...");
      console.log("Trying Groq...");

      // ===== GROQ =====
      try {

    return await analyzeWithGroq(text);

} catch (groqError) {

    console.log("❌ Groq Failed...");
    console.log("Trying Cerebras...");

    try {

        return await analyzeWithCerebras(text);

    } catch (cerebrasError) {

        console.log("❌ Cerebras Failed...");
        console.log("Trying DeepInfra...");

        return await analyzeWithDeepInfra(text);

    }

}

    }

  } catch (error) {

    console.log("All AI Providers Failed:");
    console.log(error);

    return JSON.stringify({
      atsScore: 0,
      jobRole: "Not Available",
      summary: "AI Analysis Failed",
      strengths: [],
      suggestions: [
        "All AI providers are temporarily unavailable. Please try again later."
      ]
    });

  }
}
      

 


/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const bcrypt = await import("bcryptjs");

    const hashedPassword = await bcrypt.default.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User Registered Successfully ✅"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }

    const bcrypt = await import("bcryptjs");

    const isMatch = await bcrypt.default.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

   const token = jwt.sign(
  {
    id: user._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d"
  }
);

    res.status(200).json({
      message: "Login Successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
/* =======================
   UPLOAD ROUTE
======================= */
app.post("/upload", upload.single("resume"), async (req, res) => {
    const { userId } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const fileBuffer = await fs.promises.readFile(req.file.path);

let text = "";

// ---------------- PDF ----------------
if (req.file.mimetype === "application/pdf") {

  const dataBuffer = new Uint8Array(fileBuffer);

  const loadingTask = pdfjsLib.getDocument({
    data: dataBuffer,
    useSystemFonts: true,
    disableFontFace: true,
  });

  const pdfDoc = await loadingTask.promise;

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);

    const content = await page.getTextContent();

    const pageText = content.items
      .map(item => item.str)
      .join(" ");

    text += pageText + "\n";
  }

}

// ---------------- DOCX ----------------
else if (
  req.file.mimetype ===
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
) {

  const result = await mammoth.extractRawText({
    buffer: fileBuffer,
  });

  text = result.value;
}

// ---------------- Unsupported ----------------
else {

  return res.status(400).json({
    message: "Only PDF and DOCX files are supported."
  });

}

    // 🔥 AI LOGIC
  const score = 0;
const suggestions = generateSuggestions(score);
const skills = extractSkills(text);

const aiResult = await analyzeResumeWithAI(text);

console.log("AI Result:", aiResult);
let parsedAI = {};

try {
  parsedAI = JSON.parse(aiResult);
} catch (err) {
parsedAI = {
  atsScore: 0,
  jobRole: "Not Available",
  summary: "Not Available",
  strengths: [],
  suggestions: []
};
}

const email = extractEmail(text);
const phone = extractPhone(text);
const education = extractEducation(text);
const name = extractName(text);

await ResumeHistory.create({
  userId: userId,
  name: name,
  fileName: req.file.originalname,
  atsScore: parsedAI.atsScore || 0,
  summary: parsedAI.summary || "",
  strengths: parsedAI.strengths || [],
  suggestions: parsedAI.suggestions || []
});
console.log("SUMMARY CHECK =>");
console.log(parsedAI.summary);

 

res.json({
  message: "Resume processed successfully 🚀",
  file: req.file.filename,
  text: text,
 atsScore: parsedAI.atsScore || 0,
  skills: skills,
  jobRole: parsedAI.jobRole,
  summary: parsedAI.summary,
  aiSuggestions: parsedAI.suggestions,
  strengths: parsedAI.strengths,
  aiResult: aiResult,
  email: email,
  phone: phone,
  education: education,
  name: name,
  suggestions: suggestions
});

  }catch (error) {

  console.error("FULL ERROR =>", error);

  res.status(500).json({
    message: "Error reading PDF",
    error: error.message
  });
}
});

app.post("/match-jd", async (req, res) => {
  try {

    const { resumeText, jobDescription } = req.body;

    
  const prompt = `
Compare this Resume with this Job Description.

Return ONLY valid JSON.

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

let aiText = response.text;

if (typeof aiText === "function") {
  aiText = aiText();
}

aiText = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const result = JSON.parse(aiText);
   

    

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      matchScore: 0,
      matchedSkills: [],
      missingSkills: []
    });

  }
});

app.get("/history/:userId", async (req, res) => {
  try {

    const history = await ResumeHistory.find({
      userId: req.params.userId
    }).sort({
      uploadDate: -1,
    });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching history",
    });

  }
});


app.delete("/history/:id", async (req, res) => {
  try {
    await ResumeHistory.findByIdAndDelete(req.params.id);

    res.json({
      message: "Report Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
 

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});