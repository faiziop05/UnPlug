const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    const categories = [
        "All", "Technology", "Health", "Lifestyle", "Language", "Music",
        "Computer", "Programming", "Mathematics", "Science", "Engineering",
        "Business", "Finance", "Marketing", "Design",
        "Art", "History", "Writing", "Philosophy", "Social Science",
        "Cooking", "DIY", "Sports", "Photography", "Personal Growth"
    ];

    const counts = {};
    categories.forEach(c => counts[c] = 0);

    data.forEach(plan => {
        if (plan.categories) {
            plan.categories.forEach(c => {
                if (counts[c] !== undefined) counts[c]++;
            });
        } else if (plan.category) {
            if (counts[plan.category] !== undefined) counts[plan.category]++;
        }
    });

    console.log("Current Plan Counts per Category:");
    Object.entries(counts).forEach(([cat, count]) => {
        if (cat !== "All") {
            console.log(`${cat}: ${count}`);
        }
    });

} catch (error) {
    console.error('Error:', error);
}
