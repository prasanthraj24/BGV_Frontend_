import { Video, Maximize2 } from 'lucide-react'

export default function LivenessCheck() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-2">Liveness Check</h2>
      <p className="text-gray-600 mb-4">Record a video with sentence displaying on your screen</p>

      <button className="flex items-center gap-2 text-blue-600 mb-8">
        <Maximize2 className="h-4 w-4" />
        Hold the face postion during recording
      </button>

      <div className="relative w-96 h-96 bg-gray-100 rounded-lg mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-blue-600 rounded-full opacity-20" />
          <div className="absolute w-24 h-24 bg-blue-100 rounded-full" />
        </div>
        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg" />
      </div>

      <div className="bg-black text-white px-4 py-2 rounded-lg mb-8">
        Hi There!
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-white border rounded-lg hover:bg-gray-50 mb-8">
        <Video className="h-5 w-5" />
        Start Recording
      </button>

      <div className="flex gap-4">
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Upload and Continue
        </button>
      </div>
    </div>
  )
}

