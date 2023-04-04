# About github issue management

This is a tool to manage open issue on github.

## Features

- SearchBar
- Sort issue from newest to oldest or oldest to newest
- Display issue for a single label ( every labels in repo )

The above fearures can implement at the same time without changing page.

- If you want to use state like open, in progress or done, you need to set label manually in github website.
- Any user can create issue, but only the repo owner can set label at issue page.
- Issue author can edit and delete his/her issue, and the repo owner can also do it.
- Comment author can edit and delete his/her comment, and the repo owner can also do it.
- According to different users, the comment will be distinguished by different color.

# Tech Stack

- [Next.js 13 beta](https://beta.nextjs.org/docs)
    - app router (server component)
- [NextAuth.js](https://next-auth.js.org/)
- [SWR](https://swr.vercel.app/)
- [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeadlessUI](https://headlessui.com/)
- [daisyUI](https://daisyui.com/)
- [Vercel](https://vercel.com/)

# Project Architecture

```
│
├─app
│  │  create-btn.tsx
│  │  error.tsx
│  │  globals.css
│  │  Home.tsx
│  │  issueList.tsx
│  │  labelSelector.tsx
│  │  layout.tsx
│  │  loading.tsx
│  │  login-btn.tsx
│  │  page.tsx
│  │  providers.tsx
│  │  searchBar.tsx
│  │  signOut-btn.tsx
│  │  sort-btn.tsx
│  │  welcome.tsx
│  │
│  ├─authPopup
│  │      page.tsx
│  │
│  └─issues
│      └─[number]
│           commentAction.tsx
│           createComment-btn.tsx
│           deleteComment-btn.tsx
│           deleteIssue-btn.tsx
│           Home.tsx
│           IssueComments.tsx
│           issueDetail.tsx
│           issueTitle.tsx
│           page.tsx
│           return-btn.tsx
│           updateComment-btn.tsx
│           updateIssue-btn.tsx
│           updateLabel-btn.tsx
├─hooks
│   useLabels.tsx
│
├─pages
│   └─api
│       └─auth
│           [...nextauth].ts
│
└─types
        FormComment.tsx
        FormIssue.ts
        FormLabel.ts
        next-auth.d.ts
```

## Design Concept

- Use github label to identify task state.
- Due to next.js new routing and [colocation](https://beta.nextjs.org/docs/routing/fundamentals#colocation), no need to use components folder to store components as before.
- By using [next-auth.d.ts](types/next-auth.d.ts) and [[...nextauth].js](pages/api/auth/%5B...nextauth%5D.ts) to get access token from login session on server, then use it to fetch data.
- Since the components of the issue list page are all interactive, all components are client components. But issue detail page is mostly static content, so most components of this page are server component( fetch data on server side )

# How To Use

1. Use `git clone` to install the project.
2. Replace **.env.example** file to **.env**, then fill in the required data in it.

- REPO_OWNER
- REPO_NAME
- GITHUB_ID
- GITHUB_SECRET
- NEXTAUTH_SECRET

3. Run The Website

```bash
npm install && npm run dev
```

# Online Demo

Here is the [website](https://github-issue-management.vercel.app/) deployed on vercel.