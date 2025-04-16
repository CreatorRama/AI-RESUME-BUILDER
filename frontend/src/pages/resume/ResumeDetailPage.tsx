import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ResumeData, ResumeTemplate, ExperienceItem, EducationItem, CertificationItem } from '../../types';

const ResumeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch resume data
    setTimeout(() => {
      setResumeData({
        title: 'Software Engineer Resume',
        personal: {
          firstName: 'Alex',
          lastName: 'Johnson',
          email: 'alex@example.com',
          phone: '(555) 123-4567',
          address: 'San Francisco, CA',
          linkedIn: 'linkedin.com/in/alexj',
          website: 'alexjohnson.dev'
        },
        summary: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable applications and implementing modern development practices.',
        experience: [
          { 
            id: '1', 
            title: 'Senior Software Engineer', 
            company: 'Tech Solutions Inc', 
            location: 'San Francisco, CA', 
            startDate: '2023-01', 
            endDate: '', 
            current: true, 
            description: 'Leading development of enterprise web applications using React and Node.js. Implemented CI/CD pipelines that reduced deployment time by 40%. Mentored junior developers and conducted code reviews.' 
          },
          { 
            id: '2', 
            title: 'Software Engineer', 
            company: 'WebDev Co', 
            location: 'San Francisco, CA', 
            startDate: '2020-06', 
            endDate: '2022-12', 
            current: false, 
            description: 'Developed and maintained client-facing web applications. Optimized database queries resulting in 30% faster page loads. Collaborated with UX team to implement responsive designs.' 
          }
        ],
        education: [
          { 
            id: '1', 
            degree: 'B.S. Computer Science', 
            school: 'State University', 
            location: 'Los Angeles, CA', 
            startDate: '2016-09', 
            endDate: '2020-05', 
            description: 'Graduated with honors. Specialized in software engineering. Participated in ACM programming competitions.' 
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'GraphQL'],
        certifications: [
          { 
            id: '1', 
            name: 'AWS Certified Developer', 
            issuer: 'Amazon Web Services', 
            date: '2022-04', 
            description: 'Associate level certification for AWS cloud development' 
          }
        ]
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const downloadPDF = () => {
    setPdfLoading(true);
    // Simulate PDF generation
    setTimeout(() => {
      console.log('Downloading PDF for resume:', id);
      setPdfLoading(false);
      // In a real application, you would trigger a PDF download here
      alert('PDF download started!');
    }, 1500);
  };

  const deleteResume = () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      console.log('Deleting resume:', id);
      // In a real application, you would send a delete request to your API
      navigate('/resumes');
    }
  };

  if (loading || !resumeData) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/resumes" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
            &larr; Back to Resumes
          </Link>
          <h1 className="text-3xl font-bold">{resumeData.title}</h1>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/resumes/${id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <span className="mr-1">✏️</span> Edit
          </Link>
          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            disabled={pdfLoading}
          >
            {pdfLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <span className="mr-1">📄</span> Download PDF
              </>
            )}
          </button>
          <button
            onClick={deleteResume}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <span className="mr-1">🗑️</span> Delete
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Template selector */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Template: {template.charAt(0).toUpperCase() + template.slice(1)}</h2>
            <div className="flex items-center">
              <label htmlFor="template-select" className="mr-2 text-sm text-gray-600">Change Template:</label>
              <select
                id="template-select"
                value={template}
                onChange={(e) => setTemplate(e.target.value as ResumeTemplate)}
                className="p-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="modern">Modern</option>
                <option value="professional">Professional</option>
                <option value="creative">Creative</option>
                <option value="minimalist">Minimalist</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resume preview based on selected template */}
        <div className="p-8">
          {template === 'modern' && (
            <div className="font-sans">
              {/* Header */}
              <div className="border-b-2 border-blue-600 pb-4 mb-6">
                <h1 className="text-4xl font-bold text-gray-800">
                  {resumeData.personal.firstName} {resumeData.personal.lastName}
                </h1>
                <div className="mt-2 flex flex-wrap gap-3 text-gray-600">
                  {resumeData.personal.email && (
                    <div className="flex items-center">
                      <span className="mr-1">✉️</span>
                      <span>{resumeData.personal.email}</span>
                    </div>
                  )}
                  {resumeData.personal.phone && (
                    <div className="flex items-center">
                      <span className="mr-1">📱</span>
                      <span>{resumeData.personal.phone}</span>
                    </div>
                  )}
                  {resumeData.personal.address && (
                    <div className="flex items-center">
                      <span className="mr-1">📍</span>
                      <span>{resumeData.personal.address}</span>
                    </div>
                  )}
                  {resumeData.personal.linkedIn && (
                    <div className="flex items-center">
                      <span className="mr-1">🔗</span>
                      <span>{resumeData.personal.linkedIn}</span>
                    </div>
                  )}
                  {resumeData.personal.website && (
                    <div className="flex items-center">
                      <span className="mr-1">🌐</span>
                      <span>{resumeData.personal.website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-2">Professional Summary</h2>
                  <p className="text-gray-700">{resumeData.summary}</p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-3">Experience</h2>
                  {resumeData.experience.map((exp: ExperienceItem) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{exp.title}</h3>
                        <span className="text-gray-600 text-sm">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {exp.company}{exp.location ? `, ${exp.location}` : ''}
                      </div>
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-3">Education</h2>
                  {resumeData.education.map((edu: EducationItem) => (
                    <div key={edu.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                        <span className="text-gray-600 text-sm">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {edu.school}{edu.location ? `, ${edu.location}` : ''}
                      </div>
                      {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-600 mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill: string, index: number) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-blue-600 mb-3">Certifications</h2>
                  {resumeData.certifications.map((cert: CertificationItem) => (
                    <div key={cert.id} className="mb-4">
                      <h3 className="font-bold text-gray-800">{cert.name}</h3>
                      <div className="text-gray-600">
                        {cert.issuer} • {formatDate(cert.date)}
                      </div>
                      {cert.description && <p className="mt-1 text-gray-700">{cert.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {template === 'professional' && (
            <div className="font-serif">
              {/* Header */}
              <div className="text-center border-b border-gray-300 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                  {resumeData.personal.firstName} {resumeData.personal.lastName}
                </h1>
                <div className="mt-2 flex justify-center flex-wrap gap-4 text-gray-700">
                  {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                  {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                  {resumeData.personal.address && <span>{resumeData.personal.address}</span>}
                  {resumeData.personal.linkedIn && <span>{resumeData.personal.linkedIn}</span>}
                  {resumeData.personal.website && <span>{resumeData.personal.website}</span>}
                </div>
              </div>

              {/* The rest of the professional template follows the same structure but with different styling */}
              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
                  <p className="text-gray-700">{resumeData.summary}</p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">Professional Experience</h2>
                  {resumeData.experience.map((exp: ExperienceItem) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-800">{exp.title}</h3>
                        <span className="text-gray-600 text-sm">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="text-gray-700 italic">
                        {exp.company}{exp.location ? `, ${exp.location}` : ''}
                      </div>
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Additional sections follow similar patterns */}
            </div>
          )}

          {template === 'creative' && (
            <div className="font-sans">
              {/* Creative template has a more modern, colorful design */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white rounded-lg mb-6">
                <h1 className="text-4xl font-bold">
                  {resumeData.personal.firstName} {resumeData.personal.lastName}
                </h1>
                <p className="mt-2 text-lg opacity-90">{resumeData.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-white">
                  {resumeData.personal.email && (
                    <div className="flex items-center">
                      <span className="mr-1">✉️</span>
                      <span>{resumeData.personal.email}</span>
                    </div>
                  )}
                  {resumeData.personal.phone && (
                    <div className="flex items-center">
                      <span className="mr-1">📱</span>
                      <span>{resumeData.personal.phone}</span>
                    </div>
                  )}
                  {resumeData.personal.address && (
                    <div className="flex items-center">
                      <span className="mr-1">📍</span>
                      <span>{resumeData.personal.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content sections for creative template */}
              {/* ... Similar structure but with different styling */}
            </div>
          )}

          {template === 'minimalist' && (
            <div className="font-sans">
              {/* Minimalist template has clean, simple design with minimal decorations */}
              <h1 className="text-3xl font-light text-gray-900 mb-1">
                {resumeData.personal.firstName} {resumeData.personal.lastName}
              </h1>
              <div className="text-gray-500 text-sm mb-6 border-b border-gray-200 pb-4">
                {resumeData.personal.email && <span className="mr-3">{resumeData.personal.email}</span>}
                {resumeData.personal.phone && <span className="mr-3">{resumeData.personal.phone}</span>}
                {resumeData.personal.address && <span>{resumeData.personal.address}</span>}
              </div>

              {/* Content sections for minimalist template */}
              {/* ... Similar structure but with different styling */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetailPage;