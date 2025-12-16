
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const PORT = 3002;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Ironsyn';
const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const DATA_FILE = path.join(__dirname, 'data', 'applications.json');

const BLOG_FILE = path.join(__dirname, '../src/data/blogPosts.json');

// --- APP HELPERS ---
const readApps = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || []; }
    catch (err) { console.error("Error reading apps:", err); return []; }
};
const writeApps = (apps) => fs.writeFileSync(DATA_FILE, JSON.stringify(apps, null, 2));

// --- BLOG HELPERS ---
const readBlog = () => {
    if (!fs.existsSync(BLOG_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(BLOG_FILE, 'utf8')) || []; }
    catch (err) { console.error("Error reading blog:", err); return []; }
};
const writeBlog = (posts) => fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 4));


// --- ENDPOINTS ---



// Blog
app.get('/api/blog', (req, res) => {
    res.json(readBlog());
});

// Auth
app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.post('/api/blog', (req, res) => {
    const { password, post } = req.body;

    // Simple auth check
    if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: 'Invalid password' });
    }

    if (!post || !post.title || !post.content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add metadata if missing
    const newPost = {
        id: post.id || `update-${Date.now()}`,
        date: post.date || new Date().toISOString().split('T')[0],
        ...post
    };

    const posts = readBlog();
    posts.unshift(newPost); // Add to top
    writeBlog(posts);

    console.log(`New blog post created: ${newPost.title}`);
    res.json({ success: true, post: newPost });
});

app.put('/api/blog/:id', (req, res) => {
    const { password, post } = req.body;
    const { id } = req.params;



    if (password !== ADMIN_PASSWORD) return res.status(403).json({ error: 'Invalid password' });

    let posts = readBlog();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: 'Post not found' });

    posts[index] = { ...posts[index], ...post, id };
    writeBlog(posts);

    console.log(`Blog post updated: ${post.title}`);
    res.json({ success: true });
});

app.delete('/api/blog/:id', (req, res) => {
    const { id } = req.params;
    const password = req.headers['x-admin-password'] || (req.body && req.body.password);

    if (password !== ADMIN_PASSWORD) {
        console.error(`Invalid password attempt for delete: ${password}`);
        return res.status(403).json({ error: 'Invalid password' });
    }

    let posts = readBlog();
    const newPosts = posts.filter(p => p.id.toString() !== id.toString());

    if (posts.length === newPosts.length) return res.status(404).json({ error: 'Post not found' });

    writeBlog(newPosts);
    console.log(`Blog post deleted: ${id}`);
    res.json({ success: true });
});




const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// --- USER HELPERS ---
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')) || []; }
    catch (err) { console.error("Error reading users:", err); return []; }
};
const writeUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

// --- ANNOUNCEMENT HELPERS ---
const ANNOUNCEMENT_FILE = path.join(__dirname, 'data', 'announcements.json');
const readAnnouncements = () => {
    if (!fs.existsSync(ANNOUNCEMENT_FILE)) return [];
    try {
        const data = JSON.parse(fs.readFileSync(ANNOUNCEMENT_FILE, 'utf8'));
        return Array.isArray(data) ? data : [];
    }
    catch (err) { return []; }
};
const writeAnnouncements = (data) => fs.writeFileSync(ANNOUNCEMENT_FILE, JSON.stringify(data, null, 2));


// --- ENDPOINTS ---

// Users (Admin Only)
const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = readUsers();
        // Case-insensitive check for syntaxx/cranked, or Role check
        const user = users.find(u => u.id === decoded.id);

        if (!user) return res.status(401).json({ error: 'Invalid token' });

        const isOwner = user.role === 'Owner' || user.username.toLowerCase() === 'syntaxx' || user.username.toLowerCase() === 'cranked';
        // Allow Admin or Owner or specific names
        if (user.role !== 'Admin' && !isOwner) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Staff Applications (Protected Actions)
app.get('/staff-applications', verifyAdmin, (req, res) => res.json(readApps()));
app.post('/staff-application', (req, res) => {
    const newApp = req.body;
    newApp.id = Date.now();
    newApp.timestamp = new Date().toISOString();
    newApp.status = 'Pending'; // Default status
    const apps = readApps();
    apps.push(newApp);
    writeApps(apps);
    console.log(`New application received from ${newApp.discord}`);
    res.status(200).json({ status: 'success', id: newApp.id });
});

app.put('/staff-application/:id', verifyAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const apps = readApps();
    const index = apps.findIndex(a => a.id.toString() === id.toString());

    if (index === -1) return res.status(404).json({ error: 'Application not found' });

    apps[index].status = status;
    writeApps(apps);
    res.json({ success: true });
});

app.delete('/staff-application/:id', verifyAdmin, (req, res) => {
    const { id } = req.params;
    let apps = readApps();
    const initialLength = apps.length;
    apps = apps.filter(a => a.id.toString() !== id.toString());

    if (apps.length === initialLength) return res.status(404).json({ error: 'Application not found' });

    writeApps(apps);
    res.json({ success: true });
});

app.get('/api/users', verifyAdmin, (req, res) => {
    const users = readUsers().map(u => ({ id: u.id, username: u.username, email: u.email, role: u.role || 'User', joined: u.joined }));
    res.json(users);
});

