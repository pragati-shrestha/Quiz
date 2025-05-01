import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, Trophy, Users, Plus, X, Clock, ChevronLeft } from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';

const SOUNDS = {
  correct: '/sounds/correct.wav',
  wrong: '/sounds/wrong.wav'
};

const quizQuestions = [
  {
    "question": "What should you do if an earthquake happens while you are inside your classroom? / कक्षाभित्र भूकम्प आएमा तपाईंले के गर्नु पर्छ?",
    "options": [
      "Take cover under your desk / आफ्नो डेस्कको तल लुक्नुहोस्",
      "Run outside immediately / सिधै बाहिर दौडिनुहोस्",
      "Stand near a window and watch / झ्यालको नजिक उभिएर हेर्नुहोस्",
      "Jump up and down / उफ्रन थाल्नुहोस्",
      "Call your friends to take selfies / सेल्फी खिच्न साथीहरूलाई बोलाउनुहोस्",
      "Throw your books at the shaking walls / कम्पन भित्तामा किताब फ्याँक्नुहोस्"
    ],
    "correctAnswer": "Take cover under your desk / आफ्नो डेस्कको तल लुक्नुहोस्",
    "funFact": "Hiding under a desk protects you from falling objects during an earthquake! / डेस्कको तल लुक्दा भूकम्पको बेला खस्न सक्ने वस्तुहरूबाट सुरक्षा मिल्छ!"
  },
  {
    "question": "Which gas is mainly responsible for global warming? / ग्लोबल वार्मिङको लागि मुख्य जिम्मेवार ग्यास कुन हो?",
    "options": [
      "Carbon dioxide / कार्बन डाइअक्साइड",
      "Oxygen / अक्सिजन",
      "Nitrogen / नाइट्रोजन",
      "Helium / हेलियम",
      "Hydrogen / हाइड्रोजन",
      "Neon / निओन"
    ],
    "correctAnswer": "Carbon dioxide / कार्बन डाइअक्साइड",
    "funFact": "Carbon dioxide traps heat in the atmosphere, causing the Earth to warm up. / कार्बन डाइअक्साइडले वातावरणमा ताप रोक्छ, जसले गर्दा पृथ्वी तातिन्छ।"
  },
  {
    question: "What is a common cause of landslides in Nepal? / नेपालमा पहिरोको सामान्य कारण के हो?",
    options: [
      "Heavy rainfall / धेरै वर्षा",
      "Loud music / ठूलो आवाजको संगीत",
      "Traffic jam / ट्राफिक जाम",
      "Too many trees / धेरै रूखहरू",
      "Street lights / सडक बत्तीहरू",
      "Sunny weather / घाम लाग्ने मौसम"
    ],
    correctAnswer: "Heavy rainfall / धेरै वर्षा",
    funFact: "In Nepal, heavy rain during the monsoon season often causes landslides. / नेपालमा मनसुनको समयमा धेरै वर्षा हुँदा प्रायः पहिरो आउँछ।"
  },
  {
    question: "Which of these is a renewable source of energy? / यीमध्ये कुन नवीकरणीय ऊर्जा स्रोत हो?",
    options: [
      "Solar energy / सौर्य ऊर्जा",
      "Petrol / पेट्रोल",
      "Diesel / डिजेल",
      "Coal / कोइला",
      "Natural gas / प्राकृतिक ग्यास",
      "Plastic / प्लास्टिक"
    ],
    correctAnswer: "Solar energy / सौर्य ऊर्जा",
    funFact: "Solar energy is clean and comes from the sun. It's free and unlimited! / सौर्य ऊर्जा सफा हुन्छ र सूर्यबाट प्राप्त हुन्छ। यो निःशुल्क र असीमित हो!"
  },
  {
    question: "What is the best way to reduce plastic pollution? / प्लास्टिक प्रदूषण घटाउने सबैभन्दा राम्रो उपाय के हो?",
    options: [
      "Use reusable bags / पुनः प्रयोग गर्न मिल्ने झोला प्रयोग गर्नुहोस्",
      "Throw plastics in rivers / प्लास्टिकलाई नदीमा फ्याँक्नुहोस्",
      "Burn plastic waste / प्लास्टिक जलाउनुहोस्",
      "Use more bottled water / बोतलको पानी धेरै प्रयोग गर्नुहोस्",
      "Bury plastics underground / प्लास्टिक जमिनमा गाड्नुहोस्",
      "Ignore plastic waste / प्लास्टिकको फोहोरलाई बेवास्ता गर्नुहोस्"
    ],
    correctAnswer: "Use reusable bags / पुनः प्रयोग गर्न मिल्ने झोला प्रयोग गर्नुहोस्",
    funFact: "Reusable bags help reduce plastic waste and keep our environment clean. / पुनः प्रयोग हुने झोलाले प्लास्टिक फोहोर कम गर्न मद्दत गर्छ र वातावरण सफा राख्छ।"
  },
  {
    question: "Which natural disaster is common in the Himalayan region of Nepal? / नेपालको हिमाली क्षेत्रमा कुन प्राकृतिक विपद् सामान्य छ?",
    options: [
      "Landslide / पहिरो",
      "Tsunami / सुनामी",
      "Volcano / ज्वालामुखी",
      "Sandstorm / धुलोको हुरी",
      "Cyclone / चक्रीय आँधी",
      "Desert flood / मरुभूमिको बाढी"
    ],
    correctAnswer: "Landslide / पहिरो",
    funFact: "Landslides often occur in the mountains due to heavy rainfall or earthquakes. / पहिरो प्रायः धेरै वर्षा वा भूकम्पका कारण हिमालमा हुन्छ।"
  },
  {
    question: "What is the safest action during a lightning storm? / चट्याङ परेको बेला सबैभन्दा सुरक्षित काम के हो?",
    options: [
      "Stay indoors and away from windows / भित्र बस्नुहोस् र झ्यालबाट टाढा रहनुहोस्",
      "Stand under a tree / रुख मुनि उभिनुहोस्",
      "Swim in the river / खोलामा पौडिनुहोस्",
      "Hold a metal rod / फलाम समाउनुहोस्",
      "Run on an open field / खुला मैदानमा दौडिनुहोस्",
      "Climb to a high place / अग्लो ठाउँमा जानुहोस्"
    ],
    correctAnswer: "Stay indoors and away from windows / भित्र बस्नुहोस् र झ्यालबाट टाढा रहनुहोस्",
    funFact: "Lightning often strikes tall objects like trees and poles. / चट्याङ प्रायः अग्ला वस्तुमा लाग्छ।"
  },
  {
    question: "Why are forests important for the environment? / वातावरणका लागि वन किन आवश्यक छन्?",
    options: [
      "They produce oxygen / अक्सिजन उत्पादन गर्छन्",
      "They increase pollution / प्रदूषण बढाउँछन्",
      "They block rivers / खोला रोक्छन्",
      "They stop rainfall / वर्षा रोक्छन्",
      "They make noise / आवाज गर्छन्",
      "They use too much water / धेरै पानी खपत गर्छन्"
    ],
    correctAnswer: "They produce oxygen / अक्सिजन उत्पादन गर्छन्",
    funFact: "Forests act as the lungs of the planet. / वन पृथ्वीका फोक्सो हुन्।"
  },
  {
    question: "What causes floods during heavy rainfall in cities? / शहरमा भारी वर्षाको समयमा बाढी किन आउँछ?",
    options: [
      "Blocked drainage / नालीहरू रोकिएको हुन्छ",
      "Too many trees / धेरै रूखहरू भएकोले",
      "Cold weather / चिसो मौसमको कारण",
      "Traffic jams / ट्राफिक जामका कारण",
      "Sunshine / घाम लागेकाले",
      "More shops / धेरै पसल भएकाले"
    ],
    correctAnswer: "Blocked drainage / नालीहरू रोकिएको हुन्छ",
    funFact: "Keeping drains clean helps prevent urban floods. / नाली सफा राख्दा शहरमा बाढीबाट जोगिन सकिन्छ।"
  },
  {
    question: "What is global warming? / ग्लोबल वार्मिङ भन्नाले के जनाउँछ?",
    options: [
      "Earth getting hotter / पृथ्वी तातो हुँदै जानु",
      "More people on Earth / पृथ्वीमा धेरै मानिस हुनु",
      "More rain / धेरै वर्षा हुनु",
      "Less sunshine / कम घाम लाग्नु",
      "Trees growing faster / रूखहरू छिटो बढ्नु",
      "Fewer floods / कम बाढी आउनु"
    ],
    correctAnswer: "Earth getting hotter / पृथ्वी तातो हुँदै जानु",
    funFact: "Global warming melts glaciers and raises sea levels. / ग्लोबल वार्मिङले हिउँ पगाल्छ र समुद्र सतह बढाउँछ।"
  },
  {
    question: "What should you include in an emergency kit? / आकस्मिक किटमा के-के राख्नु पर्छ?",
    options: [
      "Water and first aid / पानी र प्राथमिक उपचार",
      "Toys and balloons / खेलौना र फुका",
      "Smartphone charger only / केवल चार्जर",
      "Snacks and sunglasses / खाजा र चस्मा",
      "Fancy clothes / झिलीमिली लुगा",
      "Paint and brushes / रंग र ब्रश"
    ],
    correctAnswer: "Water and first aid / पानी र प्राथमिक उपचार",
    funFact: "An emergency kit helps you stay safe during disasters. / आपतकालीन किट विपद् बेला तपाईलाई सुरक्षित राख्छ।"
  },
  {
    question: "Which of the following helps prevent soil erosion? / तलमध्ये कुनले माटो बग्नबाट रोक्छ?",
    options: [
      "Planting trees / रूख रोप्नु",
      "Throwing garbage / फोहोर फाल्नु",
      "Burning forests / जंगल जलाउनु",
      "Building malls / मल निर्माण गर्नु",
      "Digging rivers / खोला खन्नु",
      "Paving the land / जमिन पक्की बनाउनु"
    ],
    correctAnswer: "Planting trees / रूख रोप्नु",
    funFact: "Tree roots hold the soil in place and prevent erosion. / रूखको जराले माटो समातेर राख्छ।"
  },
  {
    question: "Which area of Nepal is more prone to landslides? / नेपालको कुन क्षेत्र पहिरोको जोखिममा बढी हुन्छ?",
    options: [
      "Hilly region / पहाडी क्षेत्र",
      "Terai region / तराई क्षेत्र",
      "Mountain peaks / हिमाल चुचुरा",
      "Valleys / उपत्यकाहरू",
      "Lakes / तालहरू",
      "Desert areas / मरुभूमि क्षेत्र"
    ],
    correctAnswer: "Hilly region / पहाडी क्षेत्र",
    funFact: "Nepal’s hills are prone to landslides due to steep slopes and rainfall. / नेपालको पहाडमा झुकाव धेरै र वर्षा बढी हुने भएकाले पहिरो बढी आउँछ।"
  },
  {
    question: "Which gas is mainly responsible for climate change? / जलवायु परिवर्तनका लागि मुख्य जिम्मेवार ग्याँस कुन हो?",
    options: [
      "Carbon dioxide / कार्बन डाइअक्साइड",
      "Oxygen / अक्सिजन",
      "Nitrogen / नाइट्रोजन",
      "Hydrogen / हाइड्रोजन",
      "Helium / हीलियम",
      "Water vapor / जल वाष्प"
    ],
    correctAnswer: "Carbon dioxide / कार्बन डाइअक्साइड",
    funFact: "CO₂ traps heat and warms the planet. / कार्बन डाइअक्साइडले तातो समाएर पृथ्वीलाई तातो बनाउँछ।"
  },
  {
    question: "What should you do if you smell gas leak at home? / घरमा ग्यास गन्हाएमा के गर्नु पर्छ?",
    options: [
      "Open all windows and doors / सबै झ्याल ढोका खोल्नुहोस्",
      "Light a matchstick / सल्काउने प्रयास गर्नुहोस्",
      "Turn on the fan / पंखा चलाउनुहोस्",
      "Use your mobile near it / मोबाइल चलाउनुहोस् ग्यास नजिक",
      "Shout at others / अरूलाई कराउनुहोस्",
      "Cover your face with a blanket / ओढ्ने ओढेर बस्नुहोस्"
    ],
    correctAnswer: "Open all windows and doors / सबै झ्याल ढोका खोल्नुहोस्",
    funFact: "Fresh air helps to release leaked gas safely. / ताजा हावाले ग्यास बाहिर जान मद्दत गर्छ।"
  },
  {
    question: "Which organization helps with disaster relief in Nepal? / नेपालमा विपद् व्यवस्थापनमा सहयोग गर्ने संस्था कुन हो?",
    options: [
      "Nepal Red Cross Society / नेपाल रेडक्रस संस्था",
      "Cricket Association of Nepal / क्रिकेट संघ",
      "Film Development Board / चलचित्र बोर्ड",
      "Nepal Rastra Bank / नेपाल राष्ट्र बैंक",
      "Nepal Airlines / नेपाल एयरलाइन्स",
      "Nepal Television / नेपाल टेलिभिजन"
    ],
    correctAnswer: "Nepal Red Cross Society / नेपाल रेडक्रस संस्था",
    funFact: "Nepal Red Cross helps with rescue and emergency supplies. / नेपाल रेडक्रसले उद्धार र राहत सामग्री उपलब्ध गराउँछ।"
  },
  {
    question: "Which one is a man-made cause of climate change? / जलवायु परिवर्तनको मानव-निर्मित कारण कुन हो?",
    options: [
      "Burning fossil fuels / इन्धन जलाउनु",
      "Sun rising in the east / सूर्य पूर्वबाट उग्नु",
      "Moonlight / जुनको उज्यालो",
      "Wind blowing / हावा चल्नु",
      "Rivers flowing / खोलाको बग्ने",
      "Earthquakes / भूकम्प आउनु"
    ],
    correctAnswer: "Burning fossil fuels / इन्धन जलाउनु",
    funFact: "Burning fuels like coal and petrol releases greenhouse gases. / कोइला र पेट्रोल जलेपछि ग्रीनहाउस ग्याँस निस्कन्छ।"
  },
  {
    question: "Which of the following is an example of disaster preparedness? / तलमध्ये कुन विपद् पूर्वतयारीको उदाहरण हो?",
    options: [
      "Doing earthquake drills / भूकम्प अभ्यास गर्नु",
      "Ignoring weather warnings / मौसम पूर्वानुमान बेवास्ता गर्नु",
      "Building houses without plans / योजना बिना घर बनाउनु",
      "Littering in rivers / खोलामा फोहोर फाल्नु",
      "Cutting trees / रूख काट्नु",
      "Swimming in flood water / बाढीको पानीमा पौडनु"
    ],
    correctAnswer: "Doing earthquake drills / भूकम्प अभ्यास गर्नु",
    funFact: "Practice makes people ready during real disasters. / अभ्यासले विपद् बेला सजग बनाउँछ।"
  },
  {
    question: "What is a safe place during a thunderstorm? / चट्याङ परेको बेला सुरक्षित ठाउँ कुन हो?",
    options: [
      "Inside a concrete building / सिमेन्टको भवन भित्र",
      "Under a metal pole / फलामे पोलमुनि",
      "On a rooftop / घरको छतमाथि",
      "Near a swimming pool / पौडी पोखरी नजिक",
      "Open playground / खुला खेलमैदान",
      "Under a tree / रुख मुनि"
    ],
    correctAnswer: "Inside a concrete building / सिमेन्टको भवन भित्र",
    funFact: "Concrete buildings protect you from lightning strikes. / पक्का घरले चट्याङबाट बचाउँछ।"
  },
  {
    question: "What is a glacier? / ग्लेशियर भन्नाले के जनाउँछ?",
    options: [
      "Large body of moving ice / बग्ने ठूलो हिउँ",
      "Sand dune / बालुवाको ढिस्को",
      "Hill made of stones / ढुङ्गाको पहाड",
      "River full of water / पानीले भरिएको खोला",
      "Lake without water / पानी नभएको ताल",
      "Snowman / हिउँ मान्छे"
    ],
    correctAnswer: "Large body of moving ice / बग्ने ठूलो हिउँ",
    funFact: "Nepal has many glaciers in the Himalayas. / नेपालका हिमालमा धेरै ग्लेशियर छन्।"
  },
  {
    question: "What is the best way to reduce climate change? / जलवायु परिवर्तन घटाउने सबैभन्दा राम्रो उपाय कुन हो?",
    options: [
      "Use clean energy like solar / सौर्य जस्ता सफा ऊर्जा प्रयोग गर्नु",
      "Use more cars / धेरै गाडी प्रयोग गर्नु",
      "Cut all trees / सबै रूख काट्नु",
      "Burn garbage / फोहोर जलाउनु",
      "Avoid planting anything / केही पनि नरोप्नु",
      "Waste electricity / बिजुली फाल्नु"
    ],
    correctAnswer: "Use clean energy like solar / सौर्य जस्ता सफा ऊर्जा प्रयोग गर्नु",
    funFact: "Solar and wind energy reduce pollution and protect the Earth. / सौर्य र हावाबाट उत्पन्न उर्जाले प्रदूषण घटाउँछ।"
  },
  {
    question: "Which one is a renewable source of energy? / तलमध्ये कुन नवीकरणीय ऊर्जा स्रोत हो?",
    options: [
      "Solar energy / सौर्य ऊर्जा",
      "Petrol / पेट्रोल",
      "Coal / कोइला",
      "Natural gas / प्राकृतिक ग्याँस",
      "Diesel / डिजेल",
      "Plastic / प्लास्टिक"
    ],
    correctAnswer: "Solar energy / सौर्य ऊर्जा",
    funFact: "Renewable energy sources never run out! / नवीकरणीय ऊर्जा स्रोत कहिल्यै सकिँदैनन्!"
  },
  {
    question: "What can happen if there is too much rain for many days? / धेरै दिनसम्म धेरै वर्षा भयो भने के हुन सक्छ?",
    options: [
      "Flood / बाढी",
      "Drought / खडेरी",
      "Earthquake / भूकम्प",
      "Volcano / ज्वालामुखी",
      "Snowfall / हिमपात",
      "Tsunami / सुनामी"
    ],
    correctAnswer: "Flood / बाढी",
    funFact: "Too much rain can overflow rivers and flood areas. / धेरै पानीले नदी नदाहरू बगेर बाढी आउन सक्छ।"
  },
  {
    question: "What can you do to help the Earth? / पृथ्वीलाई जोगाउन तपाईंले के गर्न सक्नुहुन्छ?",
    options: [
      "Plant trees / रूख रोप्नु",
      "Waste water / पानी फाल्नु",
      "Use plastic bags / प्लास्टिक झोला प्रयोग गर्नु",
      "Throw trash anywhere / जहाँतही फोहोर फाल्नु",
      "Burn tires / टायर जलाउनु",
      "Cut down forests / जङ्गल काट्नु"
    ],
    correctAnswer: "Plant trees / रूख रोप्नु",
    funFact: "Trees absorb CO₂ and keep the planet cool. / रूखले CO₂ सोस्छ र पृथ्वी चिसो राख्छ।"
  },
  {
    question: "Which animals are losing homes due to melting glaciers? / ग्लेशियर पग्लँदा कुन जनावरको बासस्थान हराउँदैछ?",
    options: [
      "Snow leopards / हिउँ चितुवा",
      "Lions / सिंह",
      "Elephants / हात्ती",
      "Peacocks / मयूर",
      "Zebras / जेब्रा",
      "Cows / गाई"
    ],
    correctAnswer: "Snow leopards / हिउँ चितुवा",
    funFact: "Melting glaciers are threatening snow leopards’ habitats in the Himalayas. / ग्लेशियर पग्लँदा हिमाली क्षेत्रका हिउँ चितुवाको बासस्थान हराउँदैछ।"
  },
  {
    question: "Why should we save electricity? / हामीले बिजुली किन बचाउनु पर्छ?",
    options: [
      "To reduce pollution / प्रदूषण घटाउन",
      "To make lights more colorful / बत्ती रंगीन बनाउन",
      "So we can sleep more / धेरै सुत्न",
      "To get more homework / बढी गृहकार्य पाउन",
      "Because it’s fun / किनभने रमाइलो हुन्छ",
      "So we can shout louder / ठूलो आवाजमा कराउन"
    ],
    correctAnswer: "To reduce pollution / प्रदूषण घटाउन",
    funFact: "Saving electricity means less burning of fuels and less air pollution. / बिजुली बचाउँदा इन्धन कम बालिन्छ र हावा कम प्रदूषित हुन्छ।"
  },
  {
    question: "What is a disaster management plan? / विपद् व्यवस्थापन योजना भनेको के हो?",
    options: [
      "Plan to stay safe during disasters / विपद् आउँदा सुरक्षित रहने योजना",
      "Plan for a birthday party / जन्मदिनको योजना",
      "Plan to skip school / स्कुल नजाने योजना",
      "Plan to play video games / भिडियो गेम खेल्ने योजना",
      "Plan to go shopping / किनमेलको योजना",
      "Plan to sleep all day / दिनभर सुत्ने योजना"
    ],
    correctAnswer: "Plan to stay safe during disasters / विपद् आउँदा सुरक्षित रहने योजना",
    funFact: "Having a plan saves lives during emergencies. / योजना तयार हुँदा आपत् बेला जीवन जोगिन सक्छ।"
  },
  {
    question: "What should you do if you are caught in a flood? / यदि तपाईं बाढीमा अड्किनुभयो भने के गर्नु पर्छ?",
    options: [
      "Climb to higher ground / उच्च स्थानमा चढ्नु",
      "Swim in the floodwater / बाढीको पानीमा पौडी खेल्नु",
      "Wait in the water / पानीमा पर्खनु",
      "Go outside and play / बाहिर जानु र खेल्नू",
      "Run into the water / पानीमा दौडिनु",
      "Call friends to join you / साथीलाई बोलाउनु"
    ],
    correctAnswer: "Climb to higher ground / उच्च स्थानमा चढ्नु",
    funFact: "Staying in high ground helps avoid floodwaters. / उच्च स्थानमा बस्दा बाढीको पानीबाट जोगिन सकिन्छ।"
  },
  {
    question: "What is a cyclone? / चक्रीवात भनेको के हो?",
    options: [
      "A strong wind storm / एक बलियो हावाहुरी",
      "A heavy rain storm / एक भारी वर्षाका बादल",
      "A type of snowstorm / हिमपातको प्रकार",
      "A gentle breeze / एक सौम्य हावा",
      "A cloud in the sky / आकाशमा बादल",
      "A small whirlpool / सानो घुम्ने पानी"
    ],
    correctAnswer: "A strong wind storm / एक बलियो हावाहुरी",
    funFact: "Cyclones can cause heavy damage to homes and trees. / चक्रीवातले घर र रूखलाई धेरै क्षति पुर्याउन सक्छ।"
  },
  {
    question: "What should you do before a flood arrives? / बाढी आउनु भन्दा पहिले के गर्नु पर्छ?",
    options: [
      "Prepare an emergency kit / आपतकालीन सामान तयारी गर्नु",
      "Leave your home / तपाईंको घर जानु",
      "Ignore warnings / चेतावनी बेवास्ता गर्नु",
      "Go swimming / पौडी खेल्न जानु",
      "Pack your things to go shopping / किनमेल जानका लागि सामान प्याक गर्नु",
      "Dance in the rain / वर्षामा नाच्नु"
    ],
    correctAnswer: "Prepare an emergency kit / आपतकालीन सामान तयारी गर्नु",
    funFact: "Having an emergency kit can save your life during disasters. / आपतकालीन किट राख्दा विपद् बेला ज्यान जोगाउन सक्छ।"
  },
  {
    question: "Which of the following can help prevent global warming? / तलको कुन चिजले विश्वव्यापी तातो बढ्ने समस्यालाई रोक्न मद्दत पुर्याउँछ?",
    options: [
      "Planting trees / रूखहरू रोप्नु",
      "Using more plastic / बढी प्लास्टिक प्रयोग गर्नु",
      "Burning coal / कोइला बाल्नु",
      "Cutting forests / जङ्गल काट्नु",
      "Driving cars all the time / सधैँ गाडी चलाउनु",
      "Wasting water / पानी फाल्नु"
    ],
    correctAnswer: "Planting trees / रूखहरू रोप्नु",
    funFact: "Trees absorb carbon dioxide and help cool the Earth. / रूखहरूले कार्बन डाइअक्साइड सोस्छ र पृथ्वी चिसो राख्न मद्दत गर्छ।"
  },
  {
    question: "What is the main cause of climate change? / जलवायु परिवर्तनको मुख्य कारण के हो?",
    options: [
      "Pollution from factories / कारखानाबाट प्रदूषण",
      "Using renewable energy / नवीकरणीय ऊर्जा प्रयोग गर्नु",
      "Eating vegetables / तरकारी खाना",
      "Drinking clean water / सफा पानी पिउनु",
      "Walking instead of driving / गाडी चलाउनुको सट्टा हिँड्नु",
      "Reducing plastic use / प्लास्टिकको प्रयोग घटाउनु"
    ],
    correctAnswer: "Pollution from factories / कारखानाबाट प्रदूषण",
    funFact: "Factories release gases that trap heat, causing global warming. / कारखानाबाट निस्कने ग्यासले तातो समेट्छ र विश्वव्यापी तातो बढाउँछ।"
  },
  {
    question: "What is a safe place to go during an earthquake? / भूकम्पको समयमा कहाँ जानु सुरक्षित हुन्छ?",
    options: [
      "Under a table / मेचु निचे",
      "Near windows / झ्यालको नजिक",
      "On top of a tall building / अग्लो भवनको माथि",
      "Outside on the street / सडकमा बाहिर",
      "In the middle of a big open field / ठूलो खुला खेतको बीचमा",
      "In an elevator / लिफ्टमा"
    ],
    correctAnswer: "Under a table / मेचु निचे",
    funFact: "Taking shelter under furniture can protect you from falling debris. / फर्निचरको मुनि लुकेर तपाईंले ढल्ने सामानबाट सुरक्षा पाउन सक्नुहुन्छ।"
  },
  {
    question: "What is the safest thing to do during a cyclone? / चक्रीवातको समयमा के सबैभन्दा सुरक्षित कुरा गर्नु पर्छ?",
    options: [
      "Stay indoors and stay away from windows / घरको भित्र बस्नु र झ्यालबाट टाढा रहनु",
      "Go outside and play / बाहिर जानु र खेल्नू",
      "Swim in the storm / आँधीमा पौडी खेल्नु",
      "Stand under a tree / रूखको मुनि उभिनु",
      "Drive through the storm / आँधीको बीचमा गाडी चलाउनु",
      "Climb a hill / पहाड चढ्नु"
    ],
    correctAnswer: "Stay indoors and stay away from windows / घरको भित्र बस्नु र झ्यालबाट टाढा रहनु",
    funFact: "Cyclones bring strong winds and flying debris, so staying indoors is safest. / चक्रीवातले बलियो हावा र उडिरहेका सामान ल्याउँछ, त्यसैले घर भित्र बस्नु सुरक्षित हुन्छ।"
  },
  {
    question: "What can you do to help during a disaster? / विपद्को समयमा तपाईं के सहयोग गर्न सक्नुहुन्छ?",
    options: [
      "Help others by giving food and water / अरूलाई खाना र पानी दिई सहयोग गर्नु",
      "Ignore the situation / परिस्थितिलाई बेवास्ता गर्नु",
      "Create more problems / थप समस्या सिर्जना गर्नु",
      "Take pictures and post on social media / तस्वीर खिचेर सोसल मिडियामा पोष्ट गर्नु",
      "Run away from the disaster zone / विपद्को क्षेत्रबाट भाग्नु",
      "Stay calm and do nothing / शान्त बस्नु र केही नगर्नु"
    ],
    correctAnswer: "Help others by giving food and water / अरूलाई खाना र पानी दिई सहयोग गर्नु",
    funFact: "Helping others in times of need can save lives. / अरूलाई सहयोग गर्दा ज्यान जोगाउन सकिन्छ।"
  },
];

