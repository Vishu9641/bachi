const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
let showingImage1 = true;

function changeImage() {
    if (showingImage1) {
        image1.style.opacity = 0;
        image2.style.opacity = 1;

        setTimeout(() => {
            showingImage1 = false;
        }, 1500);
    } else {
        image2.style.opacity = 0;
        image1.style.opacity = 1;

        setTimeout(() => {
            showingImage1 = true;
        }, 1500);
    }
}

setInterval(() => {
    changeImage();
    setTimeout(changeImage, 3000);
}, 4500);

function openNewPage() {
    window.location.href = "last-html-heart-beat/index.html";
}

// Play/Pause functionality for audio with icons
let audioPlaying = false;
const audio = document.getElementById('audioMessage');
const audioControlBtn = document.getElementById('audioControlBtn');
const girlIcon = document.querySelector('.girl-icon'); // Girl Icon Element
const boyIcon = document.querySelector('.boy-icon'); // Boy Icon Element

function toggleAudio() {
    if (audioPlaying) {
        audio.pause();
        audioControlBtn.textContent = "▶️ Play"; // Play Icon and Text
    } else {
        audio.play();
        audioControlBtn.textContent = "⏸️ Pause"; // Pause Icon and Text
    }
    audioPlaying = !audioPlaying;
}

// Event listener to reset button when the audio ends
audio.addEventListener('ended', function() {
    audioControlBtn.textContent = "▶️ Play"; // Reset to Play when audio ends
    audioPlaying = false;
    
    // Trigger hug animation (girl and boy come together)
    girlIcon.style.left = "50%"; // Center the girl
    boyIcon.style.right = "50%"; // Center the boy
});

// Update the girl's position based on audio progress
audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    girlIcon.style.left = `${progress}%`;
    boyIcon.style.right = `${progress}%`;
});
