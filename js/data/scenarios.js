/**
 * Game scenarios data
 */
const ScenariosData = [
    // ===== DAILY SPENDING =====
    {
        id: 'dinner-pasta',
        category: 'daily',
        title: 'Dinner Decisions',
        description: "You eat dinner every night. A simple choice between premium and budget options seems small, but let's see how it adds up over time.",
        choices: [
            {
                id: 'premium-pasta',
                label: 'Quality Pasta & Ingredients',
                detail: 'Fresh pasta, premium sauce, quality cheese',
                cost: 5,
                frequency: 'daily',
                qualityScore: 90,
                satisfactionNote: 'Delicious restaurant-quality meals at home'
            },
            {
                id: 'mid-pasta',
                label: 'Standard Pasta',
                detail: 'Regular pasta and jarred sauce',
                cost: 2.50,
                frequency: 'daily',
                qualityScore: 70,
                satisfactionNote: 'Good, reliable everyday meals'
            },
            {
                id: 'budget-pasta',
                label: 'Budget Pasta',
                detail: 'Store brand pasta, basic sauce',
                cost: 1,
                frequency: 'daily',
                qualityScore: 50,
                satisfactionNote: 'Gets the job done, saves money'
            }
        ],
        tip: "The $4/day difference between premium and budget options equals $1,460/year. Invested over 30 years at 7%, that's over $138,000! But quality of life matters too—find your balance.",
        educationalFocus: 'compound_interest'
    },
    {
        id: 'morning-coffee',
        category: 'daily',
        title: 'The Coffee Question',
        description: "How do you get your morning caffeine fix? This daily ritual is one of the most discussed examples in personal finance.",
        choices: [
            {
                id: 'coffee-shop',
                label: 'Daily Coffee Shop Visit',
                detail: 'Specialty latte from your favorite café',
                cost: 6,
                frequency: 'daily',
                qualityScore: 95,
                satisfactionNote: 'Perfect coffee, nice atmosphere, treat yourself'
            },
            {
                id: 'home-quality',
                label: 'Quality Home Brew',
                detail: 'Good beans, nice coffee maker',
                cost: 1.50,
                frequency: 'daily',
                qualityScore: 80,
                satisfactionNote: 'Great coffee without leaving home'
            },
            {
                id: 'basic-coffee',
                label: 'Basic Home Coffee',
                detail: 'Standard drip coffee, regular beans',
                cost: 0.25,
                frequency: 'daily',
                qualityScore: 60,
                satisfactionNote: 'Caffeine delivered efficiently'
            }
        ],
        tip: "The famous 'latte factor' shows how small daily expenses compound. But don't just cut costs—redirect savings toward investments to see real growth.",
        educationalFocus: 'opportunity_cost'
    },
    {
        id: 'lunch-choices',
        category: 'daily',
        title: 'Lunch Break Dilemma',
        description: "Workday lunch: a daily decision that shapes both your wallet and your afternoon energy. What's your typical choice?",
        choices: [
            {
                id: 'restaurant-lunch',
                label: 'Restaurant Lunch',
                detail: 'Sit-down meal or upscale fast-casual',
                cost: 18,
                frequency: 'daily',
                qualityScore: 90,
                satisfactionNote: 'Great food, nice break from work'
            },
            {
                id: 'fast-food',
                label: 'Fast Food / Quick Service',
                detail: 'Fast casual or food court options',
                cost: 10,
                frequency: 'daily',
                qualityScore: 65,
                satisfactionNote: 'Quick, convenient, decent variety'
            },
            {
                id: 'packed-lunch',
                label: 'Packed Lunch from Home',
                detail: 'Meal prep or leftovers',
                cost: 4,
                frequency: 'daily',
                qualityScore: 75,
                satisfactionNote: 'Healthier options, full control over ingredients'
            }
        ],
        tip: "Assuming 250 workdays per year, the difference between restaurant lunches ($18) and packed ($4) is $3,500/year. That's $105,000 over 30 years nominal, or $331,000 if invested!",
        educationalFocus: 'small_changes'
    },

    // ===== TRANSPORTATION =====
    {
        id: 'car-purchase',
        category: 'transportation',
        title: 'Wheels of Fortune',
        description: "You need reliable transportation. How much should you spend on a car, and how often should you replace it? Cars are often the second-largest purchase people make.",
        choices: [
            {
                id: 'luxury-new',
                label: 'New Luxury/Premium Car',
                detail: '$45,000 new car every 5 years',
                cost: 45000,
                frequency: 'every5years',
                qualityScore: 95,
                satisfactionNote: 'Latest features, status, comfort'
            },
            {
                id: 'standard-new',
                label: 'New Standard Car',
                detail: '$28,000 new car every 6 years',
                cost: 28000,
                frequency: 'every5years', // Simplified for calculation
                qualityScore: 80,
                satisfactionNote: 'Reliable, modern, good value'
            },
            {
                id: 'reliable-used',
                label: 'Reliable Used Car',
                detail: '$12,000 used car (3-4 years old) every 5 years',
                cost: 12000,
                frequency: 'every5years',
                qualityScore: 65,
                satisfactionNote: 'Transportation that works, major savings'
            }
        ],
        tip: "Cars depreciate about 60% in the first 5 years. A $45,000 car becomes worth ~$18,000. Buying a 3-year-old car means someone else absorbed the steepest depreciation!",
        educationalFocus: 'depreciation'
    },
    {
        id: 'commute-method',
        category: 'transportation',
        title: 'The Daily Commute',
        description: "How do you get to work? Your commute method affects your budget, time, health, and environmental impact. Assume a 10-mile each way commute.",
        choices: [
            {
                id: 'drive-alone',
                label: 'Drive Alone',
                detail: 'Personal car, parking, gas, maintenance',
                cost: 400,
                frequency: 'monthly',
                qualityScore: 85,
                satisfactionNote: 'Freedom, convenience, climate control'
            },
            {
                id: 'public-transit',
                label: 'Public Transportation',
                detail: 'Bus or train monthly pass',
                cost: 100,
                frequency: 'monthly',
                qualityScore: 65,
                satisfactionNote: 'Read or relax during commute, no parking stress'
            },
            {
                id: 'bike-commute',
                label: 'Bike to Work',
                detail: 'Initial bike cost amortized + maintenance',
                cost: 25,
                frequency: 'monthly',
                qualityScore: 70,
                satisfactionNote: 'Exercise built in, eco-friendly, weather dependent'
            }
        ],
        tip: "Driving costs include gas (~$0.15/mile), maintenance (~$0.10/mile), depreciation, insurance, and parking. The true cost of car commuting is often underestimated by 40%!",
        educationalFocus: 'hidden_costs'
    },

    // ===== HOUSING =====
    {
        id: 'rent-vs-buy',
        category: 'housing',
        title: 'Home Economics',
        description: "The biggest financial decision most people face: rent or buy? Both have trade-offs, and the 'right' answer depends on many factors.",
        choices: [
            {
                id: 'buy-home',
                label: 'Buy a Home',
                detail: '$350,000 home, 20% down, 30-year mortgage at 6.5%',
                cost: 2200,
                frequency: 'monthly',
                qualityScore: 85,
                satisfactionNote: 'Building equity, stability, freedom to modify',
                isInvestment: true,
                appreciationRate: 0.035
            },
            {
                id: 'rent-nice',
                label: 'Rent Comparable Space',
                detail: 'Similar size home/apartment in same area',
                cost: 1800,
                frequency: 'monthly',
                qualityScore: 75,
                satisfactionNote: 'Flexibility, no maintenance costs, can invest difference'
            },
            {
                id: 'rent-modest',
                label: 'Rent Modest Space',
                detail: 'Smaller apartment, invest the difference',
                cost: 1200,
                frequency: 'monthly',
                qualityScore: 60,
                satisfactionNote: 'Maximum savings for investing, minimal space'
            }
        ],
        tip: "Buying isn't always better! Consider: closing costs (2-5% of price), property taxes, maintenance (1-2%/year), and opportunity cost of the down payment. Renting + investing can sometimes win.",
        educationalFocus: 'housing_wealth',
        complexCalculation: true
    },
    {
        id: 'apartment-size',
        category: 'housing',
        title: 'Space vs. Savings',
        description: "When renting, how much space do you really need? Extra square footage means extra cost, but also room for hobbies, guests, and comfort.",
        choices: [
            {
                id: 'spacious-2br',
                label: 'Spacious 2-Bedroom',
                detail: '1,100 sq ft, room for office and guests',
                cost: 1800,
                frequency: 'monthly',
                qualityScore: 90,
                satisfactionNote: 'Room to spread out, home office, storage'
            },
            {
                id: 'comfortable-1br',
                label: 'Comfortable 1-Bedroom',
                detail: '750 sq ft, efficient and cozy',
                cost: 1400,
                frequency: 'monthly',
                qualityScore: 75,
                satisfactionNote: 'Good balance of space and cost'
            },
            {
                id: 'efficient-studio',
                label: 'Efficient Studio',
                detail: '500 sq ft, minimalist living',
                cost: 1000,
                frequency: 'monthly',
                qualityScore: 55,
                satisfactionNote: 'Maximum savings, minimal stuff'
            }
        ],
        tip: "The difference between a studio and 2BR ($800/month) equals $9,600/year. Over 10 years, that's $96,000 nominal or $132,000+ if invested. Is the extra space worth a six-figure difference?",
        educationalFocus: 'lifestyle_creep'
    },

    // ===== SUBSCRIPTIONS & LIFESTYLE =====
    {
        id: 'streaming-services',
        category: 'subscriptions',
        title: 'Subscription Stack',
        description: "Entertainment subscriptions are convenient, but they add up. How many streaming services, apps, and memberships do you maintain?",
        choices: [
            {
                id: 'full-stack',
                label: 'Full Entertainment Stack',
                detail: 'Netflix, Spotify, HBO, Disney+, Hulu, gym, news, cloud storage',
                cost: 120,
                frequency: 'monthly',
                qualityScore: 95,
                satisfactionNote: 'Access to everything, never bored'
            },
            {
                id: 'curated-subs',
                label: 'Curated Subscriptions',
                detail: '2-3 streaming services, rotate as needed',
                cost: 45,
                frequency: 'monthly',
                qualityScore: 80,
                satisfactionNote: 'Plenty of content, mindful choices'
            },
            {
                id: 'minimal-subs',
                label: 'Minimal Subscriptions',
                detail: 'One streaming service, free alternatives for rest',
                cost: 15,
                frequency: 'monthly',
                qualityScore: 55,
                satisfactionNote: 'Library cards, free tiers, intentional consumption'
            }
        ],
        tip: "The average American spends $219/month on subscriptions, often forgetting services they rarely use. Audit your subscriptions quarterly—you might find 'zombie subscriptions' draining your account!",
        educationalFocus: 'subscription_trap'
    },
    {
        id: 'phone-upgrade',
        category: 'lifestyle',
        title: 'The Upgrade Cycle',
        description: "Smartphones are essential, but how often do you really need the latest model? New phones come out yearly, but do the improvements justify the cost?",
        choices: [
            {
                id: 'yearly-flagship',
                label: 'Latest Flagship Yearly',
                detail: '$1,200 new phone every year',
                cost: 1200,
                frequency: 'yearly',
                qualityScore: 98,
                satisfactionNote: 'Always have the newest tech and features'
            },
            {
                id: 'flagship-extended',
                label: 'Flagship Every 3 Years',
                detail: '$1,100 phone used for 3 years',
                cost: 367,
                frequency: 'yearly',
                qualityScore: 85,
                satisfactionNote: 'Great phone, sustainable upgrade cycle'
            },
            {
                id: 'midrange-extended',
                label: 'Mid-Range Phone, 3-4 Years',
                detail: '$400 phone that does everything you need',
                cost: 115,
                frequency: 'yearly',
                qualityScore: 70,
                satisfactionNote: '90% of the features at 30% of the price'
            }
        ],
        tip: "Flagship phones depreciate about 40% in the first year. A 1-year-old flagship often costs 50-60% of new price but works nearly identically. Consider the 'sweet spot' of buying last year's model!",
        educationalFocus: 'depreciation'
    }
];

// Freeze to prevent modifications
Object.freeze(ScenariosData);

// Make available globally
window.ScenariosData = ScenariosData;
