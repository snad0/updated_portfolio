// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Skills Chart
let allSkills = [];
let currentSkills = 4; // Number of skills to show initially
let isExpanded = false;

async function loadSkills() {
    try {
        const response = await fetch('/api/skills');
        allSkills = await response.json();
        
        const skillsContainer = document.getElementById('skills-chart');
        if (!skillsContainer) {
            console.error('Skills container not found');
            return;
        }

        // Clear existing skills
        skillsContainer.innerHTML = '';
        
        // Show initial skills
        displaySkills(0, currentSkills);

        // Add toggle indicator if there are more skills
        if (allSkills.length > currentSkills) {
            const toggleContainer = document.createElement('div');
            toggleContainer.className = 'col-12 text-center mt-4';
            toggleContainer.innerHTML = `
                <div class="skills-toggle" id="skills-toggle">
                    <span class="toggle-text">Show More</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
            `;
            skillsContainer.appendChild(toggleContainer);

            // Add click event listener
            document.getElementById('skills-toggle').addEventListener('click', () => {
                const toggleBtn = document.getElementById('skills-toggle');
                const toggleText = toggleBtn.querySelector('.toggle-text');
                const toggleIcon = toggleBtn.querySelector('.toggle-icon');

                if (!isExpanded) {
                    // Show all skills
                    displaySkills(currentSkills, allSkills.length);
                    toggleText.textContent = 'Show Less';
                    toggleIcon.classList.remove('fa-chevron-down');
                    toggleIcon.classList.add('fa-chevron-up');
                    isExpanded = true;
                } else {
                    // Remove extra skills
                    const skillsToRemove = document.querySelectorAll('.skill-item');
                    skillsToRemove.forEach((skill, index) => {
                        if (index >= currentSkills) {
                            skill.parentElement.remove(); // Remove the parent div as well
                        }
                    });
                    toggleText.textContent = 'Show More';
                    toggleIcon.classList.remove('fa-chevron-up');
                    toggleIcon.classList.add('fa-chevron-down');
                    isExpanded = false;
                }
            });
        }
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

function displaySkills(start, end) {
    const skillsContainer = document.getElementById('skills-chart');
    const skillsToShow = allSkills.slice(start, end);

    skillsToShow.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'col-md-3 col-6';
        skillDiv.innerHTML = `
            <div class="skill-item">
                <div class="skill-front">
                    <img src="/static/${skill.image}" alt="${skill.name}" class="skill-icon">
                    <h3>${skill.name}</h3>
                </div>
                <div class="skill-back">
                    <h3>${skill.name}</h3>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            </div>
        `;
        // Insert before the toggle if it exists
        const toggleContainer = document.getElementById('skills-toggle')?.parentElement;
        if (toggleContainer) {
            skillsContainer.insertBefore(skillDiv, toggleContainer);
        } else {
            skillsContainer.appendChild(skillDiv);
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize navbar state
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    // Set initial state
    if (window.scrollY < heroBottom - 100) {
        navbar.classList.add('over-hero');
    } else {
        navbar.classList.remove('over-hero');
    }
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '1rem 0';
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '1rem 0';
    }
    
    // Check if navbar is over hero section
    if (window.scrollY < heroBottom - 100) {
        navbar.classList.add('over-hero');
    } else {
        navbar.classList.remove('over-hero');
    }
});

// Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('[name="name"]').value;
        const email = this.querySelector('[name="email"]').value;
        const message = this.querySelector('[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // If validation passes, submit the form
        this.submit();
    });
}

// Load Certificates
async function loadCertificates() {
    try {
        const response = await fetch('/api/certificates');
        const certificates = await response.json();
        
        const certificatesContainer = document.getElementById('certificates-container');
        if (!certificatesContainer) {
            console.error('Certificates container not found');
            return;
        }

        certificatesContainer.innerHTML = '';
        
        certificates.forEach(cert => {
            const certDiv = document.createElement('div');
            certDiv.className = 'col-md-6 col-lg-3 mb-4';
            certDiv.innerHTML = `
                <div class="certificate-card">
                    <div class="card-body">
                        <img src="/static/${cert.image}" alt="${cert.issuer}" class="certificate-logo mb-3">
                        <h5 class="card-title">${cert.title}</h5>
                        <p class="card-text">
                            <strong>${cert.issuer}</strong><br>
                            Issued ${cert.date}
                            ${cert.credential_id ? `<br>Credential ID: ${cert.credential_id}` : ''}
                        </p>
                        ${cert.skills.length > 0 ? `
                            <div class="certificate-skills">
                                <small class="text-muted">Skills: ${cert.skills.join(' · ')}</small>
                            </div>
                        ` : ''}
                        ${cert.link ? `
                            <a href="${cert.link}" class="btn btn-outline-primary mt-3" target="_blank">
                                <i class="fas fa-external-link-alt me-2"></i>View Certificate
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
            certificatesContainer.appendChild(certDiv);
        });
    } catch (error) {
        console.error('Error loading certificates:', error);
    }
}

// Hero Background Slideshow
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    // Set first slide as active
    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadCertificates();
}); 