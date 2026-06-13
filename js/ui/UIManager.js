/**
 * UI Manager - Handles all DOM manipulation and user interactions
 */
class UIManager {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.screens = {};
        this.elements = {};
        this.currentImpact = null;
        
        this.init();
    }

    /**
     * Initialize UI Manager
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.checkSavedGame();
    }

    /**
     * Cache DOM elements for quick access
     */
    cacheElements() {
        // Screens
        this.screens = {
            welcome: document.getElementById('welcome-screen'),
            setup: document.getElementById('setup-screen'),
            tutorial: document.getElementById('tutorial-screen'),
            game: document.getElementById('game-screen'),
            results: document.getElementById('results-screen'),
            summary: document.getElementById('summary-screen')
        };

        // Buttons
        this.elements = {
            // Welcome
            startBtn: document.getElementById('start-btn'),
            continueBtn: document.getElementById('continue-btn'),
            
            // Setup
            setupForm: document.getElementById('setup-form'),
            playerName: document.getElementById('player-name'),
            playerAge: document.getElementById('player-age'),
            playerIncome: document.getElementById('player-income'),
            backToWelcome: document.getElementById('back-to-welcome'),
            
            // Tutorial
            tutorialPrev: document.getElementById('tutorial-prev'),
            tutorialNext: document.getElementById('tutorial-next'),
            tutorialDots: document.querySelectorAll('.tutorial-dots .dot'),
            tutorialSlides: document.querySelectorAll('.tutorial-slide'),
            
            // Game
            playerNameDisplay: document.querySelector('.player-name-display'),
            currentScenarioNum: document.getElementById('current-scenario-num'),
            totalScenarios: document.getElementById('total-scenarios'),
            gameProgressFill: document.getElementById('game-progress-fill'),
            wisdomHud: document.getElementById('wisdom-hud'),
            totalSavings: document.getElementById('total-savings'),
            totalInvested: document.getElementById('total-invested'),
            decisionsMade: document.getElementById('decisions-made'),
            categoryMap: document.getElementById('category-map'),
            achievementShelf: document.getElementById('achievement-shelf'),
            achievementCount: document.getElementById('achievement-count'),
            scenarioCategory: document.getElementById('scenario-category'),
            scenarioTitle: document.getElementById('scenario-title'),
            scenarioDescription: document.getElementById('scenario-description'),
            scenarioStakes: document.getElementById('scenario-stakes'),
            scenarioContextStats: document.getElementById('scenario-context-stats'),
            scenarioAssumptions: document.getElementById('scenario-assumptions'),
            scenarioRiskNote: document.getElementById('scenario-risk-note'),
            scenarioFocus: document.getElementById('scenario-focus'),
            choicesContainer: document.getElementById('choices-container'),
            viewSummaryBtn: document.getElementById('view-summary-btn'),
            
            // Results
            backToScenario: document.getElementById('back-to-scenario'),
            revealKicker: document.getElementById('reveal-kicker'),
            revealHeadline: document.getElementById('reveal-headline'),
            revealAmount: document.getElementById('reveal-amount'),
            revealBody: document.getElementById('reveal-body'),
            chosenOption: document.getElementById('chosen-option'),
            yourChoiceCost: document.getElementById('your-choice-cost'),
            alternativeCost: document.getElementById('alternative-cost'),
            costDifference: document.getElementById('cost-difference'),
            resultBreakdownGrid: document.getElementById('result-breakdown-grid'),
            resultAchievements: document.getElementById('result-achievements'),
            resultActionText: document.getElementById('result-action-text'),
            chartTabs: document.querySelectorAll('.chart-tab'),
            tipText: document.getElementById('tip-text'),
            nextScenarioBtn: document.getElementById('next-scenario-btn'),
            
            // Summary
            summaryTotalSavings: document.getElementById('summary-total-savings'),
            summaryInvested: document.getElementById('summary-invested'),
            summaryMonthly: document.getElementById('summary-monthly'),
            decisionsList: document.getElementById('decisions-list'),
            biggestImpactCard: document.getElementById('biggest-impact-card'),
            categorySummary: document.getElementById('category-summary'),
            achievementsGallery: document.getElementById('achievements-gallery'),
            finalTakeawaysList: document.getElementById('final-takeaways-list'),
            wisdomScoreValue: document.getElementById('wisdom-score-value'),
            wisdomMessage: document.getElementById('wisdom-message'),
            continueGameBtn: document.getElementById('continue-game-btn'),
            playAgainBtn: document.getElementById('play-again-btn'),
            shareResultsBtn: document.getElementById('share-results-btn'),
            achievementToastContainer: document.getElementById('achievement-toast-container')
        };
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Welcome screen
        this.elements.startBtn.addEventListener('click', () => this.showScreen('setup'));
        this.elements.continueBtn.addEventListener('click', () => this.continueGame());
        
        // Setup screen
        this.elements.setupForm.addEventListener('submit', (e) => this.handleSetupSubmit(e));
        this.elements.backToWelcome.addEventListener('click', () => this.showScreen('welcome'));
        
        // Tutorial
        this.elements.tutorialPrev.addEventListener('click', () => this.prevTutorialSlide());
        this.elements.tutorialNext.addEventListener('click', () => this.nextTutorialSlide());
        this.elements.tutorialDots.forEach(dot => {
            dot.addEventListener('click', () => this.goToTutorialSlide(parseInt(dot.dataset.slide)));
        });
        
        // Game screen
        this.elements.viewSummaryBtn.addEventListener('click', () => this.showSummary());
        
        // Results screen
        this.elements.backToScenario.addEventListener('click', () => this.showScreen('game'));
        this.elements.chartTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchChartView(tab.dataset.view));
        });
        this.elements.nextScenarioBtn.addEventListener('click', () => this.handleNextScenario());
        
        // Summary screen
        this.elements.continueGameBtn.addEventListener('click', () => {
            this.loadCurrentScenario();
            this.showScreen('game');
        });
        this.elements.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.elements.shareResultsBtn.addEventListener('click', () => this.shareResults());
        
        // Game engine events
        this.game.on('choiceMade', (data) => this.onChoiceMade(data));
        this.game.on('scenarioChanged', (data) => this.onScenarioChanged(data));
        this.game.on('gameComplete', (data) => this.onGameComplete(data));
        this.game.on('achievementsUnlocked', (achievements) => this.showAchievementToasts(achievements));
    }

    /**
     * Check for saved game and show continue button
     */
    checkSavedGame() {
        if (this.game.hasSavedGame()) {
            const saveInfo = this.game.getSaveInfo();
            if (saveInfo && saveInfo.scenarioProgress > 0) {
                this.elements.continueBtn.style.display = 'block';
                this.elements.continueBtn.textContent = `Continue as ${saveInfo.playerName} (${saveInfo.scenarioProgress}/${saveInfo.totalScenarios})`;
            }
        }
    }

    /**
     * Show a specific screen
     * @param {string} screenName - Name of the screen to show
     */
    async showScreen(screenName) {
        const currentScreen = Object.values(this.screens).find(s => s.classList.contains('active'));
        const targetScreen = this.screens[screenName];
        
        if (currentScreen && targetScreen && currentScreen !== targetScreen) {
            await Animations.transitionScreens(currentScreen, targetScreen);
        } else if (targetScreen) {
            Object.values(this.screens).forEach(s => s.classList.remove('active'));
            targetScreen.classList.add('active');
        }
    }

    /**
     * Handle setup form submission
     * @param {Event} e - Form submit event
     */
    handleSetupSubmit(e) {
        e.preventDefault();
        
        const profile = {
            name: this.elements.playerName.value.trim(),
            age: this.elements.playerAge.value,
            income: this.elements.playerIncome.value
        };
        
        if (!profile.name || !profile.age || !profile.income) {
            Animations.shake(this.elements.setupForm);
            return;
        }
        
        this.game.initializePlayer(profile);
        this.currentTutorialSlide = 1;
        this.showScreen('tutorial');
    }

    /**
     * Continue saved game
     */
    continueGame() {
        if (this.game.loadState()) {
            this.updateDashboard();
            this.loadCurrentScenario();
            this.showScreen('game');
        }
    }

    // ===== Tutorial Navigation =====
    
    currentTutorialSlide = 1;
    
    prevTutorialSlide() {
        if (this.currentTutorialSlide > 1) {
            this.goToTutorialSlide(this.currentTutorialSlide - 1);
        }
    }
    
    nextTutorialSlide() {
        if (this.currentTutorialSlide < 3) {
            this.goToTutorialSlide(this.currentTutorialSlide + 1);
        } else {
            // Start the game
            this.loadCurrentScenario();
            this.showScreen('game');
        }
    }
    
    goToTutorialSlide(slideNum) {
        this.currentTutorialSlide = slideNum;
        
        // Update slides
        this.elements.tutorialSlides.forEach(slide => {
            slide.classList.toggle('active', parseInt(slide.dataset.slide) === slideNum);
        });
        
        // Update dots
        this.elements.tutorialDots.forEach(dot => {
            dot.classList.toggle('active', parseInt(dot.dataset.slide) === slideNum);
        });
        
        // Update buttons
        this.elements.tutorialPrev.style.visibility = slideNum === 1 ? 'hidden' : 'visible';
        this.elements.tutorialNext.textContent = slideNum === 3 ? "Let's Begin! →" : 'Next →';
    }

    // ===== Game Screen =====
    
    /**
     * Load and display current scenario
     */
    loadCurrentScenario() {
        const scenario = this.game.getCurrentScenario();
        if (!scenario) {
            this.showSummary();
            return;
        }
        
        const progress = this.game.getProgress();
        const categoryInfo = this.game.scenarioManager.getCategoryInfo(scenario);
        
        // Update header
        this.elements.playerNameDisplay.textContent = this.game.state.player.name;
        this.elements.currentScenarioNum.textContent = progress.current;
        this.elements.totalScenarios.textContent = progress.total;
        
        // Update dashboard
        this.updateDashboard();
        this.renderCategoryMap();
        this.renderAchievementShelf();
        
        // Update scenario card
        this.elements.scenarioCategory.textContent = categoryInfo.label;
        this.elements.scenarioCategory.style.backgroundColor = categoryInfo.color;
        this.elements.scenarioTitle.textContent = scenario.title;
        this.elements.scenarioDescription.textContent = scenario.description;
        this.renderScenarioIntel(scenario);
        
        // Render choices
        this.renderChoices(scenario);
    }
    
    /**
     * Render choice buttons
     * @param {Array} choices - Array of choice objects
     */
    renderChoices(scenario) {
        this.elements.choicesContainer.innerHTML = '';
        const choices = scenario.choices;
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.dataset.index = index;
            
            const frequencyText = Helpers.getFrequencyText(choice.frequency);
            const costDisplay = Helpers.formatCurrency(choice.cost, choice.cost < 10) + frequencyText;
            const impact = Calculator.calculateScenarioImpact(scenario, index);
            const thirtyYear = impact.byTimeframe[30];
            const annualImpact = impact.annualCostVsCheapest;
            const investedSwing = choice.cost < 0 && thirtyYear.wealthOutcome?.netWorth
                ? thirtyYear.wealthOutcome.netWorth
                : impact.chosen.isCheapest
                    ? thirtyYear.savingsVsExpensive.invested
                    : thirtyYear.costVsCheapest.invested;
            const swingLabel = choice.cost < 0 || impact.chosen.isCheapest ? '30y upside' : '30y extra cost';
            const annualLabel = annualImpact === 0 ? 'Best value baseline' : `${Helpers.formatCurrency(annualImpact)}/yr vs baseline`;
            const meters = (choice.display?.meters || []).map(meter => `
                <div class="choice-meter">
                    <span>${meter.label}</span>
                    <div class="meter-track"><span style="width: ${Helpers.clamp(meter.value, 0, 100)}%"></span></div>
                    <strong>${Math.round(meter.value)}</strong>
                </div>
            `).join('');
            
            button.innerHTML = `
                <div class="choice-badge-row">
                    <span class="choice-badge">${choice.display?.badge || 'Money move'}</span>
                    <span class="choice-swing">${swingLabel}: ${Helpers.formatCurrency(Math.abs(investedSwing))}</span>
                </div>
                <div class="choice-content">
                    <span class="choice-label">${choice.label}</span>
                    <span class="choice-detail">${choice.detail}</span>
                    <span class="choice-note">${choice.display?.oneLine || choice.satisfactionNote || ''}</span>
                </div>
                <div class="choice-metrics">${meters}</div>
                <div class="choice-footer">
                    <span class="choice-annual">${annualLabel}</span>
                    <span class="choice-cost">${costDisplay}</span>
                </div>
            `;
            
            button.addEventListener('click', () => this.handleChoiceClick(index));
            
            this.elements.choicesContainer.appendChild(button);
        });
        
        // Stagger animate choices
        Animations.staggerIn(this.elements.choicesContainer.querySelectorAll('.choice-btn'));
    }

    /**
     * Render scenario context, assumptions, and educational framing.
     * @param {Object} scenario - Current scenario
     */
    renderScenarioIntel(scenario) {
        if (this.elements.scenarioStakes) {
            this.elements.scenarioStakes.textContent = scenario.stakes || '';
        }

        if (this.elements.scenarioContextStats) {
            this.elements.scenarioContextStats.innerHTML = (scenario.contextStats || []).map(stat => `
                <div class="context-stat">
                    <span>${stat.label}</span>
                    <strong>${stat.value}</strong>
                </div>
            `).join('');
        }

        if (this.elements.scenarioAssumptions) {
            this.elements.scenarioAssumptions.innerHTML = (scenario.assumptions || []).map(assumption => `
                <span class="assumption-chip">${assumption}</span>
            `).join('');
        }

        if (this.elements.scenarioRiskNote) {
            this.elements.scenarioRiskNote.textContent = scenario.riskNote || 'Every money choice has tradeoffs beyond the spreadsheet.';
        }

        if (this.elements.scenarioFocus) {
            const focus = (scenario.educationalFocus || 'money tradeoff').replace(/_/g, ' ');
            this.elements.scenarioFocus.textContent = focus;
        }
    }

    /**
     * Render category progress pills.
     */
    renderCategoryMap() {
        if (!this.elements.categoryMap) return;

        const progress = this.game.state.categoryProgress || {};
        const categories = Object.values(Constants.CATEGORIES);
        this.elements.categoryMap.innerHTML = categories.map(category => {
            const data = progress[category.id] || { completed: 0, total: this.game.scenarioManager.getScenariosByCategory(category.id).length, percentage: 0 };
            return `
                <div class="category-node" style="--category-color: ${category.color}">
                    <span class="category-icon">${category.icon}</span>
                    <div class="category-node-body">
                        <span>${category.label}</span>
                        <div class="mini-progress"><span style="width: ${data.percentage || 0}%"></span></div>
                    </div>
                    <strong>${data.completed || 0}/${data.total || 0}</strong>
                </div>
            `;
        }).join('');
    }

    /**
     * Render compact achievement shelf during play.
     */
    renderAchievementShelf() {
        if (!this.elements.achievementShelf) return;

        const achievements = this.game.state.achievements || [];
        if (this.elements.achievementCount) {
            this.elements.achievementCount.textContent = achievements.length;
        }

        if (achievements.length === 0) {
            this.elements.achievementShelf.innerHTML = '<div class="empty-shelf">No badges yet</div>';
            return;
        }

        this.elements.achievementShelf.innerHTML = achievements.slice(-4).map(achievement => `
            <div class="shelf-badge" title="${achievement.description}">
                <span>${achievement.icon}</span>
                <strong>${achievement.title}</strong>
            </div>
        `).join('');
    }
    
    /**
     * Handle choice button click
     * @param {number} choiceIndex - Index of selected choice
     */
    handleChoiceClick(choiceIndex) {
        // Visual feedback
        const buttons = this.elements.choicesContainer.querySelectorAll('.choice-btn');
        buttons.forEach((btn, i) => {
            btn.classList.toggle('selected', i === choiceIndex);
        });
        
        // Process choice
        const result = this.game.makeChoice(choiceIndex);
        if (result) {
            this.currentImpact = result.impact;
            this.showResults(result);
        }
    }
    
    /**
     * Update dashboard values
     */
    updateDashboard() {
        const state = this.game.state;
        
        // Use Net Worth if available (it includes asset growth), otherwise fallback to savings
        const displayValue = (state.totalNetWorth !== undefined && state.totalNetWorth !== 0) ? state.totalNetWorth : state.totalNominalSavings;

        // Animate number updates
        Animations.countUp(
            this.elements.totalSavings, 
            displayValue, 
            800, 
            '$'
        );
        
        Animations.countUp(
            this.elements.totalInvested, 
            state.totalInvestedSavings, 
            800, 
            '$'
        );
        
        this.elements.decisionsMade.textContent = state.decisions.length;
        if (this.elements.wisdomHud) {
            this.elements.wisdomHud.textContent = state.wisdomScore || 0;
        }
        if (this.elements.gameProgressFill) {
            const progress = this.game.getProgress();
            this.elements.gameProgressFill.style.width = `${Helpers.clamp(progress.percentage, 0, 100)}%`;
        }
    }

    // ===== Results Screen =====
    
    /**
     * Show results for a decision
     * @param {Object} result - Decision result object
     */
    showResults(result) {
        const { impact } = result;
        const scenario = this.game.scenarioManager.getScenarioById(impact.scenario.id);
        const reveal = this.buildResultReveal(impact, scenario);

        if (this.elements.revealKicker) this.elements.revealKicker.textContent = reveal.kicker;
        if (this.elements.revealHeadline) this.elements.revealHeadline.textContent = reveal.headline;
        if (this.elements.revealAmount) {
            this.elements.revealAmount.textContent = reveal.amountText;
            this.elements.revealAmount.classList.toggle('is-warning', reveal.tone === 'warning');
            this.elements.revealAmount.classList.toggle('is-growth', reveal.tone === 'growth');
        }
        if (this.elements.revealBody) this.elements.revealBody.textContent = reveal.body;
        
        // Update chosen option display
        this.elements.chosenOption.textContent = impact.chosen.label;
        
        // Update comparison cards
        // If user chose the most frugal option, show comparison with most expensive instead
        const isUserFrugal = impact.chosen.isCheapest;
        const comparisonOption = isUserFrugal ? impact.mostExpensive : impact.cheapest;
        
        // NEW LOGIC FOR ASSETS/WEALTH
        const hasAsset = impact.byTimeframe[30].wealthOutcome && impact.byTimeframe[30].wealthOutcome.assetValue > 0;
        const hasWealthGrowth = impact.byTimeframe[30].wealthOutcome && impact.byTimeframe[30].wealthOutcome.netWorth > 0;

        if (hasAsset) {
             // Show Asset Value
             this.elements.yourChoiceCost.textContent = Helpers.formatCurrency(impact.byTimeframe[30].wealthOutcome.assetValue);
             document.querySelector('.comparison-card.your-choice h4').textContent = "Projected Asset Value (30y)";
             
             // Alternative? Maybe show Cost?
             this.elements.alternativeCost.textContent = Helpers.formatCurrency(impact.byTimeframe[30].chosenTotal.nominal);
             document.querySelector('.comparison-card.alternative h4').textContent = "Total Cost Paid (30y)";
             
             // Difference -> Net Equity?
             const equity = impact.byTimeframe[30].wealthOutcome.assetValue - impact.byTimeframe[30].chosenTotal.nominal; // Rough approx
             this.elements.costDifference.textContent = Helpers.formatCurrency(equity);
             document.querySelector('.comparison-card.difference h4').textContent = "Approx. Net Equity";
        } else if (hasWealthGrowth && impact.chosen.cost < 0) {
             // Investment/Income
             this.elements.yourChoiceCost.textContent = Helpers.formatCurrency(impact.byTimeframe[30].wealthOutcome.netWorth);
             document.querySelector('.comparison-card.your-choice h4').textContent = "Projected Wealth (30y)";
             
             this.elements.alternativeCost.textContent = "$0";
             document.querySelector('.comparison-card.alternative h4').textContent = "Baseline";
             
             this.elements.costDifference.textContent = "+" + Helpers.formatCurrency(impact.byTimeframe[30].wealthOutcome.netWorth);
             document.querySelector('.comparison-card.difference h4').textContent = "Net Gain";
        } else {
            // Standard Spending Logic
            document.querySelector('.comparison-card.your-choice h4').textContent = "Your Choice";
            const alternativeCard = document.querySelector('.comparison-card.alternative h4');
            if (alternativeCard) {
                alternativeCard.textContent = isUserFrugal ? 'Most Expensive Option' : 'Most Frugal Option';
            }
            document.querySelector('.comparison-card.difference h4').textContent = "Difference";

            const frequencyText = Helpers.getFrequencyText(impact.chosen.frequency);
            this.elements.yourChoiceCost.textContent = Helpers.formatCurrency(impact.chosen.cost, true) + frequencyText;
            this.elements.alternativeCost.textContent = Helpers.formatCurrency(comparisonOption.cost, true) + frequencyText;
            
            const annualDiff = isUserFrugal ? impact.annualSavingsVsExpensive : impact.annualCostVsCheapest;
            const diffText = annualDiff === 0 ? 'Same!' : Helpers.formatCurrency(annualDiff) + '/year';
            this.elements.costDifference.textContent = diffText;
        }
        
        // Update tip
        this.elements.tipText.textContent = scenario.tip;
        this.renderResultBreakdown(impact, scenario, reveal);
        this.renderResultAchievements(this.game.state.lastUnlocks || []);
        if (this.elements.resultActionText) {
            this.elements.resultActionText.textContent = scenario.actionTakeaway || 'Use the visible tradeoff to make the next decision more intentional.';
        }
        
        // Update next button text
        const hasNext = this.game.scenarioManager.hasNextScenario();
        this.elements.nextScenarioBtn.textContent = hasNext ? 'Next Scenario →' : 'See Final Results →';
        
        // Create chart
        this.switchChartView('nominal');
        
        // Show results screen
        this.showScreen('results');
    }

    /**
     * Build the headline model for the result reveal.
     * @param {Object} impact - Scenario impact
     * @param {Object} scenario - Scenario data
     * @returns {Object} Reveal display model
     */
    buildResultReveal(impact, scenario) {
        const thirtyYear = impact.byTimeframe[30];
        const wealthOutcome = thirtyYear.wealthOutcome || {};

        if (wealthOutcome.assetValue > 0) {
            return {
                kicker: 'Asset path',
                headline: scenario.reveal?.headline || 'This choice builds an asset over time',
                amountText: Helpers.formatCurrency(wealthOutcome.assetValue),
                body: scenario.reveal?.body || 'The projection includes asset appreciation, which makes the result different from a pure spending choice.',
                tone: 'growth',
                value: wealthOutcome.assetValue
            };
        }

        if (impact.chosen.cost < 0 && wealthOutcome.netWorth > 0) {
            return {
                kicker: 'Wealth engine',
                headline: scenario.reveal?.headline || 'This choice puts money to work',
                amountText: Helpers.formatCurrency(wealthOutcome.netWorth),
                body: scenario.reveal?.body || 'Regular contributions compound because each month buys more future growth.',
                tone: 'growth',
                value: wealthOutcome.netWorth
            };
        }

        if (impact.chosen.isCheapest) {
            const upside = thirtyYear.savingsVsExpensive.invested;
            return {
                kicker: 'Future upside',
                headline: scenario.reveal?.headline || 'You defended future flexibility',
                amountText: Helpers.formatCurrency(upside),
                body: scenario.reveal?.body || 'Choosing the lower-cost option creates money that can be redirected into future goals.',
                tone: 'growth',
                value: upside
            };
        }

        const cost = thirtyYear.costVsCheapest.invested;
        return {
            kicker: 'Opportunity cost',
            headline: scenario.reveal?.headline || 'This upgrade has a visible long-term price',
            amountText: Helpers.formatCurrency(cost),
            body: scenario.reveal?.body || 'The choice may be worth it, but now the future cost is visible instead of hidden.',
            tone: cost > 0 ? 'warning' : 'growth',
            value: cost
        };
    }

    /**
     * Render result detail cards.
     * @param {Object} impact - Impact data
     * @param {Object} scenario - Scenario data
     * @param {Object} reveal - Reveal model
     */
    renderResultBreakdown(impact, scenario, reveal) {
        if (!this.elements.resultBreakdownGrid) return;

        const thirtyYear = impact.byTimeframe[30];
        const chosenAnnual = impact.chosen.annualCost || 0;
        const annualDelta = impact.chosen.isCheapest ? impact.annualSavingsVsExpensive : impact.annualCostVsCheapest;
        const monthlyDelta = annualDelta / 12;
        const qualityScore = impact.chosen.qualityScore || 70;
        const cards = [
            {
                label: 'Annual swing',
                value: Helpers.formatCurrency(Math.abs(annualDelta)),
                note: impact.chosen.isCheapest ? 'saved vs premium' : 'extra vs baseline'
            },
            {
                label: 'Monthly pressure',
                value: Helpers.formatCurrency(Math.abs(monthlyDelta)),
                note: monthlyDelta === 0 ? 'no gap' : 'budget effect'
            },
            {
                label: '30-year nominal',
                value: Helpers.formatCurrency(Math.abs(impact.chosen.isCheapest ? thirtyYear.savingsVsExpensive.nominal : thirtyYear.costVsCheapest.nominal)),
                note: 'before growth'
            },
            {
                label: 'Experience score',
                value: `${qualityScore}/100`,
                note: impact.chosen.display?.badge || 'choice feel'
            },
            {
                label: 'Your cost rate',
                value: Helpers.formatCurrency(chosenAnnual),
                note: 'annualized'
            },
            {
                label: reveal.kicker,
                value: reveal.amountText,
                note: '30-year lens'
            }
        ];

        this.elements.resultBreakdownGrid.innerHTML = cards.map(card => `
            <div class="breakdown-card">
                <span>${card.label}</span>
                <strong>${card.value}</strong>
                <small>${card.note}</small>
            </div>
        `).join('');
    }

    /**
     * Render achievements unlocked by the latest choice.
     * @param {Array} achievements - Newly unlocked achievements
     */
    renderResultAchievements(achievements) {
        if (!this.elements.resultAchievements) return;

        if (!achievements.length) {
            this.elements.resultAchievements.innerHTML = '';
            return;
        }

        this.elements.resultAchievements.innerHTML = `
            <span class="section-kicker">Badge unlocked</span>
            <div class="result-badge-row">
                ${achievements.map(achievement => `
                    <div class="result-badge">
                        <span>${achievement.icon}</span>
                        <div>
                            <strong>${achievement.title}</strong>
                            <small>${achievement.description}</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    /**
     * Switch chart view between nominal and invested
     * @param {string} view - 'nominal' or 'invested'
     */
    switchChartView(view) {
        // Update tabs
        this.elements.chartTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });
        
        // Update chart
        if (this.currentImpact) {
            Charts.createResultsChart('results-chart', this.currentImpact, view);
        }
    }
    
    /**
     * Handle next scenario button click
     */
    handleNextScenario() {
        const next = this.game.nextScenario();
        if (next) {
            this.loadCurrentScenario();
            this.showScreen('game');
        } else {
            this.showSummary();
        }
    }

    // ===== Event Handlers =====
    
    onChoiceMade(data) {
        this.updateDashboard();
        this.renderCategoryMap();
        this.renderAchievementShelf();
    }
    
    onScenarioChanged(data) {
        // Handled by handleNextScenario
    }
    
    onGameComplete(summary) {
        this.showSummary(summary);
    }

    // ===== Summary Screen =====
    
    /**
     * Show game summary
     * @param {Object} summary - Optional summary data
     */
    showSummary(summary = null) {
        if (!summary) {
            if (!this.game.state.isComplete && this.game.scenarioManager.isComplete()) {
                this.game.completeGame();
            }
            summary = this.game.getFinalSummary();
        }
        
        Animations.countUp(
            this.elements.summaryTotalSavings,
            summary.cumulativeImpact.byTimeframe[30]?.totalSavingsNominal || 0,
            Constants.UI.COUNTER_DURATION,
            '$'
        );

        Animations.countUp(
            this.elements.summaryInvested,
            summary.cumulativeImpact.byTimeframe[30]?.totalSavingsInvested || 0,
            Constants.UI.COUNTER_DURATION,
            '$'
        );

        Animations.countUp(
            this.elements.summaryMonthly,
            summary.monthlySavingsPotential,
            Constants.UI.COUNTER_DURATION,
            '$'
        );
        
        // Render decisions list
        this.renderDecisionsList(summary.decisions);
        
        // Render biggest impact
        this.renderBiggestImpact(summary.biggestImpactDecision, summary.biggestImpactAmount);
        this.renderCategorySummary(summary);
        this.renderAchievementsGallery(summary.achievements || []);
        this.renderFinalTakeaways(summary.decisions);
        
        Animations.countUp(this.elements.wisdomScoreValue, summary.wisdomScore, Constants.UI.COUNTER_DURATION);
        this.elements.wisdomMessage.textContent = summary.wisdomMessage;
        if (this.elements.continueGameBtn) {
            this.elements.continueGameBtn.style.display = this.game.state.isComplete ? 'none' : 'inline-flex';
        }

        this.showScreen('summary').then(() => {
            requestAnimationFrame(() => {
                Charts.createSummaryChart('summary-chart', summary.decisions);
                Charts.createCategoryChart('category-chart', summary.decisions);
            });
        });
    }
    
    /**
     * Render the decisions list
     * @param {Array} decisions - Array of decisions
     */
    renderDecisionsList(decisions) {
        this.elements.decisionsList.innerHTML = '';
        
        decisions.forEach(decision => {
            const item = document.createElement('div');
            item.className = 'decision-item';
            
            const costVsCheapest = decision.impact.annualCostVsCheapest;
            const impactClass = costVsCheapest === 0 ? 'neutral' : 
                               costVsCheapest > 0 ? 'negative' : 'positive';
            const impactText = costVsCheapest === 0 ? 'Best Value' :
                              costVsCheapest > 0 ? `+${Helpers.formatCurrency(costVsCheapest)}/yr` :
                              `${Helpers.formatCurrency(costVsCheapest)}/yr`;
            
            item.innerHTML = `
                <div class="decision-info">
                    <span class="decision-scenario">${decision.scenarioTitle}</span>
                    <span class="decision-choice">${decision.chosenChoice.label}</span>
                </div>
                <span class="decision-impact ${impactClass}">${impactText}</span>
            `;
            
            this.elements.decisionsList.appendChild(item);
        });
        
        this.elements.decisionsList.querySelectorAll('.decision-item').forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
    }
    
    /**
     * Render biggest impact card
     * @param {Object} decision - Biggest impact decision
     * @param {number} amount - Impact amount
     */
    renderBiggestImpact(decision, amount) {
        if (!decision) {
            this.elements.biggestImpactCard.innerHTML = '<p>All choices were equally frugal!</p>';
            return;
        }
        
        this.elements.biggestImpactCard.innerHTML = `
            <div class="scenario-name">${decision.scenarioTitle}</div>
            <div class="impact-amount">${Helpers.formatCurrency(amount)}</div>
            <div class="impact-description">
                Choosing "${decision.chosenChoice.label}" instead of the most frugal option
                could cost this much over 30 years (if invested)
            </div>
        `;
    }

    /**
     * Render category completion and impact summary.
     * @param {Object} summary - Final summary
     */
    renderCategorySummary(summary) {
        if (!this.elements.categorySummary) return;

        const categoryImpact = this.getCategoryImpact(summary.decisions);
        const categoryProgress = summary.categoryProgress || this.game.state.categoryProgress || {};

        this.elements.categorySummary.innerHTML = Object.values(Constants.CATEGORIES).map(category => {
            const progress = categoryProgress[category.id] || { completed: 0, total: 0, percentage: 0 };
            const impact = categoryImpact[category.id] || 0;
            return `
                <div class="category-summary-row" style="--category-color: ${category.color}">
                    <div>
                        <span>${category.icon}</span>
                        <strong>${category.label}</strong>
                    </div>
                    <div class="category-summary-meta">
                        <span>${progress.completed}/${progress.total}</span>
                        <strong>${Helpers.formatCurrency(Math.abs(impact))}</strong>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Render final achievement gallery.
     * @param {Array} achievements - Earned achievements
     */
    renderAchievementsGallery(achievements) {
        if (!this.elements.achievementsGallery) return;

        if (!achievements.length) {
            this.elements.achievementsGallery.innerHTML = '<div class="empty-shelf">No badges earned yet</div>';
            return;
        }

        this.elements.achievementsGallery.innerHTML = achievements.map(achievement => `
            <div class="gallery-badge">
                <span>${achievement.icon}</span>
                <strong>${achievement.title}</strong>
                <small>${achievement.description}</small>
            </div>
        `).join('');
    }

    /**
     * Render concise action takeaways from the highest-impact choices.
     * @param {Array} decisions - Decision records
     */
    renderFinalTakeaways(decisions) {
        if (!this.elements.finalTakeawaysList) return;

        const ranked = [...decisions].sort((a, b) => {
            const aImpact = Math.abs(a.impact.byTimeframe[30]?.costVsCheapest?.invested || a.impact.byTimeframe[30]?.savingsVsExpensive?.invested || 0);
            const bImpact = Math.abs(b.impact.byTimeframe[30]?.costVsCheapest?.invested || b.impact.byTimeframe[30]?.savingsVsExpensive?.invested || 0);
            return bImpact - aImpact;
        }).slice(0, 4);

        this.elements.finalTakeawaysList.innerHTML = ranked.map(decision => {
            const scenario = this.game.scenarioManager.getScenarioById(decision.scenarioId);
            return `
                <div class="takeaway-card">
                    <span>${decision.scenarioTitle}</span>
                    <strong>${scenario?.actionTakeaway || 'Make this choice intentional before it becomes automatic.'}</strong>
                </div>
            `;
        }).join('');
    }

    /**
     * Group 30-year invested impact by category.
     * @param {Array} decisions - Decision records
     * @returns {Object} Category impact map
     */
    getCategoryImpact(decisions) {
        return decisions.reduce((acc, decision) => {
            const scenario = this.game.scenarioManager.getScenarioById(decision.scenarioId);
            if (!scenario) return acc;
            const impact = decision.impact.byTimeframe[30]?.costVsCheapest?.invested ||
                decision.impact.byTimeframe[30]?.savingsVsExpensive?.invested ||
                0;
            acc[scenario.category] = (acc[scenario.category] || 0) + impact;
            return acc;
        }, {});
    }

    /**
     * Show achievement unlock toasts.
     * @param {Array} achievements - Newly unlocked achievements
     */
    showAchievementToasts(achievements) {
        if (!this.elements.achievementToastContainer || !achievements.length) return;

        achievements.forEach((achievement, index) => {
            const toast = document.createElement('div');
            toast.className = 'achievement-toast';
            toast.innerHTML = `
                <span>${achievement.icon}</span>
                <div>
                    <strong>${achievement.title}</strong>
                    <small>${achievement.description}</small>
                </div>
            `;

            setTimeout(() => {
                this.elements.achievementToastContainer.appendChild(toast);
                requestAnimationFrame(() => toast.classList.add('visible'));
                setTimeout(() => {
                    toast.classList.remove('visible');
                    setTimeout(() => toast.remove(), 300);
                }, 3500);
            }, index * 150);
        });
    }
    
    /**
     * Reset game and start over
     */
    resetGame() {
        this.game.reset();
        Charts.destroyAll();
        this.elements.continueBtn.style.display = 'none';
        this.showScreen('welcome');
    }
    
    /**
     * Share results (basic implementation)
     */
    shareResults() {
        const summary = this.game.getFinalSummary();
        const text = `I just completed the Money Choices game! 💰\n\n` +
            `My Financial Wisdom Score: ${summary.wisdomScore}/100\n` +
            `Potential 30-year savings if invested: ${Helpers.formatCurrency(summary.totalInvestedSavings)}\n\n` +
            `Try it yourself and learn how your spending habits affect your future!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Money Choices - My Results',
                text: text
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert('Results copied to clipboard!');
            }).catch(() => {
                alert(text);
            });
        }
    }
}

// Make available globally
window.UIManager = UIManager;
