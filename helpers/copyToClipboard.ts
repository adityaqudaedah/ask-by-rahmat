export const copyTextToClipboard = async <T extends string>(text: T ) => {
    if ('clipboard' in navigator)
      return await navigator.clipboard.writeText(text);
    return document.execCommand('copy', true, text);
  };
  