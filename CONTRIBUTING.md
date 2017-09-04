## Want to contribute?

Found a bug or have an idea to improvement? First [open an issue](https://github.com/mvmjacobs/timetracking/issues) and we will discuss about it.

But if you want to resolve an issue, first make sure the issue is not tagged with `committed` neither `in progress`. So associate the question to yourself and tag it as `in progress`.

After that, follow the instructions below to make a pull request.

### How to make a clean pull request

- Create a personal fork of the project on Github.
- Clone the fork on your local machine. Your remote repo on Github is called `origin`.
- Add the original repository as a remote called `upstream`.
```
$ git remote add upstream https://github.com/mvmjacobs/timetracking.git
```
- If you created your fork a while ago be sure to pull upstream changes into your local repository.
- Create a new branch to work on! Branch from `dev-z.x.y` if it exists, else from `master`.
- Implement/fix your feature, comment your code.
- Add or change the documentation as needed.
- Use [keywords](https://help.github.com/articles/closing-issues-using-keywords/) in your commit message. To bug fixes use `(fixes #n)`, to improvements and new features use `(resolves #n)`. (When `n` is the issue number).
- Squash your commits into a single commit with git's [interactive rebase](https://help.github.com/articles/interactive-rebase). Create a new branch if necessary.
- Push your branch to your fork on Github, the remote `origin`.
- From your fork open a pull request in the correct branch. Target the project's `dev-z.x.y` branch if there is one, else go for `master`!
- Once the pull request is approved and merged you can pull the changes from `upstream` to your local repo and delete
your extra branch(es).

And last but not least: Always write your commit messages in the present tense. Your commit message should describe what the commit, when applied, does to the code – not what you did to the code.
