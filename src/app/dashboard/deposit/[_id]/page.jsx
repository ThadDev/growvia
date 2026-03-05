
"use client";
import { useToast } from "@/context/toastContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { CRYPTOS } from "@/lib/cryptoConfig";
import LoadingModal from "@/components/LoadingModal-2";
import { Icon } from "@iconify/react";

export default function PaymentPage() {
  const { _id } = useParams(); // <- matches folder name
  const [data, setData] = useState(null);
  const [config, setConfig] = useState({});
  const [loadingText, setLoadingText] = useState("Loading payment details...");
  const [copied, setCopied] = useState(false);
  const [proofFileName, setProofFileName] = useState("");
  const [proofPreview, setProofPreview] = useState(null);
const [loading, setLoading] = useState(false);

  const {showToast} = useToast();

   async function submitDepositProof({
  e,
  crypto,
  showToast,
  setLoading,
}) {
  e.preventDefault();
  setLoading(true);

  try {
    const form = e.target;
    const amount = form.amount.value;
    const proof = form.proof.files[0];

    if (!amount || !proof) {
      showToast({
        message: "Amount and proof image are required",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("crypto", crypto);
    formData.append("amount", amount);
    formData.append("proofOfPayment", proof);

    const res = await fetch(`/api/deposits`, {
      method: "POST",
      credentials:"include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to submit deposit");
    }

    showToast({
      message: "Deposit proof submitted successfully, checkemail for more details",
      type: "success",
    });

    form.reset();
  } catch (err) {
    showToast({
      message: err.message || "Something went wrong",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
}

// end
  

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoadingText("Loading payment details...");
        const res = await fetch(
          `/api/deposits/deposit-address?crypto=${_id}`,{
             method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await res.json();

        if (!mounted) return;

        setData(json.data);

        // Match logo/config from CRYPTOS using crypto symbol
        const cryptoConfig = CRYPTOS.find(
          (c) => c.symbol.toLowerCase() === (json.data.crypto || "").toLowerCase()
        );
        setConfig(cryptoConfig || {});
        setLoadingText("Generating QR code...");
      } catch (err) {
        console.log(err.message)
        console.error("Error loading payment details:", err);
        setLoadingText("Failed to load payment details");
      }
    }

    load();
    return () => (mounted = false);
  }, [_id]);

  if (!data) return <LoadingModal text={loadingText} />;

  const qrValue = config.scheme ? `${config.scheme}${data.address}` : data.address;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl  px-2 mx-auto">
      {/* Info */}
      <div className="flex items-start gap-3 rounded-xl border border-yellow-400/50 bg-yellow-600/90 p-4">
        <Icon icon="ph:info-fill" className="text-yellow-300 text-xl" />
        <p className="text-sm text-white">
          Send exactly the selected crypto on the correct network.
        </p>
      </div>

      {/* QR Card */}
      <div className="rounded-2xl border shadow-lg border-white/10 bg-card p-6 text-center space-y-4">
        <Icon icon={config.icon || "cryptocurrency:usdt"} className="mx-auto text-4xl mb-2" />
        <h2 className="text-lg font-semibold">{config.label || data.crypto} Deposit</h2>
        <p className="text-xs text-muted">Network: {data.network}</p>

        <div className="inline-block rounded-xl bg-white p-3">
          <QRCodeCanvas value={qrValue} size={200} level="H" />
        </div>

        {/* Copiable address bar */}
        <p className="text-text text-sm">pay only {data.crypto} to this address</p>
        <div className="mt-4 flex items-center justify-between rounded-lg text-text border border-border-color bg-surface px-3 py-2">
          <p className="text-xs break-all text-text">{data.address}</p>
          <button
            onClick={handleCopy}
            className="ml-2 text-text hover:text-primary transition"
            title="Copy Address"
          >
            <Icon icon={copied ? "mdi:check" : "mdi:content-copy"} width={20} />
          </button>
        </div>
        {copied && <p className="text-xs text-green-400 mt-1">Copied!</p>}
      </div>

      {/* Proof Form */}
     <form
  onSubmit={(e) =>
    submitDepositProof({
      e,
      showToast,
      setLoading,
      crypto: config.symbol || data.crypto,
    })
  }
  className="rounded-2xl border border-white/10 bg-card p-6 space-y-4"
>
  <input type="hidden" name="crypto" value={config.symbol || data.crypto} />

  <input
    type="number"
    name="amount"
    placeholder="Amount sent"
    className="w-full rounded-lg bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-text border border-border-color"
    required
  />

  {/* File Upload */}
  <label className="w-full cursor-pointer rounded-lg bg-surface px-4 py-3 flex items-center justify-between text-sm text-text border border-border-color hover:bg-black/50 transition">
    {proofFileName || "Upload Proof of Payment"}
    <Icon icon="mdi:upload" width={20} />
    <input
      type="file"
      name="proof"
      accept="image/*"
      required
      className="hidden"
      onChange={(e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          setProofFileName(file.name);
          setProofPreview(URL.createObjectURL(file));
        }
      }}
    />
  </label>

  {/* Image Preview */}
  {proofPreview && (
    <div className="w-full overflow-hidden rounded-xl border border-border-color">
      <img
        src={proofPreview}
        alt="Payment proof preview"
        className="w-full max-h-64 object-cover"
      />
    </div>
  )}

  <button
    disabled={loading}
    className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white hover:bg-primary/90 transition disabled:opacity-50"
  >
    {loading ? "Submitting..." : "Submit Proof of Payment"}
  </button>
</form>

    </div>
  );
}
