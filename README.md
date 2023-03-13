# About Github Issue management

This is a tool to manage open Issue on github.

## Features

- Searchbox
- Sort Issue from newest to oldest and oldest to newest
- display Issue for a single label (Open, In Progress, Done, etc.)

The above fearures can realize at the same time.

- Any user can create issue in AfterLogin page, but only the repo owner can set label.
- Issue creator can edit and delete his/her issue, and the repo owner can also do it.
- Comment creator can edit and delete his/her comment, and the repo owner can also do it.

## Installation

```bash
git clone https://github.com/LeeChasel/github_issue_management.git
```

Replace **.env.example** file to **.env**, then fill in the required data in it.

- CLIENT_ID
- CLIENT_SECRETS
- REPO_OWNER
- REPO_NAME

## Run

```bash
npm install && npm run dev
```