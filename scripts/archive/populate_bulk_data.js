const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');

// Helper to generate a plan object
const createPlan = (category, index, title, description, tags, extraCategories = []) => {
    const id = `${category.toLowerCase().substring(0, 3)}_${index}_${Date.now().toString().substring(8)}`;
    return {
        id: id,
        title: title,
        description: description,
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
        duration: `${Math.floor(Math.random() * 8 + 4)} Weeks`,
        rating: (4.0 + Math.random()).toFixed(1),
        isPro: Math.random() > 0.7,
        tags: [category, ...tags],
        categories: [category, ...extraCategories],
        tasks: [
            {
                id: `t_${id}_1`,
                title: "Introduction",
                type: "read",
                time: "45 min",
                notes: `Introduction to ${title}.`,
                completed: false,
                resources: {
                    web: `https://www.google.com/search?q=${encodeURIComponent(title + " tutorial")}`,
                    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " crash course")}`
                }
            },
            {
                id: `t_${id}_2`,
                title: "Core Concepts",
                type: "watch",
                time: "60 min",
                notes: "Deep dive into core concepts.",
                completed: false,
                resources: {
                    web: `https://www.google.com/search?q=${encodeURIComponent(title + " advanced guide")}`,
                    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " deep dive")}`
                }
            },
            {
                id: `t_${id}_3`,
                title: "Practical Application",
                type: "practice",
                time: "90 min",
                notes: "Apply what you learned.",
                completed: false,
                resources: {
                    web: `https://www.google.com/search?q=${encodeURIComponent(title + " exercises")}`,
                    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " practice")}`
                }
            }
        ]
    };
};

const contentMap = {
    "Mathematics": [
        ["Linear Algebra", "Vectors, matrices, and linear transformations.", ["Algebra", "Academic"]],
        ["Discrete Math", "Logic, sets, and graph theory.", ["Logic", "CS"]],
        ["Statistics II", "Hypothesis testing and regression.", ["Data", "Analysis"]],
        ["Differential Equations", "Solving ODEs and PDEs.", ["Calculus", "Advanced"]],
        ["Number Theory", "Properties of integers and primes.", ["Pure Math"]],
        ["Geometry Essentials", "Euclidean geometry and proofs.", ["Shapes", "Basics"]],
        ["Trigonometry", "Triangles and periodic functions.", ["Math", "Basics"]],
        ["Probability", "Chance, variables, and distributions.", ["Stats", "Data"]],
        ["Combinatorics", "Counting, arrangement, and permutation.", ["Math", "Logic"]]
    ],
    "Science": [
        ["Chemistry 101", "Atoms, molecules, and reactions.", ["Chemistry", "Academic"]],
        ["Biology: Genetics", "DNA, inheritance, and evolution.", ["Biology", "Life"]],
        ["Astronomy Basics", "Stars, planets, and the universe.", ["Space", "Physics"]],
        ["Environmental Science", "Ecosystems and sustainability.", ["Nature", "Earth"]],
        ["Organic Chemistry", "Carbon-based compounds and reactions.", ["Chemistry", "Hard"]],
        ["Geology", "Rocks, minerals, and plate tectonics.", ["Earth", "Science"]],
        ["Neuroscience Intro", "Brain structure and function.", ["Brain", "Biology"]],
        ["Quantum Physics", "Particles, waves, and uncertainty.", ["Physics", "Advanced"]]
    ],
    "Engineering": [
        ["Electrical Engineering", "Circuits, electronics, and power.", ["Circuits", "Tech"]],
        ["Civil Engineering", "Structures, materials, and infrastructure.", ["Building", "Design"]],
        ["Chemical Engineering", "Process design and thermodynamics.", ["Chemistry", "Industry"]],
        ["Aerospace Engineering", "Flight mechanics and aerodynamics.", ["Space", "Flight"]],
        ["Robotics Basics", "Sensors, actuators, and control.", ["Robots", "Tech"]],
        ["Materials Science", "Properties of metals, polymers, and ceramics.", ["Materials", "Science"]],
        ["Software Engineering", "SDLC, patterns, and architecture.", ["Code", "Tech"]],
        ["Biomedical Engineering", "Tech in healthcare and medicine.", ["Health", "Tech"]]
    ],
    "Finance": [
        ["Stock Market Basics", "How the stock market works.", ["Investing", "Money"]],
        ["Crypto Investing", "Blockchain and digital assets.", ["Crypto", "Tech"]],
        ["Real Estate Investing", "Buying and managing property.", ["Property", "Wealth"]],
        ["Retirement Planning", "401k, IRAs, and long-term savings.", ["Planning", "Life"]],
        ["Tax Strategies", "Optimizing your tax situation.", ["Taxes", "Money"]],
        ["Accounting 101", "Balance sheets and income statements.", ["Business", "Math"]]
    ],
    "Marketing": [
        ["Social Media Marketing", "Growth on Instagram, TikTok, etc.", ["Social", "Growth"]],
        ["SEO Mastery", "Ranking higher on search engines.", ["Search", "Tech"]],
        ["Content Marketing", "Creating value through content.", ["Writing", "Creative"]],
        ["Email Marketing", "Building and monetizing lists.", ["Sales", "Business"]],
        ["Brand Strategy", "Building a strong brand identity.", ["Branding", "Design"]],
        ["Copywriting Secrets", "Writing words that sell.", ["Writing", "Sales"]],
        ["Affiliate Marketing", "Earning through referrals.", ["Sales", "Passive"]],
        ["Google Ads", "PPC campaigns and optimization.", ["Ads", "Traffic"]],
        ["Influencer Marketing", "Working with creators.", ["Social", "PR"]]
    ],
    "Design": [
        ["UI Design Basics", "Interface design principles.", ["UI", "Tech"]],
        ["UX Research", "Understanding user needs.", ["UX", "Research"]],
        ["Graphic Design", "Color, typography, and layout.", ["Art", "Creative"]],
        ["Logo Design", "Creating memorable brand marks.", ["Branding", "Art"]],
        ["Web Design", "Designing for the modern web.", ["Web", "Tech"]],
        ["Motion Graphics", "Animation for video and web.", ["Animation", "Video"]],
        ["3D Modeling", "Blender and 3D concepts.", ["3D", "Art"]],
        ["Typography", "The art of type.", ["Text", "Art"]],
        ["Design Systems", "Scalable design libraries.", ["UI", "Product"]]
    ],
    "Art": [
        ["Sketching 101", "Pencil techniques and shading.", ["Drawing", "Creative"]],
        ["Watercolor Painting", "Techniques for water-based paint.", ["Painting", "Color"]],
        ["Oil Painting", "Canvas, mixing, and layering.", ["Painting", "Classic"]],
        ["Digital Art", "Procreate and Photoshop basics.", ["Digital", "Tech"]],
        ["Art History", "Renaissance to Modern Art.", ["History", "Culture"]],
        ["Sculpture", "Clay and 3D forms.", ["3D", "Hands-on"]],
        ["Portrait Drawing", "Capturing faces and expressions.", ["Drawing", "People"]],
        ["Landscape Painting", "Capturing nature and light.", ["Painting", "Nature"]],
        ["Abstract Art", "Expression through form and color.", ["Creative", "Modern"]]
    ],
    "History": [
        ["European History", "Middle Ages to Modern Era.", ["Europe", "Culture"]],
        ["American History", "Revolution to Civil Rights.", ["USA", "Politics"]],
        ["Ancient Rome", "Rise and fall of the Empire.", ["Ancient", "War"]],
        ["Ancient Egypt", "Pharaohs and pyramids.", ["Ancient", "Africa"]],
        ["World War I", "The Great War explained.", ["War", "20th Century"]],
        ["World War II", "Global conflict and aftermath.", ["War", "20th Century"]],
        ["Cold War", "Espionage and nuclear tension.", ["Politics", "Modern"]],
        ["Asian History", "Dynasties and modern growth.", ["Asia", "Culture"]],
        ["African History", "Empires and colonization.", ["Africa", "Culture"]]
    ],
    "Writing": [
        ["Creative Writing", "Fiction and storytelling.", ["Fiction", "Creative"]],
        ["Screenwriting", "Writing for film and TV.", ["Movies", "Script"]],
        ["Technical Writing", "Manuals and documentation.", ["Tech", "Career"]],
        ["Poetry Workshop", "Verse, rhyme, and meter.", ["Art", "Expression"]],
        ["Journalism", "Reporting and news writing.", ["News", "Career"]],
        ["Blogging", "Writing for the web.", ["Web", "Content"]],
        ["Novel Writing", "Plotting and character arcs.", ["Fiction", "Long-form"]],
        ["Editing Skills", "Polishing and refining text.", ["Grammar", "Career"]],
        ["Grant Writing", "Securing funding through words.", ["Business", "Non-profit"]]
    ],
    "Philosophy": [
        ["Ethics", "Right, wrong, and morality.", ["Moral", "Life"]],
        ["Existentialism", "Meaning, freedom, and absurdity.", ["Life", "Modern"]],
        ["Political Philosophy", "Justice, state, and rights.", ["Politics", "Society"]],
        ["Metaphysics", "Reality and existence.", ["Abstract", "Deep"]],
        ["Epistemology", "Theory of knowledge.", ["Knowledge", "Logic"]],
        ["Eastern Philosophy", "Buddhism, Taoism, and Confucianism.", ["Asia", "Spirituality"]],
        ["Logic 101", "Arguments and fallacies.", ["Thinking", "Reason"]],
        ["Philosophy of Mind", "Consciousness and the brain.", ["Mind", "Science"]],
        ["Aesthetics", "Beauty and art theory.", ["Art", "Beauty"]]
    ],
    "Social Science": [
        ["Sociology 101", "Society and social structures.", ["Society", "People"]],
        ["Anthropology", "Human cultures and evolution.", ["Culture", "History"]],
        ["Economics Micro", "Supply, demand, and markets.", ["Money", "Business"]],
        ["Economics Macro", "GDP, inflation, and policy.", ["Money", "Politics"]],
        ["Political Science", "Government systems and voting.", ["Politics", "Gov"]],
        ["Geography", "Places, maps, and environments.", ["Earth", "World"]],
        ["Criminology", "Crime and justice systems.", ["Law", "Society"]]
    ],
    "Cooking": [
        ["Italian Cuisine", "Pasta, pizza, and sauces.", ["Food", "Europe"]],
        ["French Cooking", "Techniques and mother sauces.", ["Food", "Fancy"]],
        ["Asian Street Food", "Wok, steam, and spice.", ["Food", "Asia"]],
        ["Baking Basics", "Bread, cakes, and pastries.", ["Baking", "Sweet"]],
        ["Vegan Cooking", "Plant-based meals.", ["Health", "Diet"]],
        ["Grilling Masterclass", "BBQ and fire cooking.", ["Meat", "Summer"]],
        ["Knife Skills", "Chopping and prep like a pro.", ["Skills", "Prep"]],
        ["Meal Prepping", "Planning for the week.", ["Health", "Time"]],
        ["Pastry Arts", "Advanced desserts.", ["Baking", "Art"]]
    ],
    "DIY": [
        ["Woodworking", "Building with timber.", ["Wood", "Craft"]],
        ["Plumbing Basics", "Fixing leaks and pipes.", ["Home", "Repair"]],
        ["Electrical Basics", "Wiring and safety.", ["Home", "Power"]],
        ["Gardening", "Growing plants and veg.", ["Nature", "Outdoors"]],
        ["Sewing 101", "Stitching and mending.", ["Craft", "Fabric"]],
        ["Car Maintenance", "Oil changes and checks.", ["Auto", "Repair"]],
        ["Painting Walls", "Interior design refresh.", ["Home", "Decor"]],
        ["Furniture Restoration", "Upcycling old pieces.", ["Craft", "Eco"]],
        ["Knitting", "Yarn and needles.", ["Craft", "Relax"]]
    ],
    "Sports": [
        ["Yoga for Beginners", "Flexibility and balance.", ["Health", "Relax"]],
        ["Strength Training", "Lifting and muscle gain.", ["Gym", "Fitness"]],
        ["Swimming", "Strokes and endurance.", ["Water", "Cardio"]],
        ["Cycling", "Road and mountain biking.", ["Bike", "Cardio"]],
        ["Tennis Basics", "Serve, volley, and rally.", ["Game", "Skill"]],
        ["Basketball Drills", "Shooting and dribbling.", ["Team", "Ball"]],
        ["Soccer Skills", "Passing and control.", ["Team", "Ball"]],
        ["HIIT Workouts", "High intensity cardio.", ["Gym", "Fast"]],
        ["Pilates", "Core strength and control.", ["Health", "Core"]]
    ],
    "Photography": [
        ["Exposure Triangle", "ISO, Aperture, Shutter Speed.", ["Camera", "Tech"]],
        ["Composition", "Rule of thirds and leading lines.", ["Art", "Visual"]],
        ["Portrait Photography", "Lighting and posing.", ["People", "Studio"]],
        ["Landscape Photo", "Capturing the outdoors.", ["Nature", "Travel"]],
        ["Editing in Lightroom", "Post-processing basics.", ["Edit", "Software"]],
        ["Street Photography", "Capturing candid moments.", ["City", "Candid"]],
        ["Night Photography", "Long exposure and stars.", ["Low Light", "Tech"]],
        ["Product Photography", "Shooting for sales.", ["Business", "Studio"]],
        ["Mobile Photography", "Great shots with a phone.", ["Phone", "Easy"]]
    ],
    "Personal Growth": [
        ["Time Management", "Productivity and focus.", ["Productivity", "Work"]],
        ["Public Speaking", "Confidence on stage.", ["Communication", "Career"]],
        ["Leadership Skills", "Managing teams and vision.", ["Career", "Management"]],
        ["Emotional Intelligence", "Understanding feelings.", ["Psychology", "Social"]],
        ["Negotiation", "Getting to yes.", ["Business", "Skill"]],
        ["Critical Thinking", "Analyzing arguments.", ["Logic", "Mind"]],
        ["Goal Setting", "Achieving your dreams.", ["Planning", "Success"]],
        ["Stress Management", "Coping with pressure.", ["Health", "Mind"]],
        ["Networking", "Building professional connections.", ["Career", "Social"]]
    ]
};

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    let data = JSON.parse(rawData);

    const counts = {};
    data.forEach(plan => {
        if (plan.categories) {
            plan.categories.forEach(c => {
                counts[c] = (counts[c] || 0) + 1;
            });
        }
    });

    let addedCount = 0;
    Object.keys(contentMap).forEach(category => {
        const currentCount = counts[category] || 0;
        const needed = 10 - currentCount;

        if (needed > 0) {
            const templates = contentMap[category];
            for (let i = 0; i < needed; i++) {
                // Cycle through templates if we need more than we have, or pick random?
                // Let's just pick sequentially, wrapping around if needed.
                const template = templates[i % templates.length];
                const newPlan = createPlan(category, i + currentCount, template[0], template[1], template[2]);
                data.push(newPlan);
                addedCount++;
            }
        }
    });

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`Successfully added ${addedCount} new plans to Data.json`);

} catch (error) {
    console.error('Error:', error);
}
