/**
 * В Iframe не работает localStorage, по этому в местах где идет проверка localStorage нужне iframe.
 */
export const isWindowInIframe = () => {
  return window != window.parent;
};
