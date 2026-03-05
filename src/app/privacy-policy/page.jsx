"use client";

import Footer from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex mt-12 flex-col">

      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[35vh] sm:min-h-[45vh] flex items-center justify-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.9)), url('/abstract-neon-light-waves-wonder-wheel.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl text-center text-white space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm sm:text-base text-white/80">
            How Growvia collects, uses, and protects your information
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-4 sm:px-6 py-14 bg-gradient-to-br from-grad-via to-grad-to">
        <div className="max-w-4xl mx-auto space-y-12 text-text/80">

          <PolicySection title="Introduction">
            <p>
              Growvia (“we”, “our”, or “us”) is committed to protecting your
              privacy and handling your personal information in a transparent
              and secure manner. This Privacy Policy explains how we collect,
              use, disclose, and safeguard information when you use our
              platform, services, and website.
            </p>
          </PolicySection>

          <PolicySection title="Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal identification information such as name, email address, and contact details</li>
              <li>Verification information collected for KYC and regulatory compliance</li>
              <li>Financial and transactional data related to your investments</li>
              <li>Technical data such as IP address, device information, and usage patterns</li>
            </ul>
          </PolicySection>

          <PolicySection title="How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, operate, and maintain our services</li>
              <li>To comply with legal, regulatory, and compliance obligations</li>
              <li>To verify identity and prevent fraud or unauthorized activity</li>
              <li>To improve platform performance, security, and user experience</li>
            </ul>
          </PolicySection>

          <PolicySection title="Information Sharing">
            <p>
              We do not sell your personal data. Information may be shared only
              with trusted service providers, regulatory authorities, or legal
              entities where required by law, compliance obligations, or to
              protect the rights and security of Growvia and its users.
            </p>
          </PolicySection>

          <PolicySection title="Data Security">
            <p>
              We implement industry-standard security measures to protect your
              information against unauthorized access, alteration, disclosure,
              or destruction. While we strive to use commercially acceptable
              means to protect personal data, no method of transmission over
              the internet is completely secure.
            </p>
          </PolicySection>

          <PolicySection title="Your Rights">
            <p>
              Depending on applicable laws, you may have the right to access,
              correct, update, or request deletion of your personal information.
              Requests may be subject to regulatory and legal requirements.
            </p>
          </PolicySection>

          <PolicySection title="Cookies and Tracking">
            <p>
              Growvia may use cookies and similar technologies to enhance
              platform functionality, analyze usage, and improve services. You
              can manage cookie preferences through your browser settings.
            </p>
          </PolicySection>

          <PolicySection title="Policy Updates">
            <p>
              We may update this Privacy Policy periodically to reflect changes
              in legal requirements or business practices. Updates will be
              effective upon posting on this page.
            </p>
          </PolicySection>

          <PolicySection title="Contact Us">
            <p>
              If you have questions or concerns regarding this Privacy Policy or
              our data practices, please contact Growvia through our official
              communication channels.
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
