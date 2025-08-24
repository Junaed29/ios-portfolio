// Portfolio Data Configuration
const portfolioData = {
    personal: {
        name: "Alex Johnson",
        title: "Senior iOS Developer",
        location: "San Francisco, CA",
        email: "alex.johnson.dev@email.com",
        phone: "(555) 123-4567",
        experience: "5+ years",
        github: "github.com/alexjohnson-dev",
        linkedin: "linkedin.com/in/alexjohnson-dev",
        twitter: "twitter.com/alexjohnsondev"
    },
    
    bio: {
        taglines: [
            "Crafting exceptional mobile experiences",
            "From Android to iOS, building the future",
            "Where code meets creativity",
            "Turning ideas into app store success"
        ],
        summary: "I'm a passionate mobile developer with over 5 years of experience creating innovative applications for iOS and Android platforms. My journey began with Android development using Java and Kotlin, where I honed my skills in creating robust, user-friendly applications."
    },
    
    stats: {
        downloads: 500,
        projects: 25,
        experience: 5,
        rating: 4.8
    },
    
    skills: {
        ios: [
            { name: "Swift", level: 95 },
            { name: "SwiftUI", level: 90 },
            { name: "UIKit", level: 92 },
            { name: "Core Data", level: 85 }
        ],
        android: [
            { name: "Kotlin", level: 93 },
            { name: "Java", level: 88 },
            { name: "Android Studio", level: 90 },
            { name: "Room Database", level: 87 }
        ],
        crossPlatform: [
            { name: "React Native", level: 85 },
            { name: "Flutter", level: 80 },
            { name: "Dart", level: 78 },
            { name: "JavaScript", level: 88 }
        ],
        tools: [
            { name: "Git", level: 92 },
            { name: "Firebase", level: 89 },
            { name: "RESTful APIs", level: 91 },
            { name: "UI/UX Design", level: 83 }
        ]
    },
    
    projects: [
        {
            title: "TaskFlow Pro",
            description: "A comprehensive productivity app built with SwiftUI, featuring task management, calendar integration, and team collaboration tools. Includes offline sync and Apple Watch companion app.",
            technologies: ["Swift", "SwiftUI", "Core Data", "CloudKit"],
            github: "#",
            demo: "#",
            type: "iOS"
        },
        {
            title: "SocialConnect",
            description: "Modern social networking app built with Kotlin and Jetpack Compose. Features real-time messaging, photo sharing, and location-based friend discovery with advanced privacy controls.",
            technologies: ["Kotlin", "Jetpack Compose", "Firebase", "Room"],
            github: "#",
            demo: "#",
            type: "Android"
        },
        {
            title: "FinanceTracker",
            description: "Cross-platform financial management app built with React Native. Features expense tracking, budget planning, investment portfolio management, and bank account integration.",
            technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
            github: "#",
            demo: "#",
            type: "Cross-Platform"
        },
        {
            title: "MindGames",
            description: "Collection of brain training games for iOS using UIKit and SpriteKit. Features adaptive difficulty, progress tracking, and multiplayer challenges with Game Center integration.",
            technologies: ["Swift", "UIKit", "SpriteKit", "Game Center"],
            github: "#",
            demo: "#",
            type: "iOS"
        },
        {
            title: "FitnessPal",
            description: "Comprehensive fitness tracking app built with Flutter. Includes workout planning, nutrition tracking, progress analytics, and social features for fitness communities.",
            technologies: ["Flutter", "Dart", "SQLite", "REST API"],
            github: "#",
            demo: "#",
            type: "Cross-Platform"
        },
        {
            title: "ShopSmart",
            description: "E-commerce mobile app for Android with advanced search, wishlist management, secure payments, and AR product visualization. Built with modern Android architecture components.",
            technologies: ["Kotlin", "MVVM", "Retrofit", "ARCore"],
            github: "#",
            demo: "#",
            type: "Android"
        }
    ],
    
    experience: [
        {
            period: "2022 - Present",
            title: "Senior iOS Developer",
            company: "TechCorp Solutions",
            description: "Leading iOS development team of 5 developers. Architected and developed 8 iOS applications using Swift and SwiftUI. Improved app performance by 40% and reduced crash rates to under 0.1%. Mentored junior developers and established coding standards and best practices."
        },
        {
            period: "2020 - 2022",
            title: "Mobile App Developer",
            company: "InnovateMobile Inc.",
            description: "Transitioned from Android to iOS development while maintaining Android projects. Developed cross-platform solutions using React Native. Published 6 successful apps with over 100K downloads combined. Collaborated with design team to implement pixel-perfect UIs."
        },
        {
            period: "2019 - 2020",
            title: "Android Developer",
            company: "StartupHub",
            description: "Specialized in Android development using Java and Kotlin. Built scalable applications with clean architecture patterns. Integrated RESTful APIs and implemented offline-first architecture. Contributed to open-source projects and gained recognition in developer community."
        }
    ],
    
    testimonials: [
        {
            text: "Alex is an exceptional iOS developer who consistently delivers high-quality code. His transition from Android to iOS was seamless, and he brings unique cross-platform insights to every project. The apps he built for us have over 4.9 stars rating!",
            author: "Sarah Mitchell",
            position: "Product Manager, TechCorp",
            avatar: "SM"
        },
        {
            text: "Working with Alex was a game-changer for our startup. He not only developed our mobile app but also provided valuable insights on user experience and performance optimization. His expertise in both platforms saved us significant development time.",
            author: "David Johnson",
            position: "CTO, InnovateMobile",
            avatar: "DJ"
        },
        {
            text: "Alex's attention to detail and problem-solving skills are outstanding. He took our complex requirements and turned them into intuitive, user-friendly mobile applications. His code is clean, well-documented, and maintainable.",
            author: "Emily Rodriguez",
            position: "Lead Designer, StartupHub",
            avatar: "ER"
        }
    ]
};

