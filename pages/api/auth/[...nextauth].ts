import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            authorization: {
                params: { scope: "repo" },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
            }
            if (profile) {
                token.username = profile.login
            }
            return token
        },
        async session({session, token}) {
            session.user.token = token.accessToken
            session.user.username = token.username
            return session
        }
    }
}

export default NextAuth(authOptions)