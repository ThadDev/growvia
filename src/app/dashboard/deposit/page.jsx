"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { CRYPTOS } from "@/lib/cryptoConfig";
import LoadingModal from "@/components/LoadingModal-2";

export default function DepositPage() {
  const router = useRouter();
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchAddresses() {
      try {
        const res = await fetch(
          `/api/deposits/deposit-addresses`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const json = await res.json();


        if (mounted) {
          setCryptoData(json.data || []);
          setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
        console.error("Failed to fetch crypto addresses:", err);
        setLoading(false);
      }
    }

    fetchAddresses();
    return () => (mounted = false);
  }, []);

  if (loading) return <LoadingModal text="Loading deposit addresses..." />;

  return (
    <div className="space-y-6  px-3 max-w-5xl mx-auto">
      <h1 className="text-center font-bold text-text text-2xl">
        Deposit Addresses
      </h1>

      {/* Warning */}
      <div className="flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <Icon
          icon="ph:warning-circle-fill"
          className="text-primary text-2xl"
        />
        <p className="text-sm text-text">
          Only send supported assets to the addresses below. Sending unsupported
          assets may result in permanent loss.
        </p>
      </div>

      <h2 className="text-icon text-sm font-bold">Select network</h2>

      {/* Crypto Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cryptoData.map((item) => {
          // Find the matching logo/config from CRYPTOS
          const config = CRYPTOS.find((c) => c.symbol === item.crypto) || {};

          return (
            <button
              key={item._id}
              onClick={() => router.push(`/dashboard/deposit/${item.crypto}`)}
              className="group rounded-2xl border border-border-color bg-card p-6 text-left hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Icon
                  icon={config.icon || "cryptocurrency:usdt"}
                  className="text-3xl"
                />
                <div>
                  <h3 className="font-semibold text-text">
                    {config.label || item.crypto}
                  </h3>
                  <p className="text-xs text-muted">Network: {item.network}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-primary group-hover:underline">
                Deposit {config.symbol || item.crypto} →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
