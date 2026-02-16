# Claude Agent Instructions

This file provides context for AI assistants (like Claude) working on this project.

## Project Overview

**Purpose:** Bilingual (EN/DE) profile page for Ruby, a Toy Poodle
**Primary Use Case:** Emergency reference if Ruby is lost, info for caregivers
**Tech Stack:** Astro + Tailwind CSS + GitHub Pages
**Deployment:** Automatic via GitHub Actions with Quality Gate

## Critical Context

### Ruby's Information (As of Feb 2026)
- **Breed:** Toy Poodle (Apricot)
- **Born:** December 1st, 2025 (very young puppy!)
- **Weight:** 3.5 kg
- **Microchipped:** Yes
- **Medications:** None
- **Allergies:** None known
- **Personality:** Friendly but shy, needs gentle handling
- **Location:** Düsseldorf-Rath, Germany

### Project Goals
1. **Mobile-first:** Site must load fast on mobile data (emergency situations)
2. **Bilingual:** Maintain EN/DE parity in content structure
3. **Simple & Clear:** Emergency info should be immediately visible
4. **No JavaScript:** Static site, zero runtime JS for maximum speed
5. **Quality Gated:** All changes must pass validation before deployment

## Architecture Decisions

### Why Astro?
- Zero JavaScript by default → fastest possible load times
- Native i18n support → clean language routing
- Markdown-based content → easy for non-technical users to edit
- Static output → works perfectly on GitHub Pages

### Why WebP?
- 25-35% smaller than JPEG → faster mobile loading
- Modern format, 97%+ browser support in 2026
- Critical for emergency situations with poor signal

### Why Quality Gate?
- Prevents broken builds from deploying
- Validates both language versions exist
- Ensures content structure remains consistent
- Catches errors before they reach production

## File Structure Rules

### Content Files
- **Location:** `src/content/ruby/`
- **Schema:** Defined in `src/content/config.ts`
- **Languages:** `en.md` and `de.md` must mirror each other structurally
- **Frontmatter:** Only `title` field required

### Image Files
- **Upload to:** `public/raw/` (original photos)
- **Output to:** `public/` (optimized WebP)
- **Naming:** `[name]-optimized.webp` (auto-generated)
- **Referenced as:** `/ruby-profile/[name]-optimized.webp` (includes base path)

### Configuration
- **Site config:** `astro.config.mjs`
- **Base path:** `/ruby-profile` (GitHub Pages subpath)
- **i18n:** English default, German secondary, both prefixed (`/en/`, `/de/`)

## Development Workflow

### When Making Changes

1. **Read existing content first**
   - Understand current structure before modifying
   - Maintain consistency between EN/DE versions
   - Preserve emergency-focused layout

2. **Test locally before committing**
   ```bash
   npm run quality-gate  # Always run this before committing
   ```

3. **Validate all changes**
   - Build must succeed
   - Both `/en/` and `/de/` must render
   - No broken image links
   - Contact info sections present

4. **Consider mobile users**
   - Keep content concise
   - Use tables for structured data
   - Ensure images are optimized
   - Test on small viewports

### Common Tasks

#### Update Content
1. Read both `en.md` and `de.md`
2. Make parallel changes to both files
3. Keep structure identical
4. Validate with `npm run build`

#### Add New Image
1. User uploads to `public/raw/ruby-photo.jpg`
2. Run `npm run optimize-images` or push (auto-optimizes)
3. Reference as `/ruby-profile/ruby-photo-optimized.webp`
4. Update both EN/DE markdown files

#### Fix Build Errors
1. Check import paths (relative from file location)
2. Verify image paths include base path (`/ruby-profile/`)
3. Ensure frontmatter is valid YAML
4. Run `npm run quality-gate` to diagnose

## Important Constraints

### DO NOT
- ❌ Add runtime JavaScript (defeats the purpose of Astro)
- ❌ Break the mobile-first design
- ❌ Make changes to only one language version
- ❌ Remove the Quality Gate from deployment workflow
- ❌ Change base path without updating all image references
- ❌ Add heavy dependencies (keep bundle small)

