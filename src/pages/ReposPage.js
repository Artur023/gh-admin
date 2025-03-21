import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as github from "../api/github";
import RepoList from "../components/RepoList";
import RepoForm from "../components/RepoForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { setSortOption } from "../store/sortSlice";
const ReposPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { owner, token } = useSelector((state) => state.auth);
    const sortOption = useSelector((state) => state.sort.sortOption);
    if (!token) {
        navigate("/");
        return null;
    }
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    const { data: repos, isLoading, error } = useQuery({
        queryKey: ["repos", owner, sortOption],
        queryFn: () => github.getRepos({ owner, token, sort: sortOption }),
    });
    const updateMutation = useMutation({
        mutationFn: ({ repoName, newDescription, newPrivate }) => github.updateRepo({ owner, repoName, newData: { description: newDescription, private: newPrivate }, token }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["repos", owner, sortOption] });
        },
    });
    const deleteMutation = useMutation({
        mutationFn: (repoName) => github.deleteRepo({ owner, repoName, token }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["repos", owner, sortOption] });
        },
    });
    const handleUpdate = (repoName, newDescription, newPrivate) => {
        updateMutation.mutate({ repoName, newDescription, newPrivate });
    };
    const handleDelete = (repoName) => {
        deleteMutation.mutate(repoName);
    };
    const handleSortChange = (e) => {
        dispatch(setSortOption(e.target.value));
    };
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "\u0420\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0438" }), _jsx("button", { onClick: handleLogout, className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600", children: "\u0412\u044B\u0445\u043E\u0434" })] }), _jsx("div", { className: "flex items-center gap-4 mb-4", children: _jsxs("div", { children: [_jsx("label", { className: "mr-2", children: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E:" }), _jsxs("select", { className: "border border-gray-300 rounded px-2 py-1", value: sortOption, onChange: handleSortChange, children: [_jsx("option", { value: "updated", children: "\u0414\u0430\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F (\u043D\u043E\u0432\u044B\u0435 \u2192 \u0441\u0442\u0430\u0440\u044B\u0435)" }), _jsx("option", { value: "full_name", children: "\u0410\u043B\u0444\u0430\u0432\u0438\u0442\u0443 (\u043E\u0442 A \u0434\u043E \u042F)" })] })] }) }), isLoading && _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }), error && _jsxs("p", { className: "text-red-500", children: ["\u041E\u0448\u0438\u0431\u043A\u0430: ", String(error)] }), repos && (_jsxs(_Fragment, { children: [_jsx(RepoForm, { token: token, owner: owner }), _jsx(RepoList, { repos: repos, onUpdate: handleUpdate, onDelete: handleDelete, isOwner: true })] }))] }));
};
export default ReposPage;
