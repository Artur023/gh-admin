import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import * as github from "../api/github";
const RepoForm = ({ token, owner }) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const createMutation = useMutation({
        mutationFn: () => github.createRepo({ token, name, description, isPrivate }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["repos", owner] });
            setName("");
            setDescription("");
            setIsPrivate(false);
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            alert("Введите название репозитория.");
            return;
        }
        createMutation.mutate();
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "mb-6 p-4 bg-gray-100 rounded", children: [_jsx("h3", { className: "text-lg font-semibold mb-3", children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block font-medium mb-1", children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:" }), _jsx("input", { type: "text", className: "border border-gray-300 rounded w-full px-3 py-2", value: name, onChange: (e) => setName(e.target.value), placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u044F" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block font-medium mb-1", children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:" }), _jsx("input", { type: "text", className: "border border-gray-300 rounded w-full px-3 py-2", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" })] }), _jsxs("div", { className: "mb-4 flex items-center", children: [_jsx(Switch, { checked: isPrivate, onChange: setIsPrivate, className: `${isPrivate ? "bg-blue-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`, children: _jsx("span", { className: `${isPrivate ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition` }) }), _jsx("span", { className: "ml-3 text-sm", children: "\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0439 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439" })] }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50", children: createMutation.status ? "Создание..." : "Создать" }), createMutation.isError && (_jsxs("p", { className: "mt-2 text-red-500", children: ["\u041E\u0448\u0438\u0431\u043A\u0430: ", createMutation.error?.message] }))] }));
};
export default RepoForm;
