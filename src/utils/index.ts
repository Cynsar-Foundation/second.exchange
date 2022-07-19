export const getPrivateKey = () => {
  let privKey;
  if (typeof window !== "undefined") {
    privKey =
      localStorage.getItem("keys") !== null
        ? JSON.parse(localStorage.getItem("keys")!).privateKey
        : null;
  }
  return privKey;
};

export const getPublicKey = () => {
  let privKey;
  if (typeof window !== "undefined")
    privKey =
      localStorage.getItem("keys") !== null
        ? JSON.parse(localStorage.getItem("keys")!).publicKey
        : null;
  return privKey;
};

export const toDateTime = (secs: number) => {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
};
