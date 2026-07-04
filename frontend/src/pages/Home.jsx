import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import emailjs from "@emailjs/browser";
import aiResume from "../assets/cards/ai-resume.png";
import atsOptimization from "../assets/cards/ats-optimization.png";
import instantInsights from "../assets/cards/instant-insights.png";
import atsScanner from "../assets/features/ats-scanner.png";
import skillDetection from "../assets/features/skill-detection.png";
import jobMatching from "../assets/features/job-matching.png";
import analytics from "../assets/features/resume-analytics.png";
import lightning from "../assets/features/lightning-fast.png";
import security from "../assets/features/secure-processing.png";
import lightningFast from "../assets/why/lightning-fast.png";
import atsOptimizations from "../assets/why/ats-optimization.png";
import smartAI from "../assets/why/smart-ai.png";
import detailedReport from "../assets/why/detailed-report.png";
import JobMatching from "../assets/why/job-matching.png";
import securePrivate from "../assets/why/secure-private.png";
import heroBg from "../assets/backgrounds/hero-bg.png";
import { useNavigate } from "react-router-dom";

const SectionDivider = () => {
  return <div className="h-16 md:h-20"></div>;
};


import { useState } from "react";

function Home() {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

const handleContact = async () => {

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  try {

    await emailjs.send(
     "service_e6p337y",
      "template_kv0cc2h",
      {
        from_name: name,
        from_email: email,
        message: message,
      },
      "9PcP-9dnrT9endySV"
    );

    alert("Message Sent Successfully ✅");

    setName("");
    setEmail("");
    setMessage("");

  } catch (error) {

    console.log(error);

    alert("Failed to send message ❌");

  }

};

const smoothScroll = (id) => {
  const section = document.getElementById(id);

  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: "smooth",
    });
  }
};
  
  return (
    <div className="bg-[#020617] text-white selection:bg-cyan-400 selection:text-black">

      {/* ================= PREMIUM NAVBAR ================= */}
      <nav className="
fixed top-0 left-0
w-full
z-50
backdrop-blur-3xl
bg-[#020617]/75
border-b border-cyan-400/10
shadow-[0_8px_40px_rgba(0,255,255,.06)]
transition-all
duration-500
">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO (GRADIENT) */}
        <h1
className="
text-3xl
font-black
tracking-tight
bg-gradient-to-r
from-cyan-300
via-sky-400
to-blue-500
bg-clip-text
text-transparent
drop-shadow-[0_0_18px_rgba(34,211,238,.45)]
cursor-pointer
select-none
transition-all
duration-500
hover:scale-105
"
>
Resume<span className="text-white">X</span>
</h1>
          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">

          <a
  href="#features"
  onClick={(e) => {
    e.preventDefault();
    smoothScroll("features");
  }}
  className="
relative
text-slate-300
font-medium
tracking-wide
transition-all
duration-300
hover:text-cyan-300
after:absolute
after:left-0
after:-bottom-2
after:h-[2px]
after:w-0
after:bg-cyan-400
after:transition-all
after:duration-300
hover:after:w-full
"
>
  Features
</a>
          <a
  href="#why"
  onClick={(e) => {
    e.preventDefault();
    smoothScroll("why");
  }}
 className="
relative
text-slate-300
font-medium
tracking-wide
transition-all
duration-300
hover:text-cyan-300
after:absolute
after:left-0
after:-bottom-2
after:h-[2px]
after:w-0
after:bg-cyan-400
after:transition-all
after:duration-300
hover:after:w-full
"
>
  Why Us
</a>

         <a
  href="#contact"
  onClick={(e) => {
    e.preventDefault();
    smoothScroll("contact");
  }}
  className="
relative
text-slate-300
font-medium
tracking-wide
transition-all
duration-300
hover:text-cyan-300
after:absolute
after:left-0
after:-bottom-2
after:h-[2px]
after:w-0
after:bg-cyan-400
after:transition-all
after:duration-300
hover:after:w-full
"
>
  Contact
</a>

          </div>

          {/* DESKTOP AUTH */}
         <div className="hidden md:flex items-center gap-3">

  {!token ? (
    <>
      <Link to="/login">
        <button className="
px-6
py-2.5
rounded-xl
border
border-cyan-400/20
bg-white/5
text-cyan-300
font-semibold
backdrop-blur-xl
hover:bg-cyan-500/10
hover:border-cyan-300
hover:shadow-[0_0_25px_rgba(34,211,238,.35)]
transition-all
duration-300
">
          Login
        </button>
      </Link>

      <Link to="/register">
        <button className="
px-7
py-2.5
rounded-xl
font-bold
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-600
hover:scale-105
hover:shadow-[0_0_35px_rgba(34,211,238,.5)]
transition-all
duration-300
">
          Sign Up
        </button>
      </Link>
    </>
  ) : (
    <>
      

      <Link to="/history">
        <button className="
px-7
py-2.5
rounded-xl
font-bold
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-600
hover:scale-105
hover:shadow-[0_0_35px_rgba(34,211,238,.5)]
transition-all
duration-300
">
          History
        </button>
      </Link>

      <button
        onClick={handleLogout}
        className="
px-7
py-2.5
rounded-xl
font-bold
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-600
hover:scale-105
hover:shadow-[0_0_35px_rgba(34,211,238,.5)]
transition-all
duration-300
"
      >
        Logout
      </button>
    </>
  )}

</div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
  className="
md:hidden
mx-4
mb-4
rounded-3xl
backdrop-blur-3xl
bg-[#050816]/95
border border-cyan-400/15
shadow-[0_20px_60px_rgba(0,229,255,.12)]
px-6
py-7
space-y-6
animate-[fadeIn_.35s_ease]
"
>

            <a href="#features" onClick={() => setOpen(false)} className="
block
text-slate-300
text-lg
font-medium
hover:text-cyan-300
hover:translate-x-2
transition-all
duration-300
">
              Features
            </a>

            <a href="#why" onClick={() => setOpen(false)} className="
block
text-slate-300
text-lg
font-medium
hover:text-cyan-300
hover:translate-x-2
transition-all
duration-300
">
              Why Us
            </a>

            <a href="#contact" onClick={() => setOpen(false)} className="
block
text-slate-300
text-lg
font-medium
hover:text-cyan-300
hover:translate-x-2
transition-all
duration-300
">
              Contact
            </a>

          <div className="pt-6 border-t border-cyan-400/10">

  {!token ? (

    <div className="flex gap-3">

      <Link
        to="/login"
        onClick={() => setOpen(false)}
        className="w-1/2"
      >
        <button className="
w-full
py-3
rounded-xl
border
border-cyan-400/20
text-cyan-300
bg-white/5
hover:bg-cyan-400/10
hover:border-cyan-300
transition-all
duration-300
">
          Login
        </button>
      </Link>

      <Link
        to="/register"
        onClick={() => setOpen(false)}
        className="w-1/2"
      >
        <button className="
w-full
py-3
rounded-xl
font-semibold
bg-gradient-to-r
from-cyan-500
via-purple-600
to-pink-600
shadow-[0_0_30px_rgba(34,211,238,.35)]
hover:scale-105
transition-all
duration-300
">
          Sign Up
        </button>
      </Link>

    </div>

  ) : (

    <div className="flex gap-3">

      <Link
        to="/history"
        onClick={() => setOpen(false)}
        className="w-1/2"
      >
        <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:bg-gradient-to-r from-cyan-500 to-blue-600">
          History
        </button>
      </Link>

      <button
        onClick={() => {
          handleLogout();
          setOpen(false);
        }}
        className="w-1/2 py-2 bg-gradient-to-r
from-red-500
to-pink-600 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>

    </div>

  )}

</div>
          </div>
        )}

      </nav>
        
            


         

      {/* ================= HERO (ELITE SAAS LEVEL) ================= */}
<section
className="
relative
min-h-screen
flex
items-center
justify-center
overflow-hidden
px-6
bg-[#020617]
"
>
  {/* Dark Overlay */}
  {/* <div className="absolute inset-0 bg-black/70"></div> */}

<div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px]" />

<div className="absolute bottom-[-250px] right-[-150px] w-[650px] h-[650px] bg-blue-500/10 rounded-full blur-[180px]" />

<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]"></div>
 

 

  {/* Content */}
  <div className="relative z-10 max-w-5xl text-center">

    <h1 className="text-6xl
