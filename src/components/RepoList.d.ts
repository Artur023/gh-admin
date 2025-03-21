import React from "react";
import { Repo } from "../api/github";
interface RepoListProps {
    repos: Repo[];
    onUpdate: (repoName: string, newDescription: string, newPrivate: boolean) => void;
    onDelete: (repoName: string) => void;
    isOwner: boolean;
}
declare const RepoList: React.FC<RepoListProps>;
export default RepoList;
