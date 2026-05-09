import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(
  root,
  "saltstayz-property-booking (3) (1).html",
);
const t = fs.readFileSync(htmlPath, "utf8");
const start = t.indexOf("<style>") + "<style>".length;
const end = t.indexOf("</style>", start);
const css = t.slice(start, end).trimStart();
const outDir = path.join(root, "app");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "globals.css"), css);