### ALWAYS
- ✅ Maintain EN/DE content parity
- ✅ Keep emergency info at the top
- ✅ Use WebP for images
- ✅ Validate builds before committing
- ✅ Preserve responsive design (Tailwind classes)
- ✅ Keep contact info placeholders clear and obvious

### PREFER
- ✅ Tailwind utility classes over custom CSS
- ✅ Markdown tables over HTML tables
- ✅ Concise content over comprehensive (emergency context)
- ✅ Static content over dynamic (no API calls needed)

## Content Guidelines

### Emergency Alert Section
- Must be visible without scrolling
- Clear, bold warning text
- Red/orange color scheme for urgency
- Same message in both languages

### Quick Info Section
- Use markdown tables (not lists) for better mobile layout
- Include: breed, weight, age, microchip status, medications, allergies
- Checkmark (✅) for positive confirmations (microchipped, etc.)
- Keep to essentials only

### Personality & Safety
- Lead with critical behavior info ("Do NOT chase")
- Include stranger interaction behavior
- Note any fears or triggers
- Keep it actionable for finders

### Contact Information
- Use placeholders for sensitive data: `[Your phone number here]`
- Include emojis for visual scanning: 📞 💬 ✉️
- Provide multiple contact methods
- Include general location (city), not full address

## Quality Standards

### Build Validation
Every change must pass:
1. TypeScript compilation
2. Astro build process
3. Output file verification (`dist/en/index.html`, `dist/de/index.html`)
4. Content structure validation

### Manual Testing Checklist
Before declaring work complete:
- [ ] Site builds without errors
- [ ] Both language versions load
- [ ] Language toggle works
- [ ] Images display correctly
- [ ] Mobile layout looks good
- [ ] Emergency banner is visible
- [ ] Contact section is present

## Common Issues & Solutions

### "Cannot resolve Layout.astro"
- Check relative import path from current file location
- From `src/pages/[lang]/index.astro`: use `../../layouts/Layout.astro`

### Images not displaying
- Verify path includes base: `/ruby-profile/image.webp`
- Check file exists in `public/` (not `public/raw/`)
- Ensure image was optimized (`.webp` extension)

### Build fails on GitHub but works locally
- Run `npm ci` (not `npm install`) to match GitHub environment
- Check Node.js version (should be 20)
- Review GitHub Actions logs for specific error

### Content out of sync between languages
- Use diff tool to compare `en.md` and `de.md`
- Ensure same sections exist in both
- Verify structure is parallel (not necessarily word-for-word)

## Deployment Pipeline

```
Push to main
    ↓
Quality Gate (validate job)
    ├─ Install dependencies
    ├─ Build site
    └─ Verify outputs
    ↓ (fails fast if error)
Build (build job)
    ├─ Checkout code
    └─ Run withastro/action
    ↓
Deploy (deploy job)
    └─ Deploy to GitHub Pages
    ↓
Live at: sorokoletovdu.github.io/ruby-profile/
```

**Total time:** ~2-3 minutes from push to live

## Working with the Owners

### Communication Style
- Owners are technical but not web developers
- Provide clear, step-by-step instructions
- Explain "why" behind technical decisions
- Use emojis for visual clarity in documentation

### When to Ask Questions
- If requirement is ambiguous
- Before making breaking changes
- When privacy/security tradeoffs exist
- If content changes affect structure

### When to Proceed Autonomously
- Fixing build errors
- Optimizing performance
- Improving code quality
- Updating dependencies (minor versions)

## Additional Notes

- **Site is public** but **repo is private** - be mindful of sensitive data
- **Ruby is very young** (3 months) - content may need frequent updates
- **This is critical infrastructure** - site may be needed in emergencies
- **Keep it simple** - avoid over-engineering for a single-page site

## Resources

- [Astro Docs](https://docs.astro.build/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

---

**Last Updated:** February 2026
**For:** Claude Code and other AI assistants
**Maintained by:** Dmitrii Sorokoletov
