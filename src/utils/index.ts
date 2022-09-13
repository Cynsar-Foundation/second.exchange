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

export const getUniquePosts = (posts: NostrEvent[], post?: boolean) => {
  let uniquePosts: NostrEvent[] = [];
  if (!post) {
    uniquePosts = posts.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
  } else {
    uniquePosts = posts.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.id === value.id && post && value.tags.length === 0
        )
    );
  }
  // if (post) {
  //   uniquePosts = posts.filter((post) => post.tags.length === 0);
  // }
  return uniquePosts;
};
