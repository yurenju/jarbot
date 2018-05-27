export default (slackUrl: string) => {
  return () => {
    return `notification: ${slackUrl}`;
  };
};
