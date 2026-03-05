"use client";

import { useEffect, useState } from "react";
import {
  UploadCloud,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useToast } from "@/context/toastContext";
import LoadingModal from "@/components/loadingModal";
import StatusModal from "@/components/statusModal";

/* ================= INPUTS ================= */

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-muted">{label}</label>
    <input
      {...props}
      required
      className="border rounded-lg px-4 py-2 bg-transparent"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-muted">{label}</label>
    <select
      {...props}
      required
      className="border rounded-lg px-4 py-2 bg-transparent"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  </div>
);

/* ================= FILE UPLOAD WITH PREVIEW ================= */

const FileUpload = ({ label, name, onChange }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    onChange(e);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-muted">{label}</label>

      <label className="flex flex-col items-center gap-3 px-4 py-6 border border-dashed rounded-lg cursor-pointer">
        <UploadCloud size={20} />

        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full max-h-40 object-contain rounded"
          />
        ) : (
          <span className="text-sm">Upload image</span>
        )}

        <input
          type="file"
          required
          accept="image/*"
          hidden
          name={name}
          onChange={handleFile}
        />
      </label>
    </div>
  );
};

/* ================= LOCKED STATES ================= */

const KycLocked = ({ icon, title, subtitle, success }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-br from-grad-from to-grad-to">
    <div className="bg-card p-8 rounded-2xl shadow-xl text-center space-y-4">
      <div
        className={`mx-auto w-fit p-4 rounded-xl ${
          success ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {icon}
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted">{subtitle}</p>
    </div>
  </div>
);

/* ================= HEADER ================= */

const KycHeader = ({ status, rejectionReasons }) => (
  <div>
    <h1 className="text-2xl font-bold flex items-center gap-2">
      {status === "rejected" ? (
        <>
          <XCircle className="text-red-500" />
          KYC Application Rejected
        </>
      ) : (
        <>
          <ShieldCheck className="text-primary" />
          Verify Your KYC Securely
        </>
      )}
    </h1>

    <p className="text-sm text-muted mt-1">
      {rejectionReasons || "Please submit your documents"}
    </p>
  </div>
);

/* ================= CONSTANTS ================= */

const KYC_URL = `/api/users/kyc`;
const RESUBMIT_URL = `/api/users/kyc/resubmit`;

const MARITAL_OPTIONS = [
  "single",
  "married",
  "divorced",
  "widowed",
  "separated",
];

const ID_TYPES = [
  "passport",
  "national_id",
  "drivers_license",
];

/* ================= PAGE ================= */

export default function KycPage() {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [rejectionReasons, setRejectionReasons] = useState(null);

  const [modal, setModal] = useState({
    open: false,
    type: "pending",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    maritalStatus: "",
    dob: "",
    idType: "",
    idNumber: "",
    idFront: null,
    idBack: null,
  });

  /* ================= INIT ================= */

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(KYC_URL, { credentials: "include" });
        if (!res.ok) return;

        const { data } = await res.json();
        setStatus(data?.status);
        setRejectionReasons(data?.rejectionReasons);
      } catch {
        showToast("Failed to load KYC", "error");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    for (const value of Object.values(formData)) {
      if (!value) {
        showToast("All fields required", "info");
        return false;
      }
    }
    return true;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));

    try {
      const res = await fetch(status === "rejected" ? RESUBMIT_URL : KYC_URL, {
        method: status === "failed" ? "PATCH" : "POST",
        credentials: "include",
        body: payload,
      });

      if (!res.ok) throw new Error();

      setStatus("pending");

      setModal({
        open: true,
        type: "success",
        title: "Submitted",
        message: "Your KYC is under review",
      });
    } catch {
      setModal({
        open: true,
        type: "error",
        title: "Error",
        message: "Submission failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI STATES ================= */

  if (loading) return <LoadingModal open message="Checking status..." />;

  if (status === "pending")
    return <KycLocked icon={<Clock />} title="Under Review" subtitle="" />;

  if (status === "approved")
    return (
      <KycLocked
        icon={<CheckCircle />}
        title="Verified"
        subtitle=""
        success
      />
    );

  /* ================= FORM ================= */

  return (
    <div className="h-full p-6">
      <StatusModal
        {...modal}
        onClose={() => setModal({ ...modal, open: false })}
      />

      <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-xl p-8 space-y-8">
        <KycHeader status={status} rejectionReasons={rejectionReasons} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Full Name" name="fullName" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Address" name="address" onChange={handleChange} />

          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Marital Status"
              name="maritalStatus"
              options={MARITAL_OPTIONS}
              onChange={handleChange}
            />
            <Input type="date" label="DOB" name="dob" onChange={handleChange} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="ID Type"
              name="idType"
              options={ID_TYPES}
              onChange={handleChange}
            />
            <Input label="ID Number" name="idNumber" onChange={handleChange} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FileUpload label="ID Front" name="idFront" onChange={handleChange} />
            <FileUpload label="ID Back" name="idBack" onChange={handleChange} />
          </div>

          <button
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold"
          >
          {submitting? "submitting...": " Submit KYC"}
          </button>
        </form>
      </div>
    </div>
  );
}
