/**
 * Game Engine - Core game state and logic management
 */
class GameEngine {
    constructor() {
        this.scenarioManager = new ScenarioManager();
        this.state = this.getInitialState();
        this.listeners = {};
    }

    /**
     * Get initial game state
     * @returns {Object} Initial state
     */
    getInitialState() {
        return {
            player: {
                name: '',
                age: 25,
                annualIncome: 50000
            },
            currentScenarioIndex: 0,
            totalScenarios: this.scenarioManager ? this.scenarioManager.getTotalCount() : ScenariosData.length,
            decisions: [],
            totalNominalSavings: 0,
            totalInvestedSavings: 0,
            wisdomScore: 0,
            achievements: [],
            startTime: null,
            endTime: null,
            isComplete: false
        };
    }

    /**
     * Reset game to initial state
     */
    reset() {
        this.scenarioManager.reset();
        this.state = this.getInitialState();
        Storage.clearAll();
        this.emit('reset');
    }

    /**
     * Initialize player profile
     * @param {Object} profile - Player profile data
     */
    initializePlayer(profile) {
        this.state.player = {
            name: profile.name || 'Player',
            age: parseInt(profile.age) || 25,
            annualIncome: parseInt(profile.income) || 50000
        };
        this.state.startTime = Date.now();
        
        Storage.savePlayerProfile(this.state.player);
        this.saveState();
        this.emit('playerInitialized', this.state.player);
    }

    /**
     * Get current scenario
     * @returns {Object|null} Current scenario
     */
    getCurrentScenario() {
        return this.scenarioManager.getCurrentScenario();
    }

    /**
     * Process a player's choice for the current scenario
     * @param {number} choiceIndex - Index of the selected choice
     * @returns {Object} Impact analysis
     */
    makeChoice(choiceIndex) {
        const scenario = this.getCurrentScenario();
        if (!scenario) {
            console.error('No current scenario');
            return null;
        }

        const choice = scenario.choices[choiceIndex];
        if (!choice) {
            console.error('Invalid choice index');
            return null;
        }

        // Calculate impact
        const impact = Calculator.calculateScenarioImpact(scenario, choiceIndex);

        // Create decision record
        const decision = {
            id: Helpers.generateId(),
            scenarioId: scenario.id,
            scenarioTitle: scenario.title,
            chosenChoice: impact.chosen,
            impact: impact,
            timestamp: Date.now()
        };

        // Check if there's already a decision for this scenario (user went back to change)
        const existingIndex = this.state.decisions.findIndex(d => d.scenarioId === scenario.id);
        
        if (existingIndex !== -1) {
            // Replace existing decision - need to reverse the old totals first
            const oldDecision = this.state.decisions[existingIndex];
            const oldThirtyYearImpact = oldDecision.impact.byTimeframe[30];
            if (oldThirtyYearImpact) {
                this.state.totalNominalSavings -= oldThirtyYearImpact.savingsVsExpensive.nominal;
                this.state.totalInvestedSavings -= oldThirtyYearImpact.savingsVsExpensive.invested;
            }
            // Replace the old decision
            this.state.decisions[existingIndex] = decision;
        } else {
            // Add new decision
            this.state.decisions.push(decision);
        }
        
        // Update cumulative totals (30-year impact vs cheapest option)
        const thirtyYearImpact = impact.byTimeframe[30];
        if (thirtyYearImpact) {
            // Track cost vs cheapest
            this.state.totalNominalSavings += thirtyYearImpact.savingsVsExpensive.nominal;
            this.state.totalInvestedSavings += thirtyYearImpact.savingsVsExpensive.invested;
        }

        // Save state
        this.saveState();
        Storage.saveDecisions(this.state.decisions);

        this.emit('choiceMade', { decision, impact });
        
        return { decision, impact };
    }

    /**
     * Move to next scenario
     * @returns {Object|null} Next scenario or null if complete
     */
    nextScenario() {
        const next = this.scenarioManager.nextScenario();
        this.state.currentScenarioIndex = this.scenarioManager.getCurrentIndex();
        
        if (!next) {
            this.completeGame();
        }
        
        this.saveState();
        this.emit('scenarioChanged', { scenario: next, index: this.state.currentScenarioIndex });
        
        return next;
    }

