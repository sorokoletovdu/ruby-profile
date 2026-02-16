# Branch Protection Setup Guide

This guide explains how to configure branch protection rules for the `main` branch with PR requirement and self-approval capability.

## Why Branch Protection?

- ✅ Forces changes through PRs (trackable history)
- ✅ Runs Quality Gate validation before merge
- ✅ Allows self-approval (you're the maintainer)
- ✅ Prevents accidental direct pushes to main
- ✅ Works with Dependabot auto-updates

## Setup Instructions

### 1. Navigate to Branch Protection Settings

1. Go to your repository: `https://github.com/sorokoletovdu/ruby-profile`
2. Click **Settings** tab
3. Click **Branches** in the left sidebar
4. Click **Add branch protection rule** (or edit existing rule)
5. In "Branch name pattern", enter: `main`

### 2. Configure Protection Rules

#### ✅ Required Settings

**Pull Request Requirements:**
- ☑️ **Require a pull request before merging**
  - ☑️ **Dismiss stale pull request approvals when new commits are pushed**
  - ☐ **Require approval** (leave UNCHECKED for self-approval)
  - Number of approvals: `0` (allows self-merge)

**Status Checks:**
- ☑️ **Require status checks to pass before merging**
  - ☑️ **Require branches to be up to date before merging**
  - **Status checks to require:**
    - Search and add: `Quality Gate`
    - Search and add: `build`
    - Search and add: `validate / Build Validation` (if available)

**Other Settings:**
- ☑️ **Require conversation resolution before merging** (optional, recommended)
- ☐ **Require signed commits** (optional, up to you)
- ☐ **Require linear history** (optional)
- ☑️ **Include administrators** (apply rules to you too)
- ☐ **Allow force pushes** (keep disabled)
- ☐ **Allow deletions** (keep disabled)

#### ⚠️ Important: Self-Approval Configuration

To allow self-approval:
- **DO NOT** check "Require approval"
- **OR** if checked, set approvals to `0`
- This allows you to create PR, wait for Quality Gate, then merge yourself

### 3. Save Protection Rule

Click **Create** or **Save changes** at the bottom.

## Workflow After Setup

### For Regular Changes (You)

```bash
# 1. Create a new branch
git checkout -b update-ruby-info

# 2. Make your changes
# Edit files...

# 3. Commit and push to new branch
git add .
git commit -m "Update Ruby's vet information"
git push origin update-ruby-info

# 4. Create PR on GitHub
gh pr create --title "Update Ruby's vet information" --body "Updated vet contact details"

# 5. Wait for Quality Gate to pass (~2 min)

# 6. Self-approve and merge
gh pr merge --auto --squash
# Or click "Merge pull request" on GitHub
```

### For Dependabot PRs (Automatic)

Dependabot will:
1. Create PR with dependency update
2. Run Quality Gate automatically
3. You review and approve
4. Merge when ready

**Enable auto-merge for Dependabot:**
```bash
# After Dependabot creates PR:
gh pr review [PR_NUMBER] --approve
gh pr merge [PR_NUMBER] --auto --squash
```

## Alternative: Quick Workflow (Optional)

If you prefer faster iteration for urgent changes, you can:

1. **Temporarily disable branch protection:**
   - Settings → Branches → Edit rule
   - Uncheck "Include administrators"
   - Save changes
   - Make direct push to main
   - Re-enable protection

2. **Or use emergency bypass:**
   - Settings → Branches → Edit rule
   - Check "Allow specific actors to bypass required pull requests"
   - Add yourself
   - Save changes

⚠️ **Not recommended** - defeats the purpose of Quality Gate

## GitHub CLI Setup (Recommended)

Install GitHub CLI for easier PR management:

```bash
# Install (macOS)
brew install gh

# Authenticate
gh auth login

# Create PR
gh pr create --fill

# List PRs
gh pr list

# View PR status
gh pr status

# Review and approve own PR
gh pr review --approve

# Merge PR
gh pr merge --squash --auto
```

## Testing Your Setup

1. Create a test branch:
   ```bash
   git checkout -b test-branch-protection
   echo "test" >> README.md
   git add README.md
   git commit -m "Test: branch protection"
   git push origin test-branch-protection
   ```

2. Try to push directly to main (should fail):
   ```bash
   git checkout main
   echo "test" >> README.md
   git add README.md
   git commit -m "Test: direct push"
   git push origin main
   # Should show: "cannot push to protected branch"
   ```

3. Create PR from test branch:
   ```bash
   gh pr create --title "Test PR" --body "Testing branch protection"
   ```

4. Watch Quality Gate run
5. Merge when green
6. Delete test branch:
   ```bash
   gh pr close --delete-branch
   ```

## Troubleshooting

### "Cannot merge" even though Quality Gate passed

- Check if all required status checks are green
- Verify branch is up to date with main
- Refresh the PR page (GitHub UI can lag)

### Quality Gate not running

- Check `.github/workflows/validate.yml` exists
- Verify PR trigger is configured:
  ```yaml
  on:
    pull_request:
      branches: [main]
  ```

### Can't self-approve

- Verify "Require approval" is unchecked or set to 0
- Check "Include administrators" is checked
- Try using GitHub CLI: `gh pr review --approve`

### Dependabot PRs not auto-merging

- Enable auto-merge in Dependabot settings
- Approve PRs: `gh pr review [NUMBER] --approve`
- Check Quality Gate passes

## Recommended Workflow for Family

Since it's just you and your wife:

1. **For small urgent changes:**
   - Create branch
   - Make change
   - Push and create PR
   - Wait for Quality Gate
   - Self-merge immediately

2. **For major updates:**
   - Create branch
   - Make changes
   - Push and create PR
   - Ask partner to review (optional)
   - Wait for Quality Gate
   - Merge together

3. **For Dependabot:**
   - Review weekly updates
   - Approve safe updates (patch versions)
   - Test major updates locally first
   - Auto-merge when confident

## Quick Reference Commands

```bash
# Create PR
gh pr create --title "Title" --body "Description"

# Auto-merge after Quality Gate passes
gh pr merge --auto --squash

# Review own PR
gh pr review --approve

# Check PR status
gh pr status

# List all PRs
gh pr list

# Close PR without merging
gh pr close [NUMBER]
```

---

**Status:** Not yet configured (manual setup required)
**Priority:** Medium (recommended for safety)
**Time:** ~5 minutes to configure
