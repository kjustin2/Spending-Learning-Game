# Spending Learning Game - Full Development Plan

## 🎯 Game Overview

**Title:** Spending Habits Simulator (or "Money Choices")

**Core Concept:** An interactive educational game that visualizes how daily spending decisions compound over time, teaching financial literacy through real-world scenarios and immediate visual feedback.

**Target Platform:** Static GitHub Pages (HTML/CSS/JavaScript only - no backend)

---

## 🏗️ Architecture

### Technology Stack
```
Frontend Only (Static Site):
├── HTML5 - Structure
├── CSS3 - Styling & Animations
├── Vanilla JavaScript - Game Logic
├── Chart.js - Financial Visualizations
├── LocalStorage - Save Game State
└── GitHub Pages - Hosting
```

### File Structure
```
spending-learning-game/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # Core styles
│   ├── components.css     # UI components
│   └── animations.css     # Transitions & effects
├── js/
│   ├── app.js             # Main application entry
│   ├── game/
│   │   ├── GameEngine.js  # Core game loop & state
│   │   ├── Scenario.js    # Scenario management
│   │   └── Calculator.js  # Financial calculations
│   ├── ui/
│   │   ├── UIManager.js   # DOM manipulation
│   │   ├── Charts.js      # Visualization logic
│   │   └── Animations.js  # Visual effects
│   ├── data/
│   │   ├── scenarios.js   # All game scenarios
│   │   ├── constants.js   # Financial constants (inflation, rates)
│   │   └── achievements.js # Achievement definitions
│   └── utils/
│       ├── storage.js     # LocalStorage wrapper
│       └── helpers.js     # Utility functions
├── assets/
│   ├── images/
│   └── sounds/ (optional)
└── README.md
```

---

## 🎮 Core Game Logic

### 1. Financial Calculation Engine

```javascript
// Core calculations the game will perform:

// Compound Interest (for investments/savings)
FutureValue = PresentValue × (1 + rate)^years

// Cost Over Time
TotalCost = dailyCost × 365 × years
// or
TotalCost = monthlyCost × 12 × years

// Opportunity Cost (what you could have earned investing instead)
OpportunityCost = FutureValue(savings) - ActualSpending

// Inflation Adjustment
RealValue = NominalValue / (1 + inflationRate)^years

// Loan/Mortgage Calculations
MonthlyPayment = P × [r(1+r)^n] / [(1+r)^n – 1]

// Asset Depreciation (cars)
Value = InitialValue × (1 - depreciationRate)^years

// Home Appreciation
Value = InitialValue × (1 + appreciationRate)^years
```

### 2. Game State Model

```javascript
GameState = {
  player: {
    name: string,
    startingAge: number,
    currentAge: number,
    annualIncome: number,
    savings: number,
    investments: number,
    debt: number,
    monthlyExpenses: {}
  },
  simulation: {
    currentYear: number,
    totalYearsSimulated: number,
    decisions: [], // history of choices
    milestones: [] // life events triggered
  },
  settings: {
    inflationRate: 0.03,
    stockMarketReturn: 0.07,
    savingsRate: 0.04,
    homeAppreciation: 0.035
  },
  achievements: [],
  currentScenario: null
}
```

### 3. Scenario System

Each scenario presents a choice with calculated outcomes:

```javascript
Scenario = {
  id: string,
  category: 'daily' | 'monthly' | 'major' | 'investment',
  title: string,
  description: string,
  choices: [
    {
      id: string,
      label: string,
      cost: number,
      frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'once',
      impacts: {
        immediate: { savings: -X, happiness: +Y },
        yearly: { savings: -X },
        opportunity: { investmentLoss: X }
      }
    }
  ],
  timeframes: [1, 5, 10, 20, 30], // years to calculate
  educationalTip: string
}
```

---

## 📋 MVP Features (Version 1.0)

### Core Features

1. **Welcome/Setup Screen**
   - Player name input
   - Starting age selection (18-35)
   - Starting income selection (preset ranges)
   - Brief tutorial modal

2. **Main Game Screen**
   - Current financial snapshot (savings, investments, debt)
   - Active scenario display
   - Choice buttons with immediate cost shown
   - "Calculate Impact" button

