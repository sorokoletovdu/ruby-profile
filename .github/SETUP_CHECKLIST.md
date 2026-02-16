# 🚀 Repository Setup Checklist

Complete these steps after creating your GitHub repository.

## ✅ Initial Repository Setup

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Ruby's profile site

- Astro + Tailwind setup
- EN/DE bilingual content
- WebP image optimization
- Quality Gate validation
- Auto-deployment to GitHub Pages"

# Create repository on GitHub
gh repo create ruby-profile --private --source=. --push

# Or manually:
# 1. Go to https://github.com/new
# 2. Name: ruby-profile
# 3. Visibility: Private
# 4. Don't initialize with README (you already have one)
# 5. Create repository
# 6. Follow the "push an existing repository" instructions
```

**Expected result:** ✅ Repository created at `https://github.com/sorokoletovdu/ruby-profile`

---

## ✅ Enable GitHub Pages

### 2. Configure GitHub Pages

1. Go to repository **Settings**
2. Scroll to **Pages** section (left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions** (not "Deploy from a branch")
4. Click **Save**

**Expected result:** ✅ Site will deploy at `https://sorokoletovdu.github.io/ruby-profile/`

**Test:** Push to main branch, wait 2-3 minutes, visit the URL

---

## ✅ Enable Dependabot (Automated Updates)

### 3. Activate Dependabot

**Good news:** Dependabot is **already configured** via `.github/dependabot.yml`

It will automatically:
- Check for npm package updates every Monday at 9 AM (Berlin time)
- Check for GitHub Actions updates every Monday
- Create PRs for updates
- Group related updates together
- Add you as reviewer

**To enable Dependabot alerts:**
1. Go to repository **Settings**
2. Click **Security** (left sidebar)
3. Under **Dependabot**:
   - ☑️ Enable **Dependabot alerts**
   - ☑️ Enable **Dependabot security updates**
   - ☑️ Enable **Dependabot version updates** (uses dependabot.yml)

**Expected result:**
- ✅ Dependabot PRs will appear weekly
- ✅ Security alerts for vulnerable dependencies

---

## ✅ Branch Protection Rules (Self-Approval)

### 4. Configure Branch Protection

**See detailed guide:** [BRANCH_PROTECTION.md](BRANCH_PROTECTION.md)

**Quick setup:**
1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Configure:
   - ☑️ Require a pull request before merging
   - ☐ Require approval (LEAVE UNCHECKED for self-approval)
   - ☑️ Require status checks to pass before merging
     - ☑️ Require branches to be up to date
     - Add required checks: `Quality Gate`, `build`, `validate / Build Validation`
   - ☑️ Include administrators
5. Click **Create**

**Expected result:**
- ✅ Can't push directly to main
- ✅ Must create PR
- ✅ Quality Gate runs automatically
- ✅ Can self-approve and merge

**Test:**
```bash
git checkout -b test-protection
echo "test" >> README.md
git add README.md
git commit -m "Test branch protection"
git push origin test-protection
gh pr create --fill
# Wait for Quality Gate to pass
gh pr merge --auto --squash
```

---

## ✅ Install GitHub CLI (Recommended)

### 5. Setup GitHub CLI for Easy PR Management

**Install:**
```bash
# macOS
brew install gh

# Or download from: https://cli.github.com/
```

**Authenticate:**
```bash
gh auth login
# Follow prompts, choose HTTPS, authenticate via browser
```

**Test:**
```bash
gh repo view
# Should show your ruby-profile repository
```

**Expected result:** ✅ Can create/manage PRs from terminal

---

## ✅ Optional: Enable Auto-Merge

### 6. Allow Auto-Merge on Repository

1. Go to **Settings** → **General**
2. Scroll to **Pull Requests**
3. Check:
   - ☑️ **Allow auto-merge**
   - ☑️ **Automatically delete head branches**
4. Click **Save**

**Expected result:**
- ✅ PRs can be set to auto-merge when checks pass
- ✅ Branches auto-delete after merge

**Usage:**
```bash
gh pr create --fill
gh pr merge --auto --squash
# PR will merge automatically when Quality Gate passes
```

---

## ✅ Fill in Content

### 7. Add Ruby's Information

**Edit these files:**
1. `src/content/ruby/en.md`
   - Fill in contact information
   - Add veterinarian details
   - Update any placeholders

2. `src/content/ruby/de.md`
   - Same updates in German
   - Keep structure parallel to English

**Test locally:**
```bash
npm run dev
# Visit http://localhost:4321/en/ and /de/
```

**Expected result:** ✅ No `[brackets]` or placeholders visible

---

## ✅ Upload Ruby's Photo

### 8. Add Profile Photo

**See detailed guide:** [PHOTO_NAMING.md](PHOTO_NAMING.md)

**Quick steps:**
```bash
# Copy photo to raw folder
cp ~/Downloads/IMG_1234.jpg public/raw/ruby-photo.jpg

# Option A: Let GitHub optimize
git add public/raw/ruby-photo.jpg
git commit -m "Add Ruby's photo"
git push
# Wait for optimization workflow (~1 min)

# Option B: Optimize locally
npm run optimize-images
git add public/
git commit -m "Add Ruby's photo"
git push
```

**Expected result:**
- ✅ `public/ruby-photo-optimized.webp` created
- ✅ Photo visible on site

---

## ✅ Final Deployment Test

### 9. Verify Everything Works

**Checklist:**
- [ ] Repository created and pushed
- [ ] GitHub Pages enabled
- [ ] Dependabot enabled
- [ ] Branch protection configured
- [ ] GitHub CLI installed
- [ ] Content filled in (no placeholders)
- [ ] Photo uploaded and optimized
- [ ] Site accessible at production URL

**Test deployment:**
```bash
# Make a small change
echo "Last updated: $(date)" >> README.md
git add README.md
git commit -m "Test deployment pipeline"
git push origin main
```

**Watch the deployment:**
1. Go to **Actions** tab on GitHub
2. Watch the workflow run
3. All jobs should be green
4. Visit `https://sorokoletovdu.github.io/ruby-profile/en/`

**Expected result:** ✅ Site live with latest changes

---

## 🎯 Post-Setup Workflow

### Daily Usage

**For quick updates:**
```bash
# Edit files directly on main (if no branch protection)
# OR create PR if branch protection enabled
```

**For Dependabot PRs:**
```bash
# Weekly on Monday, review PRs
gh pr list
gh pr view [NUMBER]
gh pr review [NUMBER] --approve
gh pr merge [NUMBER] --auto --squash
```

**For content updates:**
```bash
# Edit en.md and de.md
npm run quality-gate  # Validate locally
git add .
git commit -m "Update Ruby's info"
git push
```

---

## 📋 Verification Commands

Run these to verify setup:

```bash
# Check repository
gh repo view

# Check Pages status
gh api repos/sorokoletovdu/ruby-profile/pages

# Check branch protection
gh api repos/sorokoletovdu/ruby-profile/branches/main/protection

# List workflows
gh workflow list

# Check latest workflow run
gh run list --limit 1

# Test build locally
npm run quality-gate
```

---

## 🆘 Troubleshooting

**Pages not deploying?**
- Check Actions tab for errors
- Verify Pages source is "GitHub Actions"
- Wait 2-3 minutes after first push

**Branch protection not working?**
- Refresh page after saving rules
- Check "Include administrators" is enabled
- Try creating test PR

**Dependabot not creating PRs?**
- Wait until Monday 9 AM Berlin time
- Check Dependabot is enabled in Settings → Security
- Manually trigger: Settings → Dependabot → Run now

**Quality Gate failing?**
- Check Actions tab for error details
- Run `npm run quality-gate` locally
- Fix errors and push again

---

**Setup Time:** ~15-20 minutes
**Status:** Follow checklist above ⬆️
**Help:** See README.md or CLAUDE.md for details
