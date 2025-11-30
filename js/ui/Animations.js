/**
 * Animations - UI animation helpers
 */
const Animations = {
    /**
     * Fade in an element
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in ms
     * @returns {Promise} Resolves when animation completes
     */
    fadeIn(element, duration = Constants.UI.ANIMATION_DURATION) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.display = '';
            
            requestAnimationFrame(() => {
                element.style.transition = `opacity ${duration}ms ease`;
                element.style.opacity = '1';
                
                setTimeout(resolve, duration);
            });
        });
    },

    /**
     * Fade out an element
     * @param {HTMLElement} element - Element to animate
     * @param {number} duration - Animation duration in ms
     * @returns {Promise} Resolves when animation completes
     */
    fadeOut(element, duration = Constants.UI.ANIMATION_DURATION) {
        return new Promise(resolve => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    },

    /**
     * Slide and fade in from direction
     * @param {HTMLElement} element - Element to animate
     * @param {string} direction - 'up', 'down', 'left', 'right'
     * @param {number} duration - Animation duration in ms
     * @returns {Promise} Resolves when animation completes
     */
    slideIn(element, direction = 'up', duration = Constants.UI.ANIMATION_DURATION) {
        return new Promise(resolve => {
            const transforms = {
                up: 'translateY(20px)',
                down: 'translateY(-20px)',
                left: 'translateX(20px)',
                right: 'translateX(-20px)'
            };
            
            element.style.opacity = '0';
            element.style.transform = transforms[direction];
            element.style.display = '';
            
            requestAnimationFrame(() => {
                element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
                
                setTimeout(() => {
                    element.style.transform = '';
                    resolve();
                }, duration);
            });
        });
    },

    /**
     * Animate a number counting up
     * @param {HTMLElement} element - Element to update
     * @param {number} endValue - Target value
     * @param {number} duration - Animation duration in ms
     * @param {string} prefix - Prefix string (e.g., '$')
     * @param {string} suffix - Suffix string
     */
    countUp(element, endValue, duration = Constants.UI.COUNTER_DURATION, prefix = '', suffix = '') {
        const startValue = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
            
            element.textContent = prefix + Helpers.formatNumber(currentValue) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    },

    /**
     * Pulse animation
     * @param {HTMLElement} element - Element to animate
     */
    pulse(element) {
        element.classList.add('animate-pulse');
        setTimeout(() => {
            element.classList.remove('animate-pulse');
        }, 500);
    },

    /**
     * Shake animation for errors
     * @param {HTMLElement} element - Element to animate
     */
    shake(element) {
        element.classList.add('animate-shake');
        setTimeout(() => {
            element.classList.remove('animate-shake');
        }, 500);
    },

    /**
     * Stagger animate a list of elements
     * @param {NodeList|Array} elements - Elements to animate
     * @param {number} delay - Delay between each element in ms
     */
    staggerIn(elements, delay = 50) {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * delay);
        });
    },

    /**
     * Transition between screens
     * @param {HTMLElement} fromScreen - Screen to hide
     * @param {HTMLElement} toScreen - Screen to show
     * @returns {Promise} Resolves when transition completes
     */
    async transitionScreens(fromScreen, toScreen) {
        // Fade out current screen
        fromScreen.classList.add('transitioning-out');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        fromScreen.classList.remove('active', 'transitioning-out');
        
        // Fade in new screen
        toScreen.classList.add('active', 'transitioning-in');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        toScreen.classList.remove('transitioning-in');
    },

    /**
     * Highlight an element temporarily
     * @param {HTMLElement} element - Element to highlight
     * @param {string} color - Highlight color
     */
    highlight(element, color = 'rgba(56, 161, 105, 0.2)') {
        const originalBg = element.style.backgroundColor;
        element.style.transition = 'background-color 0.3s ease';
        element.style.backgroundColor = color;
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 1000);
    },

    /**
     * Add bounce animation to element
     * @param {HTMLElement} element - Element to animate
     */
    bounce(element) {
        element.classList.add('animate-bounce');
        setTimeout(() => {
            element.classList.remove('animate-bounce');
        }, 1000);
    }
};

// Make available globally
window.Animations = Animations;
