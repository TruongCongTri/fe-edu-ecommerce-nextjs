import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-[#0a1a0a] to-[#0e4d0e] text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold mb-4">
          940 IT Jobs Chất for Trương Công Trí
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            className="px-4 py-2 rounded text-black w-full sm:w-auto"
            placeholder="Ho Chi Minh"
          />
          <input
            className="px-4 py-2 rounded text-black w-full sm:w-[400px]"
            placeholder="Enter keyword skill (Java, iOS...), job title, company..."
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
            🔍 Search
          </button>
        </div>
        <div className="mt-6 text-lg">
          <span className="text-gray-300">Suggestions for you:</span>{" "}
          <span className="inline-block bg-gray-800 px-3 py-1 rounded-full mx-1">JavaScript</span>
          <span className="inline-block bg-gray-800 px-3 py-1 rounded-full mx-1">ReactJS</span>
        </div>
      </div>
    </div>
  )
}
