import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = './public/raw';
const OUTPUT_DIR = './public';
const MAX_WIDTH = 1200; // Max width for web display
const QUALITY = 90; // WebP quality (1-100, WebP compresses better than JPEG)

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');

  // Check if input directory exists
  if (!existsSync(INPUT_DIR)) {
    console.log(`⚠️  Input directory ${INPUT_DIR} does not exist. Creating it...`);
    await mkdir(INPUT_DIR, { recursive: true });
    console.log('✅ Created input directory. Add images to public/raw/ and run again.');
    return;
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Read all files from input directory
  const files = await readdir(INPUT_DIR);
  const imageFiles = files.filter(file => {
    const ext = extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  No images found in public/raw/');
    return;
  }

  console.log(`📸 Found ${imageFiles.length} image(s) to optimize`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of imageFiles) {
    try {
      const inputPath = join(INPUT_DIR, file);
      const baseName = basename(file, extname(file));
      const outputPath = join(OUTPUT_DIR, `${baseName}-optimized.webp`);

      console.log(`Processing: ${file}`);

      // Load image and get metadata
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      // Resize if necessary and optimize to WebP
      await image
        .resize(MAX_WIDTH, null, {
          width: MAX_WIDTH,
          withoutEnlargement: true, // Don't upscale small images
          fit: 'inside'
        })
        .webp({ quality: QUALITY, effort: 6 }) // effort: 0-6 (higher = better compression, slower)
        .toFile(outputPath);

      const outputMetadata = await sharp(outputPath).metadata();
      const compressionRatio = ((1 - outputMetadata.size / metadata.size) * 100).toFixed(1);

      console.log(`  ✅ Saved: ${basename(outputPath)}`);
      console.log(`     Original: ${metadata.width}x${metadata.height} (${(metadata.size / 1024).toFixed(1)} KB)`);
      console.log(`     Optimized: ${outputMetadata.width}x${outputMetadata.height} (${(outputMetadata.size / 1024).toFixed(1)} KB)`);
      console.log(`     Compression: ${compressionRatio}% reduction`);

      successCount++;
    } catch (error) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully optimized: ${successCount}`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }
  console.log('\n🎉 Image optimization complete!');
}

optimizeImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
