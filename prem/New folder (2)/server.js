const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulated database
let feedbackData = [];

// Endpoint to handle feedback submission
app.post('/submit-teacher-feedback', (req, res) => {
    const { feedback, overAllRating, byUserId, forUserId, knowledgeRating, communicationRating, behaviorRating, sincerityRating, availabilityRating, engagementRating, attendanceRating, wayOfTeachingRating, subjectKnowledgeRating, fairnessRating } = req.body;

    // Save feedback data (in-memory for demonstration)
    feedbackData.push({
        feedback,
        overAllRating: parseFloat(overAllRating),
        byUserId,
        forUserId,
        knowledgeRating: parseFloat(knowledgeRating),
        communicationRating: parseFloat(communicationRating),
        behaviorRating: parseFloat(behaviorRating),
        sincerityRating: parseFloat(sincerityRating),
        availabilityRating: parseFloat(availabilityRating),
        engagementRating: parseFloat(engagementRating),
        attendanceRating: parseFloat(attendanceRating),
        wayOfTeachingRating: parseFloat(wayOfTeachingRating),
        subjectKnowledgeRating: parseFloat(subjectKnowledgeRating),
        fairnessRating: parseFloat(fairnessRating),
    });

    res.status(200).send('Feedback submitted successfully');
});

// Endpoint to get average ratings
app.get('/get-average-ratings', (req, res) => {
    if (feedbackData.length === 0) {
        return res.json({
            overAllRating: 0,
            knowledgeRating: 0,
            communicationRating: 0,
            behaviorRating: 0,
            sincerityRating: 0,
            availabilityRating: 0,
            engagementRating: 0,
            attendanceRating: 0,
            wayOfTeachingRating: 0,
            subjectKnowledgeRating: 0,
            fairnessRating: 0
        });
    }

    const averageRatings = feedbackData.reduce((acc, feedback) => {
        acc.overAllRating += feedback.overAllRating;
        acc.knowledgeRating += feedback.knowledgeRating;
        acc.communicationRating += feedback.communicationRating;
        acc.behaviorRating += feedback.behaviorRating;
        acc.sincerityRating += feedback.sincerityRating;
        acc.availabilityRating += feedback.availabilityRating;
        acc.engagementRating += feedback.engagementRating;
        acc.attendanceRating += feedback.attendanceRating;
        acc.wayOfTeachingRating += feedback.wayOfTeachingRating;
        acc.subjectKnowledgeRating += feedback.subjectKnowledgeRating;
        acc.fairnessRating += feedback.fairnessRating;
        return acc;
    }, {
        overAllRating: 0,
        knowledgeRating: 0,
        communicationRating: 0,
        behaviorRating: 0,
        sincerityRating: 0,
        availabilityRating: 0,
        engagementRating: 0,
        attendanceRating: 0,
        wayOfTeachingRating: 0,
        subjectKnowledgeRating: 0,
        fairnessRating: 0
    });

    const count = feedbackData.length;

    res.json({
        overAllRating: averageRatings.overAllRating / count,
        knowledgeRating: averageRatings.knowledgeRating / count,
        communicationRating: averageRatings.communicationRating / count,
        behaviorRating: averageRatings.behaviorRating / count,
        sincerityRating: averageRatings.sincerityRating / count,
        availabilityRating: averageRatings.availabilityRating / count,
        engagementRating: averageRatings.engagementRating / count,
        attendanceRating: averageRatings.attendanceRating / count,
        wayOfTeachingRating: averageRatings.wayOfTeachingRating / count,
        subjectKnowledgeRating: averageRatings.subjectKnowledgeRating / count,
        fairnessRating: averageRatings.fairnessRating / count
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
