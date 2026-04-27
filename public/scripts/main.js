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
        searchBar.id = 'searchBarWrapper';
        searchBar.innerHTML = `
            <input type="search" placeholder="Search products..." class="search-input" id="searchInput" autofocus autocomplete="off">
            <button class="icon-btn" id="closeSearchBtn" aria-label="Close search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        this.parentElement.insertBefore(searchBar, this);
        this.style.display = 'none';

        // Wire up close button
        document.getElementById('closeSearchBtn').addEventListener('click', closeSearch);

        // Wire up live product filtering
        const input = document.getElementById('searchInput');
        input.focus();
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const container = document.getElementById('allProducts') || document.getElementById('productContainer');
            if (!container) return;

            // Use the global `products` array populated by products.js
            const allProds = window.products || [];
            if (!allProds.length) return;

            // Respect the active category page filter
            const pathname = window.location.pathname.toLowerCase();
            const pathMatch = pathname.match(/(laptops|smartphones|tablets|accessories|printers|bags)/);
            const activeCategory = pathMatch ? pathMatch[0] : null;

            let pool = allProds;
            if (activeCategory) {
                pool = allProds.filter(p => {
                    if (!p.category) return false;
                    const cat = p.category.toLowerCase().trim();
                    return cat === activeCategory ||
                           cat === activeCategory.replace(/s$/, '') ||
                           activeCategory === cat.replace(/s$/, '');
                });
            }

            if (query === '') {
                // Restore normal paginated view
                if (window.renderProducts) window.renderProducts();
            } else {
                const results = pool.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    (p.description && p.description.toLowerCase().includes(query)) ||
                    (p.category && p.category.toLowerCase().includes(query))
                );

                if (results.length === 0) {
                    container.innerHTML = `
                        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#6b7280;">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5" style="margin-bottom:12px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                            <p style="font-size:1rem;font-weight:600;margin-bottom:4px;">No results for "<em>${query}</em>"</p>
                            <p style="font-size:0.85rem;">Try a different search term or browse categories.</p>
                        </div>`;
                } else {
                    // Use createProductCard if available, otherwise basic render
                    if (window.createProductCard) {
                        container.innerHTML = results.map(p => window.createProductCard(p)).join('');
                    } else {
                        container.innerHTML = results.map(p => `<div>${p.name}</div>`).join('');
                    }
                    // Hide pagination while searching
                    const pagination = document.querySelector('.pagination');
                    if (pagination) pagination.style.display = 'none';
                }
            }
        });
    } else {
        closeSearch();
    }
});

function closeSearch() {
    const searchBar = document.getElementById('searchBarWrapper');
    if (searchBar) searchBar.remove();
    const btn = document.getElementById('searchBtn');
    if (btn) btn.style.display = 'flex';
    searchOpen = false;
    // Restore pagination and products
    const pagination = document.querySelector('.pagination');
    if (pagination) pagination.style.display = '';
    if (window.renderProducts) window.renderProducts();
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






// Hero pictures logic has been moved to an inline script in index.html to guarantee reliable execution.

// ─── FEATURED PRODUCTS CAROUSEL ──────────────────────────────
// Now completely handled by CSS animations in main.css (scroll-marquee)

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


