import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
function Result() {
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const location = useLocation();
  const data = location.state;
  console.log(data);

const fileName = data?.file;
const atsScore = data?.atsScore || 0;
const skills = data?.skills || [];
const email = data?.email;
const phone = data?.phone;
const education = data?.education || [];
const name = data?.name || "Not Found";
const suggestions = data?.suggestions || [];
const strengths = data?.strengths || [];
const aiJobRole = data?.jobRole || "Not Available";
const aiSummary = data?.summary || "Not Available";
const aiSuggestions = data?.aiSuggestions || [];

const handleJDMatch = async () => {

  if (!jobDescription.trim()) {
    alert("Please paste Job Description");
    return;
  }

  try {
    setLoadingMatch(true);

    const response = await axios.post(
      "http://localhost:5000/match-jd",
      {
        resumeText: data?.text,
        jobDescription
      }
    );

    console.log(response.data);

    setMatchResult(response.data);

 } catch (error) {

  console.log(error);
  alert("JD Match Failed");

} finally {

  setLoadingMatch(false);

}
};
const downloadReport = () => {
 const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4"
});

doc.setFont("helvetica");
const cleanText = (text) => {
  return String(text || "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
  doc.setFillColor(37, 99, 235);
doc.rect(0, 0, 210, 30, "F");

doc.setTextColor(255, 255, 255);
doc.setFontSize(20);
doc.text("AI Resume Report", 20, 20);

doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Name: ${data?.name || "N/A"}`, 20, 40);
 if (atsScore >= 80) {
  doc.setTextColor(0, 128, 0); // Green
} else if (atsScore >= 60) {
  doc.setTextColor(255, 140, 0); // Orange
} else {
  doc.setTextColor(255, 0, 0); // Red
}

doc.text(`ATS Score: ${atsScore}%`, 20, 50);

doc.setTextColor(0, 0, 0);
  doc.text(`Job Role: ${data?.jobRole || "N/A"}`, 20, 60);

 doc.setFontSize(14);
doc.setTextColor(37, 99, 235);
doc.text("SUMMARY", 20, 80);

doc.setTextColor(0, 0, 0);
doc.setFontSize(12);

const cleanSummary = String(data?.summary || "N/A")
  .replace(/-/g, "-")
  .replace(/–/g, "-")
  .replace(/—/g, "-");

const summaryLines = doc.splitTextToSize(
  cleanText(data?.summary || "N/A"),
  170
);

doc.text(summaryLines, 20, 90, {
  lineHeightFactor: 1.3
});

// Dynamic Y Position
let y = 90 + (summaryLines.length * 7) + 10;

doc.setFontSize(14);
doc.setTextColor(22, 163, 74);
doc.text("AI STRENGTHS", 20, y);

doc.setTextColor(0, 0, 0);
doc.setFontSize(12);
y += 10;

(data?.strengths || []).forEach((item) => {
  const cleanItem = item
    .replace(/-/g, "-")
    .replace(/–/g, "-")
    .replace(/—/g, "-");

 doc.text(`• ${cleanText(cleanItem)}`, 20, y, {
  maxWidth: 170
});
  y += 10;
});
y += 10;

doc.setFontSize(14);
doc.setTextColor(220, 38, 38);
doc.text("AI SUGGESTIONS", 20, y);

doc.setTextColor(0, 0, 0);
doc.setFontSize(12);
y += 10;

(data?.aiSuggestions || []).forEach((item) => {

  const cleanItem = item
    .replace(/-/g, "-")
    .replace(/–/g, "-")
    .replace(/—/g, "-");

  const lines = doc.splitTextToSize(
  `• ${cleanText(cleanItem)}`,
  170
);

doc.text(lines, 20, y, {
  lineHeightFactor: 1.3
});

y += (lines.length * 6) + 4;
});

doc.setFillColor(37, 99, 235);
doc.rect(0, 287, 210, 10, "F");

doc.setTextColor(255, 255, 255);
doc.setFontSize(9);

doc.text(
  "Developed by Divyanshu Gangwar | AI Resume Analyzer",
  10,
  293
);

doc.text(
  new Date().toLocaleDateString(),
  175,
  293
);
  doc.save("AI_Resume_Report.pdf");
};
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">

      <h1 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
  AI Resume Report
</h1>
<div className="flex justify-center mt-4 mb-8">
  <button
    onClick={downloadReport}
    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl transition"
  >
    📥 Download Report
  </button>
</div>

<div className="text-center mb-6">
  <h2 className="text-2xl font-bold text-white">
    👤 {name}
  </h2>
</div> 

<p className="text-center text-green-400 mt-2">
  AI Role: {aiJobRole}
</p>

      <p className="text-center text-purple-400 mb-8">
  {skills.length} Skills Detected 🚀
</p>

      {/* FILE NAME */}
      {fileName && (
<div className="w-fit mx-auto mb-10 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
    <p className="text-gray-400">
      📄 Analyzed File
    </p>

    <p className="text-purple-400 break-all mt-2">
      {fileName}
    </p>
  </div>
)}

      {/* SCORE */}
     <div className="text-center mb-12">
  <div className="w-56 h-56 mx-auto rounded-full border-8 border-purple-500 flex items-center justify-center bg-white/5 shadow-lg shadow-purple-500/20">

    <div>
      <p className="text-gray-400">
        ATS Score
      </p>

      <h2
        className={`text-6xl font-bold mt-2 ${
          atsScore >= 80
            ? "text-green-500"
            : atsScore >= 60
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {atsScore}%
      </h2>
    </div>

  </div>
</div>



      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
          <h3 className="text-gray-400">Skills Found</h3>
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
  {skills.map((skill, index) => (
    <span
  key={index}
  className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500 rounded-full text-sm hover:scale-105 transition-all duration-300"
>
      {skill}
    </span>
  ))}
</div>
        </div>
<div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
  <h3 className="text-gray-400">Contact</h3>

  <p className="mt-3 text-white break-all">
  📧 {email}
</p>

<p className="mt-2 text-purple-400">
  📱 {phone}
</p>
</div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
          <h3 className="text-gray-400">Job Match</h3>
         <p className="mt-3 text-green-400 text-lg">
  {aiJobRole}
</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
          <h3 className="text-gray-400">Profile Strength</h3>
          <p className="mt-3 text-lg">
  {atsScore >= 80
    ? "💪 Strong"
    : atsScore >= 60
    ? "⚡ Moderate"
    : "🔧 Needs Improvement"}
</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
  <h3 className="text-gray-400">Education</h3>

 <div className="mt-3 flex flex-wrap gap-2 justify-center">
  {education.map((item, index) => (
    <span
      key={index}
      className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-purple-500 rounded-full text-sm hover:scale-105 transition-all duration-300"
    >
      🎓 {item}
    </span>
  ))}
</div> 
</div>

      </div>

     <div className="max-w-5xl mx-auto mt-8 mb-8 grid md:grid-cols-3 gap-4">

  <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
    <h3 className="text-purple-400 text-2xl font-bold">
      {skills.length}
    </h3>
    <p className="text-gray-400">
      Skills Found
    </p>
  </div>

  <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
    <h3 className="text-green-400 text-2xl font-bold">
      {education.length}
    </h3>
    <p className="text-gray-400">
      Education Entries
    </p>
  </div>

  <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
    <h3 className="text-yellow-400 text-2xl font-bold">
      {suggestions.length}
    </h3>
    <p className="text-gray-400">
      AI Suggestions
    </p>
  </div>

</div>

     <div className="max-w-5xl mx-auto mt-10 mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20">
  <h2 className="text-xl font-bold mb-3">
    Resume Summary
  </h2>

 <p className="text-gray-300 leading-7">
  {aiSummary}
</p>
</div>

<div className="max-w-5xl mx-auto mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">

  <h2 className="font-bold mb-4">
    Top Skills
  </h2>

  <div className="flex flex-wrap gap-3">
    {skills.slice(0, 6).map((skill, index) => (
      <span
        key={index}
        className="px-4 py-2 bg-purple-600/20 border border-purple-500 rounded-full"
      >
        ⭐ {skill}
      </span>
    ))}
  </div>

</div>

<div className="max-w-5xl mx-auto mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">

  <div className="flex justify-between mb-3">
    <h2 className="font-bold">
      Resume Strength
    </h2>

    <span className="text-purple-400">
      {atsScore}%
    </span>
  </div>

  <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
    <div
      className={`h-full transition-all duration-1000 ${
        atsScore >= 80
          ? "bg-green-500"
          : atsScore >= 60
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{ width: `${atsScore}%` }}
    />
  </div>

</div>

<div className="max-w-5xl mx-auto mb-8">
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">

    <h2 className="text-xl font-bold mb-3">
      Resume Grade
    </h2>

    <div className="text-5xl font-extrabold">
      {atsScore >= 90
        ? "A+"
        : atsScore >= 80
        ? "A"
        : atsScore >= 70
        ? "B+"
        : atsScore >= 60
        ? "B"
        : "C"}
    </div>

  </div>
</div>

<div className="max-w-5xl mx-auto mb-8">

  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

    <div className="flex justify-between mb-3">
      <h2 className="font-bold">
        Resume Completeness
      </h2>

      <span className="text-purple-400">
        {Math.min(100, skills.length * 5)}%
      </span>
    </div>

    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
      <div
        className="bg-purple-500 h-full"
        style={{
          width: `${Math.min(100, skills.length * 5)}%`
        }}
      />
    </div>

  </div>

</div>    

<div className="max-w-5xl mx-auto mt-10 mb-8 p-6 rounded-2xl bg-gradient-to-r from-yellow-900/20 to-purple-900/20 border border-yellow-500/20">

  <h2 className="font-bold text-xl mb-4">
    ⭐ AI Strengths
  </h2>

  <div className="flex flex-wrap gap-3">
    {strengths.map((item, index) => (
      <span
        key={index}
        className="px-4 py-2 bg-yellow-600/20 border border-yellow-500 rounded-full hover:scale-105 transition-all duration-300"
      >
        ⭐ {item}
      </span>
    ))}
  </div>

</div>


      {/* SUGGESTIONS */}
     <div className="max-w-5xl mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-r from-green-900/20 to-purple-900/20 border border-green-500/20">
        <h2 className="font-bold mb-4">AI Suggestions</h2>

      <div className="flex flex-wrap gap-3">
  {aiSuggestions.map((item, index) => (
    <span
      key={index}
      className="px-4 py-2 bg-green-600/20 border border-green-500 rounded-full hover:scale-105 transition-all duration-300"
    >
      💡 {item}
    </span>
  ))}
</div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 p-6 rounded-2xl bg-white/5 border border-white/10">

  <h2 className="text-xl font-bold mb-4">
    🎯 Job Description Match
  </h2>

  <textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste Job Description Here..."
    className="w-full h-40 bg-black/30 border border-white/10 rounded-xl p-4 text-white outline-none"
  />

 <button
  onClick={handleJDMatch}
  disabled={loadingMatch}
  className="mt-4 px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700 transition flex items-center gap-2"
>
  {loadingMatch ? (
    <>
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Analyzing...
    </>
  ) : (
    "Analyze Match"
  )}
</button>
{loadingMatch && (
  <p className="mt-3 text-purple-400 animate-pulse">
    🤖 AI is comparing your resume with the Job Description...
  </p>
)}

{matchResult && (

  <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10">

    <h3 className="text-xl font-bold mb-4">
      🎯 Match Score: {matchResult.matchScore}%
    </h3>

    <div className="mb-4">
      <h4 className="text-green-400 font-bold">
        ✅ Matched Skills
      </h4>

      <div className="flex flex-wrap gap-2 mt-2">
        {matchResult.matchedSkills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-green-600/20 border border-green-500 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-red-400 font-bold">
        ❌ Missing Skills
      </h4>

      <div className="flex flex-wrap gap-2 mt-2">
        {matchResult.missingSkills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-red-600/20 border border-red-500 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

  </div>

)}

</div>

      <div className="max-w-5xl mx-auto mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-green-900/20 border border-purple-500/20">

  <h2 className="font-bold text-xl mb-4">
    Recruiter Recommendation
  </h2>

  <p className="text-gray-300">
    {atsScore >= 90
      ? "Highly Recommended for Interviews 🚀"
      : atsScore >= 75
      ? "Good Candidate with Strong Potential ⭐"
      : atsScore >= 60
      ? "Needs Minor Improvements 📈"
      : "Needs Significant Resume Improvements ⚠️"}
  </p>

</div>

    </div>
  );
}

export default Result;