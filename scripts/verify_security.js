// using native fetch
async function run() {
    console.log('--- Security Check ---');
    try {
        const loginRes = await fetch('http://localhost:3002/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'Test', password: 'password123' })
        });

        // Check Blog with Env Password
        const blogRes = await fetch('http://localhost:3002/api/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'Ironsyn', post: { title: 'Sec Test', content: 'Test' } })
        });
        console.log('Blog Auth (Ironsyn):', blogRes.status === 200 ? 'PASS' : `FAIL ${blogRes.status}`);

        // Check Users without Token
        const usersRes = await fetch('http://localhost:3002/api/users');
        console.log('Users No Token:', usersRes.status === 401 ? 'PASS (Blocked)' : `FAIL ${usersRes.status}`);

    } catch (e) {
        console.error('Error:', e.message);
    }
}
run();
