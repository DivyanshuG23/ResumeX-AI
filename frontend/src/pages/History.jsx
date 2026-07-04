import { useEffect, useState } from "react";
function History() {
    const [history, setHistory] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
  fetch(`https://resumex-ai-jhrt.onrender.com/history/${user.id}`)
    .then((res) => res.json())
    .then((data) => {
      setHistory(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (
   <div className="min-h-screen bg-[#030712] text-white relative overflow-hidden py-16 px-6 ">
    {/* Background Glow */}
  <div className="absolute top-[-250px] left-[-250px] w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[180px]"></div>

  <div className="absolute bottom-[-250px] right-[-250px] w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[180px]"></div>

  <div className="relative z-10"></div>
    <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.25] pb-2 text-center bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-500 bg-clip-text text-transparent">
  Resume History
</h1>

<p className="text-center text-gray-400 mt-4 mb-12">
  View all your AI analyzed resumes in one place.
</p>

     <div className="space-y-6 max-w-2xl mx-auto">

  {history.map((item) => (
  <div
    key={item._id}
   className="
bg-[#050816]/80
backdrop-blur-3xl
border
border-cyan-400/15
rounded-3xl
p-8
shadow-[0_0_35px_rgba(34,211,238,.08)]
transition-all
duration-500
hover:-translate-y-2
hover:border-cyan-400/40
hover:shadow-[0_0_45px_rgba(34,211,238,.20)]
"
  >
    <div className="flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-white">
          📄 {item.fileName}
        </h2>

        <p className="text-gray-400 mt-2">
          📅 {new Date(item.uploadDate).toLocaleDateString()}
        </p>
      </div>

      <div className="text-center">
  <p className="text-xs text-gray-400 mb-1">
    ATS SCORE
  </p>

  <div
    className={`text-xl font-bold px-4 py-2 rounded-xl
    ${
      item.atsScore >= 80
        ? "bg-green-500/20 text-green-400"
        : item.atsScore >= 60
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-red-500/20 text-red-400"
    }`}
  >
    {item.atsScore}%
  </div>
</div>

    </div>

    <div className="mt-6 flex gap-3">

      <button
  onClick={() => setSelectedReport(item)}
  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
>
  View Report
</button>

    <button
  onClick={async () => {
    await fetch(`https://resumex-ai-jhrt.onrender.com/history/${item._id}`, {
      method: "DELETE",
    });

    setHistory(history.filter((report) => report._id !== item._id));
  }}
  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
>
  Delete
</button>

    </div>
  </div>
))}
</div>

{selectedReport && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

    <div className="bg-[#1a1a1a] p-8 rounded-3xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">

     <h2 className="text-3xl font-bold mb-2 text-purple-400">
  👤 {selectedReport.name}
</h2>

<p className="text-gray-400 mb-5">
  Resume Analysis Report
</p>

      <p className="mb-3">
        <strong>ATS Score:</strong> {selectedReport.atsScore}%
      </p>

      <p className="mb-3">
        <strong>Summary:</strong> {selectedReport.summary}
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3 text-green-400">
  Strengths
</h3>

<ul className="list-disc pl-6">
  {selectedReport.strengths?.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

<h3 className="text-xl font-bold mt-6 mb-3 text-yellow-400">
  Suggestions
</h3>

<ul className="list-disc pl-6">
  {selectedReport.suggestions?.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

      <button
        onClick={() => setSelectedReport(null)}
        className="mt-6 px-5 py-2 bg-red-600 rounded-xl hover:bg-red-700"
      >
        Close
      </button>

    </div>

  </div>
)}
    </div>
  );
}

export default History;