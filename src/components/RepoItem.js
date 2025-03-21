import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Switch } from "@headlessui/react";
const RepoItem = ({ repo, onUpdate, onDelete, isOwner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(repo.description || "");
    const [newPrivate, setNewPrivate] = useState(repo.private);
    const handleSave = () => {
        onUpdate(repo.name, newDescription, newPrivate);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setNewDescription(repo.description || "");
        setNewPrivate(repo.private);
        setIsEditing(false);
    };
    return (_jsx("div", { className: "mb-4 p-4 bg-white rounded shadow", children: !isEditing ? (_jsxs("div", { children: [_jsxs("h4", { className: "text-lg font-semibold", children: [_jsx("a", { href: repo.html_url, target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: repo.name }), _jsx("span", { className: `ml-2 px-2 py-0.5 rounded text-xs font-semibold ${repo.private ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`, children: repo.private ? "Приватный" : "Публичный" })] }), _jsx("p", { className: "text-gray-700 mb-2", children: repo.description }), isOwner && (_jsxs("div", { children: [_jsx("button", { onClick: () => setIsEditing(true), className: "mr-2 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700", children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C" }), _jsx("button", { onClick: () => {
                                if (window.confirm("Удалить репозиторий?"))
                                    onDelete(repo.name);
                            }, className: "px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700", children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }))] })) : (_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold mb-2", children: repo.name }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:" }), _jsx("input", { type: "text", className: "border border-gray-300 rounded w-full px-2 py-1", value: newDescription, onChange: (e) => setNewDescription(e.target.value) })] }), _jsxs("div", { className: "mb-2 flex items-center", children: [_jsx(Switch, { checked: newPrivate, onChange: setNewPrivate, className: `${newPrivate ? "bg-blue-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`, children: _jsx("span", { className: `${newPrivate ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition` }) }), _jsx("span", { className: "ml-2 text-sm", children: newPrivate ? "Приватный" : "Публичный" })] }), _jsxs("div", { children: [_jsx("button", { onClick: handleSave, className: "mr-2 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700", children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }), _jsx("button", { onClick: handleCancel, className: "px-3 py-1 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300", children: "\u041E\u0442\u043C\u0435\u043D\u0430" })] })] })) }));
};
export default RepoItem;
