const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Prajakta/.gemini/antigravity/scratch/prajakta-portfolio';
const files = [
  { file: 'index.html', encoding: 'utf-8', data: fs.readFileSync(path.join(dir, 'index.html'), 'utf8') },
  { file: 'favicon.svg', encoding: 'utf-8', data: fs.readFileSync(path.join(dir, 'favicon.svg'), 'utf8') },
  { file: 'README.md', encoding: 'utf-8', data: fs.readFileSync(path.join(dir, 'README.md'), 'utf8') },
  { file: 'prajakta-photo.jpg', encoding: 'base64', data: fs.readFileSync(path.join(dir, 'prajakta-photo.jpg')).toString('base64') },
  { file: 'resume.pdf', encoding: 'base64', data: fs.readFileSync(path.join(dir, 'resume.pdf')).toString('base64') }
];

const payload = {
  teamId: 'team_mW4XZLMXqmzO5u3t23NKDkiw',
  requestBody: {
    name: 'prajakta-portfolio',
    project: 'prj_UmcH4uBwSm2lJhrdDxmfLo2wSPVR',
    target: 'production',
    files: files
  }
};

const outPath = 'C:/Users/Prajakta/.gemini/antigravity/scratch/deploy-args.json';
fs.writeFileSync(outPath, JSON.stringify(payload));
console.log('Successfully wrote deploy-args.json. File size:', fs.statSync(outPath).size);
