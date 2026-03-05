import { ShieldCheck, Zap, Headset } from "lucide-react";
import Image from "next/image";

const advantages = [
  {
    title: "Institution-Grade Security",
    description:
      "Your capital and data are protected by layered security systems, encrypted infrastructure, and continuous risk monitoring.",
    icon: ShieldCheck,
  },
  {
    title: "Performance-Driven Infrastructure",
    description:
      "From transaction processing to portfolio updates, every system is optimized for speed, accuracy, and reliability.",
    icon: Zap,
  },
  {
    title: "Dedicated Human Support",
    description:
      "Behind the platform is a real team. Our specialists are available to resolve issues, provide clarity, and support your growth.",
    icon: Headset,
  },
];

export default function InvestmentAdvantages() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-grad-from to-grad-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-text">
            Built to Protect, Perform, and Support
          </h2>
          <p className="mt-4 text-text-muted">
            Growvia combines technology, discipline, and service to deliver
            a secure and reliable investment experience.
          </p>
        </div>

        {/* Content Grid */}
        <div className="md:grid md:grid-cols-1 lg:grid-cols-12 flex flex-col-reverse gap-10 items-center">

          {/* Left: Features */}
          <div className="lg:col-span-6 space-y-6">
            {advantages.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative flex gap-4 rounded-2xl border border-hover bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-hover"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hover/10 text-hover group-hover:bg-hover group-hover:text-white transition-colors">
                    <Icon size={22} />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Subtle Accent */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Image Placeholder */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md aspect-[4/5] rounded-3xl border border-hover bg-card flex items-center justify-center text-text-muted">
              <Image
                src={"/woman-scanning-fingerprint-with-futuristic-interface-smart-technology.jpg"}
                alt="security"
                width={500}
                height={400}
                className="rounded-3xl border border-hover shadow-md shadow-hover"
              ></Image>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
