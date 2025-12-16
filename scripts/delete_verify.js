// Native fetch in Node 18+

const BASE_URL = 'http://localhost:3002/api/blog';
const TARGET_ID = 'update-1765769632819';
const PASSWORD = 'Ironsyn';

async function verify() {
    console.log("1. Checking Server Connectivity...");
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error(`GET Status: ${res.status}`);
        const posts = await res.json();
        console.log(`   Connected. Found ${posts.length} posts.`);

        const target = posts.find(p => p.id === TARGET_ID);
        if (target) {
            console.log(`   Target post '${target.title}' found.`);
        } else {
            console.error("   Target post NOT found in list. It might already be deleted.");
            return;
        }

    } catch (err) {
        console.error("   Failed to connect:", err.message);
        return;
    }

    console.log("\n2. Attempting DELETE...");
    try {
        const url = `${BASE_URL}/${TARGET_ID}?password=${encodeURIComponent(PASSWORD)}`;
        console.log(`   DELETE URL: ${url}`);
        const res = await fetch(url, { method: 'DELETE' });
        const data = await res.json();

        if (res.ok) {
            console.log("   DELETE Success:", data);
        } else {
            console.error(`   DELETE Failed (${res.status}):`, data);
        }

    } catch (err) {
        console.error("   DELETE Error:", err.message);
    }
}

verify();
