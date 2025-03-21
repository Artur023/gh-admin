import axios from "axios";
const BASE_URL = "https://api.github.com";
export async function getRepos({ owner, token, sort = "updated" }) {
    const direction = sort === "full_name" ? "asc" : "desc";
    const response = await axios.get(`${BASE_URL}/users/${owner}/repos`, {
        headers: { Authorization: `token ${token}` },
        params: { sort, direction, per_page: 100 },
    });
    return response.data;
}
export async function createRepo(params) {
    const { token, name, description, isPrivate } = params;
    const response = await axios.post(`${BASE_URL}/user/repos`, { name, description, private: isPrivate }, { headers: { Authorization: `token ${token}` } });
    return response.data;
}
export async function updateRepo(params) {
    const { owner, repoName, newData, token } = params;
    const response = await axios.patch(`${BASE_URL}/repos/${owner}/${repoName}`, newData, { headers: { Authorization: `token ${token}` } });
    return response.data;
}
export async function deleteRepo(params) {
    const { owner, repoName, token } = params;
    await axios.delete(`${BASE_URL}/repos/${owner}/${repoName}`, {
        headers: { Authorization: `token ${token}` },
    });
}
