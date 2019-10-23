

## DevUI Contribution Guide

### Issue Standard

- Issue is only used to submit bugs or Feature and design-related content. Other irrelevant content may be closed directly.
- Please make sure to search for relevant issue before you make one.


### Pull Request Standard

- Please fork this repository to your account, and create a new branch for change.

  ```bash
  git checkout -b my-fix-branch master
  ```

- Commit information please follow [angular rules](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)。

- Please rebase before submit a PR, make sure the commit logs are clean.
  
  ```bash
  git rebase master -i
  git push -f
  ```
  
- Describe clearly in PR whether to submit `bug` or `issue`.
  
### Developing

  ```bash
  # fork && git clone
  ...
  # dev
  npm i 
  npm start
  ```
### Coding Standard
Follow TSLint constraints
