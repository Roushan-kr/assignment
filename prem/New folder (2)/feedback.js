// feedback.js

document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent form submission

    // Gather form data
    const formData = new FormData(this);

    try {
        // Send the form data to the server
        const response = await fetch('http://localhost:3000/submit-teacher-feedback', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Show thank you message
            document.getElementById('thankYouMessage').classList.remove('hidden');
            // Hide form
            document.getElementById('feedbackForm').classList.add('hidden');

            // Fetch average ratings for bar chart
            const ratingsResponse = await fetch('http://localhost:3000/get-average-ratings');
            const ratingsData = await ratingsResponse.json();

            // Call function to display the chart
            showRatingChart(ratingsData);
        } else {
            const errorText = await response.text();
            alert(`Failed to submit feedback: ${errorText}`);
        }
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    }
});

// Function to display the bar chart
function showRatingChart(ratingsData) {
    const ctx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Overall', 'Knowledge', 'Communication', 'Behavior', 'Sincerity', 'Availability', 'Engagement', 'Attendance', 'Way of Teaching', 'Subject Knowledge', 'Fairness'],
            datasets: [{
                label: 'Average Rating',
                data: [
                    ratingsData.overAllRating,
                    ratingsData.knowledgeRating,
                    ratingsData.communicationRating,
                    ratingsData.behaviorRating,
                    ratingsData.sincerityRating,
                    ratingsData.availabilityRating,
                    ratingsData.engagementRating,
                    ratingsData.attendanceRating,
                    ratingsData.wayOfTeachingRating,
                    ratingsData.subjectKnowledgeRating,
                    ratingsData.fairnessRating
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}
