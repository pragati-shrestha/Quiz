// import React from 'react';
// import './App.css';
// import Quiz from './Quiz';  // Import your Quiz component
// import { AlertCircle, CheckCircle2, ChevronRight, Cloud, Sun, Zap } from 'lucide-react';


// const AnimatedBackground = () => (
//   <div className="absolute inset-0 overflow-hidden pointer-events-none">
//     <div className="animate-float absolute top-10 left-10">
//       <Cloud className="text-blue-200 w-16 h-16" />
//     </div>
//     <div className="animate-float-delayed absolute top-20 right-20">
//       <Sun className="text-yellow-200 w-20 h-20" />
//     </div>
//     <div className="animate-float-quick absolute bottom-10 left-1/4">
//       <Zap className="text-yellow-300 w-12 h-12" />
//     </div>
//   </div>
// );

// function App() {
//   const [currentTab, setCurrentTab] = React.useState("presentation");
//   const changeTab = (tab) => {
//     setCurrentTab(tab);
//   }
//   const renderTab = () => {
//     switch (currentTab) {
//       case "presentation":
//         return <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSPqNhMfhnrP3WDqaZZdYSTp911xktsZHWaguLD9DfHDIdecgkK1QC2lPTlq6_FNEni89Fc5nArGiW1/pubembed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>;
//       case "video":
//         return <div>Video Content</div>;
//       case "quiz":
//         return <Quiz />;
//       default:
//         return null;
//     }
//   };


//   return (
//     <div className="App bg-gradient-to-b from-blue-100 to-green-100">
//       <AnimatedBackground />
//       <div className="w-full bg-blue-100 flex justify-center" >
//         <div className='p-4 flex items-center justify-between hover:bg-slate-200 cursor-pointer' onClick={()=>changeTab("presentation")}>
//           Presentation
//         </div>
//         <div className='p-4 flex items-center justify-between hover:bg-slate-200 cursor-pointer' onClick={()=>changeTab("video")}>
//           Video
//         </div>
//         <div className='p-4 flex items-center justify-between hover:bg-slate-200 cursor-pointer' onClick={()=>changeTab("quiz")}>
//           Quiz
//         </div>
//       </div>
//    <div className='w-full h-screen flex items-center justify-center'>
//     {renderTab()}
//    </div>

      
//     </div>
//   );
// }

// export default App;













import React from 'react';
import './App.css';
import Quiz from './Quiz';
import { Cloud, Sun, Zap } from 'lucide-react';

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

  const changeTab = (tab) => setCurrentTab(tab);

  const renderTab = () => {
    switch (currentTab) {
      case "presentation":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-6">

            {/* Google Slides Presentation */}
            <div className="w-full max-w-4xl aspect-video rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://docs.google.com/presentation/d/1jwCitbKgMxG7wCzLXBrBv1KSEAhvQoWs/preview?start=true&loop=true&delayms=5000"
                width="100%"
                height="100%"
                allow="autoplay"
                allowFullScreen
                title="Google Slides Presentation"
                className="w-full h-full border-none"
              ></iframe>
            </div>

            {/* Canva Presentation #1 Embed */}
            <div className="w-full max-w-4xl aspect-video rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.canva.com/design/DAGdmxcGBJ8/YuzMjQTWTT7Dpohguwz5eA/view?embed"
                width="100%"
                height="100%"
                allowFullScreen
                title="Canva Presentation 1"
                className="w-full h-full border-none"
              ></iframe>
            </div>

            {/* Canva Presentation #2 Embed */}
            <div className="w-full max-w-4xl aspect-video rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.canva.com/design/DAGlh1ylACA/Hhe-Eu_Pd3OPexVoogtZ5A/view?embed"
                width="100%"
                height="100%"
                allowFullScreen
                title="Canva Presentation 2"
                className="w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl space-y-8 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Watch Our Videos</h2>
            <div className="w-full aspect-video shadow-lg rounded-lg overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/1gvgX8aO4gizOqXw9kaanXqKtYg-B1rcD/preview"
                width="100%"
                height="100%"
                allow="autoplay"
                allowFullScreen
                title="Google Drive Video 1"
                className="w-full h-full border-none"
              ></iframe>
            </div>
            <div className="w-full aspect-video shadow-lg rounded-lg overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/16De6q4MUxJ0lZzV14P1EdJRbqve9vp4d/preview"
                width="100%"
                height="100%"
                allow="autoplay"
                allowFullScreen
                title="Google Drive Video 2"
                className="w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        );

      case "quiz":
        return <Quiz />;

      default:
        return null;
    }
  };

  return (
    <div className="App bg-gradient-to-b from-blue-100 to-green-100 min-h-screen relative">
      <AnimatedBackground />

      {/* Navigation */}
      <div className="w-full bg-blue-100 flex justify-center shadow-md h-16 z-10 relative">
        {["presentation", "video", "quiz"].map((tab) => (
          <div
            key={tab}
            className={`p-4 cursor-pointer hover:bg-slate-200 ${currentTab === tab ? 'font-bold underline' : ''
              }`}
            onClick={() => changeTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full min-h-[calc(100vh-4rem)] pt-8 px-4 flex items-center justify-center overflow-y-auto z-10 relative">
        {renderTab()}
      </div>
    </div>
  );
}

export default App;
