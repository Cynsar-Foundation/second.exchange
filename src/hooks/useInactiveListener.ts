import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../utils/wallet/Connectors";

export const useInactiveListener = (suppress = false) => {
    const { active, error, activate } = useWeb3React();

    useEffect(() => {
        // @ts-ignore
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = () => {
                //        console.log("Handling 'connect' event")
                activate(injected);
            };
            const handleChainChanged = () => {
                //        console.log("Handling 'chainChanged' event with payload", chainId)
                activate(injected);
            };
            const handleAccountsChanged = (accounts: string) => {
                //        console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    activate(injected);
                }
            };
            const handleNetworkChanged = () => {
                //        console.log("Handling 'networkChanged' event with payload", networkId)
                activate(injected);
            };

            ethereum.on("connect", handleConnect);
            ethereum.on("chainChanged", handleChainChanged);
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("networkChanged", handleNetworkChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener("connect", handleConnect);
                    ethereum.removeListener("chainChanged", handleChainChanged);
                    ethereum.removeListener(
                        "accountsChanged",
                        handleAccountsChanged
                    );
                    ethereum.removeListener(
                        "networkChanged",
                        handleNetworkChanged
                    );
                }
            };
        }
    }, [active, error, suppress, activate]);
};
