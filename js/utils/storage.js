/**
 * LocalStorage wrapper for game state persistence
 */
const Storage = {
    KEYS: {
        GAME_STATE: 'moneyChoices_gameState',
        PLAYER_PROFILE: 'moneyChoices_playerProfile',
        DECISIONS_HISTORY: 'moneyChoices_decisions',
        SETTINGS: 'moneyChoices_settings',
        ACHIEVEMENTS: 'moneyChoices_achievements'
    },

    /**
     * Check if localStorage is available
     * @returns {boolean} True if available
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Save data to localStorage
     * @param {string} key - Storage key
     * @param {*} data - Data to save
     * @returns {boolean} Success status
     */
    save(key, data) {
        if (!this.isAvailable()) {
            console.warn('LocalStorage not available');
            return false;
        }

        try {
            const serialized = JSON.stringify({
                data,
                timestamp: Date.now(),
                version: '1.0'
            });
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },

    /**
     * Load data from localStorage
     * @param {string} key - Storage key
     * @returns {*} Loaded data or null
     */
    load(key) {
        if (!this.isAvailable()) {
            return null;
        }

        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            const { data, timestamp, version } = JSON.parse(item);
            return data;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    },

    /**
     * Remove data from localStorage
     * @param {string} key - Storage key
     * @returns {boolean} Success status
     */
    remove(key) {
        if (!this.isAvailable()) {
            return false;
        }

        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },

    /**
     * Clear all game data from localStorage
     * @returns {boolean} Success status
     */
    clearAll() {
        if (!this.isAvailable()) {
            return false;
        }

        try {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    },

    /**
     * Save game state
     * @param {Object} state - Game state object
     * @returns {boolean} Success status
     */
    saveGameState(state) {
        return this.save(this.KEYS.GAME_STATE, state);
    },

    /**
     * Load game state
     * @returns {Object|null} Game state or null
     */
    loadGameState() {
        return this.load(this.KEYS.GAME_STATE);
    },

    /**
     * Save player profile
     * @param {Object} profile - Player profile
     * @returns {boolean} Success status
     */
    savePlayerProfile(profile) {
        return this.save(this.KEYS.PLAYER_PROFILE, profile);
    },

    /**
     * Load player profile
     * @returns {Object|null} Player profile or null
     */
    loadPlayerProfile() {
        return this.load(this.KEYS.PLAYER_PROFILE);
    },

    /**
     * Save decisions history
     * @param {Array} decisions - Array of decisions
     * @returns {boolean} Success status
     */
    saveDecisions(decisions) {
        return this.save(this.KEYS.DECISIONS_HISTORY, decisions);
    },

    /**
     * Load decisions history
     * @returns {Array} Decisions array
     */
    loadDecisions() {
        return this.load(this.KEYS.DECISIONS_HISTORY) || [];
    },

    /**
     * Check if there's a saved game
     * @returns {boolean} True if saved game exists
     */
    hasSavedGame() {
        const state = this.loadGameState();
        return state !== null && state.currentScenarioIndex > 0;
    },

    /**
     * Get save info for display
     * @returns {Object|null} Save info object
     */
    getSaveInfo() {
        if (!this.isAvailable()) {
            return null;
        }

        try {
            const item = localStorage.getItem(this.KEYS.GAME_STATE);
            if (!item) return null;

            const { data, timestamp } = JSON.parse(item);
            return {
                playerName: data.player?.name || 'Unknown',
                scenarioProgress: data.currentScenarioIndex || 0,
                totalScenarios: data.totalScenarios || 0,
                savedAt: new Date(timestamp).toLocaleString()
            };
        } catch (e) {
            return null;
        }
    }
};

// Make available globally
window.Storage = Storage;
