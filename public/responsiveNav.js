document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    const submenuParents = document.querySelectorAll('.has-submenu');

    // Toggle Hamburger Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');

                // Close any open dropdowns
                document.querySelectorAll('.dropdown-parent.active').forEach(el => el.classList.remove('active'));
                document.querySelectorAll('.has-submenu.active').forEach(el => el.classList.remove('active'));
            }
        }
    });

    // Mobile Dropdown Handling
    dropdownParents.forEach(parent => {
        const link = parent.querySelector('a'); // The main link (e.g., "Exams Category")
        if (link) {
            link.addEventListener('click', (e) => {
                // Check if hamburger is visible (mobile view)
                if (window.getComputedStyle(menuToggle).display !== 'none') {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdownParents.forEach(other => {
                        if (other !== parent) other.classList.remove('active');
                    });

                    parent.classList.toggle('active');
                }
            });
        }
    });

    submenuParents.forEach(parent => {
        const link = parent.querySelector('a'); // The submenu link (e.g., "Defence", "Engineering")
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.getComputedStyle(menuToggle).display !== 'none') {
                    // Prevent default mostly to stop jumping or navigation if href="#"
                    // If href is a real link, we might want to navigate, but here they seem to be headers
                    const href = link.getAttribute('href');
                    if (href === '#' || href === '') {
                        e.preventDefault();
                    }
                    // If it has a real link but also a submenu, on mobile usually click toggles submenu
                    // So we prevent default.
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other submenus at this level if needed? 
                    // Let's keep it simple: toggle this one.
                    parent.classList.toggle('active');
                }
            });
        }
    });
});
