import axios, {AxiosResponse} from "axios";

const BASE_URL = "https://api.github.com";

export interface Repo {
    id: number;
    name: string;
    description: string | null;
    private: boolean;
    html_url: string;
}

interface IGetRepos {
    owner: string,
    token: string,
    sort: "full_name" | "updated"
}

export async function getRepos({owner, token, sort = "updated"}: IGetRepos): Promise<Repo[]> {
    const direction: string = sort === "full_name" ? "asc" : "desc";

    const response: AxiosResponse<Repo[]> = await axios.get(`${BASE_URL}/users/${owner}/repos`, {
        headers: {Authorization: `token ${token}`},
        params: {sort, direction, per_page: 100},
    });
    return response.data;
}

interface ICreateRepo {
    token: string,
    name: string,
    description: string,
    isPrivate: boolean
}

export async function createRepo(params: ICreateRepo): Promise<Repo> {
    const {token, name, description, isPrivate} = params
    const response: AxiosResponse<Repo> = await axios.post(
        `${BASE_URL}/user/repos`,
        {name, description, private: isPrivate},
        {headers: {Authorization: `token ${token}`}}
    );
    return response.data;
}

export interface IUpdateRepo {
    owner: string,
    repoName: string,
    newData: Partial<Repo>,
    token: string
}

export async function updateRepo(params: IUpdateRepo): Promise<Repo> {
    const {owner, repoName, newData, token} = params;
    const response: AxiosResponse<Repo> = await axios.patch(`${BASE_URL}/repos/${owner}/${repoName}`, newData,
        {headers: {Authorization: `token ${token}`}}
    );
    return response.data;
}

interface IDeleteRepo {
    owner: string,
    repoName: string,
    token: string
}

export async function deleteRepo(params: IDeleteRepo): Promise<void> {
    const {owner, repoName, token} = params
    await axios.delete(`${BASE_URL}/repos/${owner}/${repoName}`, {
        headers: {Authorization: `token ${token}`},
    });
}
