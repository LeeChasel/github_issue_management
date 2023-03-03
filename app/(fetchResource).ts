const OWNER = "LeeChasel";
let REPO = "dcard_intern_homework";

interface FormContent
{
    state: string;
    title: string;
    body: string;
    user: FormUser;
}
interface FormComment 
{
    id: string;
    body: string;
    user: FormUser;
}
interface FormUser
{
    login: string;
    avatar_url: string;
}

export function getUsername(token:string): Promise<string>
{
    return fetch("https://api.github.com/user", {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
    }}).then(res => res.json()).then(json => json.login);
}

export function getIssueContent(token:string, issue_number:string): Promise<FormContent>
{
    return fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issue_number}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}

export function getComments(token:string, issue_number:string): Promise<FormComment[]>
{
    return fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issue_number}/comments`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}