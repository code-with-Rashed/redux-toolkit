import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/edit/:bookId" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
