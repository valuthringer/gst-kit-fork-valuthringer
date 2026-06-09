import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");
const require = createRequire(import.meta.url);

// Try node-gyp-build first: it resolves prebuilds/ before build/Release/
let addonFound = false;
try {
  require("node-gyp-build")(projectRoot);
  addonFound = true;
} catch {
  addonFound = false;
}

if (!addonFound) {
  console.log("GStreamer Kit native addon not found, building...");

  const nodeModulesPath = join(projectRoot, "node_modules");
  const nodeAddonApiPath = join(nodeModulesPath, "node-addon-api");

  if (!existsSync(nodeModulesPath) || !existsSync(nodeAddonApiPath)) {
    console.log("Dependencies not found, installing...");
    try {
      execSync("npm install --ignore-scripts", { stdio: "inherit", cwd: projectRoot });
    } catch (error) {
      console.error("Failed to install dependencies:", error.message);
      process.exit(1);
    }
  }

  try {
    execSync("npm run build:native", { stdio: "inherit", cwd: projectRoot });
  } catch (error) {
    console.error("Failed to build native addon:", error.message);
    console.error("Make sure you have the required system dependencies:");
    console.error("- GStreamer development libraries");
    console.error("- Python 2.7 or 3.x (for node-gyp)");
    console.error("- A C++ compiler");
    process.exit(1);
  }
}
