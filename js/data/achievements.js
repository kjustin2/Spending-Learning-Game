/**
 * Achievement definitions
 */
const AchievementsData = {
    // Completion achievements
    FIRST_DECISION: {
        id: 'first_decision',
        title: 'First Step',
        description: 'Made your first financial decision',
        icon: '👣',
        condition: (state) => state.decisions.length >= 1
    },
    HALFWAY_THERE: {
        id: 'halfway_there',
        title: 'Halfway There',
        description: 'Completed half of all scenarios',
        icon: '🎯',
        condition: (state) => state.currentScenarioIndex >= Math.floor(state.totalScenarios / 2)
    },
    JOURNEY_COMPLETE: {
        id: 'journey_complete',
        title: 'Journey Complete',
        description: 'Finished all scenarios',
        icon: '🏆',
        condition: (state) => state.currentScenarioIndex >= state.totalScenarios
    },

    // Savings achievements
    PENNY_PINCHER: {
        id: 'penny_pincher',
        title: 'Penny Pincher',
        description: 'Always chose the most frugal option',
        icon: '🪙',
        condition: (state) => {
            if (state.decisions.length === 0) return false;
            return state.decisions.every(d => d.chosenChoice.isCheapest);
        }
    },
    SMART_SAVER: {
        id: 'smart_saver',
        title: 'Smart Saver',
        description: 'Potential savings exceed $100,000 (if invested)',
        icon: '💰',
        condition: (state) => state.totalInvestedSavings >= 100000
    },
    MILLIONAIRE_MINDSET: {
        id: 'millionaire_mindset',
        title: 'Millionaire Mindset',
        description: 'Potential savings exceed $500,000 (if invested)',
        icon: '🤑',
        condition: (state) => state.totalInvestedSavings >= 500000
    },

    // Balance achievements
    BALANCED_LIFE: {
        id: 'balanced_life',
        title: 'Balanced Life',
        description: 'Made a mix of frugal and premium choices',
        icon: '⚖️',
        condition: (state) => {
            if (state.decisions.length < 3) return false;
            const frugal = state.decisions.filter(d => d.chosenChoice.isCheapest).length;
            const premium = state.decisions.filter(d => d.chosenChoice.isMostExpensive).length;
            return frugal > 0 && premium > 0;
        }
    },
    TREAT_YOURSELF: {
        id: 'treat_yourself',
        title: 'Treat Yourself',
        description: 'Chose the premium option at least 3 times',
        icon: '✨',
        condition: (state) => {
            return state.decisions.filter(d => d.chosenChoice.isMostExpensive).length >= 3;
        }
    },

    // Learning achievements
    DAILY_MASTER: {
        id: 'daily_master',
        title: 'Daily Habit Master',
        description: 'Completed all daily spending scenarios',
        icon: '☕',
        condition: (state) => {
            const dailyScenarios = ScenariosData.filter(s => s.category === 'daily');
            const completedDaily = state.decisions.filter(d => 
                dailyScenarios.some(s => s.id === d.scenarioId)
            );
            return completedDaily.length >= dailyScenarios.length;
        }
    },
    TRANSPORT_EXPERT: {
        id: 'transport_expert',
        title: 'Transport Expert',
        description: 'Completed all transportation scenarios',
        icon: '🚗',
        condition: (state) => {
            const transportScenarios = ScenariosData.filter(s => s.category === 'transportation');
            const completedTransport = state.decisions.filter(d => 
                transportScenarios.some(s => s.id === d.scenarioId)
            );
            return completedTransport.length >= transportScenarios.length;
        }
    },
    HOME_ECONOMIST: {
        id: 'home_economist',
        title: 'Home Economist',
        description: 'Completed all housing scenarios',
        icon: '🏠',
        condition: (state) => {
            const housingScenarios = ScenariosData.filter(s => s.category === 'housing');
            const completedHousing = state.decisions.filter(d => 
                housingScenarios.some(s => s.id === d.scenarioId)
            );
            return completedHousing.length >= housingScenarios.length;
        }
    },

    // Score achievements
    FINANCIAL_GURU: {
        id: 'financial_guru',
        title: 'Financial Guru',
        description: 'Achieved a wisdom score of 80 or higher',
        icon: '🧠',
        condition: (state) => state.wisdomScore >= 80
    },
    QUICK_LEARNER: {
        id: 'quick_learner',
        title: 'Quick Learner',
        description: 'Completed the game in under 10 minutes',
        icon: '⚡',
        condition: (state) => {
            if (!state.startTime || !state.endTime) return false;
            const minutes = (state.endTime - state.startTime) / 60000;
            return minutes < 10;
        }
    }
};

/**
 * Check which achievements have been earned
 * @param {Object} state - Current game state
 * @returns {Array} Array of earned achievement objects
 */
function checkAchievements(state) {
    const earned = [];
    
    Object.values(AchievementsData).forEach(achievement => {
        if (achievement.condition(state)) {
            earned.push({
                id: achievement.id,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon
            });
        }
    });
    
    return earned;
}

/**
 * Get new achievements (ones not previously earned)
 * @param {Object} state - Current game state
 * @param {Array} previouslyEarned - Array of previously earned achievement IDs
 * @returns {Array} Array of newly earned achievements
 */
function getNewAchievements(state, previouslyEarned = []) {
    const allEarned = checkAchievements(state);
    return allEarned.filter(a => !previouslyEarned.includes(a.id));
}

// Freeze to prevent modifications
Object.freeze(AchievementsData);

// Make available globally
window.AchievementsData = AchievementsData;
window.checkAchievements = checkAchievements;
window.getNewAchievements = getNewAchievements;
