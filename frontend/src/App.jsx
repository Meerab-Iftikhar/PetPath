// import React from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Pets from "./Pages/Pets";
import Services from "./Pages/Services";
import ContactUs from "./Pages/ContactUs";
import NavBar from "./Components/NavBar";
import AdminNav from "./Components/AdminNav";
import Footer from "./Components/Footer";
import AdminPanel from "./Pages/AdminPanel";
import AllReq from "./AdminPages/AllReq";
import ApprovedReq from "./AdminPages/ApprovedReq";
import AdoptionReq from "./AdminPages/AdoptionReq";
import AllAdopted from "./AdminPages/AllAdopted";
import AdminLogin from "./AdminPages/AdminLogin";

const App = () => {
  return (
  <Router>
    <Routes>
        {/* Admin pages will use AdminNav */}
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/admin" element={<><AdminNav /><AdminPanel /></>} />
        <Route path="/admin/AllReq" element={<><AdminNav /><AllReq /></>} />
        <Route path="/admin/ApprovedReq" element={<><AdminNav /><ApprovedReq /></>} />
        <Route path="/admin/AdoptionReq" element={<><AdminNav /><AdoptionReq /></>} />
        <Route path="/admin/AllAdopted" element={<><AdminNav /><AllAdopted /></>} />
      </Routes>
       {/* Routes for other pages */}
       <Routes>
        {/* Other pages will use NavBar */}
        <Route path="/" element={<><NavBar /><Home /></>} />
        <Route path="/pets" element={<><NavBar /><Pets /></>} />
        <Route path="/services" element={<><NavBar /><Services /></>} />
        <Route path="/contact" element={<><NavBar /><ContactUs /></>} />
      </Routes>
      {window.location.pathname !== '/admin' && window.location.pathname !== '/admin/AllReq' && window.location.pathname !== '/adminlogin' && window.location.pathname !== '/admin/ApprovedReq' && window.location.pathname !== '/admin/AdoptionReq' && window.location.pathname !== '/admin/AllAdopted' && <Footer />}
    <Toaster/>
  </Router>
  );
};

export default App;
