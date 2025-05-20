const fs = require("fs");
const path = require("path");
const readline = require("readline");

const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const scope = pkg.config.scope;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const currentShortName = pkg.name.replace(scope, "");

rl.question(`Enter new package short name (current: ${currentShortName}): `, (newShortName) => {
  const trimmed = newShortName.trim();

  if (trimmed && /^[a-z0-9\-]+$/.test(trimmed)) {
    pkg.name = scope + trimmed;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`✔  Package name updated to "${pkg.name}".`);
  } else {
    console.warn("⚠️  Invalid or empty name. Package name unchanged.");
  }

  rl.close();
});

try {
  fs.rmSync(".git", { recursive: true, force: true });
  console.log("✔  Original .git directory removed.");
} catch {
  console.warn("⚠️  .git directory not found or failed to remove.");
}
