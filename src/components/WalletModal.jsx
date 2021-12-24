import React from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { IoCloseOutline } from "react-icons/io5";
import { useMoralis } from "react-moralis";

import { useWalletModalValue } from "../context";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { walletconnect, portis, torus } from "../utils/wallet/Connectors";

import MetaMaskLogo from "../assets/images/metamask.svg";
import WalletConnectLogo from "../assets/images/walletconnect.svg";
import PortisLogo from "../assets/images/portis.svg";
import TorusLogo from "../assets/images/torus.svg";

const ConnectorNames = {
    WalletConnect: "WalletConnect",
    Portis: "Portis",
    Torus: "Torus",
};

const WalletLogos = {
    MetaMask: MetaMaskLogo,
    WalletConnect: WalletConnectLogo,
    Portis: PortisLogo,
    Torus: TorusLogo,
};

const connectorsByName = {
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.Portis]: portis,
    [ConnectorNames.Torus]: torus,
};

function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
        return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network.";
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect ||
        error instanceof UserRejectedRequestErrorFrame
    ) {
        return "Please authorize this website to access your Ethereum account.";
    } else {
        toast.error(error);
        return "An unknown error occurred. Check the console for more details.";
    }
}

export const WalletModal = () => {
    const { authenticate, isAuthenticated, logout } = useMoralis();
    const context = useWeb3React();
    const navigate = useNavigate();

    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        error,
    } = context;

    const [activatingConnector, setActivatingConnector] = React.useState();
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

    const triedEager = useEagerConnect();

    useInactiveListener(!triedEager || !!activatingConnector);

    const { walletOverlayActive, setWalletOverlayActive } =
        useWalletModalValue();

    const disconnect = async () => {
        try {
            await deactivate();
            window.location.reload();
        } catch (ex) {
            console.log("erros", ex);
        }
    };

    return (
        <div className="WalletModal__toplevel">
            <div className="WalletModal__container">
                <button
                    className="WalletModal__close-button"
                    onClick={() => setWalletOverlayActive(!walletOverlayActive)}
                >
                    <IoCloseOutline size={25} />
                </button>
                <div className="WalletModal__header">
                    <div className="WalletModal__title">Connect Wallet</div>
                </div>
                <hr />
                <div className="WalletModal__buttons-container">
                    <button
                        className="WalletModal__buttons"
                        onClick={() => {
                            authenticate();
                        }}
                    >
                        {
                            <img
                                className="WalletOptionLogos"
                                src={MetaMaskLogo}
                                alt="MetaMask"
                            />
                        }
                        {<span className="WalletOptionText">MetaMask</span>}
                    </button>
                    {Object.keys(connectorsByName).map((name) => {
                        const currentConnector = connectorsByName[name];
                        const activating =
                            currentConnector === activatingConnector;
                        const connected = currentConnector === connector;
                        const disabled =
                            !triedEager ||
                            !!activatingConnector ||
                            connected ||
                            !!error;

                        return (
                            <button
                                className="WalletModal__buttons"
                                disabled={disabled}
                                key={name}
                                onClick={() => {
                                    setActivatingConnector(currentConnector);
                                    activate(connectorsByName[name]);
                                }}
                            >
                                <div className="WalletModal__buttons-active">
                                    {activating}
                                    {connected}
                                </div>
                                {
                                    <img
                                        className="WalletOptionLogos"
                                        src={WalletLogos[name]}
                                        alt={name}
                                    />
                                }
                                {
                                    <span className="WalletOptionText">
                                        {name}
                                    </span>
                                }
                            </button>
                        );
                    })}
                </div>
                <hr />
                {isAuthenticated && (
                    <div className="WalletOptionOps">
                        {(active || error) && (
                            <button
                                className="WalletOptionOpsButton"
                                onClick={() => {
                                    disconnect();
                                    logout();
                                    navigate('/second.exchange');
                                }}
                            >
                                Disconnect
                            </button>
                        )}

                        {!!error &&
                            toast.error("Faliure!" + getErrorMessage(error))}
                    </div>
                )}

                {isAuthenticated && (
                    <div className="WalletOptionOps">
                        {!!(library && account) && (
                            <button
                                className="WalletOptionOpsButton"
                                onClick={() => {
                                    library
                                        .getSigner(account)
                                        .signMessage("Message to be signed?")
                                        .then((signature) => {
                                            toast.success(
                                                `Success!\n\n${signature}`
                                            );
                                        })
                                        .catch((error) => {
                                            toast.error(
                                                "Failure!" +
                                                    (error && error.message
                                                        ? `\n\n${error.message}`
                                                        : "")
                                            );
                                        });
                                }}
                            >
                                Sign Message
                            </button>
                        )}
                        {connector ===
                            connectorsByName[ConnectorNames.WalletConnect] && (
                            <button
                                onClick={() => {
                                    connector.close();
                                }}
                            >
                                Kill WalletConnect Session
                            </button>
                        )}
                        {connector ===
                            connectorsByName[ConnectorNames.Portis] && (
                            <>
                                {chainId !== undefined && (
                                    <button
                                        onClick={() => {
                                            connector.changeNetwork(
                                                chainId === 1 ? 100 : 1
                                            );
                                        }}
                                    >
                                        Switch Networks
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        connector.close();
                                    }}
                                >
                                    Kill Portis Session
                                </button>
                            </>
                        )}
                        {connector ===
                            connectorsByName[ConnectorNames.Torus] && (
                            <button
                                onClick={() => {
                                    connector.close();
                                }}
                            >
                                Kill Torus Session
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
