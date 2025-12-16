// using native fetch

async function run() {
    try {
        const id = '1765768464724';
        const url = `http://localhost:3002/api/users/${id}`;
        console.log(`Sending PUT to ${url}`);

        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword: 'newpass123' })
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

run();
