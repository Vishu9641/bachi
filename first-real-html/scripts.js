// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('explore-button').addEventListener('click', function() {
        const loveText = document.createElement('div');
        loveText.textContent = 'I love you Bachi'; // Create a new div with the text
        loveText.className = 'i-love-you-text enlarge'; // Add classes for styling

        // Append the loveText to the body
        document.body.appendChild(loveText);

        // Fade out everything else
        const elementsToFade = document.body.children;
        for (let i = 0; i < elementsToFade.length; i++) {
            if (elementsToFade[i] !== loveText) { // Skip the love text
                elementsToFade[i].classList.add('fade-out');
            }
        }

        // Redirect to 'second.html' after the animation
        setTimeout(function() {
            window.location.href = 'Hand-names-html/index.html';  // Navigate to second.html
        }, 3000); // Timeout matches the CSS transition duration
    });
});
