import './style.css';

console.log("ASE_TECH10101 initialized!");

// Progress Tracking
interface ProgressData {
  completedResources: string[];
}

function getProgress(): ProgressData {
  const stored = localStorage.getItem('ase_tech_progress');
  return stored ? JSON.parse(stored) : { completedResources: [] };
}

function saveProgress(data: ProgressData): void {
  localStorage.setItem('ase_tech_progress', JSON.stringify(data));
}

function isResourceCompleted(platformId: string, resourceTitle: string): boolean {
  const progress = getProgress();
  return progress.completedResources.includes(`${platformId}-${resourceTitle}`);
}

function toggleResourceCompletion(platformId: string, resourceTitle: string): void {
  const progress = getProgress();
  const key = `${platformId}-${resourceTitle}`;
  const index = progress.completedResources.indexOf(key);

  if (index > -1) {
    progress.completedResources.splice(index, 1);
  } else {
    progress.completedResources.push(key);
  }

  saveProgress(progress);
}

function getPlatformProgress(platformId: string, totalResources: number): number {
  const progress = getProgress();
  const completed = progress.completedResources.filter(key => key.startsWith(`${platformId}-`)).length;
  return Math.round((completed / totalResources) * 100);
}

// Platform Data
interface Resource {
  title: string;
  description: string;
  link: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: string;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  mainLink: string;
  resources: Resource[];
}

interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  link: string;
}

interface Tutorial {
  id: number;
  title: string;
  platform: string;
  icon: string;
  duration: string;
  description: string;
  videoId: string;
}

