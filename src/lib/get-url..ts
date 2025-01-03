export function getUrl(path?: string) {
  const baseUrl = process.env.HOST_URL || "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  return `${baseUrl}${normalizedPath}`;
}
