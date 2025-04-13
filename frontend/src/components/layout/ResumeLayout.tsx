import { ReactNode, useState } from "react";
// import ResumeToolbar from "../resume/ResumeToolbar";

type ResumeLayoutProps = {
  children: ReactNode;
};

export default function ResumeLayout({ children }: ResumeLayoutProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* <ResumeToolbar 
        onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)} 
      /> */}
      
      <div className={`flex flex-1 ${isPreviewMode ? 'flex-row' : 'flex-col'}`}>
        {children} {/* EditForm + Preview components go here */}
      </div>
    </div>
  );
}