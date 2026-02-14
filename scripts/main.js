// Main JavaScript

// Mobile menu toggle
document.getElementById('mobileMenuBtn')?.addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
});

// Cart drawer
document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('closeCartBtn')?.addEventListener('click', closeCart);
document.querySelector('.cart-backdrop')?.addEventListener('click', closeCart);

// Search functionality
let searchOpen = false;
document.getElementById('searchBtn')?.addEventListener('click', function() {
    searchOpen = !searchOpen;
    if (searchOpen) {
        const searchBar = document.createElement('div');
        searchBar.className = 'search-bar';
        searchBar.innerHTML = `
            <input type="search" placeholder="Search products..." class="search-input" id="searchInput" autofocus>
            <button class="icon-btn" onclick="closeSearch()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        this.parentElement.insertBefore(searchBar, this);
        this.style.display = 'none';
    }
});

function closeSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.remove();
        document.getElementById('searchBtn').style.display = 'flex';
        searchOpen = false;
    }
}

// Set active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 767px) {
        .nav.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--background);
            border-bottom: 1px solid var(--border);
            padding: 1rem;
            box-shadow: var(--shadow-lg);
        }
    }
    
    .search-bar {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
    }
    
    .search-input {
        width: 16rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        font-size: 0.875rem;
        font-family: var(--font-sans);
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--primary);
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);






//HERO PICTURES SECTION


    const images = [
        'images/bck 114.jpg',
        'images/m 2.jpg',
        'images/bck 10.jpg',
        'images/im22.jpg',
     
    ];

    const titles = [
        'Elevate Your Tech Experience',
        'Unleash Performance with Our Laptops',
        'Accessories that Redefine Your Workflow',
        'Stay Connected with the Latest Smartphones',
     
    ];

    const subtitles = [
        'Discover premium laptops, smartphones, and accessories designed for the modern professional',
        'Powerful devices designed for efficiency and productivity.',
        'Experience innovation and speed with our cutting-edge technology.',
        'Enhance your setup with accessories that make a difference.',
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        const slideImages = document.querySelectorAll('.slide');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');

        // Fade out the current slide
        slideImages[currentIndex].classList.remove('active');
        slideImages[currentIndex].classList.add('slide-out'); // Add slide-out effect

        currentIndex = (currentIndex + 1) % images.length; // Move to the next index

        setTimeout(() => {
            slideImages[currentIndex].classList.remove('slide-out'); // Reset slide-out class
            slideImages[currentIndex].classList.add('active'); // Add active slide class
            heroTitle.textContent = titles[currentIndex];
            heroSubtitle.textContent = subtitles[currentIndex];
        }, 500); // Adjust the timing according to the transition

        updateDots();
    }

    function createDots() {
        const dotsContainer = document.getElementById('dots');
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.index = index; // Store index in a data attribute
            dot.onclick = () => {
                currentIndex = index;
                updateBackground();
            };
            dotsContainer.appendChild(dot);
        });
        updateDots(); // Initialize dots
    }

    function updateBackground() {
        const slideImages = document.querySelectorAll('.slide');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');

        slideImages[currentIndex].classList.remove('active');
        slideImages[currentIndex].classList.remove('slide-out');

        slideImages[currentIndex].classList.add('active'); // Fade in the selected slide
        heroTitle.textContent = titles[currentIndex];
        heroSubtitle.textContent = subtitles[currentIndex];

        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    createDots();
    setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds










// Lazy-load images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach(img => {
    img.loading = "lazy";
  });
});


// Delay heavy scripts until page is fully loaded
window.addEventListener("load", () => {
  const heavyScripts = [
    "/js/analytics.js",
    "/js/tracking.js",
    "/js/carousel.js",
  ];



  // Clean up unused CSS classes after page loads
window.addEventListener("load", () => {
  document.querySelectorAll("[data-remove]").forEach(el => {
    el.classList.remove(el.dataset.remove);
  });
});


  heavyScripts.forEach(src => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.appendChild(script);
  });
});






// Preload critical resources
const preload = (url, type) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = type;
  document.head.appendChild(link);
};

preload("../images/bck 336.jpg", "image"); // your background
preload("/fonts/poppins.woff2", "font");



// Load non-essential CSS after the page is visible
window.addEventListener("load", () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/css/animations.css";
  document.head.appendChild(link);
});


