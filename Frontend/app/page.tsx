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
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                <Image src="/team/Sadia Zalmay.png" alt="Sadia" width={128} height={128} className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Sadia Zalmay</h3>
              <p className="text-lg text-gray-600">Frontend Engineer</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                <Image src="/team/Fardin Ahmed.png" alt="Fardin" width={128} height={128} className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Fardin Ahmed</h3>
              <p className="text-lg text-gray-600">Backend Engineer</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                <Image src="/team/Nibish Tamrakar.jpg" alt="Nibish" width={128} height={128} className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Nibish Tamrakar</h3>
              <p className="text-lg text-gray-600"> AI/ML Engineer</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                <Image src="/team/Fu Jun Pan.png" alt="Member 3" width={128} height={128} className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Fu Jun Pan</h3>
              <p className="text-lg text-gray-600">Frontend Engineer</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
  )
}

