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