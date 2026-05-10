import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cssPath = path.join(root, "app", "globals.css");

const raw = fs.readFileSync(cssPath, "utf8");
if (raw.includes('@import "tailwindcss"')) {
  console.error(
    "globals.css is already Tailwind-processed. Restore vanilla CSS from git before re-running.",
  );
  process.exit(1);
}
const lines = raw.split(/\r?\n/);

const markerIdx = lines.findIndex((l) => l.includes("/* STATE SWITCHER */"));
if (markerIdx === -1) {
  console.error("Marker STATE SWITCHER not found");
  process.exit(1);
}

const baseLines = lines.slice(0, markerIdx);
const componentLines = lines.slice(markerIdx);

const theme = `@import "tailwindcss";

@theme {
  --color-ss-green: #4f7134;
  --color-ss-green-dark: #3d5a26;
  --color-ss-green-soft: #eef3e6;
  --color-ss-gold: #f2d98c;
  --color-ss-gold-dark: #a88830;
  --color-ss-gold-deep: #9a7820;
  --color-ss-cream: #f5f3ec;
  --color-ss-text: #1a1a1a;
  --color-ss-text-mute: #6a6a66;
  --color-ss-text-light: #9a9a96;
  --color-ss-red: #a32d2d;
  --color-ss-red-soft: #fcebeb;
  --color-ss-amber: #9a7820;
  --color-ss-amber-soft: #fffbf0;
  --color-ss-success: #3d5a26;
  --color-ss-success-soft: #eef3e6;
  --color-gz-lime: #c6f432;
  --color-gz-lime-deep: #9bc81e;
  --color-gz-purple: #7b3ff2;
  --color-gz-purple-deep: #5b1fe0;
  --color-gz-pink: #ff4fa3;
  --color-gz-pink-deep: #e91e80;
  --color-gz-orange: #ff7a1a;
  --color-gz-orange-deep: #e55a00;
  --color-gz-yellow: #ffd60a;
  --color-gz-red: #ff3b5c;
  --color-brand-navy: #08273b;
  --color-brand-gold: #ffb514;
  --color-brand-crimson: #841a1a;
  --color-brand-maroon: #822049;
  --radius-ss-sm: 8px;
  --radius-ss-md: 12px;
  --radius-ss-lg: 16px;
  --radius-ss-xl: 20px;
  --breakpoint-booking: 900px;
  --breakpoint-booking-lg: 1180px;
}

@layer base {
${baseLines.join("\n")}
}

@layer components {
${componentLines.join("\n")}
}
`;

fs.writeFileSync(cssPath, theme, "utf8");
console.log("Wrote Tailwind-layered globals.css");
