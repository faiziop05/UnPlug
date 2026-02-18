const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');

// Helper to generate a plan object
const createPlan = (category, index, title, description, tags, subtopics, extraCategories = []) => {
    const id = `${category.toLowerCase().substring(0, 3)}_${index}_${Date.now().toString().substring(8)}`;

    const tasks = subtopics.map((subtopic, i) => {
        const taskTypes = ["read", "watch", "practice"];
        return {
            id: `t_${id}_${i + 1}`,
            title: subtopic,
            type: taskTypes[i % 3],
            time: `${Math.floor(Math.random() * 60 + 30)} min`,
            notes: `Deep dive into ${subtopic}.`,
            completed: false,
            resources: {
                web: `https://www.google.com/search?q=${encodeURIComponent(title + " " + subtopic + " tutorial")}`,
                youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " " + subtopic + " guide")}`
            }
        };
    });

    return {
        id: id,
        title: title,
        description: description,
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
        duration: `${Math.floor(Math.random() * 8 + 4)} Weeks`,
        rating: (4.2 + Math.random() * 0.8).toFixed(1), // Higher ratings for better content
        isPro: Math.random() > 0.7,
        tags: [category, ...tags],
        categories: [category, ...extraCategories],
        tasks: tasks
    };
};

const contentMap = {
    "Mathematics": [
        { title: "Linear Algebra Mastery", desc: "Vectors, matrices, and linear transformations.", tags: ["Algebra", "Academic"], subtopics: ["Vectors and Spaces", "Matrix Transformations", "Determinants", "Eigenvalues", "Orthogonality", "Symmetric Matrices"] },
        { title: "Discrete Math Foundations", desc: "Logic, sets, and graph theory.", tags: ["Logic", "CS"], subtopics: ["Logic and Proofs", "Set Theory", "Functions", "Induction", "Graph Theory", "Combinatorics"] },
        { title: "Statistics for Data Science", desc: "Hypothesis testing and regression.", tags: ["Data", "Analysis"], subtopics: ["Descriptive Statistics", "Probability Basics", "Distributions", "Hypothesis Testing", "Regression Analysis", "Bayesian Inference"] },
        { title: "Differential Equations", desc: "Solving ODEs and PDEs.", tags: ["Calculus", "Advanced"], subtopics: ["First Order ODEs", "Second Order ODEs", "Laplace Transforms", "Systems of Equations", "Series Solutions", "Partial Differential Equations"] },
        { title: "Number Theory", desc: "Properties of integers and primes.", tags: ["Pure Math"], subtopics: ["Divisibility", "Prime Numbers", "Modular Arithmetic", "Cryptography Basics", "Diophantine Equations", "Fermat's Little Theorem"] },
        { title: "Geometry Essentials", desc: "Euclidean geometry and proofs.", tags: ["Shapes", "Basics"], subtopics: ["Lines and Angles", "Triangles", "Quadrilaterals", "Circles", "Area and Volume", "Coordinate Geometry"] },
        { title: "Trigonometry Deep Dive", desc: "Triangles and periodic functions.", tags: ["Math", "Basics"], subtopics: ["Right Triangles", "Unit Circle", "Trig Functions", "Identities", "Inverse Functions", "Trig Equations"] },
        { title: "Probability Theory", desc: "Chance, variables, and distributions.", tags: ["Stats", "Data"], subtopics: ["Counting Principles", "Conditional Probability", "Random Variables", "Expectation", "Limit Theorems", "Markov Chains"] },
        { title: "Combinatorics", desc: "Counting, arrangement, and permutation.", tags: ["Math", "Logic"], subtopics: ["Permutations", "Combinations", "Binomial Theorem", "Inclusion-Exclusion", "Pigeonhole Principle", "Graph Coloring"] },
        { title: "Multivariable Calculus", desc: "Calculus in 3D space.", tags: ["Calculus", "Hard"], subtopics: ["Vectors in 3D", "Partial Derivatives", "Multiple Integrals", "Vector Fields", "Line Integrals", "Green's Theorem"] }
    ],
    "Science": [
        { title: "Chemistry 101", desc: "Atoms, molecules, and reactions.", tags: ["Chemistry", "Academic"], subtopics: ["Atomic Structure", "Periodic Table", "Chemical Bonding", "Stoichiometry", "States of Matter", "Thermodynamics"] },
        { title: "Biology: Genetics", desc: "DNA, inheritance, and evolution.", tags: ["Biology", "Life"], subtopics: ["DNA Structure", "Replication", "Transcription", "Translation", "Mendelian Genetics", "Evolutionary Mechanisms"] },
        { title: "Astronomy Basics", desc: "Stars, planets, and the universe.", tags: ["Space", "Physics"], subtopics: ["The Solar System", "Stars and Galaxies", "Cosmology", "Exoplanets", "Black Holes", "Space Exploration"] },
        { title: "Environmental Science", desc: "Ecosystems and sustainability.", tags: ["Nature", "Earth"], subtopics: ["Ecosystems", "Biodiversity", "Climate Change", "Pollution", "Renewable Energy", "Conservation"] },
        { title: "Organic Chemistry", desc: "Carbon-based compounds and reactions.", tags: ["Chemistry", "Hard"], subtopics: ["Alkanes and Alkenes", "Stereochemistry", "Substitution Reactions", "Elimination Reactions", "Alcohols and Ethers", "Aromatic Compounds"] },
        { title: "Geology", desc: "Rocks, minerals, and plate tectonics.", tags: ["Earth", "Science"], subtopics: ["Minerals", "Rock Cycle", "Plate Tectonics", "Volcanoes", "Earthquakes", "Geologic Time"] },
        { title: "Neuroscience Intro", desc: "Brain structure and function.", tags: ["Brain", "Biology"], subtopics: ["Neurons", "Synapses", "Brain Anatomy", "Sensory Systems", "Motor Control", "Learning and Memory"] },
        { title: "Quantum Physics", desc: "Particles, waves, and uncertainty.", tags: ["Physics", "Advanced"], subtopics: ["Wave-Particle Duality", "Schrodinger Equation", "Quantum States", "Uncertainty Principle", "Quantum Entanglement", "Applications"] },
        { title: "Microbiology", desc: "Bacteria, viruses, and fungi.", tags: ["Biology", "Tiny"], subtopics: ["Cell Structure", "Bacterial Growth", "Viruses", "Immunology", "Pathogens", "Microbial Ecology"] },
        { title: "Physics: Electromagnetism", desc: "Electric and magnetic fields.", tags: ["Physics", "Hard"], subtopics: ["Electric Charge", "Electric Fields", "Gauss's Law", "Electric Potential", "Circuits", "Magnetic Fields"] }
    ],
    "Engineering": [
        { title: "Electrical Engineering", desc: "Circuits, electronics, and power.", tags: ["Circuits", "Tech"], subtopics: ["Circuit Analysis", "Op-Amps", "Semiconductors", "Digital Logic", "Microcontrollers", "Power Systems"] },
        { title: "Civil Engineering", desc: "Structures, materials, and infrastructure.", tags: ["Building", "Design"], subtopics: ["Statics", "Mechanics of Materials", "Structural Analysis", "Geotechnical Eng", "Transportation", "Hydraulics"] },
        { title: "Chemical Engineering", desc: "Process design and thermodynamics.", tags: ["Chemistry", "Industry"], subtopics: ["Mass Balance", "Energy Balance", "Fluid Mechanics", "Heat Transfer", "Reaction Engineering", "Process Control"] },
        { title: "Aerospace Engineering", desc: "Flight mechanics and aerodynamics.", tags: ["Space", "Flight"], subtopics: ["Aerodynamics", "Propulsion", "Flight Dynamics", "Structures", "Avionics", "Space Systems"] },
        { title: "Robotics Basics", desc: "Sensors, actuators, and control.", tags: ["Robots", "Tech"], subtopics: ["Kinematics", "Dynamics", "Sensors", "Actuators", "Control Systems", "Robot Programming"] },
        { title: "Materials Science", desc: "Properties of metals, polymers, and ceramics.", tags: ["Materials", "Science"], subtopics: ["Crystal Structure", "Defects", "Phase Diagrams", "Mechanical Properties", "Polymers", "Ceramics"] },
        { title: "Software Engineering", desc: "SDLC, patterns, and architecture.", tags: ["Code", "Tech"], subtopics: ["Requirements", "Design Patterns", "Architecture", "Testing", "Agile", "DevOps"] },
        { title: "Biomedical Engineering", desc: "Tech in healthcare and medicine.", tags: ["Health", "Tech"], subtopics: ["Biomechanics", "Biomaterials", "Medical Imaging", "Biosensors", "Tissue Engineering", "Prosthetics"] },
        { title: "Mechanical Engineering", desc: "Machines and thermodynamics.", tags: ["Machines", "Tech"], subtopics: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer", "Machine Design", "Manufacturing", "Vibrations"] },
        { title: "Systems Engineering", desc: "Managing complex systems.", tags: ["Systems", "Management"], subtopics: ["System Lifecycle", "Requirements Eng", "System Architecture", "Integration", "Verification", "Validation"] }
    ],
    "Finance": [
        { title: "Stock Market Basics", desc: "How the stock market works.", tags: ["Investing", "Money"], subtopics: ["Market Structure", "Stocks vs Bonds", "ETFs and Mutual Funds", "Fundamental Analysis", "Technical Analysis", "Portfolio Management"] },
        { title: "Crypto Investing", desc: "Blockchain and digital assets.", tags: ["Crypto", "Tech"], subtopics: ["Blockchain Basics", "Bitcoin", "Ethereum", "DeFi", "Wallets and Security", "NFTs"] },
        { title: "Real Estate Investing", desc: "Buying and managing property.", tags: ["Property", "Wealth"], subtopics: ["Residential vs Commercial", "Financing", "Property Management", "Flipping", "REITs", "Market Analysis"] },
        { title: "Retirement Planning", desc: "401k, IRAs, and long-term savings.", tags: ["Planning", "Life"], subtopics: ["Compound Interest", "401k Basics", "IRAs", "Social Security", "Withdrawal Strategies", "Estate Planning"] },
        { title: "Tax Strategies", desc: "Optimizing your tax situation.", tags: ["Taxes", "Money"], subtopics: ["Income Tax Basics", "Deductions", "Credits", "Capital Gains", "Tax-Advantaged Accounts", "Filing Status"] },
        { title: "Accounting 101", desc: "Balance sheets and income statements.", tags: ["Business", "Math"], subtopics: ["Accounting Equation", "Debits and Credits", "Income Statement", "Balance Sheet", "Cash Flow", "Financial Ratios"] },
        { title: "Personal Budgeting", desc: "Managing your daily finances.", tags: ["Money", "Life"], subtopics: ["Tracking Expenses", "Creating a Budget", "Saving Goals", "Debt Repayment", "Emergency Funds", "Frugal Living"] },
        { title: "Venture Capital", desc: "Investing in startups.", tags: ["Business", "High Risk"], subtopics: ["Deal Sourcing", "Due Diligence", "Valuation", "Term Sheets", "Portfolio Strategy", "Exits"] },
        { title: "Forex Trading", desc: "Currency exchange markets.", tags: ["Trading", "Global"], subtopics: ["Currency Pairs", "Pips and Lots", "Leverage", "Fundamental Analysis", "Technical Indicators", "Risk Management"] },
        { title: "Corporate Finance", desc: "Managing company funds.", tags: ["Business", "Career"], subtopics: ["Time Value of Money", "Capital Budgeting", "Cost of Capital", "Working Capital", "Dividends", "Mergers"] }
    ],
    "Marketing": [
        { title: "Social Media Marketing", desc: "Growth on Instagram, TikTok, etc.", tags: ["Social", "Growth"], subtopics: ["Platform Strategy", "Content Creation", "Community Management", "Analytics", "Paid Social", "Influencer Collabs"] },
        { title: "SEO Mastery", desc: "Ranking higher on search engines.", tags: ["Search", "Tech"], subtopics: ["Keyword Research", "On-Page SEO", "Off-Page SEO", "Technical SEO", "Local SEO", "SEO Tools"] },
        { title: "Content Marketing", desc: "Creating value through content.", tags: ["Writing", "Creative"], subtopics: ["Content Strategy", "Blogging", "Video Marketing", "Podcasting", "Distribution", "Lead Generation"] },
        { title: "Email Marketing", desc: "Building and monetizing lists.", tags: ["Sales", "Business"], subtopics: ["Building a List", "Segmentation", "Automation", "Copywriting for Email", "Deliverability", "Analytics"] },
        { title: "Brand Strategy", desc: "Building a strong brand identity.", tags: ["Branding", "Design"], subtopics: ["Brand Archetypes", "Positioning", "Visual Identity", "Messaging", "Brand Voice", "Rebranding"] },
        { title: "Copywriting Secrets", desc: "Writing words that sell.", tags: ["Writing", "Sales"], subtopics: ["Headlines", "Value Propositions", "Persuasion Principles", "Sales Pages", "Email Copy", "Ad Copy"] },
        { title: "Affiliate Marketing", desc: "Earning through referrals.", tags: ["Sales", "Passive"], subtopics: ["Choosing a Niche", "Finding Programs", "Content Strategy", "Traffic Sources", "Compliance", "Optimization"] },
        { title: "Google Ads", desc: "PPC campaigns and optimization.", tags: ["Ads", "Traffic"], subtopics: ["Campaign Setup", "Keyword Match Types", "Ad Copy", "Bidding Strategies", "Quality Score", "Remarketing"] },
        { title: "Influencer Marketing", desc: "Working with creators.", tags: ["Social", "PR"], subtopics: ["Finding Influencers", "Outreach", "Campaign Briefs", "Contracts", "Measurement", "Relationships"] },
        { title: "Product Marketing", desc: "Launching and positioning products.", tags: ["Product", "Business"], subtopics: ["Market Research", "Go-to-Market Strategy", "Positioning", "Messaging", "Sales Enablement", "Launch Planning"] }
    ],
    "Design": [
        { title: "UI Design Basics", desc: "Interface design principles.", tags: ["UI", "Tech"], subtopics: ["Layout", "Typography", "Color Theory", "Spacing", "Components", "Prototyping"] },
        { title: "UX Research", desc: "Understanding user needs.", tags: ["UX", "Research"], subtopics: ["User Interviews", "Surveys", "Personas", "User Journeys", "Usability Testing", "Heuristic Evaluation"] },
        { title: "Graphic Design", desc: "Color, typography, and layout.", tags: ["Art", "Creative"], subtopics: ["Design Principles", "Logo Design", "Branding", "Print Design", "Digital Design", "Portfolio Building"] },
        { title: "Logo Design", desc: "Creating memorable brand marks.", tags: ["Branding", "Art"], subtopics: ["Research", "Sketching", "Vectorizing", "Typography", "Color Palettes", "Presentation"] },
        { title: "Web Design", desc: "Designing for the modern web.", tags: ["Web", "Tech"], subtopics: ["Responsive Design", "Grid Systems", "Accessibility", "Wireframing", "Mockups", "Handoff"] },
        { title: "Motion Graphics", desc: "Animation for video and web.", tags: ["Animation", "Video"], subtopics: ["Keyframes", "Timing", "Easing", "After Effects Basics", "Typography Animation", "Logo Reveals"] },
        { title: "3D Modeling", desc: "Blender and 3D concepts.", tags: ["3D", "Art"], subtopics: ["Modeling", "Texturing", "Lighting", "Rendering", "Rigging", "Animation"] },
        { title: "Typography", desc: "The art of type.", tags: ["Text", "Art"], subtopics: ["Typeface Selection", "Hierarchy", "Kerning", "Leading", "Pairing Fonts", "Expressive Type"] },
        { title: "Design Systems", desc: "Scalable design libraries.", tags: ["UI", "Product"], subtopics: ["Atomic Design", "Tokens", "Component Libraries", "Documentation", "Governance", "Adoption"] },
        { title: "Interaction Design", desc: "Designing behaviors.", tags: ["UI", "UX"], subtopics: ["Micro-interactions", "Transitions", "Gestures", "Feedback", "State Management", "Animation Principles"] }
    ],
    "Art": [
        { title: "Sketching 101", desc: "Pencil techniques and shading.", tags: ["Drawing", "Creative"], subtopics: ["Lines and Shapes", "Shading", "Perspective", "Composition", "Still Life", "Figure Drawing"] },
        { title: "Watercolor Painting", desc: "Techniques for water-based paint.", tags: ["Painting", "Color"], subtopics: ["Washes", "Glazing", "Wet-on-Wet", "Color Mixing", "Texture", "Landscapes"] },
        { title: "Oil Painting", desc: "Canvas, mixing, and layering.", tags: ["Painting", "Classic"], subtopics: ["Materials", "Underpainting", "Fat over Lean", "Glazing", "Impasto", "Portraiture"] },
        { title: "Digital Art", desc: "Procreate and Photoshop basics.", tags: ["Digital", "Tech"], subtopics: ["Brushes", "Layers", "Blending Modes", "Masking", "Color Theory", "Character Design"] },
        { title: "Art History", desc: "Renaissance to Modern Art.", tags: ["History", "Culture"], subtopics: ["Renaissance", "Baroque", "Impressionism", "Cubism", "Surrealism", "Contemporary Art"] },
        { title: "Sculpture", desc: "Clay and 3D forms.", tags: ["3D", "Hands-on"], subtopics: ["Clay Basics", "Armatures", "Modeling", "Carving", "Casting", "Finishing"] },
        { title: "Portrait Drawing", desc: "Capturing faces and expressions.", tags: ["Drawing", "People"], subtopics: ["Proportions", "Features", "Shading Faces", "Hair", "Expressions", "Likeness"] },
        { title: "Landscape Painting", desc: "Capturing nature and light.", tags: ["Painting", "Nature"], subtopics: ["Composition", "Atmospheric Perspective", "Trees and Foliage", "Water and Reflections", "Skies", "Light and Shadow"] },
        { title: "Abstract Art", desc: "Expression through form and color.", tags: ["Creative", "Modern"], subtopics: ["Composition", "Color Psychology", "Texture", "Mark Making", "Intuitive Painting", "Critique"] },
        { title: "Calligraphy", desc: "Beautiful handwriting.", tags: ["Writing", "Art"], subtopics: ["Tools", "Basic Strokes", "Alphabet", "Flourishing", "Layout", "Modern Calligraphy"] }
    ],
    "History": [
        { title: "European History", desc: "Middle Ages to Modern Era.", tags: ["Europe", "Culture"], subtopics: ["Middle Ages", "Renaissance", "Reformation", "Enlightenment", "Industrial Revolution", "World Wars"] },
        { title: "American History", desc: "Revolution to Civil Rights.", tags: ["USA", "Politics"], subtopics: ["Colonial Era", "Revolution", "Civil War", "Reconstruction", "Gilded Age", "Civil Rights"] },
        { title: "Ancient Rome", desc: "Rise and fall of the Empire.", tags: ["Ancient", "War"], subtopics: ["Roman Republic", "Julius Caesar", "The Empire", "Roman Army", "Daily Life", "Fall of Rome"] },
        { title: "Ancient Egypt", desc: "Pharaohs and pyramids.", tags: ["Ancient", "Africa"], subtopics: ["Old Kingdom", "Pyramids", "Middle Kingdom", "New Kingdom", "Religion", "Hieroglyphs"] },
        { title: "World War I", desc: "The Great War explained.", tags: ["War", "20th Century"], subtopics: ["Causes", "Trench Warfare", "Eastern Front", "Technology", "Home Front", "Treaty of Versailles"] },
        { title: "World War II", desc: "Global conflict and aftermath.", tags: ["War", "20th Century"], subtopics: ["Rise of Fascism", "Blitzkrieg", "Pacific Theater", "Holocaust", "D-Day", "Atomic Bomb"] },
        { title: "Cold War", desc: "Espionage and nuclear tension.", tags: ["Politics", "Modern"], subtopics: ["Iron Curtain", "Korean War", "Cuban Missile Crisis", "Vietnam War", "Space Race", "Fall of Berlin Wall"] },
        { title: "Asian History", desc: "Dynasties and modern growth.", tags: ["Asia", "Culture"], subtopics: ["Chinese Dynasties", "Samurai Japan", "Silk Road", "Mongol Empire", "Colonialism", "Modern Asia"] },
        { title: "African History", desc: "Empires and colonization.", tags: ["Africa", "Culture"], subtopics: ["Ancient Civilizations", "Mali Empire", "Slave Trade", "Scramble for Africa", "Decolonization", "Modern Africa"] },
        { title: "Latin American History", desc: "Pre-Columbian to Modern.", tags: ["Americas", "Culture"], subtopics: ["Maya/Aztec/Inca", "Conquest", "Colonial Era", "Independence", "Revolutions", "Modern Era"] }
    ],
    "Writing": [
        { title: "Creative Writing", desc: "Fiction and storytelling.", tags: ["Fiction", "Creative"], subtopics: ["Plot Structure", "Character Development", "Setting", "Dialogue", "Point of View", "Theme"] },
        { title: "Screenwriting", desc: "Writing for film and TV.", tags: ["Movies", "Script"], subtopics: ["Formatting", "Three-Act Structure", "Scene Construction", "Dialogue", "Character Arcs", "Loglines"] },
        { title: "Technical Writing", desc: "Manuals and documentation.", tags: ["Tech", "Career"], subtopics: ["Audience Analysis", "Clarity and Conciseness", "Formatting", "API Documentation", "User Guides", "Editing"] },
        { title: "Poetry Workshop", desc: "Verse, rhyme, and meter.", tags: ["Art", "Expression"], subtopics: ["Imagery", "Metaphor", "Rhyme and Meter", "Forms (Haiku, Sonnet)", "Free Verse", "Performance"] },
        { title: "Journalism", desc: "Reporting and news writing.", tags: ["News", "Career"], subtopics: ["News Values", "Interviewing", "Inverted Pyramid", "Feature Writing", "Ethics", "Investigative Reporting"] },
        { title: "Blogging", desc: "Writing for the web.", tags: ["Web", "Content"], subtopics: ["Niche Selection", "SEO for Bloggers", "Headlines", "Formatting", "Monetization", "Promotion"] },
        { title: "Novel Writing", desc: "Plotting and character arcs.", tags: ["Fiction", "Long-form"], subtopics: ["Outlining", "Pacing", "Subplots", "Conflict", "Climax", "Revision"] },
        { title: "Editing Skills", desc: "Polishing and refining text.", tags: ["Grammar", "Career"], subtopics: ["Copyediting", "Proofreading", "Developmental Editing", "Style Guides", "Common Errors", "Feedback"] },
        { title: "Grant Writing", desc: "Securing funding through words.", tags: ["Business", "Non-profit"], subtopics: ["Finding Grants", "Proposal Structure", "Needs Statement", "Budgeting", "Evaluation", "Submission"] },
        { title: "Memoir Writing", desc: "Telling your life story.", tags: ["Non-fiction", "Life"], subtopics: ["Finding Your Theme", "Memory and Truth", "Structure", "Voice", "Scene vs Summary", "Publishing"] }
    ],
    "Philosophy": [
        { title: "Ethics", desc: "Right, wrong, and morality.", tags: ["Moral", "Life"], subtopics: ["Utilitarianism", "Deontology", "Virtue Ethics", "Moral Relativism", "Applied Ethics", "Meta-ethics"] },
        { title: "Existentialism", desc: "Meaning, freedom, and absurdity.", tags: ["Life", "Modern"], subtopics: ["Kierkegaard", "Nietzsche", "Sartre", "Camus", "The Absurd", "Freedom and Responsibility"] },
        { title: "Political Philosophy", desc: "Justice, state, and rights.", tags: ["Politics", "Society"], subtopics: ["Social Contract", "Liberty", "Justice", "Democracy", "Marxism", "Rights"] },
        { title: "Metaphysics", desc: "Reality and existence.", tags: ["Abstract", "Deep"], subtopics: ["Ontology", "Free Will", "Time", "Causality", "Mind-Body Problem", "Identity"] },
        { title: "Epistemology", desc: "Theory of knowledge.", tags: ["Knowledge", "Logic"], subtopics: ["Belief and Truth", "Justification", "Skepticism", "Rationalism vs Empiricism", "Perception", "Testimony"] },
        { title: "Eastern Philosophy", desc: "Buddhism, Taoism, and Confucianism.", tags: ["Asia", "Spirituality"], subtopics: ["Four Noble Truths", "Tao Te Ching", "Confucian Ethics", "Zen", "Hindu Philosophy", "Meditation"] },
        { title: "Logic 101", desc: "Arguments and fallacies.", tags: ["Thinking", "Reason"], subtopics: ["Propositional Logic", "Syllogisms", "Fallacies", "Inductive Logic", "Symbolic Logic", "Critical Thinking"] },
        { title: "Philosophy of Mind", desc: "Consciousness and the brain.", tags: ["Mind", "Science"], subtopics: ["Dualism", "Materialism", "Functionalism", "Consciousness", "AI and Mind", "Personal Identity"] },
        { title: "Aesthetics", desc: "Beauty and art theory.", tags: ["Art", "Beauty"], subtopics: ["Definition of Art", "Beauty", "Taste", "Interpretation", "Art and Morality", "Nature"] },
        { title: "Stoicism", desc: "Ancient wisdom for modern life.", tags: ["Life", "Practical"], subtopics: ["Control", "Virtue", "Emotions", "Marcus Aurelius", "Seneca", "Epictetus"] }
    ],
    "Social Science": [
        { title: "Sociology 101", desc: "Society and social structures.", tags: ["Society", "People"], subtopics: ["Culture", "Socialization", "Social Stratification", "Race and Ethnicity", "Gender", "Deviance"] },
        { title: "Anthropology", desc: "Human cultures and evolution.", tags: ["Culture", "History"], subtopics: ["Biological Anthro", "Archaeology", "Cultural Anthro", "Linguistics", "Ethnography", "Human Evolution"] },
        { title: "Economics Micro", desc: "Supply, demand, and markets.", tags: ["Money", "Business"], subtopics: ["Supply and Demand", "Elasticity", "Consumer Choice", "Production", "Market Structures", "Labor Markets"] },
        { title: "Economics Macro", desc: "GDP, inflation, and policy.", tags: ["Money", "Politics"], subtopics: ["GDP", "Inflation", "Unemployment", "Fiscal Policy", "Monetary Policy", "International Trade"] },
        { title: "Political Science", desc: "Government systems and voting.", tags: ["Politics", "Gov"], subtopics: ["Ideologies", "Constitutions", "Elections", "Political Parties", "International Relations", "Public Policy"] },
        { title: "Geography", desc: "Places, maps, and environments.", tags: ["Earth", "World"], subtopics: ["Physical Geography", "Human Geography", "Maps and GIS", "Urbanization", "Population", "Geopolitics"] },
        { title: "Criminology", desc: "Crime and justice systems.", tags: ["Law", "Society"], subtopics: ["Theories of Crime", "Policing", "Courts", "Corrections", "Juvenile Justice", "Victimology"] },
        { title: "Linguistics", desc: "The science of language.", tags: ["Language", "Science"], subtopics: ["Phonetics", "Phonology", "Morphology", "Syntax", "Semantics", "Sociolinguistics"] },
        { title: "Gender Studies", desc: "Gender in society.", tags: ["Society", "Culture"], subtopics: ["Social Construction", "Feminism", "Masculinity", "Gender Roles", "Intersectionality", "Media Representation"] },
        { title: "Urban Planning", desc: "Designing cities.", tags: ["City", "Design"], subtopics: ["History of Cities", "Zoning", "Transportation", "Housing", "Sustainability", "Community Design"] }
    ],
    "Cooking": [
        { title: "Italian Cuisine", desc: "Pasta, pizza, and sauces.", tags: ["Food", "Europe"], subtopics: ["Pasta Making", "Sauces", "Pizza", "Risotto", "Italian Desserts", "Regional Styles"] },
        { title: "French Cooking", desc: "Techniques and mother sauces.", tags: ["Food", "Fancy"], subtopics: ["Knife Skills", "Mother Sauces", "Stocks", "Braising", "Pastry Basics", "Plating"] },
        { title: "Asian Street Food", desc: "Wok, steam, and spice.", tags: ["Food", "Asia"], subtopics: ["Dumplings", "Noodles", "Stir Fry", "Curries", "Sushi Basics", "Street Snacks"] },
        { title: "Baking Basics", desc: "Bread, cakes, and pastries.", tags: ["Baking", "Sweet"], subtopics: ["Bread Making", "Cakes", "Cookies", "Pies", "Pastry Dough", "Decoration"] },
        { title: "Vegan Cooking", desc: "Plant-based meals.", tags: ["Health", "Diet"], subtopics: ["Plant Proteins", "Dairy Alternatives", "Vegan Baking", "Flavor Building", "Meal Planning", "Global Vegan"] },
        { title: "Grilling Masterclass", desc: "BBQ and fire cooking.", tags: ["Meat", "Summer"], subtopics: ["Gas vs Charcoal", "Temperature Control", "Marinades", "Steaks", "Smoking", "Vegetables"] },
        { title: "Knife Skills", desc: "Chopping and prep like a pro.", tags: ["Skills", "Prep"], subtopics: ["Knife Selection", "Sharpening", "Basic Cuts", "Safety", "Speed", "Butchery Basics"] },
        { title: "Meal Prepping", desc: "Planning for the week.", tags: ["Health", "Time"], subtopics: ["Planning", "Shopping", "Batch Cooking", "Storage", "Reheating", "Variety"] },
        { title: "Pastry Arts", desc: "Advanced desserts.", tags: ["Baking", "Art"], subtopics: ["Chocolate Work", "Sugar Work", "Entremets", "Ice Cream", "Plated Desserts", "Macarons"] },
        { title: "Cocktail Mixing", desc: "Bartending basics.", tags: ["Drinks", "Party"], subtopics: ["Tools", "Spirits", "Classic Cocktails", "Syrups", "Garnishes", "Mixology"] }
    ],
    "DIY": [
        { title: "Woodworking", desc: "Building with timber.", tags: ["Wood", "Craft"], subtopics: ["Tools", "Joinery", "Finishing", "Furniture", "Safety", "Projects"] },
        { title: "Plumbing Basics", desc: "Fixing leaks and pipes.", tags: ["Home", "Repair"], subtopics: ["Tools", "Leaks", "Toilets", "Faucets", "Drains", "Pipes"] },
        { title: "Electrical Basics", desc: "Wiring and safety.", tags: ["Home", "Power"], subtopics: ["Safety", "Tools", "Outlets", "Switches", "Fixtures", "Troubleshooting"] },
        { title: "Gardening", desc: "Growing plants and veg.", tags: ["Nature", "Outdoors"], subtopics: ["Soil", "Planting", "Watering", "Pests", "Pruning", "Harvesting"] },
        { title: "Sewing 101", desc: "Stitching and mending.", tags: ["Craft", "Fabric"], subtopics: ["Machine Basics", "Stitches", "Patterns", "Alterations", "Fabrics", "Projects"] },
        { title: "Car Maintenance", desc: "Oil changes and checks.", tags: ["Auto", "Repair"], subtopics: ["Oil Change", "Tires", "Fluids", "Brakes", "Battery", "Diagnostics"] },
        { title: "Painting Walls", desc: "Interior design refresh.", tags: ["Home", "Decor"], subtopics: ["Prep", "Tools", "Techniques", "Colors", "Cleanup", "Effects"] },
        { title: "Furniture Restoration", desc: "Upcycling old pieces.", tags: ["Craft", "Eco"], subtopics: ["Cleaning", "Stripping", "Sanding", "Staining", "Painting", "Upholstery"] },
        { title: "Knitting", desc: "Yarn and needles.", tags: ["Craft", "Relax"], subtopics: ["Cast On", "Knit Stitch", "Purl Stitch", "Cast Off", "Patterns", "Finishing"] },
        { title: "Home Security", desc: "Keeping your home safe.", tags: ["Home", "Safety"], subtopics: ["Locks", "Cameras", "Lighting", "Alarms", "Habits", "Smart Home"] }
    ],
    "Sports": [
        { title: "Yoga for Beginners", desc: "Flexibility and balance.", tags: ["Health", "Relax"], subtopics: ["Breathwork", "Sun Salutations", "Standing Poses", "Seated Poses", "Balance", "Meditation"] },
        { title: "Strength Training", desc: "Lifting and muscle gain.", tags: ["Gym", "Fitness"], subtopics: ["Squats", "Deadlifts", "Bench Press", "Overhead Press", "Rows", "Programming"] },
        { title: "Swimming", desc: "Strokes and endurance.", tags: ["Water", "Cardio"], subtopics: ["Freestyle", "Breaststroke", "Backstroke", "Butterfly", "Turns", "Drills"] },
        { title: "Cycling", desc: "Road and mountain biking.", tags: ["Bike", "Cardio"], subtopics: ["Bike Fit", "Gears", "Climbing", "Descending", "Maintenance", "Training"] },
        { title: "Tennis Basics", desc: "Serve, volley, and rally.", tags: ["Game", "Skill"], subtopics: ["Grip", "Forehand", "Backhand", "Serve", "Volley", "Footwork"] },
        { title: "Basketball Drills", desc: "Shooting and dribbling.", tags: ["Team", "Ball"], subtopics: ["Dribbling", "Shooting", "Passing", "Defense", "Layups", "Game IQ"] },
        { title: "Soccer Skills", desc: "Passing and control.", tags: ["Team", "Ball"], subtopics: ["Dribbling", "Passing", "Shooting", "Control", "Defense", "Tactics"] },
        { title: "HIIT Workouts", desc: "High intensity cardio.", tags: ["Gym", "Fast"], subtopics: ["Tabata", "Circuits", "Bodyweight", "Cardio", "Strength", "Recovery"] },
        { title: "Pilates", desc: "Core strength and control.", tags: ["Health", "Core"], subtopics: ["Principles", "Mat Work", "Breathing", "Core", "Flexibility", "Posture"] },
        { title: "Running", desc: "From 5K to Marathon.", tags: ["Cardio", "Outdoors"], subtopics: ["Form", "Pacing", "Training Plans", "Nutrition", "Injury Prevention", "Gear"] }
    ],
    "Photography": [
        { title: "Exposure Triangle", desc: "ISO, Aperture, Shutter Speed.", tags: ["Camera", "Tech"], subtopics: ["Aperture", "Shutter Speed", "ISO", "Manual Mode", "Metering", "Histograms"] },
        { title: "Composition", desc: "Rule of thirds and leading lines.", tags: ["Art", "Visual"], subtopics: ["Rule of Thirds", "Leading Lines", "Framing", "Symmetry", "Patterns", "Depth"] },
        { title: "Portrait Photography", desc: "Lighting and posing.", tags: ["People", "Studio"], subtopics: ["Natural Light", "Studio Light", "Posing", "Lenses", "Communication", "Editing"] },
        { title: "Landscape Photo", desc: "Capturing the outdoors.", tags: ["Nature", "Travel"], subtopics: ["Gear", "Planning", "Light", "Composition", "Filters", "Post-Processing"] },
        { title: "Editing in Lightroom", desc: "Post-processing basics.", tags: ["Edit", "Software"], subtopics: ["Importing", "Basic Adjustments", "Color Grading", "Masking", "Presets", "Exporting"] },
        { title: "Street Photography", desc: "Capturing candid moments.", tags: ["City", "Candid"], subtopics: ["Gear", "Settings", "Techniques", "Ethics", "Composition", "Editing"] },
        { title: "Night Photography", desc: "Long exposure and stars.", tags: ["Low Light", "Tech"], subtopics: ["Gear", "Settings", "Focusing", "Light Painting", "Astrophotography", "Cityscapes"] },
        { title: "Product Photography", desc: "Shooting for sales.", tags: ["Business", "Studio"], subtopics: ["Lighting", "Backgrounds", "Styling", "Angles", "Editing", "Gear"] },
        { title: "Mobile Photography", desc: "Great shots with a phone.", tags: ["Phone", "Easy"], subtopics: ["Apps", "Lenses", "Lighting", "Composition", "Editing", "Accessories"] },
        { title: "Wildlife Photography", desc: "Capturing animals.", tags: ["Nature", "Action"], subtopics: ["Gear", "Settings", "Patience", "Fieldcraft", "Composition", "Ethics"] }
    ],
    "Personal Growth": [
        { title: "Time Management", desc: "Productivity and focus.", tags: ["Productivity", "Work"], subtopics: ["Prioritization", "Pomodoro", "Time Blocking", "Goal Setting", "Eliminating Distractions", "Review"] },
        { title: "Public Speaking", desc: "Confidence on stage.", tags: ["Communication", "Career"], subtopics: ["Preparation", "Structure", "Delivery", "Body Language", "Anxiety", "Q&A"] },
        { title: "Leadership Skills", desc: "Managing teams and vision.", tags: ["Career", "Management"], subtopics: ["Vision", "Communication", "Delegation", "Motivation", "Conflict Resolution", "Feedback"] },
        { title: "Emotional Intelligence", desc: "Understanding feelings.", tags: ["Psychology", "Social"], subtopics: ["Self-Awareness", "Self-Regulation", "Motivation", "Empathy", "Social Skills", "Practice"] },
        { title: "Negotiation", desc: "Getting to yes.", tags: ["Business", "Skill"], subtopics: ["Preparation", "Strategy", "Communication", "Persuasion", "Closing", "Ethics"] },
        { title: "Critical Thinking", desc: "Analyzing arguments.", tags: ["Logic", "Mind"], subtopics: ["Analysis", "Evaluation", "Inference", "Explanation", "Self-Regulation", "Biases"] },
        { title: "Goal Setting", desc: "Achieving your dreams.", tags: ["Planning", "Success"], subtopics: ["SMART Goals", "Action Plans", "Tracking", "Accountability", "Review", "Adjustment"] },
        { title: "Stress Management", desc: "Coping with pressure.", tags: ["Health", "Mind"], subtopics: ["Triggers", "Relaxation", "Exercise", "Sleep", "Diet", "Mindfulness"] },
        { title: "Networking", desc: "Building professional connections.", tags: ["Career", "Social"], subtopics: ["Strategy", "Events", "LinkedIn", "Follow-up", "Value", "Relationships"] },
        { title: "Financial Literacy", desc: "Managing money.", tags: ["Money", "Life"], subtopics: ["Budgeting", "Saving", "Investing", "Debt", "Credit", "Retirement"] }
    ]
};

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    let data = JSON.parse(rawData);

    // Remove previous bulk added plans (simple heuristic: if ID matches our bulk pattern or if we are replacing these categories entirely)
    // Better approach: Filter out plans from the target categories that look like bulk plans, then add new ones.
    // Actually, to be safe and clean, let's remove ALL plans from the target categories that are NOT the original "good" ones if any exist, 
    // but since we know we just added a bunch of "bad" bulk ones, we can just filter out based on the ID pattern we used before or just overwrite.
    // The previous script used IDs like "mat_0_17..."

    // Let's filter out any plan where the ID matches the pattern /^[a-z]{3}_\d+_\d+$/ which was used in the previous script.
    data = data.filter(p => !/^[a-z]{3}_\d+_\d+$/.test(p.id));

    let addedCount = 0;
    Object.keys(contentMap).forEach(category => {
        const templates = contentMap[category];
        templates.forEach((template, index) => {
            const newPlan = createPlan(category, index, template.title, template.desc, template.tags, template.subtopics);
            data.push(newPlan);
            addedCount++;
        });
    });

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`Successfully added ${addedCount} high-quality plans to Data.json`);

} catch (error) {
    console.error('Error:', error);
}
