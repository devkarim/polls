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

// Thanks to https://stackoverflow.com/a/3177838/9746922
export const timeSince = (timestamp: number) => {
  let seconds = Math.floor((Date.now() - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
};
