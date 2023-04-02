export type FormIssue = {
    number: string;
    html_url: string;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    user: {
        login: string;
        avatar_url: string;
    };
    labels: {
        color: string;
        id: number;
        name: string;
    }[];
}