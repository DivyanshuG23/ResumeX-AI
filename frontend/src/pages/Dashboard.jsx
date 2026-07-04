import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-4">
        Welcome Divyanshu 🚀
      </h1>

      <p className="text-gray-400 mb-6">
        AI Resume Analyzer Dashboard
      </p>

      <div className="flex gap-4 mt-6">

  <button
    className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
  >
    Analyze Resume
  </button>

  <button
  onClick={() => navigate("/history")}
  className="px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-700"
>
  Resume History
</button>
</div>

      <button
        className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700"
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;
