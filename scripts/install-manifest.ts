export type InstallManifest = {
  include: string[];
  exclude: string[];
  neverWrite: string[];
  lockPath: string;
  readHint: string;
};

export const MANIFEST_PATH = "scripts/install-manifest.json";

export function parseManifest(text: string): InstallManifest {
  const data = JSON.parse(text) as InstallManifest;
  if (!Array.isArray(data.include) || data.include.length === 0) {
    throw new Error("fail-closed: manifest include is empty");
  }
  if (!Array.isArray(data.exclude) || !Array.isArray(data.neverWrite)) {
    throw new Error("fail-closed: manifest exclude/neverWrite missing");
  }
  if (!data.lockPath.endsWith(".json") || data.lockPath.includes("..")) {
    throw new Error("fail-closed: invalid lock path");
  }
  if (!data.readHint) throw new Error("fail-closed: readHint missing");
  return data;
}

export function matchesPrefix(path: string, rule: string): boolean {
  if (rule.endsWith("/")) return path === rule.slice(0, -1) || path.startsWith(rule);
  return path === rule;
}

export function isExcluded(path: string, manifest: InstallManifest): boolean {
  if (manifest.neverWrite.includes(path)) return true;
  return manifest.exclude.some((rule) => matchesPrefix(path, rule));
}

export function isIncluded(path: string, manifest: InstallManifest): boolean {
  if (isExcluded(path, manifest)) return false;
  return manifest.include.some((rule) => matchesPrefix(path, rule));
}

export function listInstallPaths(relativeFiles: string[], manifest: InstallManifest): string[] {
  const paths = relativeFiles.filter((path) => {
    if (path.includes("..") || path.startsWith("/")) return false;
    return isIncluded(path, manifest);
  });
  return [...new Set(paths)].sort();
}
