import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/student/auth/Login";
import Register from "@/pages/student/auth/Register";
import AdminLogin from "@/pages/admin/auth/Login";
import StudentPortalLayout from "./components/student/Layout/StudentPortalLayout";
import Quiz from "./pages/student/Quiz";
import Leaderboard from "./pages/student/Leaderboard";
import Course from "./pages/student/Course";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* student panel related routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<StudentPortalLayout />}>
          <Route path="/course" element={<Course />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* admin panel related routes */}
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
