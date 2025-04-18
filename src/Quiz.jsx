// import React, { useState, useEffect } from 'react';
// import { AlertCircle, CheckCircle2, Cloud, Sun, Zap, Umbrella, Leaf, Wind, Thermometer } from 'lucide-react';
// import { Alert, AlertDescription } from './components/ui/alert';
// const quizQuestions = [
//     {
//       question: "What's the most ironic way to combat rising sea levels?",
//       options: [
//         "Build underwater cities and become merpeople",
//         "Start collecting water in giant space buckets",
//         "Plant more trees and reduce carbon emissions",
//         "Train fish to push the water back",
//         "Move all continents to higher ground",
//         "Just turn on the global AC"
//       ],
//       correctAnswer: "Plant more trees and reduce carbon emissions",
//       funFact: "While becoming merpeople sounds fun, trees are natural carbon sinks and actually help fight climate change!"
//     },
//     {
//       question: "During an earthquake, what should you NOT do?",
//       options: [
//         "Take a selfie with the shaking building",
//         "Start a dance party to match the vibrations",
//         "Try to surf on your furniture",
//         "Drop, cover, and hold on",
//         "Call your ex to apologize (the world might be ending)",
//         "Post on social media about how the earth is just vibing"
//       ],
//       correctAnswer: "Drop, cover, and hold on",
//       funFact: "Despite the tempting photo op, safety first! Drop, cover, and hold on is still your best bet."
//     },
//     {
//       question: "What's contributing the most to global warming?",
//       options: [
//         "Too many people using hair dryers",
//         "Dragons returning from extinction",
//         "The sun doing extra cardio",
//         "Greenhouse gas emissions",
//         "Earth's blanket is too thick",
//         "All the hot takes on social media"
//       ],
//       correctAnswer: "Greenhouse gas emissions",
//       funFact: "While hot takes on social media might feel like they're warming the planet, greenhouse gases are the real culprit!"
//     }
//   ];
  
  
// const CartoonCharacter = ({ isHappy }) => (
//   <div className={`fixed bottom-4 right-4 transform transition-all duration-500 ${isHappy ? 'animate-bounce' : 'animate-shake'}`}>
//     <div className="relative">
//       {/* Head */}
//       <div className="w-20 h-20 bg-yellow-300 rounded-full relative">
//         {/* Eyes */}
//         <div className={`absolute left-4 top-6 w-3 h-3 bg-black rounded-full ${isHappy ? '' : 'animate-wink'}`}></div>
//         <div className={`absolute right-4 top-6 w-3 h-3 bg-black rounded-full ${isHappy ? '' : 'animate-wink'}`}></div>
//         {/* Mouth */}
//         <div className={`absolute left-1/4 ${isHappy ? 'bottom-4 w-10 h-6 border-b-4' : 'bottom-6 w-8 h-2'} border-black rounded-${isHappy ? 'full' : 'none'}`}></div>
//       </div>
//     </div>
//   </div>
// );

// const FloatingElement = ({ Icon, className, delay }) => {
//   const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPosition({
//         x: Math.random() * 100,
//         y: Math.random() * 100
//       });
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className={`absolute transition-all duration-6000 ease-in-out ${className}`}
//       style={{
//         left: `${position.x}%`,
//         top: `${position.y}%`,
//         animationDelay: `${delay}s`
//       }}
//     >
//       <Icon className="animate-spin-slow" />
//     </div>
//   );
// };

// const AnimatedBackground = ({ isCorrect }) => (
//   <div className="absolute inset-0 overflow-hidden pointer-events-none">
//     <FloatingElement Icon={Cloud} className="text-blue-200 w-16 h-16" delay={0} />
//     <FloatingElement Icon={Sun} className="text-yellow-200 w-20 h-20" delay={2} />
//     <FloatingElement Icon={Zap} className="text-yellow-300 w-12 h-12" delay={1} />
//     <FloatingElement Icon={Leaf} className="text-green-300 w-16 h-16" delay={3} />
//     <FloatingElement Icon={Wind} className="text-blue-300 w-14 h-14" delay={2.5} />
//     <FloatingElement Icon={Thermometer} className="text-red-300 w-12 h-12" delay={1.5} />
//     <FloatingElement Icon={Umbrella} className="text-purple-300 w-14 h-14" delay={0.5} />
    
