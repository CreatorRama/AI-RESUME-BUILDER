import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResumesPage = () => {
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(true);

  interface ResumeItem {
    id: string;
    title: string;
    lastModified: string;
    templateName: string;
  }

  useEffect(() => {
    // Simulate API call to fetch resumes
    setTimeout(() => {
      setResumes([
        { id: '1', title: 'Software Engineer Resume', lastModified: '2025-04-12', templateName: 'Modern' },
        { id: '2', title: 'UX Designer CV', lastModified: '2025-04-10', templateName: 'Creative' },
        { id: '3', title: 'Project Manager Resume', lastModified: '2025-04-05', templateName: 'Professional' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Link 
          to="/resumes/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Create New Resume
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You don't have any resumes yet.</p>
              <Link 
                to="/resumes/new" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Create Your First Resume
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map(resume => (
                <div 
                  key={resume.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="w-32 h-40 bg-white border border-gray-300 shadow-sm"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{resume.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">Template: {resume.templateName}</p>
                    <p className="text-gray-400 text-xs mt-1">Last modified: {resume.lastModified}</p>
                    <div className="mt-4 flex space-x-2">
                      <Link 
                        to={`/resumes/${resume.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/resumes/${resume.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResumesPage;