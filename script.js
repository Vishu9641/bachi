let currentCloudIndex = 0;
const clouds = document.querySelectorAll('.cloud');
const nextButton = document.getElementById('nextButton');

function showCloud(index) {
    // Show the current cloud
    clouds[index].style.display = 'block';
    clouds[index].style.opacity = 1; // Set opacity for fade-in effect
    setTimeout(() => {
        clouds[index].style.opacity = 0; // Start fade out
        setTimeout(() => {
            clouds[index].style.display = 'none'; // Hide it after fading out
            currentCloudIndex++;
            if (currentCloudIndex < clouds.length) {
                showCloud(currentCloudIndex); // Show next cloud
            } else {
                nextButton.style.display = 'block'; // Show the button after the last cloud
            }
        }, 500); // Wait for fade out to complete
    }, 5000); // Show each cloud for 10 seconds
}

// Start showing clouds
showCloud(currentCloudIndex);

// Redirect to third.html when button is clicked
nextButton.addEventListener('click', () => {
    window.location.href = 'first-real-html/index.html';
});
