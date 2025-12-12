
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'data', 'applications.json');

// Helper to read data
const readApps = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        console.error("Error reading file:", err);
        return [];
    }
};

// Helper to write data
const writeApps = (apps) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(apps, null, 2));
};

// GET endpoint to view applications
app.get('/staff-applications', (req, res) => {
    const apps = readApps();
    res.json(apps);
});

// POST endpoint to submit application
app.post('/staff-application', (req, res) => {
    const newApp = req.body;
    newApp.id = Date.now();
    newApp.timestamp = new Date().toISOString();

    const apps = readApps();
    apps.push(newApp);
    writeApps(apps);

    console.log(`New application received from ${newApp.discord}`);
    res.status(200).json({ status: 'success', id: newApp.id });
});

app.listen(PORT, () => {
    console.log(`Local Web Server running on http://localhost:${PORT}`);
});
