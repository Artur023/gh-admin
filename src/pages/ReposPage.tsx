import React from "react";
import {useNavigate} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import * as github from "../api/github";
import RepoList from "../components/RepoList";
import RepoForm from "../components/RepoForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {logout} from "../store/authSlice";
import {setSortOption} from "../store/sortSlice";

const ReposPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const {owner, token} = useSelector((state: RootState) => state.auth);
    const sortOption = useSelector((state: RootState) => state.sort.sortOption);

    if (!token) {
        navigate("/");
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const {data: repos, isLoading, error} = useQuery({
        queryKey: ["repos", owner, sortOption],
        queryFn: () => github.getRepos({owner, token, sort: sortOption}),
    });

    interface IUpdateMutation {
        repoName: string;
        newDescription: string;
        newPrivate: boolean;
    }

    const updateMutation = useMutation({
        mutationFn: ({repoName, newDescription, newPrivate}: IUpdateMutation) =>
            github.updateRepo({owner, repoName, newData: {description: newDescription, private: newPrivate}, token}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["repos", owner, sortOption]});
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (repoName: string) => github.deleteRepo({owner, repoName, token}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["repos", owner, sortOption]});
        },
    });

    const handleUpdate = (repoName: string, newDescription: string, newPrivate: boolean) => {
        updateMutation.mutate({repoName, newDescription, newPrivate});
    };

    const handleDelete = (repoName: string) => {
        deleteMutation.mutate(repoName);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortOption(e.target.value as "updated" | "full_name"));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Репозитории</h2>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Выход
                </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div>
                    <label className="mr-2">Сортировать по:</label>
                    <select
                        className="border border-gray-300 rounded px-2 py-1"
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="updated">Дате обновления (новые → старые)</option>
                        <option value="full_name">Алфавиту (от A до Я)</option>
                    </select>
                </div>
            </div>

            {isLoading && <p>Загрузка...</p>}
            {error && <p className="text-red-500">Ошибка: {String(error)}</p>}
            {repos && (
                <>
                    <RepoForm token={token} owner={owner}/>
                    <RepoList repos={repos} onUpdate={handleUpdate} onDelete={handleDelete} isOwner={true}/>
                </>
            )}
        </div>
    );
};

export default ReposPage;
