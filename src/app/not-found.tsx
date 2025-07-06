'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-8xl font-bold text-gray-200 animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-semibold text-green-600 animate-bounce">
              🌱
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600">
            ไม่พบหน้าที่คุณกำลังมองหา
          </p>
          <p className="text-sm text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 py-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping delay-75"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping delay-150"></div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-100 rounded-full opacity-50 animate-pulse delay-75"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-yellow-100 rounded-full opacity-50 animate-pulse delay-150"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-100 rounded-full opacity-50 animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
