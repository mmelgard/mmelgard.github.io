/**
 * Portfolio - Main JavaScript File
 */
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }, 100);
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      document.querySelector('body').classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    });
  }

  /**
   * Mobile nav dropdowns activate
   */
  document.querySelectorAll('.navbar .dropdown > a').forEach(item => {
    item.addEventListener('click', e => {
      if (document.querySelector('body').classList.contains('navbar-mobile')) {
        e.preventDefault();
        item.nextElementSibling.classList.toggle('dropdown-active');
      }
    });
  });

  /**
   * Smooth scroll on links with class .scrollto
   */
  const scrolltoLinks = document.querySelectorAll('.scrollto');
  const scrolltoHeader = document.querySelector('#header');
  
  function smoothScroll(e) {
    if (document.querySelector(this.hash)) {
      e.preventDefault();
      
      // If mobile nav is active, close it
      if (document.querySelector('body').classList.contains('navbar-mobile')) {
        document.querySelector('body').classList.remove('navbar-mobile');
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
      
      // Scroll to the target element
      const target = document.querySelector(this.hash);
      const offset = scrolltoHeader.offsetHeight;
      const elementPosition = target.offsetTop;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      
      // Update active link
      updateActiveLink(this.hash);
    }
  }
  
  scrolltoLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  /**
   * Update active link on scroll
   */
  function updateActiveLink(hash) {
    document.querySelectorAll('.nav-link.scrollto').forEach(navLink => {
      navLink.classList.remove('active');
    });
    
    document.querySelectorAll(`.nav-link.scrollto[href="${hash}"]`).forEach(activeLink => {
      activeLink.classList.add('active');
    });
  }
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 200;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (sectionId && scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
        updateActiveLink(`#${sectionId}`);
      }
    });
  });

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          const target = document.querySelector(window.location.hash);
          const offset = scrolltoHeader.offsetHeight;
          const elementPosition = target.offsetTop;
          
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }, 300);
      }
    }
  });

  /**
   * Header scroll class
   */
  function headerScrolled() {
    if (window.scrollY > 100) {
      scrolltoHeader.classList.add('header-scrolled');
    } else {
      scrolltoHeader.classList.remove('header-scrolled');
    }
  }
  
  window.addEventListener('load', headerScrolled);
  window.addEventListener('scroll', headerScrolled);
  
  /**
   * Back to top button
   */
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    function toggleBackToTop() {
      if (window.scrollY > 100) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    }
    
    window.addEventListener('load', toggleBackToTop);
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  /**
   * About tabs
   */
  const aboutTabs = document.querySelectorAll('.about-tabs .tab-btn');
  if (aboutTabs.length) {
    aboutTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        aboutTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab content
        document.querySelectorAll('.about-tabs-content .tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Show content for selected tab
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId + '-content').classList.add('active');
      });
    });
  }
  
  /**
   * BTS SIO specialty tabs
   */
  const specialtyTabs = document.querySelectorAll('.specialty-tabs .tab-btn');
  if (specialtyTabs.length) {
    specialtyTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        specialtyTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab content
        document.querySelectorAll('.specialty-tabs .tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Show content for selected tab
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId + '-content').classList.add('active');
      });
    });
  }
  
  /**
   * Resume tabs
   */
  const resumeTabs = document.querySelectorAll('.resume-tab');
  if (resumeTabs.length) {
    resumeTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        resumeTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all content
        document.querySelectorAll('.resume-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Show content for selected tab
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId + '-content').classList.add('active');
      });
    });
  }
  
  /**
   * Skills language filter
   */
  const skillsFilter = document.querySelectorAll('.skills-filter .filter-btn');
  if (skillsFilter.length) {
    // Initialize Isotope if it exists
    let skillsIsotope;
    try {
      skillsIsotope = new Isotope('.skills-container', {
        itemSelector: '.skill-item',
        layoutMode: 'fitRows'
      });
    } catch (e) {
      console.log('Isotope not available, using alternative filtering');
    }
    
    // Filter indicator animation
    const filterIndicator = document.querySelector('.filter-indicator');
    
    function updateFilterIndicator(activeFilter) {
      if (!filterIndicator) return;
      
      // Position and width of active filter button
      const activeRect = activeFilter.getBoundingClientRect();
      const filterRect = document.querySelector('.skills-filter').getBoundingClientRect();
      
      // Set indicator position and width
      filterIndicator.style.width = activeRect.width + 'px';
      filterIndicator.style.left = (activeRect.left - filterRect.left) + 'px';
    }
    
    // Set initial position
    window.addEventListener('load', () => {
      const activeFilter = document.querySelector('.skills-filter .filter-btn.active');
      if (activeFilter) {
        updateFilterIndicator(activeFilter);
      }
    });
    
    // Add click event for filters
    skillsFilter.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class
        skillsFilter.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked
        this.classList.add('active');
        
        // Update indicator
        updateFilterIndicator(this);
        
        // Filter items
        const filterValue = this.getAttribute('data-filter');
        
        if (skillsIsotope) {
          // Use Isotope if available
          skillsIsotope.arrange({
            filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
          });
        } else {
          // Fallback to basic filtering
          const allItems = document.querySelectorAll('.skill-item');
          
          allItems.forEach(item => {
            item.classList.add('hidden');
            item.classList.remove('animate');
            
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
              setTimeout(() => {
                item.classList.remove('hidden');
                item.classList.add('animate');
              }, 50);
            }
          });
        }
      });
    });
  }
  
  /**
   * Animation on scroll using AOS
   */
  window.addEventListener('load', () => {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });
});

// Handle skills filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterIndicator = document.querySelector('.filter-indicator');
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Initialize filter indicator position and width
  if (filterButtons.length > 0 && filterIndicator) {
    const activeButton = document.querySelector('.filter-btn.active') || filterButtons[0];
    updateFilterIndicator(activeButton);
  }
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update indicator position
      updateFilterIndicator(this);
      
      // Filter items
      const filter = this.getAttribute('data-filter');
      
      skillItems.forEach(item => {
        item.classList.remove('animate');
        
        setTimeout(() => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.classList.add('animate');
            }, 10);
          } else {
            item.classList.add('hidden');
          }
        }, 300);
      });
    });
  });
  
  // Function to update filter indicator position and width
  function updateFilterIndicator(button) {
    if (!filterIndicator) return;
    
    filterIndicator.style.width = `${button.offsetWidth}px`;
    filterIndicator.style.left = `${button.offsetLeft}px`;
  }
  
  // Update filter indicator on window resize
  window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.filter-btn.active');
    if (activeButton) updateFilterIndicator(activeButton);
  });
});