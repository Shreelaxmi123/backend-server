"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
const getSubmissions = () => {
    const data = fs_1.default.readFileSync('src/db.json', 'utf-8');
    return JSON.parse(data);
};
app.get('/search', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
    }
    const submissions = getSubmissions();
    const foundSubmission = submissions.find(submission => submission.email === email.toString());
    if (foundSubmission) {
        return res.json(foundSubmission);
    }
    else {
        return res.status(404).json({ error: 'Submission not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
