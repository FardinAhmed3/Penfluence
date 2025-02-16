"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between w-full">
            <div className="flex items-center mt-5"> {/* Added margin-top to lower the logo */}
            <Link href="/">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={200}
                height={200}
                className="cursor-pointer" // Adds a pointer cursor on hover
              />
              </Link>
            </div>

            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {/* <Link
                href="/"
                className="text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Home
              </Link> */}
              <Link
                href="/upload"
                className="text-white hover:bg-purple-500 hover:bg-opacity-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Upload Note
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-500 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-white hover:bg-purple-500 hover:bg-opacity-50 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/upload"
            className="text-white hover:bg-purple-500 hover:bg-opacity-50 block px-3 py-2 rounded-md text-base font-medium"
          >
            Upload Note
          </Link>
        </div>
      </div>
    </nav>
  )
}