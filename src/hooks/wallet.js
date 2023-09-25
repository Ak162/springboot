import React from "react";
import { WalletContext } from "util/wallet";

export default function useWallet() {
  const context = React.useContext(WalletContext);

  if (context === undefined) {
    throw new Error(
      "useWallet hook must be used with a WalletProvider component"
    );
  }

  return context;
}
