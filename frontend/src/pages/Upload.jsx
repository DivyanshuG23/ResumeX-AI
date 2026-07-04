import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  // handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // drag over prevent default
  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("resume", file);

  const user = JSON.parse(localStorage.getItem("user"));

  formData.append("userId", user.id);

  try {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/upload",
      formData
    );

    console.log("FULL DATA:", response.data);

    navigate("/processing", {
      state: response.data
    });

  } catch (error) {
    setLoading(false);
    console.error(error);
    alert("Upload Failed");
  }
};
  return (
   <div className="min-h-screen flex items-center justify-center px-6 bg-[#030712] text-white relative overflow-hidden">
    {/* Background Effects */}

<div className="absolute top-[-250px] left-[-250px] w-[650px] h-[650px] bg-cyan-500/15 rounded-full blur-[180px]"></div>

<div className="absolute bottom-[-250px] right-[-250px] w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[180px]"></div>

<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[180px]"></div>

      <div className="w-full max-w-2xl p-10 rounded-2xl bg-[#050816]/80 border border-cyan-400/15 backdrop-blur-3xl text-center">

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-500 bg-clip-text text-transparent">
ResumeX
</h1>

<h2 className="text-2xl font-semibold mt-5">
Upload Your Resume 🚀
</h2>

        <p className="text-gray-400 mt-3">
         Upload your resume and let AI generate ATS score, strengths, suggestions and job matching instantly.
        </p>

        {/* DROP AREA */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
         className="
mt-10
border-2
border-dashed
border-cyan-400/20
rounded-3xl
p-16
bg-gradient-to-br
from-cyan-500/5
via-transparent
to-purple-500/5
hover:border-cyan-300
hover:bg-cyan-500/10
transition-all
duration-500
cursor-pointer
group"
        >
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />

          <label htmlFor="fileInput" className="cursor-pointer">
            <p className="text-gray-300">
             ☁️ Drop Resume Here
            </p>
            <p className="text-gray-600 text-sm mt-2">
             Supported Format • PDF • Max Size 5 MB
            </p>
          </label>
        </div>

        {/* FILE PREVIEW */}
        {file && (
          <div className="
mt-6
inline-flex
items-center
gap-3
px-5
py-3
rounded-xl
bg-cyan-500/10
border
border-cyan-400/20
text-cyan-300">
            Selected File: {file.name}
          </div>
        )}

        {/* BUTTON */}
   <button
  disabled={!file || loading}
  onClick={handleUpload}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  style={{
    background: hover
      ? "#22d3ee"
      : "#0891b2",
    transition: "0.3s",
    transform: hover ? "scale(1.05)" : "scale(1)",
    boxShadow: hover
      ? "0 0 25px rgba(34,211,238,.6)"
      : "none"
  }}
  className="mt-8 px-8 py-3 rounded-xl text-white font-semibold"
>
  {loading ? (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      AI is Analyzing...
    </div>
  ) : (
    "🚀 Analyze Resume"
  )}
</button>
      </div>

    </div>
  );
}

export default Upload;