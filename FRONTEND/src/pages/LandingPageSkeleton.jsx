import SmoothScroll from "../components/SmoothScroll";

const LandingPageSkeleton = ({setSkeleton}) => {
  setTimeout(() => {
    setSkeleton(false)
  }, 500);

  return (
    <>
    <SmoothScroll/>
    <div className="flex flex-col min-h-screen bg-gray-50 animate-pulse">
      {/* Navbar skeleton */}
      <header className="w-full h-16 bg-white shadow flex items-center px-6">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
        <div className="ml-auto flex space-x-4">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
      </header>

      {/* Hero section skeleton */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 py-16">
        <div className="w-3/4 h-10 bg-gray-300 rounded mb-4"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded mb-8"></div>

        {/* UrlShortner placeholder */}
        <div className="w-full max-w-2xl">
          <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="px-6 py-16 bg-white">
        <div className="w-1/3 h-8 bg-gray-300 rounded mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-xl shadow flex flex-col space-y-4"
            >
              <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer skeleton */}
      <footer className="w-full bg-gray-100 p-6 text-center">
        <div className="w-1/4 h-4 bg-gray-300 rounded mx-auto"></div>
      </footer>
    </div>
    </>
  );
};

export default LandingPageSkeleton;
