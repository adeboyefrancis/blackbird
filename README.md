# BlackBird - Forage Virtual task

# Prerequisite
- Node 14.00 or above

## Phase 1 : Collaborate Using GitHub with Propeller
In this task, you will collaborate with your team using GitHub and Propeller. Follow the steps below to complete the task:

- Create react app using the create-react-app tool https://github.com/facebook/create-react-app#quick-overview

```bash
npx create-react-app front-end
cd front-end
npm start
```

- Commit the code, create GitHub repo using GitHub CLI
```bash
git init
gh repo create repo-name --public --source=.
git add .
git commit -m "Initial commit"
git push -u origin main
```

- Switch branch to “update_logo”
```bash
git checkout -b feature/update_logo
```

- Update Image from feature/update_logo by replacing https://www.propelleraero.com/wp-content/uploads/2021/05/Vector.svg to https://www.propelleraero.com/dirtmate/
- Commit the code and push to GitHub
```bash
git add .
git commit -m "Update logo image"
git push origin feature/update_logo
```

- Create PR from “update_logo” to “main” branch using GitHub CLI
```bash
gh pr create --title "Update logo image" --body "This PR updates the logo image in the topbar." --base main --head feature/update_logo
```

- Merge the PR using GitHub CLI 
```bash
gh pr merge --auto --delete-branch
```