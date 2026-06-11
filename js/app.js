/* js/app.js */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingAnimation();
  initScrollNavbar();
  initScrollReveals();
  initContactForm();
  loadProjects();
});

// --- State Variables ---
let ALL_PROJECTS = [];
let ACTIVE_CATEGORY = 'all';
let ACTIVE_LANGUAGE = 'all';
let SEARCH_QUERY = '';

// --- Theme Management ---
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Play subtle audio click or add visual haptic cue if needed
  });
}

// --- Typing Animation (Hero) ---
function initTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    'AI/ML Developer',
    'Full-Stack Developer',
    'Problem Solver',
    'MLOps Enthusiast'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 120;
    }

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    cursor.textContent = '|';
    typingElement.appendChild(cursor);

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  // Start typewriter loop
  setTimeout(type, 1000);
}

// --- Sticky Navigation Scroll Effects ---
function initScrollNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Scroll header contraction
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link update based on section viewport position
    let currentActive = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActive}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation drawer toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile drawer when link clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });
}

// --- Scroll Reveal Animation Triggers ---
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');

  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Handle stagger items
        if (entry.target.classList.contains('reveal-stagger')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 80}ms`;
            child.classList.add('active');
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

// --- Projects Layer & GitHub API Integration ---
async function loadProjects() {
  const featuredGrid = document.getElementById('featured-projects-grid');
  const otherGrid = document.getElementById('other-projects-grid');
  const otherHeading = document.getElementById('other-projects-heading');
  
  showLoadingState(featuredGrid);

  try {
    const response = await fetch('https://api.github.com/users/NITESH100LANKI/repos');
    if (!response.ok) {
      throw new Error(`GitHub API returned status: ${response.status}`);
    }
    const repos = await response.json();
    processAndMergeProjects(repos);
  } catch (error) {
    console.warn('GitHub API fetch failed. Using fallback static local data.', error);
    processAndMergeProjects([]); // Gracefully fall back to local offline details
  }

  // Populate dynamic language filters & render grids
  generateLanguageFilters();
  renderProjectGrids();
  initProjectListeners();
}

function showLoadingState(element) {
  element.innerHTML = `
    <div style="grid-column: 1/-1; display:flex; flex-direction:column; align-items:center; padding: 3rem; color: var(--color-text-secondary);">
      <svg style="width: 40px; height: 40px; animation: rotate 1.5s linear infinite; margin-bottom: 1rem; color: var(--color-primary);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="40 20"></circle>
      </svg>
      <p>Fetching projects from GitHub...</p>
    </div>
  `;
}

function processAndMergeProjects(repos) {
  ALL_PROJECTS = [];

  // Create lookup dictionary of fetched repos
  const repoLookup = {};
  repos.forEach(repo => {
    const normalizedName = repo.name;
    repoLookup[normalizedName] = repo;
    
    // Also support fallback keys for leading hyphens
    if (normalizedName.startsWith('-')) {
      repoLookup[normalizedName.substring(1)] = repo;
    } else {
      repoLookup['-' + normalizedName] = repo;
    }
  });

  // 1. Process Defined Projects from PROJECTS_METADATA (both featured and standard)
  for (const [key, meta] of Object.entries(PROJECTS_METADATA)) {
    let repoData = repoLookup[key];
    
    const project = {
      id: key,
      isFeatured: meta.featured,
      deployed: meta.deployed,
      title: meta.title,
      category: meta.category,
      categoryName: meta.category === 'ai-ml' ? 'AI & ML' : (meta.category === 'mlops' ? 'MLOps' : 'Full Stack'),
      tagline: meta.description,
      details: meta.description,
      keyResults: meta.keyResults || [],
      techStack: meta.technologies,
      icon: meta.icon || `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>`,
      demoUrl: meta.demoUrl || null,
      imageUrl: meta.imageUrl || null,
      githubUrl: repoData ? repoData.html_url : meta.githubUrl,
      stars: repoData ? repoData.stargazers_count : 0,
      forks: repoData ? repoData.forks_count : 0,
      language: repoData ? repoData.language : getFeaturedLanguage(meta.technologies),
      updatedAt: repoData ? new Date(repoData.pushed_at) : new Date()
    };

    ALL_PROJECTS.push(project);
  }

  // 2. Process Undefined GitHub Repositories (Auto-update "Other Projects" not in PROJECTS_METADATA)
  repos.forEach(repo => {
    const repoName = repo.name;
    const isAlreadyIncluded = Object.keys(PROJECTS_METADATA).some(metaKey => {
      return metaKey === repoName || 
             metaKey === '-' + repoName || 
             metaKey.substring(1) === repoName;
    });

    // We skip template, fork, and empty production/new placeholder sites to keep the listing clean
    if (!isAlreadyIncluded && !repo.fork && repoName !== 'eternal-attires-production' && repoName !== 'eternalnew') {
      const formattedTitle = repoName
        .replace(/[-_]+/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Infer project category based on name/language
      let category = 'full-stack';
      let categoryName = 'Full Stack';
      if (repo.language === 'Python' || repoName.toLowerCase().includes('agent') || repoName.toLowerCase().includes('segment') || repoName.toLowerCase().includes('model')) {
        category = 'ai-ml';
        categoryName = 'AI & ML';
      }
      if (repoName.toLowerCase().includes('pipeline') || repoName.toLowerCase().includes('mlops') || repoName.toLowerCase().includes('dvc')) {
        category = 'mlops';
        categoryName = 'MLOps';
      }

      // Filter out local URLs from homepages
      const repoHomepage = (repo.homepage && !repo.homepage.includes('127.0.0.1') && !repo.homepage.includes('localhost')) ? repo.homepage : null;

      const otherProject = {
        id: repo.name,
        isFeatured: false,
        deployed: repoHomepage !== null,
        title: formattedTitle,
        category: category,
        categoryName: categoryName,
        tagline: repo.description || 'Public repository detailing software execution and code architectures.',
        details: repo.description || `Public repository showcasing ${repo.language || 'software'} implementations.`,
        keyResults: [],
        techStack: repo.language ? [repo.language] : ['Software'],
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>`,
        demoUrl: repoHomepage,
        imageUrl: null,
        githubUrl: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Code',
        updatedAt: new Date(repo.pushed_at)
      };

      ALL_PROJECTS.push(otherProject);
    }
  });
}

