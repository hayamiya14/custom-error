const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

if (pkg.name === `${pkg.config.scope}${pkg.config.default}`) {
  console.error("✖️  Error: package.json “name” is still the default template. Please update it.");
  process.exit(1);
} else {
  console.log(`✔  Package name is set to "${pkg.name}".`);
}
