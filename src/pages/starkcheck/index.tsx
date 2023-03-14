import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import {
  connectWallet,
  getPolicies,
  walletAddress,
} from "@/services/starkcheck.service";

export default function Home() {
  const [isConnected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | undefined>("");

  let chain: string = "1234567890";

  async function handleConnectClick(s: string) {
    const wallet = await connectWallet();
    setConnected(!!wallet?.isConnected);
    const addr = await walletAddress();
    setAddress(addr);
    const policies = await getPolicies();
    console.log(policies);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fresh Test Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isConnected ? (
          <>
            <h3 style={{ margin: 0 }}>
              Wallet address: <code>{address}</code>
            </h3>
            <h3 style={{ margin: 0 }}>
              Url: <code>{chain}</code>
            </h3>
          </>
        ) : (
          <>
            <button
              className={styles.connect}
              onClick={() => handleConnectClick("connect WebWallet")}
            >
              Connect Fresh Wallet
            </button>
            <p>First connect wallet to use dapp.</p>
          </>
        )}
      </main>
    </div>
  );
}
