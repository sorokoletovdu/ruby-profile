# 📸 Photo Upload & Naming Guide

Quick reference for uploading Ruby's photos.

## File Naming Convention

### Main Profile Photo

**Always use this name for Ruby's main photo:**

```
public/raw/ruby-photo.jpg
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.heic` (iPhone)

**Output (auto-generated):**
```
public/ruby-photo-optimized.webp
```

### Additional Photos (Optional)

For seasonal or special photos:

```
public/raw/ruby-[description].jpg

Examples:
  ruby-winter-2026.jpg
  ruby-birthday.jpg
  ruby-haircut.jpg
```

**Output:**
```
public/ruby-[description]-optimized.webp
```

## Photo Requirements Checklist

- [ ] Clear view of Ruby's face
- [ ] Full body visible
- [ ] Good lighting (not too dark)
- [ ] No heavy filters or edits
- [ ] Recent (within last 3 months for profile)

## Upload Methods

### Option A: Automatic (via GitHub)

```bash
# 1. Add photo to raw folder
cp ~/Downloads/IMG_1234.jpg public/raw/ruby-photo.jpg

# 2. Commit and push
git add public/raw/ruby-photo.jpg
git commit -m "Update Ruby's photo"
git push

# 3. Wait ~1 minute - GitHub Action will:
#    - Optimize the image to WebP
#    - Resize to 1200px max width
#    - Commit back to repo automatically
```

### Option B: Manual (local optimization)

```bash
# 1. Add photo to raw folder
cp ~/Downloads/IMG_1234.jpg public/raw/ruby-photo.jpg

# 2. Optimize locally
npm run optimize-images

# 3. Commit optimized image
git add public/
git commit -m "Update Ruby's photo"
git push
```

## What Happens During Optimization

1. **Converts format:** HEIC/JPG/PNG → WebP
2. **Resizes:** Max 1200px width (maintains aspect ratio)
3. **Compresses:** Quality 90, effort 6 (best compression)
4. **Reduces size:** Typically 25-35% smaller than original

## Output Example

```
Input:  public/raw/ruby-photo.jpg (2.4 MB, 3024×4032)
Output: public/ruby-photo-optimized.webp (0.7 MB, 1200×1600)
Savings: 70% reduction
```

## Common Mistakes

❌ **Wrong:**
```
public/ruby.jpg                    # Missing "raw" folder
public/raw/photo.jpg              # Missing "ruby-" prefix
public/raw/Ruby Photo.jpg         # Spaces in filename
public/raw/ruby-photo-new.jpg     # Don't add version suffixes
```

✅ **Correct:**
```
public/raw/ruby-photo.jpg         # Perfect!
public/raw/ruby-photo.png         # Also fine
public/raw/ruby-photo.heic        # iPhone format ok
```

## Troubleshooting

**Photo not showing on site?**
1. Check filename: `public/raw/ruby-photo.jpg`
2. Run: `npm run optimize-images`
3. Verify: `public/ruby-photo-optimized.webp` exists
4. Rebuild: `npm run build`

**Optimization failed?**
1. Check file format (must be jpg, png, heic)
2. Check file isn't corrupted
3. Try different photo
4. Check file size (should be <20MB)

**GitHub Action not running?**
1. Push to `main` branch
2. Check Actions tab on GitHub
3. Wait 1-2 minutes
4. Check for error messages in workflow logs

---

**Quick Link:** Upload to `public/raw/ruby-photo.jpg` and push!
