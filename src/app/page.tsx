import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/sections/Hero";
import AboutUs from "../../components/sections/AboutUs";
import Services from "../../components/sections/Services";
import StatsCounter from "../../components/sections/StatsCounter";
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import VideoBanner from "../../components/sections/VideoBanner";
import Testimonials from "../../components/sections/Testimonials";
import BlogSection from "../../components/sections/BlogSection";
import Footer from "../../components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FBFDFA] overflow-x-hidden">
      {/* Global Background Visual Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Corporate Grid Dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#00A859_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035]" />
        
        {/* Soft Radial Ambient Lights */}
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00A859]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[55%] left-[-10%] w-[550px] h-[550px] bg-[#0A1A2F]/5 rounded-full blur-[130px]" />
        <div className="absolute top-[80%] right-[5%] w-[500px] h-[500px] bg-[#00A859]/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10"></div>
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
      <StatsCounter />
      <WhyChooseUs />
      <VideoBanner />
      <Testimonials />
      <BlogSection />
      <Footer />
    </main>
  );
}