import React from "react";
import { Repo } from "../api/github";
import RepoItem from "./RepoItem";

interface RepoListProps {
    repos: Repo[];
    onUpdate: (repoName: string, newDescription: string, newPrivate: boolean) => void;
    onDelete: (repoName: string) => void;
    isOwner: boolean;
}

const RepoList: React.FC<RepoListProps> = ({ repos, onUpdate, onDelete, isOwner }) => {
    return (
        <div>
            {repos.map((repo) => (
                <RepoItem
                    key={repo.id}
                    repo={repo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    isOwner={isOwner}
                />
            ))}
        </div>
    );
};

export default RepoList;