//     {isCorrect && (
//       <div className="absolute inset-0 animate-confetti">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 rounded-full"
//             style={{
//               background: `hsl(${Math.random() * 360}deg, 100%, 50%)`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `fall ${2 + Math.random() * 2}s linear infinite`,
//               animationDelay: `${Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>
//     )}
//   </div>
// );

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [score, setScore] = useState(0);
//   const [shake, setShake] = useState(false);
//   const [attempts, setAttempts] = useState({});  // Track attempts for each question

//   const handleAnswerClick = (answer) => {
//     setSelectedAnswer(answer);
//     setShowAnswer(true);
    
//     // Update attempts for current question
//     const currentAttempts = attempts[currentQuestion] || [];
//     setAttempts({
//       ...attempts,
//       [currentQuestion]: [...currentAttempts, answer]
//     });
    
//     if (answer === quizQuestions[currentQuestion].correctAnswer) {
//       setIsCorrect(true);
//       setScore(score + 1);
//       setTimeout(() => {
//         if (currentQuestion < quizQuestions.length - 1) {
//           setCurrentQuestion(currentQuestion + 1);
//           setSelectedAnswer('');
//           setShowAnswer(false);
//           setIsCorrect(false);
//         }
//       }, 2000);
//     } else {
//       setIsCorrect(false);
//       setShake(true);
//       setTimeout(() => {
//         setShake(false);
//         setShowAnswer(false);  // Reset feedback for next attempt
//         setSelectedAnswer(''); // Reset selection for next attempt
//       }, 1000);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4 relative overflow-hidden">
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(5deg); }
//         }
        
//         @keyframes shake {
//           0%, 100% { transform: translateX(0) rotate(0deg); }
//           25% { transform: translateX(-10px) rotate(-5deg); }
//           75% { transform: translateX(10px) rotate(5deg); }
//         }
        
//         @keyframes bounce {
//           0%, 100% { transform: scale(1) rotate(0deg); }
//           50% { transform: scale(1.05) rotate(5deg); }
//         }
        
//         @keyframes slideIn {
//           from { transform: translateX(100%) rotate(10deg); opacity: 0; }
//           to { transform: translateX(0) rotate(0deg); opacity: 1; }
//         }
        
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes wink {
//           0%, 100% { transform: scaleY(1); }
//           50% { transform: scaleY(0.1); }
//         }
        
//         @keyframes fall {
//           0% { transform: translateY(-100vh) rotate(0deg); }
//           100% { transform: translateY(100vh) rotate(360deg); }
//         }
        
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-float-delayed { animation: float 8s ease-in-out infinite 1s; }
//         .animate-float-quick { animation: float 4s ease-in-out infinite 2s; }
//         .animate-shake { animation: shake 0.5s ease-in-out infinite; }
//         .animate-bounce { animation: bounce 0.5s ease-in-out infinite; }
//         .animate-slide-in { animation: slideIn 0.5s ease-out; }
//         .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//         .animate-wink { animation: wink 0.5s ease-in-out infinite; }
//         .animate-confetti { animation: fall 3s linear infinite; }
//       `}</style>

//       <AnimatedBackground isCorrect={isCorrect} />
//       <CartoonCharacter isHappy={isCorrect} />
      
//       <div className="max-w-2xl mx-auto">
//         <div className={`bg-white rounded-lg shadow-xl p-6 mb-4 relative z-10 transform transition-transform ${shake ? 'animate-shake' : ''}`}>
//           <div className="mb-4 flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800 hover:scale-105 transition-transform">
//               Climate Quiz
//             </h2>
//             <div className="text-sm text-gray-600 animate-bounce">
//               Question {currentQuestion + 1} of {quizQuestions.length}
//             </div>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
//             <div 
//               className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
//               style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
//             ></div>
//           </div>

//           <div className="mb-6 animate-slide-in">
//             <h3 className="text-xl font-semibold mb-4 hover:text-green-600 transition-colors">
//               {quizQuestions[currentQuestion].question}
//             </h3>
            
//             <div className="space-y-3">
//               {quizQuestions[currentQuestion].options.map((option, index) => {
//                 const currentAttempts = attempts[currentQuestion] || [];
//                 const wasAttempted = currentAttempts.includes(option);
                
//                 return (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerClick(option)}
//                     className={`w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-102 
//                       ${selectedAnswer === option
//                         ? option === quizQuestions[currentQuestion].correctAnswer
//                           ? 'bg-green-100 border-2 border-green-500 animate-bounce'
//                           : 'bg-red-100 border-2 border-red-500 animate-shake'
//                         : wasAttempted && option !== quizQuestions[currentQuestion].correctAnswer
//                           ? 'bg-red-50 text-gray-500'
//                           : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
//                       }`}
//                     disabled={false}  // Never disable buttons to allow multiple attempts
//                   >
//                     <div className="flex items-center">
//                       <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
//                       {option}
//                       {wasAttempted && option !== quizQuestions[currentQuestion].correctAnswer && 
//                         <span className="ml-2 text-red-500">✗</span>
//                       }
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Feedback Messages */}
//           {showAnswer && (
//             <Alert className={`mb-4 transform transition-all duration-300 ${
//               isCorrect ? 'bg-green-100 animate-bounce' : 'bg-red-100 animate-shake'
//             }`}>
//               {isCorrect ? (
//                 <div className="flex items-center">
//                   <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 animate-bounce" />
//                   <AlertDescription>
//                     <span className="font-bold">Correct! 🎉 </span>
//                     {quizQuestions[currentQuestion].funFact}
//                   </AlertDescription>
//                 </div>
//               ) : (
//                 <div className="flex items-center">
//                   <AlertCircle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
//                   <AlertDescription>
//                     <span className="font-bold">Not quite! 🤔 </span>
//                     Keep trying! You'll get it right!
//                   </AlertDescription>
//                 </div>
//               )}
//             </Alert>
//           )}

