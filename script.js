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

// Accordion (Accomplishments)
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll("#accomplishments h3");
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // --- DESKTOP: Expand ALL items ---
  if (!isMobile) {
    headers.forEach((header) => {
      const content = header.nextElementSibling;
      header.classList.add("active");
      content.classList.add("open");
    });
    return; // stop here; desktop doesn't need accordion behavior
  }

  // --- MOBILE: Expand ONLY the first item ---
  if (headers.length > 0) {
    const firstHeader = headers[0];
    const firstContent = firstHeader.nextElementSibling;
    firstHeader.classList.add("active");
    firstContent.classList.add("open");
  }

  // --- MOBILE: Accordion toggle behavior ---
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Close all other items
      headers.forEach((otherHeader) => {
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
