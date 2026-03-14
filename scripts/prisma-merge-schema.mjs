import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PRISMA_DIR = path.join(ROOT, 'prisma');
const PARTS_DIR = path.join(PRISMA_DIR, 'schema');
const OUT_FILE = path.join(PRISMA_DIR, 'schema.prisma');

const GENERATED_HEADER = `// ================================================
// AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY
// Source of truth lives in: prisma/schema/*.prisma
// Run: npm run prisma:schema:build
// ================================================
`;

function isPrismaFile(file) {
  return file.endsWith('.prisma');
}

async function main() {
  let dirEntries;
  try {
    dirEntries = await fs.readdir(PARTS_DIR, { withFileTypes: true });
  } catch (err) {
    // If folder doesn't exist, keep backward compatibility (no-op).
    if (err && err.code === 'ENOENT') return;
    throw err;
  }

  const files = dirEntries
    .filter((d) => d.isFile() && isPrismaFile(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

  const baseFile = '_base.prisma';
  if (!files.includes(baseFile)) {
    throw new Error(
      `Missing ${path.join('prisma', 'schema', baseFile)}. This file must contain datasource + generator.`,
    );
  }

  const ordered = [baseFile, ...files.filter((f) => f !== baseFile)];

  const parts = [];
  for (const file of ordered) {
    const filePath = path.join(PARTS_DIR, file);
    const content = await fs.readFile(filePath, 'utf8');
    const trimmed = content.trim();
    if (!trimmed) continue;

    parts.push(`// ---- ${path.join('prisma', 'schema', file)} ----\n${trimmed}\n`);
  }

  const out = `${GENERATED_HEADER}\n${parts.join('\n')}`.trimEnd() + '\n';
  await fs.writeFile(OUT_FILE, out, 'utf8');
}

await main();
