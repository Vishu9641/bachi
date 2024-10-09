let heartbeatInterval;

// Function to start the heartbeat and vibration effect
function startHeartbeat() {
    const vibrationPattern = [100, 300];
    navigator.vibrate(vibrationPattern);
    heartbeatInterval = setInterval(() => {
        navigator.vibrate(vibrationPattern);
    }, 1000);

    // Enable stop vibration button when vibration starts
    document.getElementById('stopVibrationButton').disabled = false;
}

// Function to stop the heartbeat and vibration effect
function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    navigator.vibrate(0); // Stop any ongoing vibration

    // Disable stop vibration button after vibration stops
    document.getElementById('stopVibrationButton').disabled = true;
}

// Format time to mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Handle audio playback (independent of heartbeat)
const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.innerText = '⏸️ Pause'; // Change button text to "Pause"

        // Update time every 250 milliseconds for smoother transition
        const duration = audio.duration; // Get the duration of the audio
        const timerInterval = setInterval(() => {
            if (!audio.paused && !audio.ended) {
                document.getElementById('timeLeft').innerText = formatTime(Math.floor(audio.currentTime));
                document.getElementById('timeRight').innerText = formatTime(Math.floor(duration - audio.currentTime));

                // Move the boy icon smoothly based on audio progress
                const progress = (audio.currentTime / duration) * 100; // Calculate progress percentage
                document.querySelector('.boy-icon').style.left = `${progress}%`; // Move the boy icon
            } else {
                clearInterval(timerInterval); // Stop the timer if audio ends
            }
        }, 250); // Update every 250 milliseconds for smoother movement

        // Reset button text when audio ends
        audio.addEventListener('ended', function () {
            clearInterval(timerInterval); // Stop the timer
            document.getElementById('timeLeft').innerText = "0:00"; // Reset display
            document.getElementById('timeRight').innerText = "0:00"; // Reset display
            document.querySelector('.boy-icon').style.left = "100%"; // Move boy icon to the end
            playButton.innerText = '▶️ Words for you (play)'; // Reset button text
        });
    } else {
        audio.pause();
        playButton.innerText = '▶️ Resume Again Bachi'; // Change button text to "Resume"
    }
});

// Cloud animation setup
const clouds = document.querySelectorAll('.cloud');

function animateClouds() {
    clouds.forEach((cloud, index) => {
        const showTime = Math.random() * 4000 + 2000; // Random time for how long it will stay visible (2-6 seconds)
        const hideTime = Math.random() * 4000 + 2000; // Random time for how long it will stay hidden (2-6 seconds)

        // Initial visibility
        cloud.style.opacity = 0;

        // Show and hide the cloud in a loop
        function toggleCloud() {
            cloud.style.opacity = 1; // Fade in

            setTimeout(() => {
                cloud.style.opacity = 0; // Fade out

                // Choose a different cloud to appear next
                const nextCloudIndex = (index + Math.floor(Math.random() * (clouds.length - 1)) + 1) % clouds.length;
                clouds[nextCloudIndex].style.opacity = 1; // Fade in next cloud

                setTimeout(() => {
                    clouds[nextCloudIndex].style.opacity = 0; // Fade out the next cloud
                    // Call toggleCloud again after hiding
                    setTimeout(toggleCloud, hideTime);
                }, showTime); // Time it stays visible

            }, showTime); // Time it stays visible
        }

        // Start the toggle process for this cloud
        toggleCloud();
    });
}

// Start cloud animations
animateClouds();

// Attach vibration button functionalities
document.getElementById('vibrationButton').addEventListener('click', startHeartbeat);
document.getElementById('stopVibrationButton').addEventListener('click', stopHeartbeat);
