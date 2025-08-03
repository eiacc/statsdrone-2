import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the HTML file
const htmlPath = path.join(__dirname, 'src', 'pages', 'homepage.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Conversion mappings
const conversions = {
  // Padding conversions
  'pt-\\[20px\\]': 'pt-5',
  'pt-\\[48px\\]': 'pt-12',
  'px-\\[42px\\]': 'px-10',
  'pb-\\[53px\\]': 'pb-14',
  'mb-\\[38px\\]': 'mb-10',
  'pr-\\[30px\\]': 'pr-8',
  'pt-\\[4px\\]': 'pt-1',
  'pt-\\[64px\\]': 'pt-16',
  'pb-\\[32px\\]': 'pb-8',
  'px-\\[76px\\]': 'px-20',
  'mb-\\[32px\\]': 'mb-8',
  'mb-\\[42px\\]': 'mb-10',
  'mb-\\[24px\\]': 'mb-6',
  'gap-\\[38px\\]': 'gap-10',
  'gap-\\[28px\\]': 'gap-7',
  'py-\\[32px\\]': 'py-8',
  'px-\\[27px\\]': 'px-7',
  'pb-\\[20px\\]': 'pb-5',
  'pb-\\[40px\\]': 'pb-10',
  'pb-\\[80px\\]': 'pb-20',
  'pb-\\[50px\\]': 'pb-12',
  'pb-\\[24px\\]': 'pb-6',
  'pb-\\[33px\\]': 'pb-8',
  'mb-\\[55px\\]': 'mb-14',
  'pt-\\[43px\\]': 'pt-11',
  'px-\\[22px\\]': 'px-6',
  'pt-\\[28px\\]': 'pt-7',
  'pb-\\[44px\\]': 'pb-11',
  'pt-\\[32px\\]': 'pt-8',
  'p-\\[22px\\]': 'p-6',
  'pb-\\[25px\\]': 'pb-6',
  'px-\\[34px\\]': 'px-8',
  'py-\\[64px\\]': 'py-16',
  'pb-\\[86px\\]': 'pb-20',
  'pb-\\[10px\\]': 'pb-3',
  'lg:pb-\\[86px\\]': 'lg:pb-20',
  'pb-\\[33px\\]': 'pb-8',
  'pb-\\[54px\\]': 'pb-14',
  'pb-\\[24px\\]': 'pb-6',
  'lg:pb-\\[66px\\]': 'lg:pb-16',
  'pb-\\[37px\\]': 'pb-9',
  'gap-\\[69px\\]': 'gap-16',
  'gap-\\[103px\\]': 'gap-24',
  'pb-\\[150px\\]': 'pb-36',
  'pt-\\[32px\\]': 'pt-8',
  'pb-\\[25px\\]': 'pb-6',
  'px-\\[26px\\]': 'px-6',
  'pt-\\[32px\\]': 'pt-8',
  'pb-\\[25px\\]': 'pb-6',
  'pb-\\[33px\\]': 'pb-8',
  'pb-\\[30px\\]': 'pb-8',
  'gap-\\[24px\\]': 'gap-6',
  'gap-\\[32px\\]': 'gap-8',
  'py-\\[12px\\]': 'py-3',
  'pb-\\[19px\\]': 'pb-5',
  
  // Width/Height conversions
  'w-\\[9\\.375rem\\]': 'w-36',
  'w-\\[1rem\\]': 'w-4',
  'h-\\[25px\\]': 'h-6',
  'h-\\[23px\\]': 'h-6',
  'h-\\[24px\\]': 'h-6',
  'h-\\[72px\\]': 'h-18',
  'h-\\[52px\\]': 'h-13',
  'max-w-\\[948px\\]': 'max-w-6xl',
  'max-w-\\[1270px\\]': 'max-w-7xl',
  
  // Text size conversions
  'text-\\[24px\\]': 'text-2xl',
  'text-\\[38px\\]': 'text-4xl',
  'text-\\[48px\\]': 'text-5xl',
  'text-\\[36px\\]': 'text-4xl',
  'text-\\[18px\\]': 'text-lg',
  
  // Margin conversions
  'xl:mr-4\\.5': 'xl:mr-5',
  'xl:ml-3': 'xl:ml-3',
  'xl:mb-0': 'xl:mb-0',
  'lg:mb-0': 'lg:mb-0',
  
  // Border conversions
  'border-\\[10px\\]': 'border-8',
  'border-\\[4px\\]': 'border-4',
  'border-\\[2px\\]': 'border-2',
  'rounded-\\[48px\\]': 'rounded-3xl',
  
  // Gap conversions
  'xl:gap-20': 'xl:gap-20',
  'xl:gap-8': 'xl:gap-8',
  'xl:gap-10': 'xl:gap-10',
  'xl:gap-7': 'xl:gap-7',
  'xl:gap-16': 'xl:gap-16',
  'xl:gap-24': 'xl:gap-24',
  'xl:gap-6': 'xl:gap-6',
  
  // SVG width/height
  'w-\\[1rem\\] h-\\[1rem\\]': 'w-4 h-4',
  
  // Max width conversions
  'max-w-\\[218px\\]': 'max-w-52'
};

// Apply conversions
Object.entries(conversions).forEach(([pattern, replacement]) => {
  const regex = new RegExp(pattern, 'g');
  html = html.replace(regex, replacement);
});

// Write the converted HTML back to the file
fs.writeFileSync(htmlPath, html, 'utf8');

console.log('Successfully converted arbitrary CSS values to Tailwind classes!'); 