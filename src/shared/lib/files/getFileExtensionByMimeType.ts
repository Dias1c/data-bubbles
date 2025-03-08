export function getFileExtensionByMimeType({
  mimeType,
}: {
  mimeType: string;
}): string {
  if (mimeType == "image/png") return ".png";
  if (mimeType == "image/jpeg") return ".jpeg";
  return "";
}
