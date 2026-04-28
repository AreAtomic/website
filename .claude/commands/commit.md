---
name: git-conventional-commit
description: Use this skill whenever the user wants to create a Git commit, stage files, write a commit message, or use the Conventional Commits standard. Triggers include any mention of "commit", "git commit", "conventional commit", "/commit", "stage and commit", "committer mes changements", "faire un commit", or requests to generate a commit message from staged/modified files. Always use this skill when the user asks Claude to analyze changes and produce a properly formatted commit — even if they just say "commit ça" or "commit mes fichiers". This skill ensures every commit follows the Conventional Commits 1.0.0 spec with the right type, optional scope, and clear description.
---

# Git Conventional Commit Skill

This skill guides Claude through creating well-formed Git commits following the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) specification.

---

## Workflow

### Step 1 — Inspect the repository state

Run the following to understand what has changed:

```bash
git status
git diff --staged    # staged changes
git diff             # unstaged changes
```

If nothing is staged, also check:
```bash
git diff HEAD
```

### Step 2 — Stage files (if needed)

- If the user asked to stage everything: `git add -A`
- If the user specified files or folders: `git add <path>`
- If files are already staged: skip this step
- If staging is ambiguous, ask the user which files to include

### Step 3 — Analyze the diff

```bash
git diff --staged --stat
git diff --staged
```

Read the diff carefully to understand:
- **What** changed (files, functions, logic)
- **Why** it likely changed (feature, fix, refactor, config…)
- **Scope** (which module, component, or domain is affected)

### Step 4 — Build the commit message

Follow the Conventional Commits format strictly:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types (choose the most specific one)

| Type       | When to use |
|------------|-------------|
| `feat`     | A new feature visible to users |
| `fix`      | A bug fix |
| `docs`     | Documentation only changes |
| `style`    | Formatting, missing semicolons, whitespace (no logic change) |
| `refactor` | Code restructuring without feature or bug change |
| `perf`     | Performance improvement |
| `test`     | Adding or updating tests |
| `build`    | Build system, dependencies (npm, pip, gradle…) |
| `ci`       | CI/CD configuration changes |
| `chore`    | Maintenance tasks (cleanup, tooling, configs) |
| `revert`   | Reverts a previous commit |

#### Scope (optional but recommended)

Use the affected module, component, or domain in lowercase:
- `feat(auth): add OAuth2 login`
- `fix(api): handle null response from /users`
- `refactor(ui/button): extract variant logic`

Leave scope empty only if the change is truly cross-cutting.

#### Description rules

- Imperative mood, present tense: **"add"** not "added" or "adds"
- No capital first letter
- No period at the end
- Max 72 characters on the first line
- Written in **English** (unless the project has an explicit French convention)

#### Body (optional)

Use when the *why* or *how* is not obvious from the description:
- Separate from header with a blank line
- Wrap at 72 characters
- Explain motivation, not implementation details

#### Footers (optional)

```
BREAKING CHANGE: <description>
Fixes #<issue-number>
Closes #<issue-number>
Co-authored-by: Name <email>
```

Use `BREAKING CHANGE:` for any incompatible API change. This triggers a **major** version bump in semver.

---

### Step 5 — Confirm with the user

Before committing, show the proposed message:

```
📝 Proposed commit:

feat(auth): add JWT refresh token rotation

Implements automatic token rotation on each refresh to limit
the exposure window of stolen tokens.

Closes #42
```

Ask: **"Shall I run this commit? Any changes?"**

Wait for explicit confirmation unless the user already said "go ahead" / "oui vas-y" in their original request.

### Step 6 — Execute the commit

```bash
git commit -m "<type>(<scope>): <description>" -m "<body if any>"
```

For multi-paragraph messages, prefer a heredoc or a temp file:

```bash
git commit -F - <<'EOF'
feat(auth): add JWT refresh token rotation

Implements automatic token rotation on each refresh to limit
the exposure window of stolen tokens.

Closes #42
EOF
```

Confirm success by showing the output of `git log --oneline -1`.

---

## Quick-reference examples

```
feat(cart): add coupon code support at checkout
fix(api): prevent crash when user profile is missing
docs(readme): update local setup instructions
refactor(db): extract query builder into separate module
chore(deps): upgrade axios to 1.7.2
perf(images): lazy-load thumbnails below the fold
test(auth): add unit tests for token expiry logic
ci: add GitHub Actions workflow for PRs
style: apply prettier formatting across src/
revert: revert "feat(cart): add coupon code support"
```

---

## Edge cases

- **Nothing staged, nothing modified** → inform the user, do nothing
- **Only untracked files** → ask if they should be added
- **Multiple unrelated changes** → suggest splitting into separate commits
- **Breaking change detected** → always add `BREAKING CHANGE:` footer and flag it clearly to the user
- **Merge conflicts present** → stop and warn the user before doing anything