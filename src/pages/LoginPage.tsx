import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {useDispatch} from "react-redux";
import {setAuth} from "../store/authSlice";

interface GitHubUser {
    login: string;
}

const LoginPage: React.FC = () => {
    const [owner, setOwnerLocal] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!owner || !token) {
            setError("Введите логин и токен.");
            return;
        }
        try {
            const response: AxiosResponse<GitHubUser> = await axios.get("https://api.github.com/user", {
                headers: {Authorization: `token ${token}`},
            });
            const userData = response.data;
            if (userData.login.toLowerCase() !== owner.toLowerCase()) {
                setError("Введенный логин не соответствует токену.");
                return;
            }
            dispatch(setAuth({owner, token}));
            setError("");
            navigate("/repos");
        } catch (err) {
            console.error(err);
            setError("Неверный токен или проблема с подключением.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-6 bg-white rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center">GitHub Админка</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
                        value={owner}
                        onChange={(e) => setOwnerLocal(e.target.value)}
                        placeholder="GitHub Username"
                    />
                    <input
                        type="password"
                        className="border border-gray-300 rounded w-full px-3 py-2 mb-6"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="GitHub Token"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
