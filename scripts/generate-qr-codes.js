import QRCode from 'qrcode';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const BASE_URL = 'https://sorokoletovdu.github.io/ruby-profile';
const OUTPUT_DIR = './public/qr-codes';

const qrCodes = [
  { name: 'en', url: `${BASE_URL}/en/`, label: 'English' },
  { name: 'de', url: `${BASE_URL}/de/`, label: 'German' },
  { name: 'root', url: `${BASE_URL}/`, label: 'Auto-redirect' },
];

async function generateQRCodes() {
  console.log('🔲 Generating QR codes...');

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  for (const qr of qrCodes) {
    try {
      // Generate SVG (scalable for printing)
      const svgPath = `${OUTPUT_DIR}/ruby-profile-${qr.name}.svg`;
      await QRCode.toFile(svgPath, qr.url, {
        type: 'svg',
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      // Generate PNG (for web display)
      const pngPath = `${OUTPUT_DIR}/ruby-profile-${qr.name}.png`;
      await QRCode.toFile(pngPath, qr.url, {
        type: 'png',
        width: 600,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      // Generate high-res PNG for printing
      const printPath = `${OUTPUT_DIR}/ruby-profile-${qr.name}-print.png`;
      await QRCode.toFile(printPath, qr.url, {
        type: 'png',
        width: 1200, // High resolution for printing
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      console.log(`  ✅ ${qr.label}: ${qr.url}`);
      console.log(`     - SVG: ${svgPath}`);
      console.log(`     - PNG (web): ${pngPath}`);
      console.log(`     - PNG (print): ${printPath}`);
    } catch (error) {
      console.error(`  ❌ Error generating QR for ${qr.label}:`, error.message);
    }
  }

  // Generate printable sheet with both QR codes
  await generatePrintableHTML();

  console.log('\n✅ QR code generation complete!');
  console.log('\n📄 Printable version: public/qr-codes/printable.html');
  console.log('   Open this file in a browser and print for Ruby\'s collar tag!');
}

async function generatePrintableHTML() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ruby's QR Codes - Printable</title>
  <style>
    @media print {
      @page { margin: 0.5in; size: letter; }
      .no-print { display: none; }
    }
    body {
      font-family: Arial, sans-serif;
      max-width: 8.5in;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      text-align: center;
      page-break-after: always;
    }
    .qr-section {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 20px 0;
      background: #f9f9f9;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
    }
    .url {
      font-family: monospace;
      color: #666;
      font-size: 14px;
      margin: 10px 0;
    }
    .instructions {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 15px;
      margin: 20px 0;
      text-align: left;
    }
    .dog-emoji {
      font-size: 48px;
      margin: 20px 0;
    }
    img {
      max-width: 300px;
      height: auto;
    }
    .tag-size {
      border: 2px solid #f44336;
      padding: 20px;
      margin: 20px auto;
      max-width: 2in;
      background: white;
    }
    .tag-size img {
      max-width: 100%;
    }
    .tag-text {
      font-size: 10px;
      font-weight: bold;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="dog-emoji">🐩</div>
    <h1>Ruby's Profile Page - QR Codes</h1>
    <p>Scan to view Ruby's emergency contact information</p>

    <div class="instructions no-print">
      <strong>📋 Instructions:</strong>
      <ul>
        <li>Print this page (Ctrl/Cmd + P)</li>
        <li>Cut out the collar tag section below</li>
        <li>Laminate or use clear tape to protect</li>
        <li>Attach to Ruby's collar or ID tag</li>
      </ul>
    </div>

    <div class="qr-section">
      <h2>🇬🇧 English Version</h2>
      <img src="ruby-profile-en-print.png" alt="QR Code - English" />
      <p class="url">${BASE_URL}/en/</p>
    </div>

    <div class="qr-section">
      <h2>🇩🇪 German Version</h2>
      <img src="ruby-profile-de-print.png" alt="QR Code - German" />
      <p class="url">${BASE_URL}/de/</p>
    </div>

    <div class="qr-section">
      <h2>🌐 Auto-Redirect (Recommended)</h2>
      <img src="ruby-profile-root-print.png" alt="QR Code - Auto" />
      <p class="url">${BASE_URL}/</p>
      <p><small>Automatically redirects to English</small></p>
    </div>

    <!-- Collar Tag Template -->
    <div style="page-break-before: always;">
      <h2 class="no-print">✂️ Cut Here - Collar Tag</h2>
      <div class="tag-size">
        <img src="ruby-profile-root-print.png" alt="Ruby QR Code" />
        <div class="tag-text">
          SCAN ME<br>
          IF FOUND<br>
          🐩 Ruby
        </div>
      </div>
      <p class="no-print" style="color: #666; font-size: 12px;">
        Suggested: Print on cardstock, laminate, and attach to collar with a split ring
      </p>
    </div>
  </div>
</body>
</html>`;

  await writeFile(`${OUTPUT_DIR}/printable.html`, html);
}

generateQRCodes().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
