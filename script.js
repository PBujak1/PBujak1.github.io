const email = 'piotr.bujak@student.pk.edu.pl';
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'Email address copied.';
    copyButton.textContent = 'Copied';
    setTimeout(() => { copyButton.textContent = 'Copy email'; copyStatus.textContent = ''; }, 3000);
  } catch {
    copyStatus.textContent = 'Select the email address above to copy it.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('nav a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// ==========================================
// REUSABLE SCREENSHOT GALLERY ENGINE
// ==========================================
function setupGallery({ imgId, prevId, nextId, items }) {
  const img = document.getElementById(imgId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!img || !prevBtn || !nextBtn || !items || items.length === 0) return;

  // Preload images (and SVG fallbacks) into memory to avoid flicker
  items.forEach(item => {
    const preloader = new Image();
    preloader.src = item.src;
    if (item.fallback) {
      const fbPreloader = new Image();
      fbPreloader.src = item.fallback;
    }
  });

  let currentIndex = 0;
  let isTransitioning = false;

  function updateSlide(newIndex, direction = 1) {
    if (isTransitioning || items.length <= 1) return;
    isTransitioning = true;

    currentIndex = (newIndex + items.length) % items.length;
    const current = items[currentIndex];
    const outClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
    const inPrepClass = direction > 0 ? 'slide-in-prep-right' : 'slide-in-prep-left';

    img.classList.add('transitioning', outClass);

    setTimeout(() => {
      img.src = current.src;
      img.alt = current.alt;

      // Automatically fallback to SVG mockup if PNG is not yet added
      img.onerror = () => {
        if (current.fallback && img.src !== current.fallback) {
          img.src = current.fallback;
          const link = img.closest('a');
          if (link) link.href = current.fallback;
        }
      };

      const link = img.closest('a');
      if (link) {
        link.href = current.src;
        if (current.label) {
          link.setAttribute('aria-label', current.label);
        }
      }

      img.classList.remove(outClass);
      img.classList.add(inPrepClass);

      // Force DOM reflow to set position before sliding in
      void img.offsetWidth;

      img.classList.remove(inPrepClass);

      setTimeout(() => {
        img.classList.remove('transitioning');
        isTransitioning = false;
      }, 260);
    }, 200);
  }

  prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1, -1));
  nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1, 1));
}

// 1. Featured Project: E-recepta
setupGallery({
  imgId: 'erecepta-screenshot',
  prevId: 'screenshot-prev',
  nextId: 'screenshot-next',
  items: [
    {
      src: 'images/e-recepta.png',
      alt: 'Actual E-recepta patient dashboard showing visit charts, prescription notifications, and appointment tools',
      label: 'Open full-size E-recepta patient dashboard screenshot'
    },
    {
      src: 'images/main-pac-panel.png',
      alt: 'Main patient panel in the E-recepta application',
      label: 'Open full-size Main patient panel screenshot'
    },
    {
      src: 'images/pac-nowa-recepta.png',
      alt: 'Patient E-recepta form',
      label: 'Open full-size Patient E-recepta form screenshot'
    },
    {
      src: 'images/pac-dawkowanie.png',
      alt: 'Patient prescription medicine dosage form in the E-recepta application',
      label: 'Open full-size Patient prescription medicine dosage'
    },
    {
      src: 'images/main-lek-panel.png',
      alt: 'Main doctor panel in the E-recepta application',
      label: 'Open full-size Main doctor panel screenshot'
    }
  ]
});

// 2. Small Project: Forget-Me-Not APP
setupGallery({
  imgId: 'niezapominajka-screenshot',
  prevId: 'niezapominajka-prev',
  nextId: 'niezapominajka-next',
  items: [
    {
      src: 'images/niezapominajka-main.png',
      alt: 'Forget-Me-Not APP mobile interface preview',
      label: 'Open full-size Forget-Me-Not APP screenshot'
    },
    {
      src: 'images/niezapominajka-newMemory.png',
      alt: 'Forget-Me-Not APP compose reminder dialog',
      label: 'Open full-size Forget-Me-Not APP compose dialog'
    },
    {
      src: 'images/niezapominajka-notification.png',
      alt: 'Forget-Me-Not APP notifications view',
      label: 'Open full-size Forget-Me-Not APP notifications screenshot'
    },
    {
      src: 'images/niezapominajka-visibility.png',
      alt: 'Forget-Me-Not APP visibility settings',
      label: 'Open full-size Forget-Me-Not APP visibility screenshot'
    }
  ]
});

// 3. Small Project: Seat Planner Website
setupGallery({
  imgId: 'planner-screenshot',
  prevId: 'planner-prev',
  nextId: 'planner-next',
  items: [
    {
      src: 'images/planner-login.png',
      alt: 'Seat Planner Website login screen',
      label: 'Open full-size Seat Planner Website screenshot'
    },
    {
      src: 'images/planner-buildings.png',
      alt: 'Seat Planner Website buildings view',
      label: 'Open full-size Seat Planner Website buildings screenshot'
    },
    {
      src: 'images/planner-rooms.png',
      alt: 'Seat Planner Website rooms view',
      label: 'Open full-size Seat Planner Website rooms screenshot'
    },
    {
      src: 'images/planner-editor.png',
      alt: 'Seat Planner Website editor panel',
      label: 'Open full-size Seat Planner Website editor screenshot'
    }
  ]
});

// 4. Small Project: Java Mail App
setupGallery({
  imgId: 'javamail-screenshot',
  prevId: 'javamail-prev',
  nextId: 'javamail-next',
  items: [
    {
      src: 'images/mail-main-panel.png',
      alt: 'Java Mail App inbox and message view',
      label: 'Open full-size Java Mail App inbox screenshot'
    },
    {
      src: 'images/mail-creating.png',
      alt: 'Java Mail App compose message and attachments dialog',
      label: 'Open full-size Java Mail App compose dialog'
    },
    {
      src: 'images/mail-log.png',
      alt: 'Java Mail App message log view',
      label: 'Open full-size Java Mail App message log screenshot'
    }
  ]
});

// 5. Small Project: 5-bit Image Converter
setupGallery({
  imgId: 'converter5bit-screenshot',
  prevId: 'GK-prev',
  nextId: 'GK-next',
  items: [
    {
      src: 'images/GK1.png',
      alt: '5-bit Image Converter color depth comparison preview',
      label: 'Open full-size 5-bit Image Converter comparison preview'
    },
    {
      src: 'images/GK2.png',
      alt: '5-bit Image Converter 32-color palette matrix & dithering analyzer',
      label: 'Open full-size 5-bit color palette analyzer'
    },
    {
      src: 'images/GK3.png',
      alt: '5-bit Image Converter preview 3',
      label: 'Open full-size 5-bit Image Converter preview 3'
    },
    {
      src: 'images/GK4.png',
      alt: '5-bit Image Converter preview 4',
      label: 'Open full-size 5-bit Image Converter preview 4'
    },
    {
      src: 'images/GK5.png',
      alt: '5-bit Image Converter preview 5',
      label: 'Open full-size 5-bit Image Converter preview 5'
    }
  ]
});
