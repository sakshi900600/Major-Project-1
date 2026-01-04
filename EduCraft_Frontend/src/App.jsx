import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Pages/HomePage/Home";
import SignIn from "./Pages/AuthPage/SignIn";
import SignUp from "./Pages/AuthPage/SignUp";
import Courses from "./Pages/CoursesPage/Courses";
import AdminPage from "./Pages/AdminPage/AdminPage";
import CoursePage from "./Pages/CoursePage/CoursePage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import BlogDetail from "./Pages/BlogPage/BlogComponents/BlogDetail/BlogDetail";
import TestPage from "./Pages/TestPage/testPage";
import SubmoduleDetail from "./Pages/CoursePage/components/SubmoduleDetail/SubmoduleDetail";
import Profile from "./Pages/ProfilePage/Profile";


function App() {
  return (
    <>

      <Navbar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CoursePage />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/course/:slug/submodule/:submoduleId" element={<SubmoduleDetail />} />
      </Routes>

      <Footer />


      
    </>
  );
}

export default App;
