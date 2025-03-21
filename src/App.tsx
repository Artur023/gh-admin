import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ReposPage from "./pages/ReposPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/repos" element={<ReposPage />} />
        </Routes>
    );
};

export default App;
