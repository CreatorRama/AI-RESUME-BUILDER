import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ResumeData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ResumeTemplate,
  ResumeSection
} from '../../types';

// interface ResumeParamTypes {
//   id: string;
// }

const ResumeBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(id ? true : false);
  const [activeSection, setActiveSection] = useState<ResumeSection>('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    title: '',
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      website: ''
    },
    summary: '',
    experience: [
      { id: '1', title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }
    ],
    education: [
      { id: '1', degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }
    ],
    skills: [''],
    certifications: [
      { id: '1', name: '', issuer: '', date: '', description: '' }
    ]
  });
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
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
          summary: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies.',
          experience: [
            { 
              id: '1', 
              title: 'Senior Software Engineer', 
              company: 'Tech Solutions Inc', 
              location: 'San Francisco, CA', 
              startDate: '2023-01', 
              endDate: '', 
              current: true, 
              description: 'Leading development of enterprise web applications using React and Node.js.' 
            },
            { 
              id: '2', 
              title: 'Software Engineer', 
              company: 'WebDev Co', 
              location: 'San Francisco, CA', 
              startDate: '2020-06', 
              endDate: '2022-12', 
              current: false, 
              description: 'Developed and maintained client-facing web applications.' 
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
              description: 'Graduated with honors. Specialized in software engineering.' 
            }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
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
    }
  }, [id]);

  const handleInputChange = (
    section: keyof ResumeData | string, 
    field: string | null, 
    value: string | boolean, 
    index: number | null = null
  ): void => {
    setResumeData(prev => {
      if (index !== null && field !== null && Array.isArray(prev[section as keyof ResumeData])) {
        // For array fields like experience, education, etc.
        const newArray = [...(prev[section as keyof ResumeData] as any[])];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (
        field !== null && 
        typeof prev[section as keyof ResumeData] === 'object' && 
        !Array.isArray(prev[section as keyof ResumeData])
      ) {
        // For nested objects like personal
        return { 
          ...prev, 
          [section]: { 
            ...(prev[section as keyof ResumeData] as object), 
            [field]: value 
          } 
        };
      } else {
        // For direct fields
        return { ...prev, [section]: value };
      }
    });
  };

  const addItem = (section: 'experience' | 'education' | 'certifications' | 'skills'): void => {
    setResumeData(prev => {
      const newId = Date.now().toString();
      
      switch(section) {
        case 'experience': {
          const newItem: ExperienceItem = { 
            id: newId, 
            title: '', 
            company: '', 
            location: '', 
            startDate: '', 
            endDate: '', 
            current: false, 
            description: '' 
          };
          return { ...prev, [section]: [...prev[section], newItem] };
        }
        case 'education': {
          const newItem: EducationItem = { 
            id: newId, 
            degree: '', 
            school: '', 
            location: '', 
            startDate: '', 
            endDate: '', 
            description: '' 
          };
          return { ...prev, [section]: [...prev[section], newItem] };
        }
        case 'certifications': {
          const newItem: CertificationItem = { 
            id: newId, 
            name: '', 
            issuer: '', 
            date: '', 
            description: '' 
          };
          return { ...prev, [section]: [...prev[section], newItem] };
        }
        case 'skills':
          return { ...prev, skills: [...prev.skills, ''] };
        default:
          return prev;
      }
    });
  };

  const removeItem = (section: 'experience' | 'education' | 'certifications' | 'skills', index: number): void => {
    setResumeData(prev => {
      const newArray = [...(prev[section] as any[])];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const generateAiSuggestion = (field: string): void => {
    // Simulate AI generation
    setShowAiPanel(true);
    setTimeout(() => {
      switch(field) {
        case 'summary':
          setAiSuggestion('Detail-oriented software engineer with 5+ years of experience in full-stack development. Proficient in React, Node.js, and cloud technologies with a track record of delivering scalable web applications that drive business growth.');
          break;
        case 'experience':
          setAiSuggestion('Improved application performance by 40% through code optimization and implementing efficient caching strategies. Collaborated with cross-functional teams to deliver features on time and within budget.');
          break;
        case 'skills':
          setAiSuggestion('Based on your experience, you might want to add: Redux, GraphQL, Docker, Kubernetes, CI/CD, Jest, React Testing Library, REST API design');
          break;
        default:
          setAiSuggestion('AI suggestion will appear here based on your profile and job target.');
      }
    }, 1000);
  };

  const applyAiSuggestion = (): void => {
    // Implement the logic to apply AI suggestion to the current active section
    if (activeSection === 'summary') {
      handleInputChange('summary', null, aiSuggestion);
    } else if (activeSection === 'experience') {
      // Example: Apply to the first experience's description
      if (resumeData.experience.length > 0) {
        handleInputChange('experience', 'description', aiSuggestion, 0);
      }
    } else if (activeSection === 'skills') {
      // Example: Add suggested skills
      const suggestedSkills = aiSuggestion.split(': ')[1]?.split(', ') || [];
      setResumeData(prev => {
        return { ...prev, skills: [...prev.skills, ...suggestedSkills] };
      });
    }
    setShowAiPanel(false);
  };

  const saveResume = (): void => {
    // Simulate saving
    console.log('Saving resume:', resumeData);
    
    // Navigate back to resumes list after saving
    setTimeout(() => {
      navigate('/resumes');
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left sidebar - sections navigation */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <h2 className="font-bold text-lg mb-6">Resume Sections</h2>
        <nav>
          <ul>
            {(['personal', 'summary', 'experience', 'education', 'skills', 'certifications'] as ResumeSection[]).map(section => (
              <li key={section}>
                <button
                  className={`w-full text-left py-2 px-3 rounded-md mb-1 ${activeSection === section ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <hr className="my-6" />
        
        <div>
          <h3 className="font-medium mb-3">Template</h3>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as ResumeTemplate)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="modern">Modern</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
            <option value="minimalist">Minimalist</option>
          </select>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={saveResume}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Save Resume
          </button>
        </div>
      </div>
      
      {/* Main content - form fields */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume Title
            </label>
            <input
              type="text"
              value={resumeData.title}
              onChange={(e) => handleInputChange('title', null, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Software Engineer Resume"
            />
          </div>
          
          {activeSection === 'personal' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={resumeData.personal.firstName}
                    onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={resumeData.personal.lastName}
                    onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={resumeData.personal.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={resumeData.personal.phone}
                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={resumeData.personal.address}
                    onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={resumeData.personal.linkedIn}
                    onChange={(e) => handleInputChange('personal', 'linkedIn', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    value={resumeData.personal.website}
                    onChange={(e) => handleInputChange('personal', 'website', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'summary' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Professional Summary</h2>
                <button
                  onClick={() => generateAiSuggestion('summary')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className="mr-1">✨</span> AI Enhance
                </button>
              </div>
              <textarea
                value={resumeData.summary}
                onChange={(e) => handleInputChange('summary', null, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md h-40"
                placeholder="Write a compelling professional summary..."
              />
            </div>
          )}
          
          {activeSection === 'experience' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Work Experience</h2>
                <button
                  onClick={() => generateAiSuggestion('experience')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className="mr-1">✨</span> AI Enhance
                </button>
              </div>
              
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="mb-8 border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-medium">Position {index + 1}</h3>
                    {resumeData.experience.length > 1 && (
                      <button
                        onClick={() => removeItem('experience', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          id={`current-job-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                          className="mr-2"
                        />
                        <label htmlFor={`current-job-${exp.id}`} className="text-sm font-medium text-gray-700">
                          I currently work here
                        </label>
                      </div>
                      
                      {!exp.current && (
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="End Date"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                      className="w-full p-2 border border-gray-300 rounded-md h-24"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => addItem('experience')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Add Another Position
              </button>
            </div>
          )}
          
          {activeSection === 'education' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Education</h2>
              
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-8 border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-medium">Education {index + 1}</h3>
                    {resumeData.education.length > 1 && (
                      <button
                        onClick={() => removeItem('education', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        School
                      </label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                      className="w-full p-2 border border-gray-300 rounded-md h-24"
                      placeholder="Describe your studies, achievements, activities..."
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => addItem('education')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Add Another Education
              </button>
            </div>
          )}
          
          {activeSection === 'skills' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Skills</h2>
                <button
                  onClick={() => generateAiSuggestion('skills')}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className="mr-1">✨</span> AI Recommend Skills
                </button>
              </div>
              
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="mb-3 flex">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleInputChange('skills', index.toString(), e.target.value, index)}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., JavaScript"
                  />
                  {resumeData.skills.length > 1 && (
                    <button
                      onClick={() => removeItem('skills', index)}
                      className="ml-2 text-red-600 hover:text-red-800 px-2 py-1"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={() => addItem('skills')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Add Skill
              </button>
            </div>
          )}
          
          {activeSection === 'certifications' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Certifications & Licenses</h2>
              
              {resumeData.certifications.map((cert, index) => (
                <div key={cert.id} className="mb-8 border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-medium">Certification {index + 1}</h3>
                    {resumeData.certifications.length > 1 && (
                      <button
                        onClick={() => removeItem('certifications', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="month"
                        value={cert.date}
                        onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={cert.description}
                      onChange={(e) => handleInputChange('certifications', 'description', e.target.value, index)}
                      className="w-full p-2 border border-gray-300 rounded-md h-24"
                      placeholder="Add details about this certification..."
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => addItem('certifications')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="mr-1">+</span> Add Another Certification
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* AI Suggestion Panel */}
      {showAiPanel && (
        <div className="fixed bottom-0 right-0 w-96 bg-white shadow-lg rounded-tl-lg border border-blue-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium flex items-center">
              <span className="mr-2">✨</span> AI Suggestion
            </h3>
            <button 
              onClick={() => setShowAiPanel(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-800 mb-4">{aiSuggestion}</p>
          <div className="flex justify-end">
            <button
              onClick={applyAiSuggestion}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Apply Suggestion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilderPage;