import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ReposPage from "./pages/ReposPage";
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/repos", element: _jsx(ReposPage, {}) })] }));
};
export default App;
