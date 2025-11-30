# 💰 Money Choices - Spending Habits Simulator

An interactive educational game that visualizes how daily spending decisions compound over time, teaching financial literacy through real-world scenarios and immediate visual feedback.

![Game Preview](https://img.shields.io/badge/Status-MVP%20Complete-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Static%20Web-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎮 Play the Game

Simply open `index.html` in your browser, or visit the GitHub Pages deployment.

**No installation required!** This is a fully static web application.

## 🎯 What You'll Learn

- How small daily expenses compound over decades
- The power of compound interest and investing
- Opportunity cost of spending vs. saving
- Real-world financial decision-making
- The impact of lifestyle choices on long-term wealth

## 🎲 How It Works

1. **Setup**: Enter your name, age, and income range
2. **Learn**: Quick 3-slide tutorial on financial concepts
3. **Decide**: Face real-world spending scenarios
4. **Visualize**: See 1, 5, 10, 20, and 30-year projections
5. **Reflect**: Review your decisions and learn from them

## 📊 Scenarios Included

### Daily Spending
- **Dinner Decisions**: Premium vs budget meals
- **Coffee Question**: Café vs home brew
- **Lunch Break**: Restaurant vs packed lunch

### Transportation
- **Car Purchase**: Luxury vs standard vs used
- **Daily Commute**: Drive vs transit vs bike

### Housing
- **Rent vs Buy**: Homeownership analysis
- **Space vs Savings**: Apartment size trade-offs

### Lifestyle
- **Subscriptions**: Full stack vs curated
- **Phone Upgrades**: Latest vs extended use

## 🧮 Financial Calculations

The game uses real financial formulas:

- **Compound Interest**: `FV = PV × (1 + r)^n`
- **Future Value of Annuity**: For regular savings
- **Opportunity Cost**: What your savings could become if invested (7% annual return)
- **Inflation Adjustment**: Real purchasing power over time (3% inflation)
- **Depreciation**: Asset value loss (cars: 15%/year)
- **Appreciation**: Asset value growth (homes: 3.5%/year)

## 🛠️ Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks, pure JS
- **Chart.js** - Interactive visualizations
- **LocalStorage** - Save game progress

## 📁 Project Structure

```
spending-learning-game/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # Core styles & variables
│   ├── components.css     # UI components
│   └── animations.css     # Transitions & effects
├── js/
│   ├── app.js             # Application entry
│   ├── game/
│   │   ├── GameEngine.js  # Core game logic
│   │   ├── Scenario.js    # Scenario management
│   │   └── Calculator.js  # Financial calculations
│   ├── ui/
│   │   ├── UIManager.js   # DOM manipulation
│   │   ├── Charts.js      # Chart.js wrapper
│   │   └── Animations.js  # Animation helpers
│   ├── data/
│   │   ├── scenarios.js   # All game scenarios
│   │   ├── constants.js   # Financial constants
│   │   └── achievements.js # Achievement definitions
│   └── utils/
│       ├── storage.js     # LocalStorage wrapper
│       └── helpers.js     # Utility functions
├── DEVELOPMENT_PLAN.md    # Full development plan
└── README.md              # This file
```

## 🚀 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spending-learning-game.git
   ```

2. Open `index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

3. Start playing!

## 🎯 Features

### MVP (Current)
- ✅ 8 realistic spending scenarios
- ✅ Interactive choice system
- ✅ 30-year financial projections
- ✅ Visual charts comparing choices
- ✅ Educational tips for each scenario
- ✅ Progress saving (LocalStorage)
- ✅ Wisdom score calculation
- ✅ Mobile-responsive design

### Planned Features
- [ ] More scenario categories
- [ ] Achievement badges
- [ ] Custom scenario builder
- [ ] Regional cost adjustments
- [ ] Social sharing
- [ ] Life simulation mode

## 📈 Financial Assumptions

| Parameter | Value | Source |
|-----------|-------|--------|
| Stock Market Return | 7% | Historical S&P 500 average |
| Inflation Rate | 3% | US historical average |
| Savings Account | 4% | Current high-yield rates |
| Home Appreciation | 3.5% | US housing market average |
| Car Depreciation | 15% | Industry standard |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Chart.js for beautiful visualizations
- The personal finance community for educational content
- Financial literacy advocates everywhere

---

**Remember**: This game is for educational purposes. Real financial decisions should consider your personal circumstances and professional advice.

Made with ❤️ for financial literacy
