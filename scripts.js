// Keep track of the current language; default to English
var currentLang = 'en';
var currentPage = 'home';
var isUnlocked = false;

/**
 * Apply translations to all elements with data-en and data-es attributes
 * based on the language code provided.
 * @param {string} lang - 'en' or 'es'
 */
function setLanguage(lang) {
  currentLang = lang;
  
  // Update button states
  var btnEnglish = document.getElementById('btnEnglish');
  var btnSpanish = document.getElementById('btnSpanish');
  
  if (btnEnglish && btnSpanish) {
    btnEnglish.classList.toggle('active', lang === 'en');
    btnSpanish.classList.toggle('active', lang === 'es');
  }

  // Update lock screen language buttons
  var lockBtnEnglish = document.getElementById('lockBtnEnglish');
  var lockBtnSpanish = document.getElementById('lockBtnSpanish');
  
  if (lockBtnEnglish && lockBtnSpanish) {
    lockBtnEnglish.classList.toggle('active', lang === 'en');
    lockBtnSpanish.classList.toggle('active', lang === 'es');
  }
  
  // Update all elements with data attributes
  var elements = document.querySelectorAll('[data-en][data-es]');
  elements.forEach(function(el) {
    if (el.dataset[lang]) {
      el.textContent = el.dataset[lang];
    }
  });

  // Update simple gallery captions
  var galleryItems = document.querySelectorAll('.jl-simple-photo');
  galleryItems.forEach(function(item) {
    var caption = item.querySelector('.jl-simple-caption');
    if (caption && item.dataset[lang]) {
      caption.textContent = item.dataset[lang];
    }
  });

  // Update background theme based on language
  var body = document.body;
  var lockScreen = document.querySelector('.jl-lock-screen');
  
  if (lang === 'es') {
    // Spanish = Mexico theme
    body.className = 'mexico-theme';
    if (lockScreen) {
      lockScreen.className = 'jl-lock-screen mexico-theme';
    }
  } else {
    // English = USA theme
    body.className = 'usa-theme';
    if (lockScreen) {
      lockScreen.className = 'jl-lock-screen usa-theme';
    }
  }

  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
}

/**
 * Handle lock screen password validation
 */
function checkPassword() {
  var passwordInput = document.getElementById('lockPassword');
  var errorMsg = document.querySelector('.jl-lock-error');
  var password = passwordInput.value;

  if (password === 'password') {
    // Correct password - unlock the site
    isUnlocked = true;
    localStorage.setItem('isUnlocked', 'true');
    
    var lockScreen = document.querySelector('.jl-lock-screen');
    if (lockScreen) {
      lockScreen.classList.add('hidden');
      setTimeout(function() {
        lockScreen.style.display = 'none';
      }, 500);
    }
    
    // Remove error styling
    passwordInput.classList.remove('error');
    if (errorMsg) {
      errorMsg.classList.remove('show');
    }
  } else {
    // Wrong password
    passwordInput.classList.add('error');
    if (errorMsg) {
      errorMsg.classList.add('show');
    }
    
    // Clear input and remove error styling after 2 seconds
    setTimeout(function() {
      passwordInput.value = '';
      passwordInput.classList.remove('error');
      if (errorMsg) {
        errorMsg.classList.remove('show');
      }
    }, 2000);
  }
}

/**
 * Show a specific page and update navigation
 * @param {string} pageId - The page ID to show
 */
function showPage(pageId) {
  currentPage = pageId;
  
  // Hide all pages
  var pages = document.querySelectorAll('.jl-page');
  pages.forEach(function(page) {
    page.classList.remove('active');
  });
  
  // Show selected page
  var targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update navigation active state
  var navLinks = document.querySelectorAll('.jl-nav-links a');
  navLinks.forEach(function(link) {
    link.classList.remove('active');
  });
  
  var activeNav = document.getElementById('nav-' + pageId);
  if (activeNav) {
    activeNav.classList.add('active');
  }

  // Save current page
  localStorage.setItem('currentPage', pageId);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
  // Check if site should be unlocked
  var wasUnlocked = localStorage.getItem('isUnlocked');
  if (wasUnlocked === 'true') {
    isUnlocked = true;
    var lockScreen = document.querySelector('.jl-lock-screen');
    if (lockScreen) {
      lockScreen.style.display = 'none';
    }
  }

  // Add event listeners to language buttons
  var btnEnglish = document.getElementById('btnEnglish');
  var btnSpanish = document.getElementById('btnSpanish');
  
  if (btnEnglish) {
    btnEnglish.addEventListener('click', function() {
      setLanguage('en');
    });
  }
  
  if (btnSpanish) {
    btnSpanish.addEventListener('click', function() {
      setLanguage('es');
    });
  }

  // Add event listeners to lock screen language buttons
  var lockBtnEnglish = document.getElementById('lockBtnEnglish');
  var lockBtnSpanish = document.getElementById('lockBtnSpanish');
  
  if (lockBtnEnglish) {
    lockBtnEnglish.addEventListener('click', function() {
      setLanguage('en');
    });
  }
  
  if (lockBtnSpanish) {
    lockBtnSpanish.addEventListener('click', function() {
      setLanguage('es');
    });
  }

  // Add event listener to lock screen unlock button
  var unlockBtn = document.getElementById('unlockBtn');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', checkPassword);
  }

  // Add event listener for Enter key on password input
  var passwordInput = document.getElementById('lockPassword');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkPassword();
      }
    });
  }
  
  // Add event listeners to name clicks
  var nameLily = document.getElementById('nameLily');
  var nameJames = document.getElementById('nameJames');
  
  if (nameLily) {
    nameLily.addEventListener('click', function() {
      setLanguage('es');
    });
  }
  
  if (nameJames) {
    nameJames.addEventListener('click', function() {
      setLanguage('en');
    });
  }
  
  // Load saved preferences
  var savedLang = localStorage.getItem('preferredLanguage') || 'en';
  var savedPage = localStorage.getItem('currentPage') || 'home';
  
  setLanguage(savedLang);
  showPage(savedPage);
});

// Countdown to October 4, 2026
(function () {
  var targetTime = new Date('2026-10-04T00:00:00').getTime();
  var daysEl = document.getElementById('jlDays');
  var hoursEl = document.getElementById('jlHours');
  var minsEl = document.getElementById('jlMins');
  var secsEl = document.getElementById('jlSecs');

  function updateCountdown() {
    var now = Date.now();
    var diff = Math.max(0, targetTime - now);
    var d = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;
    var h = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;
    var m = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;
    var s = Math.floor(diff / 1000);
    
    if (daysEl && hoursEl && minsEl && secsEl) {
      daysEl.textContent = String(d).padStart(3, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }
    
    // When countdown ends, show a married message in current language
    if (targetTime - now <= 0) {
      var msg = currentLang === 'es' ? '¡Ya estamos casados!' : 'We\'re Married!';
      var countdownEl = document.getElementById('jlCountdown');
      if (countdownEl) {
        countdownEl.innerHTML =
          '<div class="jl-c" style="min-width:260px;"><span>🎉</span><em>' + msg + '</em></div>';
      }
    }
  }
  // Kick off immediately and then update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();