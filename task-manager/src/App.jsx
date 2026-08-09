import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/add-task" element={<Add />} />
        <Route path="/edit-task/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
