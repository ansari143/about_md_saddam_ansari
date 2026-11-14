import { existsSync } from "node:fs";
import path from "node:path";

/** True when a file exists under /public. Evaluated at build/render time on the server. */
export function publicFileExists(publicPath: string): boolean {
  if (!publicPath) return false;
  return existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}
