// components/layout/MainLayout.tsx
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiX, FiHome, FiFileText, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-bold">Resume Builder</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-10">
          <Link 
            to="/dashboard" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <FiHome className="mr-3" /> Dashboard
          </Link>
          <Link 
            to="/resumes" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <FiFileText className="mr-3" /> My Resumes
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <FiUser className="mr-3" /> Profile
          </Link>
          <Link 
            to="/settings" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <FiSettings className="mr-3" /> Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
          >
            <FiLogOut className="mr-3" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 flex justify-between items-center">
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;