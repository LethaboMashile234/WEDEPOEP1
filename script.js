document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Active Link (Applies to all pages) ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
})

    navLinks.forEach(link => {
        // Takes out .html from the href for simpler comparison, and handle root '/'
        const linkPath = link.getAttribute('href').endsWith('index.html') ? '/' : link.getAttribute('href');
        const currentCleanPath = currentPath.endsWith('index.html') ? '/' : currentPath.split('/').pop();

        if (linkPath === currentCleanPath || (linkPath === '/' && currentCleanPath === '')) {
            link.classList.add('active');
        } else if (currentPath.includes(linkPath.replace('.html', '')) && linkPath !== '/') {
            // This covers situations like /products.html matching products in currentPath
            link.classList.add('active');
        }
    });

    // --- Interactive Content & Animations (Example for index.html) ---
    const welcomeHeading = document.getElementById('welcome-heading');
    if (welcomeHeading) {
        welcomeHeading.style.opacity = 0; // Begin invisible for fade-in
        setTimeout(() => {
            welcomeHeading.style.transition = 'opacity 1s ease-in';
            welcomeHeading.style.opacity = 1;
        }, 500); // Holds fade-in slightly
    }

    const taglineParagraph = document.getElementById('tagline-paragraph');
    if (taglineParagraph) {
        taglineParagraph.style.opacity = 0;
        setTimeout(() => {
            taglineParagraph.style.transition = 'opacity 1s ease-in';
            taglineParagraph.style.opacity = 1;
        }, 1000); // Holds fade-in slightly more
    }


    // --- Products Page Functionality ---
    const productImagesContainer = document.getElementById('product-images-container');
    if (productImagesContainer) {
        // --- Lightbox/Gallery with larger view ---
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('caption');
        const closeBtn = document.getElementById('close-modal-btn');

        productImagesContainer.querySelectorAll('.products-img').forEach(img => {
            img.style.cursor = 'pointer'; // Show interactivity
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                captionText.innerHTML = this.alt; // Use alt text as caption
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close modal when clicking outside the image
        if (modal) {
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }


        // --- Search Functionality (Filter Products) ---
        const searchInput = document.getElementById('product-search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', function() {
                const searchTerm = this.value.toLowerCase();
                const productItems = document.querySelectorAll('.product-item');

                productItems.forEach(item => {
                    const productName = item.querySelector('p').textContent.toLowerCase();
                    if (productName.includes(searchTerm)) {
                        item.style.display = 'block'; // Display if matches
                    } else {
                        item.style.display = 'none'; // Keep away if doesn't match
                    }
                });
            });
        }
    }


    // --- Enquiry Form Functionality (enquiries.html) ---
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Halt default form submission

            const nameInput = document.getElementById('enquiry-name');
            const emailInput = document.getElementById('enquiry-email');
            const phoneInput = document.getElementById('enquiry-phone');
            const inquiryTypeSelect = document.getElementById('inquiry-type');
            const messageTextarea = document.getElementById('enquiry-message');
            const responseDiv = document.getElementById('enquiry-response');

            let isValid = true;

            // Delete earlier errors
            document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
            responseDiv.textContent = ''; // Delete earlier response

            // Validate Name
            if (nameInput.value.trim().length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters long.';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Validate Phone (optional but if filled, must match pattern)
            const phonePattern = /^[0-9]{10}$/; // Simple 10-digit check
            if (phoneInput.value.trim() !== '' && !phonePattern.test(phoneInput.value.trim())) {
                document.getElementById('phone-error').textContent = 'Please enter a 10-digit phone number (digits only).';
                isValid = false;
            }

            // Validate Inquiry Type
            if (inquiryTypeSelect.value === '') {
                document.getElementById('inquiry-type-error').textContent = 'Please select an inquiry type.';
                isValid = false;
            }

            // Validate Message
            if (messageTextarea.value.trim().length < 10 || messageTextarea.value.trim().length > 500) {
                document.getElementById('message-error').textContent = 'Message must be between 10 and 500 characters.';
                isValid = false;
            }

            if (isValid) {
                // Simulate AJAX submission
                responseDiv.textContent = 'Submitting your enquiry...';
                setTimeout(() => {
                    const inquiryType = inquiryTypeSelect.value;
                    let responseMessage = `Thank you for your enquiry, ${nameInput.value}!`;

                    if (inquiryType === 'products') {
                        responseMessage += ' We will get back to you shortly regarding our products and their availability.';
                    } else if (inquiryType === 'services') {
                        responseMessage += ' We have received your query about our services and will respond soon.';
                    } else if (inquiryType === 'volunteer') {
                        responseMessage += ' Thank you for your interest in volunteering! We will contact you with more information.';
                    } else if (inquiryType === 'sponsor') {
                        responseMessage += ' We appreciate your interest in sponsoring. Our team will reach out to discuss partnership opportunities.';
                    } else {
                        responseMessage += ' We have received your general enquiry and will get back to you soon.';
                    }
                    responseDiv.textContent = responseMessage;
                    enquiryForm.reset(); // Clear the form
                }, 2000); // Simulate 2-second server response
            } else {
                responseDiv.textContent = 'Please correct the errors in the form.';
                responseDiv.style.color = 'red';
            }
        });
    }


