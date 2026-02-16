import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Running comprehensive project validation...\n');

let hasErrors = false;
let hasWarnings = false;

// Color codes for terminal output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

function success(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function warning(message) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
  hasWarnings = true;
}

function error(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
  hasErrors = true;
}

// 1. Check build output
console.log('📦 Checking build output...');
const buildFiles = ['dist/index.html', 'dist/en/index.html', 'dist/de/index.html'];

buildFiles.forEach(file => {
  if (existsSync(file)) {
    success(`Found ${file}`);
  } else {
    error(`Missing ${file} - run 'npm run build' first`);
  }
});

// 2. Validate content files
console.log('\n📝 Validating content files...');
const contentFiles = [
  { path: 'src/content/ruby/en.md', lang: 'English' },
  { path: 'src/content/ruby/de.md', lang: 'German' },
];

contentFiles.forEach(({ path, lang }) => {
  if (!existsSync(path)) {
    error(`Missing ${lang} content file: ${path}`);
    return;
  }

  success(`Found ${lang} content file`);

  const content = readFileSync(path, 'utf-8');

  // Check frontmatter
  if (!content.match(/^---\s*\ntitle:/m)) {
    error(`${lang} content missing 'title' in frontmatter`);
  } else {
    success(`${lang} content has valid frontmatter`);
  }

  // Check for placeholders
  const placeholders = content.match(/\[.*?\]/g);
  if (placeholders && placeholders.length > 0) {
    warning(`${lang} content has ${placeholders.length} unfilled placeholder(s)`);
  } else {
    success(`${lang} content has no placeholders`);
  }

  // Check for critical sections
  const criticalSections = ['Emergency Contacts', 'Notfallkontakte'];
  const hasCriticalSection = criticalSections.some(section =>
    content.includes(section)
  );

  if (hasCriticalSection) {
    success(`${lang} content has emergency contact section`);
  } else {
    warning(`${lang} content might be missing emergency contact section`);
  }
});

// 3. Check configuration
console.log('\n⚙️  Validating configuration...');
if (existsSync('astro.config.mjs')) {
  success('Found astro.config.mjs');

  const config = readFileSync('astro.config.mjs', 'utf-8');

  if (config.includes('site:') && config.includes('base:')) {
    success('Site and base URL configured');
  } else {
    warning('Site or base URL might not be configured');
  }

  if (config.includes('i18n:')) {
    success('i18n configuration found');
  } else {
    error('Missing i18n configuration');
  }
} else {
  error('Missing astro.config.mjs');
}

// 4. Check for images
console.log('\n🖼️  Checking images...');
const imageDir = 'public';

if (existsSync(imageDir)) {
  success('Public directory exists');

  // Check for WebP images
  const images = existsSync(join(imageDir, 'ruby-photo-optimized.webp'));
  if (images) {
    success('Found optimized WebP image');
  } else {
    warning('No optimized images found - run image optimization workflow');
  }
} else {
  warning('Public directory not found');
}

// 5. Check dependencies
console.log('\n📚 Checking dependencies...');
if (existsSync('package.json')) {
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

  const requiredDeps = ['astro', '@astrojs/tailwind', 'tailwindcss', 'sharp'];
  requiredDeps.forEach(dep => {
    if (pkg.dependencies[dep]) {
      success(`Found dependency: ${dep}`);
    } else {
      error(`Missing dependency: ${dep}`);
    }
  });

  const requiredScripts = ['dev', 'build', 'preview', 'validate'];
  requiredScripts.forEach(script => {
    if (pkg.scripts[script]) {
      success(`Found script: ${script}`);
    } else {
      warning(`Missing script: ${script}`);
    }
  });
} else {
  error('Missing package.json');
}

// 6. Check workflows
console.log('\n🔄 Checking GitHub workflows...');
const workflows = [
  '.github/workflows/deploy.yml',
  '.github/workflows/validate.yml',
  '.github/workflows/optimize-images.yml',
];

workflows.forEach(workflow => {
  if (existsSync(workflow)) {
    success(`Found ${workflow}`);
  } else {
    warning(`Missing ${workflow}`);
  }
});

// Final summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log(`${colors.red}❌ Validation FAILED${colors.reset}`);
  console.log('Please fix the errors above before deploying.');
  process.exit(1);
} else if (hasWarnings) {
  console.log(`${colors.yellow}⚠️  Validation passed with warnings${colors.reset}`);
  console.log('Consider addressing the warnings above.');
  process.exit(0);
} else {
  console.log(`${colors.green}✅ All validations passed!${colors.reset}`);
  console.log('Project is ready for deployment! 🚀');
  process.exit(0);
}
