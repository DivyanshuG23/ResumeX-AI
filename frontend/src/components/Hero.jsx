import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex items-center justify-center text-center px-6">

      <div className="max-w-4xl">

        <div className="mb-6 inline-block px-4 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300">
          AI Powered Resume Analysis
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Build a <span className="text-purple-500">Perfect Resume</span> with AI
        </h1>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
          Get ATS score, skill detection and job recommendations instantly.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <button
            onClick={() => navigate("/upload")}
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
          >
            Upload Resume
          </button>

          <button className="px-8 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
            Learn More
          </button>

        </div>

      </div>

    </div>
  );
}

export default Hero;