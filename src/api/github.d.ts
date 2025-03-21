export interface Repo {
    id: number;
    name: string;
    description: string | null;
    private: boolean;
    html_url: string;
}
interface IGetRepos {
    owner: string;
    token: string;
    sort: "full_name" | "updated";
}
export declare function getRepos({ owner, token, sort }: IGetRepos): Promise<Repo[]>;
interface ICreateRepo {
    token: string;
    name: string;
    description: string;
    isPrivate: boolean;
}
export declare function createRepo(params: ICreateRepo): Promise<Repo>;
export interface IUpdateRepo {
    owner: string;
    repoName: string;
    newData: Partial<Repo>;
    token: string;
}
export declare function updateRepo(params: IUpdateRepo): Promise<Repo>;
interface IDeleteRepo {
    owner: string;
    repoName: string;
    token: string;
}
export declare function deleteRepo(params: IDeleteRepo): Promise<void>;
export {};
