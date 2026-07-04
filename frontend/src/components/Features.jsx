function Features() {
  const features = [
    {
      title: "ATS Score Analysis",
      desc: "AI evaluates your resume for ATS compatibility and scoring.",
      icon: "📊",
    },
    {
      title: "Skill Detection",
      desc: "Automatically detects technical and soft skills from resume.",
      icon: "🧠",
    },
    {
      title: "Job Matching",
      desc: "Recommends best job roles based on your profile.",
      icon: "💼",
    },
    {
      title: "AI Suggestions",
      desc: "Gives smart AI-powered improvements for your resume.",
      icon: "🚀",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-28">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold">
          Powerful <span className="text-purple-500">AI Features</span>
        </h2>

        <p className="text-gray-400 mt-4">
          Built to make your resume stand out in seconds
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {features.map((f, i) => (
          <div
            key={i}
            className="group p-7 rounded-2xl bg-white/5 border border-white/10
            hover:bg-white/10 hover:scale-[1.04] transition duration-300
            hover:shadow-lg hover:shadow-purple-500/10"
          >

            {/* Icon */}
            <div className="text-4xl mb-4 group-hover:scale-110 transition">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mt-3 leading-relaxed">
              {f.desc}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Features;