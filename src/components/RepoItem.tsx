import React, { useState } from "react";
import { Repo } from "../api/github";
import { Switch } from "@headlessui/react";

interface RepoItemProps {
  repo: Repo;
  onUpdate: (repoName: string, newDescription: string, newPrivate: boolean) => void;
  onDelete: (repoName: string) => void;
  isOwner: boolean;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onUpdate, onDelete, isOwner }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(repo.description || "");
  const [newPrivate, setNewPrivate] = useState<boolean>(repo.private);

  const handleSave = () => {
    onUpdate(repo.name, newDescription, newPrivate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewDescription(repo.description || "");
    setNewPrivate(repo.private);
    setIsEditing(false);
  };

  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      {!isEditing ? (
        <div>
          <h4 className="text-lg font-semibold">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {repo.name}
            </a>
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                repo.private ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
              }`}
            >
              {repo.private ? "Приватный" : "Публичный"}
            </span>
          </h4>
          <p className="text-gray-700 mb-2">{repo.description}</p>
          {isOwner && (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="mr-2 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Изменить
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Удалить репозиторий?")) onDelete(repo.name);
                }}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Удалить
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h4 className="text-lg font-semibold mb-2">{repo.name}</h4>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Описание:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full px-2 py-1"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="mb-2 flex items-center">
            <Switch
              checked={newPrivate}
              onChange={setNewPrivate}
              className={`${newPrivate ? "bg-blue-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  newPrivate ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition`}
              />
            </Switch>
            <span className="ml-2 text-sm">{newPrivate ? "Приватный" : "Публичный"}</span>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="mr-2 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
            >
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoItem;
