/**
 * Financial Calculator - Core calculation engine for the game
 */
const Calculator = {
    /**
     * Calculate future value with compound interest
     * FV = PV * (1 + r)^n
     * @param {number} presentValue - Initial amount
     * @param {number} rate - Annual interest rate (decimal)
     * @param {number} years - Number of years
     * @returns {number} Future value
     */
    futureValue(presentValue, rate, years) {
        return presentValue * Math.pow(1 + rate, years);
    },

    /**
     * Calculate future value of regular payments (annuity)
     * Used for calculating what regular savings would grow to
     * FV = PMT * (((1 + r)^n - 1) / r)
     * @param {number} payment - Regular payment amount
     * @param {number} rate - Interest rate per period (annual rate / 12 for monthly)
     * @param {number} periods - Number of periods
     * @returns {number} Future value of annuity
     */
    futureValueAnnuity(payment, rate, periods) {
        if (rate === 0) return payment * periods;
        return payment * ((Math.pow(1 + rate, periods) - 1) / rate);
    },

    /**
     * Calculate annual cost from any frequency
     * @param {number} cost - Cost per frequency
     * @param {string} frequency - Frequency type
     * @returns {number} Annual cost
     */
    annualCost(cost, frequency) {
        const multiplier = Helpers.getFrequencyMultiplier(frequency);
        return cost * multiplier;
    },

    /**
     * Calculate total cost over a period
     * @param {number} cost - Cost per frequency
     * @param {string} frequency - Frequency type
     * @param {number} years - Number of years
     * @returns {number} Total nominal cost
     */
    totalCost(cost, frequency, years) {
        return this.annualCost(cost, frequency) * years;
    },

    /**
     * Calculate inflation-adjusted value
     * @param {number} amount - Nominal amount
     * @param {number} years - Years in the future
     * @param {number} inflationRate - Annual inflation rate
     * @returns {number} Real value in today's dollars
     */
    inflationAdjusted(amount, years, inflationRate = Constants.RATES.INFLATION) {
        return amount / Math.pow(1 + inflationRate, years);
    },

    /**
     * Calculate opportunity cost (what money could have grown to if invested)
     * @param {number} annualAmount - Annual savings/spending difference
     * @param {number} years - Investment period
     * @param {number} returnRate - Expected annual return
     * @returns {number} Future value of invested savings
     */
    opportunityCost(annualAmount, years, returnRate = Constants.RATES.STOCK_MARKET_RETURN) {
        // Calculate as if investing monthly (more realistic)
        const monthlyAmount = annualAmount / 12;
        const monthlyRate = returnRate / 12;
        const months = years * 12;
        return this.futureValueAnnuity(monthlyAmount, monthlyRate, months);
    },

    /**
     * Calculate car depreciation
     * @param {number} initialValue - Purchase price
     * @param {number} years - Years owned
     * @param {number} depreciationRate - Annual depreciation rate
     * @returns {number} Current value
     */
    carDepreciation(initialValue, years, depreciationRate = Constants.RATES.CAR_DEPRECIATION) {
        return initialValue * Math.pow(1 - depreciationRate, years);
    },

    /**
     * Calculate total cost of car ownership over time
     * Accounts for purchasing new cars at intervals
     * @param {number} purchasePrice - Price per car
     * @param {number} yearsPerCar - How long each car is kept
     * @param {number} totalYears - Total calculation period
     * @returns {Object} Breakdown of costs
     */
    carOwnershipCost(purchasePrice, yearsPerCar, totalYears) {
        const numberOfCars = Math.ceil(totalYears / yearsPerCar);
        const totalPurchases = purchasePrice * numberOfCars;
        
        // Value of final car at end of period
        const yearsWithLastCar = totalYears % yearsPerCar || yearsPerCar;
        const finalCarValue = this.carDepreciation(purchasePrice, yearsWithLastCar);
        
        return {
            totalPurchases,
            numberOfCars,
            finalCarValue,
            netCost: totalPurchases - finalCarValue
        };
    },

    /**
     * Calculate home value appreciation
     * @param {number} initialValue - Purchase price
     * @param {number} years - Years owned
     * @param {number} appreciationRate - Annual appreciation rate
     * @returns {number} Future home value
     */
    homeAppreciation(initialValue, years, appreciationRate = Constants.RATES.HOME_APPRECIATION) {
        return initialValue * Math.pow(1 + appreciationRate, years);
    },

    /**
     * Calculate monthly mortgage payment
     * M = P * [r(1+r)^n] / [(1+r)^n - 1]
     * @param {number} principal - Loan amount
     * @param {number} annualRate - Annual interest rate
     * @param {number} years - Loan term in years
     * @returns {number} Monthly payment
     */
    mortgagePayment(principal, annualRate, years) {
        const monthlyRate = annualRate / 12;
        const payments = years * 12;
        
        if (monthlyRate === 0) return principal / payments;
        
        return principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
            (Math.pow(1 + monthlyRate, payments) - 1);
    },

    /**
     * Calculate total mortgage cost breakdown
     * @param {number} homePrice - Home purchase price
     * @param {number} downPaymentPercent - Down payment as decimal
     * @param {number} annualRate - Annual interest rate
     * @param {number} years - Loan term
     * @returns {Object} Mortgage breakdown
     */
    mortgageBreakdown(homePrice, downPaymentPercent, annualRate, years) {
        const downPayment = homePrice * downPaymentPercent;
        const principal = homePrice - downPayment;
        const monthlyPayment = this.mortgagePayment(principal, annualRate, years);
        const totalPayments = monthlyPayment * years * 12;
        const totalInterest = totalPayments - principal;
        
        return {
            downPayment,
            principal,
            monthlyPayment,
            totalPayments,
            totalInterest,
            totalCost: totalPayments + downPayment
        };
    },

    /**
     * Compare two spending choices and calculate the difference over time
     * @param {Object} choice1 - First choice {cost, frequency}
     * @param {Object} choice2 - Second choice {cost, frequency}
     * @param {Array} timeframes - Array of years to calculate
     * @returns {Object} Comparison results
     */
    compareChoices(choice1, choice2, timeframes = Constants.TIME_PERIODS) {
        const annual1 = this.annualCost(choice1.cost, choice1.frequency);
        const annual2 = this.annualCost(choice2.cost, choice2.frequency);
        const annualDifference = Math.abs(annual1 - annual2);
        
        const cheaper = annual1 < annual2 ? choice1 : choice2;
        const expensive = annual1 >= annual2 ? choice1 : choice2;
        
        const results = {
            choice1: { ...choice1, annualCost: annual1 },
            choice2: { ...choice2, annualCost: annual2 },
            annualDifference,
            cheaperChoice: cheaper,
            expensiveChoice: expensive,
            byTimeframe: {}
        };
        
        timeframes.forEach(years => {
            const nominalSavings = annualDifference * years;
            const investedSavings = this.opportunityCost(annualDifference, years);
            
            results.byTimeframe[years] = {
                years,
                nominalSavings,
                investedSavings,
                inflationAdjusted: this.inflationAdjusted(nominalSavings, years),
                choice1Total: annual1 * years,
                choice2Total: annual2 * years
            };
        });
        
        return results;
    },

    /**
     * Calculate scenario impact for all choices
     * @param {Object} scenario - Scenario object
     * @param {number} chosenIndex - Index of chosen choice
     * @returns {Object} Impact analysis
     */
    calculateScenarioImpact(scenario, chosenIndex) {
        const choices = scenario.choices;
        const chosen = choices[chosenIndex];
        
        // Find the cheapest and most expensive options
        const sortedByCost = [...choices].sort((a, b) => {
            const costA = this.annualCost(a.cost, a.frequency);
            const costB = this.annualCost(b.cost, b.frequency);
            return costA - costB;
        });
        
        const cheapest = sortedByCost[0];
        const mostExpensive = sortedByCost[sortedByCost.length - 1];
        
        const chosenAnnual = this.annualCost(chosen.cost, chosen.frequency);
        const cheapestAnnual = this.annualCost(cheapest.cost, cheapest.frequency);
        const mostExpensiveAnnual = this.annualCost(mostExpensive.cost, mostExpensive.frequency);
        
        // Calculate savings vs most expensive and cost vs cheapest
        const savingsVsExpensive = mostExpensiveAnnual - chosenAnnual;
        const costVsCheapest = chosenAnnual - cheapestAnnual;
        
        const impact = {
            scenario: scenario,
            chosen: {
                ...chosen,
                annualCost: chosenAnnual,
                isCheapest: chosen.id === cheapest.id,
                isMostExpensive: chosen.id === mostExpensive.id
            },
            cheapest: {
                ...cheapest,
                annualCost: cheapestAnnual
            },
            mostExpensive: {
                ...mostExpensive,
                annualCost: mostExpensiveAnnual
            },
            annualSavingsVsExpensive: savingsVsExpensive,
            annualCostVsCheapest: costVsCheapest,
            byTimeframe: {}
        };
        
        Constants.TIME_PERIODS.forEach(years => {
            const savingsNominal = savingsVsExpensive * years;
            const costNominal = costVsCheapest * years;
            
            impact.byTimeframe[years] = {
                years,
                savingsVsExpensive: {
                    nominal: savingsNominal,
                    invested: this.opportunityCost(savingsVsExpensive, years)
                },
                costVsCheapest: {
                    nominal: costNominal,
                    invested: this.opportunityCost(costVsCheapest, years)
                },
                chosenTotal: {
                    nominal: chosenAnnual * years,
                    invested: this.opportunityCost(chosenAnnual, years)
                }
            };
        });
        
        return impact;
    },

    /**
     * Calculate cumulative impact across all decisions
     * @param {Array} decisions - Array of decision objects with impact data
     * @returns {Object} Cumulative summary
     */
    calculateCumulativeImpact(decisions) {
        let totalAnnualSavings = 0;
        let totalAnnualCost = 0;
        
        decisions.forEach(decision => {
            totalAnnualSavings += decision.impact.annualSavingsVsExpensive;
            totalAnnualCost += decision.impact.annualCostVsCheapest;
        });
        
        const summary = {
            totalAnnualSavings,
            totalAnnualCost,
            netAnnualPosition: totalAnnualSavings - totalAnnualCost,
            byTimeframe: {}
        };
        
        Constants.TIME_PERIODS.forEach(years => {
            const savingsNominal = totalAnnualSavings * years;
            const costNominal = totalAnnualCost * years;
            
            summary.byTimeframe[years] = {
                years,
                totalSavingsNominal: savingsNominal,
                totalSavingsInvested: this.opportunityCost(totalAnnualSavings, years),
                totalCostNominal: costNominal,
                totalCostInvested: this.opportunityCost(totalAnnualCost, years)
            };
        });
        
        return summary;
    },

    /**
     * Calculate wisdom score based on decisions
     * @param {Array} decisions - Array of decision objects
     * @returns {number} Score from 0-100
     */
    calculateWisdomScore(decisions) {
        if (decisions.length === 0) return 0;
        
        let totalQualityWeightedSavings = 0;
        let maxPossibleScore = 0;
        
        decisions.forEach(decision => {
            const { chosen, cheapest, mostExpensive } = decision.impact;
            
            // Score based on value (quality per dollar)
            const qualityScore = chosen.qualityScore || 70;
            const costRange = mostExpensive.annualCost - cheapest.annualCost;
            const costPosition = mostExpensive.annualCost - chosen.annualCost;
            
            // Normalize savings to 0-1 scale
            const savingsRatio = costRange > 0 ? costPosition / costRange : 0.5;
            
            // Weight by quality - reward getting good value
            const valueScore = savingsRatio * 70 + (qualityScore / 100) * 30;
            
            totalQualityWeightedSavings += valueScore;
            maxPossibleScore += 100;
        });
        
        return Math.round((totalQualityWeightedSavings / maxPossibleScore) * 100);
    }
};

// Make available globally
window.Calculator = Calculator;
