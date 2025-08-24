// Portfolio Controller - Handles all interactions and animations
// This file connects the data with the HTML elements

class PortfolioController {
    constructor() {
        this.data = portfolioData;
        this.init();
        this.bindEvents();
        this.populateContent();
        this.createParticles();
        this.startTypingEffect();
        this.initScrollAnimations();
    }

    init() {
        // Update page meta information
        this.updateMetaInfo();
        
        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if (loader) loader.classList.add('hidden');
            }, 1500);
        });

        // Initialize animations
        this.animateCounters();
        this.animateSkillBars();
    }

    updateMetaInfo() {
        document.title = this.data.meta.title;
        
        // Update meta tags
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) metaDescription.content = this.data.meta.description;
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = this.data.meta.ogTitle;
        
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.content = this.data.meta.ogDescription;
    }

    populateContent() {
        this.populateNavigation();
        this.populateHeroSection();
        this.populateAboutSection();
        this.populateSkillsSection();
        this.populateProjectsSection();
        this.populateExperienceSection();
        this.populateTestimonialsSection();
        this.populateContactSection();
        this.populateFooter();
    }

    populateNavigation() {
        const navLinks = document.getElementById('navLinks');
        if (!navLinks) return;

        navLinks.innerHTML = this.data.navigation.map(item => 
            `<li><a href="${item.href}" ${item.id === 'home' ? 'class="active"' : ''}>${item.label}</a></li>`
        ).join('');
    }

    populateHeroSection() {
        // Update hero image
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.src = this.data.personal.profileImage;
            heroImage.alt = this.data.personal.name;
        }

        // Update name and title
        const heroName = document.querySelector('.hero h1');
        if (heroName) heroName.textContent = this.data.personal.name;

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = this.data.personal.title;

        // Update buttons
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            heroButtons.innerHTML = `
                <a href="#contact" class="btn btn-primary">Get In Touch</a>
                <a href="${this.data.personal.social.github}" class="btn btn-secondary" target="_blank">View GitHub</a>
            `;
        }
    }

    populateAboutSection() {
        // Update section title and subtitle
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle) aboutTitle.textContent = this.data.sections.about.title;

        const aboutSubtitle = document.querySelector('#about .section-subtitle');
        if (aboutSubtitle) aboutSubtitle.textContent = this.data.sections.about.subtitle;

        // Update stats
        const statCards = document.querySelectorAll('.stat-card');
        const stats = [
            { value: this.data.stats.downloads, label: this.data.stats.downloadsLabel },
            { value: this.data.stats.projects, label: this.data.stats.projectsLabel },
            { value: this.data.stats.experience, label: this.data.stats.experienceLabel },
            { value: this.data.stats.rating, label: this.data.stats.ratingLabel }
        ];

        statCards.forEach((card, index) => {
            if (stats[index]) {
                const numberEl = card.querySelector('.stat-number');
                const labelEl = card.querySelector('.stat-label');
                if (numberEl) numberEl.setAttribute('data-target', stats[index].value);
                if (labelEl) labelEl.textContent = stats[index].label;
            }
        });

        // Update about text
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.innerHTML = this.data.bio.aboutText.map(paragraph => 
                `<p>${paragraph}</p>`
            ).join('');
        }
    }

    populateSkillsSection() {
        const skillsTitle = document.querySelector('#skills .section-title');
        if (skillsTitle) skillsTitle.textContent = this.data.sections.skills.title;

        const skillsSubtitle = document.querySelector('#skills .section-subtitle');
        if (skillsSubtitle) skillsSubtitle.textContent = this.data.sections.skills.subtitle;

        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid) return;

        skillsGrid.innerHTML = Object.values(this.data.skills).map(category => `
            <div class="skill-category scale-up">
                <h3><i class="${category.icon}"></i> ${category.title}</h3>
                ${category.skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>${skill.name}</span>
                            <span>${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-width="${skill.level}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    populateProjectsSection() {
        const projectsTitle = document.querySelector('#projects .section-title');
        if (projectsTitle) projectsTitle.textContent = this.data.sections.projects.title;

        const projectsSubtitle = document.querySelector('#projects .section-subtitle');
        if (projectsSubtitle) projectsSubtitle.textContent = this.data.sections.projects.subtitle;

        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.data.projects.map(project => `
            <div class="project-card scale-up">
                <div class="project-image">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" ${project.github !== '#' ? 'target="_blank"' : ''}>
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="${project.demo}" class="project-link" ${project.demo !== '#' ? 'target="_blank"' : ''}>
                            <i class="fas fa-external-link-alt"></i> ${this.getProjectLinkText(project.type)}
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getProjectLinkText(type) {
        const linkTexts = {
            'iOS': 'App Store',
            'Android': 'Play Store',
            'Cross-Platform': 'Live Demo'
        };
        return linkTexts[type] || 'Demo';
    }

    populateExperienceSection() {
        const experienceTitle = document.querySelector('#experience .section-title');
        if (experienceTitle) experienceTitle.textContent = this.data.sections.experience.title;

        const experienceSubtitle = document.querySelector('#experience .section-subtitle');
        if (experienceSubtitle) experienceSubtitle.textContent = this.data.sections.experience.subtitle;

        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        timeline.innerHTML = this.data.experience.map((exp, index) => `
            <div class="timeline-item ${index % 2 === 0 ? 'fade-left' : 'fade-right'}">
                <div class="timeline-content">
                    <div class="timeline-date">${exp.period}</div>
                    <h3 class="timeline-title">${exp.title}</h3>
                    <div class="timeline-company">${exp.company}</div>
                    <p class="timeline-description">${exp.description}</p>
                </div>
            </div>
        `).join('');
    }

    populateTestimonialsSection() {
        const testimonialsTitle = document.querySelector('#testimonials .section-title');
        if (testimonialsTitle) testimonialsTitle.textContent = this.data.sections.testimonials.title;

        const testimonialsSubtitle = document.querySelector('#testimonials .section-subtitle');
        if (testimonialsSubtitle) testimonialsSubtitle.textContent = this.data.sections.testimonials.subtitle;

        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (!testimonialsGrid) return;

        testimonialsGrid.innerHTML = this.data.testimonials.map(testimonial => `
            <div class="testimonial-card scale-up">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.avatar}</div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <span>${testimonial.position}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    populateContactSection() {
        const contactTitle = document.querySelector('#contact .section-title');
        if (contactTitle) contactTitle.textContent = this.data.sections.contact.title;

        const contactSubtitle = document.querySelector('#contact .section-subtitle');
        if (contactSubtitle) contactSubtitle.textContent = this.data.sections.contact.subtitle;

        const contactInfo = document.querySelector('.contact-info');
        if (!contactInfo) return;

        contactInfo.innerHTML = this.data.contact.items.map(item => `
            <div class="contact-item scale-up">
                <div class="contact-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.value}</p>
                </div>
            </div>
        `).join('');
    }

    populateFooter() {
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
            socialLinks.innerHTML = `
                <a href="${this.data.personal.social.github}" class="social-link" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
                <a href="${this.data.personal.social.linkedin}" class="social-link" target="_blank">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="${this.data.personal.social.email}" class="social-link">
                    <i class="fas fa-envelope"></i>
                </a>
            `;
        }

        const footerText = document.querySelector('footer p');
        if (footerText) {
            footerText.innerHTML = `&copy; 2025 ${this.data.personal.name}. All rights reserved. Built with ❤️ and cutting-edge web technologies.`;
        }
    }

    bindEvents() {
        this.setupSmoothScrolling();
        this.setupNavigationEffects();
        this.setupMobileMenu();
        this.setupContactForm();
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
                    
                    this.updateActiveNavLink(link);
                }
            });
        });
    }

    setupNavigationEffects() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
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
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-active');
            });
        }
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            this.showFormSuccess();
            form.reset();
        });
    }

    showFormSuccess() {
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
        
        setTimeout(() => {
            successMsg.style.opacity = '1';
            successMsg.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            successMsg.style.opacity = '0';
            successMsg.style.transform = 'translateX(100px)';
            setTimeout(() => successMsg.remove(), 300);
        }, 3000);
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

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
        if (!typingElement) return;

        const phrases = this.data.bio.taglines;
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
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
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

        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up').forEach(el => {
            observer.observe(el);
        });
    }

    handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolioController = new PortfolioController();
    
    // Make controller globally available
    window.portfolioController = portfolioController;
    
    console.log('🚀 Portfolio initialized successfully!');
});

// Utility Functions
function downloadResume() {
    if (portfolioData.personal.resume.url && portfolioData.personal.resume.url !== '#') {
        window.open(portfolioData.personal.resume.url, '_blank');
    } else {
        showNotification('Resume will be available soon!', 'info');
    }
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
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
