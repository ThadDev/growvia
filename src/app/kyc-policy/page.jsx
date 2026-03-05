"use client";

import Footer from "@/components/footer";

export default function KYCPolicyPage() {
  return (
    <main className="flex mt-12 flex-col">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[35vh] sm:min-h-[45vh] flex items-center justify-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.9)), url('/woman-scanning-fingerprint-with-futuristic-interface-smart-technology.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl text-center text-white space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">KYC Policy</h1>
          <p className="text-sm sm:text-base text-white/80">
            Our approach to identity verification, compliance, and user security
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-4 sm:px-6 py-14 bg-gradient-to-br from-grad-from to-grad-to">
        <div className="max-w-4xl mx-auto space-y-12 text-text/80">

          <PolicySection title="Introduction">
            <p>
              Growvia is committed to maintaining a secure, transparent, and
              compliant financial ecosystem. This Know Your Customer (KYC)
              Policy outlines the procedures and standards we apply to verify
              the identity of our users, prevent fraud, and comply with
              applicable regulatory requirements.
            </p>
          </PolicySection>

          <PolicySection title="Purpose of KYC">
            <p>
              The KYC process is designed to protect Growvia, its users, and
              the broader financial system from fraud, money laundering,
              terrorist financing, and other illicit activities. It ensures
              that our platform operates responsibly and in line with
              regulatory expectations.
            </p>
          </PolicySection>

          <PolicySection title="Information Collected">
            <ul className="list-disc pl-5 space-y-2">
              <li>Full legal name, date of birth, and nationality</li>
              <li>Government-issued identification documents</li>
              <li>Proof of address or residency where required</li>
              <li>Biometric or verification data for identity confirmation</li>
            </ul>
          </PolicySection>

          <PolicySection title="Verification Process">
            <p>
              Users may be required to submit identification documents and
              supporting information during onboarding or when accessing
              specific services. Verification may be conducted internally or
              through trusted third-party providers that meet security and
              compliance standards.
            </p>
          </PolicySection>

          <PolicySection title="Ongoing Monitoring">
            <p>
              Growvia reserves the right to conduct ongoing monitoring and
              periodic reviews of user accounts to ensure continued compliance
              with KYC and anti-money laundering obligations. Additional
              information may be requested where necessary.
            </p>
          </PolicySection>

          <PolicySection title="Data Protection and Security">
            <p>
              All KYC information is handled in accordance with our Privacy
              Policy. We apply industry-standard technical and organizational
              measures to protect personal data against unauthorized access,
              loss, or misuse.
            </p>
          </PolicySection>

          <PolicySection title="Failure to Comply">
            <p>
              Failure to provide accurate or complete information may result in
              delayed verification, restricted access to services, or
              suspension of an account in accordance with our Terms of Service
              and applicable laws.
            </p>
          </PolicySection>

          <PolicySection title="Policy Updates">
            <p>
              This KYC Policy may be updated periodically to reflect changes in
              regulatory requirements, industry standards, or internal
              procedures. Updates become effective upon publication on this
              page.
            </p>
          </PolicySection>

          <PolicySection title="Contact Information">
            <p>
              For questions regarding this KYC Policy or verification process,
              users may contact Growvia through official support channels.
            </p>
          </PolicySection>

          <p className="text-xs text-text/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>

        </div>
      </section>
      <Footer/>

    </main>
  );
}

function PolicySection({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-text">{title}</h2>
      <div className="space-y-3 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}
