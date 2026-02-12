document.addEventListener('DOMContentLoaded', () => {

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50 ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)';
    });

    // Mobile Menu Toggle (Placeholder)
    const menuIcon = document.querySelector('.fa-bars');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            alert('Mobile menu feature coming soon!');
        });
    }

    // Simple animation on scroll for products
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px)';
        product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(product);
    });

    // Auto-update Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // WhatsApp Inquiry Button - Global
    const wpButtons = document.querySelectorAll('.btn-whatsapp');
    wpButtons.forEach(wp => {
        wp.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = '917984294889'; // <-- your number
            let productName = '';

            const productCard = wp.closest('.product-card');
            if (productCard) {
                const titleEl = productCard.querySelector('.product-info h3') || productCard.querySelector('.pd-title');
                if (titleEl) productName = titleEl.textContent.trim();
            }

            // Your default message with product name
            const msg = productName
                ? `Hello 👋\nI am interested in your product: ${productName}`
                : `Hello 👋\nI am interested in your products`;

            // Use api.whatsapp.com to improve Desktop App behavior
            const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;

            window.open(url, '_blank');
        });
    });

});
