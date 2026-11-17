/**
 * DEOSAI EXPEDITIONS - Master Interactive Engine
 * Featuring:
 * 1. GoWander Arched Curved Destination Carousel (Exact Reference Implementation)
 * 2. Background Crossfade & Headline Synchronization
 * 3. Dual-Currency Switcher (PKR ₨ ⇄ USD $)
 * 4. High-Contrast Trip Cost Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initArchedHeroCarousel();
  initCurrencySwitcher();
  initTripCalculator();
  initNavbarScroll();
});

/* ==========================================================================
   1. The GoWander-Style Arched Curved Carousel Engine
   ========================================================================== */
const DESTINATIONS = [
  {
    id: 0,
    title: "Passu Cones",
    subtitle: "Cathedral peaks towering over the ancient Silk Road, Attabad Lake, and apricot orchards.",
    location: "Hunza Valley, Gilgit-Baltistan",
    rating: "★ 4.98 (340+ Reviews)",
    link: "destination-hunza.html",
    bg: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80",
    elevation: "2,500m"
  },
  {
    id: 1,
    title: "Deosai Plains",
    subtitle: "The Land of Giants. Earth's second-highest plateau of wildflowers, Sheosar Lake, and brown bears.",
    location: "Skardu, Baltistan",
    rating: "★ 4.96 (280+ Reviews)",
    link: "destination-skardu.html",
    bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    elevation: "4,114m"
  },
  {
    id: 2,
    title: "Fairy Meadows",
    subtitle: "Cliffside jeep tracks climbing to pine-scented meadows beneath the 8,126m ice wall of Nanga Parbat.",
    location: "Diamer District, Gilgit-Baltistan",
    rating: "★ 4.99 (410+ Reviews)",
    link: "destination-fairymeadows.html",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    elevation: "3,300m"
  },
  {
    id: 3,
    title: "K2 & Concordia",
    subtitle: "The Throne Room of Mountain Gods. Where four 8,000-meter peaks converge in raw glacial majesty.",
    location: "Baltoro Glacier, Karakoram",
    rating: "★ 5.0 (190+ Reviews)",
    link: "tour-trekking.html",
    bg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    elevation: "4,691m"
  },
  {
    id: 4,
    title: "Swat & Kalam",
    subtitle: "The Switzerland of the East. Crystal alpine lakes, cedar forests, Malam Jabba ski slopes, and Buddhist relics.",
    location: "Khyber Pakhtunkhwa",
    rating: "★ 4.92 (310+ Reviews)",
    link: "destination-swat.html",
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    elevation: "2,000m"
  }
];

let activeIndex = 0;
const TOTAL = DESTINATIONS.length;

function initArchedHeroCarousel() {
  const cards = document.querySelectorAll('.curved-card');
  const bgLayers = document.querySelectorAll('.hero-bg-layer');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const targetIndex = parseInt(card.dataset.index, 10);
      if (targetIndex === activeIndex) {
        // Center card was clicked: directly open its unique themed destination page!
        const dest = DESTINATIONS[targetIndex];
        if (dest && dest.link) {
          window.location.href = dest.link;
        }
      } else {
        // Rotate this card into the center slot
        setActiveDestination(targetIndex);
      }
    });
  });

  // Carousel Arrow Navigation Buttons
  const prevBtn = document.querySelector('.carousel-nav-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-nav-btn.next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveDestination((activeIndex - 1 + TOTAL) % TOTAL);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setActiveDestination((activeIndex + 1) % TOTAL);
    });
  }

  // Keyboard navigation (Left / Right arrows, Enter to open)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      setActiveDestination((activeIndex + 1) % TOTAL);
    } else if (e.key === 'ArrowLeft') {
      setActiveDestination((activeIndex - 1 + TOTAL) % TOTAL);
    } else if (e.key === 'Enter') {
      const dest = DESTINATIONS[activeIndex];
      if (dest && dest.link) {
        window.location.href = dest.link;
      }
    }
  });

  // Touch Swipe on the carousel track
  const track = document.querySelector('.arched-carousel-wrapper');
  if (track) {
    let touchStartX = 0;
    let touchStartTime = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      const timeDiff = Date.now() - touchStartTime;
      if (Math.abs(diff) > 35 && timeDiff < 600) {
        if (diff > 0) {
          setActiveDestination((activeIndex + 1) % TOTAL);
        } else {
          setActiveDestination((activeIndex - 1 + TOTAL) % TOTAL);
        }
      }
    });
  }

  // Initial setup
  setActiveDestination(0);
}

