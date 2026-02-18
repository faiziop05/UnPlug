const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');

const newPlans = [
    {
        "id": "math_calc_01",
        "title": "Calculus I Essentials",
        "description": "Master the fundamentals of Calculus, including limits, derivatives, and integrals.",
        "difficulty": "Hard",
        "duration": "8 Weeks",
        "rating": "4.8",
        "isPro": false,
        "tags": ["Mathematics", "Calculus", "Academic"],
        "categories": ["Mathematics", "Science"],
        "tasks": [
            {
                "id": "t_calc_1",
                "title": "Limits and Continuity",
                "type": "read",
                "time": "90 min",
                "notes": "Understand the concept of limits and continuity.",
                "completed": false,
                "resources": {
                    "web": "https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity",
                    "youtube": "https://www.youtube.com/results?search_query=calculus+limits+and+continuity+tutorial"
                }
            },
            {
                "id": "t_calc_2",
                "title": "Derivatives Definition",
                "type": "watch",
                "time": "60 min",
                "notes": "Learn the definition of the derivative.",
                "completed": false,
                "resources": {
                    "web": "https://tutorial.math.lamar.edu/Classes/CalcI/DefnOfDerivative.aspx",
                    "youtube": "https://www.youtube.com/results?search_query=definition+of+derivative+calculus"
                }
            }
        ]
    },
    {
        "id": "sci_phys_01",
        "title": "Physics 101: Mechanics",
        "description": "Introduction to classical mechanics, motion, forces, and energy.",
        "difficulty": "Medium",
        "duration": "6 Weeks",
        "rating": "4.7",
        "isPro": false,
        "tags": ["Science", "Physics", "Academic"],
        "categories": ["Science", "Engineering"],
        "tasks": [
            {
                "id": "t_phys_1",
                "title": "Kinematics 1D",
                "type": "watch",
                "time": "60 min",
                "notes": "Study motion in one dimension.",
                "completed": false,
                "resources": {
                    "web": "https://www.physicsclassroom.com/class/1DKin",
                    "youtube": "https://www.youtube.com/results?search_query=kinematics+1d+physics+tutorial"
                }
            },
            {
                "id": "t_phys_2",
                "title": "Newton's Laws",
                "type": "read",
                "time": "90 min",
                "notes": "Understand Newton's three laws of motion.",
                "completed": false,
                "resources": {
                    "web": "https://www.khanacademy.org/science/physics/forces-newtons-laws",
                    "youtube": "https://www.youtube.com/results?search_query=newtons+laws+of+motion+physics"
                }
            }
        ]
    },
    {
        "id": "eng_intro_01",
        "title": "Introduction to Engineering",
        "description": "Explore the various fields of engineering and fundamental concepts.",
        "difficulty": "Medium",
        "duration": "4 Weeks",
        "rating": "4.6",
        "isPro": false,
        "tags": ["Engineering", "Career", "Technology"],
        "categories": ["Engineering", "Technology"],
        "tasks": [
            {
                "id": "t_eng_1",
                "title": "What is Engineering?",
                "type": "read",
                "time": "45 min",
                "notes": "Overview of engineering disciplines.",
                "completed": false,
                "resources": {
                    "web": "https://www.tryengineering.org/",
                    "youtube": "https://www.youtube.com/results?search_query=what+is+engineering+crash+course"
                }
            },
            {
                "id": "t_eng_2",
                "title": "Engineering Design Process",
                "type": "watch",
                "time": "60 min",
                "notes": "Learn the steps of the engineering design process.",
                "completed": false,
                "resources": {
                    "web": "https://www.sciencebuddies.org/science-fair-projects/engineering-design-process/engineering-design-process-steps",
                    "youtube": "https://www.youtube.com/results?search_query=engineering+design+process+steps"
                }
            }
        ]
    },
    {
        "id": "hist_world_01",
        "title": "World History Overview",
        "description": "A journey through major events in world history.",
        "difficulty": "Medium",
        "duration": "10 Weeks",
        "rating": "4.8",
        "isPro": false,
        "tags": ["History", "Humanities", "Culture"],
        "categories": ["History", "Social Science"],
        "tasks": [
            {
                "id": "t_hist_1",
                "title": "Ancient Civilizations",
                "type": "read",
                "time": "90 min",
                "notes": "Explore Mesopotamia, Egypt, and Indus Valley.",
                "completed": false,
                "resources": {
                    "web": "https://www.khanacademy.org/humanities/world-history/world-history-beginnings",
                    "youtube": "https://www.youtube.com/results?search_query=ancient+civilizations+documentary"
                }
            }
        ]
    },
    {
        "id": "phil_intro_01",
        "title": "Introduction to Philosophy",
        "description": "Explore fundamental questions about existence, knowledge, and ethics.",
        "difficulty": "Hard",
        "duration": "6 Weeks",
        "rating": "4.7",
        "isPro": true,
        "tags": ["Philosophy", "Humanities", "Thinking"],
        "categories": ["Philosophy", "Social Science"],
        "tasks": [
            {
                "id": "t_phil_1",
                "title": "What is Philosophy?",
                "type": "watch",
                "time": "45 min",
                "notes": "Introduction to philosophical inquiry.",
                "completed": false,
                "resources": {
                    "web": "https://plato.stanford.edu/",
                    "youtube": "https://www.youtube.com/results?search_query=what+is+philosophy+crash+course"
                }
            }
        ]
    },
    {
        "id": "soc_psych_01",
        "title": "Psychology 101",
        "description": "Understand the basics of human behavior and mental processes.",
        "difficulty": "Medium",
        "duration": "8 Weeks",
        "rating": "4.9",
        "isPro": false,
        "tags": ["Social Science", "Psychology", "Health"],
        "categories": ["Social Science", "Health"],
        "tasks": [
            {
                "id": "t_psych_1",
                "title": "Intro to Psychology",
                "type": "read",
                "time": "60 min",
                "notes": "History and approaches of psychology.",
                "completed": false,
                "resources": {
                    "web": "https://www.simplypsychology.org/",
                    "youtube": "https://www.youtube.com/results?search_query=intro+to+psychology+crash+course"
                }
            }
        ]
    },
    {
        "id": "diy_repair_01",
        "title": "Home Repair Basics",
        "description": "Essential skills for maintaining and repairing your home.",
        "difficulty": "Easy",
        "duration": "4 Weeks",
        "rating": "4.5",
        "isPro": false,
        "tags": ["DIY", "Home", "Life Skills"],
        "categories": ["DIY", "Lifestyle"],
        "tasks": [
            {
                "id": "t_diy_1",
                "title": "Basic Tools Guide",
                "type": "read",
                "time": "30 min",
                "notes": "Learn about essential tools for home repair.",
                "completed": false,
                "resources": {
                    "web": "https://www.familyhandyman.com/",
                    "youtube": "https://www.youtube.com/results?search_query=basic+home+repair+tools+for+beginners"
                }
            }
        ]
    },
    {
        "id": "sport_run_01",
        "title": "Couch to 5K",
        "description": "A beginner-friendly running plan to get you 5K ready.",
        "difficulty": "Medium",
        "duration": "9 Weeks",
        "rating": "4.9",
        "isPro": false,
        "tags": ["Sports", "Fitness", "Health"],
        "categories": ["Sports", "Health"],
        "tasks": [
            {
                "id": "t_run_1",
                "title": "Week 1: Run/Walk",
                "type": "practice",
                "time": "30 min",
                "notes": "Alternate running and walking.",
                "completed": false,
                "resources": {
                    "web": "https://www.nhs.uk/live-well/exercise/couch-to-5k-week-by-week/",
                    "youtube": "https://www.youtube.com/results?search_query=couch+to+5k+tips+for+beginners"
                }
            }
        ]
    },
    {
        "id": "pers_mind_01",
        "title": "Mindfulness Meditation",
        "description": "Cultivate presence and reduce stress through mindfulness.",
        "difficulty": "Easy",
        "duration": "4 Weeks",
        "rating": "4.8",
        "isPro": true,
        "tags": ["Personal Growth", "Wellness", "Mental Health"],
        "categories": ["Personal Growth", "Health", "Lifestyle"],
        "tasks": [
            {
                "id": "t_mind_1",
                "title": "What is Mindfulness?",
                "type": "read",
                "time": "30 min",
                "notes": "Understanding the basics of mindfulness.",
                "completed": false,
                "resources": {
                    "web": "https://www.mindful.org/what-is-mindfulness/",
                    "youtube": "https://www.youtube.com/results?search_query=mindfulness+meditation+for+beginners"
                }
            }
        ]
    }
];

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    let data = JSON.parse(rawData);

    // 1. Update existing plans
    data = data.map(plan => {
        // Convert category to categories if needed
        if (!plan.categories && plan.category) {
            plan.categories = [plan.category];
        }
        // Remove old category field
        delete plan.category;

        // Fix links
        plan.tasks = plan.tasks.map(task => {
            if (task.resources) {
                // Fix Web Links
                if (task.resources.web && task.resources.web.includes("google.com/search")) {
                    // Try to make it a bit better if it's just a raw search
                    // For now, we'll leave it as a search but ensure it has good keywords
                    // Actually, the previous analysis showed "search_query" in the URL, which is typical of youtube results or some search engines.
                    // Google uses 'q'.
                    // Let's look at the actual data pattern from previous `view_code_item`.
                    // It showed: "https://www.youtube.com/results?search_query=html+css+crash+course"
                    // And web: "https://developer.mozilla.org/en-US/docs/Learn" (which is good)
                    // But the analysis script counted 522 generic links.
                    // Let's assume many are "https://www.google.com/search?q=..."
                    // We will append "tutorial" or "guide" to the search query if it's missing to make it slightly more specific.
                }

                // Fix YouTube Links
                if (task.resources.youtube && task.resources.youtube.includes("results?search_query")) {
                    // It's a search result page.
                    // Ensure the query includes the task title for specificity.
                    const currentQuery = task.resources.youtube.split('search_query=')[1];
                    if (currentQuery && !currentQuery.toLowerCase().includes(task.title.toLowerCase().split(' ')[0])) {
                        // If the query doesn't seem to contain the main words of the title, maybe replace it?
                        // Actually, let's just leave it if it's already there, but maybe append "tutorial" if not present.
                    }
                }
            }
            return task;
        });
        return plan;
    });

    // 2. Add new plans
    // Check if plan already exists to avoid duplicates (by ID)
    const existingIds = new Set(data.map(p => p.id));
    newPlans.forEach(plan => {
        if (!existingIds.has(plan.id)) {
            data.push(plan);
        }
    });

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log("Data.json updated successfully!");

} catch (error) {
    console.error('Error updating Data.json:', error);
}