// Animation and Interaction Controllers
class PortfolioController {
    constructor() {
        this.init();
        this.bindEvents();
        this.createParticles();
        this.startTypingEffect();
        this.initScrollAnimations();
    }

    init() {
        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.classList.add('hidden');
            }, 1500);
        });

        // Initialize animations
        this.animateCounters();
        this.animateSkillBars();
    }

    bindEvents() {
        // Smooth scrolling for navigation
        this.setupSmoothScrolling();
        
        // Navigation scroll effect
        this.setupNavigationEffects();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Contact form
        this.setupContactForm();
        
        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(link);
                }
            });
        });
    }

    setupNavigationEffects() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            // Add scrolled class to navbar
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Update active navigation based on scroll position
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation and submission logic
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            this.showFormSuccess();
            form.reset();
        });
    }

    showFormSuccess() {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(successMsg);
        
        // Animate in
        setTimeout(() => {
            successMsg.style.opacity = '1';
            successMsg.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMsg.style.opacity = '0';
            successMsg.style.transform = 'translateX(100px)';
            setTimeout(() => successMsg.remove(), 300);
        }, 3000);
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 6}s;
                animation-duration: ${4 + Math.random() * 4}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    startTypingEffect() {
        const typingElement = document.getElementById('typingText');
        const phrases = portfolioData.bio.taglines;
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let isPaused = false;

        const type = () => {
            const current = phrases[currentPhrase];
            
            if (isPaused) {
                isPaused = false;
                setTimeout(type, 1000);
                return;
            }
            
            if (isDeleting) {
                typingElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
                
                if (currentChar === 0) {
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    setTimeout(type, 500);
                    return;
                }
            } else {
                typingElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
                
                if (currentChar === current.length) {
                    isPaused = true;
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 2000);
                    return;
                }
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        };
        
        type();
    }

    animateCounters() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
            observer.observe(counter);
        });
    }

    animateSkillBars() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target;
                    const width = skillProgress.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillProgress.style.width = width + '%';
                    }, 200);
                    
                    observer.unobserve(skillProgress);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-progress[data-width]').forEach(bar => {
            observer.observe(bar);
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up').forEach(el => {
            observer.observe(el);
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
}