const platforms: Platform[] = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    category: 'Web Development',
    description: 'A JavaScript library for building user interfaces with component-based architecture.',
    mainLink: 'https://react.dev/learn',
    resources: [
      { title: 'Getting Started with React', description: 'Install React and create your first component', link: 'https://react.dev', difficulty: 'Beginner', estimatedTime: '2 hours' },
      { title: 'Understanding JSX', description: 'Learn the syntax extension for JavaScript', link: 'https://react.dev', difficulty: 'Beginner', estimatedTime: '1 hour' },
      { title: 'Components & Props', description: 'Build reusable components with props', link: 'https://react.dev', difficulty: 'Beginner', estimatedTime: '3 hours' },
      { title: 'State with useState', description: 'Master React state management basics', link: 'https://react.dev', difficulty: 'Beginner', estimatedTime: '2 hours' }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    category: 'Programming Language',
    description: 'High-level programming language known for simplicity and versatility.',
    mainLink: 'https://docs.python.org/3/tutorial/',
    resources: [
      { title: 'Python Fundamentals', description: 'Variables, data types, and basic syntax', link: 'https://docs.python.org', difficulty: 'Beginner', estimatedTime: '3 hours' },
      { title: 'Control Flow', description: 'If statements, loops, and logic', link: 'https://docs.python.org', difficulty: 'Beginner', estimatedTime: '2 hours' },
      { title: 'Data Structures', description: 'Lists, tuples, sets, and dictionaries', link: 'https://docs.python.org', difficulty: 'Beginner', estimatedTime: '4 hours' },
      { title: 'Object-Oriented Python', description: 'Classes, inheritance, and polymorphism', link: 'https://docs.python.org', difficulty: 'Intermediate', estimatedTime: '5 hours' }
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    category: 'Backend',
    description: 'JavaScript runtime for server-side applications.',
    mainLink: 'https://nodejs.org/en/learn',
    resources: [
      { title: 'Node.js Introduction', description: 'Understanding Node.js ecosystem', link: 'https://nodejs.org', difficulty: 'Beginner', estimatedTime: '2 hours' },
      { title: 'Express.js Framework', description: 'Build web servers with Express', link: 'https://expressjs.com', difficulty: 'Intermediate', estimatedTime: '5 hours' },
      { title: 'RESTful API Design', description: 'Build scalable REST APIs', link: 'https://nodejs.org', difficulty: 'Advanced', estimatedTime: '6 hours' },
      { title: 'Authentication & JWT', description: 'Secure your applications', link: 'https://jwt.io', difficulty: 'Advanced', estimatedTime: '5 hours' }
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    category: 'DevOps',
    description: 'Platform for developing and running applications in containers.',
    mainLink: 'https://docs.docker.com/get-started/',
    resources: [
      { title: 'Docker Introduction', description: 'Containerization concepts', link: 'https://docs.docker.com', difficulty: 'Beginner', estimatedTime: '2 hours' },
      { title: 'Docker Images', description: 'Understanding and pulling images', link: 'https://docs.docker.com', difficulty: 'Beginner', estimatedTime: '2 hours' },
      { title: 'Dockerfile Basics', description: 'Create custom Docker images', link: 'https://docs.docker.com', difficulty: 'Intermediate', estimatedTime: '4 hours' },
      { title: 'Docker Compose', description: 'Multi-container applications', link: 'https://docs.docker.com', difficulty: 'Intermediate', estimatedTime: '5 hours' }
    ]
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    category: 'Database',
    description: 'NoSQL document database.',
    mainLink: 'https://www.mongodb.com/docs/manual/',
    resources: [
      { title: 'MongoDB Introduction', description: 'NoSQL database concepts', link: 'https://www.mongodb.com', difficulty: 'Beginner', estimatedTime: '2 hours' },
      { title: 'CRUD Operations', description: 'Create, read, update, delete documents', link: 'https://www.mongodb.com', difficulty: 'Beginner', estimatedTime: '4 hours' },
      { title: 'Aggregation Framework', description: 'Complex data processing', link: 'https://www.mongodb.com', difficulty: 'Intermediate', estimatedTime: '6 hours' },
      { title: 'Mongoose ODM', description: 'Object modeling for Node.js', link: 'https://mongoosejs.com', difficulty: 'Intermediate', estimatedTime: '5 hours' }
    ]
  }
];

const tools: Tool[] = [
  { id: 'vscode', name: 'VS Code', icon: '🚀', category: 'Editor', description: 'Code editor with extensions', link: 'https://code.visualstudio.com' },
  { id: 'figma', name: 'Figma', icon: '🎨', category: 'Design', description: 'Collaborative design tool', link: 'https://figma.com' },
  { id: 'postman', name: 'Postman', icon: '📡', category: 'API Testing', description: 'API development platform', link: 'https://postman.com' },
  { id: 'git', name: 'Git', icon: '📝', category: 'Version Control', description: 'Version control system', link: 'https://git-scm.com' }
];

const tutorials: Tutorial[] = [
  { id: 1, title: 'React Basics', platform: 'React', icon: '⚛️', duration: '15:30', description: 'Learn React fundamentals', videoId: 'dQw4w9WgXcQ' },
  { id: 2, title: 'JavaScript ES6', platform: 'JavaScript', icon: '🟨', duration: '22:45', description: 'Master modern JavaScript', videoId: 'dQw4w9WgXcQ' },
  { id: 3, title: 'Python for Beginners', platform: 'Python', icon: '🐍', duration: '18:20', description: 'Start with Python', videoId: 'dQw4w9WgXcQ' },
  { id: 4, title: 'Node.js API', platform: 'Node.js', icon: '🟢', duration: '25:10', description: 'Build REST APIs', videoId: 'dQw4w9WgXcQ' },
  { id: 5, title: 'Docker Containers', platform: 'Docker', icon: '🐳', duration: '20:00', description: 'Containerize your apps', videoId: 'dQw4w9WgXcQ' },
  { id: 6, title: 'MongoDB Basics', platform: 'MongoDB', icon: '🍃', duration: '17:35', description: 'NoSQL database guide', videoId: 'dQw4w9WgXcQ' }
];

// Render Platforms
function renderPlatforms(): void {
  const platformGrid = document.getElementById('platformGrid');
  if (!platformGrid) return;
  platformGrid.innerHTML = '';

  for (const platform of platforms) {
    const card = document.createElement('div');
    card.className = 'platform-card';
    const progressPercent = getPlatformProgress(platform.id, platform.resources.length);

    card.innerHTML = `
      <div class="platform-badge">${platform.category}</div>
      <div class="platform-icon">${platform.icon}</div>
      <div class="platform-name">${platform.name}</div>
      ${progressPercent > 0 ? `<div style="margin-top: 1rem; font-size: 0.9rem; color: var(--primary-cyan);">${progressPercent}% Complete</div>` : ''}
    `;
    card.addEventListener('click', () => openPlatformDetail(platform));
    platformGrid.appendChild(card);
  }
}

// Open Platform Detail
function openPlatformDetail(platform: Platform): void {
  const modal = document.getElementById('platformModal');
  const details = document.getElementById('platformDetails');
  if (!modal || !details) return;

  const completedCount = platform.resources.filter(r =>
    isResourceCompleted(platform.id, r.title)
  ).length;
  const progressPercent = getPlatformProgress(platform.id, platform.resources.length);

  details.innerHTML = `
    <div class="platform-detail-icon">${platform.icon}</div>
    <h2 class="platform-detail-title">${platform.name}</h2>
    <p class="platform-detail-description">${platform.description}</p>
    <a href="${platform.mainLink}" target="_blank" rel="noopener noreferrer" class="main-platform-link">
      Open Official Guides →
    </a>
    <div class="completion-stats">
      <div class="stat-item">
        <div class="stat-value">${completedCount}/${platform.resources.length}</div>
        <div class="stat-label-small">Completed</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${progressPercent}%</div>
        <div class="stat-label-small">Progress</div>
      </div>
    </div>
    <div class="resource-section">
      <h3 class="resource-section-title">📖 Learning Resources</h3>
      <div class="resource-list">
        ${platform.resources.map((resource, index) => {
          const isCompleted = isResourceCompleted(platform.id, resource.title);
          return `
            <div class="resource-item ${isCompleted ? 'completed' : ''}" data-platform="${platform.id}" data-resource="${resource.title}">
              <div class="resource-item-header">
                <div class="resource-checkbox ${isCompleted ? 'checked' : ''}" data-index="${index}"></div>
                <div class="resource-item-content">
                  <div class="resource-item-title">${resource.title}</div>
                  <div class="resource-item-desc">${resource.description}</div>
                  <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
                    ${resource.difficulty} • ${resource.estimatedTime}
                  </div>
                  <a href="${resource.link}" target="_blank" rel="noopener noreferrer" class="resource-item-link">Learn More →</a>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const checkboxes = details.querySelectorAll('.resource-checkbox');
  for (const checkbox of checkboxes) {
    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = (checkbox as HTMLElement).closest('.resource-item');
      if (!item) return;
      const platformId = item.getAttribute('data-platform');
      const resourceTitle = item.getAttribute('data-resource');
      if (platformId && resourceTitle) {
        toggleResourceCompletion(platformId, resourceTitle);
        checkbox.classList.toggle('checked');
        item.classList.toggle('completed');
        openPlatformDetail(platform);
        renderPlatforms();
      }
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Platform Detail
function closePlatformDetail(): void {
  const modal = document.getElementById('platformModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Platform modal close
  const platformClose = document.getElementById('platformClose');
  const platformModal = document.getElementById('platformModal');
  
  if (platformClose && platformModal) {
    platformClose.addEventListener('click', closePlatformDetail);
    platformModal.addEventListener('click', (e) => {
      if (e.target === platformModal) {
        closePlatformDetail();
      }
    });
  }

  // Video modal close
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const searchResults = document.getElementById('searchResults');

  if (searchBtn && searchModal && searchClose && searchInput && searchResults) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      searchInput.focus();
      renderSearchResults(platforms);
    });

    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      if (query === '') {
        renderSearchResults(platforms);
      } else {
        const filtered = platforms.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
        renderSearchResults(filtered);
      }
    });
  }

  function renderSearchResults(results: Platform[]): void {
    if (!searchResults) return;
    searchResults.innerHTML = '';
    if (results.length === 0) {
      searchResults.innerHTML = '<p style="text-align: center; color: var(--text-gray);">No platforms found</p>';
      return;
    }
    for (const plat of results) {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `<div class="search-result-icon">${plat.icon}</div><div class="search-result-name">${plat.name}</div>`;
      item.addEventListener('click', () => {
        if (searchModal) {
          searchModal.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
        openPlatformDetail(plat);
      });
      searchResults.appendChild(item);
    }
  }

  // Access button
  const accessBtn = document.getElementById('accessBtn');
  if (accessBtn) {
    accessBtn.addEventListener('click', () => {
      const resourcesSection = document.getElementById('resources');
      if (resourcesSection) {
        resourcesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Dark mode
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    const savedMode = localStorage.getItem('darkMode') || 'dark';
    if (savedMode === 'light') {
      document.body.classList.add('light-mode');
      darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('darkMode', isLight ? 'light' : 'dark');
      darkModeToggle.textContent = isLight ? '☀️' : '🌙';
    });
  }

  // Auth system
  const signInBtn = document.getElementById('signInBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (signInBtn) {
    signInBtn.addEventListener('click', () => {
      const name = prompt('Enter your name:');
      if (name) {
        const email = `${name.toLowerCase().replace(' ', '.')}@tech.com`;
        localStorage.setItem('currentUser', JSON.stringify({ name, email }));
        updateAuthUI();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      updateAuthUI();
    });
  }

  function updateAuthUI(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const signInBtn = document.getElementById('signInBtn');
    const userMenu = document.getElementById('userMenu');

    if (user && signInBtn && userMenu) {
      signInBtn.style.display = 'none';
      userMenu.style.display = 'flex';
      const userNameEl = document.getElementById('userName');
      const userEmailEl = document.getElementById('userEmail');
      const userInitialsEl = document.getElementById('userInitials');
      
      if (userNameEl) userNameEl.textContent = user.name;
      if (userEmailEl) userEmailEl.textContent = user.email;
      if (userInitialsEl) {
        const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
        userInitialsEl.textContent = initials;
      }
    } else if (signInBtn && userMenu) {
      signInBtn.style.display = 'block';
      userMenu.style.display = 'none';
    }
  }

  updateAuthUI();

  // Initialize
  renderPlatforms();
});