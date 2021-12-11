import React from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

function ShowChainId() {
    const { chainId } = useWeb3React();

    return (
        <>
            <span>Chain Id</span>
            <span role="img" aria-label="chain">
                ⛓
            </span>
            <span>{chainId ?? ""}</span>
        </>
    );
}

function ShowBlockNumber() {
    const { chainId, library } = useWeb3React();

    const [blockNumber, setBlockNumber] = React.useState();
    React.useEffect(() => {
        if (!!library) {
            let stale = false;

            library
                .getBlockNumber()
                .then((blockNumber) => {
                    if (!stale) {
                        setBlockNumber(blockNumber);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBlockNumber(null);
                    }
                });

            const updateBlockNumber = (blockNumber) => {
                setBlockNumber(blockNumber);
            };
            library.on("block", updateBlockNumber);

            return () => {
                stale = true;
                library.removeListener("block", updateBlockNumber);
                setBlockNumber(undefined);
            };
        }
    }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

    return (
        <>
            <span>Block Number</span>
            <span role="img" aria-label="numbers">
                🔢
            </span>
            <span>{blockNumber === null ? "Error" : blockNumber ?? ""}</span>
        </>
    );
}

function ShowAccount() {
    const { account } = useWeb3React();

    return (
        <>
            <span>Account</span>
            <span role="img" aria-label="robot">
                🤖
            </span>
            <span>
                {account === null
                    ? "-"
                    : account
                    ? `${account.substring(0, 6)}...${account.substring(
                          account.length - 4
                      )}`
                    : ""}
            </span>
        </>
    );
}

function ShowBalance() {
    const { account, library, chainId } = useWeb3React();

    const [balance, setBalance] = React.useState();
    React.useEffect(() => {
        if (!!account && !!library) {
            let stale = false;

            library
                .getBalance(account)
                .then((balance) => {
                    if (!stale) {
                        setBalance(balance);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBalance(null);
                    }
                });

            return () => {
                stale = true;
                setBalance(undefined);
            };
        }
    }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

    return (
        <>
            <span>Balance</span>
            <span role="img" aria-label="gold">
                💰
            </span>
            <span>
                {balance === null
                    ? "Error"
                    : balance
                    ? `Ξ${formatEther(balance)}`
                    : ""}
            </span>
        </>
    );
}
