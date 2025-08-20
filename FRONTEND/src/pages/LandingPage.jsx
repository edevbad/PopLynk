import { Link } from "@tanstack/react-router";
import UrlShortner from "../components/UrlShortner";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import SmoothScroll from "../components/SmoothScroll";


const LandingPage = () => {
 const authSlice = (useSelector((state)=>state.auth));

  return (
    <>    
    <SmoothScroll/>
    <div  data-scroll-container className="flex flex-col bg-gray-50 text-gray-800">
      <NavBar/>

      {/* Hero */}
      <section data-scroll-section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-b from-blue-50 to-white flex-grow">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Shrink your links, <span className="text-blue-600">expand</span> your reach
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Shorten, customize, and track your links with ease. Perfect for
          sharing on social media, email, or anywhere else.
        </p>

        {/* CTA Form (re-using your UrlShortner component) */}
        <div className="mt-10 w-full max-w-2xl">
          <UrlShortner />
        </div>
      </section>

      {/* Features */}
      <section data-scroll-section className="px-6 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why use PopLynk?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">
              Fast & Simple
            </h3>
            <p className="text-gray-600">
              Shorten your links instantly with just one click. No hassle, no fuss.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">
              Custom Slugs
            </h3>
            <p className="text-gray-600">
              Create memorable, branded links by customizing your short URL slug.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-blue-600 mb-2">
              Track Clicks
            </h3>
            <p className="text-gray-600">
              Monitor how many people clicked your links and see what works best.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
    </>

  );
};

export default LandingPage;
