import Image from "next/image"
import Navbar from "../components/Navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <Navbar />
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <section className="text-center mb-20">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
              Welcome to Penfluence
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Transform your handwritten notes into digital with ease and precision.
            </p>
            <Image
              src="/handwritten.png"
              alt="Handwritten Notes"
              className="mx-auto mb-4 object-contain" // object-contain ensures the image fits without distorting
              width={400}
              height={400}
            />
            <a
              href="/upload"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              Get Started
            </a>
          </section>

          {/* Created By Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet the minds behind</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    {/* <Image
                      src={`https://picsum.photos/seed/${index}/128/128`}
                      alt={`Team member ${index}`}
                      width={128}
                      height={128}
                      className="object-cover"
                    /> */}
                  </div>
                  <p className="text-lg font-medium text-gray-800">Team Member {index}</p>
                  <p className="text-sm text-gray-600">Frontend</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {/* Decorative Elements */}
      {/* <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div> */}
    </div>
  )
}

