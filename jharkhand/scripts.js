document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Existing Hero Slider ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.jh-hero-slider img');

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        if (slides.length === 0) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initial slide display and interval start
    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 3000); // Changed interval to 3s for a better UX
    }

    // --- 2. Responsive Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');

    if (hamburger && navContainer) {
        hamburger.addEventListener('click', () => {
            navContainer.classList.toggle('active');
        });
    }
    
    // --- 3. Active Navigation Link Highlighter ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // --- 4. Accordion for Travel Tips ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Optional: close all other items
            // accordionItems.forEach(i => {
            //     i.classList.remove('active');
            //     i.querySelector('.accordion-content').style.maxHeight = null;
            // });
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });

    // --- 5. Gallery Lightbox ---
    const galleryImages = document.querySelectorAll('.full-gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryImages.length > 0 && lightbox) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // --- 6. Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                const successMsg = document.getElementById('form-success');
                successMsg.textContent = 'Thank you! Your message has been sent.';
                successMsg.style.display = 'block';
                contactForm.reset();
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }
        });

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        function validateForm() {
            let isValid = true;
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message cannot be empty.');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            return isValid;
        }

        function showError(input, message) {
            const formGroup = input.parentElement;
            const error = formGroup.querySelector('.error-message');
            error.innerText = message;
            error.style.display = 'block';
        }

        function clearError(input) {
            const formGroup = input.parentElement;
            const error = formGroup.querySelector('.error-message');
            error.style.display = 'none';
        }

        function isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }

});
