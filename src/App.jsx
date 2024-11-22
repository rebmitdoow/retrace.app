//src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import TableRessources from "./pages/TableRessources.jsx";
import { HalfMoon, SunLight, InfoCircle } from "iconoir-react";
import Layout from "./components/layout";
import TableProjets from "./pages/TableProjets";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  useEffect(() => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path="ressources">
              <Route path=":batId" element={<TableRessources />} />
            </Route>
            <Route path="projets" element={<TableProjets />} />
          </Routes>
        </Router>
        <div className="fixed bottom-4 right-4 flex space-x-2 mx-3 my-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-full shadow-lg">
            {isDarkMode ? <SunLight /> : <HalfMoon />}
          </button>
          <button className="p-2 rounded-full shadow-lg">
            <InfoCircle />
          </button>
        </div>
      </Layout>
    </>
  );
}

export default App;
