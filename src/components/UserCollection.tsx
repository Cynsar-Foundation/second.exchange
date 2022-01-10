import React from "react";

export const UserCollection = () => {
  const userData = [
    {
      Name: "BORED APE #0",
      Image:
        "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    },
    {
      Name: "BORED APE #1",
      Image:
        "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
    },
    {
      Name: "BORED APE #2",
      Image:
        "https://ipfs.io/ipfs/QmSg9bPzW9anFYc3wWU5KnvymwkxQTpmqcRSfYj7UmiBa7",
    },
    {
      Name: "BORED APE #3",
      Image:
        "https://ipfs.io/ipfs/QmWBgfBhyVmHNhBfEQ7p1P4Mpn7pm5b8KgSab2caELnTuV",
    },
    {
      Name: "BORED APE #4",
      Image:
        "https://ipfs.io/ipfs/QmW1MBApm4XvwgoSKf45ZtsqJU5cDYdcsW2GBSEUqXWE3T",
    },
    {
      Name: "BORED APE #5",
      Image:
        "https://ipfs.io/ipfs/QmeiZs7AWji15fpwTH6fqpZCBSpZpLg8Xn8UKrt4NVkB2y",
    },
    {
      Name: "BORED APE #6",
      Image:
        "https://ipfs.io/ipfs/QmfNyXX3x7HYBpbJseB3pDFvV1W456tYjXxqdsba7WrEuU",
    },
    {
      Name: "BORED APE #7",
      Image:
        "https://ipfs.io/ipfs/QmSdGMvowFxFFHJr3EajE8RNsPpPyKd5mh4yNaZZegPYqn",
    },
    {
      Name: "BORED APE #8",
      Image:
        "https://ipfs.io/ipfs/QmadJMqL3WWr7SdtXzNUEvusy9o3uxedTbCuXNFHQxpsNZ",
    },
  ];
  return (
    <div className="row m-0 justify-content-center">
      <div className=" col-xxl-10 col-xl-10 col-md-10 col-sm-12 col-xs-12">
        <div className="row gy-5 mt-0">
          {userData.map((data) => {
            return (
              <div className="col-xxl-2 col-sm-12 my-3">
                <img className="w-100" src={data.Image} alt={data.Name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
