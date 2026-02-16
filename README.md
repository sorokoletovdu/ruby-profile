# 🐩 Ruby's Profile Page

A modern, bilingual (EN/DE) profile page for Ruby, our beloved Toy Poodle. Built with Astro and optimized for quick access on mobile devices in case Ruby goes missing.

## 📸 Live Site

**Production:** https://sorokoletovdu.github.io/ruby-profile/en/

**Languages:**
- 🇬🇧 English: `/en/`
- 🇩🇪 German: `/de/`

## 🎯 Purpose

This site serves as:
- **Emergency resource** if Ruby is lost or found by someone
- **Information hub** for dog sitters, hotels, and veterinarians
- **Quick reference** for Ruby's health, behavior, and contact info

## 🏗️ Tech Stack

- **Framework:** [Astro](https://astro.build/) - Zero-JS by default, blazing fast
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Responsive, mobile-first
- **i18n:** Astro native internationalization
- **Images:** WebP optimization with Sharp
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions with Quality Gate

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/sorokoletovdu/ruby-profile.git
cd ruby-profile

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:4321/en/ to see the site locally.

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production site to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run validate` | Quick validation (build + output check) |
| `npm run quality-gate` | Full validation (build + comprehensive checks) |
| `npm run optimize-images` | Manually optimize images in `public/raw/` |

## 📸 Photo Upload Guidelines

### File Naming Rules

**IMPORTANT:** Follow these naming conventions for automatic optimization:

#### Main Profile Photo
```
public/raw/ruby-photo.jpg         ✅ Correct
public/raw/ruby-photo.heic        ✅ Correct (iPhone format)
public/raw/ruby-photo.png         ✅ Correct

Output: public/ruby-photo-optimized.webp
```

#### Additional Photos (Future)
```
public/raw/ruby-[description].jpg
Example: ruby-winter-2026.jpg
Output: ruby-winter-2026-optimized.webp
```

### Photo Requirements

1. **Format:** JPG, PNG, or HEIC (iPhone native)
2. **Quality:** Clear face and body visible, avoid filters
3. **Size:** Any size (auto-resized to max 1200px width)
4. **Content:**
   - ✅ Clear view of Ruby's face
   - ✅ Full body visible
   - ✅ Good lighting
   - ❌ No heavy filters or edits

### Upload Methods

#### Method 1: Local Optimization (Recommended)
```bash
# 1. Add photo to public/raw/
cp ~/Downloads/IMG_1234.jpg public/raw/ruby-photo.jpg

# 2. Optimize locally
npm run optimize-images

# 3. Commit and push
git add public/
git commit -m "Update Ruby's photo"
git push
```

#### Method 2: GitHub Automatic Optimization
```bash
# 1. Add photo to public/raw/
git add public/raw/ruby-photo.jpg
git commit -m "Add new Ruby photo"
git push

# 2. GitHub Action automatically optimizes and commits back
# Wait ~1 minute for the workflow to complete
```

The optimization workflow:
- Converts HEIC → WebP
- Resizes to max 1200px width
- Compresses to WebP quality 90
- Reduces file size by ~30%

## ✏️ Editing Content

### English Content
Edit: `src/content/ruby/en.md`

### German Content
Edit: `src/content/ruby/de.md`

### Content Structure

```markdown
---
title: Ruby the Toy Poodle
---
# Hi, I am Ruby 🐩

[Your markdown content here]
```

**Key Sections:**
- Quick Info table (breed, weight, age, microchip, etc.)
- Personality & Safety
- Contact Information
- Veterinary Information

**Important:** Keep contact info up-to-date, especially:
- Phone numbers (with country codes)
- WhatsApp links
- Emergency contacts
- Veterinarian details

## 🤝 Contributing (Family Members)

### Before Making Changes

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Create a branch (optional but recommended):**
   ```bash
   git checkout -b update-ruby-info
   ```

### Making Changes

1. **Edit content files:**
   - English: `src/content/ruby/en.md`
   - German: `src/content/ruby/de.md`

2. **Test locally:**
   ```bash
   npm run dev
   # Check both /en/ and /de/ pages
   ```

3. **Validate build:**
   ```bash
   npm run quality-gate
   ```

### Committing Changes

```bash
# Stage your changes
git add .

# Commit with clear message
git commit -m "Update Ruby's vet information"

# Push to GitHub
git push origin main
```

**Commit Message Guidelines:**
- Use clear, descriptive messages
- Examples:
  - ✅ "Update Ruby's weight and age"
  - ✅ "Add new emergency contact"
  - ✅ "Update German translation"
  - ❌ "changes"
  - ❌ "update"

### Quality Gate

Every push triggers automatic validation:
1. ✅ Build test (ensures site compiles)
2. ✅ File check (verifies both language versions exist)
3. ✅ Content validation (checks for required sections)
4. 🚀 Deploy (if all checks pass)

If validation fails, check the Actions tab on GitHub for error details.

## 🔄 Deployment

Deployment is **fully automatic**:

1. Push to `main` branch
2. GitHub Actions runs Quality Gate
3. Builds site with Astro
4. Deploys to GitHub Pages
5. Site live at: https://sorokoletovdu.github.io/ruby-profile/

**Deployment time:** ~2-3 minutes

### Manual Deployment Check

```bash
# Check deployment status
gh run list --workflow=deploy.yml

# View deployment logs
gh run view --web
```

## 🛠️ Project Structure

```
ruby-profile/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Main deployment with Quality Gate
│       ├── validate.yml         # PR validation
│       └── optimize-images.yml  # Image optimization
├── public/
│   ├── raw/                     # Upload photos here
│   └── *.webp                   # Optimized images (auto-generated)
├── src/
│   ├── content/
│   │   ├── config.ts           # Content schema
│   │   └── ruby/
│   │       ├── en.md           # English content
│   │       └── de.md           # German content
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML layout
│   └── pages/
│       ├── index.astro         # Root redirect to /en/
│       └── [lang]/
│           └── index.astro     # Dynamic language routing
├── scripts/
│   ├── optimize-images.js      # Image optimization script
│   └── validate-project.js     # Quality gate validation
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind CSS config
└── package.json                # Dependencies & scripts
```

## 🔐 Privacy & Security

- **Repository:** Private (family only)
- **Deployed Site:** Public (GitHub Pages)
- **Sensitive Data:** Use placeholders or generic info for public deployment
- **Contact Info:** Consider using a dedicated phone number or email for the public page

**Important:** Do NOT commit:
- ❌ Microchip numbers
- ❌ Full home address
- ❌ Personal medical records
- ✅ Generic contact method (phone, email)
- ✅ General location (city/area)

## 📋 Maintenance Checklist

### Monthly
- [ ] Update Ruby's weight (if changed)
- [ ] Verify contact numbers are active
- [ ] Check veterinarian info is current
- [ ] Update photo if Ruby's appearance changed

### After Vet Visit
- [ ] Update last checkup date
- [ ] Update vaccination status
- [ ] Add any new medications or allergies
- [ ] Update weight if changed significantly

### Before Travel/Dog Sitting
- [ ] Verify all contact info is current
- [ ] Update any temporary contacts
- [ ] Ensure photo is recent
- [ ] Share the link with dog sitter

## 🐛 Troubleshooting

### Build Fails Locally

```bash
# Clear cache and reinstall
rm -rf node_modules dist .astro
npm install
npm run build
```

### Images Not Showing

1. Check file path in markdown:
   ```markdown
   ![Ruby](/ruby-profile/ruby-photo-optimized.webp)
   ```
2. Verify optimized image exists in `public/`
3. Rebuild: `npm run build`

### Quality Gate Fails on GitHub

1. Check Actions tab for error details
2. Run locally: `npm run quality-gate`
3. Fix errors and push again

### Deployment Delay

- Normal deployment: 2-3 minutes
- If >5 minutes: Check Actions tab for status
- If failed: Check error logs in Actions

## 📞 Support

**For technical issues:**
- Check [GitHub Issues](https://github.com/sorokoletovdu/ruby-profile/issues)
- Review [Astro Docs](https://docs.astro.build/)

**For urgent Ruby-related needs:**
- Use contact info on the live site
- Call emergency veterinarian

## 📄 License

Copyright © 2026 Dmitrii Sorokoletov & Family. All rights reserved.

This is a private family project. Not licensed for public use or distribution.

---

**Last Updated:** February 2026
**Ruby's Age:** 3 months
**Site Version:** 1.0.0

Made with ❤️ for our beloved Ruby 🐩

