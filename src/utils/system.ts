export const getIOSVersion = () => {
  const userAgent = window.navigator.userAgent;
  const match = userAgent.match(/iPad|iPhone|iPod/g);
  if (match) {
    const iOSVersion =
      parseFloat(
        (
          "" +
          (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(
            userAgent
          ) || [0, ""])[1]
        )
          .replace("undefined", "3_2")
          .replace("_", ".")
          .replace("_", "")
      ) || false;

    if (+iOSVersion >= 17) return false;
    return true;
  }
  // if system android
  return false;
};
