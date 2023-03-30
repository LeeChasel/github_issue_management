import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            token?: accessToken;
            username?: username;
        } & DefaultSession['user']
    }
    interface Profile {
        login?: string
    }
}