import { Camera } from 'lucide-react'

export default function IdentityVerification() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-2">Identity Verification</h2>
      <p className="text-gray-600 mb-12">Please look into the camera and hold still</p>

      <div className="relative w-96 h-96 bg-gray-100 rounded-lg mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-blue-600 rounded-full opacity-20" />
          <div className="absolute w-24 h-24 bg-blue-100 rounded-full" />
        </div>
        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg" />
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-white border rounded-lg hover:bg-gray-50 mb-8">
        <Camera className="h-5 w-5" />
        Capture Photo
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

