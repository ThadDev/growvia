import Image from "next/image";
import { Icon } from "@iconify/react";
import { PieChart, Briefcase, Target } from "lucide-react";
import Link from "next/link";
import Services from "@/components/Steps";
import GettingStarted from "@/components/Services";
import TestimonialsPreview from "@/components/Testimonials";
import InvestmentAdvantages from "@/components/Advantage";
import MarketSection from "@/components/tradingViewSection";
import Footer from "@/components/footer";
import CSPPPreviewSection from "@/components/cspp-section";
import LanguageSwitcher from "@/components/LanguageSwitcher";
export default function Home() {
  return (
    <div className="flex flex-col  bg-gradient-to-br from-grad-from to-grad-to font-sans ">

      {/* <section className="flex-col flex md:flex-row justify-between py-4 px-8 items-center">
        <div className="flex flex-col gap-5 justify-start text-text">
          <h1 className="text-hover text-4xl font-bold">Growvia – Your Trusted Investment Partner</h1>
          <p>Smart, personalized investment strategies designed to help you achieve your financial goals.</p>
          <button className="px-4 py-2 rounded-md bg-hover w-fit">join now</button>
        </div>
        <div>
          <img src="hero.png" alt="" className="w-full h-[80vh]" />
        </div>
      </section> */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-center mt-5 px-6 gap-12  md:px-16 py-16 md:py-24 min-h-screen bg-gradient-to-br from-grad-from to-grad-to overflow-hidden">
        <LanguageSwitcher />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none" />

        {/* Text Content */}
        <div className="flex z-10 flex-col gap-6 max-w-xl text-center md:text-left text-text">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg drop-shadow-dark leading-tight text-primary tracking-tight">
            Elevate Your Capital with Growvia
          </h1>

          <p className="text-base md:text-xl text-text/90 leading-relaxed">
            Experience intelligent, high-conviction investment solutions engineered to preserve assets and accelerate long-term systemic growth.
          </p>

          <div className="flex justify-center z-10  md:justify-start">
            <Link href={"/register"}>
              <button className="mt-4 px-10 py-3 shadow-lg shadow-primary/30 bg-primary text-white font-semibold rounded-full hover:bg-hover hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                Unlock Access
              </button></Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 z-10  border-bottom shadow-md shadow-icon border-icon flex justify-center md:justify-end">
          {/* <img
            src="hero.webp"
            alt="Investment illustration"
            className="w-full max-w-md md:max-w-xl h-auto object-contain drop-shadow-2xl"
          /> */}
          <Image
            src={"/hero.png"}
            alt="Growvia"
            width={500}
            height={400}
            loading="eager"
            className="w-full max-w-md md:max-w-xl h-auto object-contain drop-shadow-2xl"
          ></Image>
        </div>
      </section>
      <section>
        <div
          className="
    flex items-center gap-8
    overflow-x-auto md:overflow-x-visible
    whitespace-nowrap
    py-5 px-6
    bg-gradient-to-r from-surface via-card to-surface
    border-y border-border-color shadow-sm
    scrollbar-hide
    md:justify-center
  "
        >
          <Icon icon="mdi:paypal" className="text-5xl shrink-0 text-primary" />
          <Icon
            icon="ri:visa-line"
            className="text-5xl shrink-0 text-primary"
          />
          <Icon icon="mdi:bitcoin" className="text-5xl shrink-0 text-primary" />
          <Icon
            icon="arcticons:skrill"
            className="text-5xl shrink-0 text-primary"
          />
          <Icon
            icon="mdi:ethereum"
            className="text-5xl shrink-0 text-primary"
          />
          <Icon
            icon="simple-icons:verve"
            className="text-5xl shrink-0 text-primary"
          />
          <Icon
            icon="mingcute:xrp-fill"
            className="text-5xl shrink-0 text-primary"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-14 gap-12 max-w-7xl mx-auto">
        {/* Image */}
        <aside data-aos="fade-right" className="w-full md:w-5/12 flex justify-center">
          <Image
            src="/hero.jpg"
            alt="Investment and finance illustration"
            width={500}
            height={400}
            className="border border-icon shadow-sm shadow-icon object-cover"
          />
        </aside>

        {/* Text content */}
        <div data-aos="fade-in" className="flex flex-col gap-6 w-full justify-center text-justify items-center md:justify-start md:text-left md:items-start md:w-7/12">
          <h1 className="text-primary font-bold text-3xl md:text-4xl">
            A New Standard for Asset Management
          </h1>

          <p className="text-text leading-relaxed">
            For years, Growvia has been a pillar of financial stability, empowering investors across a multitude of jurisdictions with an unwavering commitment to data-driven precision and operational transparency. Our ecosystem is guided by seasoned market strategists who leverage deep analytics and proprietary insights to construct resilient portfolios deliberately optimized for sustained success in dynamic markets.
            <br />
            <br />
            We believe that sophisticated investing should be seamless and commanding. Our institutional-grade platform grants you total oversight of your capital through agile, self-directed instruments designed to minimize friction while amplifying structural yield. It is the definitive environment to compound wealth securely and definitively.
          </p>

          <Link href="/about" className="w-fit">
            <button className="px-6 py-3 rounded-lg bg-surface border border-border-color text-text font-medium hover:bg-hover hover:text-white shadow-sm transition-all duration-300">
              Discover the Platform
            </button>
          </Link>
        </div>
      </section>
      <section className="container px-4 md:mt-24 mt-16">
        {/* Header */}
        <div className="grid grid-cols-1 pb-8 text-center">
          <h6 data-aos="fade-up" className="text-primary text-sm font-bold uppercase mb-2">
            Who We Are
          </h6>

          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-text tracking-tight">
            Engineered for Precision and
            <br className=" md:block" />
            Institutional Performance
          </h3>

          <p className="text-text/70 max-w-xl mx-auto">
            Our framework systematically isolates upside momentum while strictly mitigating downside variance, delivering a definitive edge over standard market allocations.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 grid-cols-1 mt-12 gap-[30px]">
          {/* Feature 1 */}
          <div className="group border border-border-color bg-card shadow-sm rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <PieChart className="h-10 w-10 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold group-hover:text-primary text-text transition">
                Radical Transparency
              </h4>

              <p className="text-text/70 mt-4 leading-relaxed">
                Your portfolio should never be a black box. We provide comprehensive ledger visibility and real-time performance metrics so you retain absolute clarity over your capital deployment.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group border border-border-color bg-card shadow-sm rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <Briefcase className="h-10 w-10 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-text group-hover:text-primary transition">
                Elite Strategy Execution
              </h4>

              <p className="text-text/70 mt-4 leading-relaxed">
                Guided by seasoned analysts, our allocation models traverse complex market cycles securely, leveraging institutional-grade forecasting to pivot effectively when standard models fail.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group border border-border-color bg-card shadow-sm rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
            <Target className="h-10 w-10 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-text group-hover:text-primary transition">
                Asymmetric Risk Control
              </h4>

              <p className="text-text/70 mt-4 leading-relaxed">
                We mathematically optimize yield generation while anchoring deeply to capital preservation protocols, generating strong structural compounding with drastically reduced exposure.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <GettingStarted />
      <section>
        <div className="bg-primary py-[6em] gap-8 md:justify-between justify-center items-center px-4 md:px-[6em] flex flex-col md:flex-row relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight z-10 text-center md:text-left drop-shadow-sm">A Catalyst for Generational Wealth</h1>
          <Link href={"/register"} className="z-10">
            <button className="px-8 py-4 rounded-xl shadow-lg border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary font-bold transition-all duration-300">
              Launch Portfolio
            </button>
          </Link>
        </div>
      </section>
      <CSPPPreviewSection />
      <TestimonialsPreview />
      <InvestmentAdvantages />
      <MarketSection />
      <Footer />
    </div>
  );
}
