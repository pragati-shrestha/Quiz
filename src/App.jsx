import React from 'react';
import './App.css';
import Quiz from './Quiz';  // Import your Quiz component
import { AlertCircle, CheckCircle2, ChevronRight, Cloud, Sun, Zap } from 'lucide-react';


const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="animate-float absolute top-10 left-10">
      <Cloud className="text-blue-200 w-16 h-16" />
    </div>
    <div className="animate-float-delayed absolute top-20 right-20">
      <Sun className="text-yellow-200 w-20 h-20" />
    </div>
    <div className="animate-float-quick absolute bottom-10 left-1/4">
      <Zap className="text-yellow-300 w-12 h-12" />
    </div>
  </div>
);

function App() {
  const [currentTab, setCurrentTab] = React.useState("presentation");
  const changeTab = (tab) => {
    setCurrentTab(tab);
  }
  const renderTab = () => {
    switch (currentTab) {
      case "presentation":
        return <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSPqNhMfhnrP3WDqaZZdYSTp911xktsZHWaguLD9DfHDIdecgkK1QC2lPTlq6_FNEni89Fc5nArGiW1/pubembed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>;
      case "video":
        return <div>Video Content</div>;
      case "quiz":
        return <Quiz />;
      default:
        return null;
    }
  };


  return (
    <div className="App bg-gradient-to-b from-blue-100 to-green-100">
      <AnimatedBackground />
      <div className="w-full bg-blue-100 flex justify-center" >
        <div className='p-4 flex items-center justify-between hover:bg-slate-200 cursor-pointer' onClick={()=>changeTab("presentation")}>
          Presentation
        </div>
        <div className='p-4 flex items-center justify-between hover:bg-slate-200 cursor-pointer' onClick={()=>changeTab("video")}>
          Video
        </div>
        <div className='p-4 flex items-center justify-between hover:bg-slate-200 cursor-pointer' onClick={()=>changeTab("quiz")}>
          Quiz
        </div>
      </div>
   <div className='w-full h-screen flex items-center justify-center'>
    {renderTab()}
   </div>

      
    </div>
  );
}

export default App;
