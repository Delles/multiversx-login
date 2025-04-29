import React from "react";
import { CenterLayout } from "../../components/CenterLayout";
import {
    type ExtensionLoginButtonPropsType,
    ExtensionLoginButton,
    type WebWalletLoginButtonPropsType,
    CrossWindowLoginButton,
    type LedgerLoginButtonPropsType,
    LedgerLoginButton,
    type WalletConnectLoginButtonPropsType,
    WalletConnectLoginButton,
} from "@multiversx/sdk-dapp/UI";
import { routeNames } from "../../routes";
import { useNavigate } from "react-router-dom";

type CommonPropsType =
    | ExtensionLoginButtonPropsType
    | WebWalletLoginButtonPropsType
    | LedgerLoginButtonPropsType
    | WalletConnectLoginButtonPropsType;

export default function Unlock() {
    const navigate = useNavigate();
    const commonProps: CommonPropsType = {
        callbackRoute: routeNames.dashboard,
        nativeAuth: true,
        onLoginRedirect: () => {
            navigate(`/${routeNames.dashboard}`);
        },
    };
    return (
        <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl">Login</h2>
            <p className="text-center text-gray-400">
                Choose your preferred login method
            </p>
            <div className="flex flex-col md:flex-row">
                <WalletConnectLoginButton
                    loginButtonText="xPortal"
                    {...commonProps}
                />
                <LedgerLoginButton loginButtonText="Ledger" {...commonProps} />
                <ExtensionLoginButton
                    loginButtonText="Extension"
                    {...commonProps}
                />
                <CrossWindowLoginButton
                    loginButtonText="Web Wallet"
                    {...commonProps}
                />
            </div>
        </div>
    );
}
