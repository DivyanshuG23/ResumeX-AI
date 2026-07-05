import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Register() {
    const navigate = useNavigate();
   const handleRegister = async () => {
  try {
    setLoading(true);

    const response = await fetch("https://resumex-ai-jhrt.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      return alert(data.message);
    }

    setSuccess("✅ Account Created Successfully");
    setRegistered(true);

    // 1.2 second baad Login page
    setTimeout(() => {
      navigate("/login");
    }, 4000);

  } catch (error) {
    console.log(error);
    setLoading(false);
    alert("Registration Failed ❌");
  }
};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [registered, setRegistered] = useState(false);

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white relative overflow-hidden px-6">
    {/* Background Effects */}

<div className="absolute top-[-250px] left-[-250px] w-[650px] h-[650px] bg-cyan-500/15 rounded-full blur-[180px]"></div>

<div className="absolute bottom-[-250px] right-[-250px] w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[180px]"></div>

<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[180px]"></div>
    <div
      className="w-full max-w-md p-10 rounded-3xl
     bg-[#050816]/80 backdrop-blur-2xl
     border border-cyan-400/15
     shadow-[0_25px_80px_rgba(34,211,238,.12)]
      relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-pink-600/20 blur-3xl rounded-full"></div>

      {!registered ? (
        <>
         <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-500 bg-clip-text text-transparent">
ResumeX
</h1>

<h2 className="text-2xl font-semibold text-center mt-4">
Create Account 🚀
</h2>
          <p className="text-center text-gray-400 mt-3 mb-8">
            Join ResumeX and unlock next-generation AI Resume Analysis.
          </p>

          <div className="flex justify-center mt-5">

<span
className="px-5 py-2 rounded-full
bg-cyan-500/10
border border-cyan-400/20
text-cyan-300
text-sm
tracking-widest">

AI POWERED ATS ANALYZER

</span>

</div>

          <div className="mb-5 relative z-10">
            <label className="block text-sm text-slate-300 tracking-wide mb-2">
              Full Name
            </label>

            <input
              type="text"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl bg-[#0b1120]/80
border
border-cyan-400/15
text-white
placeholder:text-slate-500
focus:border-cyan-400
focus:ring-4
focus:ring-cyan-400/20
transition-all
duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5 relative z-10">
            <label className="block text-sm text-slate-300 tracking-wide mb-2">
              Email Address
            </label>

            <input
              type="email"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl bg-[#0b1120]/80
border
border-cyan-400/15
text-white
placeholder:text-slate-500
focus:border-cyan-400
focus:ring-4
focus:ring-cyan-400/20
transition-all
duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-7 relative z-10">
            <label className="block text-sm text-slate-300 tracking-wide mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0b1120]/80
border
border-cyan-400/15
text-white
placeholder:text-slate-500
focus:border-cyan-400
focus:ring-4
focus:ring-cyan-400/20
transition-all
duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[43px] text-gray-400 hover:text-cyan-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl
            bg-gradient-to-r
from-cyan-500
via-blue-600
to-purple-700
hover:scale-[1.03]
hover:shadow-[0_0_45px_rgba(34,211,238,.55)]
transition-all
duration-500
font-semibold
tracking-wide
            disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center text-center py-10 px-4">

          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center text-5xl text-green-400 animate-pulse">
            ✓
          </div>

         <h1 className="text-3xl md:text-4xl font-bold mt-8 text-center w-full">
            Account Created
          </h1>

          <p className="text-xl md:text-2xl text-green-400 font-semibold mt-2 text-center w-full">
            Successfully!
          </p>

<p className="text-gray-400 mt-5 text-center w-full">
            Welcome to ResumeAI 🚀
          </p>

          <div className="mt-10 w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-6 text-gray-300 text-center w-full">
            Redirecting to Login...
          </p>

        </div>
      )}
    </div>
  </div>
);
}

export default Register;