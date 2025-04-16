import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const ResumeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`bg-gray-100 border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            {sidebarOpen ? '<<' : '>>'}
          </button>
        </div>
        <nav className="mt-4">
          {sidebarOpen ? (
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">My Resumes</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Templates</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">AI Assistant</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
            </ul>
          ) : (
            <ul className="flex flex-col items-center">
              <li className="p-2 hover:bg-gray-200 cursor-pointer mb-2">📄</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer mb-2">🖌️</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer mb-2">🤖</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">⚙️</li>
            </ul>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ResumeLayout;
