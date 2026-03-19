#!/bin/bash

# REPO_URL https://github.com/adeboyefrancis/blackbird

# Create React App and start development server
npx create-react-app front-end
cd front-end
npm start

# GitHub Repository Management using GitHub CLI
git init
gh repo create repo-name --public --source=.
git add .
git commit -m "Initial commit"
git push -u origin main

# Create a new branch for updating the logo
git checkout -b feature/update_logo

# Update Image from feature/update_logo by replacing https://www.propelleraero.com/wp-content/uploads/2021/05/Vector.svg to https://www.propelleraero.com/dirtmate/
# Commit the code and push to GitHub

git add .
git commit -m "Update logo image"
git push origin feature/update_logo

# Create a pull request using GitHub CLI
gh pr create --title "Update logo image" --body "This PR updates the logo image in the topbar." --base main --head feature/update_logo


# Merge the PR using GitHub CLI 
gh pr merge --auto --delete-branch