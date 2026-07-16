import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./page/Home";
import Video from "./page/Video";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Pagination from "./components/ui/Pagination";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}>
          Home
        </Route>
        <Route path="/video/:videoId" element={<Video />}>
          Video
        </Route>
      </Routes>
      <Pagination></Pagination>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
