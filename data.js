// Portfolio Data Configuration
// Update this file with your personal information, projects, and content

console.log('🔄 Loading portfolio data...');

const portfolioData = {
    // Personal Information
    personal: {
        name: "Junaed Muhammad Chowdhury",
        title: "iOS Developer (SwiftUI Specialist)",
        location: "Kuala Lumpur, Malaysia",
        email: "junaed.dev@gmail.com",
        phone: "+8801723605770",
        experience: "5+ years total (1.5+ years iOS)",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        
        // Social Links
        social: {
            github: "https://github.com/Junaed29",
            linkedin: "https://linkedin.com/in/junaed29",
            twitter: "#", // Add your Twitter URL here
            email: "mailto:junaed.dev@gmail.com"
        },
        
        // Resume/CV
        resume: {
            url: "https://drive.google.com/file/d/your-resume-file-id/view", // Replace with your actual resume URL
            filename: "Junaed_Muhammad_Chowdhury_Resume.pdf",
            isAvailable: true // Set to false if resume is not ready
        }
    },
    
    // Bio and Taglines
    bio: {
        taglines: [
            "Building scalable, user-centric iOS applications",
            "SwiftUI specialist with modern Apple standards",
            "5+ years mobile dev, 1.5+ years iOS expertise",
            "Creating App Store success stories"
        ],
        summary: "iOS Developer with SwiftUI expertise, passionate about building scalable, user-centric applications that align with modern Apple standards. With 5+ years of total mobile development experience and 1.5+ years specialized in iOS development, I have proven ability to modernize architectures, optimize performance, and deliver clean, maintainable code.",
        aboutText: [
            "iOS Developer with SwiftUI expertise, passionate about building scalable, user-centric applications that align with modern Apple standards. With 5+ years of total mobile development experience and 1.5+ years specialized in iOS development, I have proven ability to modernize architectures, optimize performance, and deliver clean, maintainable code.",
            "My journey began with Android development using Java and Kotlin, where I spent 3.5+ years building robust applications with modern architecture patterns. I successfully transitioned to iOS development in 2024, mastering Swift, SwiftUI, and the Apple ecosystem, which gives me unique cross-platform insights.",
            "I have contributed to App Store-published apps like Hooray Health and WellCall360, and created the SwiftUI Professional Network showcasing MVVM architecture, animations, and performance optimizations. Currently pursuing M.Sc. in Software Engineering at UTM Malaysia to further enhance my expertise."
        ]
    },
    
    // Statistics
    stats: {
        downloads: 15,
        downloadsLabel: "K+ Downloads",
        projects: 6,
        projectsLabel: "Projects",
        experience: 5,
        experienceLabel: "Years Total Experience",
        rating: 1.5,
        ratingLabel: "Years iOS Experience"
    },
    
    // Technical Skills
    skills: {
        ios: {
            title: "iOS Development",
            icon: "fab fa-apple",
            skills: [
                { name: "Swift", level: 95 },
                { name: "SwiftUI", level: 92 },
                { name: "SwiftData", level: 85 },
                { name: "UIKit", level: 80 }
            ]
        },
        android: {
            title: "Android Development",
            icon: "fab fa-android",
            skills: [
                { name: "Kotlin", level: 88 },
                { name: "Java", level: 90 },
                { name: "Android SDK", level: 85 },
                { name: "Room Database", level: 87 }
            ]
        },
        backend: {
            title: "Backend & APIs",
            icon: "fas fa-code",
            skills: [
                { name: "REST APIs", level: 90 },
                { name: "JSON", level: 88 },
                { name: "Firebase", level: 85 },
                { name: "Git & GitHub", level: 92 }
            ]
        },
        tools: {
            title: "Tools & Architecture",
            icon: "fas fa-tools",
            skills: [
                { name: "Xcode", level: 92 },
                { name: "MVVM Architecture", level: 90 },
                { name: "Core Data", level: 82 },
                { name: "Combine", level: 78 }
            ]
        }
    },
    
    // Projects Portfolio
    projects: [
        {
            title: "SwiftUI Professional Network",
            description: "Modern SwiftUI prototype reimagining professional networking with Tinder-style discovery. Features 15+ reusable components, gesture-based swiping, real-time search, dynamic theming, and 60fps animations with modular MVVM architecture.",
            technologies: ["SwiftUI", "Combine", "MVVM", "Lottie"],
            github: "https://github.com/Junaed29/SwiftUI-Professional-Network",
            demo: "https://youtube.com/shorts/BaY5gXrCIrs?feature=share",
            type: "iOS",
            icon: "fas fa-users",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&crop=center", // Professional networking themed image
            featured: true
        },
        {
            title: "Hooray Health (iOS)",
            description: "Healthcare management app with UIKit to SwiftUI migration. Contributed to reducing code complexity by ~30% and improving app load times by ~20%. Available on App Store with enhanced UX and performance.",
            technologies: ["Swift", "SwiftUI", "SwiftData", "Firebase"],
            github: "#",
            demo: "https://apps.apple.com/us/app/hooray-health/id1285135333",
            type: "iOS",
            icon: "fas fa-heart",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center", // Healthcare themed image
            featured: true
        },
        {
            title: "WellCall360 (iOS)",
            description: "Communication and wellness app for iOS. Implemented updates and enhancements to improve user experience and performance. Features modern SwiftUI components and seamless API integration.",
            technologies: ["Swift", "SwiftUI", "REST APIs", "JSON"],
            github: "#",
            demo: "https://apps.apple.com/us/app/wellcall360/id1485296723",
            type: "iOS",
            icon: "fas fa-phone",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop&crop=center", // Communication/wellness themed image
            featured: false
        },
        {
            title: "Hooray Health (Android)",
            description: "Android version of healthcare management app. Shipped with 10K+ downloads and maintained 90% crash-free sessions. Built with modern Android architecture and Material Design principles.",
            technologies: ["Java", "Kotlin", "Room Database", "Firebase"],
            github: "#",
            demo: "https://play.google.com/store/search?q=hooray+health+app&c=apps&hl=en",
            type: "Android",
            icon: "fas fa-heart",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&crop=center", // Android/healthcare themed
            featured: false
        },
        {
            title: "Purity – The Muhammadi Islam",
            description: "Islamic educational app for Android with 5K+ downloads and 5★ rating (487 reviews). Features comprehensive content management, offline reading, and intuitive user interface design.",
            technologies: ["Java", "Android SDK", "Room Database", "XML"],
            github: "#",
            demo: "https://play.google.com/store/apps/details?id=com.sul.purity",
            type: "Android",
            icon: "fas fa-book",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop&crop=center", // Book/education themed
            featured: false
        },
        {
            title: "Attendance Management System",
            description: "University project featuring Teacher, Student, and Admin panels for comprehensive attendance tracking. Won 2nd Runner-Up at Inter-University Project Fair (2019) with innovative approach to educational management.",
            technologies: ["Java", "Android SDK", "Room Database", "XML"],
            github: "#",
            demo: "#",
            type: "Android",
            icon: "fas fa-graduation-cap",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&crop=center", // Education/university themed
            featured: false
        }
    ],
    
    // Professional Experience
    experience: [
        {
            period: "Apr 2024 - Present",
            title: "iOS Developer",
            company: "Beyond Innovations & Technologies Limited (Remote)",
            description: "Migrated UIKit components to SwiftUI, reducing code complexity by ~30%. Optimized performance, improving app load times by ~20%. Integrated REST APIs and Firebase services for scalable features. Collaborated with designers, QA, and backend engineers to deliver polished iOS solutions for Hooray Health and WellCall360 apps.",
            technologies: ["Swift", "SwiftUI", "SwiftData", "Firebase"]
        },
        {
            period: "Jan 2021 - Apr 2024",
            title: "Android Developer",
            company: "Beyond Innovations & Technologies Limited (Remote)",
            description: "Designed and developed Android apps from concept to deployment. Implemented Room Database, REST APIs, and third-party libraries. Shipped 4 production Android apps with 15K+ combined downloads including Hooray Health (10K+ downloads) and Purity app (5K+ downloads, 5★ rating).",
            technologies: ["Java", "Kotlin", "Android SDK", "Room Database"]
        },
        {
            period: "2019 - 2021",
            title: "Computer Science Student",
            company: "Bangladesh Army University of Engineering and Technology",
            description: "Completed Bachelor of Science in Computer Science and Engineering. Won 2nd Runner-Up at Inter-University Project Fair (2019) for Attendance Management System. Certified in Mobile Games & App Development (2018) and National Programming Contest participation.",
            technologies: ["Java", "Android", "Mobile Development"]
        },
        {
            period: "Mar 2025 - Dec 2026",
            title: "M.Sc. Software Engineering (Upcoming)",
            company: "Universiti Teknologi Malaysia (UTM), Kuala Lumpur",
            description: "Pursuing Master of Science in Software Engineering with focus on advanced mobile development practices. IELTS Score 6.5 achieved for admission. Expected to further enhance expertise in iOS development and software engineering principles.",
            technologies: ["Software Engineering", "Mobile Development", "Research"]
        }
    ],
    
    // Client Testimonials
    testimonials: [
        {
            text: "Junaed's expertise in SwiftUI and iOS development is exceptional. His migration of our UIKit components to SwiftUI reduced code complexity significantly while improving performance. The apps he worked on maintain excellent ratings on the App Store.",
            author: "Development Team Lead",
            position: "Beyond Innovations & Technologies",
            avatar: "DT"
        },
        {
            text: "His transition from Android to iOS development showcases his adaptability and learning capabilities. Junaed brings valuable cross-platform insights and has contributed to multiple successful app launches with thousands of downloads.",
            author: "Project Manager",
            position: "Mobile Development Team",
            avatar: "PM"
        },
        {
            text: "Junaed's attention to clean, maintainable code and modern architecture patterns is impressive. His work on our healthcare apps has been instrumental in delivering scalable solutions that meet Apple's standards.",
            author: "Senior Developer",
            position: "iOS Development Team",
            avatar: "SD"
        }
    ],
    
    // Navigation Menu
    navigation: [
        { id: "home", label: "Home", href: "#home" },
        { id: "about", label: "About", href: "#about" },
        { id: "skills", label: "Skills", href: "#skills" },
        { id: "projects", label: "Projects", href: "#projects" },
        { id: "experience", label: "Experience", href: "#experience" },
        { id: "testimonials", label: "Reviews", href: "#testimonials" },
        { id: "contact", label: "Contact", href: "#contact" }
    ],
    
    // Section Titles and Subtitles
    sections: {
        about: {
            title: "About Me",
            subtitle: "iOS Developer with SwiftUI expertise, passionate about building scalable, user-centric applications"
        },
        skills: {
            title: "Technical Skills",
            subtitle: "Comprehensive expertise across mobile development technologies"
        },
        projects: {
            title: "Featured Projects",
            subtitle: "A showcase of my best mobile applications across different platforms"
        },
        experience: {
            title: "Professional Experience",
            subtitle: "My journey through the mobile development industry"
        },
        testimonials: {
            title: "Client Testimonials",
            subtitle: "What colleagues and clients say about my work"
        },
        contact: {
            title: "Get In Touch",
            subtitle: "Ready to work together? Let's create something amazing"
        }
    },
    
    // Contact Information
    contact: {
        availability: "Open for new opportunities",
        items: [
            {
                icon: "fas fa-envelope",
                title: "Email",
                value: "junaed.dev@gmail.com",
                link: "mailto:junaed.dev@gmail.com"
            },
            {
                icon: "fas fa-phone",
                title: "Phone",
                value: "+8801723605770",
                link: "tel:+8801723605770"
            },
            {
                icon: "fas fa-map-marker-alt",
                title: "Location",
                value: "Kuala Lumpur, Malaysia",
                link: "#"
            },
            {
                icon: "fas fa-briefcase",
                title: "Availability",
                value: "Open for new opportunities",
                link: "#"
            }
        ]
    },
    
    // SEO and Meta Information
    meta: {
        title: "Junaed Muhammad Chowdhury - iOS Developer (SwiftUI Specialist)",
        description: "iOS Developer with SwiftUI expertise. 5+ years mobile development experience. Specialized in iOS development with modern Apple standards.",
        ogTitle: "Junaed Muhammad Chowdhury - iOS Developer (SwiftUI Specialist)",
        ogDescription: "Professional iOS developer portfolio showcasing SwiftUI expertise and mobile development skills",
        author: "Junaed Muhammad Chowdhury",
        keywords: "iOS Developer, SwiftUI, Mobile App Development, Swift, iOS Apps, Mobile Developer"
    }
};

console.log('✅ Portfolio data loaded successfully!');

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
