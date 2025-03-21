import React from "react";
import { Repo } from "../api/github";
interface RepoItemProps {
    repo: Repo;
    onUpdate: (repoName: string, newDescription: string, newPrivate: boolean) => void;
    onDelete: (repoName: string) => void;
    isOwner: boolean;
}
declare const RepoItem: React.FC<RepoItemProps>;
export default RepoItem;
