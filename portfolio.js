// Portfolio Controller - Handles all interactions and animations
// This file connects the data with the HTML elements

console.log('🔄 Loading portfolio controller...');

class PortfolioController {
    constructor() {
        console.log('🔄 Initializing Portfolio Controller...');
        
        if (typeof portfolioData === 'undefined') {
            console.error('❌ portfolioData is not defined!');
            return;
        }
        
        this.data = portfolioData;
        console.log('✅ Data loaded:', this.data);
        
        try {
            this.init();
            console.log('✅ Init complete');
            
            this.populateContent();
            console.log('✅ Content populated');
            
            // Set up animations after content is populated
            this.initScrollAnimations();
            console.log('✅ Scroll animations initialized');
            
            this.animateCounters();
            console.log('✅ Counter animations initialized');
            
            // Set up skill bar animations after a short delay to ensure DOM is ready
            setTimeout(() => {
                this.animateSkillBars();
            }, 500);
            
            this.bindEvents();
            console.log('✅ Events bound');
            
            this.startTypingEffect();
            console.log('✅ Typing effect started');
            
            // Background effects - re-enabling gradually
            // Enable particles if allowed
            if (this.data.featureControl.animations.particles !== false) {
                try {
                    this.createParticles(); // Re-enable particles first
                    console.log('✅ Particles created');
                } catch (particleError) {
                    console.warn('⚠️ Particles failed, continuing without them:', particleError);
                }
            }
            
            // Cursor effects - re-enable
            try {
                this.initInteractiveCursor();
                console.log('✅ Interactive cursor initialized');
            } catch (cursorError) {
                console.warn('⚠️ Cursor effects failed, continuing without them:', cursorError);
            }
            
            // Advanced background effects - re-enable now that core features work
            if (this.shouldLoadAdvancedEffects()) {
                try {
                    this.createAdvancedBackgroundEffects();
                    console.log('✅ Advanced background effects created');
                } catch (bgError) {
                    console.warn('⚠️ Background effects failed, continuing without them:', bgError);
                }
            }
            
            console.log('✅ All initialization complete!');
        } catch (error) {
            console.error('❌ Error during initialization:', error);
        }
    }

    shouldLoadAdvancedEffects() {
        const effects = this.data.featureControl.animations;
        return effects.neuralNetwork !== false || 
               effects.matrixRain !== false || 
               effects.holographicGrid !== false || 
               effects.dnaHelix !== false;
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
        console.log('🔄 Populating content...');
        try {
            this.applySectionControls();
            this.populateNavigation();
            
            if (this.data.sectionControl.hero !== false) {
                this.populateHeroSection();
            }
            if (this.data.sectionControl.about !== false) {
                this.populateAboutSection();
            }
            if (this.data.sectionControl.skills !== false) {
                this.populateSkillsSection();
            }
            if (this.data.sectionControl.projects !== false) {
                this.populateProjectsSection();
            }
            if (this.data.sectionControl.experience !== false) {
                this.populateExperienceSection();
            }
            if (this.data.sectionControl.testimonials !== false) {
                this.populateTestimonialsSection();
            }
            if (this.data.sectionControl.contact !== false) {
                this.populateContactSection();
            }
            
            this.populateFooter();
            console.log('✅ Content populated successfully!');
        } catch (error) {
            console.error('❌ Error populating content:', error);
        }
    }

    applySectionControls() {
        console.log('🎛️ Applying section controls...');
        
        // Hide sections that are disabled
        Object.keys(this.data.sectionControl).forEach(sectionKey => {
            if (this.data.sectionControl[sectionKey] === false) {
                const sectionId = sectionKey === 'hero' ? 'home' : sectionKey;
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    sectionElement.style.display = 'none';
                    console.log(`🚫 Hidden section: ${sectionKey}`);
                }
            }
        });
        