function setActiveDestination(newIndex) {
  activeIndex = newIndex;
  const cards = document.querySelectorAll('.curved-card');
  const bgLayers = document.querySelectorAll('.hero-bg-layer');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-desc');
  const ctaBtn = document.getElementById('hero-cta');
  const locEl = document.getElementById('hero-location');
  const ratingEl = document.getElementById('hero-rating');

  const data = DESTINATIONS[newIndex];
  if (!data) return;

  // 1. Update Arched Card Slots along the smiling curve
  cards.forEach(card => {
    const cardIndex = parseInt(card.dataset.index, 10);
    // Relative position delta: -2, -1, 0, 1, 2
    let delta = (cardIndex - activeIndex + TOTAL) % TOTAL;
    if (delta > 2) delta -= TOTAL;

    // Reset slot classes
    card.className = 'curved-card';

    if (delta === 0) {
      card.classList.add('slot-center');
    } else if (delta === -1) {
      card.classList.add('slot-left');
    } else if (delta === -2) {
      card.classList.add('slot-far-left');
    } else if (delta === 1) {
      card.classList.add('slot-right');
    } else if (delta === 2) {
      card.classList.add('slot-far-right');
    } else {
      card.classList.add('slot-hidden');
    }
  });

  // 2. Crossfade Full-Bleed Background Layer
  bgLayers.forEach((layer, i) => {
    layer.classList.toggle('is-active', i === newIndex);
  });

  // 3. Update Text with smooth slide-up effect
  if (titleEl && descEl && ctaBtn) {
    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      titleEl.textContent = data.title;
      descEl.textContent = data.subtitle;
      ctaBtn.href = data.link;
      ctaBtn.textContent = `Explore ${data.title} →`;

      titleEl.style.opacity = '1';
      titleEl.style.transform = 'translateY(0)';
    }, 200);
  }

  // 4. Update Top Right Meta Badge
  if (locEl && ratingEl) {
    locEl.textContent = data.location;
    ratingEl.textContent = data.rating;
  }
}

/* ==========================================================================
   2. Dual Currency Switcher (PKR ₨ ⇄ USD $)
   ========================================================================== */
let currentCurrency = 'PKR';
const PKR_RATE = 280;

function initCurrencySwitcher() {
  const btnPKR = document.getElementById('curr-pkr');
  const btnUSD = document.getElementById('curr-usd');

  if (!btnPKR || !btnUSD) return;

  btnPKR.addEventListener('click', () => setCurrency('PKR'));
  btnUSD.addEventListener('click', () => setCurrency('USD'));
}

function setCurrency(curr) {
  currentCurrency = curr;

  const btnPKR = document.getElementById('curr-pkr');
  const btnUSD = document.getElementById('curr-usd');
  if (btnPKR && btnUSD) {
    btnPKR.classList.toggle('active', curr === 'PKR');
    btnUSD.classList.toggle('active', curr === 'USD');
  }

  // Update all elements with data-pkr
  document.querySelectorAll('[data-pkr]').forEach(el => {
    const pkr = parseInt(el.dataset.pkr, 10);
    if (curr === 'PKR') {
      el.textContent = `₨ ${pkr.toLocaleString('en-PK')}`;
    } else {
      const usd = Math.round(pkr / PKR_RATE);
      el.textContent = `$${usd.toLocaleString('en-US')}`;
    }
  });

  // Recalculate trip estimator if present
  if (typeof recalcEstimator === 'function') {
    recalcEstimator();
  }
}