// Helper to infer primary language if not fetched
function getFeaturedLanguage(techStack) {
  if (techStack.includes('Python')) return 'Python';
  if (techStack.includes('React') || techStack.includes('JavaScript')) return 'JavaScript';
  if (techStack.includes('TypeScript')) return 'TypeScript';
  return techStack[0] || 'Code';
}

// --- Dynamic Filter Headers Generation ---
function generateLanguageFilters() {
  const filterTabsContainer = document.getElementById('filter-tabs');
  
  // Clear any existing custom filter buttons, only keep default categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'live-apps', label: 'Live Apps' },
    { id: 'ai-ml', label: 'AI & ML' },
    { id: 'full-stack', label: 'Full Stack' },
    { id: 'mlops', label: 'MLOps' }
  ];

  // Extract all distinct programming languages from fetched data
  const languages = new Set();
  ALL_PROJECTS.forEach(proj => {
    if (proj.language) {
      languages.add(proj.language);
    }
  });

  let filterHTML = '';
  // Category tabs
  categories.forEach(cat => {
    filterHTML += `<button class="filter-tab ${cat.id === ACTIVE_CATEGORY ? 'active' : ''}" data-filter-type="category" data-filter="${cat.id}">${cat.label}</button>`;
  });

  // Dynamic language tabs (divider)
  if (languages.size > 0) {
    filterHTML += `<div style="width: 1px; height: 24px; background-color: var(--color-border); margin: 0 8px;"></div>`;
    languages.forEach(lang => {
      filterHTML += `<button class="filter-tab" data-filter-type="language" data-filter="${lang}">${lang}</button>`;
    });
  }

  filterTabsContainer.innerHTML = filterHTML;

  // Add click listeners to newly added filters
  const tabs = filterTabsContainer.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterType = tab.dataset.filterType;
      const filterValue = tab.dataset.filter;

      if (filterType === 'category') {
        ACTIVE_CATEGORY = filterValue;
        ACTIVE_LANGUAGE = 'all'; // reset language filter when switching categories
      } else {
        ACTIVE_LANGUAGE = filterValue;
        ACTIVE_CATEGORY = 'all'; // reset category filter when switching languages
      }

      renderProjectGrids();
      initProjectListeners();
    });
  });

  // Set up search field listener
  const searchInput = document.getElementById('project-search');
  searchInput.addEventListener('input', (e) => {
    SEARCH_QUERY = e.target.value.toLowerCase().trim();
    renderProjectGrids();
    initProjectListeners();
  });
}

