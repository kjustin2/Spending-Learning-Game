/**
 * Helper utility functions
 */
const Helpers = {
    /**
     * Format a number as currency
     * @param {number} amount - The amount to format
     * @param {boolean} showCents - Whether to show cents
     * @returns {string} Formatted currency string
     */
    formatCurrency(amount, showCents = false) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: showCents ? 2 : 0,
            maximumFractionDigits: showCents ? 2 : 0
        });
        return formatter.format(amount);
    },

    /**
     * Format a number with commas
     * @param {number} num - The number to format
     * @returns {string} Formatted number string
     */
    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(Math.round(num));
    },

    /**
     * Generate a unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Debounce a function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Clamp a number between min and max
     * @param {number} num - Number to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped number
     */
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Check if an object is empty
     * @param {Object} obj - Object to check
     * @returns {boolean} True if empty
     */
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },

    /**
     * Get frequency multiplier for annual calculation
     * @param {string} frequency - Frequency type
     * @returns {number} Multiplier to convert to annual
     */
    getFrequencyMultiplier(frequency) {
        const multipliers = {
            'daily': 365,
            'weekly': 52,
            'monthly': 12,
            'yearly': 1,
            'once': 1,
            'every5years': 0.2
        };
        return multipliers[frequency] || 1;
    },

    /**
     * Get display text for frequency
     * @param {string} frequency - Frequency type
     * @returns {string} Display text
     */
    getFrequencyText(frequency) {
        const texts = {
            'daily': '/day',
            'weekly': '/week',
            'monthly': '/month',
            'yearly': '/year',
            'once': ' (one-time)',
            'every5years': ' (every 5 years)'
        };
        return texts[frequency] || '';
    },

    /**
     * Calculate percentage difference
     * @param {number} value1 - First value
     * @param {number} value2 - Second value
     * @returns {number} Percentage difference
     */
    percentDifference(value1, value2) {
        if (value2 === 0) return 0;
        return ((value1 - value2) / value2) * 100;
    },

    /**
     * Animate a number counting up
     * @param {HTMLElement} element - Element to animate
     * @param {number} start - Starting number
     * @param {number} end - Ending number
     * @param {number} duration - Animation duration in ms
     * @param {Function} formatter - Number formatting function
     */
    animateNumber(element, start, end, duration = 1000, formatter = (n) => n.toString()) {
        const startTime = performance.now();
        const difference = end - start;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (difference * easeOut);
            
            element.textContent = formatter(Math.round(current));
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    },

    /**
     * Create an element with attributes
     * @param {string} tag - HTML tag
     * @param {Object} attributes - Element attributes
     * @param {string} content - Inner content
     * @returns {HTMLElement} Created element
     */
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (content) {
            element.innerHTML = content;
        }
        
        return element;
    },

    /**
     * Get ordinal suffix for a number
     * @param {number} n - Number
     * @returns {string} Number with ordinal suffix
     */
    getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },

    /**
     * Pluralize a word based on count
     * @param {number} count - Count
     * @param {string} singular - Singular form
     * @param {string} plural - Plural form
     * @returns {string} Appropriate form
     */
    pluralize(count, singular, plural) {
        return count === 1 ? singular : plural;
    }
};

// Make available globally
window.Helpers = Helpers;
