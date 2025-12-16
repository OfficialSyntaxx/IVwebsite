
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const UPDATES_JSON_PATH = path.resolve(__dirname, '../../IronVeil-GameEngine/data/updates.json');
const BLOG_DATA_PATH = path.resolve(__dirname, '../src/data/blogPosts.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('--- Iron-Veil Blog Generator ---');

    // 1. Check for updates.json
    if (!fs.existsSync(UPDATES_JSON_PATH)) {
        console.error(`Error: updates.json not found at ${UPDATES_JSON_PATH}`);
        console.log('Please create the file or ensure the path is correct.');
        process.exit(1);
    }

    try {
        const updatesRaw = fs.readFileSync(UPDATES_JSON_PATH, 'utf8');
        const updates = JSON.parse(updatesRaw);

        if (!updates.pending || updates.pending.length === 0) {
            console.log('No pending updates found in updates.json.');
            process.exit(0);
        }

        console.log(`Found ${updates.pending.length} pending updates.`);

        // 2. Gather Metadata
        const title = await question('Blog Post Title: ');
        const author = await question('Author Name (e.g. Syntaxx, Cranked): ');

        let role = "Developer";
        let authorImage = "https://oldschool.runescape.wiki/images/Wise_Old_Man.png";

        if (author.toLowerCase() === 'syntaxx') {
            role = "Co owner & Wizard";
        } else if (author.toLowerCase() === 'cranked') {
            role = "Owner & Mastermind";
            authorImage = "https://oldschool.runescape.wiki/images/Vannaka.png";
        }

        const date = new Date().toISOString().split('T')[0];
        const excerpt = await question('Short Excerpt: ');
        const tagsInput = await question('Tags (comma separated): ');
        const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

        // 3. Format Content
        let content = `# ${title}\n\n${excerpt}\n\n## Patch Notes\n`;

        // Group by category if possible, otherwise list
        const categories = {};
        updates.pending.forEach(u => {
            const cat = u.category || 'General';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(u.description);
        });

        for (const [cat, items] of Object.entries(categories)) {
            content += `### ${cat}\n`;
            items.forEach(item => {
                content += `- ${item}\n`;
            });
            content += '\n';
        }

        content += "\nSee you in game!\n";

        // 4. Create New Post Object
        const newPost = {
            id: `update-${new Date().getTime()}`,
            title,
            date,
            author,
            role,
            authorImage,
            excerpt,
            content,
            tags
        };

        // 5. Read Existing Blog Data
        const blogDataRaw = fs.readFileSync(BLOG_DATA_PATH, 'utf8');
        const blogData = JSON.parse(blogDataRaw);

        // Prepend new post
        blogData.unshift(newPost);

        // 6. Save Blog Data
        fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(blogData, null, 4));
        console.log(`\nSuccess! Blog post "${title}" added to src/data/blogPosts.json`);

        // 7. Clear Pending Updates
        updates.pending = [];
        fs.writeFileSync(UPDATES_JSON_PATH, JSON.stringify(updates, null, 4));
        console.log('Cleared pending updates from updates.json');

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        rl.close();
    }
}

main();
