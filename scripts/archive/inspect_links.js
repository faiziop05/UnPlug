const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'utlils', 'Data.json');

try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    let count = 0;
    console.log("Sample of Generic Links:");
    for (const plan of data) {
        for (const task of plan.tasks) {
            if (task.resources) {
                if (task.resources.web && task.resources.web.includes("search_query")) {
                    console.log(`Web: ${task.resources.web} (Task: ${task.title})`);
                    count++;
                }
                if (task.resources.youtube && task.resources.youtube.includes("results?search_query")) {
                    console.log(`YT: ${task.resources.youtube} (Task: ${task.title})`);
                    count++;
                }
            }
            if (count > 20) break;
        }
        if (count > 20) break;
    }

} catch (error) {
    console.error('Error:', error);
}