app.delete('/api/users/:id', verifyAdmin, (req, res) => {
    const { id } = req.params;
    let users = readUsers();
    const initialLength = users.length;
    users = users.filter(u => u.id.toString() !== id.toString());

    if (users.length === initialLength) return res.status(404).json({ error: 'User not found' });

    writeUsers(users);
    res.json({ success: true });
});

app.put('/api/users/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { role, rights, username, email, newPassword } = req.body;
    let users = readUsers();
    const user = users.find(u => u.id.toString() === id.toString());

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (role !== undefined) user.role = role;
    if (rights !== undefined) user.rights = rights;
    if (username) user.username = username;
    if (email) user.email = email;
    if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 10);
    }

    writeUsers(users);
    res.json({ success: true, user });
});

// Announcements (Queue System)
app.get('/api/announcement', (req, res) => {
    let queue = readAnnouncements();
    if (queue.length === 0) return res.json({});

    const active = queue[0];

    // Initialize start time if needed
    if (!active.startTime) {
        active.startTime = Date.now();
        queue[0] = active;
        writeAnnouncements(queue);
    }

    // Check Expiry for Timed
    if (active.type === 'timed' && active.duration) {
        const expiry = active.startTime + (active.duration * 60000);
        if (Date.now() > expiry) {
            console.log(`Announcement expired: ${active.message}`);
            queue.shift(); // Remove active
            writeAnnouncements(queue);

            // Return next immediately
            if (queue.length > 0) {
                const next = queue[0];
                if (next && !next.startTime) {
                    next.startTime = Date.now();
                    writeAnnouncements(queue);
                }
                return res.json(next);
            } else {
                return res.json({});
            }
        }
    }

    res.json(active);
});

app.get('/api/announcement/queue', (req, res) => {
    res.json(readAnnouncements());
});

app.post('/api/announcement', (req, res) => {
    const { message, type, duration } = req.body;
    const queue = readAnnouncements();

    const newAnnouncement = {
        id: Date.now(),
        message,
        type: type || 'permanent',
        duration: type === 'timed' ? duration : null,
        startTime: null
    };

    queue.push(newAnnouncement);
    writeAnnouncements(queue);
    res.json({ success: true, queue });
});

app.delete('/api/announcement/:id', (req, res) => {
    const { id } = req.params;
    let queue = readAnnouncements();
    queue = queue.filter(a => a.id.toString() !== id.toString());
    writeAnnouncements(queue);
    res.json({ success: true, queue });
});

// --- AUTH ENDPOINTS ---

// Register
app.post('/api/register', async (req, res) => {
    const { username, password, email, discord, captchaAnswer, userCaptchaInput } = req.body;

    // 1. Simple Captcha Check (Client sends expected answer for now, or we validate simple math)
    // For this MVP, we will trust the client logic OR implement a simple backend check if passed.
    // Let's assume the client sends { captchaExpected: 10, captchaInput: 10 }
    // Ideally, backend should generate the challenge, but for "simplest", we can validate the math.

    // Better: Client validates math. Backend just needs basic fields.
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const users = readUsers();

    // Check lowercase for uniqueness
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Enforce Capitalization
    const displayUsername = username.charAt(0).toUpperCase() + username.slice(1);

    const newUser = {
        id: Date.now(),
        username: displayUsername,
        email,
        discord,
        password: hashedPassword,
        joined: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, SECRET_KEY, { expiresIn: '7d' });

    res.json({ success: true, token, user: { username: newUser.username, email: newUser.email, discord: newUser.discord, joined: newUser.joined, role: newUser.role || 'User', avatar: newUser.avatar } });
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    // Case-insensitive find
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ success: true, token, user: { username: user.username, email: user.email, discord: user.discord, joined: user.joined, role: user.role || 'User', avatar: user.avatar } });
});

// Me (Persistence)
app.get('/api/me', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: 'No token' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = readUsers();
        const user = users.find(u => u.id === decoded.id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ success: true, user: { username: user.username, email: user.email, discord: user.discord, joined: user.joined, role: user.role || 'User', avatar: user.avatar } });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.put('/api/profile', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        let users = readUsers();
        const index = users.findIndex(u => u.id === decoded.id);

        if (index === -1) return res.status(404).json({ error: 'User not found' });

        const { avatar, newPassword } = req.body;

        if (avatar !== undefined) users[index].avatar = avatar;
        if (newPassword) {
            users[index].password = await bcrypt.hash(newPassword, 10);
        }

        writeUsers(users);

        const user = users[index];
        res.json({ success: true, user: { username: user.username, email: user.email, discord: user.discord, joined: user.joined, role: user.role || 'User', avatar: user.avatar } });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Upload Endpoint
app.post('/api/upload', (req, res) => {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const uploadsDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `avatar-${Date.now()}.png`;
    const filePath = path.join(uploadsDir, filename);

    try {
        fs.writeFileSync(filePath, buffer);
        const fileUrl = `/uploads/${filename}`;
        res.json({ success: true, url: fileUrl });
    } catch (err) {
        console.error("Upload failed", err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// --- SERVE FRONTEND (Production) ---
const DIST_DIR = path.join(__dirname, '../dist');
if (fs.existsSync(DIST_DIR)) {
    app.use(express.static(DIST_DIR));

    // Handle SPA Routing (send index.html for non-API requests)
    app.get('*', (req, res) => {
        if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
            return res.status(404).json({ error: 'Endpoint not found' });
        }
        res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web Server running on http://0.0.0.0:${PORT}`);
});
