document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  let currentIndex = 0;
  const slideCount = slides.length / 2; // Only count unique slides

  // Create dots
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateCarousel() {
    const offset = slides[0].offsetWidth + 30; // Width + gap
    track.style.transform = `translateX(-${offset * currentIndex}px)`;

    // Update active dot
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  }

  // Button events
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Auto-rotate
  let autoRotate = setInterval(nextSlide, 3000);
  const carousel = document.querySelector('.logo-carousel');

  carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
  carousel.addEventListener('mouseleave', () => {
    autoRotate = setInterval(nextSlide, 3000);
  });
});