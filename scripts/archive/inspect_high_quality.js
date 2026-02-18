const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Check counts
    const counts = {};
    data.forEach(plan => {
        if (plan.categories) {
            plan.categories.forEach(c => {
                counts[c] = (counts[c] || 0) + 1;
            });
        }
    });

    console.log("Plan Counts:");
    console.log(counts);

    // Inspect a few new plans (look for IDs starting with 'mat_', 'sci_', etc. but NOT the old ones if any remained, 
    // though we filtered by pattern so they should be new. The new script uses similar ID pattern but let's check content).
    console.log("\nSample Plan Tasks:");
    const sampleCategories = ["Mathematics", "Cooking", "History"];
    sampleCategories.forEach(cat => {
        const plan = data.find(p => p.categories.includes(cat) && p.tasks.length > 3);
        if (plan) {
            console.log(`\nCategory: ${cat}`);
            console.log(`Title: ${plan.title}`);
            console.log(`Tasks: ${plan.tasks.length}`);
            plan.tasks.slice(0, 3).forEach(t => console.log(` - ${t.title} (${t.type})`));
        }
    });

} catch (error) {
    console.error('Error:', error);
}