3. **Scenario Categories (MVP - 19 scenarios)**

   **Daily Spending:**
   - Pasta example: $5/day vs $1/day dinner
   - Coffee: $6 latte vs $0.50 home brew
   - Lunch: $15 restaurant vs $5 packed lunch

   **Transportation:**
   - New car every 5 years ($40k vs $20k vs $10k used)
   - Car vs Public transit vs Bike

   **Housing:**
   - Rent vs Buy decision
   - Apartment size (studio vs 1BR vs 2BR)

   **Lifestyle:**
   - Subscription services (full stack vs curated)
   - Phone upgrades (latest vs extended use)

   **Investing:**
   - Investment strategy (index funds vs stocks vs HYSA vs checking)
   - Risk tolerance (stocks vs bonds vs balanced)
   - Real estate investing (rental vs REIT vs stocks)
   - Emergency fund priority

   **Credit & Debt:**
   - Credit card strategy (pay full vs carry balance vs debit)
   - Debt payoff vs investing
   - Building credit history

   **Career:**
   - Job hopping vs loyalty
   - Career investment (certifications vs degrees)
   - 401(k) employer match decisions

4. **Results Visualization**
   - Bar chart comparing choices over 1, 5, 10, 20, 30 years
   - Running total of "money saved/lost"
   - Opportunity cost display (if invested instead)

5. **Educational Popups**
   - After each decision, show a "Did you know?" fact
   - Explain compound interest visually
   - Show real purchasing power (inflation adjustment)

6. **Progress Tracking**
   - LocalStorage save/load
   - Scenarios completed counter
   - Total lifetime impact calculated

### MVP User Flow

```
1. Landing Page → "Start Your Journey"
2. Setup: Enter name, age, income
3. Tutorial: Quick 3-slide explanation
4. Main Loop:
   a. Present Scenario
   b. Player selects choice
   c. Show immediate impact
   d. Click "See Long-Term Impact"
   e. Display chart with 1/5/10/20/30 year projections
   f. Show educational tip
   g. "Next Scenario" or "Review My Decisions"
5. Summary Screen (after all scenarios):
   - Total potential savings
   - Biggest impact decisions
   - Achievement badges
   - Share results button
```

---

## 📊 Example Scenarios in Detail

### Scenario 1: The Pasta Problem
```
Title: "Dinner Decisions"
Description: "You eat dinner every night. Let's see how your choice affects your wallet over time."

Choice A: Restaurant-quality pasta ($5/day)
- Daily: $5
- Monthly: ~$150
- Yearly: $1,825
- 30 years: $54,750 (nominal)
- 30 years invested at 7%: $187,000+ (opportunity cost)

Choice B: Budget pasta ($1/day)  
- Daily: $1
- Monthly: ~$30
- Yearly: $365
- 30 years: $10,950 (nominal)
- Savings vs A: $43,800 nominal / $140,000+ with investment growth

Visual: Side-by-side bar chart showing accumulation over time
Tip: "The difference seems small daily, but over 30 years, this single choice could fund a significant portion of your retirement!"
```

### Scenario 2: The Car Conundrum
```
Title: "Wheels of Fortune"
Description: "You need reliable transportation. How much should you spend on a car?"

Choice A: New $40,000 car every 5 years
- Total over 30 years: $240,000 in purchases
- After depreciation, assets worth: ~$15,000
- Net cost: $225,000

Choice B: New $20,000 car every 5 years
- Total over 30 years: $120,000 in purchases
- After depreciation, assets worth: ~$7,500
- Net cost: $112,500
- Savings vs A: $112,500

Choice C: Used $10,000 car every 5 years
- Total over 30 years: $60,000
- Net savings vs A: $165,000
- If invested: $400,000+

Visual: Animated car depreciating + investment growing
Tip: "Cars lose 20% of value the moment you drive off the lot, and 60% within 5 years. Consider this 'invisible cost' of new cars."
```

### Scenario 3: Rent vs Buy
```
Title: "Home Economics"
Description: "Should you rent or buy a home?"

Parameters shown:
- Home price: $300,000
- Down payment: 20% ($60,000)
- Mortgage rate: 6.5%
- Rent: $1,500/month
- Home appreciation: 3.5%/year
- Rent increase: 3%/year

Calculator shows:
- Monthly mortgage payment
- Total interest paid over 30 years
- Home value after 30 years
- Equity built
- Vs rent + investing the down payment

This scenario has a "Customize" button to adjust values
```

---

## 🚀 Future Features (Post-MVP)

