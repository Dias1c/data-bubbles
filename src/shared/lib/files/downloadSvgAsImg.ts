export function downloadSvgAsImg({
  svg,
  filename,
  mimeType,
}: {
  svg: SVGElement;
  filename: string;
  mimeType: string;
}) {
  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = svg.clientWidth || 256;
    canvas.height = svg.clientHeight || 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("downloadSvgAsImg: ctx is null");
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    URL.revokeObjectURL(url);

    const canvasURL = canvas.toDataURL(mimeType);

    const a = document.createElement("a");
    a.href = canvasURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    canvas.toBlob((blob) => {}, "image/png");
  };

  img.src = url;
}
