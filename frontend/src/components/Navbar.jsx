import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10">

      {/* Logo */}
      <h1 className="text-xl font-bold tracking-wide">
        AI Resume <span className="text-purple-500">Analyzer</span>
      </h1>

      {/* Right Button */}
      <Link
  to="/upload"
  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
>
  Upload Resume
</Link>

    </div>
  );
}

export default Navbar;