        console.log('✅ Section controls applied');
    }

    populateNavigation() {
        const navLinks = document.getElementById('navLinks');
        if (!navLinks) return;

        // Filter navigation based on section control
        const visibleSections = this.data.navigation.filter(item => {
            // Map navigation items to section control keys
            const sectionKey = item.id === 'home' ? 'hero' : item.id;
            return this.data.sectionControl[sectionKey] !== false;
        });

        navLinks.innerHTML = visibleSections.map((item, index) => 
            `<li><a href="${item.href}" ${index === 0 ? 'class="active"' : ''}>${item.label}</a></li>`
        ).join('');
        
        console.log('✅ Navigation updated with visible sections:', visibleSections.map(s => s.label));
        
        // Ensure proper active state after DOM update
        setTimeout(() => {
            this.setInitialActiveNavigation();
        }, 100);
    }

    setInitialActiveNavigation() {
        // Set the first visible section as active initially
        const firstNavLink = document.querySelector('.nav-links a');
        if (firstNavLink && !document.querySelector('.nav-links a.active')) {
            firstNavLink.classList.add('active');
            console.log('🎯 Set initial active navigation:', firstNavLink.textContent);
        }
    }

    populateHeroSection() {
        console.log('🔄 Populating hero section...');
        try {
            // Update hero image
            const heroImage = document.querySelector('.hero-image img');
            if (heroImage) {
                heroImage.src = this.data.personal.profileImage;
                heroImage.alt = this.data.personal.name;
                console.log('✅ Hero image updated');
            } else {
                console.warn('⚠️ Hero image element not found');
            }

            // Update name and title
            const heroName = document.querySelector('.hero h1');
            if (heroName) {
                heroName.textContent = this.data.personal.name;
                console.log('✅ Hero name updated:', this.data.personal.name);
            } else {
                console.warn('⚠️ Hero name element not found');
            }

            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
                heroSubtitle.textContent = this.data.personal.title;
                console.log('✅ Hero subtitle updated');
            } else {
                console.warn('⚠️ Hero subtitle element not found');
            }

            // Update buttons
            const heroButtons = document.querySelector('.hero-buttons');
            if (heroButtons) {
                heroButtons.innerHTML = `
                    <a href="#contact" class="btn btn-primary">Get In Touch</a>
                    <a href="${this.data.personal.social.github}" class="btn btn-secondary" target="_blank">View GitHub</a>
                    <button onclick="downloadResume()" class="btn btn-accent">
                        <i class="fas fa-download"></i> Download Resume
                    </button>
                `;
                console.log('✅ Hero buttons updated');
            } else {
                console.warn('⚠️ Hero buttons element not found');
            }
        } catch (error) {
            console.error('❌ Error in populateHeroSection:', error);
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
        console.log('🔄 Populating skills section...');
        
        const skillsTitle = document.querySelector('#skills .section-title');
        if (skillsTitle) {
            skillsTitle.textContent = this.data.sections.skills.title;
            console.log('✅ Skills title updated');
        }

        const skillsSubtitle = document.querySelector('#skills .section-subtitle');
        if (skillsSubtitle) {
            skillsSubtitle.textContent = this.data.sections.skills.subtitle;
            console.log('✅ Skills subtitle updated');
        }

        const skillsGrid = document.querySelector('.skills-grid');
        if (!skillsGrid) {
            console.error('❌ Skills grid not found');
            return;
        }

        console.log('📊 Skills data:', this.data.skills);

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
        
        console.log('✅ Skills grid populated');
        
        // Immediately trigger skill bar animation setup
        setTimeout(() => {
            this.animateSkillBars();
            
            // Also add a manual trigger for testing
            this.addManualSkillBarTrigger();
            
            // Fallback: ensure bars show even if animation fails
            this.ensureSkillBarsVisible();
        }, 100);
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
                    ${this.renderProjectImage(project)}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    ${this.data.featureControl.projects.showTechnologies !== false ? `
                        <div class="project-tags">
                            ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="project-links">
                        ${this.renderProjectLinks(project)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProjectLinks(project) {
        const links = [];
        
        // GitHub link - only show if enabled, has valid URL, and not '#' or empty
        if (this.data.featureControl.projects.showGithubLinks !== false && 
            project.github && project.github.trim() !== '' && project.github !== '#') {
            links.push(`
                <a href="${project.github}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            `);
        }
        
        // Demo link - only show if enabled, has valid URL, and not '#' or empty
        if (this.data.featureControl.projects.showDemoLinks !== false && 
            project.demo && project.demo.trim() !== '' && project.demo !== '#') {
            links.push(`
                <a href="${project.demo}" class="project-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>
            `);
        }
        
        // App Store link - only show if enabled, has valid URL, and not '#' or empty
        if (this.data.featureControl.projects.showAppStoreLinks !== false && 
            project.appStore && project.appStore.trim() !== '' && project.appStore !== '#') {
            
            // Determine the icon and text based on the store URL
            const storeInfo = this.getStoreInfo(project.appStore);
            
            links.push(`
                <a href="${project.appStore}" class="project-link" target="_blank">
                    <i class="${storeInfo.icon}"></i> ${storeInfo.text}
                </a>
            `);
        }
        
        return links.join('');
    }

    renderProjectImage(project) {
        // Check if images are enabled and project has a valid image URL
        if (this.data.featureControl.projects.showImages !== false && 
            project.image && project.image.trim() !== '' && project.image !== '#') {
            return `
                <img src="${project.image}" 
                     alt="${project.title} icon" 
                     class="project-logo"
                     loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'; console.warn('Failed to load image for ${project.title}');">
                <i class="${project.icon} project-icon-fallback" style="display: none;"></i>
            `;
        } else {
            // Fallback to icon (either images disabled or no image available)
            return `<i class="${project.icon}"></i>`;
        }
    }

    getProjectLinkText(type) {
        const linkTexts = {
            'iOS': 'App Store',
            'Android': 'Play Store',
            'Cross-Platform': 'Live Demo'
        };
        return linkTexts[type] || 'Demo';
    }

    getStoreInfo(storeUrl) {
        // Detect store type based on URL and return appropriate icon and text
        const url = storeUrl.toLowerCase();
        
        if (url.includes('apps.apple.com') || url.includes('itunes.apple.com') || url.includes('appstore')) {
            return {
                icon: 'fab fa-app-store-ios',
                text: 'App Store'
            };
        } else if (url.includes('play.google.com') || url.includes('playstore') || url.includes('googleplay')) {
            return {
                icon: 'fab fa-google-play',
                text: 'Play Store'
            };
        } else if (url.includes('microsoft.com/store') || url.includes('microsoftstore')) {
            return {
                icon: 'fab fa-microsoft',
                text: 'Microsoft Store'
            };
        } else if (url.includes('amazon.com') && url.includes('app')) {
            return {
                icon: 'fab fa-amazon',
                text: 'Amazon Appstore'
            };
        } else {
            // Default fallback
            return {
                icon: 'fas fa-external-link-alt',
                text: 'Download'
            };
        }
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

        // Handle contact info
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo && this.data.featureControl.contact.showContactInfo !== false) {
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
            
            // Add resume download button if enabled
            if (this.data.featureControl.contact.showResumeDownload !== false) {
                const resumeButton = document.createElement('div');
                resumeButton.className = 'contact-item scale-up resume-download';
                resumeButton.innerHTML = `
                    <div class="contact-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div>
                        <h4>Resume</h4>
                        <p>Download my professional resume</p>
                    </div>
                `;
                resumeButton.style.cursor = 'pointer';
                resumeButton.onclick = downloadResume;
                resumeButton.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        downloadResume();
                    }
                };
                resumeButton.setAttribute('tabindex', '0');
                resumeButton.setAttribute('role', 'button');
                resumeButton.setAttribute('aria-label', 'Download resume PDF');
                contactInfo.appendChild(resumeButton);
            }
        } else if (contactInfo) {
            contactInfo.style.display = 'none';
        }

        // Handle contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm && this.data.featureControl.contact.showContactForm === false) {
            contactForm.style.display = 'none';
        }
        
        // Adjust contact content layout if one section is hidden
        const contactContent = document.querySelector('.contact-content');
        if (contactContent) {
            const infoHidden = this.data.featureControl.contact.showContactInfo === false;
            const formHidden = this.data.featureControl.contact.showContactForm === false;
            
            if (infoHidden || formHidden) {
                contactContent.style.gridTemplateColumns = '1fr';
            }
        }
    }

    populateFooter() {
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks && this.data.featureControl.contact.showSocialLinks !== false) {
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
        } else if (socialLinks) {
            socialLinks.style.display = 'none';
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
        
        // Enhanced scroll event with throttling for better performance
        let ticking = false;
        
        const updateNavigation = () => {
            // Update navbar background on scroll
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Enhanced section detection
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            const scrollPosition = window.scrollY + 150; // Better offset for detection
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                // Check if we're in the section's range
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            // Special case for the last section
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                const lastSection = sections[sections.length - 1];
                if (lastSection) {
                    currentSection = lastSection.getAttribute('id');
                }
            }
            
            // Update active navigation link
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSection}`) {
                    link.classList.add('active');
                    console.log(`🎯 Active section: ${currentSection}`); // Debug log
                }
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        };
        
        // Throttled scroll event
        window.addEventListener('scroll', requestTick);
        
        // Initial call to set correct active state
        updateNavigation();
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

        // Clear existing particles
        particlesContainer.innerHTML = '';
        
        // Create enhanced particle system
        this.createFloatingParticles(particlesContainer);
        this.createCodeElements(particlesContainer);
        this.createGeometricShapes(particlesContainer);
    }

    createFloatingParticles(container) {
        const particleTypes = ['small', 'medium', 'large', 'glow'];
        const particleCount = { small: 25, medium: 15, large: 10, glow: 8 };
        
        particleTypes.forEach(type => {
            for (let i = 0; i < particleCount[type]; i++) {
                const particle = document.createElement('div');
                particle.className = `particle ${type}`;
                particle.style.cssText = `
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 10}s;
                    animation-duration: ${this.getAnimationDuration(type)};
                `;
                container.appendChild(particle);
            }
        });
    }

    createCodeElements(container) {
        const codeSnippets = [
            'func viewDidLoad()',
            '@State var isAnimating',
            'SwiftUI.Animation',
            'class ViewController',
            'import SwiftUI',
            'var body: some View',
            '@ObservableObject',
            'NavigationView',
            'ZStack { }',
            '.onAppear { }',
            'Button("Action")',
            '@Binding var data',
            'List(items) { }',
            'ForEach(0..<10)',
            '.animation(.spring)',
            'struct ContentView',
            'protocol Delegate',
            'enum State { }',
            '.transition(.slide)',
            'Color.blue.opacity'
        ];

        const codeElementCount = 12;
        
        for (let i = 0; i < codeElementCount; i++) {
            const codeElement = document.createElement('div');
            codeElement.className = 'code-element';
            codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            codeElement.style.cssText = `
                left: ${Math.random() * 90}%;
                animation-delay: ${Math.random() * 15}s;
                animation-duration: ${15 + Math.random() * 10}s;
            `;
            container.appendChild(codeElement);
        }
    }

    createGeometricShapes(container) {
        const shapes = ['triangle', 'square', 'circle'];
        const shapeCount = 8;
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            shape.className = `geometric-shape ${shapeType}`;
            shape.style.cssText = `
                left: ${Math.random() * 95}%;
                animation-delay: ${Math.random() * 20}s;
                animation-duration: ${20 + Math.random() * 15}s;
            `;
            container.appendChild(shape);
        }
    }

    createAdvancedBackgroundEffects() {
        console.log('🔄 Creating advanced background effects...');
        try {
            const animations = this.data.featureControl.animations;
            
            if (animations.neuralNetwork !== false) {
                this.createNeuralNetwork();
                console.log('✅ Neural network effect created');
            }
            
            if (animations.matrixRain !== false) {
                this.createMatrixRain();
                console.log('✅ Matrix rain effect created');
            }
            
            if (animations.holographicGrid !== false) {
                this.createHolographicGrid();
                console.log('✅ Holographic grid effect created');
            }
            
            if (animations.dnaHelix !== false) {
                this.createDNAHelix();
                console.log('✅ DNA helix effect created');
            }
            
            console.log('✅ Advanced background effects created');
        } catch (error) {
            console.error('❌ Error creating background effects:', error);
        }
    }

    createNeuralNetwork() {
        try {
            const neuralNetwork = document.createElement('div');
            neuralNetwork.className = 'neural-network';
            document.body.appendChild(neuralNetwork);

            // Create nodes
            const nodeCount = 15;
            const nodes = [];
            
            for (let i = 0; i < nodeCount; i++) {
                const node = document.createElement('div');
                node.className = 'network-node';
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                node.style.cssText = `
                    left: ${x}px;
                    top: ${y}px;
                    animation-delay: ${Math.random() * 20}s;
                `;
                neuralNetwork.appendChild(node);
                nodes.push({ element: node, x, y });
            }

            // Create connections between nearby nodes
            nodes.forEach((nodeA, i) => {
                nodes.slice(i + 1).forEach(nodeB => {
                    const distance = Math.sqrt(
                        Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
                    );
                    
                    if (distance < 200) {
                        const connection = document.createElement('div');
                        connection.className = 'network-connection';
                        const angle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);
                        connection.style.cssText = `
                            left: ${nodeA.x}px;
                            top: ${nodeA.y}px;
                            width: ${distance}px;
                            transform: rotate(${angle}rad);
                            animation-delay: ${Math.random() * 8}s;
                        `;
                        neuralNetwork.appendChild(connection);
                    }
                });
            });
            console.log('✅ Neural network created successfully');
        } catch (error) {
            console.error('❌ Error creating neural network:', error);
        }
    }

    createMatrixRain() {
        try {
            const matrixRain = document.createElement('div');
            matrixRain.className = 'matrix-rain';
            document.body.appendChild(matrixRain);

            const characters = '01Swift{}[]()iOS;:,.@#$%^&*+=<>?|\\~`';
            const columns = Math.floor(window.innerWidth / 20);

            for (let i = 0; i < Math.min(columns, 50); i++) { // Limit columns for performance
                const column = document.createElement('div');
                column.className = 'matrix-column';
                
                let text = '';
                for (let j = 0; j < 20; j++) {
                    text += characters[Math.floor(Math.random() * characters.length)];
                }
                column.textContent = text;
                
                column.style.cssText = `
                    left: ${i * 20}px;
                    animation-duration: ${5 + Math.random() * 10}s;
                    animation-delay: ${Math.random() * 5}s;
                `;
                matrixRain.appendChild(column);
            }
            console.log('✅ Matrix rain created successfully');
        } catch (error) {
            console.error('❌ Error creating matrix rain:', error);
        }
    }

    createHolographicGrid() {
        try {
            const grid = document.createElement('div');
            grid.className = 'holographic-grid';
            document.body.appendChild(grid);
            console.log('✅ Holographic grid created successfully');
        } catch (error) {
            console.error('❌ Error creating holographic grid:', error);
        }
    }

    createDNAHelix() {
        try {
            const dnaHelix = document.createElement('div');
            dnaHelix.className = 'dna-helix';
            
            // Create DNA strands
            for (let i = 0; i < 2; i++) {
                const strand = document.createElement('div');
                strand.className = 'dna-strand';
                dnaHelix.appendChild(strand);
            }

            // Create DNA bases
            for (let i = 0; i < 20; i++) {
                const base = document.createElement('div');
                base.className = 'dna-base';
                base.style.cssText = `
                    top: ${i * 30}px;
                    animation-delay: ${i * 0.1}s;
                `;
                dnaHelix.appendChild(base);
            }

            document.body.appendChild(dnaHelix);
            console.log('✅ DNA helix created successfully');
        } catch (error) {
            console.error('❌ Error creating DNA helix:', error);
        }
    }

    initInteractiveCursor() {
        // Create cursor glow effect
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        // Create cursor trail
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor effects
            cursorGlow.style.opacity = '1';
            cursorTrail.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });

        // Smooth cursor following animation
        const updateCursor = () => {
            const speed = 0.1;
            glowX += (mouseX - glowX) * speed;
            glowY += (mouseY - glowY) * speed;
            
            const trailSpeed = 0.2;
            trailX += (mouseX - trailX) * trailSpeed;
            trailY += (mouseY - trailY) * trailSpeed;

            cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
            cursorTrail.style.transform = `translate(${trailX - 3}px, ${trailY - 3}px)`;
            
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .contact-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorGlow.style.transform += ' scale(1.5)';
                cursorTrail.style.transform += ' scale(2)';
                cursorTrail.style.background = 'rgba(255, 149, 0, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorGlow.style.transform = cursorGlow.style.transform.replace(' scale(1.5)', '');
                cursorTrail.style.transform = cursorTrail.style.transform.replace(' scale(2)', '');
                cursorTrail.style.background = 'rgba(0, 122, 255, 0.6)';
            });
        });
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
        console.log('🔄 Setting up enhanced skill bar animations...');
        
        const skillBars = document.querySelectorAll('.skill-progress[data-width]');
        console.log(`📊 Found ${skillBars.length} skill bars to animate`);
        
        if (skillBars.length === 0) {
            console.warn('⚠️ No skill bars found with data-width attribute');
            return;
        }

        // Enhanced observer options for full card visibility
        const observerOptions = {
            threshold: 0.8, // Increased from 0.2 to 0.8 - requires 80% of element to be visible
            rootMargin: '0px 0px -10px 0px' // Reduced margin for more precise triggering
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { // Extra check for 80% visibility
                    const skillProgress = entry.target;
                    const width = skillProgress.getAttribute('data-width');
                    const skillItem = skillProgress.closest('.skill-item');
                    const skillName = skillItem.querySelector('.skill-name span').textContent;
                    
                    console.log(`🎯 Full card visible - Animating ${skillName} skill bar to ${width}%`);
                    
                    // Calculate staggered delay based on position within category
                    const skillCategory = skillProgress.closest('.skill-category');
                    const categoryIndex = Array.from(skillCategory.parentNode.children).indexOf(skillCategory);
                    const barIndex = Array.from(skillCategory.querySelectorAll('.skill-progress')).indexOf(skillProgress);
                    const delay = (categoryIndex * 300) + (barIndex * 200); // Increased delays for slower, more dramatic effect
                    
                    setTimeout(() => {
                        // Enhanced animation sequence with slower timing
                        this.animateSkillBarSlow(skillProgress, width, skillName);
                    }, delay);
                    
                    observer.unobserve(skillProgress);
                }
            });
        }, observerOptions);

        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            console.log(`🔍 Observing skill bar ${index + 1}: ${width}% (waiting for full visibility)`);
            observer.observe(bar);
        });
        
        console.log('✅ Enhanced skill bar animation observer set up with full card visibility detection');
    }

    animateSkillBar(skillProgress, width, skillName) {
        // Simple and reliable animation
        console.log(`🎯 Animating ${skillName}: ${width}%`);
        
        // Set width directly with animation
        setTimeout(() => {
            skillProgress.style.width = width + '%';
            skillProgress.classList.add('animated');
            console.log(`✅ ${skillName} skill bar set to ${width}%`);
        }, 100);
    }

    animateSkillBarSlow(skillProgress, width, skillName) {
        // Enhanced slow animation with visual feedback
        console.log(`🎯 Starting slow animation for ${skillName}: ${width}%`);
        
        // Add preparation class for additional styling
        skillProgress.classList.add('preparing');
        
        // Stage 1: Preparation (brief pause)
        setTimeout(() => {
            skillProgress.classList.remove('preparing');
            skillProgress.classList.add('animating');
            console.log(`🌊 Beginning slow fill for ${skillName}`);
        }, 150);
        
        // Stage 2: Slow fill animation
        setTimeout(() => {
            skillProgress.style.width = width + '%';
            skillProgress.classList.add('animated');
            console.log(`⏳ ${skillName} skill bar slowly filling to ${width}%`);
        }, 300);
        
        // Stage 3: Completion effect (after animation completes)
        setTimeout(() => {
            skillProgress.classList.add('completed');
            this.addSkillCompletionEffect(skillProgress);
            console.log(`✨ ${skillName} skill bar animation completed`);
        }, 4500); // 4.5 seconds total (300ms delay + 4s animation + 200ms buffer)
    }

    addSkillCompletionEffect(skillProgress) {
        // Add a completion glow effect
        const originalBoxShadow = skillProgress.style.boxShadow;
        skillProgress.style.boxShadow = `
            0 0 20px rgba(0, 122, 255, 0.8),
            0 0 40px rgba(0, 122, 255, 0.4)
        `;
        
        // Remove the effect after a short time
        setTimeout(() => {
            skillProgress.style.boxShadow = originalBoxShadow;
        }, 1000);
    }

    addManualSkillBarTrigger() {
        // Enhanced manual trigger for testing with slow animation
        window.triggerSkillBars = () => {
            console.log('🔧 Enhanced manual skill bar trigger activated (slow mode)');
            const skillBars = document.querySelectorAll('.skill-progress[data-width]');
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                const skillItem = bar.closest('.skill-item');
                const skillName = skillItem.querySelector('.skill-name span').textContent;
                
                setTimeout(() => {
                    this.animateSkillBarSlow(bar, width, skillName);
                    console.log(`✅ Manual slow animation: ${skillName} - ${width}%`);
                }, index * 200); // Increased delay between bars
            });
        };
        
        // Enhanced auto-trigger with better detection (now using slow animation)
        setTimeout(() => {
            const skillBars = document.querySelectorAll('.skill-progress[data-width]');
            const animatedBars = document.querySelectorAll('.skill-progress.animated');
            
            if (skillBars.length > 0 && animatedBars.length === 0) {
                console.log('🚀 Auto-triggering enhanced slow skill bars animation');
                window.triggerSkillBars();
            }
        }, 3000); // Increased from 2000 to 3000ms to allow for scrolling
        
        console.log('🎯 Enhanced manual skill bar trigger added. Use triggerSkillBars() to test slow animations.');
        
        // Add debug function
        window.debugSkillBars = () => {
            const skillBars = document.querySelectorAll('.skill-progress[data-width]');
            console.log(`📊 Found ${skillBars.length} skill bars:`);
            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                const currentWidth = bar.style.width;
                const isAnimated = bar.classList.contains('animated');
                const isCompleted = bar.classList.contains('completed');
                console.log(`  ${index + 1}. Width: ${width}%, Current: ${currentWidth}, Animated: ${isAnimated}, Completed: ${isCompleted}`);
            });
        };
    }

    ensureSkillBarsVisible() {
        // Fallback function to ensure skill bars are visible (now with slow animation)
        setTimeout(() => {
            const skillBars = document.querySelectorAll('.skill-progress[data-width]');
            skillBars.forEach((bar, index) => {
                if (!bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-width');
                    const skillItem = bar.closest('.skill-item');
                    const skillName = skillItem.querySelector('.skill-name span').textContent;
                    
                    setTimeout(() => {
                        this.animateSkillBarSlow(bar, width, skillName);
                        console.log(`🔧 Fallback slow animation: ${skillName} at ${width}%`);
                    }, index * 200);
                }
            });
        }, 5000); // Increased from 3000 to 5000ms to allow more time for intersection observer
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
            this.optimizeForMobile();
        } else {
            document.body.classList.remove('mobile');
            this.restoreDesktopEffects();
        }
    }

    optimizeForMobile() {
        // Reduce particle count and complexity for mobile
        const particles = document.querySelectorAll('.particle.medium, .particle.large');
        particles.forEach(p => p.style.display = 'none');
        
        // Reduce animation complexity
        const codeElements = document.querySelectorAll('.code-element');
        codeElements.forEach(el => {
            el.style.animationDuration = '20s';
        });
    }

    restoreDesktopEffects() {
        // Restore full effects for desktop
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => p.style.display = 'block');
        
        const codeElements = document.querySelectorAll('.code-element');
        codeElements.forEach(el => {
            el.style.animationDuration = '';
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if data is loaded
    if (typeof portfolioData === 'undefined') {
        console.error('❌ Portfolio data not loaded! Check data.js file.');
        return;
    }
    
    console.log('✅ Portfolio data loaded:', portfolioData);
    
    try {
        const portfolioController = new PortfolioController();
        
        // Make controller globally available
        window.portfolioController = portfolioController;
        
        console.log('🚀 Portfolio initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing portfolio:', error);
    }
});

// Utility Functions
function downloadResume() {
    console.log('📄 Download resume requested');
    
    if (!portfolioData || !portfolioData.personal || !portfolioData.personal.resume) {
        showNotification('Resume data not available!', 'error');
        return;
    }
    
    const resume = portfolioData.personal.resume;
    
    if (!resume.isAvailable) {
        showNotification('Resume will be available soon! Please contact me directly.', 'info');
        return;
    }
    
    if (resume.url && resume.url !== '#' && resume.url !== '') {
        // Track resume download
        console.log('📄 Opening resume:', resume.filename);
        
        // Open resume in new tab
        window.open(resume.url, '_blank');
        
        // Show success message
        showNotification(`Opening ${resume.filename}...`, 'success');
        
        // Optional: Track analytics (if you have Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'resume_download', {
                'event_category': 'engagement',
                'event_label': 'resume'
            });
        }
    } else {
        // Fallback - show contact information
        showNotification('Please contact me directly for my resume!', 'info');
        
        // Optional: scroll to contact section
        setTimeout(() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
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
