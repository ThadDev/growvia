import { UserPlus, ShieldCheck, Wallet, LineChart } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    title: "Create Your Account",
    description:
      "Sign up in minutes with your basic details. Once registered, confirm your email to activate your Growvia account.",
    icon: UserPlus,
    step: "01",
  },
  {
    title: "Complete Identity Verification",
    description:
      "Verify your identity through our secure KYC process. This helps protect your account and ensures compliance with financial regulations.",
    icon: ShieldCheck,
    step: "02",
  },
  {
    title: "Fund Your Wallet",
    description:
      "Add funds securely using supported digital assets. Deposits are processed efficiently to get you investment-ready.",
    icon: Wallet,
    step: "03",
  },
  {
    title: "Activate an Investment Plan",
    description:
      "Select a plan aligned with your financial goals and risk tolerance. Once activated, your capital begins working for you.",
    icon: LineChart,
    step: "04",
  },
];

export default function GettingStarted() {
  return (
    <section className="w-full bg-gradient-to-br from-grad-from to-grad-to py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-icon">
            Get Started in Four Simple Steps
          </h2>
          <p className="mt-4 text-text-muted">
            A clear, secure onboarding process designed to get you investing
            with confidence.
          </p>
        </div>

        {/* Content Grid */}
        <div className="md:grid grid-cols-1 flex flex-col-reverse  lg:grid-cols-12 gap-10 items-center">
          {/* Steps */}
          <div className="lg:col-span-6 space-y-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative flex gap-5 rounded-2xl border border-hover bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
                >
                  {/* Step Number (background accent) */}
                  <div className="absolute right-4 top-4 text-6xl font-bold text-hover/5 group-hover:text-primary/10 transition-colors">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-hover group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image / Widget Placeholder */}
          <div className="lg:col-span-6 ">
            <div className="relative h-full md:h-full w-full rounded-2xl border border-hover shadow-md shadow-hover bg-surface flex items-center justify-center overflow-hidden">
              {/* Replace this div with <Image /> or <img /> */}
              <span className="text-sm text-text-muted">
                <Image
                  src={"/digital-tablet-screen-smart-tech.jpg"}
                  width={600}
                  height={400}
                  alt="steps to set up Growvia acc"
                ></Image>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
