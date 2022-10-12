export const random = <T>(arr: T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const log = (text: any, tag: string = 'DEBUG') => {
  const logMsg = `[${tag}] ${text}`;
  console.error(logMsg);
};

export const logError = (err: any) => {
  return log(err, 'ERROR');
};
