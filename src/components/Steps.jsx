import {
  TrendingUp,
  ShieldCheck,
  Layers,
} from "lucide-react";

const services = [
  {
    title: "Strategic Wealth Growth",
    description:
      "We design disciplined investment strategies focused on long-term capital appreciation. Every portfolio is built with risk-awareness, diversification, and performance consistency at its core.",
    icon: TrendingUp,
  },
  {
    title: "Capital Protection & Risk Control",
    description:
      "Preserving capital is just as important as growing it. Our structured risk controls, asset allocation models, and ongoing analysis help shield investments from unnecessary volatility.",
    icon: ShieldCheck,
  },
  {
    title: "Diversified Asset Exposure",
    description:
      "Gain access to carefully selected investment opportunities across multiple asset classes. Our approach reduces concentration risk while unlocking sustainable return potential.",
    icon: Layers,
  },
];

export default function Services() {
  return (
    <section className="w-full bg-gradient-to-br from-grad-from to-grad-to py-16 md:py-24">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl  mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-icon">
            How Growvia Works For You
          </h2>
          <p className="mt-4 text-text-muted leading-relaxed">
            Our investment solutions are built to protect capital, generate
            consistent returns, and support long-term financial confidence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-hover bg-card p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-hover transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-text mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Subtle Hover Accent */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-primary/20 transition-all"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