//           {/* Score and Attempts Display */}
//           <div className="mt-4 text-center space-y-2">
//             <div className="text-gray-600 font-bold transform hover:scale-110 transition-transform">
//               Current Score: {score} / {quizQuestions.length}
//             </div>
//             <div className="text-sm text-gray-500">
//               Attempts this question: {(attempts[currentQuestion] || []).length}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;





















































































import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, Cloud, Sun, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';

const quizQuestions = [
  {
    question: "What should you do if an earthquake happens while you are inside your classroom?",
    options: [
      "Take cover under your desk",
      "Run outside immediately",
      "Stand near a window and watch",
      "Jump up and down",
      "Call your friends to take selfies",
      "Throw your books at the shaking walls"
    ],
    correctAnswer: "Take cover under your desk",
    funFact: "Hiding under a desk protects you from falling objects during an earthquake!"
  },
  {
    question: "How can we reduce air pollution in Kathmandu?",
    options: [
      "Use bicycles or walk instead of riding cars",
      "Burn plastic and garbage to make the air warm",
      "Cut down all trees to create open space",
      "Keep factories running 24/7 with no filters",
      "Only wear masks but do nothing else",
      "Blow a fan towards the sky to push pollution away"
    ],
    correctAnswer: "Use bicycles or walk instead of riding cars",
    funFact: "Fewer cars on the road mean cleaner air for everyone!"
  },
  {
    question: "What is the best way to prepare for floods in Nepal?",
    options: [
      "Build houses on higher ground",
      "Store all your things in the basement",
      "Make paper boats and float on the water",
      "Wait for the water to disappear on its own",
      "Dig holes to hide from the water",
      "Collect the floodwater in buckets"
    ],
    correctAnswer: "Build houses on higher ground",
    funFact: "Living on higher ground keeps people safe from rising floodwaters!"
  },
  {
    question: "Why do we need to plant more trees?",
    options: [
      "They clean the air and give us oxygen",
      "They make our playgrounds messy",
      "They create more shade for sleeping",
      "They scare away birds",
      "They stop Wi-Fi signals",
      "They take up too much space"
    ],
    correctAnswer: "They clean the air and give us oxygen",
    funFact: "Trees absorb carbon dioxide and help fight climate change!"
  },
  {
    question: "What should you do if a fire breaks out in your home?",
    options: [
      "Stay low and find a safe exit",
      "Throw water on an electrical fire",
      "Run around screaming for help",
      "Hide under your bed",
      "Close all doors and windows to trap the fire",
      "Try to put out the fire with a fan"
    ],
    correctAnswer: "Stay low and find a safe exit",
    funFact: "Smoke rises, so staying low helps you breathe cleaner air while escaping!"
  },
  {
    question: "How can we save water at home?",
    options: [
      "Turn off taps when not in use",
      "Keep taps running all day",
      "Take very long showers",
      "Water plants with bottled water only",
      "Wash clothes one at a time in full buckets",
      "Use as much water as possible because it's unlimited"
    ],
    correctAnswer: "Turn off taps when not in use",
    funFact: "Saving water helps during dry seasons and prevents shortages!"
  },
  {
    question: "Which of these helps to reduce plastic pollution?",
    options: [
      "Using cloth or paper bags instead of plastic bags",
      "Throwing plastic into rivers",
      "Burning plastic to make space",
      "Burying plastic deep underground",
      "Collecting plastic and throwing it into a bigger pile",
      "Making all school books out of plastic"
    ],
    correctAnswer: "Using cloth or paper bags instead of plastic bags",
    funFact: "Plastic takes hundreds of years to decompose, so reducing its use helps the environment!"
  },
  {
    question: "What is the safest place to be during a thunderstorm?",
    options: [
      "Inside a strong building",
      "Under a tall tree",
      "In the middle of an open field",
      "On the rooftop of your house",
      "Holding a metal rod in your hand",
      "Standing in a swimming pool"
    ],
    correctAnswer: "Inside a strong building",
    funFact: "Being indoors reduces the risk of being struck by lightning!"
  },
  {
    question: "What can we do to make Kathmandu cleaner?",
    options: [
      "Throw garbage in dustbins",
      "Throw plastic in the river",
      "Leave garbage on the streets",
      "Wait for someone else to clean",
      "Burn trash on roads",
      "Hide garbage under your bed"
    ],
    correctAnswer: "Throw garbage in dustbins",
    funFact: "Proper waste disposal keeps our city clean and healthy!"
  },
  {
    question: "Why is it important to have an emergency kit at home?",
    options: [
      "It helps during disasters like earthquakes and floods",
      "It is fun to collect random things",
      "It makes you feel like a superhero",
      "It’s only for decoration",
      "It attracts thieves",
      "It takes up space for no reason"
    ],
    correctAnswer: "It helps during disasters like earthquakes and floods",
    funFact: "Emergency kits with food, water, and first-aid supplies can save lives!"
  },
  {
    question: "Which of these is a renewable energy source?",
    options: [
      "Solar power from the sun",
      "Petrol from cars",
      "Gas from cooking stoves",
      "Coal from deep underground",
      "Plastic waste burned for heat",
      "Batteries that never run out"
    ],
    correctAnswer: "Solar power from the sun",
    funFact: "Solar energy is clean and never runs out, unlike fossil fuels!"
  },
  {
    question: "What should you do if you see someone littering?",
    options: [
      "Politely remind them to use a dustbin",
      "Ignore them and walk away",
      "Join them and throw more trash",
      "Wait for a government official to stop them",
      "Take their trash home with you",
      "Throw your own trash even farther"
    ],
    correctAnswer: "Politely remind them to use a dustbin",
    funFact: "Encouraging others to keep the environment clean helps everyone!"
  },
  {
    question: "Why do glaciers in Nepal’s mountains matter?",
    options: [
      "They provide water for rivers",
      "They are fun places to play",
      "They make great ice cream factories",
      "They keep Mount Everest cold",
      "They protect us from aliens",
      "They stop the wind from blowing"
    ],
    correctAnswer: "They provide water for rivers",
    funFact: "Melting glaciers affect Nepal’s water supply and can cause floods!"
  }
];

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

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState({});  // Track attempts for each question

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    // Update attempts for current question
    const currentAttempts = attempts[currentQuestion] || [];
    setAttempts({
      ...attempts,
      [currentQuestion]: [...currentAttempts, answer]
    });
    
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer('');
          setShowAnswer(false);
          setIsCorrect(false);
        }
      }, 2000);
    } else {
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setShowAnswer(false);  // Reset feedback for next attempt
        setSelectedAnswer(''); // Reset selection for next attempt
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* <AnimatedBackground /> */}
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 1s; }
        .animate-float-quick { animation: float 4s ease-in-out infinite 2s; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-bounce { animation: bounce 0.5s ease-in-out; }
        .animate-slide-in { animation: slideIn 0.5s ease-out; }
      `}</style>

      <div className="max-w-2xl mx-auto">
        <div className={`bg-white rounded-lg shadow-xl p-6 mb-4 relative z-10 transform transition-transform ${shake ? 'animate-shake' : ''}`}>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 hover:scale-105 transition-transform">
              Climate Quiz
            </h2>
            <div className="text-sm text-gray-600 animate-bounce">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>

          <div className="mb-6 animate-slide-in">
            <h3 className="text-xl font-semibold mb-4 hover:text-green-600 transition-colors">
              {quizQuestions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                const currentAttempts = attempts[currentQuestion] || [];
                const wasAttempted = currentAttempts.includes(option);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-102 
                      ${selectedAnswer === option
                        ? option === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-2 border-green-500 animate-bounce'
                          : 'bg-red-100 border-2 border-red-500 animate-shake'
                        : wasAttempted && option !== quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-red-50 text-gray-500'
                          : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    disabled={false}  // Never disable buttons to allow multiple attempts
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {wasAttempted && option !== quizQuestions[currentQuestion].correctAnswer && 
                        <span className="ml-2 text-red-500">✗</span>
                      }
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Messages */}
          {showAnswer && (
            <Alert className={`mb-4 transform transition-all duration-300 ${
              isCorrect ? 'bg-green-100 animate-bounce' : 'bg-red-100 animate-shake'
            }`}>
              {isCorrect ? (
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 animate-bounce" />
                  <AlertDescription>
                    <span className="font-bold">Correct! 🎉 </span>
                    {quizQuestions[currentQuestion].funFact}
                  </AlertDescription>
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
                  <AlertDescription>
                    <span className="font-bold">Not quite! 🤔 </span>
                    Keep trying! You'll get it right!
                  </AlertDescription>
                </div>
              )}
            </Alert>
          )}

          {/* Score and Attempts Display */}
          <div className="mt-4 text-center space-y-2">
            <div className="text-gray-600 font-bold transform hover:scale-110 transition-transform">
              Current Score: {score} / {quizQuestions.length}
            </div>
            <div className="text-sm text-gray-500">
              Attempts this question: {(attempts[currentQuestion] || []).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;


















































































// import React, { useState, useEffect } from 'react';
// import { AlertCircle, CheckCircle2, Cloud, Sun, Zap, Wind, Droplets, Trees } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// // Sound effects - you'll need to add these audio files to your public folder
// const SOUNDS = {
//   correct: new Audio('/sounds/correct.mp3'),
//   wrong: new Audio('/sounds/wrong.mp3'),
//   hover: new Audio('/sounds/hover.mp3'),
//   complete: new Audio('/sounds/complete.mp3'),
// };

// // Adjust volume
// Object.values(SOUNDS).forEach(sound => {
//   sound.volume = 0.3;
// });

// const quizQuestions = [
//   {
//     question: "What's the most ironic way to combat rising sea levels?",
//     options: [
//       "Build underwater cities and become merpeople",
//       "Start collecting water in giant space buckets",
//       "Plant more trees and reduce carbon emissions",
//       "Train fish to push the water back"
//     ],
//     correctAnswer: "Plant more trees and reduce carbon emissions",
//     funFact: "While becoming merpeople sounds fun, trees are natural carbon sinks and actually help fight climate change!"
//   },
//   {
//     question: "During an earthquake, what should you NOT do?",
//     options: [
//       "Take a selfie with the shaking building",
//       "Start a dance party to match the vibrations",
//       "Drop, cover, and hold on",
//       "Post on social media about how the earth is just vibing"
//     ],
//     correctAnswer: "Drop, cover, and hold on",
//     funFact: "Despite the tempting photo op, safety first! Drop, cover, and hold on is still your best bet."
//   },
//   {
//     question: "What's the primary cause of ocean acidification?",
//     options: [
//       "Underwater volcanoes having a party",
//       "Fish drinking too many carbonated beverages",
//       "Increased CO2 absorption by oceans",
//       "Mermaids practicing their acid jazz"
//     ],
//     correctAnswer: "Increased CO2 absorption by oceans",
//     funFact: "The oceans absorb about 30% of CO2 released into the atmosphere, leading to acidification!"
//   },
//   {
//     question: "Which renewable energy source comes with a built-in disco ball?",
//     options: [
//       "Solar panels (they're just shy)",
//       "Wind turbines doing the spin",
//       "Hydroelectric dams dropping the beat",
//       "Geothermal energy (Earth's hot dance floor)"
//     ],
//     correctAnswer: "Solar panels (they're just shy)",
//     funFact: "While solar panels don't actually disco, they do dance with photons all day long!"
//   },
//   {
//     question: "What's the best way to reduce your carbon footprint?",
//     options: [
//       "Walk everywhere on tippy-toes",
//       "Use sustainable transportation and reduce energy consumption",
//       "Only breathe every other minute",
//       "Paint your footprints green"
//     ],
//     correctAnswer: "Use sustainable transportation and reduce energy consumption",
//     funFact: "The average carbon footprint in the US is 16 tons per person - one of the highest globally!"
//   },
//   {
//     question: "Why are coral reefs turning white?",
//     options: [
//       "They're trying to match the clouds",
//       "Coral bleaching due to rising ocean temperatures",
//       "They're preparing for a winter wedding",
//       "They forgot to reapply sunscreen"
//     ],
//     correctAnswer: "Coral bleaching due to rising ocean temperatures",
//     funFact: "When stressed by temperature changes, corals expel the algae living in their tissues, causing them to turn white!"
//   },
//   {
//     question: "What's the greenhouse effect's favorite party trick?",
//     options: [
//       "Trapping heat in the atmosphere",
//       "Growing tomatoes in winter",
//       "Making actual greenhouses jealous",
//       "Hosting hot yoga sessions"
//     ],
//     correctAnswer: "Trapping heat in the atmosphere",
//     funFact: "Without any greenhouse effect, Earth's average temperature would be about -18°C (0°F)!"
//   },
//   {
//     question: "How do trees communicate with each other?",
//     options: [
//       "Through underground fungal networks",
//       "Tree-mail (like email but slower)",
//       "Leaf semaphore signals",
//       "Bark-tooth bluetooth"
//     ],
//     correctAnswer: "Through underground fungal networks",
//     funFact: "Trees actually do communicate through what scientists call the 'Wood Wide Web'!"
//   },
//   {
//     question: "What's the most effective way to save water?",
//     options: [
//       "Teach fish to walk",
//       "Reduce, reuse, and fix leaky fixtures",
//       "Drink more coffee instead",
//       "Ask clouds to rain less"
//     ],
//     correctAnswer: "Reduce, reuse, and fix leaky fixtures",
//     funFact: "A single leaky faucet can waste up to 3,000 gallons of water per year!"
//   },
//   {
//     question: "Which animal is nature's best recycler?",
//     options: [
//       "Dung beetles rolling with it",
//       "Raccoons dumpster diving",
//       "Squirrels forgetting where they put things",
//       "Pandas being picky eaters"
//     ],
//     correctAnswer: "Dung beetles rolling with it",
//     funFact: "Dung beetles help recycle nutrients, improve soil health, and even navigate using the Milky Way!"
//   },
//   {
//     question: "What's the best way to handle food waste?",
//     options: [
//       "Mail it to Mars",
//       "Compost it for organic fertilizer",
//       "Build a food waste castle",
//       "Start a leftover food museum"
//     ],
//     correctAnswer: "Compost it for organic fertilizer",
//     funFact: "About one-third of all food produced globally goes to waste!"
//   },
//   {
//     question: "How do electric cars dream of electric sheep?",
//     options: [
//       "By counting charging stations",
//       "Through regenerative braking",
//       "They're powered by renewable energy",
//       "By parking under solar panels"
//     ],
//     correctAnswer: "They're powered by renewable energy",
//     funFact: "An electric car charged with renewable energy can reduce emissions by up to 95% compared to gas vehicles!"
//   },
//   {
//     question: "What's the secret ingredient in sustainable fashion?",
//     options: [
//       "Invisible threads",
//       "Recycled and organic materials",
//       "Clothes that photosynthesize",
//       "Self-cleaning fabrics"
//     ],
//     correctAnswer: "Recycled and organic materials",
//     funFact: "The fashion industry accounts for about 10% of global carbon emissions!"
//   },
//   {
//     question: "How do polar bears feel about climate change?",
//     options: [
//       "They're not fans",
//       "They're learning to surf",
//       "They're moving to the suburbs",
//       "They're starting a protest movement"
//     ],
//     correctAnswer: "They're not fans",
//     funFact: "Polar bears are spending more time on land as sea ice decreases, affecting their hunting patterns!"
//   },
//   {
//     question: "What's the most sustainable diet?",
//     options: [
//       "Eating only blue foods",
//       "Plant-based with locally sourced ingredients",
//       "Whatever falls from trees",
//       "Photosynthesis for humans"
//     ],
//     correctAnswer: "Plant-based with locally sourced ingredients",
//     funFact: "A plant-based diet can reduce your food carbon footprint by up to 73%!"
//   },
//   {
//     question: "How do renewable energy sources have fun?",
//     options: [
//       "Solar panels sunbathing",
//       "Wind turbines playing frisbee",
//       "They generate clean electricity",
//       "Hydroelectric dams surfing"
//     ],
//     correctAnswer: "They generate clean electricity",
//     funFact: "Renewable energy provided about 28% of global electricity generation in 2020!"
//   }
// ];

// const FloatingIcon = ({ Icon, className, style }) => (
//   <div className={`absolute ${className}`} style={style}>
//     <Icon className="transition-transform duration-300 hover:scale-125" />
//   </div>
// );

// const AnimatedBackground = () => {
//   const [icons, setIcons] = useState([]);

//   useEffect(() => {
//     const newIcons = [];
//     const iconComponents = [Cloud, Sun, Zap, Wind, Droplets, Trees];
    
//     for (let i = 0; i < 12; i++) {
//       const Icon = iconComponents[Math.floor(Math.random() * iconComponents.length)];
//       const size = Math.random() * 30 + 20;
//       const left = Math.random() * 100;
//       const delay = Math.random() * 5;
//       const duration = Math.random() * 10 + 10;
      
//       newIcons.push({
//         Icon,
//         style: {
//           left: `${left}%`,
//           animation: `float ${duration}s ease-in-out ${delay}s infinite`,
//           fontSize: `${size}px`,
//           opacity: 0.3
//         }
//       });
//     }
    
//     setIcons(newIcons);
//   }, []);

//   return (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none">
//       {icons.map((icon, index) => (
//         <FloatingIcon key={index} {...icon} />
//       ))}
//     </div>
//   );
// };

// const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [score, setScore] = useState(0);
//   const [shake, setShake] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [completed, setCompleted] = useState(false);

//   const handleAnswerClick = (answer) => {
//     setSelectedAnswer(answer);
//     setShowAnswer(true);
    
//     if (answer === quizQuestions[currentQuestion].correctAnswer) {
//       setIsCorrect(true);
//       setScore(score + 1);
//       SOUNDS.correct.play();
      
//       setTimeout(() => {
//         if (currentQuestion < quizQuestions.length - 1) {
//           setCurrentQuestion(currentQuestion + 1);
//           setSelectedAnswer('');
//           setShowAnswer(false);
//           setIsCorrect(false);
//         } else {
//           setCompleted(true);
//           setShowConfetti(true);
//           SOUNDS.complete.play();
//         }
//       }, 2000);
//     } else {
//       setIsCorrect(false);
//       setShake(true);
//       SOUNDS.wrong.play();
//       setTimeout(() => {
//         setShake(false);
//         setShowAnswer(false);
//         setSelectedAnswer('');
//       }, 1000);
//     }
//   };

//   const handleOptionHover = () => {
//     SOUNDS.hover.play();
//   };
// // Previous code remains the same until the Quiz component's return statement...

// return (
//   <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4 relative overflow-hidden">
//     <AnimatedBackground />
    
//     <style jsx global>{`
//       @keyframes float {
//         0%, 100% { transform: translateY(0) rotate(0deg); }
//         50% { transform: translateY(-20px) rotate(5deg); }
//       }
      
//       @keyframes shake {
//         0%, 100% { transform: translateX(0) rotate(0deg); }
//         25% { transform: translateX(-10px) rotate(-5deg); }
//         75% { transform: translateX(10px) rotate(5deg); }
//       }
      
//       @keyframes bounce {
//         0%, 100% { transform: scale(1) rotate(0deg); }
//         50% { transform: scale(1.05) rotate(5deg); }
//       }
      
//       @keyframes slideIn {
//         from { transform: translateX(100%) rotate(10deg); opacity: 0; }
//         to { transform: translateX(0) rotate(0deg); opacity: 1; }
//       }
      
//       @keyframes confetti {
//         0% { transform: translateY(0) rotate(0deg); }
//         100% { transform: translateY(1000px) rotate(720deg); }
//       }
//     `}</style>

//     <div className="max-w-2xl mx-auto">
//       {completed ? (
//         <div className="bg-white rounded-lg shadow-xl p-6 text-center animate-bounce">
//           <h2 className="text-3xl font-bold mb-4">🎉 Quiz Completed! 🎉</h2>
//           <p className="text-xl mb-4">Your Score: {score} / {quizQuestions.length}</p>
//           <p className="text-gray-600">
//             {score === quizQuestions.length 
//               ? "Perfect score! You're a climate expert! 🌟" 
//               : "Great effort! Keep learning about climate change! 🌱"}
//           </p>
//         </div>
//       ) : (
//         <div className={`bg-white rounded-lg shadow-xl p-6 mb-4 relative z-10 transform transition-transform ${shake ? 'animate-shake' : ''}`}>
//           <div className="mb-4 flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800 hover:scale-105 transition-transform">
//               Climate Quiz
//             </h2>
//             <div className="text-sm text-gray-600 animate-bounce">
//               Question {currentQuestion + 1} of {quizQuestions.length}
//             </div>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
//             <div 
//               className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
//               style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
//             ></div>
//           </div>

//           <div className="mb-6 animate-slide-in">
//             <h3 className="text-xl font-semibold mb-4 hover:text-green-600 transition-colors">
//               {quizQuestions[currentQuestion].question}
//             </h3>
            
//             <div className="space-y-3">
//               {quizQuestions[currentQuestion].options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerClick(option)}
//                   onMouseEnter={handleOptionHover}
//                   className={`w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-102 
//                     ${selectedAnswer === option
//                       ? option === quizQuestions[currentQuestion].correctAnswer
//                         ? 'bg-green-100 border-2 border-green-500 animate-bounce'
//                         : 'bg-red-100 border-2 border-red-500 animate-shake'
//                       : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
//                     }`}
//                   disabled={showAnswer}
//                 >
//                   <div className="flex items-center">
//                     <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
//                     {option}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Feedback Messages */}
//           {showAnswer && (
//             <Alert className={`mb-4 transform transition-all duration-300 ${
//               isCorrect ? 'bg-green-100 animate-bounce' : 'bg-red-100 animate-shake'
//             }`}>
//               {isCorrect ? (
//                 <div className="flex items-center">
//                   <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 animate-bounce" />
//                   <AlertDescription>
//                     <span className="font-bold">Correct! 🎉 </span>
//                     {quizQuestions[currentQuestion].funFact}
//                   </AlertDescription>
//                 </div>
//               ) : (
//                 <div className="flex items-center">
//                   <AlertCircle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
//                   <AlertDescription>
//                     <span className="font-bold">Not quite! 🤔 </span>
//                     Try again! You can do it!
//                   </AlertDescription>
//                 </div>
//               )}
//             </Alert>
//           )}

//           {/* Score Display */}
//           <div className="mt-4 text-center">
//             <div className="text-gray-600 font-bold transform hover:scale-110 transition-transform">
//               Current Score: {score} / {quizQuestions.length}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
    
//     {/* Confetti Effect when completed */}
//     {showConfetti && (
//       <div className="fixed inset-0 pointer-events-none">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: '-20px',
//               backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
//               width: '10px',
//               height: '10px',
//               borderRadius: '50%',
//               animation: `confetti ${1 + Math.random() * 2}s linear forwards`,
//               animationDelay: `${Math.random() * 2}s`
//             }}
//           />
//         ))}
//       </div>
//     )}
//   </div>
// );
// };

// export default Quiz;














