/**
 * Financial constants and default values
 */
const Constants = {
    // Investment and growth rates
    RATES: {
        STOCK_MARKET_RETURN: 0.07,      // 7% average annual return
        SAVINGS_ACCOUNT: 0.04,           // 4% savings account interest
        INFLATION: 0.03,                 // 3% annual inflation
        HOME_APPRECIATION: 0.035,        // 3.5% annual home appreciation
        CAR_DEPRECIATION: 0.15,          // 15% annual car depreciation
        MORTGAGE_RATE: 0.065             // 6.5% mortgage rate
    },

    // Time periods for calculations
    TIME_PERIODS: [1, 5, 10, 20, 30],    // Years to show in charts

    // Category definitions
    CATEGORIES: {
        DAILY: {
            id: 'daily',
            label: 'Daily Spending',
            color: '#38a169',
            icon: '☕'
        },
        TRANSPORTATION: {
            id: 'transportation',
            label: 'Transportation',
            color: '#3182ce',
            icon: '🚗'
        },
        HOUSING: {
            id: 'housing',
            label: 'Housing',
            color: '#805ad5',
            icon: '🏠'
        },
        SUBSCRIPTIONS: {
            id: 'subscriptions',
            label: 'Subscriptions',
            color: '#dd6b20',
            icon: '📱'
        },
        LIFESTYLE: {
            id: 'lifestyle',
            label: 'Lifestyle',
            color: '#d53f8c',
            icon: '✨'
        }
    },

    // Chart colors
    CHART_COLORS: {
        PRIMARY: '#1a365d',
        SECONDARY: '#38a169',
        ACCENT: '#dd6b20',
        NEUTRAL: '#718096',
        GRID: '#e2e8f0',
        BACKGROUND: 'rgba(26, 54, 93, 0.1)',
        HIGHLIGHT: 'rgba(56, 161, 105, 0.2)'
    },

    // Financial tips for different scenarios
    TIPS: {
        COMPOUND_INTEREST: "Compound interest is often called the 'eighth wonder of the world.' Your money earns returns, and then those returns earn returns!",
        OPPORTUNITY_COST: "Every dollar spent is a dollar that can't be invested. The 'true cost' of spending includes what that money could have become.",
        INFLATION: "Inflation erodes purchasing power over time. $100 today will only buy about $55 worth of goods in 20 years at 3% inflation.",
        DEPRECIATION: "Cars lose about 60% of their value in the first 5 years. A $40,000 car becomes worth ~$16,000 after 5 years.",
        SMALL_CHANGES: "Small daily changes have massive long-term effects. Saving just $5/day becomes over $54,000 in 20 years if invested!",
        LIFESTYLE_CREEP: "As income grows, spending often grows with it. Being mindful of 'lifestyle creep' can accelerate wealth building.",
        HOUSING_WEALTH: "For many people, their home is their largest asset. But remember: the house you live in is also an expense.",
        SUBSCRIPTION_TRAP: "Small monthly subscriptions add up. $50/month in subscriptions = $600/year = $18,000 over 30 years (without investment growth)."
    },

    // Wisdom score thresholds
    WISDOM_SCORES: {
        EXCELLENT: { min: 80, message: "Financial Guru! You make incredibly wise money decisions." },
        GOOD: { min: 60, message: "Smart Saver! You have a good balance of enjoying life and building wealth." },
        AVERAGE: { min: 40, message: "On Track! There's room to optimize your financial decisions." },
        NEEDS_WORK: { min: 0, message: "Learning Journey! Small changes can lead to big improvements." }
    },

    // Default player settings
    DEFAULT_PLAYER: {
        name: 'Player',
        age: 25,
        annualIncome: 50000,
        savings: 5000,
        investments: 0,
        debt: 0
    },

    // UI Settings
    UI: {
        ANIMATION_DURATION: 300,
        CHART_ANIMATION_DURATION: 800,
        COUNTER_DURATION: 1000,
        TRANSITION_DELAY: 100
    }
};

// Freeze to prevent modifications
Object.freeze(Constants);
Object.freeze(Constants.RATES);
Object.freeze(Constants.CATEGORIES);
Object.freeze(Constants.CHART_COLORS);
Object.freeze(Constants.TIPS);
Object.freeze(Constants.WISDOM_SCORES);
Object.freeze(Constants.DEFAULT_PLAYER);
Object.freeze(Constants.UI);

// Make available globally
window.Constants = Constants;
