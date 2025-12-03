const fs = require('fs');
const path = require('path');

const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const nextDir = path.join(process.cwd(), '.next');
const publicDir = path.join(process.cwd(), 'public');

if (fs.existsSync(nextDir)) {
  if (fs.existsSync(publicDir)) {
    console.log('Copying public folder to .next/public...');
    const destPublic = path.join(nextDir, 'public');
    if (fs.existsSync(destPublic)) {
      fs.rmSync(destPublic, { recursive: true, force: true });
    }
    copyDir(publicDir, destPublic);
    console.log('Public assets copied successfully!');
  } else {
    console.log('Public directory not found, skipping...');
  }
} else {
  console.error('Next.js build directory not found:', nextDir);
  process.exit(1);
}
