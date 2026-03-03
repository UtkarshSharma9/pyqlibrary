const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const totalSlides = slides.children.length;

let index = 0;

// Create dots dynamically
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  if (i === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Automatic sliding
setInterval(() => {
  index = (index + 1) % totalSlides;
  updateSlider();
}, 3000);