md:text-8xl
leading-[1.1]
tracking-tight font-extrabold leading-tight">
      AI {" "}
     <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
Resume {" "}
</span>
Analyser
    </h1>

    <p className="text-gray-300 mt-8 text-xl max-w-2xl mx-auto leading-8">
     Analyze your resume with powerful AI,
improve ATS score,
discover missing skills,
and get personalized career insights in seconds.
    </p>

    <div className="mt-12 flex flex-col md:flex-row justify-center gap-5">

      <button
        onClick={() => {
  if (token) {
    navigate("/upload");
  } else {
    setShowLoginPopup(true);
  }
}}
        className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500
via-sky-500
to-blue-600 hover:shadow-[0_0_45px_rgba(34,211,238,.45)]  font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(168,85,247,.45)]"
      >
        Upload Resume
      </button>

      <a
        href="#features"
        className="px-10 py-4 rounded-2xl bg-[#0B1220] border border-cyan-500/20 backdrop-blur-xl font-semibold hover:border-cyan-300
hover:bg-cyan-500/10 hover:bg-white/15 transition-all duration-300"
      >
        Explore Features
      </a>

    </div>

    <p className="text-gray-400 mt-10 text-sm tracking-wide">
      ⭐⭐⭐⭐⭐ Trusted by Developers • Students • Professionals
    </p>

  </div>
