[Castellano](./docs/Collaboration-Guide_es.md) | [Català](./docs/Collaboration-Guide_ca.md)

# 🤝 Collaborator Guide

## 👀 Website Issues

Open issues for the repository website in https://github.com/ddialar/voluntary-warehouse/issues.

## 🆙 PRs and Code contributions

- Tests must pass.
- Follow the [JavaScript Standard Style](http://standardjs.com/) and `npm run lint`.
- If you fix a bug, add a test.

## 🔀 Branches

Use the `master` branch for bug fixes or minor work that is intended for the
current release stream.

Use the correspondingly named branch, e.g. `develop`, for anything intended for
a future release of the platform.

## ✏️ Commits

We have very precise rules over how our Git commit messages must be formatted. This format leads to easier to read commit history.

Each commit message consists of a header, a body, and a footer.

```sh
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**The header is mandatory** and must conform to the Commit Message Header format.

**The body is mandatory** for all commits except for those of type "docs". When the body is present it must be at least 20 characters long and must conform to the Commit Message Body format.

_The footer is optional_. The Commit Message Footer format describes what the footer is used for and the structure it must have.

### Commit Message Header

```sh
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The <type> and <summary> fields are mandatory, the (<scope>) field is optional.

#### Type

Must be one of the following:

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (examples: Github Actions, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests

#### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of example scopes:

- `common`
- `core`
- `components`
- `forms`
- `language-service`
- `router`
- `modules`

#### Summary

Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Commit Message Body

Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain why you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.

### Commit Message Footer

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to. For example:

```sh
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```sh
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

Breaking Change section should start with the phrase BREAKING CHANGE: followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with DEPRECATED: followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

## 📋 Steps for contributing

1. [Create an issue](https://github.com/ddialar/voluntary-warehouse/issues/new) for the
   bug you want to fix or the feature that you want to add.
2. Create your own [fork](https://github.com/ddialar/voluntary-warehouse) on GitHub, then
   checkout your fork.
3. Write your code in your local copy. It's good practice to create a branch for
   each new issue you work on, although not compulsory.
4. To run the test suite, first install the dependencies by running `npm install`,
   then run `npm test`.
5. Ensure your code is linted by running `npm run lint` -- fix any issue you
   see listed.
6. If the tests pass, you can commit your changes to your fork and then create
   a pull request from there. Make sure to reference your issue from the pull
   request comments by including the issue number e.g. `#123`.

## ❓ Issues which are questions

We will typically close any vague issues or questions that are specific to some
app you are writing. Please double check the docs and other references before
being trigger happy with posting a question issue.

Things that will help get your question issue looked at:

- Full and runnable JS/TS code.
- Clear description of the problem or unexpected behavior.
- Clear description of the expected result.
- Steps you have taken to debug it yourself.

If you post a question and do not outline the above items or make it easy for
us to understand and reproduce your issue, it will be closed.
