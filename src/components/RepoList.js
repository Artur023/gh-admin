import { jsx as _jsx } from "react/jsx-runtime";
import RepoItem from "./RepoItem";
const RepoList = ({ repos, onUpdate, onDelete, isOwner }) => {
    return (_jsx("div", { children: repos.map((repo) => (_jsx(RepoItem, { repo: repo, onUpdate: onUpdate, onDelete: onDelete, isOwner: isOwner }, repo.id))) }));
};
export default RepoList;