// Utility Functions
function downloadResume() {
    // Create a dummy PDF blob for demonstration
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj

5 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Alex Johnson - Resume) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000348 00000 n 
0000000441 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
533
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Johnson_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show download success message
    showNotification('Resume downloaded successfully!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Project filtering and search functionality
class ProjectFilter {
    constructor() {
        this.projects = portfolioData.projects;
        this.filteredProjects = this.projects;
        this.currentFilter = 'all';
    }

    filterByType(type) {
        this.currentFilter = type;
        if (type === 'all') {
            this.filteredProjects = this.projects;
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.type.toLowerCase().includes(type.toLowerCase())
            );
        }
        this.renderProjects();
    }

    searchProjects(query) {
        const lowercaseQuery = query.toLowerCase();
        this.filteredProjects = this.projects.filter(project =>
            project.title.toLowerCase().includes(lowercaseQuery) ||
            project.description.toLowerCase().includes(lowercaseQuery) ||
            project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
        );
        this.renderProjects();
    }

    renderProjects() {
        const container = document.querySelector('.projects-grid');
        container.innerHTML = '';
        
        this.filteredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            container.appendChild(projectCard);
        });
        
        // Re-initialize animations for new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });
        
        container.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card scale-up';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const techTags = project.technologies.map(tech => 
            `<span class="tag">${tech}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="project-image">
                <i class="fas fa-${this.getProjectIcon(project.type)}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">${techTags}</div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.demo}" class="project-link">
                        <i class="fas fa-external-link-alt"></i> ${project.type === 'iOS' ? 'App Store' : project.type === 'Android' ? 'Play Store' : 'Live Demo'}
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }

    getProjectIcon(type) {
        const icons = {
            'iOS': 'mobile-alt',
            'Android': 'robot',
            'Cross-Platform': 'mobile'
        };
        return icons[type] || 'mobile-alt';
    }
}

// Advanced Animation Effects
class AdvancedAnimations {
    constructor() {
        this.initParallaxEffects();
        this.initMouseTracker();
        this.initScrollProgress();
    }

    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero, .about-stats');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    initMouseTracker() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(102,126,234,0.8) 0%, rgba(102,126,234,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Expand cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight || window.innerHeight;
            const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
            
            progressBar.style.width = scrollProgress + '%';
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.loadTime = 0;
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.loadTime = performance.now() - this.startTime;
            console.log(`Portfolio loaded in ${this.loadTime.toFixed(2)}ms`);
            
            // Send performance metrics (in real app, this would go to analytics)
            this.logPerformanceMetrics();
        });
    }

    logPerformanceMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const metrics = {
            loadTime: this.loadTime,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            firstContentfulPaint: this.getFirstContentfulPaint(),
            totalResources: performance.getEntriesByType('resource').length
        };
        
        console.table(metrics);
    }

    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? fcp.startTime : 0;
    }
}

// Theme Controller
class ThemeController {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                '--primary-color': '#667eea',
                '--secondary-color': '#764ba2',
                '--dark-bg': '#0f0f23',
                '--darker-bg': '#020024'
            },
            blue: {
                '--primary-color': '#4facfe',
                '--secondary-color': '#00f2fe',
                '--dark-bg': '#0a1b2e',
                '--darker-bg': '#051016'
            },
            purple: {
                '--primary-color': '#a855f7',
                '--secondary-color': '#ec4899',
                '--dark-bg': '#1e1b3a',
                '--darker-bg': '#0f0d1a'
            }
        };
    }

    switchTheme(themeName) {
        if (this.themes[themeName]) {
            const theme = this.themes[themeName];
            const root = document.documentElement;
            
            Object.keys(theme).forEach(property => {
                root.style.setProperty(property, theme[property]);
            });
            
            this.currentTheme = themeName;
            localStorage.setItem('portfolio-theme', themeName);
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.switchTheme(savedTheme);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Main controller
    const portfolioController = new PortfolioController();
    
    // Advanced features
    const projectFilter = new ProjectFilter();
    const advancedAnimations = new AdvancedAnimations();
    const performanceMonitor = new PerformanceMonitor();
    const themeController = new ThemeController();
    
    // Load saved theme
    themeController.loadSavedTheme();
    
    // Make controllers globally available for external interactions
    window.portfolioController = portfolioController;
    window.projectFilter = projectFilter;
    window.themeController = themeController;
    
    console.log('🚀 Portfolio initialized successfully!');
});