export const download = ({ url, name }: { url: string; name: string }) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
};
