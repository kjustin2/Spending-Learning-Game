/**
 * Scenario Manager - Handles scenario loading and state
 */
class ScenarioManager {
    constructor() {
        this.scenarios = [...ScenariosData];
        this.currentIndex = 0;
    }

    /**
     * Get all scenarios
     * @returns {Array} All scenarios
     */
    getAllScenarios() {
        return this.scenarios;
    }

    /**
     * Get total number of scenarios
     * @returns {number} Total count
     */
    getTotalCount() {
        return this.scenarios.length;
    }

    /**
     * Get current scenario
     * @returns {Object|null} Current scenario or null if finished
     */
    getCurrentScenario() {
        if (this.currentIndex >= this.scenarios.length) {
            return null;
        }
        return this.scenarios[this.currentIndex];
    }

    /**
     * Get scenario by index
     * @param {number} index - Scenario index
     * @returns {Object|null} Scenario or null
     */
    getScenarioByIndex(index) {
        if (index < 0 || index >= this.scenarios.length) {
            return null;
        }
        return this.scenarios[index];
    }

    /**
     * Get scenario by ID
     * @param {string} id - Scenario ID
     * @returns {Object|null} Scenario or null
     */
    getScenarioById(id) {
        return this.scenarios.find(s => s.id === id) || null;
    }

    /**
     * Get current index
     * @returns {number} Current scenario index
     */
    getCurrentIndex() {
        return this.currentIndex;
    }

    /**
     * Set current index (for loading saved games)
     * @param {number} index - Index to set
     */
    setCurrentIndex(index) {
        this.currentIndex = Helpers.clamp(index, 0, this.scenarios.length);
    }

    /**
     * Move to next scenario
     * @returns {Object|null} Next scenario or null if finished
     */
    nextScenario() {
        this.currentIndex++;
        return this.getCurrentScenario();
    }

    /**
     * Check if there are more scenarios
     * @returns {boolean} True if more scenarios exist
     */
    hasNextScenario() {
        return this.currentIndex < this.scenarios.length - 1;
    }

    /**
     * Check if all scenarios are complete
     * @returns {boolean} True if all done
     */
    isComplete() {
        return this.currentIndex >= this.scenarios.length;
    }

    /**
     * Reset to beginning
     */
    reset() {
        this.currentIndex = 0;
    }

    /**
     * Get scenarios by category
     * @param {string} category - Category ID
     * @returns {Array} Filtered scenarios
     */
    getScenariosByCategory(category) {
        return this.scenarios.filter(s => s.category === category);
    }

    /**
     * Get category info for a scenario
     * @param {Object} scenario - Scenario object
     * @returns {Object} Category info from constants
     */
    getCategoryInfo(scenario) {
        const categoryKey = Object.keys(Constants.CATEGORIES).find(
            key => Constants.CATEGORIES[key].id === scenario.category
        );
        return Constants.CATEGORIES[categoryKey] || {
            id: scenario.category,
            label: scenario.category,
            color: '#718096',
            icon: '📋'
        };
    }

    /**
     * Get progress info
     * @returns {Object} Progress information
     */
    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.scenarios.length,
            percentage: Math.round((this.currentIndex / this.scenarios.length) * 100),
            isComplete: this.isComplete()
        };
    }

    /**
     * Shuffle scenarios (optional for replayability)
     */
    shuffle() {
        for (let i = this.scenarios.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.scenarios[i], this.scenarios[j]] = [this.scenarios[j], this.scenarios[i]];
        }
        this.currentIndex = 0;
    }
}

// Make available globally
window.ScenarioManager = ScenarioManager;