### Version 1.1 - Enhanced Scenarios
- [x] Subscription services (streaming, gym, apps) ✅ Implemented
- [x] Investment strategy scenarios (index funds, bonds, HYSA) ✅ Implemented
- [x] Credit card and debt management ✅ Implemented
- [x] Career and income scenarios ✅ Implemented
- [ ] Insurance choices (high vs low deductible)
- [ ] Education (college vs trade school vs self-taught)
- [ ] Side hustle / income boosting scenarios
- [ ] Emergency fund importance scenario

### Version 1.2 - Life Simulation Mode
- [ ] Full life simulation from age 18-65
- [ ] Random life events (job loss, medical emergency, inheritance)
- [ ] Career progression with salary increases
- [ ] Family planning costs
- [ ] Retirement readiness score

### Version 1.3 - Gamification
- [ ] Achievement system (badges for smart choices)
- [ ] Leaderboard (anonymous, opt-in)
- [ ] Daily challenges
- [ ] Streak rewards for returning players
- [ ] Unlockable advanced scenarios

### Version 1.4 - Customization
- [ ] Custom scenario builder
- [ ] Regional cost-of-living adjustments
- [ ] Currency selection
- [ ] Personalized recommendations based on choices
- [ ] "What if I started 5 years earlier?" time machine

### Version 1.5 - Social Features
- [ ] Share results to social media
- [ ] Challenge friends to same scenarios
- [ ] Compare results with peers (age/income bracket)
- [ ] Community-submitted scenarios

### Version 2.0 - Advanced Platform
- [ ] Mobile-responsive redesign
- [ ] Progressive Web App (offline capable)
- [ ] Backend integration (optional accounts)
- [ ] API for financial data (real-time rates)
- [ ] AI-powered personalized advice

---

## 🎨 UI/UX Design Guidelines

### Visual Style
- **Theme:** Clean, modern, trustworthy (think banking app meets game)
- **Colors:** 
  - Primary: Deep blue (#1a365d) - trust
  - Secondary: Green (#38a169) - money/growth
  - Accent: Orange (#dd6b20) - attention/warnings
  - Background: Light gray (#f7fafc)
- **Typography:** 
  - Headers: Bold sans-serif (Inter, Roboto)
  - Body: Clean readable (16px minimum)
  - Numbers: Monospace for financial figures

### Key UI Components

1. **Scenario Card**
   - Large, centered card with scenario description
   - Choice buttons below with clear cost labels
   - "Learn More" expandable section

2. **Financial Dashboard**
   - Top bar showing current stats
   - Animated counters for changes
   - Color-coded (green for gains, red for losses)

3. **Results Chart**
   - Interactive Chart.js visualization
   - Hover for exact values
   - Toggle between nominal/inflation-adjusted
   - Export as image option

4. **Progress Indicator**
   - Scenario X of Y
   - Category icons completed
   - Overall "Financial Wisdom Score"

---

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] All calculations verified against financial calculators
- [ ] LocalStorage save/load works across sessions
- [ ] Responsive design on mobile/tablet/desktop
- [ ] All scenarios completable without errors
- [ ] Charts render correctly with all data ranges
- [ ] Edge cases (0 values, max values, negative numbers)

### Financial Accuracy Testing
- [ ] Compound interest matches online calculators
- [ ] Inflation calculations verified
- [ ] Mortgage calculator matches bank calculators
- [ ] Depreciation rates realistic

---

## 📅 Development Timeline

### Phase 1: Foundation (Week 1)
- [ ] Set up project structure
- [ ] Create HTML skeleton
- [ ] Implement basic CSS framework
- [ ] Build GameEngine.js core
- [ ] Create Calculator.js with all formulas

### Phase 2: Core Features (Week 2)
- [ ] Implement scenario system
- [ ] Create 3 complete scenarios
- [ ] Build UI components
- [ ] Add Chart.js visualizations
- [ ] Implement LocalStorage saving

### Phase 3: Polish & Content (Week 3)
- [ ] Add remaining MVP scenarios
- [ ] Educational content/tips
- [ ] Animations and transitions
- [ ] Mobile responsiveness
- [ ] Accessibility review

### Phase 4: Launch (Week 4)
- [ ] Final testing
- [ ] Bug fixes
- [ ] GitHub Pages deployment
- [ ] README documentation
- [ ] Launch!

---

## 📁 Deliverables Summary

### MVP Deliverables
1. Fully functional static website
2. 5-8 complete financial scenarios
3. Interactive visualizations
4. Save/load functionality
5. Mobile-responsive design
6. Educational content integrated
7. Deployed to GitHub Pages

### Documentation
1. README with project overview
2. How to play guide
3. Technical documentation for contributors
4. Financial assumptions/sources cited
