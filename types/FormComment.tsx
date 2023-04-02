export type FormComment = {
    id: string;
    body: string;
    user: {
        login: string;
        avatar_url: string;
    };
}