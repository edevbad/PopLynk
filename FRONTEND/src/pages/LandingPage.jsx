import UrlShortner from "../components/UrlShortner";
import { useDispatch, useSelector } from "react-redux";
import SmoothScroll from "../components/SmoothScroll";
import { useEffect, useState } from "react";
import LandingPageSkeleton from "./LandingPageSkeleton";
import LoadingPage from "./LoadingPage";
import axios from "axios";
import { authenticate, checkAuth } from "../store/auth/auth.slice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const [skeleton, setSkeleton] = useState(true);


  const {isLoading} = useSelector(state => state.auth)
  
  if(isLoading) return <LandingPageSkeleton setSkeleton={setSkeleton}/>


  return (
    <>
      <SmoothScroll />
      <div
        data-scroll-container
        className="flex flex-col bg-gray-50 text-gray-800"
      >

        {/* Hero */}
        <section
          data-scroll-section
          className="relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-indigo-50 via-white to-white flex-grow"
        >
          <h1 className="text-5xl  font-extrabold text-gray-900 leading-tight max-w-4xl tracking-tight">
            Shrink your links,
              expand
            your reach
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Shorten, customize, and track your links effortlessly. Perfect for
            social media, email, and anywhere you share content.
          </p>

          {/* CTA Form */}
          <div className="mt-12 w-full max-w-2xl">
            <UrlShortner />
          </div>
        </section>

        {/* Features */}
        <section
          data-scroll-section
          className="px-6 py-20 bg-gradient-to-b from-white to-indigo-50"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
            Why choose <span className="text-indigo-600">PopLynk?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-indigo-600 text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Fast & Simple
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Shorten your links instantly with just one click. No hassle, no
                fuss.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-indigo-600 text-3xl mb-4">🔗</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Custom Slugs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create branded, memorable links by customizing your short URL.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-indigo-600 text-3xl mb-4">📊</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Track Clicks
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor clicks in real time and discover what works best for
                your audience.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default LandingPage;
