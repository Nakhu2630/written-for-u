// Function to toggle the expanded content for each step
function expandStep(stepElement) {
    console.log("Expanding step:", stepElement); // Check if function is triggered

    // Find the expanded content within the clicked step
    const expandedContent = stepElement.querySelector('.expanded-content, .expanded-content1, .expanded-content2, .expanded-contenta');

    // Close any other expanded content that may be open
    document.querySelectorAll('.expanded-content, .expanded-content1, .expanded-content2, .expanded-contenta').forEach(content => {
        if (content !== expandedContent) {
            content.style.display = 'none'; // Hide other contents
        }
    });

    // Toggle display of the clicked step's expanded content
    if (expandedContent.style.display === 'block') {
        expandedContent.style.display = 'none'; // Close if already open
    } else {
        expandedContent.style.display = 'block'; // Open if closed
    }
}

// Positioning each step around the central circle
function positionSteps() {
    const steps = document.querySelectorAll('.step');
    const radius = 300; // Adjust this for spacing
    const centerX = 400; // Center X position (half of container width)
    const centerY = 400; // Center Y position (half of container height)
    const angle = 360 / steps.length; // Angle between each step

    steps.forEach((step, index) => {
        const stepAngle = angle * index; // Calculate the angle for each step in degrees
        const x = radius * Math.cos((stepAngle * Math.PI) / 180); // Calculate x position
        const y = radius * Math.sin((stepAngle * Math.PI) / 180); // Calculate y position

        // Set the position of each step
        step.style.left = `${centerX + x}px`; // Center X + x offset
        step.style.top = `${centerY - y}px`;  // Center Y - y offset (invert Y-axis)

        // Add click event listener for each step
        step.addEventListener('click', function(event) {
            console.log("Step clicked:", step); // Check if click event triggers
            event.stopPropagation(); // Prevents event from bubbling up
            expandStep(this);
        });
    });
}


// Function to enable image zoom
function enableImageZoom() {
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'none';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    // Function to show the overlay with the clicked image
    function showZoomedImage(imageSrc) {
        overlay.innerHTML = `<img src="${imageSrc}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">`;
        overlay.style.display = 'flex';
    }

    // Hide overlay when clicked outside the image
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Add click event listeners to each image to zoom in
    document.querySelectorAll('.her1, .her2, .her3, .her4, .her5').forEach(image => {
        image.addEventListener('click', function(event) {
            console.log("Image clicked:", this.src); // Check if image click triggers
            event.stopPropagation(); // Prevents step expansion from triggering
            showZoomedImage(this.src); // Show the clicked image in overlay
        });
    });
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded"); // Check if DOMContentLoaded event fires
    positionSteps(); // Position the steps around the circle
    enableImageZoom(); // Enable zoom on images
});