</section>

<SectionDivider />


      {/* ================= STATS (ELITE SAAS LEVEL) ================= */}
{/* ================= TRUST STATS (INDUSTRY LEVEL) ================= */}
 
  <section className="relative max-w-6xl mx-auto px-6 py-24">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 flex justify-center items-center -z-10">
    <div className="w-[500px] h-[500px] bg-purple-600/15 blur-[160px] rounded-full"></div>
  </div>

  {/* HEADING */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 opacity-80"></div>
  <div className="absolute inset-0 rounded-3xl border border-purple-500/20 group-hover:border-purple-400/60 transition-all duration-500"></div>
  <div className="text-center mb-16">
   <h2 className="
text-5xl
md:text-6xl
font-black
tracking-tight
leading-tight
">
     Trusted By {" "}

<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
Modern Professionals
</span>
    </h2>

    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
     AI-powered resume intelligence trusted by students, software engineers, data analysts and hiring professionals across the globe.
    </p>
  </div>

  {/* STATS GRID */}
  <div className="grid md:grid-cols-3 gap-8">

   {[
  {
    image: aiResume,
    title: "AI Resume Intelligence",
    desc: "Get detailed AI-powered resume evaluation with smart insights."
  },
  {
    image: atsOptimization,
    title: "ATS Optimization",
    desc: "Improve your resume compatibility with modern ATS systems."
  },
  {
    image: instantInsights,
    title: "Smart Career Insights",
    desc: "Receive intelligent feedback and actionable suggestions instantly."
  }
].map((item, index) => (
      <div
        key={index}
        className="group relative overflow-hidden
p-8 rounded-3xl
bg-[#0B1220]
border
border-cyan-500/10
hover:border-cyan-400/40
shadow-[0_10px_35px_rgba(0,0,0,.35)]
hover:shadow-[0_0_35px_rgba(34,211,238,.18)]
backdrop-blur-2xl
border border-white/10
transition-all duration-500
hover:-translate-y-6
hover:scale-105
hover:rotate-[0.5deg]"
      >

        {/* ICON */}
        {/* IMAGE */}


<div className="w-full h-48 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-[#111827]
border
border-cyan-500/10">

  <img
    src={item.image}
    alt={item.title}
    className="w-44
group-hover:scale-125 object-contain
drop-shadow-[0_0_35px_rgba(34,211,238,.35)]
transition-all duration-700
group-hover:scale-110
group-hover:rotate-2"
 />


</div>
<div className="absolute -top-20 -right-20 w-52 h-52 bg-cyan-500/10 blur-[90px] rounded-full"></div>

<div className="absolute -bottom-20 -left-20 w-52 h-52 bg-blue-500/10 blur-[90px] rounded-full"></div>
{/* TITLE */}

<h3 className="text-2xl font-bold text-center tracking-wide bg-gradient-to-r
from-cyan-300
via-sky-300
to-blue-400
bg-clip-text
text-transparent group-hover:text-purple-300 transition duration-300">
  {item.title}
</h3>

{/* DESCRIPTION */}

<p className="mt-4 text-center text-slate-300 leading-7 text-[15px]">
  {item.desc}
</p>

        {/* BOTTOM GLOW LINE */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 group-hover:opacity-100 transition"></div>

      </div>
    ))}
  </div>

</section>

     
   
      
       
<SectionDivider />
    
    {/* ================= FEATURES (SAAS LEVEL) ================= */}

   <section id="features" className="relative max-w-6xl mx-auto px-6 py-24">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 opacity-80"></div>
  <div className="absolute inset-0 rounded-3xl border border-purple-500/20 group-hover:border-purple-400/60 transition-all duration-500"></div>
  <div className="absolute inset-0 flex justify-center items-center -z-10">
    <div className="w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full"></div>
  </div>

  {/* HEADING */}
  <div className="text-center mb-16">
   <h2 className="
text-5xl
md:text-6xl
font-black
tracking-tight
leading-tight
">
    AI That {""}

<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
Works For You
</span>
    </h2>

    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
     Powerful AI tools designed to analyze, optimize and elevate your resume for today's competitive job market.
    </p>
  </div>

  {/* GRID */}

  
  <div className="grid md:grid-cols-3 gap-8">

    {/* CARD */}
    {[
  {
    image: atsScanner,
    title: "ATS Resume Scanner",
    desc: "Evaluate your resume against modern Applicant Tracking Systems used by leading companies."
  },
  {
    image: skillDetection,
    title: "Intelligent Skill Detection",
    desc: "Automatically identify technical skills, soft skills and hidden strengths from your resume."
  },
  {
    image: jobMatching,
    title: "AI Job Recommendations",
    desc: "Discover job opportunities that perfectly match your skills and career goals."
  },
  {
    image: analytics,
    title: "Resume Performance Analytics",
    desc: "Visualize strengths, weaknesses, ATS score and improvement opportunities."
  },
  {
    image: lightning,
    title: "Lightning Fast Analysis",
    desc: "Receive comprehensive AI-powered resume feedback within just a few seconds."
  },
  {
    image: security,
    title: "Private & Secure Processing",
    desc: "Your resume stays encrypted, secure and is never stored without your permission."
  }
].map((item, index) => (
      <div
        key={index}
       className="group relative overflow-hidden
p-8 rounded-3xl
bg-gradient-to-br
bg-[#0B1220]
backdrop-blur-2xl
border border-cyan-500/10
hover:border-cyan-400/40
transition-all duration-500
hover:-translate-y-6
hover:scale-105
hover:shadow-[0_0_35px_rgba(34,211,238,.22)]"
      >

        <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br bg-[#111827]
border
border-cyan-500/10 flex items-center justify-center">

  <img
    src={item.image}
    alt={item.title}
    className="w-44 object-contain
drop-shadow-[0_0_35px_rgba(34,211,238,.35)]
transition-all duration-700
group-hover:scale-110
group-hover:rotate-2"
  />

</div>
<div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-500/20 blur-[90px] rounded-full"></div>

<div className="absolute -bottom-24 -left-24 w-52 h-52 bg-pink-500/20 blur-[90px] rounded-full"></div>

<h3 className="text-2xl font-bold text-center bg-gradient-to-r
from-cyan-300
via-sky-300
to-blue-400
bg-clip-text
text-transparent tracking-wide group-hover:text-purple-300 transition-all duration-300">
  {item.title}
</h3>

<p className="mt-4 text-center text-slate-300 leading-7 text-[15px]">
  {item.desc}
</p>

      </div>
    ))}

  </div>

</section>
      
 <SectionDivider />

     
       {/* ================= WHY CHOOSE US (SAAS LEVEL) ================= */}

<section id="why" className="relative max-w-6xl mx-auto px-6 py-24">

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 opacity-80"></div>
  <div className="absolute inset-0 rounded-3xl border border-purple-500/20 group-hover:border-purple-400/60 transition-all duration-500"></div>
  <div className="absolute inset-0 flex justify-center items-center -z-10">
    <div className="w-[500px] h-[500px] bg-purple-600/15 blur-[160px] rounded-full"></div>
  </div>

  {/* HEADING */}
  <div className="text-center mb-16">
    <h2
className="
text-5xl
md:text-6xl
font-black
tracking-tight
leading-tight
"
>
      Why {""}

<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
ResumeX 
</span>
    </h2>

    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
     Built with modern AI infrastructure to help you create resumes that stand out, pass ATS filters and impress recruiters.
    </p>
  </div>

  {/* GRID */}
  <div className="grid md:grid-cols-3 gap-8">

    {[
  {
    image: lightningFast,
    title: "Lightning Fast AI",
    desc: "Experience ultra-fast AI powered resume analysis with instant results."
  },
  {
    image: atsOptimization,
    title: "ATS Optimization",
    desc: "Optimize your resume to pass Applicant Tracking Systems with confidence."
  },
  {
    image: smartAI,
    title: "Smart AI Insights",
    desc: "Receive intelligent suggestions to improve every section of your resume."
  },
  {
    image: detailedReport,
    title: "Detailed Reports",
    desc: "Get a complete breakdown of strengths, weaknesses and improvement areas."
  },
  {
    image: jobMatching,
    title: "Job Matching",
    desc: "Find jobs that perfectly match your skills, experience and career goals."
  },
  {
    image: securePrivate,
    title: "Secure & Private",
    desc: "Your resume remains encrypted, private and never shared without permission."
  }
].map((item, index) => (
      <div
        key={index}
        className="group relative overflow-hidden
p-8 rounded-3xl
bg-gradient-to-br
bg-[#0B1220]
backdrop-blur-2xl
border border-cyan-500/10
hover:border-cyan-400/40
transition-all duration-500
hover:-translate-y-6
hover:scale-105
hover:shadow-[0_0_40px_rgba(34,211,238,.22)]"
      >

        {/* ICON */}
       {/* IMAGE */}

<div className="w-full h-44 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br bg-[#111827]
border
border-cyan-500/10 flex items-center justify-center">

  <img
    src={item.image}
    alt={item.title}
    className="w-44 object-contain
drop-shadow-[0_0_35px_rgba(34,211,238,.35)]
transition-all duration-700
group-hover:scale-110
group-hover:rotate-2"
  />

</div>
<div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-500/20 blur-[90px] rounded-full"></div>

<div className="absolute -bottom-24 -left-24 w-52 h-52 bg-pink-500/20 blur-[90px] rounded-full"></div>

{/* TITLE */}

<h3 className="text-2xl font-bold text-center bg-gradient-to-r
from-cyan-300
via-sky-300
to-blue-400
bg-clip-text
text-transparent tracking-wide group-hover:text-purple-300 transition-all duration-300">
  {item.title}
</h3>

{/* DESCRIPTION */}

<p className="mt-4 text-center text-slate-300 leading-7 text-[15px]">
  {item.desc}
</p>

      </div>
    ))}

  </div>

</section>
     


<SectionDivider />

          
      {/* ================= FOOTER ================= */}
<footer
  id="contact"
  className="
relative
bg-[#020617]
mt-1
py-24
px-6
overflow-hidden
border-t
border-cyan-500/10
"
>

  {/* BACKGROUND GLOW */}
  <div className="absolute inset-0 flex justify-center items-center -z-10">
    <div className="w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full"></div>
  </div>

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

    {/* LEFT SIDE */}
    <div>
      <h2 className="text-5xl md:text-6xl font-black tracking-tight">
        Let's Build Your {""}

<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">
Dream Career
</span>
      </h2>

      <p className="text-gray-400 mt-4 leading-relaxed">
        AI-powered resume analysis system designed to boost your career growth with smart insights and ATS optimization.
      </p>

      <div className="mt-8 text-gray-400 space-y-2">
        <p>📧 divyanshugangwar663@gmail.com</p>
        <p>📍 India</p>
      </div>

      <div className="mt-8 flex gap-4">

  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
    ⚡ AI Powered
  </div>

  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
    🔒 Secure
  </div>

  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
    🚀 Fast
  </div>

</div>

      {/* OWNER BADGE */}
      <div className="mt-8 inline-block px-4 py-2 rounded-lg bg-white/5 border border-cyan-500/10 text-sm text-gray-300">
        🚀 Crafted by <span className="text-purple-400 font-semibold">Divyanshu Gangwar</span>
      </div>
    </div>

    {/* RIGHT SIDE FORM */}
    <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg shadow-black/30">

      <input
  className="w-full p-3 mb-4 bg-[#111827] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400
focus:shadow-[0_0_20px_rgba(34,211,238,.20)] outline-none"
  placeholder="Your Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

     <input
  className="w-full p-3 mb-4 bg-[#111827] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400
focus:shadow-[0_0_20px_rgba(34,211,238,.20)] outline-none"
  placeholder="Your Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

     <textarea
  className="w-full p-3 mb-4 bg-[#111827] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400
focus:shadow-[0_0_20px_rgba(34,211,238,.20)] outline-none"
  placeholder="Your Message"
  rows="4"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
<button
  onClick={handleContact}
  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 rounded-lg font-semibold hover:shadow-[0_0_40px_rgba(34,211,238,.40)] hover:scale-105 transition shadow-lg shadow-purple-600/30"
>
  Send Message
</button>

    </div>

  </div>

  {/* COPYRIGHT */}
  <p className="text-center text-gray-500 mt-16 text-sm">
    © 2026 ResumeX AI. All rights reserved | Built with ❤️ by{" "}
    <span className="text-cyan-300 font-semibold">
      Divyanshu Gangwar
    </span>
  </p>

</footer>


{showLoginPopup && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[999]">

    <div className="w-[90%] max-w-md rounded-3xl bg-[#141414] border border-purple-500/20 shadow-2xl shadow-purple-900/40 p-8 text-center animate-[fadeIn_.3s_ease]">

      <div className="text-6xl mb-4">
        🔒
      </div>

      <h2 className="text-3xl font-bold text-white">
        Login Required
      </h2>

      <p className="text-gray-400 mt-4 leading-7">
        Please login or create an account before uploading your resume.
      </p>

      <div className="mt-6 text-left bg-white/5 rounded-xl p-4 border border-white/10">

        <p className="text-green-400">✓ AI Resume Analysis</p>
        <p className="text-green-400">✓ ATS Score</p>
        <p className="text-green-400">✓ Resume History</p>
        <p className="text-green-400">✓ PDF Report Download</p>

      </div>

      <p className="text-gray-500 text-sm mt-5">
        Please login using the navigation bar above.
      </p>

      <button
        onClick={() => setShowLoginPopup(false)}
        className="mt-7 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition"
      >
        OK
      </button>

    </div>

  </div>
)}
    </div>

    
  );
}

export default Home;

        

      
     

   