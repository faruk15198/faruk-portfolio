

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. SKILLS PROGRESS BARS (Dynamic Enhancement) ==========
    // Transform basic skill list into visual progress indicators
    const skillsList = document.querySelector('.skills-list ul');
    if (skillsList && !skillsList.classList.contains('enhanced')) {
        const skillItems = skillsList.querySelectorAll('li');
        const skillLevels = {
            'HTML': 92,
            'CSS': 88,
            'jQuery': 78,
            'SCSS': 75,
            'Javascript': 85,
            'React': 80,
            'PHP': 70,
            'XML': 65,
            'C': 72,
            'Object Oriented C++': 68,
            'Programming Java': 65
        };
        
        // Clear existing list and create enhanced version
        const parentContainer = skillsList.parentElement;
        const enhancedWrapper = document.createElement('div');
        enhancedWrapper.className = 'enhanced-skills-wrapper';
        
        skillItems.forEach(item => {
            const skillName = item.textContent.trim();
            const level = skillLevels[skillName] || 70;
            
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar-item';
            skillBar.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${skillName}</span>
                    <span class="skill-percent">${level}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" data-level="${level}" style="width: 0%">
                        <span class="progress-glow"></span>
                    </div>
                </div>
            `;
            enhancedWrapper.appendChild(skillBar);
        });
        
        // Replace original list with enhanced version
        skillsList.style.display = 'none';
        parentContainer.insertBefore(enhancedWrapper, skillsList.nextSibling);
        enhancedWrapper.classList.add('enhanced');
        
        // Animate progress bars when they come into view
        const animateProgressBars = () => {
            const progressBars = document.querySelectorAll('.progress-bar-fill');
            progressBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                const rect = bar.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
                
                if (isVisible && bar.style.width !== level + '%') {
                    bar.style.width = level + '%';
                }
            });
        };
        
        // Initial animation after small delay
        setTimeout(animateProgressBars, 300);
        window.addEventListener('scroll', animateProgressBars);
        
        // Add CSS for progress bars dynamically
        addSkillsProgressStyles();
    }
    
    function addSkillsProgressStyles() {
        if (document.querySelector('#skills-progress-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'skills-progress-styles';
        styles.textContent = `
            .enhanced-skills-wrapper {
                margin-top: 8px;
            }
            .skill-bar-item {
                margin-bottom: 18px;
            }
            .skill-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
                font-size: 0.85rem;
                font-weight: 600;
                color: #2c3e50;
            }
            .skill-name {
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .skill-percent {
                color: #ff6b35;
                font-weight: 700;
            }
            .progress-bar-bg {
                background: #e9ecef;
                border-radius: 20px;
                height: 8px;
                overflow: hidden;
                position: relative;
            }
            .progress-bar-fill {
                background: linear-gradient(90deg, #ff6b35, #ff9a5a);
                border-radius: 20px;
                height: 100%;
                width: 0%;
                transition: width 1.2s cubic-bezier(0.22, 0.97, 0.36, 1);
                position: relative;
                overflow: hidden;
            }
            .progress-glow {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 2s infinite;
            }
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // ========== 2. AGE COUNTER WITH DYNAMIC UPDATE ==========
    const ageValueElement = document.querySelector('.info-value');
    const ageItems = document.querySelectorAll('.info-item');
    let ageSpan = null;
    
    // Find and update age dynamically
    ageItems.forEach(item => {
        const label = item.querySelector('.info-label');
        if (label && label.textContent.trim() === 'AGE') {
            ageSpan = item.querySelector('.info-value');
            if (ageSpan) {
                const birthYear = 2002; // Assuming based on age 24 in screenshot (2026-24=2002)
                const currentYear = new Date().getFullYear();
                const birthMonth = 3; // March (approximate)
                let calculatedAge = currentYear - birthYear;
                const currentMonth = new Date().getMonth();
                if (currentMonth < birthMonth) calculatedAge--;
                ageSpan.textContent = calculatedAge;
                
                // Add a subtle pulse animation when age updates
                ageSpan.style.transition = 'all 0.3s ease';
                ageSpan.style.display = 'inline-block';
                setTimeout(() => {
                    ageSpan.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        ageSpan.style.transform = 'scale(1)';
                    }, 200);
                }, 500);
            }
        }
    });
    
    // ========== 3. READ MORE / READ LESS FUNCTIONALITY ==========
    const aboutBioParagraphs = document.querySelectorAll('.about-bio p');
    if (aboutBioParagraphs.length >= 2) {
        const secondParagraph = aboutBioParagraphs[1];
        const originalContent = secondParagraph.innerHTML;
        
        // Check if content is long enough to need truncation
        if (originalContent.length > 180) {
            const truncatedContent = originalContent.substring(0, 180) + '... ';
            const readMoreBtn = document.createElement('span');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.style.cssText = `
                color: #ff6b35;
                cursor: pointer;
                font-weight: 600;
                display: inline-block;
                margin-left: 5px;
                transition: color 0.2s;
            `;
            
            let expanded = false;
            secondParagraph.innerHTML = truncatedContent;
            secondParagraph.appendChild(readMoreBtn);
            
            readMoreBtn.addEventListener('click', function() {
                if (!expanded) {
                    secondParagraph.innerHTML = originalContent + ' ';
                    const collapseBtn = document.createElement('span');
                    collapseBtn.className = 'read-more-btn';
                    collapseBtn.textContent = 'Read Less';
                    collapseBtn.style.cssText = readMoreBtn.style.cssText;
                    secondParagraph.appendChild(collapseBtn);
                    expanded = true;
                    
                    collapseBtn.addEventListener('click', function() {
                        secondParagraph.innerHTML = truncatedContent;
                        secondParagraph.appendChild(readMoreBtn);
                        expanded = false;
                    });
                }
            });
        }
    }
    
    // ========== 4. INFO CARDS INTERACTIVE HOVER TOOLTIP ==========
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        const label = item.querySelector('.info-label');
        const value = item.querySelector('.info-value');
        
        if (label && value) {
            // Add copy functionality for email and phone
            const labelText = label.textContent.trim();
            if (labelText === 'E-MAIL' || labelText === 'PHONE') {
                value.style.cursor = 'pointer';
                value.style.transition = 'color 0.2s';
                value.title = `Click to copy ${labelText.toLowerCase()}`;
                
                value.addEventListener('click', async function(e) {
                    e.stopPropagation();
                    const textToCopy = this.textContent.trim();
                    try {
                        await navigator.clipboard.writeText(textToCopy);
                        showCopyNotification(`Copied: ${textToCopy}`);
                        
                        // Visual feedback
                        this.style.color = '#ff6b35';
                        setTimeout(() => {
                            this.style.color = '';
                        }, 500);
                    } catch (err) {
                        console.error('Copy failed:', err);
                    }
                });
            }
            
            // Add hover effect for all info items
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#fff9f5';
                this.style.borderRadius = '8px';
                this.style.paddingLeft = '8px';
                this.style.transition = 'all 0.2s';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.paddingLeft = '';
            });
        }
    });
    
    // Copy notification helper
    function showCopyNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'copy-toast';
        notification.innerHTML = `
            <i class="fas fa-copy"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: #2c3e50;
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 0.85rem;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        if (!document.querySelector('#copy-toast-styles')) {
            const toastStyles = document.createElement('style');
            toastStyles.id = 'copy-toast-styles';
            toastStyles.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(toastStyles);
        }
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    // ========== 5. PERMANENT/PRESENT ADDRESS TOGGLE MAP PREVIEW ==========
    const addressItems = document.querySelectorAll('.info-item');
    addressItems.forEach(item => {
        const label = item.querySelector('.info-label');
        if (label && (label.textContent.includes('ADDRESS') || label.textContent === 'PERMANENT ADDRESS' || label.textContent === 'PRESENT ADDRESS')) {
            const addressValue = item.querySelector('.info-value');
            if (addressValue) {
                addressValue.style.cursor = 'pointer';
                addressValue.style.textDecoration = 'underline dotted';
                addressValue.style.textUnderlineOffset = '3px';
                
                addressValue.addEventListener('click', function() {
                    const address = this.textContent;
                    showAddressModal(address);
                });
            }
        }
    });
    
    function showAddressModal(address) {
        // Remove existing modal
        const existingModal = document.querySelector('.address-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.className = 'address-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3><i class="fas fa-map-pin"></i> Location</h3>
                <p>${address}</p>
                <div class="modal-map-placeholder">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>📍 Map preview: ${address}</span>
                </div>
                <small>Click outside to close</small>
            </div>
        `;
        
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .address-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.2s ease;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
            }
            .modal-content {
                position: relative;
                background: white;
                padding: 30px;
                border-radius: 20px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                z-index: 10001;
                animation: slideUp 0.3s ease;
            }
            .modal-close {
                position: absolute;
                top: 12px;
                right: 16px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
            }
            .modal-content h3 {
                color: #ff6b35;
                margin-bottom: 15px;
            }
            .modal-map-placeholder {
                background: #f0f2f5;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
            }
            .modal-map-placeholder i {
                font-size: 32px;
                color: #ff6b35;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
        
        document.body.appendChild(modal);
        
        const closeModal = () => modal.remove();
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    }
    
    // ========== 6. FREELANCE STATUS BADGE WITH COUNTDOWN ==========
    const freelanceItem = Array.from(infoItems).find(item => {
        const label = item.querySelector('.info-label');
        return label && label.textContent.trim() === 'FREELANCE';
    });
    
    if (freelanceItem) {
        const freelanceValue = freelanceItem.querySelector('.info-value');
        if (freelanceValue) {
            const originalText = freelanceValue.textContent;
            // Add a status badge
            const badge = document.createElement('span');
            badge.className = 'status-badge';
            badge.textContent = '● Active';
            badge.style.cssText = `
                background: #10b98120;
                color: #10b981;
                font-size: 0.7rem;
                padding: 2px 8px;
                border-radius: 20px;
                margin-left: 8px;
                font-weight: 600;
            `;
            freelanceValue.appendChild(badge);
        }
    }
    
    // ========== 7. ANIMATE ABOUT SECTION ON SCROLL ==========
    const aboutSection = document.querySelector('#about');
    const aboutBio = document.querySelector('.about-bio');
    const skillsInfo = document.querySelector('.skills-info');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger progress bar animation again
                const progressBars = document.querySelectorAll('.progress-bar-fill');
                progressBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    if (bar.style.width !== level + '%') {
                        setTimeout(() => {
                            bar.style.width = level + '%';
                        }, 200);
                    }
                });
            }
        });
    }, observerOptions);
    
    if (aboutBio) {
        aboutBio.style.opacity = '0';
        aboutBio.style.transform = 'translateY(30px)';
        aboutBio.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        aboutObserver.observe(aboutBio);
    }
    
    if (skillsInfo) {
        skillsInfo.style.opacity = '0';
        skillsInfo.style.transform = 'translateY(30px)';
        skillsInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease 0.1s';
        aboutObserver.observe(skillsInfo);
    }
    
    // ========== 8. TOOLTIP FOR SKILLS (Show proficiency level) ==========
    const skillBarItems = document.querySelectorAll('.skill-bar-item');
    skillBarItems.forEach(item => {
        const skillName = item.querySelector('.skill-name')?.textContent;
        const percent = item.querySelector('.skill-percent')?.textContent;
        
        if (skillName && percent) {
            item.setAttribute('data-tooltip', `${skillName} proficiency: ${percent}`);
            item.style.cursor = 'help';
            
            // Add custom tooltip
            item.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: fixed;
                    background: #1a2c38;
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    pointer-events: none;
                    z-index: 10000;
                    white-space: nowrap;
                    transform: translate(-50%, -120%);
                    transition: opacity 0.2s;
                `;
                document.body.appendChild(tooltip);
                
                const updatePosition = (event) => {
                    tooltip.style.left = event.clientX + 'px';
                    tooltip.style.top = event.clientY + 'px';
                };
                updatePosition(e);
                
                const moveHandler = (moveEvent) => updatePosition(moveEvent);
                document.addEventListener('mousemove', moveHandler);
                
                item.addEventListener('mouseleave', function() {
                    tooltip.remove();
                    document.removeEventListener('mousemove', moveHandler);
                }, { once: true });
            });
        }
    });
    
    // ========== 9. BLOG LINK CLICK TRACKING ==========
    const blogItem = Array.from(infoItems).find(item => {
        const label = item.querySelector('.info-label');
        return label && label.textContent.trim() === 'BLOG';
    });
    
    if (blogItem) {
        const blogLink = blogItem.querySelector('.info-value');
        if (blogLink && blogLink.textContent.includes('blog')) {
            blogLink.style.cursor = 'pointer';
            blogLink.addEventListener('click', function(e) {
                showNotification('🔗 Opening blog portfolio...', 'info');
                // Simulate opening (demo purpose)
                console.log('Blog link clicked:', this.textContent);
            });
        }
    }
    
    // Helper notification for info messages
    function showNotification(msg, type) {
        const notif = document.createElement('div');
        notif.className = 'info-notif';
        notif.textContent = msg;
        notif.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #2c3e50;
            color: white;
            padding: 8px 20px;
            border-radius: 40px;
            font-size: 0.85rem;
            z-index: 9999;
            animation: fadeUp 0.3s ease;
        `;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 2000);
    }
    
    // ========== 10. ADD CSS FOR FADE UP ANIMATION ==========
    const fadeUpStyles = document.createElement('style');
    fadeUpStyles.textContent = `
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px) translateX(-50%); }
            to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .info-notif {
            animation: fadeUp 0.3s ease;
        }
    `;
    document.head.appendChild(fadeUpStyles);
    
    console.log('Bye Bye! The website is run');
});