export const copyToClipboard = async ({
  text,
  onSuccess,
}: {
  text: string;
  onSuccess?: () => any;
}) => {
  let isCopied = false;

  try {
    await navigator.clipboard.writeText(text);
    isCopied = true;
  } catch (err) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);

    input.select();
    input.setSelectionRange(0, input.value.length);

    try {
      document.execCommand("copy");
      isCopied = true;
    } catch (execErr) {
      console.error("Failed to copy text using execCommand: ", execErr);
    }

    document.body.removeChild(input);
  }
  if (isCopied && onSuccess) await onSuccess();
};
