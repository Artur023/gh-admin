import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
const LoginPage = () => {
    const [owner, setOwnerLocal] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!owner || !token) {
            setError("Введите логин и токен.");
            return;
        }
        try {
            const response = await axios.get("https://api.github.com/user", {
                headers: { Authorization: `token ${token}` },
            });
            const userData = response.data;
            if (userData.login.toLowerCase() !== owner.toLowerCase()) {
                setError("Введенный логин не соответствует токену.");
                return;
            }
            dispatch(setAuth({ owner, token }));
            setError("");
            navigate("/repos");
        }
        catch (err) {
            console.error(err);
            setError("Неверный токен или проблема с подключением.");
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "p-6 bg-white rounded shadow-md w-full max-w-sm", children: [_jsx("h1", { className: "text-2xl font-bold mb-4 text-center", children: "GitHub \u0410\u0434\u043C\u0438\u043D\u043A\u0430" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "text", className: "border border-gray-300 rounded w-full px-3 py-2 mb-4", value: owner, onChange: (e) => setOwnerLocal(e.target.value), placeholder: "GitHub Username" }), _jsx("input", { type: "password", className: "border border-gray-300 rounded w-full px-3 py-2 mb-6", value: token, onChange: (e) => setToken(e.target.value), placeholder: "GitHub Token" }), error && _jsx("p", { className: "text-red-500 mb-4", children: error }), _jsx("button", { className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700", children: "\u0412\u043E\u0439\u0442\u0438" })] })] }) }));
};
export default LoginPage;
