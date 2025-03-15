export const historyReplaceState = ({
  update,
  data,
}: {
  update: (url: URL) => void;
  data?: any;
}) => {
  let url = new URL(window.location.href);
  update(url);
  window.history.replaceState(data, "", url);
};

export const historyPushState = ({
  update,
  data,
}: {
  update: (url: URL) => void;
  data?: any;
}) => {
  let url = new URL(window.location.href);
  update(url);
  window.history.pushState(data, "", url);
};
