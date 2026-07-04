import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import Result from "./pages/Result";
import Register from "./pages/Register";
import Login from "./pages/Login"; 
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">

      <BrowserRouter>
        <Routes>

          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
   

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>
          {/* UPLOAD PAGE */}
          <Route
  path="/upload"
  element={
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  }
/>
          {/* PROCESSING PAGE */}
          <Route path="/processing" element={<Processing />} />

          {/* RESULT PAGE */}
          <Route
  path="/result"
  element={
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  }
/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;