import { Search, Bell, Grid3X3, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center gap-4">
        <img src="/placeholder.svg" alt="Sierra Logo" className="h-8" />
        <h1 className="text-xl font-semibold">BG Verification Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button className="relative p-2">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        
        <button className="p-2">
          <Grid3X3 className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <img
            src="/placeholder.svg"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="text-sm">
            <div className="font-medium">Yamuna</div>
            <div className="text-gray-500">Admin</div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}