/* ==========================================================================
   3. Trip Cost Estimator
   ========================================================================== */
let estState = {
  days: 7,
  guests: 4,
  vehicle: 'prado',
  tier: 'boutique'
};

const VEHICLE_PRICES = { corolla: 14000, prado: 26000, hiace: 22000 };
const HOTEL_PRICES = { alpine: 6500, boutique: 14500, luxury: 28000 };

function initTripCalculator() {
  const daysSlider = document.getElementById('est-days-slider');
  const guestsSlider = document.getElementById('est-guests-slider');
  const daysLabel = document.getElementById('est-days-label');
  const guestsLabel = document.getElementById('est-guests-label');

  if (!daysSlider || !guestsSlider) return;

  daysSlider.addEventListener('input', (e) => {
    estState.days = parseInt(e.target.value, 10);
    if (daysLabel) daysLabel.textContent = `${estState.days} Days`;
    recalcEstimator();
  });

  guestsSlider.addEventListener('input', (e) => {
    estState.guests = parseInt(e.target.value, 10);
    if (guestsLabel) guestsLabel.textContent = `${estState.guests} Guests`;
    recalcEstimator();
  });

  document.querySelectorAll('[data-opt-vehicle]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-opt-vehicle]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      estState.vehicle = btn.dataset.optVehicle;
      recalcEstimator();
    });
  });

  document.querySelectorAll('[data-opt-tier]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-opt-tier]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      estState.tier = btn.dataset.optTier;
      recalcEstimator();
    });
  });

  recalcEstimator();
}

function recalcEstimator() {
  const vehicleCost = estState.days * VEHICLE_PRICES[estState.vehicle];
  const hotelCost = estState.days * estState.guests * HOTEL_PRICES[estState.tier];
  const logistics = estState.days * 4500;

  const totalPKR = vehicleCost + hotelCost + logistics;
  const perPersonPKR = Math.round(totalPKR / estState.guests);

  const totalDisplay = document.getElementById('est-total-out');
  const perPersonDisplay = document.getElementById('est-perperson-out');
  const waBtn = document.getElementById('est-whatsapp-btn');

  if (totalDisplay && perPersonDisplay) {
    if (currentCurrency === 'PKR') {
      totalDisplay.innerHTML = `<span>₨</span> ${totalPKR.toLocaleString('en-PK')}`;
      perPersonDisplay.textContent = `Approx. ₨ ${perPersonPKR.toLocaleString('en-PK')} / person`;
    } else {
      const totalUSD = Math.round(totalPKR / PKR_RATE);
      const perPersonUSD = Math.round(totalUSD / estState.guests);
      totalDisplay.innerHTML = `<span>$</span> ${totalUSD.toLocaleString('en-US')}`;
      perPersonDisplay.textContent = `Approx. $${perPersonUSD.toLocaleString('en-US')} / person`;
    }
  }

  if (waBtn) {
    const vNames = { corolla: 'Sedan Corolla', prado: 'Toyota Prado 4x4', hiace: 'Grand Cabin HiAce' };
    const tNames = { alpine: 'Standard Lodges', boutique: 'Boutique Resorts', luxury: 'Heritage Forts' };

    const text = encodeURIComponent(
      `Salam DEOSAI Expeditions! I configured this trip on your website:\n\n` +
      `• Duration: ${estState.days} Days\n` +
      `• Travelers: ${estState.guests} Guests\n` +
      `• Dedicated 4x4: ${vNames[estState.vehicle]}\n` +
      `• Hotel Tier: ${tNames[estState.tier]}\n` +
      `• Estimated Investment: ₨ ${totalPKR.toLocaleString('en-PK')}\n\n` +
      `Please send me the complete day-by-day itinerary schedule!`
    );
    waBtn.href = `https://wa.me/923000000000?text=${text}`;
  }
}

function initNavbarScroll() {
  const nav = document.querySelector('.navbar-alpine');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}
