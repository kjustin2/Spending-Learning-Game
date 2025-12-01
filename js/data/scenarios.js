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
                isAsset: true,
                totalValue: 350000,
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
    },

    // ===== INVESTING =====
    {
        id: 'investment-strategy',
        category: 'investing',
        title: 'Where to Put Your Money',
        description: "You have $500/month to invest for the long term. Where you put it makes a huge difference over decades. Each option has different risk/reward profiles.",
        choices: [
            {
                id: 'index-funds',
                label: 'S&P 500 Index Fund',
                detail: 'Low-cost, diversified, tracks the market (~7% avg return)',
                cost: -500,
                frequency: 'monthly',
                qualityScore: 90,
                satisfactionNote: 'Set it and forget it, historically proven',
                returnRate: 0.07
            },
            {
                id: 'individual-stocks',
                label: 'Individual Stock Picking',
                detail: 'Research and pick your own stocks (highly variable returns)',
                cost: -500,
                frequency: 'monthly',
                qualityScore: 70,
                satisfactionNote: 'Exciting but risky, most underperform index funds',
                returnRate: 0.05 // Most stock pickers underperform
            },
            {
                id: 'high-yield-savings',
                label: 'High-Yield Savings Account',
                detail: 'Safe, FDIC insured, ~4.5% APY currently',
                cost: -500,
                frequency: 'monthly',
                qualityScore: 75,
                satisfactionNote: 'Safe and liquid, but lower long-term growth',
                returnRate: 0.045
            },
            {
                id: 'checking-account',
                label: 'Leave in Checking Account',
                detail: 'Easy access, basically 0% return',
                cost: -500,
                frequency: 'monthly',
                qualityScore: 30,
                satisfactionNote: 'Losing money to inflation every year',
                returnRate: 0.001
            }
        ],
        tip: "Over 30 years, $500/month in an index fund (~7%) grows to ~$566,000. In a checking account (0.1%), it's only ~$182,000. That's a $384,000 difference from the same monthly contribution!",
        educationalFocus: 'index_funds'
    },
    {
        id: 'treasury-vs-stocks',
        category: 'investing',
        title: 'Risk Tolerance',
        description: "You have $10,000 to invest. Do you prioritize safety or growth? This fundamental question shapes your entire investment strategy.",
        choices: [
            {
                id: 'all-stocks',
                label: '100% Stock Market (Index Funds)',
                detail: 'Maximum growth potential, higher volatility',
                cost: -10000,
                frequency: 'once',
                qualityScore: 80,
                satisfactionNote: 'Best for long time horizons, can drop 30%+ in bad years',
                returnRate: 0.07
            },
            {
                id: 'balanced-portfolio',
                label: '60% Stocks / 40% Bonds',
                detail: 'Classic balanced portfolio, moderate risk',
                cost: -10000,
                frequency: 'once',
                qualityScore: 85,
                satisfactionNote: 'Smoother ride, still solid growth',
                returnRate: 0.055
            },
            {
                id: 'treasury-bonds',
                label: '100% Treasury Bonds',
                detail: 'Government backed, very safe, predictable returns',
                cost: -10000,
                frequency: 'once',
                qualityScore: 70,
                satisfactionNote: 'Sleep well at night, but inflation may outpace you',
                returnRate: 0.045
            }
        ],
        tip: "A 25-year-old with 40 years until retirement can afford more risk—they have time to recover from market dips. Someone 5 years from retirement needs more stability. Adjust your allocation as you age!",
        educationalFocus: 'diversification'
    },
    {
        id: 'real-estate-investment',
        category: 'investing',
        title: 'Real Estate Investing',
        description: "Beyond your primary home, real estate can be an investment. But it requires more capital and effort than stocks. How would you approach it?",
        choices: [
            {
                id: 'rental-property',
                label: 'Buy a Rental Property',
                detail: '$60,000 down payment, manage tenants, ~8% return',
                cost: 60000,
                frequency: 'once',
                qualityScore: 75,
                satisfactionNote: 'Tangible asset, rental income, but lots of work',
                returnRate: 0.08
            },
            {
                id: 'reit-funds',
                label: 'Real Estate Investment Trust (REIT)',
                detail: 'Buy shares in real estate portfolio, ~6% dividend + growth',
                cost: 10000,
                frequency: 'once',
                qualityScore: 85,
                satisfactionNote: 'Real estate exposure without being a landlord',
                returnRate: 0.07
            },
            {
                id: 'stick-with-stocks',
                label: 'Skip Real Estate, More Index Funds',
                detail: 'Keep it simple, put money in diversified stock index',
                cost: 10000,
                frequency: 'once',
                qualityScore: 80,
                satisfactionNote: 'Simpler, more liquid, historically similar returns',
                returnRate: 0.07
            }
        ],
        tip: "Direct real estate investing averages 8-10% returns but requires significant capital, time, and expertise. REITs offer real estate exposure with stock-like liquidity. Both can diversify a portfolio beyond pure stocks.",
        educationalFocus: 'real_estate'
    },
    {
        id: 'emergency-fund',
        category: 'investing',
        title: 'Emergency Fund Priority',
        description: "You have $15,000 saved but no emergency fund. Financial advisors recommend 3-6 months of expenses (~$15,000 for you) before aggressive investing. What do you do?",
        choices: [
            {
                id: 'full-emergency',
                label: 'Keep Full Emergency Fund',
                detail: 'All $15,000 in high-yield savings (4.5%), invest future savings',
                cost: -15000,
                frequency: 'once',
                qualityScore: 95,
                satisfactionNote: 'Peace of mind, protected from unexpected expenses',
                returnRate: 0.045
            },
            {
                id: 'split-approach',
                label: 'Split: $10K Emergency, $5K Invest',
                detail: 'Partial safety net, start building investment portfolio',
                cost: -15000,
                frequency: 'once',
                qualityScore: 75,
                satisfactionNote: 'Balanced approach, some risk exposure',
                returnRate: 0.058
            },
            {
                id: 'invest-all',
                label: 'Invest Everything in Index Funds',
                detail: 'Maximum growth potential, but vulnerable to emergencies',
                cost: -15000,
                frequency: 'once',
                qualityScore: 50,
                satisfactionNote: 'Higher returns but may need to sell at bad time',
                returnRate: 0.07
            }
        ],
        tip: "Without an emergency fund, an unexpected $5,000 expense could force you to sell investments at a loss or take on high-interest debt. The 'opportunity cost' of a safe emergency fund is worth the peace of mind!",
        educationalFocus: 'emergency_fund'
    },

    // ===== CREDIT & DEBT =====
    {
        id: 'credit-card-usage',
        category: 'credit',
        title: 'Credit Card Strategy',
        description: "Credit cards can be powerful tools or dangerous traps. How do you use them? This choice has major implications for your financial health.",
        choices: [
            {
                id: 'pay-full-rewards',
                label: 'Pay in Full, Maximize Rewards',
                detail: 'Use for all purchases, pay full balance monthly, earn 2% back',
                cost: -200,
                frequency: 'monthly',
                qualityScore: 95,
                satisfactionNote: 'Free money from rewards, build credit score',
                returnRate: 0.02
            },
            {
                id: 'debit-only',
                label: 'Debit Card Only',
                detail: 'Avoid credit entirely, spend only what you have',
                cost: 0,
                frequency: 'monthly',
                qualityScore: 70,
                satisfactionNote: 'No debt risk, but miss rewards and credit building',
                returnRate: 0
            },
            {
                id: 'carry-balance',
                label: 'Carry a Balance Sometimes',
                detail: 'Pay minimum when tight, average $2,000 balance at 22% APR',
                cost: 440,
                frequency: 'yearly',
                qualityScore: 30,
                satisfactionNote: 'Flexibility but expensive—interest adds up fast',
                returnRate: -0.22
            }
        ],
        tip: "Using credit cards responsibly (paying in full) is actually profitable—2% rewards on $3,000/month spending = $720/year FREE. But carrying a $2,000 balance costs $440/year in interest. The difference is $1,160/year!",
        educationalFocus: 'credit_card_debt'
    },
    {
        id: 'debt-payoff',
        category: 'credit',
        title: 'Debt Payoff vs Investing',
        description: "You have $5,000 in credit card debt at 22% APR and $500/month extra. Should you pay off debt or invest? This is a common financial crossroads.",
        choices: [
            {
                id: 'payoff-debt-first',
                label: 'Pay Off Debt First',
                detail: 'Attack the 22% APR debt aggressively, then invest',
                cost: 500,
                frequency: 'monthly',
                qualityScore: 95,
                satisfactionNote: 'Guaranteed 22% return by eliminating interest',
                returnRate: 0.22
            },
            {
                id: 'split-debt-invest',
                label: 'Split: $300 Debt, $200 Invest',
                detail: 'Balance debt payoff with starting investment habit',
                cost: 500,
                frequency: 'monthly',
                qualityScore: 60,
                satisfactionNote: 'Psychological win but mathematically worse',
                returnRate: 0.12
            },
            {
                id: 'minimum-invest',
                label: 'Pay Minimum, Invest the Rest',
                detail: 'Bet on 7% investment returns beating debt payoff',
                cost: 500,
                frequency: 'monthly',
                qualityScore: 25,
                satisfactionNote: 'Losing money—22% cost vs 7% gain',
                returnRate: -0.15
            }
        ],
        tip: "Paying off 22% APR debt is like getting a guaranteed 22% return on your money—better than any investment! Always pay off high-interest debt before investing. The math is clear: 22% > 7%.",
        educationalFocus: 'credit_card_debt'
    },
    {
        id: 'credit-score-building',
        category: 'credit',
        title: 'Building Credit History',
        description: "You're young with limited credit history. A good credit score saves thousands on loans and insurance. How do you build it?",
        choices: [
            {
                id: 'secured-card-responsible',
                label: 'Secured Card, Small Purchases, Pay Full',
                detail: 'Start with $500 secured card, buy gas, pay in full',
                cost: 0,
                frequency: 'monthly',
                qualityScore: 95,
                satisfactionNote: 'Slow and steady builds excellent credit',
                returnRate: 0
            },
            {
                id: 'authorized-user',
                label: 'Become Authorized User',
                detail: 'Get added to parent/partner card with good history',
                cost: 0,
                frequency: 'monthly',
                qualityScore: 85,
                satisfactionNote: 'Instant credit history boost, relies on others',
                returnRate: 0
            },
            {
                id: 'no-credit',
                label: 'Avoid Credit Entirely',
                detail: 'Cash and debit only, build wealth first',
                cost: 0,
                frequency: 'monthly',
                qualityScore: 40,
                satisfactionNote: 'Miss out on credit benefits, harder to get loans later',
                returnRate: 0
            }
        ],
        tip: "A 750+ credit score vs 650 can save you $50,000+ over a lifetime on mortgages, auto loans, and insurance. Building credit early with responsible use is one of the best financial moves for young adults.",
        educationalFocus: 'credit_building'
    },

    // ===== CAREER =====
    {
        id: 'job-hopping',
        category: 'career',
        title: 'Job Loyalty vs Job Hopping',
        description: "You've been at your job 2 years earning $55,000. You have an offer for $68,000 elsewhere. Staying might lead to a $3,000 raise. What do you do?",
        choices: [
            {
                id: 'take-new-job',
                label: 'Take the New Job',
                detail: '$68,000/year, new challenges, fresh start',
                cost: -68000,
                frequency: 'yearly',
                qualityScore: 85,
                satisfactionNote: '24% raise, accelerate career growth',
                returnRate: 0,
                incomeChange: 13000
            },
            {
                id: 'negotiate-stay',
                label: 'Use Offer to Negotiate',
                detail: 'Ask current employer to match, might get $62,000',
                cost: -62000,
                frequency: 'yearly',
                qualityScore: 75,
                satisfactionNote: 'Keep relationships, decent raise, some risk',
                returnRate: 0
            },
            {
                id: 'stay-loyal',
                label: 'Stay Loyal, Wait for Raise',
                detail: 'Likely $58,000 next year, known environment',
                cost: -58000,
                frequency: 'yearly',
                qualityScore: 50,
                satisfactionNote: 'Comfortable but leaving money on the table',
                returnRate: 0
            }
        ],
        tip: "Workers who change jobs earn 10-20% more than those who stay. Over 30 years, the $13,000/year difference between $68K and $55K compounds to over $600,000 in additional lifetime earnings!",
        educationalFocus: 'career_growth'
    },
    {
        id: 'career-investment',
        category: 'career',
        title: 'Investing in Your Career',
        description: "You could increase your earning potential with additional education or certifications. But they cost time and money upfront. What's your approach?",
        choices: [
            {
                id: 'professional-cert',
                label: 'Get Professional Certification',
                detail: '$3,000 and 6 months study, ~15% salary increase potential',
                cost: 3000,
                frequency: 'once',
                qualityScore: 90,
                satisfactionNote: 'High ROI, targeted skill boost',
                returnRate: 0.15
            },
            {
                id: 'masters-degree',
                label: 'Pursue Master\'s Degree (Part-time)',
                detail: '$40,000 over 3 years, 20-30% long-term salary boost',
                cost: 40000,
                frequency: 'once',
                qualityScore: 75,
                satisfactionNote: 'Major commitment, significant career pivot potential',
                returnRate: 0.25
            },
            {
                id: 'self-learning',
                label: 'Self-Study & Free Resources',
                detail: 'Online courses, books, networking—$500/year',
                cost: 500,
                frequency: 'yearly',
                qualityScore: 70,
                satisfactionNote: 'Low cost but requires discipline, slower progress',
                returnRate: 0.05
            }
        ],
        tip: "A $3,000 certification that leads to a 15% raise ($8,250/year on a $55K salary) pays for itself in 4 months! Education ROI often beats investment returns—your earning potential is your biggest asset.",
        educationalFocus: 'career_growth'
    },
    {
        id: 'retirement-contribution',
        category: 'career',
        title: '401(k) Match Decision',
        description: "Your employer offers 401(k) matching: they match 50% of your contribution up to 6% of salary. Your salary is $60,000. How much do you contribute?",
        choices: [
            {
                id: 'full-match',
                label: 'Contribute 6% (Get Full Match)',
                detail: '$3,600/year from you + $1,800 free from employer',
                cost: 3600,
                frequency: 'yearly',
                qualityScore: 95,
                satisfactionNote: '50% instant return on your money—can\'t beat it',
                returnRate: 0.50
            },
            {
                id: 'max-contribution',
                label: 'Max Out 401(k) (23%)',
                detail: '$13,800/year contribution, get match plus tax benefits',
                cost: 13800,
                frequency: 'yearly',
                qualityScore: 85,
                satisfactionNote: 'Aggressive retirement saving, less take-home pay',
                returnRate: 0.07
            },
            {
                id: 'skip-401k',
                label: 'Skip 401(k), Need Cash Now',
                detail: 'Keep all salary, miss employer match',
                cost: 0,
                frequency: 'yearly',
                qualityScore: 20,
                satisfactionNote: 'Leaving free money on the table',
                returnRate: 0
            }
        ],
        tip: "Not taking the full employer match is literally refusing free money! That $1,800/year 'free' contribution, invested for 30 years at 7%, becomes ~$170,000. Would you say no to $170,000?",
        educationalFocus: 'compound_interest'
    }
];

// Freeze to prevent modifications
Object.freeze(ScenariosData);

// Make available globally
window.ScenariosData = ScenariosData;
