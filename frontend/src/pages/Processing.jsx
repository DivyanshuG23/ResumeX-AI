import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Processing() {
  const navigate = useNavigate();
  const location = useLocation();
  const resumeData = location.state;
  const fileName = resumeData?.file;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
           navigate("/result", {
  state: resumeData,
});
          }, 500);

          return 100;
        }
        return prev + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-6">

      <div className="text-center max-w-xl">

        <h2 className="text-3xl font-bold">
          AI is Analyzing Your Resume
        </h2>

        <p className="text-gray-400 mt-3">
          Extracting skills, checking ATS score, generating insights...
        </p>

        {/* FILE NAME */}
        {fileName && (
          <p className="text-purple-400 mt-3">
            File: {fileName}
          </p>
        )}

        {/* PROGRESS BAR */}
        <div className="w-full bg-white/10 rounded-full h-3 mt-8 overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-gray-400">
          {progress}% completed
        </p>

        {/* DOT LOADER */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></span>
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></span>
        </div>

      </div>

    </div>
  );
}

export default Processing;