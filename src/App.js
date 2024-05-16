import { useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home";
import MainLayout from "./layout";

import "./styles/App.css"

const App = () => {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout projectsRef={projectsRef} contactRef={contactRef} />}>
            <Route path="/" element={<Home projectsRef={projectsRef} contactRef={contactRef} />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
