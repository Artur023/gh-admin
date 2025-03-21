import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Switch} from "@headlessui/react";
import * as github from "../api/github";

interface RepoFormProps {
    token: string;
    owner: string;
}

const RepoForm: React.FC<RepoFormProps> = ({token, owner}) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const createMutation = useMutation({
        mutationFn: () => github.createRepo({token, name, description, isPrivate}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["repos", owner]});
            setName("");
            setDescription("");
            setIsPrivate(false);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            alert("Введите название репозитория.");
            return;
        }
        createMutation.mutate();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold mb-3">Создать новый репозиторий</h3>

            <div className="mb-4">
                <label className="block font-medium mb-1">Название:</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded w-full px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название репозитория"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Описание:</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded w-full px-3 py-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание (необязательно)"
                />
            </div>

            <div className="mb-4 flex items-center">
                <Switch
                    checked={isPrivate}
                    onChange={setIsPrivate}
                    className={`${
                        isPrivate ? "bg-blue-600" : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
          <span
              className={`${
                  isPrivate ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition`}
          />
                </Switch>
                <span className="ml-3 text-sm">Приватный репозиторий</span>
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >

                {createMutation.isLoading ? "Создание..." : "Создать"}
            </button>
            {createMutation.isError && (
                <p className="mt-2 text-red-500">
                    Ошибка: {(createMutation.error as Error)?.message}
                </p>
            )}
        </form>
    );
};

export default RepoForm;
