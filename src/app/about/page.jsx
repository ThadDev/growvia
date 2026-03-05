import Image from "next/image";
import Link from "next/link";
import { PieChart, Briefcase, Target } from "lucide-react";
import Services from "@/components/Steps";
import GettingStarted from "@/components/Services";
import TestimonialsPreview from "@/components/Testimonials";
import Footer from "@/components/footer";

const About = () => {
  return (
    <div className="mt-12 bg-gradient-to-br from-grad-from to-grad-to">
      <section
        className="relative min-h-[50vh] flex items-center justify-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('/1096.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl text-center text-white space-y-6">
          <span className="uppercase tracking-widest font-bold text-sm text-hover">
            Top Fiancial Asset management Company
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Everything <span className="text-hover">Finance!</span>
          </h1>

          <p className="text-base md:text-lg text-white/80">
            “Take control of your financial future. Make the switch and invest with confidence.”
          </p>
        </div>
      </section>
      <section className="flex flex-col bg-gradient-to-br from-grad-from to-grad-to md:flex-row items-center justify-between px-8 py-14 gap-12  max-w-7xl mx-auto">
        {/* Image */}
        <aside data-aos="fade-right" className="w-full md:w-5/12 flex justify-center">
          <Image
            src="/section-1.jpg"
            alt="Investment and finance illustration"
            width={500}
            height={400}
            className="border border-icon shadow-sm shadow-icon rounded-md object-cover"
          />
        </aside>

        {/* Text content */}
        <div data-aos="fade-in" className="flex flex-col gap-6 w-full justify-center text-justify items-center md:justify-start md:items-start md:w-7/12">
          <h1 className="text-icon font-bold text-3xl md:text-4xl">
            About Growvia
          </h1>

          <p className="text-text leading-relaxed">
            Over the years, Growvia has supported investors from diverse
            regions across the globe, building a strong presence rooted in
            trust, performance, and transparency. Our operations are led by
            seasoned investment professionals with deep expertise in trading and
            asset management, consistently delivering results through
            disciplined strategies and data-driven decisions.
            <br />
            <br />
            At Growvia, investing is designed to be clear, accessible, and
            efficient. We empower individuals to take control of their financial
            future through flexible, self-managed investment accounts that
            reduce unnecessary costs while maximizing long-term value. Now is
            the time to build a resilient investment portfolio with confidence
            and clarity.
          </p>

          {/* <Link href="/about" className="w-fit">
                  <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition">
                    Want to know more?
                  </button>
                </Link> */}
        </div>
      </section>
      <section className="container bg-gradient-to-br from-grad-from to-grad-to px-4 md:mt-24 mt-16">
        {/* Header */}
        <div className="grid grid-cols-1 pb-8 text-center">
          <h6 data-aos="fade-up" className="text-primary text-sm font-bold uppercase mb-2">
            Who We Are
          </h6>

          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-text">
            Smart investment strategies built for
            <br className=" md:block" />
            consistent performance
          </h3>

          <p className="text-text/70 max-w-xl mx-auto">
            At Growvia, our investment approach is designed to steadily grow
            wealth by outperforming general market movements while managing risk
            responsibly.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-[30px]">
          {/* Feature 1 */}
          <div className="group border-2 border-hover rounded-lg py-2 px-2 text-center">
            <PieChart className="h-10 w-10 mx-auto text-hover group-hover:scale-105 transition" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold group-hover:text-primary text-text transition">
                Client-First Service
              </h4>

              <p className="text-text/70 mt-4">
                Our clients are at the center of everything we do. We prioritize
                transparency, regular communication, and long-term value
                creation, ensuring you always understand how your investments
                are managed.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group border-2 border-hover rounded-lg py-2 px-2 text-center">
            <Briefcase className="h-10 w-10 mx-auto text-hover group-hover:scale-105 transition" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-text group-hover:text-primary transition">
                Proven Expertise
              </h4>

              <p className="text-text/70 mt-4">
                Our leadership and investment decision-makers bring decades of
                combined experience across multiple market cycles, allowing us
                to make informed, data-driven decisions in both stable and
                volatile markets.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group border-2 border-hover rounded-lg py-2 px-2 text-center">
            <Target className="h-10 w-10 mx-auto text-hover group-hover:scale-105 transition" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-text group-hover:text-primary transition">
                Performance-Driven Results
              </h4>

              <p className="text-text/70 mt-4">
                Our strategies focus on efficiency and precision. By minimizing
                unnecessary risk and maximizing opportunity, we aim to deliver
                strong, sustainable returns for our investors over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <GettingStarted />
      <TestimonialsPreview />
      <Footer />
    </div>
  );
};

export default About;
