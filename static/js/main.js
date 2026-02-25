// ShopWave - Main JavaScript File

$(document).ready(function() {
    // Initialize all components
    initAddToCart();
    initQuickView();
    initWishlist();
    initCountdownTimers();
    initNewsletterForm();
    initMobileMenu();
});

// ========================================
// Add to Cart Functionality
// ========================================
function initAddToCart() {
    $('.add-to-cart').click(function(e) {
        e.preventDefault();
        
        const btn = $(this);
        const productId = btn.data('id');
        const originalText = btn.html();
        
        // Disable button and show loading state
        btn.prop('disabled', true)
           .html('<i class="fas fa-spinner fa-spin me-2"></i>Adding...');
        
        // Simulate AJAX request
        setTimeout(function() {
            // Success state
            btn.html('<i class="fas fa-check me-2"></i>Added!')
               .removeClass('btn-primary')
               .addClass('btn-success');
            
            // Update cart counter
            updateCartCounter();
            
            // Show toast notification
            showToast('Product added to cart!', 'success');
            
            // Reset button after delay
            setTimeout(function() {
                btn.html(originalText)
                   .removeClass('btn-success')
                   .addClass('btn-primary')
                   .prop('disabled', false);
            }, 2000);
            
        }, 1000);
    });
}

// ========================================
// Quick View Modal
// ========================================
function initQuickView() {
    $('.quick-view').click(function(e) {
        e.preventDefault();
        
        const productId = $(this).data('id');
        
        // Create modal dynamically
        const modalHtml = `
            <div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title fw-bold">Quick View</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center py-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        $('#quickViewModal').remove();
        
        // Add modal to body
        $('body').append(modalHtml);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
        modal.show();
        
        // Simulate loading product data
        setTimeout(function() {
            $('#quickViewModal .modal-body').html(`
                <div class="row g-4">
                    <div class="col-md-6">
                        <img src="https://images.unsplash.com/photo-1596755094518-9943c5d0e9b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                             class="img-fluid rounded-3" alt="Product">
                    </div>
                    <div class="col-md-6">
                        <p class="text-secondary mb-1">Men's Fashion</p>
                        <h3 class="fw-bold mb-3">Classic Oxford Shirt</h3>
                        <div class="text-warning mb-3">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <span class="text-secondary ms-2">(128 reviews)</span>
                        </div>
                        <h4 class="text-primary fw-bold mb-3">$49.99</h4>
                        <p class="text-secondary mb-4">
                            Premium quality cotton shirt, perfect for any occasion. 
                            Available in multiple colors and sizes.
                        </p>
                        <div class="mb-4">
                            <h6 class="fw-semibold mb-2">Size:</h6>
                            <div class="d-flex gap-2">
                                <span class="border rounded-pill px-3 py-1">S</span>
                                <span class="border rounded-pill px-3 py-1">M</span>
                                <span class="border rounded-pill px-3 py-1">L</span>
                                <span class="border rounded-pill px-3 py-1">XL</span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <h6 class="fw-semibold mb-2">Color:</h6>
                            <div class="d-flex gap-2">
                                <div style="width: 30px; height: 30px; background: #1e4dd8; border-radius: 50%;"></div>
                                <div style="width: 30px; height: 30px; background: #fbbf24; border-radius: 50%;"></div>
                                <div style="width: 30px; height: 30px; background: #000; border-radius: 50%;"></div>
                            </div>
                        </div>
                        <button class="btn btn-primary w-100 rounded-pill py-2 add-to-cart" data-id="${productId}">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            `);
        }, 1000);
        
        // Clean up modal when hidden
        $('#quickViewModal').on('hidden.bs.modal', function() {
            $(this).remove();
        });
    });
}

// ========================================
// Wishlist Toggle
// ========================================
function initWishlist() {
    $('.wishlist-btn').click(function() {
        const btn = $(this);
        const icon = btn.find('i');
        
        btn.toggleClass('btn-outline-danger btn-danger');
        
        if (btn.hasClass('btn-danger')) {
            icon.removeClass('far').addClass('fas');
            showToast('Added to wishlist!', 'success');
        } else {
            icon.removeClass('fas').addClass('far');
            showToast('Removed from wishlist', 'info');
        }
        
        // Add animation
        btn.css('transform', 'scale(1.2)');
        setTimeout(function() {
            btn.css('transform', 'scale(1)');
        }, 200);
    });
}

// ========================================
// Cart Counter Update
// ========================================
function updateCartCounter() {
    const counter = $('#cartCounter');
    const currentCount = parseInt(counter.text()) || 0;
    
    // Animate counter
    counter.text(currentCount + 1)
           .css('transform', 'scale(1.3)')
           .css('transition', 'transform 0.2s ease');
    
    setTimeout(function() {
        counter.css('transform', 'scale(1)');
    }, 200);
}

// ========================================
// Toast Notifications
// ========================================
function showToast(message, type = 'success') {
    const toast = $('<div>')
        .addClass(`toast-notification ${type}`)
        .html(`
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `);
    
    $('body').append(toast);
    
    setTimeout(function() {
        toast.css('animation', 'slideOut 0.3s ease');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

// ========================================
// Countdown Timers
// ========================================
function initCountdownTimers() {
    // Flash sale countdown
    if ($('#flashTimer').length) {
        const endTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
        
        function updateFlashTimer() {
            const now = new Date().getTime();
            const diff = endTime - now;
            
            if (diff <= 0) {
                $('#dealDays, #dealHours, #dealMinutes, #dealSeconds').text('00');
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            $('#dealDays').text(days.toString().padStart(2, '0'));
            $('#dealHours').text(hours.toString().padStart(2, '0'));
            $('#dealMinutes').text(minutes.toString().padStart(2, '0'));
            $('#dealSeconds').text(seconds.toString().padStart(2, '0'));
        }
        
        updateFlashTimer();
        setInterval(updateFlashTimer, 1000);
    }
    
    // Individual product timers
    $('.expiry-timer').each(function() {
        const timer = $(this);
        let time = 24 * 60 * 60; // 24 hours in seconds
        
        function updateTimer() {
            if (time <= 0) {
                timer.text('Expired');
                return;
            }
            
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;
            
            timer.text(
                hours.toString().padStart(2, '0') + ':' +
                minutes.toString().padStart(2, '0') + ':' +
                seconds.toString().padStart(2, '0')
            );
            
            time--;
        }
        
        updateTimer();
        setInterval(updateTimer, 1000);
    });
}

// ========================================
// Newsletter Form
// ========================================
function initNewsletterForm() {
    $('#newsletterForm').submit(function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        
        if (email) {
            showToast('Thank you for subscribing!', 'success');
            $(this)[0].reset();
        }
    });
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    // Handle mobile menu toggle
    $('.mobile-toggle').click(function() {
        $('.main-nav').toggleClass('nav-expanded');
    });
    
    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.main-nav, .mobile-toggle').length) {
            $('.main-nav').removeClass('nav-expanded');
        }
    });
}

// ========================================
// Price Range Slider (if needed)
// ========================================
function initPriceRangeSlider() {
    // This can be expanded with a proper range slider library
    // For now, just handle the apply button
    $('.apply-price-btn').click(function() {
        const min = $(this).closest('.price-range-filter').find('input:first').val();
        const max = $(this).closest('.price-range-filter').find('input:last').val();
        
        // In a real app, this would filter products
        console.log(`Filtering price: $${min} - $${max}`);
    });
}

// ========================================
// Product Sorting
// ========================================
function initProductSorting() {
    $('#sortSelect').change(function() {
        const sortValue = $(this).val();
        
        // In a real app, this would reload products with new sort
        console.log(`Sorting by: ${sortValue}`);
        
        // Show loading indicator
        showToast(`Sorting by ${$(this).find('option:selected').text()}`, 'info');
    });
}

// ========================================
// Initialize all on document ready
// ========================================
$(document).ready(function() {
    initAddToCart();
    initQuickView();
    initWishlist();
    initCountdownTimers();
    initNewsletterForm();
    initMobileMenu();
    initPriceRangeSlider();
    initProductSorting();
    
    // Initialize Bootstrap tooltips if needed
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});