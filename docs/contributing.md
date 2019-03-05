# Contribution Guide

---

This is a guide on how to make PR's to this repo. Please read through and try to stick to the guide before making a PR.
Before making a PR, make sure that a PR contains only a single (☝️) feature, fix etc - make that unrelated bug-fix (🔨) a different PR, please! A PR can have multiple commits, but divide them logically - no random commits! And while making commits, do remember to follow the commit message guide right below this. Also squash any merge commits - interactive rebasing maybe? `rebase -i`.

Finally, before making a PR make sure that your branch is rebased with the latest commits in the mainline (dev branch).

## Commit Message Guide ✉️

---

Each commit message should include a **type**, a **scope** and a **subject**:

```
 <type>(<scope>): <subject>
```

Lines should not exceed 100 characters. This allows the message to be easier to read on github as well as in various git tools and produces a nice, neat commit log.

e.g:

```
 #271 feat(standard): add style config and refactor to match
 #270 fix(config): only override publicPath when served by webpack
 #269 feat(eslint-config-defaults): replace eslint-config-airbnb
 #268 feat(config): allow user to configure webpack stats output
```

#### Type

Must be one of the following:

- **feat**: A new feature 👍
- **fix**: A bug fix 🔨
- **docs**: Documentation only changes 📖
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 💅
- **refactor**: A code change that neither fixes a bug or adds a feature 🔧
- **test**: Adding missing tests ✔️
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation 😵

#### Scope

The scope could be anything specifying place of the commit change. For example `webpack`,
`babel`, `redux` etc...

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

---

> **Always make a PR as if the guy who ends up reviewing your code is be a violent psychopath who knows where you live.**