    /**
     * Complete the game and calculate final scores
     */
    completeGame() {
        this.state.endTime = Date.now();
        this.state.isComplete = true;
        
        // Calculate final wisdom score
        this.state.wisdomScore = Calculator.calculateWisdomScore(this.state.decisions);
        
        // Check achievements
        this.state.achievements = checkAchievements(this.state);
        
        this.saveState();
        this.emit('gameComplete', this.getFinalSummary());
    }

    /**
     * Get final game summary
     * @returns {Object} Summary data
     */
    getFinalSummary() {
        const cumulativeImpact = Calculator.calculateCumulativeImpact(this.state.decisions);
        
        // Find biggest impact decision
        let biggestImpact = null;
        let biggestImpactAmount = 0;
        
        this.state.decisions.forEach(decision => {
            const impact30yr = decision.impact.byTimeframe[30]?.costVsCheapest?.invested || 0;
            if (impact30yr > biggestImpactAmount) {
                biggestImpactAmount = impact30yr;
                biggestImpact = decision;
            }
        });

        // Calculate monthly savings potential
        let totalMonthlySavings = 0;
        this.state.decisions.forEach(decision => {
            totalMonthlySavings += decision.impact.annualCostVsCheapest / 12;
        });

        return {
            player: this.state.player,
            decisions: this.state.decisions,
            totalDecisions: this.state.decisions.length,
            totalNominalSavings: this.state.totalNominalSavings,
            totalInvestedSavings: this.state.totalInvestedSavings,
            monthlySavingsPotential: totalMonthlySavings,
            cumulativeImpact,
            biggestImpactDecision: biggestImpact,
            biggestImpactAmount,
            wisdomScore: this.state.wisdomScore,
            wisdomMessage: this.getWisdomMessage(this.state.wisdomScore),
            achievements: this.state.achievements,
            playTime: this.state.endTime - this.state.startTime
        };
    }

    /**
     * Get wisdom message based on score
     * @param {number} score - Wisdom score
     * @returns {string} Message
     */
    getWisdomMessage(score) {
        const { EXCELLENT, GOOD, AVERAGE, NEEDS_WORK } = Constants.WISDOM_SCORES;
        
        if (score >= EXCELLENT.min) return EXCELLENT.message;
        if (score >= GOOD.min) return GOOD.message;
        if (score >= AVERAGE.min) return AVERAGE.message;
        return NEEDS_WORK.message;
    }

    /**
     * Get current game progress
     * @returns {Object} Progress info
     */
    getProgress() {
        return {
            ...this.scenarioManager.getProgress(),
            decisionsCount: this.state.decisions.length,
            totalSavings: this.state.totalNominalSavings,
            totalInvested: this.state.totalInvestedSavings
        };
    }

    /**
     * Save current state to storage
     */
    saveState() {
        Storage.saveGameState(this.state);
    }

    /**
     * Load state from storage
     * @returns {boolean} True if state was loaded
     */
    loadState() {
        const savedState = Storage.loadGameState();
        if (savedState) {
            this.state = { ...this.getInitialState(), ...savedState };
            this.scenarioManager.setCurrentIndex(this.state.currentScenarioIndex);
            this.emit('stateLoaded', this.state);
            return true;
        }
        return false;
    }

    /**
     * Check if there's a saved game
     * @returns {boolean} True if saved game exists
     */
    hasSavedGame() {
        return Storage.hasSavedGame();
    }

    /**
     * Get save info for display
     * @returns {Object|null} Save info
     */
    getSaveInfo() {
        return Storage.getSaveInfo();
    }

    /**
     * Subscribe to events
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    /**
     * Emit an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    /**
     * Get current state (for debugging)
     * @returns {Object} Current state
     */
    getState() {
        return { ...this.state };
    }
}

// Make available globally
window.GameEngine = GameEngine;
