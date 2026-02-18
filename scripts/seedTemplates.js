const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Use the same config as your app
const firebaseConfig = {
  apiKey: "AIzaSyBazG1lwZyWxQ0cqOlCTJ9lURtdOYb9J7w",
  authDomain: "unplug-84000.firebaseapp.com",
  projectId: "unplug-84000",
  storageBucket: "unplug-84000.firebasestorage.app",
  messagingSenderId: "487352363512",
  appId: "1:487352363512:web:7c8736d3e64f39a3eece0d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CATEGORIES = [
  "Technology",
  "Health",
  "Lifestyle",
  "Language",
  "Music",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const DURATIONS = ["1 Week", "2 Weeks", "4 Weeks", "8 Weeks"];

const generateTemplates = () => {
  const templates = [];
  for (let i = 1; i <= 100; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const difficulty = DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];
    const duration = DURATIONS[Math.floor(Math.random() * DURATIONS.length)];
    
    templates.push({
      title: `${category} Mastery Plan ${i}`,
      description: `A comprehensive ${difficulty.toLowerCase()} plan to master ${category} concepts in ${duration}.`,
      category,
      difficulty,
      duration,
      rating: (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1), // Random rating 3.5 - 5.0
      tags: [category, difficulty, "Learning"],
      tasks: [
        {
          id: `t${i}_1`,
          title: "Introduction",
          completed: false,
          notes: "Start here.",
          time: "30 min",
          type: "read",
          resources: {},
          customResources: [],
        },
        {
          id: `t${i}_2`,
          title: "Core Concepts",
          completed: false,
          notes: "Deep dive.",
          time: "60 min",
          type: "video",
          resources: {},
          customResources: [],
        },
        {
          id: `t${i}_3`,
          title: "Practice Project",
          completed: false,
          notes: "Build something.",
          time: "120 min",
          type: "practice",
          resources: {},
          customResources: [],
        },
      ],
    });
  }
  return templates;
};

const seed = async () => {
  console.log("Starting seed...");
  const templates = generateTemplates();
  const batchSize = 10;
  
  for (let i = 0; i < templates.length; i++) {
    try {
        await addDoc(collection(db, 'templates'), templates[i]);
        console.log(`Added template ${i + 1}/${templates.length}`);
    } catch (e) {
        console.error(`Error adding template ${i}:`, e);
    }
  }
  console.log("Seeding complete!");
};

seed();
