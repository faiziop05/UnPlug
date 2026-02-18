const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');
const createPlanPath = path.join(__dirname, 'src', 'main', 'CreatePlan.js');

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Extract categories from CreatePlan.js (manual extraction based on file content)
    const categories = [
        "All", "Technology", "Health", "Lifestyle", "Language", "Music",
        "Computer", "Programming", "Mathematics", "Science", "Engineering",
        "Business", "Finance", "Marketing", "Design",
        "Art", "History", "Writing", "Philosophy", "Social Science",
        "Cooking", "DIY", "Sports", "Photography", "Personal Growth"
    ];

    const existingCategories = new Set();
    data.forEach(plan => {
        if (plan.categories) {
            plan.categories.forEach(c => existingCategories.add(c));
        } else if (plan.category) {
            existingCategories.add(plan.category);
        }
    });

    const missingCategories = categories.filter(c => !existingCategories.has(c) && c !== "All");

    console.log("Missing Categories:", missingCategories);

    // Check for generic links
    let genericLinksCount = 0;
    data.forEach(plan => {
        plan.tasks.forEach(task => {
            if (task.resources) {
                if (task.resources.web && task.resources.web.includes("search_query")) genericLinksCount++;
                if (task.resources.youtube && task.resources.youtube.includes("results?search_query")) genericLinksCount++;
            }
        });
    });

    console.log("Generic Links Found:", genericLinksCount);

} catch (error) {
    console.error('Error:', error);
}
