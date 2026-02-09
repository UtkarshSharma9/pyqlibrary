// Banner Image Slider
document.addEventListener('DOMContentLoaded', function () {
    const bannerImage = document.getElementById('bannerImage');

    if (bannerImage) {
        const images = [
            'public/sliderimg_1.png',
            'public/sliderimg_2.png',
            'public/sliderimg_3.png',
            'public/sliderimg_4.png',
            'public/sliderimg_5.png'
        ];

        let currentIndex = 0;

        // Function to change image with fade effect
        function changeImage() {
            // Add fade out effect
            bannerImage.style.opacity = '0';

            setTimeout(() => {
                // Change to next image
                currentIndex = (currentIndex + 1) % images.length;
                bannerImage.src = images[currentIndex];

                // Fade in
                bannerImage.style.opacity = '1';
            }, 300); // Wait for fade out to complete
        }

        // Change image every 6 seconds
        setInterval(changeImage, 6000);
    }
});
