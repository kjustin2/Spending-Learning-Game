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
            totalSavings: document.getElementById('total-savings'),
            totalInvested: document.getElementById('total-invested'),
            decisionsMade: document.getElementById('decisions-made'),
            scenarioCategory: document.getElementById('scenario-category'),
            scenarioTitle: document.getElementById('scenario-title'),
            scenarioDescription: document.getElementById('scenario-description'),
            choicesContainer: document.getElementById('choices-container'),
            viewSummaryBtn: document.getElementById('view-summary-btn'),
            
            // Results
            backToScenario: document.getElementById('back-to-scenario'),
            chosenOption: document.getElementById('chosen-option'),
            yourChoiceCost: document.getElementById('your-choice-cost'),
            alternativeCost: document.getElementById('alternative-cost'),
            costDifference: document.getElementById('cost-difference'),
            chartTabs: document.querySelectorAll('.chart-tab'),
            tipText: document.getElementById('tip-text'),
            nextScenarioBtn: document.getElementById('next-scenario-btn'),
            
            // Summary
            summaryTotalSavings: document.getElementById('summary-total-savings'),
            summaryInvested: document.getElementById('summary-invested'),
            summaryMonthly: document.getElementById('summary-monthly'),
            decisionsList: document.getElementById('decisions-list'),
            biggestImpactCard: document.getElementById('biggest-impact-card'),
            wisdomScoreValue: document.getElementById('wisdom-score-value'),
            wisdomMessage: document.getElementById('wisdom-message'),
            playAgainBtn: document.getElementById('play-again-btn'),
            shareResultsBtn: document.getElementById('share-results-btn')
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
        this.elements.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.elements.shareResultsBtn.addEventListener('click', () => this.shareResults());
        
        // Game engine events
        this.game.on('choiceMade', (data) => this.onChoiceMade(data));
        this.game.on('scenarioChanged', (data) => this.onScenarioChanged(data));
        this.game.on('gameComplete', (data) => this.onGameComplete(data));
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
        
        // Update scenario card
        this.elements.scenarioCategory.textContent = categoryInfo.label;
        this.elements.scenarioCategory.style.backgroundColor = categoryInfo.color;
        this.elements.scenarioTitle.textContent = scenario.title;
        this.elements.scenarioDescription.textContent = scenario.description;
        
        // Render choices
        this.renderChoices(scenario.choices);
    }
    
    /**
     * Render choice buttons
     * @param {Array} choices - Array of choice objects
     */
    renderChoices(choices) {
        this.elements.choicesContainer.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.dataset.index = index;
            
            const frequencyText = Helpers.getFrequencyText(choice.frequency);
            const costDisplay = Helpers.formatCurrency(choice.cost, choice.cost < 10) + frequencyText;
            
            button.innerHTML = `
                <div class="choice-content">
                    <span class="choice-label">${choice.label}</span>
                    <span class="choice-detail">${choice.detail}</span>
                </div>
                <span class="choice-cost">${costDisplay}</span>
            `;
            
            button.addEventListener('click', () => this.handleChoiceClick(index));
            
            this.elements.choicesContainer.appendChild(button);
        });
        
        // Stagger animate choices
        Animations.staggerIn(this.elements.choicesContainer.querySelectorAll('.choice-btn'));
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
        
        // Animate number updates
        Animations.countUp(
            this.elements.totalSavings, 
            state.totalNominalSavings, 
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
    }

    // ===== Results Screen =====
    
    /**
     * Show results for a decision
     * @param {Object} result - Decision result object
     */
    showResults(result) {
        const { impact } = result;
        const scenario = this.game.scenarioManager.getScenarioById(impact.scenario.id);
        
        // Update chosen option display
        this.elements.chosenOption.textContent = impact.chosen.label;
        
        // Update comparison cards
        // If user chose the most frugal option, show comparison with most expensive instead
        const isUserFrugal = impact.chosen.isCheapest;
        const comparisonOption = isUserFrugal ? impact.mostExpensive : impact.cheapest;
        const alternativeCard = document.querySelector('.comparison-card.alternative h4');
        if (alternativeCard) {
            alternativeCard.textContent = isUserFrugal ? 'Most Expensive Option' : 'Most Frugal Option';
        }
        
        const frequencyText = Helpers.getFrequencyText(impact.chosen.frequency);
        this.elements.yourChoiceCost.textContent = Helpers.formatCurrency(impact.chosen.cost, true) + frequencyText;
        this.elements.alternativeCost.textContent = Helpers.formatCurrency(comparisonOption.cost, true) + frequencyText;
        
        // Calculate the difference based on which comparison we're showing
        const annualDiff = isUserFrugal ? impact.annualSavingsVsExpensive : impact.annualCostVsCheapest;
        const diffText = annualDiff === 0 ? 'Same!' : Helpers.formatCurrency(annualDiff) + '/year';
        this.elements.costDifference.textContent = diffText;
        
        // Update tip
        this.elements.tipText.textContent = scenario.tip;
        
        // Update next button text
        const hasNext = this.game.scenarioManager.hasNextScenario();
        this.elements.nextScenarioBtn.textContent = hasNext ? 'Next Scenario →' : 'See Final Results →';
        
        // Create chart
        this.switchChartView('nominal');
        
        // Show results screen
        this.showScreen('results');
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
            if (!this.game.state.isComplete) {
                this.game.completeGame();
            }
            summary = this.game.getFinalSummary();
        }
        
        // Update stats with animation
        setTimeout(() => {
            Animations.countUp(
                this.elements.summaryTotalSavings,
                summary.cumulativeImpact.byTimeframe[30]?.totalSavingsNominal || 0,
                1500,
                '$'
            );
        }, 200);
        
        setTimeout(() => {
            Animations.countUp(
                this.elements.summaryInvested,
                summary.cumulativeImpact.byTimeframe[30]?.totalSavingsInvested || 0,
                1500,
                '$'
            );
        }, 400);
        
        setTimeout(() => {
            Animations.countUp(
                this.elements.summaryMonthly,
                summary.monthlySavingsPotential,
                1500,
                '$'
            );
        }, 600);
        
        // Render decisions list
        this.renderDecisionsList(summary.decisions);
        
        // Render biggest impact
        this.renderBiggestImpact(summary.biggestImpactDecision, summary.biggestImpactAmount);
        
        // Create summary chart
        setTimeout(() => {
            Charts.createSummaryChart('summary-chart', summary.decisions);
        }, 800);
        
        // Update wisdom score
        setTimeout(() => {
            Animations.countUp(this.elements.wisdomScoreValue, summary.wisdomScore, 1500);
        }, 1000);
        this.elements.wisdomMessage.textContent = summary.wisdomMessage;
        
        this.showScreen('summary');
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
        
        Animations.staggerIn(this.elements.decisionsList.querySelectorAll('.decision-item'));
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
