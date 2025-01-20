import { Upload } from 'lucide-react'

export default function DocumentVerification() {
  const documents = [
    {
      title: 'Upload Degree certificate / Provisional Degree certificate / All Sem Marksheet',
      description: 'Files Supported: JPEG,PDF and PNG (max size 2mb)',
      required: true
    },
    {
      title: 'Upload Service letter or relieving letter / Form 16 and LOA',
      description: 'Files Supported: JPEG,PDF and PNG (max size 2mb)',
      required: true
    },
    {
      title: 'Upload Aadhar card',
      description: 'Files Supported: JPEG,PDF and PNG (max size 2mb)',
      required: true
    },
    {
      title: 'Upload PAN Card',
      description: 'Files Supported: JPEG,PDF and PNG (max size 2mb)',
      required: true
    }
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Document Verification</h2>
      <p className="text-gray-600 mb-8">Upload Documents for Verification</p>

      <div className="space-y-6">
        {documents.map((doc, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-1">
                  {doc.title}
                  {doc.required && <span className="text-red-500">*</span>}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
              </div>
              <button type='file' className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Choose File
              </button>
            </div>
          </div>
        ))}

        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-1">
                Enter UAN Number
                <span className="text-red-500">*</span>
              </h3>
            </div>
            <input
              type="text"
              placeholder="Enter 12-Digit UAN Number"
              className="px-4 py-2 border rounded-lg w-64"
            />
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="confirm" className="mt-1" />
          <label htmlFor="confirm" className="text-sm">
            I Confirm that I uploaded valid goverment-issued photo ID.This Include my picture, signature,name,date of birth and address
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload and Continue
          </button>
        </div>
      </div>
    </div>
  )
}