const TeamSetup = ({ onStart }) => {
  const [teams, setTeams] = useState([{ name: '', members: '' }]);
  const [error, setError] = useState('');

  const handleTeamChange = (index, field, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index][field] = value;
    setTeams(updatedTeams);
  };

  const addTeam = () => {
    if (teams.length < 5) {
      setTeams([...teams, { name: '', members: '' }]);
    }
  };

  const removeTeam = (index) => {
    if (teams.length > 1) {
      const updatedTeams = teams.filter((_, i) => i !== index);
      setTeams(updatedTeams);
    }
  };

  const startQuiz = () => {
    const incompleteTeams = teams.some(team => !team.name.trim() || !team.members.trim());
    if (incompleteTeams) {
      setError('Please fill in all team names and members');
      return;
    }
    setError('');
    onStart(teams);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
        <Users className="mr-3 w-8 h-8 text-blue-600" /> Team Setup
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {teams.map((team, index) => (
          <div key={index} className="p-6 border-2 border-blue-100 rounded-xl bg-gradient-to-br from-blue-50 to-white relative">
            {teams.length > 1 && (
              <button 
                onClick={() => removeTeam(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow"
              >
                <X size={18} />
              </button>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Team {index + 1} Name
              </label>
              <input
                type="text"
                value={team.name}
                onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={`Team ${index + 1} name`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Team Members
              </label>
              <input
                type="text"
                value={team.members}
                onChange={(e) => handleTeamChange(index, 'members', e.target.value)}
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Member 1, Member 2, ..."
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        {teams.length < 5 && (
          <button
            onClick={addTeam}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg bg-blue-50 transition-colors"
          >
            <Plus size={18} className="mr-2" /> Add Team
          </button>
        )}
        
        <div className="flex-1"></div>
        
        <button
          onClick={startQuiz}
          className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          Start Quiz <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
      
      {error && (
        <div className="mt-4 text-red-500 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

const QuizGame = ({ teams, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scores, setScores] = useState(teams.map(() => 0));
  const [currentTeam, setCurrentTeam] = useState(0);
  const [shake, setShake] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [originalTeam, setOriginalTeam] = useState(0);
  const timerRef = useRef(null);
  
  const correctAudioRef = useRef(new Audio(SOUNDS.correct));
  const wrongAudioRef = useRef(new Audio(SOUNDS.wrong));

  useEffect(() => {
    [correctAudioRef.current, wrongAudioRef.current].forEach(audio => {
      audio.volume = 0.3;
    });

    return () => {
      [correctAudioRef.current, wrongAudioRef.current].forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  const playSound = (type) => {
    const audio = type === 'correct' ? correctAudioRef.current : wrongAudioRef.current;
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const startTimer = (duration) => {
    setTimeLeft(duration);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerActive, currentTeam]);

  useEffect(() => {
    startTimer(60);
    setOriginalTeam(currentTeam);
  }, [currentQuestion]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setShowAnswer(true);
    setIsCorrect(false);
    setSelectedAnswer('Time Up!');
    
    setTimeout(() => {
      const nextTeam = (currentTeam + 1) % teams.length;
      
      if (nextTeam === originalTeam) {
        if (currentQuestion < quizQuestions.length - 1) {
          nextQuestion();
        } else {
          endGame();
        }
      } else {
        setCurrentTeam(nextTeam);
        setShowAnswer(false);
        setSelectedAnswer('');
        startTimer(35);
      }
    }, 4000);
  };

  const handleAnswerClick = (answer) => {
    stopTimer();
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      playSound('correct');
      setIsCorrect(true);
      const newScores = [...scores];
      newScores[currentTeam] += 1;
      setScores(newScores);
      
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          nextQuestion();
        } else {
          endGame();
        }
      }, 4000);
    } else {
      playSound('wrong');
      setIsCorrect(false);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setShowAnswer(false);
        setSelectedAnswer('');
        const nextTeam = (currentTeam + 1) % teams.length;
        setCurrentTeam(nextTeam);
        
        if (nextTeam === originalTeam) {
          setShowAnswer(true);
          setIsCorrect(false);
          setSelectedAnswer('No team answered correctly!');
          setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
              nextQuestion();
            } else {
              endGame();
            }
          }, 4000);
        } else {
          startTimer(35);
        }
      }, 1000);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer('');
    setShowAnswer(false);
    setIsCorrect(false);
    setCurrentTeam((currentTeam + 1) % teams.length);
  };

  const endGame = () => {
    setGameOver(true);
  };

  const resetGame = () => {
    onFinish();
  };

  if (gameOver) {
    const maxScore = Math.max(...scores);
    const winningTeams = teams.filter((_, index) => scores[index] === maxScore);
    
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
          <Trophy className="mr-3 w-8 h-8 text-yellow-500" /> Quiz Results
        </h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            {winningTeams.length > 1 ? "It's a tie!" : "We have a winner!"}
          </h3>
          
          {winningTeams.map((team, index) => (
            <div key={index} className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-8 border-yellow-500 p-6 mb-6 rounded-r-lg shadow-md">
              <h4 className="font-bold text-2xl text-yellow-800">{team.name}</h4>
              <p className="text-yellow-700 text-lg">{team.members}</p>
              <p className="font-bold mt-3 text-xl">Score: {maxScore}/{quizQuestions.length}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <h4 className="font-semibold text-xl mb-4 text-center">All Teams:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl shadow-sm ${scores[index] === maxScore ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50 border border-gray-200'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-lg">{team.name}</span>
                    <p className="text-sm text-gray-600">{team.members}</p>
                  </div>
                  <span className="font-bold text-xl">{scores[index]} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={resetGame}
            className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="mr-2 w-5 h-5" /> Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm font-medium mb-1">Current Team</div>
            <div className="text-2xl font-bold mb-2">{teams[currentTeam].name}</div>
            <div className="text-sm opacity-90 mb-4">{teams[currentTeam].members}</div>
            
            <div className="flex items-center justify-between bg-blue-900 bg-opacity-30 rounded-lg p-3">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-mono text-xl">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="text-sm">
                {currentTeam === originalTeam ? "First Chance" : "Pass Chance"}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Scoreboard</h3>
            <div className="space-y-3">
              {teams.map((team, index) => (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${index === currentTeam ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'}`}
                >
                  <div>
                    <div className="font-medium">{team.name}</div>
                    <div className="text-xs text-gray-500">{team.members}</div>
                  </div>
                  <div className="font-bold text-lg">{scores[index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className={`bg-white rounded-2xl shadow-xl p-6 h-full transform transition-transform ${shake ? 'animate-shake' : ''}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Climate Quiz
              </h2>
              <div className="text-sm text-gray-600 animate-bounce bg-blue-100 px-3 py-1 rounded-full">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-1000 ease-in-out"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                {quizQuestions[currentQuestion].question}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={showAnswer}
                    className={`p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] 
                      ${selectedAnswer === option
                        ? option === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-100 border-2 border-green-500 animate-bounce'
                          : 'bg-red-100 border-2 border-red-500 animate-shake'
                        : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showAnswer && (
              <Alert className={`rounded-xl mb-4 transform transition-all duration-300 ${
                isCorrect ? 'bg-green-100 border-green-500 animate-bounce' : 
                selectedAnswer === 'Time Up!' || selectedAnswer === 'No team answered correctly!' ? 
                'bg-purple-100 border-purple-500' : 'bg-red-100 border-red-500 animate-shake'
              }`}>
                {isCorrect ? (
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 animate-bounce" />
                    <AlertDescription>
                      <span className="font-bold">Correct! 🎉 </span>
                      {quizQuestions[currentQuestion].funFact}
                    </AlertDescription>
                  </div>
                ) : selectedAnswer === 'Time Up!' ? (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
                    <AlertDescription>
                      <span className="font-bold">Time's Up! ⏰ </span>
                      Passing to next team...
                    </AlertDescription>
                  </div>
                ) : selectedAnswer === 'No team answered correctly!' ? (
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
                    <AlertDescription>
                      <span className="font-bold">No correct answers! </span>
                      The right answer was: {quizQuestions[currentQuestion].correctAnswer}
                    </AlertDescription>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
                    <AlertDescription>
                      <span className="font-bold">Incorrect! </span>
                      Next team's turn!
                    </AlertDescription>
                  </div>
                )}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [teams, setTeams] = useState([]);

  const startGame = (teamData) => {
    setTeams(teamData);
    setGameStarted(true);
  };

  const finishGame = () => {
    setGameStarted(false);
    setTeams([]);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-50">
      {gameStarted ? (
        <QuizGame teams={teams} onFinish={finishGame} />
      ) : (
        <TeamSetup onStart={startGame} />
      )}
    </div>
  );
};

export default Quiz;
















// import React, { useState, useEffect, useRef } from 'react';
// import { AlertCircle, CheckCircle2, ChevronRight, Cloud, Sun, Zap, Trophy, Users, Plus, X, Clock, ChevronLeft } from 'lucide-react';
// import { Alert, AlertDescription } from './components/ui/alert';

// const quizQuestions = [
//   {
//     question: "What should you do if an earthquake happens while you are inside your classroom?",
//     options: [
//       "Take cover under your desk",
//       "Run outside immediately",
//       "Stand near a window and watch",
//       "Jump up and down",
//       "Call your friends to take selfies",
//       "Throw your books at the shaking walls"
//     ],
//     correctAnswer: "Take cover under your desk",
//     funFact: "Hiding under a desk protects you from falling objects during an earthquake!"
//   },
//   {
//     question: "How can we reduce air pollution in Kathmandu?",
//     options: [
//       "Use bicycles or walk instead of riding cars",
//       "Burn plastic and garbage to make the air warm",
//       "Cut down all trees to create open space",
//       "Keep factories running 24/7 with no filters",
//       "Only wear masks but do nothing else",
//       "Blow a fan towards the sky to push pollution away"
//     ],
//     correctAnswer: "Use bicycles or walk instead of riding cars",
//     funFact: "Fewer cars on the road mean cleaner air for everyone!"
//   },
//   {
//     question: "What is the best way to prepare for floods in Nepal?",
//     options: [
//       "Build houses on higher ground",
//       "Store all your things in the basement",
//       "Make paper boats and float on the water",
//       "Wait for the water to disappear on its own",
//       "Dig holes to hide from the water",
//       "Collect the floodwater in buckets"
//     ],
//     correctAnswer: "Build houses on higher ground",
//     funFact: "Living on higher ground keeps people safe from rising floodwaters!"
//   },
//   {
//     question: "Why do we need to plant more trees?",
//     options: [
//       "They clean the air and give us oxygen",
//       "They make our playgrounds messy",
//       "They create more shade for sleeping",
//       "They scare away birds",
//       "They stop Wi-Fi signals",
//       "They take up too much space"
//     ],
//     correctAnswer: "They clean the air and give us oxygen",
//     funFact: "Trees absorb carbon dioxide and help fight climate change!"
//   },
//   {
//     question: "What should you do if a fire breaks out in your home?",
//     options: [
//       "Stay low and find a safe exit",
//       "Throw water on an electrical fire",
//       "Run around screaming for help",
//       "Hide under your bed",
//       "Close all doors and windows to trap the fire",
//       "Try to put out the fire with a fan"
//     ],
//     correctAnswer: "Stay low and find a safe exit",
//     funFact: "Smoke rises, so staying low helps you breathe cleaner air while escaping!"
//   },
//   {
//     question: "How can we save water at home?",
//     options: [
//       "Turn off taps when not in use",
//       "Keep taps running all day",
//       "Take very long showers",
//       "Water plants with bottled water only",
//       "Wash clothes one at a time in full buckets",
//       "Use as much water as possible because it's unlimited"
//     ],
//     correctAnswer: "Turn off taps when not in use",
//     funFact: "Saving water helps during dry seasons and prevents shortages!"
//   },
//   {
//     question: "Which of these helps to reduce plastic pollution?",
//     options: [
//       "Using cloth or paper bags instead of plastic bags",
//       "Throwing plastic into rivers",
//       "Burning plastic to make space",
//       "Burying plastic deep underground",
//       "Collecting plastic and throwing it into a bigger pile",
//       "Making all school books out of plastic"
//     ],
//     correctAnswer: "Using cloth or paper bags instead of plastic bags",
//     funFact: "Plastic takes hundreds of years to decompose, so reducing its use helps the environment!"
//   },
//   {
//     question: "What is the safest place to be during a thunderstorm?",
//     options: [
//       "Inside a strong building",
//       "Under a tall tree",
//       "In the middle of an open field",
//       "On the rooftop of your house",
//       "Holding a metal rod in your hand",
//       "Standing in a swimming pool"
//     ],
//     correctAnswer: "Inside a strong building",
//     funFact: "Being indoors reduces the risk of being struck by lightning!"
//   },
//   {
//     question: "What can we do to make Kathmandu cleaner?",
//     options: [
//       "Throw garbage in dustbins",
//       "Throw plastic in the river",
//       "Leave garbage on the streets",
//       "Wait for someone else to clean",
//       "Burn trash on roads",
//       "Hide garbage under your bed"
//     ],
//     correctAnswer: "Throw garbage in dustbins",
//     funFact: "Proper waste disposal keeps our city clean and healthy!"
//   },
//   {
//     question: "Why is it important to have an emergency kit at home?",
//     options: [
//       "It helps during disasters like earthquakes and floods",
//       "It is fun to collect random things",
//       "It makes you feel like a superhero",
//       "It’s only for decoration",
//       "It attracts thieves",
//       "It takes up space for no reason"
//     ],
//     correctAnswer: "It helps during disasters like earthquakes and floods",
//     funFact: "Emergency kits with food, water, and first-aid supplies can save lives!"
//   },
//   {
//     question: "Which of these is a renewable energy source?",
//     options: [
//       "Solar power from the sun",
//       "Petrol from cars",
//       "Gas from cooking stoves",
//       "Coal from deep underground",
//       "Plastic waste burned for heat",
//       "Batteries that never run out"
//     ],
//     correctAnswer: "Solar power from the sun",
//     funFact: "Solar energy is clean and never runs out, unlike fossil fuels!"
//   },
//   {
//     question: "What should you do if you see someone littering?",
//     options: [
//       "Politely remind them to use a dustbin",
//       "Ignore them and walk away",
//       "Join them and throw more trash",
//       "Wait for a government official to stop them",
//       "Take their trash home with you",
//       "Throw your own trash even farther"
//     ],
//     correctAnswer: "Politely remind them to use a dustbin",
//     funFact: "Encouraging others to keep the environment clean helps everyone!"
//   },
//   {
//     question: "Why do glaciers in Nepal’s mountains matter?",
//     options: [
//       "They provide water for rivers",
//       "They are fun places to play",
//       "They make great ice cream factories",
//       "They keep Mount Everest cold",
//       "They protect us from aliens",
//       "They stop the wind from blowing"
//     ],
//     correctAnswer: "They provide water for rivers",
//     funFact: "Melting glaciers affect Nepal’s water supply and can cause floods!"
//   }
// ];

// const TeamSetup = ({ onStart }) => {
//   const [teams, setTeams] = useState([{ name: '', members: '' }]);
//   const [error, setError] = useState('');

//   const handleTeamChange = (index, field, value) => {
//     const updatedTeams = [...teams];
//     updatedTeams[index][field] = value;
//     setTeams(updatedTeams);
//   };

//   const addTeam = () => {
//     if (teams.length < 5) {
//       setTeams([...teams, { name: '', members: '' }]);
//     }
//   };

//   const removeTeam = (index) => {
//     if (teams.length > 1) {
//       const updatedTeams = teams.filter((_, i) => i !== index);
//       setTeams(updatedTeams);
//     }
//   };

//   const startQuiz = () => {
//     const incompleteTeams = teams.some(team => !team.name.trim() || !team.members.trim());
//     if (incompleteTeams) {
//       setError('Please fill in all team names and members');
//       return;
//     }
//     setError('');
//     onStart(teams);
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
//       <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
//         <Users className="mr-3 w-8 h-8 text-blue-600" /> Team Setup
//       </h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {teams.map((team, index) => (
//           <div key={index} className="p-6 border-2 border-blue-100 rounded-xl bg-gradient-to-br from-blue-50 to-white relative">
//             {teams.length > 1 && (
//               <button 
//                 onClick={() => removeTeam(index)}
//                 className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow"
//               >
//                 <X size={18} />
//               </button>
//             )}
            
//             <div className="mb-4">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Team {index + 1} Name
//               </label>
//               <input
//                 type="text"
//                 value={team.name}
//                 onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
//                 className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 placeholder={`Team ${index + 1} name`}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Team Members
//               </label>
//               <input
//                 type="text"
//                 value={team.members}
//                 onChange={(e) => handleTeamChange(index, 'members', e.target.value)}
//                 className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 placeholder="Member 1, Member 2, ..."
//               />
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="flex justify-between items-center">
//         {teams.length < 5 && (
//           <button
//             onClick={addTeam}
//             className="flex items-center text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg bg-blue-50 transition-colors"
//           >
//             <Plus size={18} className="mr-2" /> Add Team
//           </button>
//         )}
        
//         <div className="flex-1"></div>
        
//         <button
//           onClick={startQuiz}
//           className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
//         >
//           Start Quiz <ChevronRight className="ml-2 w-5 h-5" />
//         </button>
//       </div>
      
//       {error && (
//         <div className="mt-4 text-red-500 text-center font-medium">{error}</div>
//       )}
//     </div>
//   );
// };

// const QuizGame = ({ teams, onFinish }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [scores, setScores] = useState(teams.map(() => 0));
//   const [currentTeam, setCurrentTeam] = useState(0);
//   const [shake, setShake] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [timerActive, setTimerActive] = useState(true);
//   const [originalTeam, setOriginalTeam] = useState(0);
//   const timerRef = useRef(null);

//   const startTimer = (duration) => {
//     setTimeLeft(duration);
//     setTimerActive(true);
//   };

//   const stopTimer = () => {
//     setTimerActive(false);
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//   };

//   useEffect(() => {
//     if (timerActive) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft(prevTime => {
//           if (prevTime <= 1) {
//             clearInterval(timerRef.current);
//             handleTimeUp();
//             return 0;
//           }
//           return prevTime - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [timerActive]);

//   useEffect(() => {
//     // Start with 60 seconds for the first team
//     startTimer(60);
//     setOriginalTeam(currentTeam);
//   }, [currentQuestion]);

//   const handleTimeUp = () => {
//     setTimerActive(false);
//     setShowAnswer(true);
//     setIsCorrect(false);
//     setSelectedAnswer('Time Up!');
    
//     setTimeout(() => {
//       if (currentQuestion < quizQuestions.length - 1) {
//         nextQuestion();
//       } else {
//         endGame();
//       }
//     }, 2000);
//   };

//   const handleAnswerClick = (answer) => {
//     stopTimer();
//     setSelectedAnswer(answer);
//     setShowAnswer(true);
    
//     if (answer === quizQuestions[currentQuestion].correctAnswer) {
//       setIsCorrect(true);
//       const newScores = [...scores];
//       newScores[currentTeam] += 1;
//       setScores(newScores);
      
//       setTimeout(() => {
//         if (currentQuestion < quizQuestions.length - 1) {
//           nextQuestion();
//         } else {
//           endGame();
//         }
//       }, 2000);
//     } else {
//       setIsCorrect(false);
//       setShake(true);
//       setTimeout(() => {
//         setShake(false);
//         setShowAnswer(false);
//         setSelectedAnswer('');
//         const nextTeam = (currentTeam + 1) % teams.length;
//         setCurrentTeam(nextTeam);
        
//         // If we've gone through all teams without correct answer
//         if (nextTeam === originalTeam) {
//           setShowAnswer(true);
//           setIsCorrect(false);
//           setSelectedAnswer('No team answered correctly!');
//           setTimeout(() => {
//             if (currentQuestion < quizQuestions.length - 1) {
//               nextQuestion();
//             } else {
//               endGame();
//             }
//           }, 2000);
//         } else {
//           // Start 35 second timer for next team
//           startTimer(35);
//         }
//       }, 1000);
//     }
//   };

//   const nextQuestion = () => {
//     setCurrentQuestion(currentQuestion + 1);
//     setSelectedAnswer('');
//     setShowAnswer(false);
//     setIsCorrect(false);
//     setCurrentTeam((currentTeam + 1) % teams.length);
//   };

//   const endGame = () => {
//     setGameOver(true);
//   };

//   const resetGame = () => {
//     onFinish();
//   };

//   if (gameOver) {
//     const maxScore = Math.max(...scores);
//     const winningTeams = teams.filter((_, index) => scores[index] === maxScore);
    
//     return (
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
//           <Trophy className="mr-3 w-8 h-8 text-yellow-500" /> Quiz Results
//         </h2>
        
//         <div className="mb-8">
//           <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">
//             {winningTeams.length > 1 ? "It's a tie!" : "We have a winner!"}
//           </h3>
          
//           {winningTeams.map((team, index) => (
//             <div key={index} className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-8 border-yellow-500 p-6 mb-6 rounded-r-lg shadow-md">
//               <h4 className="font-bold text-2xl text-yellow-800">{team.name}</h4>
//               <p className="text-yellow-700 text-lg">{team.members}</p>
//               <p className="font-bold mt-3 text-xl">Score: {maxScore}/{quizQuestions.length}</p>
//             </div>
//           ))}
//         </div>
        
//         <div className="mb-8">
//           <h4 className="font-semibold text-xl mb-4 text-center">All Teams:</h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {teams.map((team, index) => (
//               <div 
//                 key={index} 
//                 className={`p-4 rounded-xl shadow-sm ${scores[index] === maxScore ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-gray-50 border border-gray-200'}`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className="font-medium text-lg">{team.name}</span>
//                     <p className="text-sm text-gray-600">{team.members}</p>
//                   </div>
//                   <span className="font-bold text-xl">{scores[index]} points</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="flex justify-center">
//           <button
//             onClick={resetGame}
//             className="flex items-center bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
//           >
//             <ChevronLeft className="mr-2 w-5 h-5" /> Play Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Team Info */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Current Team */}
//           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white">
//             <div className="text-sm font-medium mb-1">Current Team</div>
//             <div className="text-2xl font-bold mb-2">{teams[currentTeam].name}</div>
//             <div className="text-sm opacity-90 mb-4">{teams[currentTeam].members}</div>
            
//             {/* Timer */}
//             <div className="flex items-center justify-between bg-blue-900 bg-opacity-30 rounded-lg p-3">
//               <div className="flex items-center">
//                 <Clock className="w-5 h-5 mr-2" />
//                 <span className="font-mono text-xl">
//                   {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
//                 </span>
//               </div>
//               <div className="text-sm">
//                 {currentTeam === originalTeam ? "First Chance" : "Pass Chance"}
//               </div>
//             </div>
//           </div>
          
//           {/* Scoreboard */}
//           <div className="bg-white rounded-2xl shadow-xl p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Scoreboard</h3>
//             <div className="space-y-3">
//               {teams.map((team, index) => (
//                 <div 
//                   key={index} 
//                   className={`flex items-center justify-between p-3 rounded-lg transition-all ${index === currentTeam ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'}`}
//                 >
//                   <div>
//                     <div className="font-medium">{team.name}</div>
//                     <div className="text-xs text-gray-500">{team.members}</div>
//                   </div>
//                   <div className="font-bold text-lg">{scores[index]}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         {/* Right Column - Quiz Questions */}
//         <div className="lg:col-span-2">
//           <div className={`bg-white rounded-2xl shadow-xl p-6 h-full transform transition-transform ${shake ? 'animate-shake' : ''}`}>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Climate Quiz
//               </h2>
//               <div className="text-sm text-gray-600 animate-bounce bg-blue-100 px-3 py-1 rounded-full">
//                 Question {currentQuestion + 1} of {quizQuestions.length}
//               </div>
//             </div>
            
//             {/* Progress Bar */}
//             <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
//               <div 
//                 className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full transition-all duration-1000 ease-in-out"
//                 style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
//               ></div>
//             </div>

//             <div className="mb-6">
//               <h3 className="text-xl font-semibold mb-6 text-gray-800">
//                 {quizQuestions[currentQuestion].question}
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {quizQuestions[currentQuestion].options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerClick(option)}
//                     disabled={showAnswer}
//                     className={`p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] 
//                       ${selectedAnswer === option
//                         ? option === quizQuestions[currentQuestion].correctAnswer
//                           ? 'bg-green-100 border-2 border-green-500 animate-bounce'
//                           : 'bg-red-100 border-2 border-red-500 animate-shake'
//                         : 'bg-gray-100 hover:bg-gray-200 hover:shadow-md'
//                       }`}
//                   >
//                     <div className="flex items-center">
//                       <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
//                       {option}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Feedback Messages */}
//             {showAnswer && (
//               <Alert className={`rounded-xl mb-4 transform transition-all duration-300 ${
//                 isCorrect ? 'bg-green-100 border-green-500 animate-bounce' : 
//                 selectedAnswer === 'Time Up!' || selectedAnswer === 'No team answered correctly!' ? 
//                 'bg-purple-100 border-purple-500' : 'bg-red-100 border-red-500 animate-shake'
//               }`}>
//                 {isCorrect ? (
//                   <div className="flex items-center">
//                     <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 animate-bounce" />
//                     <AlertDescription>
//                       <span className="font-bold">Correct! 🎉 </span>
//                       {quizQuestions[currentQuestion].funFact}
//                     </AlertDescription>
//                   </div>
//                 ) : selectedAnswer === 'Time Up!' ? (
//                   <div className="flex items-center">
//                     <Clock className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
//                     <AlertDescription>
//                       <span className="font-bold">Time's Up! ⏰ </span>
//                       The correct answer was: {quizQuestions[currentQuestion].correctAnswer}
//                     </AlertDescription>
//                   </div>
//                 ) : selectedAnswer === 'No team answered correctly!' ? (
//                   <div className="flex items-center">
//                     <AlertCircle className="h-5 w-5 text-purple-600 mr-2 animate-pulse" />
//                     <AlertDescription>
//                       <span className="font-bold">No correct answers! </span>
//                       The right answer was: {quizQuestions[currentQuestion].correctAnswer}
//                     </AlertDescription>
//                   </div>
//                 ) : (
//                   <div className="flex items-center">
//                     <AlertCircle className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
//                     <AlertDescription>
//                       <span className="font-bold">Incorrect! </span>
//                       Next team's turn!
//                     </AlertDescription>
//                   </div>
//                 )}
//               </Alert>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Quiz = () => {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [teams, setTeams] = useState([]);

//   const startGame = (teamData) => {
//     setTeams(teamData);
//     setGameStarted(true);
//   };

//   const finishGame = () => {
//     setGameStarted(false);
//     setTeams([]);
//   };

//   return (
//     <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-green-50">
//       {gameStarted ? (
//         <QuizGame teams={teams} onFinish={finishGame} />
//       ) : (
//         <TeamSetup onStart={startGame} />
//       )}
//     </div>
//   );
// };

// export default Quiz;

















































































// import React, { useState } from 'react';
// import { AlertCircle, CheckCircle2, ChevronRight, Cloud, Sun, Zap } from 'lucide-react';
// import { Alert, AlertDescription } from './components/ui/alert';

// const quizQuestions = [
//   {
//     question: "What should you do if an earthquake happens while you are inside your classroom?",
//     options: [
//       "Take cover under your desk",
//       "Run outside immediately",
//       "Stand near a window and watch",
//       "Jump up and down",
//       "Call your friends to take selfies",
//       "Throw your books at the shaking walls"
//     ],
//     correctAnswer: "Take cover under your desk",
//     funFact: "Hiding under a desk protects you from falling objects during an earthquake!"
//   },
//   {
//     question: "How can we reduce air pollution in Kathmandu?",
//     options: [
//       "Use bicycles or walk instead of riding cars",
//       "Burn plastic and garbage to make the air warm",
//       "Cut down all trees to create open space",
//       "Keep factories running 24/7 with no filters",
//       "Only wear masks but do nothing else",
//       "Blow a fan towards the sky to push pollution away"
//     ],
//     correctAnswer: "Use bicycles or walk instead of riding cars",
//     funFact: "Fewer cars on the road mean cleaner air for everyone!"
//   },
//   {
//     question: "What is the best way to prepare for floods in Nepal?",
//     options: [
//       "Build houses on higher ground",
//       "Store all your things in the basement",
//       "Make paper boats and float on the water",
//       "Wait for the water to disappear on its own",
//       "Dig holes to hide from the water",
//       "Collect the floodwater in buckets"
//     ],
//     correctAnswer: "Build houses on higher ground",
//     funFact: "Living on higher ground keeps people safe from rising floodwaters!"
//   },
//   {
//     question: "Why do we need to plant more trees?",
//     options: [
//       "They clean the air and give us oxygen",
//       "They make our playgrounds messy",
//       "They create more shade for sleeping",
//       "They scare away birds",
//       "They stop Wi-Fi signals",
//       "They take up too much space"
//     ],
//     correctAnswer: "They clean the air and give us oxygen",
//     funFact: "Trees absorb carbon dioxide and help fight climate change!"
//   },
//   {
//     question: "What should you do if a fire breaks out in your home?",
//     options: [
//       "Stay low and find a safe exit",
//       "Throw water on an electrical fire",
//       "Run around screaming for help",
//       "Hide under your bed",
//       "Close all doors and windows to trap the fire",
//       "Try to put out the fire with a fan"
//     ],
//     correctAnswer: "Stay low and find a safe exit",
//     funFact: "Smoke rises, so staying low helps you breathe cleaner air while escaping!"
//   },
//   {
//     question: "How can we save water at home?",
//     options: [
//       "Turn off taps when not in use",
//       "Keep taps running all day",
//       "Take very long showers",
//       "Water plants with bottled water only",
//       "Wash clothes one at a time in full buckets",
//       "Use as much water as possible because it's unlimited"
//     ],
//     correctAnswer: "Turn off taps when not in use",
//     funFact: "Saving water helps during dry seasons and prevents shortages!"
//   },
//   {
//     question: "Which of these helps to reduce plastic pollution?",
//     options: [
//       "Using cloth or paper bags instead of plastic bags",
//       "Throwing plastic into rivers",
//       "Burning plastic to make space",
//       "Burying plastic deep underground",
//       "Collecting plastic and throwing it into a bigger pile",
//       "Making all school books out of plastic"
//     ],
//     correctAnswer: "Using cloth or paper bags instead of plastic bags",
//     funFact: "Plastic takes hundreds of years to decompose, so reducing its use helps the environment!"
//   },
//   {
//     question: "What is the safest place to be during a thunderstorm?",
//     options: [
//       "Inside a strong building",
//       "Under a tall tree",
//       "In the middle of an open field",
//       "On the rooftop of your house",
//       "Holding a metal rod in your hand",
//       "Standing in a swimming pool"
//     ],
//     correctAnswer: "Inside a strong building",
//     funFact: "Being indoors reduces the risk of being struck by lightning!"
//   },
//   {
//     question: "What can we do to make Kathmandu cleaner?",
//     options: [
//       "Throw garbage in dustbins",
//       "Throw plastic in the river",
//       "Leave garbage on the streets",
//       "Wait for someone else to clean",
//       "Burn trash on roads",
//       "Hide garbage under your bed"
//     ],
//     correctAnswer: "Throw garbage in dustbins",
//     funFact: "Proper waste disposal keeps our city clean and healthy!"
//   },
//   {
//     question: "Why is it important to have an emergency kit at home?",
//     options: [
//       "It helps during disasters like earthquakes and floods",
//       "It is fun to collect random things",
//       "It makes you feel like a superhero",
//       "It’s only for decoration",
//       "It attracts thieves",
//       "It takes up space for no reason"
//     ],
//     correctAnswer: "It helps during disasters like earthquakes and floods",
//     funFact: "Emergency kits with food, water, and first-aid supplies can save lives!"
//   },
//   {
//     question: "Which of these is a renewable energy source?",
//     options: [
//       "Solar power from the sun",
//       "Petrol from cars",
//       "Gas from cooking stoves",
//       "Coal from deep underground",
//       "Plastic waste burned for heat",
//       "Batteries that never run out"
//     ],
//     correctAnswer: "Solar power from the sun",
//     funFact: "Solar energy is clean and never runs out, unlike fossil fuels!"
//   },
//   {
//     question: "What should you do if you see someone littering?",
//     options: [
//       "Politely remind them to use a dustbin",
//       "Ignore them and walk away",
//       "Join them and throw more trash",
//       "Wait for a government official to stop them",
//       "Take their trash home with you",
//       "Throw your own trash even farther"
//     ],
//     correctAnswer: "Politely remind them to use a dustbin",
//     funFact: "Encouraging others to keep the environment clean helps everyone!"
//   },
//   {
//     question: "Why do glaciers in Nepal’s mountains matter?",
//     options: [
//       "They provide water for rivers",
//       "They are fun places to play",
//       "They make great ice cream factories",
//       "They keep Mount Everest cold",
//       "They protect us from aliens",
//       "They stop the wind from blowing"
//     ],
//     correctAnswer: "They provide water for rivers",
//     funFact: "Melting glaciers affect Nepal’s water supply and can cause floods!"
//   }
// ];

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
//     <div className="min-h-screen p-4 relative overflow-hidden">
//       {/* <AnimatedBackground /> */}
      
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
        
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           25% { transform: translateX(-10px); }
//           75% { transform: translateX(10px); }
//         }
        
//         @keyframes bounce {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
        
//         @keyframes slideIn {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
        
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-float-delayed { animation: float 8s ease-in-out infinite 1s; }
//         .animate-float-quick { animation: float 4s ease-in-out infinite 2s; }
//         .animate-shake { animation: shake 0.5s ease-in-out; }
//         .animate-bounce { animation: bounce 0.5s ease-in-out; }
//         .animate-slide-in { animation: slideIn 0.5s ease-out; }
//       `}</style>

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














