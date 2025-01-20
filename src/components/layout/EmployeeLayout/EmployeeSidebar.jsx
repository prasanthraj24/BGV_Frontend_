export default function Sidebar({ currentStep }) {
    const steps = [
      { id: 1, name: 'Document Verification' },
      { id: 2, name: 'Identity Verification' },
      { id: 3, name: 'Liveness Check' }
    ]
  
    return (
      <div className="w-64 min-h-screen border-r bg-white">
        <div className="flex flex-col h-full">
          <div className="flex-1 py-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 px-4 py-2 ${
                  currentStep === step.id
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {step.id}
                </div>
                <span className="font-medium">{step.name}</span>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="p-4 text-center border rounded-lg">
              Welcome, John Luther
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  