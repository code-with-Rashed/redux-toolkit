import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./component/Layout";
import Home from "./page/Home";
import AddJob from "./page/AddJob";
import EditJob from "./page/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="job">
            <Route path="add" element={<AddJob />} />
            <Route path="edit" element={<EditJob />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
