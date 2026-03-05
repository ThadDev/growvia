export default function Footer() {
  return (
    <footer className="footer-lock bg-background border-t border-border-color px-6 py-14">
      <div className="max-w-7xl mx-auto space-y-12 footer-lock">

        {/* ================= TOP ================= */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Growvia" className="w-8 h-8" />
              <h2 className="font-bold text-lg text-white">Growvia</h2>
            </div>

            <p className="text-sm text-white leading-relaxed max-w-xs">
              A modern financial platform built for long-term investors,
              strategic partners, and disciplined capital growth.
            </p>
          </div>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink label="About" href="/about" />
            <FooterLink label="Programmes" href="/celebrity-programme" />
            <FooterLink label="KYC" href="/kyc-policy" />
          </FooterColumn>

          {/* Investments */}
          <FooterColumn title="Investments">
            <FooterLink label="Crypto" href="/investment/crypto" />
            <FooterLink label="Real Estate" href="/investment/real-estate" />
            <FooterLink label="Trust Bonds" href="/investment/trust-bonds" />
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title="Legal">
            <FooterLink label="Terms of Service" href="/terms-of-service" />
            <FooterLink label="Privacy Policy" href="/privacy-policy" />
          </FooterColumn>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="pt-8 border-t border-border-color flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
          <p className="text-xs text-white">
            © {new Date().getFullYear()} Growvia. All rights reserved.
          </p>

          {/* <p className="text-xs text-hover text-center sm:text-right max-w-md">
            Investments involve risk. Past performance does not guarantee
            future results. Please invest responsibly.
          </p> */}
        </div>

      </div>
    </footer>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function FooterColumn({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
        {title}
      </h3>
      <ul className="space-y-3">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ label, href }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-white hover:text-primary transition-colors"
      >
        {label}
      </a>
    </li>
  );
}
