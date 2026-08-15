import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/student/auth/Login";
import Register from "@/pages/student/auth/Register";
import AdminLogin from "@/pages/admin/auth/Login";
import StudentPortalLayout from "@/components/student/Layout/StudentPortalLayout";
import Quiz from "@/pages/student/Quiz";
import Leaderboard from "@/pages/student/Leaderboard";
import Course from "@/pages/student/Course";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Videos from "@/pages/admin/videos/Videos";
import AddVideo from "@/pages/admin/videos/AddVideo";
import EditVideo from "@/pages/admin/videos/EditVideo";
import Assignments from "@/pages/admin/assignment/assignments";
import AddAssignment from "@/pages/admin/assignment/AddAssignment";
import EditAssignment from "@/pages/admin/assignment/EditAssignment";
import Quizzes from "@/pages/admin/quiz/Quizzes";
import AddQuiz from "@/pages/admin/quiz/AddQuiz";
import EditQuiz from "@/pages/admin/quiz/EditQuiz";
import AssignmentsMarks from "@/pages/admin/assignment-mark/AssignmentsMarks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* student panel related routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<StudentPortalLayout />}>
          <Route path="/course/video?/:id?" element={<Course />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* admin panel related routes */}

        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/videos" element={<Videos />} />
          <Route path="/admin/video/add" element={<AddVideo />} />
          <Route path="video/edit/:id" element={<EditVideo />} />

          <Route path="/admin/assignments" element={<Assignments />} />
          <Route path="/admin/assignment/add" element={<AddAssignment />} />
          <Route
            path="/admin/assignment/edit/:id"
            element={<EditAssignment />}
          />

          <Route path="/admin/quizzes" element={<Quizzes />} />
          <Route path="/admin/quizzes/add" element={<AddQuiz />} />
          <Route path="/admin/quizzes/edit/:id" element={<EditQuiz />} />

          <Route
            path="/admin/assignments-marks"
            element={<AssignmentsMarks />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
