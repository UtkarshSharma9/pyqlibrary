// <<<<<<< HEAD
// require('dotenv').config();
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const url = require('url');
// const { connectToDatabase, getDb } = require('./db'); // Import DB connection

// const PORT = 3330;
// const ROOT_DIR = path.join(__dirname, '..');

// // const questionsData = require('./questionsData');

// const mimeTypes = {
//     '.html': 'text/html',
//     '.css': 'text/css',
//     '.js': 'text/javascript',
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',
//     '.jpeg': 'image/jpeg    ',
//     '.gif': 'image/gif',
//     '.svg': 'image/svg+xml',
//     '.json': 'application/json',
//     '.ico': 'image/x-icon',
//     '.woff': 'font/woff',
//     '.woff2': 'font/woff2',
//     '.ttf': 'font/ttf'
// };

// const server = http.createServer(async (req, res) => {
//     console.log(`Request: ${req.url}`);

//     const parsedUrl = url.parse(req.url, true);
//     let pathname = parsedUrl.pathname;

//     if (pathname === '/api/questions') {
//         const { exam, year, subject, chapter } = parsedUrl.query;

//         try {
//             const db = getDb();
//             const collection = db.collection('questions');

//             const query = {};
//             // Case-insensitive match for exam and subject
//             if (exam) query.exam = { $regex: new RegExp(`^${exam}$`, 'i') };
//             if (subject) query.subject = { $regex: new RegExp(`^${subject}$`, 'i') };

//             // Handle year as both string and number
//             if (year) {
//                 const numYear = parseInt(year);
//                 query.year = { $in: [year, !isNaN(numYear) ? numYear : year] };
//             }

//             console.log(`Querying DB with:`, JSON.stringify(query));
//             let filteredQuestions = await collection.find(query).toArray();
//             console.log(`Found ${filteredQuestions.length} questions`);

//             // Filter by chapter locally to handle normalization
//             if (chapter) {
//                 const searchChapter = chapter.toLowerCase().replace(/[^a-z0-9]/g, '');
//                 filteredQuestions = filteredQuestions.filter(q => {
//                     const qChapter = q.chapter ? q.chapter.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
//                     return qChapter === searchChapter;
//                 });
//                 console.log(`After chapter filter: ${filteredQuestions.length} questions`);
//             }

//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(filteredQuestions));
//         } catch (error) {
//             console.error("Error fetching questions from DB:", error);
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ error: "Internal Server Error" }));
//         }
//         return;
//     }

//     let filePath = pathname === '/' ? 'index.html' : pathname;
//     const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
//     const absolutePath = path.join(ROOT_DIR, safePath);

//     const extname = path.extname(absolutePath).toLowerCase();
//     const contentType = mimeTypes[extname] || 'application/octet-stream';

//     fs.readFile(absolutePath, (err, content) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 res.writeHead(404, { 'Content-Type': 'text/html' });
//                 res.end('<h1>404 Not Found</h1>', 'utf-8');
//             } else {
//                 res.writeHead(500);
//                 res.end(`Server Error: ${err.code}`);
//             }
//         } else {
//             res.writeHead(200, { 'Content-Type': contentType });
//             res.end(content, 'utf-8');
//         }
//     });
// });

// // Connect to MongoDB then start the server
// connectToDatabase().then(async () => {
//     try {
//         const db = getDb();
//         const count = await db.collection('questions').countDocuments();
//         console.log(`Connected to DB. Total questions in 'questions' collection: ${count}`);
//     } catch (err) {
//         console.error("Error counting documents:", err);
//     }

//     server.listen(PORT, '0.0.0.0', () => {
//         console.log(`Server running at http://localhost:${PORT}/`);
//     });
// }).catch(err => {
//     console.error("Failed to start server due to DB connection error:", err);
//     // You might still want to start the server even if DB fails, 
//     // or keep it offline until DB is ready.
//     server.listen(PORT, () => {
//         console.log(`Server running at http://localhost:${PORT}/ (DB Connection Failed)`);
//     });
// });

require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { connectToDatabase, getDb } = require('./db'); // Import DB connection

const PORT = 3330;
const ROOT_DIR = path.join(__dirname, '..');

// const questionsData = require('./questionsData');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
    console.log(`Request: ${req.url}`);

    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    if (pathname === '/api/questions') {
        const { exam, year, subject, chapter } = parsedUrl.query;

        try {
            const db = getDb();
            const collection = db.collection('questions');

            const query = {};
            // Case-insensitive match for exam and subject
            if (exam) query.exam = { $regex: new RegExp(`^${exam}$`, 'i') };
            if (subject) query.subject = { $regex: new RegExp(`^${subject}$`, 'i') };

            // Handle year as both string and number
            if (year) {
                const numYear = parseInt(year);
                query.year = { $in: [year, !isNaN(numYear) ? numYear : year] };
            }

            console.log(`Querying DB with:`, JSON.stringify(query));
            let filteredQuestions = await collection.find(query).toArray();
            console.log(`Found ${filteredQuestions.length} questions`);

            // Filter by chapter locally to handle normalization
            if (chapter) {
                const searchChapter = chapter.toLowerCase().replace(/[^a-z0-9]/g, '');
                filteredQuestions = filteredQuestions.filter(q => {
                    const qChapter = q.chapter ? q.chapter.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
                    return qChapter === searchChapter;
                });
                console.log(`After chapter filter: ${filteredQuestions.length} questions`);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filteredQuestions));
        } catch (error) {
            console.error("Error fetching questions from DB:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
        return;
    }

    let filePath = pathname === '/' ? 'index.html' : pathname;
    const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(ROOT_DIR, safePath);

    const extname = path.extname(absolutePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(absolutePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Connect to MongoDB then start the server
connectToDatabase().then(async () => {
    try {
        const db = getDb();
        const count = await db.collection('questions').countDocuments();
        console.log(`Connected to DB. Total questions in 'questions' collection: ${count}`);
    } catch (err) {
        console.error("Error counting documents:", err);
    }

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
}).catch(err => {
    console.error("Failed to start server due to DB connection error:", err);
    // You might still want to start the server even if DB fails, 
    // or keep it offline until DB is ready.
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/ (DB Connection Failed)`);
    });
});

// >>>>>>> 5e51da38dddbf02e200f71944c8138daf45f5066