// --- Dynamic Grids Rendering ---
function renderProjectGrids() {
  const featuredGrid = document.getElementById('featured-projects-grid');
  const liveGrid = document.getElementById('live-projects-grid');
  const otherGrid = document.getElementById('other-projects-grid');
  
  const liveHeading = document.getElementById('live-projects-heading');
  const otherHeading = document.getElementById('other-projects-heading');

  // Filter projects list
  const filtered = ALL_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(SEARCH_QUERY) || 
                          project.tagline.toLowerCase().includes(SEARCH_QUERY) ||
                          project.techStack.some(t => t.toLowerCase().includes(SEARCH_QUERY));
    
    let matchesFilter = true;
    if (ACTIVE_CATEGORY !== 'all') {
      if (ACTIVE_CATEGORY === 'live-apps') {
        matchesFilter = project.deployed === true;
      } else {
        matchesFilter = project.category === ACTIVE_CATEGORY;
      }
    } else if (ACTIVE_LANGUAGE !== 'all') {
      matchesFilter = project.language === ACTIVE_LANGUAGE;
    }

    return matchesSearch && matchesFilter;
  });

  // Separate to featured, non-featured live applications, and other repositories
  const featured = filtered.filter(p => p.isFeatured);
  const liveApps = filtered.filter(p => p.deployed && !p.isFeatured);
  const other = filtered.filter(p => !p.isFeatured && !p.deployed);

  // Render Featured Projects
  if (featured.length === 0) {
    featuredGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--color-text-secondary);">
        No featured projects match your current filters.
      </div>
    `;
  } else {
    featuredGrid.innerHTML = featured.map(p => createProjectCardHTML(p)).join('');
  }

  // Render Featured Live Applications
  if (liveApps.length === 0) {
    liveHeading.style.display = 'none';
    liveGrid.style.display = 'none';
  } else {
    liveHeading.style.display = 'flex';
    liveHeading.querySelector('span').textContent = `${liveApps.length} app${liveApps.length > 1 ? 's' : ''}`;
    liveGrid.style.display = 'grid';
    liveGrid.innerHTML = liveApps.map(p => createProjectCardHTML(p)).join('');
  }

  // Render Other Projects
  if (other.length === 0) {
    otherHeading.style.display = 'none';
    otherGrid.style.display = 'none';
  } else {
    otherHeading.style.display = 'flex';
    otherHeading.querySelector('span').textContent = `${other.length} repo${other.length > 1 ? 's' : ''}`;
    otherGrid.style.display = 'grid';
    otherGrid.innerHTML = other.map(p => createProjectCardHTML(p)).join('');
  }
}

// Card HTML Factory
function createProjectCardHTML(proj) {
  const formattedDate = proj.updatedAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Language Dot Color
  let dotColor = '#9ca3af'; // default
  if (proj.language === 'Python') dotColor = '#3572A5';
  if (proj.language === 'JavaScript') dotColor = '#f1e05a';
  if (proj.language === 'TypeScript') dotColor = '#3178c6';
  if (proj.language === 'C++' || proj.language === 'C/C++') dotColor = '#f34b7d';
  if (proj.language === 'HTML') dotColor = '#e34c26';

  return `
    <article class="project-card reveal" data-id="${proj.id}" tabindex="0" aria-haspopup="dialog">
      ${proj.imageUrl ? `
        <div class="project-card-image">
          <img src="${proj.imageUrl}" alt="${proj.title} Preview" loading="lazy">
          ${proj.deployed ? '<span class="project-live-badge">Live</span>' : ''}
        </div>
      ` : ''}
      <div class="project-card-header">
        ${!proj.imageUrl ? `
          <div class="project-card-icon">
            ${proj.icon}
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            ${proj.deployed ? '<span class="project-live-badge">Live</span>' : ''}
            ${proj.isFeatured ? '<span class="project-featured-badge">Featured</span>' : ''}
          </div>
        ` : `
          <div style="display: flex; gap: 6px; align-items: center; margin-left: auto;">
            ${proj.isFeatured ? '<span class="project-featured-badge">Featured</span>' : ''}
          </div>
        `}
      </div>
      <div class="project-card-body">
        <h3 class="project-card-title">${proj.title}</h3>
        <p class="project-card-desc">${proj.tagline}</p>
        <div class="project-tags">
          ${proj.techStack.slice(0, 4).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        
        ${proj.deployed ? `
          <div class="project-deploy-status" aria-label="Deployment status: online">
            <span class="deploy-dot"></span>
            <span>Live on Streamlit Cloud</span>
          </div>
        ` : ''}

        <div class="project-card-stats">
          <div class="project-stat-item">
            <span class="project-lang-indicator" style="background-color: ${dotColor};"></span>
            <span>${proj.language}</span>
          </div>
          <div class="project-stat-item">
            <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <span>${proj.stars}</span>
          </div>
          <div class="project-stat-item">
            <svg viewBox="0 0 24 24"><path d="M18.4 3c-1.3 0-2.4.8-2.8 2H9.4C9 3.8 7.9 3 6.6 3 4.9 3 3.5 4.4 3.5 6.1c0 1.2.7 2.2 1.7 2.7v6.4C4.2 15.7 3.5 16.7 3.5 18c0 1.7 1.4 3.1 3.1 3.1 1.3 0 2.4-.8 2.8-2h4.2c.4 1.2 1.5 2 2.8 2 1.7 0 3.1-1.4 3.1-3.1 0-1.3-.8-2.4-2-2.8V9.4c1.2-.4 2-1.5 2-2.8C21.5 4.9 20.1 3 18.4 3zM6.6 5c.6 0 1.1.5 1.1 1.1S7.2 7.2 6.6 7.2s-1.1-.5-1.1-1.1S6 5 6.6 5zm11.8 14c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1zm.1-12.9c-.6 0-1.1-.5-1.1-1.1S17.9 5 18.5 5c.6 0 1.1.5 1.1 1.1S19.1 6.1 18.5 6.1z"/></svg>
            <span>${proj.forks}</span>
          </div>
          <span style="margin-left: auto; font-size: 0.75rem;">${formattedDate}</span>
        </div>
      </div>
      <div class="project-card-footer">
        ${proj.demoUrl ? `
          <a href="${proj.demoUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-gradient" onclick="event.stopPropagation();">
            <span>Live Demo</span>
            <svg style="width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/></svg>
          </a>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary" onclick="event.stopPropagation();">
            GitHub
          </a>
        ` : `
          <a href="${proj.githubUrl}" target="_blank" rel="noopener" class="btn btn-primary" onclick="event.stopPropagation();" style="width: 100%;">
            View on GitHub
          </a>
        `}
      </div>
    </article>
  `;
}

// --- Modal Functionality ---
function initProjectListeners() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.dataset.id;
      const project = ALL_PROJECTS.find(p => p.id === projId);
      if (project) {
        populateModal(project);
        openModal();
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const projId = card.dataset.id;
        const project = ALL_PROJECTS.find(p => p.id === projId);
        if (project) {
          populateModal(project);
          openModal();
        }
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Accessibility keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function populateModal(proj) {
  const title = document.getElementById('modal-project-title');
  const tagRow = document.getElementById('modal-tag-row');
  const description = document.getElementById('modal-description');
  const resultsHeading = document.getElementById('modal-results-heading');
  const resultsList = document.getElementById('modal-results-list');
  const metaCategory = document.getElementById('modal-meta-category');
  const metaLanguage = document.getElementById('modal-meta-language');
  const metaUpdated = document.getElementById('modal-meta-updated');
  const githubLink = document.getElementById('modal-github-link');
  const demoLink = document.getElementById('modal-demo-link');

  title.textContent = proj.title;
  tagRow.innerHTML = proj.techStack.map(t => `<span class="project-tag">${t}</span>`).join('');
  description.textContent = proj.details;

  // Render Key Results
  if (proj.keyResults && proj.keyResults.length > 0) {
    resultsHeading.style.display = 'block';
    resultsList.style.display = 'block';
    resultsList.innerHTML = proj.keyResults.map(r => `<li>${r}</li>`).join('');
  } else {
    resultsHeading.style.display = 'none';
    resultsList.style.display = 'none';
  }

  // Meta metadata
  metaCategory.textContent = proj.categoryName;
  metaLanguage.textContent = proj.language;
  metaUpdated.textContent = proj.updatedAt.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Footer Actions
  githubLink.href = proj.githubUrl;
  
  if (proj.demoUrl) {
    demoLink.href = proj.demoUrl;
    demoLink.style.display = 'inline-flex';
  } else {
    demoLink.style.display = 'none';
  }
}

function openModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock main scroll
  
  // Accessibility Focus Trap
  const closeBtn = document.getElementById('modal-close');
  closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Release scroll
}

// --- Contact Form Handling & Validations ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const formStatus = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    // Fetch values
    const nameGroup = document.getElementById('form-group-name');
    const emailGroup = document.getElementById('form-group-email');
    const msgGroup = document.getElementById('form-group-message');

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    let isValid = true;

    // Validate Name
    if (!name) {
      nameGroup.classList.add('invalid');
      isValid = false;
    } else {
      nameGroup.classList.remove('invalid');
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      emailGroup.classList.add('invalid');
      isValid = false;
    } else {
      emailGroup.classList.remove('invalid');
    }

    // Validate Message
    if (!message || message.length < 10) {
      msgGroup.classList.add('invalid');
      isValid = false;
    } else {
      msgGroup.classList.remove('invalid');
    }

    if (isValid) {
      // Simulate Successful API Send
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="width: 18px; height: 18px; animation: rotate 1s linear infinite; fill: none; stroke: currentColor; stroke-width: 2;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-dasharray="30 15"></circle>
        </svg>
        Sending...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show Success banner
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
        formStatus.classList.add('success');
        formStatus.style.display = 'block';

        // Save data to localStorage (Mocking backend log)
        const leads = JSON.parse(localStorage.getItem('contactLeads') || '[]');
        leads.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('contactLeads', JSON.stringify(leads));

        form.reset();
      }, 1500);
    } else {
      // Show Error banner
      formStatus.textContent = 'Please correct the highlighted errors in the form before submitting.';
      formStatus.classList.add('error');
      formStatus.style.display = 'block';
    }
  });
}
