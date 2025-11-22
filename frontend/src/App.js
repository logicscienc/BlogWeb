import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import BlogContent from "./components/BlogContent";

function App() {
  return (
    <div>
      <Navbar />  
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/blog/:id" element={<BlogContent />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;

