// Scroll indicator and URL update functionality
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const indicators = document.querySelectorAll('.indicator');

  // IntersectionObserver for URL updates and indicator
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        // Update URL hash (skip for home)
        if (sectionId === 'home') {
          history.replaceState(null, null, window.location.pathname);
        } else {
          history.replaceState(null, null, `#${sectionId}`);
        }
        
        // Update indicator
        indicators.forEach(ind => {
          ind.classList.remove('active');
          if (ind.dataset.section === sectionId) {
            ind.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Handle initial load with hash
  const hash = window.location.hash.substring(1);
  if (hash) {
    const targetSection = document.getElementById(hash);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Click handlers for indicators
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const sectionId = indicator.dataset.section;
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Accordion for multiple sections
document.addEventListener("DOMContentLoaded", () => {
  // Add any section IDs here that should behave like an accordion
  const accordionSections = ["accomplishments", "experience", "skills", "education"];

  accordionSections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headers = section.querySelectorAll("h3");

    // Start fully collapsed on all devices
    // (No default open items)

    // Accordion toggle behavior
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;

        // Close all other items *within this section only*
        headers.forEach(otherHeader => {
          const otherContent = otherHeader.nextElementSibling;
          if (otherHeader !== header) {
            otherHeader.classList.remove("active");
            otherContent.classList.remove("open");
          }
        });

        // Toggle this one
        header.classList.toggle("active");
        content.classList.toggle("open");
      });
    });
  });
});