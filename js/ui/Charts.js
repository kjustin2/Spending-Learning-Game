/**
 * Charts Manager - Handles all Chart.js visualizations
 */
const Charts = {
    instances: {},

    /**
     * Default chart options
     */
    defaultOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(26, 54, 93, 0.9)',
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    family: "'Inter', sans-serif",
                    size: 13
                },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return ' ' + context.dataset.label + ': ' + Helpers.formatCurrency(context.parsed.y);
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: Constants.CHART_COLORS.GRID
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12
                    },
                    callback: function(value) {
                        return Helpers.formatCurrency(value);
                    }
                }
            }
        },
        animation: {
            duration: Constants.UI.CHART_ANIMATION_DURATION,
            easing: 'easeOutQuart'
        }
    },

    /**
     * Create or update the results comparison chart
     * @param {string} canvasId - Canvas element ID
     * @param {Object} impact - Impact analysis data
     * @param {string} view - 'nominal' or 'invested'
     */
    createResultsChart(canvasId, impact, view = 'nominal') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error('Canvas not found:', canvasId);
            return;
        }

        // Destroy existing chart
        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const ctx = canvas.getContext('2d');
        const timeframes = Constants.TIME_PERIODS;
        const labels = timeframes.map(y => `${y} ${y === 1 ? 'Year' : 'Years'}`);

        // Check if user chose the most frugal option
        const isUserFrugal = impact.chosen.isCheapest;

        // Prepare data based on view
        const chosenData = timeframes.map(years => {
            const tf = impact.byTimeframe[years];
            return view === 'invested' 
                ? tf.chosenTotal.invested 
                : tf.chosenTotal.nominal;
        });

        // If user chose frugal option, show most expensive for comparison
        // Otherwise, show the cheapest option
        const comparisonData = timeframes.map(years => {
            const tf = impact.byTimeframe[years];
            const chosenTotal = view === 'invested' 
                ? tf.chosenTotal.invested 
                : tf.chosenTotal.nominal;
            
            if (isUserFrugal) {
                // Show most expensive option (chosen + savings vs expensive)
                const savingsDiff = view === 'invested'
                    ? tf.savingsVsExpensive.invested
                    : tf.savingsVsExpensive.nominal;
                return chosenTotal + savingsDiff;
            } else {
                // Show cheapest option (chosen - cost vs cheapest)
                const costDiff = view === 'invested'
                    ? tf.costVsCheapest.invested
                    : tf.costVsCheapest.nominal;
                return chosenTotal - costDiff;
            }
        });

        // Determine which label to use for comparison
        const comparisonLabel = isUserFrugal ? 'Most Expensive Option' : 'Most Frugal Option';

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Your Choice',
                        data: chosenData,
                        backgroundColor: Constants.CHART_COLORS.PRIMARY,
                        borderColor: Constants.CHART_COLORS.PRIMARY,
                        borderWidth: 0,
                        borderRadius: 6
                    },
                    {
                        label: comparisonLabel,
                        data: comparisonData,
                        backgroundColor: Constants.CHART_COLORS.SECONDARY,
                        borderColor: Constants.CHART_COLORS.SECONDARY,
                        borderWidth: 0,
                        borderRadius: 6
                    }
                ]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    title: {
                        display: true,
                        text: view === 'invested' 
                            ? 'Total Cost (If Difference Was Invested at 7%)' 
                            : 'Total Cost Over Time',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 14,
                            weight: '600'
                        },
                        padding: { bottom: 20 }
                    }
                }
            }
        });
    },

    /**
     * Create the summary comparison chart
     * @param {string} canvasId - Canvas element ID
     * @param {Array} decisions - Array of decision objects
     */
    createSummaryChart(canvasId, decisions) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.error('Canvas not found:', canvasId);
            return;
        }

        // Destroy existing chart
        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const ctx = canvas.getContext('2d');

        // Prepare data - 30 year impact for each decision
        const labels = decisions.map(d => {
            // Truncate long titles
            const title = d.scenarioTitle;
            return title.length > 15 ? title.substring(0, 15) + '...' : title;
        });

        const costData = decisions.map(d => {
            return d.impact.byTimeframe[30]?.costVsCheapest?.invested || 0;
        });

        const savingsData = decisions.map(d => {
            return d.impact.byTimeframe[30]?.savingsVsExpensive?.invested || 0;
        });

        // Colors based on whether they saved or spent more
        const backgroundColors = decisions.map(d => {
            const cost = d.impact.annualCostVsCheapest;
            if (cost === 0) return Constants.CHART_COLORS.SECONDARY;
            return cost > 0 ? Constants.CHART_COLORS.ACCENT : Constants.CHART_COLORS.SECONDARY;
        });

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Extra Cost vs Frugal (30yr invested)',
                        data: costData,
                        backgroundColor: Constants.CHART_COLORS.ACCENT,
                        borderRadius: 6
                    },
                    {
                        label: 'Savings vs Premium (30yr invested)',
                        data: savingsData,
                        backgroundColor: Constants.CHART_COLORS.SECONDARY,
                        borderRadius: 6
                    }
                ]
            },
            options: {
                ...this.defaultOptions,
                indexAxis: 'y',
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        ...this.defaultOptions.plugins.legend,
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: Constants.CHART_COLORS.GRID
                        },
                        ticks: {
                            callback: function(value) {
                                return Helpers.formatCurrency(value);
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    },

    /**
     * Create a simple line chart for time progression
     * @param {string} canvasId - Canvas element ID
     * @param {Object} data - Chart data
     */
    createLineChart(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
        }

        const ctx = canvas.getContext('2d');

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                ...this.defaultOptions,
                elements: {
                    line: {
                        tension: 0.3
                    },
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    },

    /**
     * Update an existing chart with new data
     * @param {string} canvasId - Canvas element ID
     * @param {Object} newData - New data object
     */
    updateChart(canvasId, newData) {
        const chart = this.instances[canvasId];
        if (!chart) return;

        chart.data = newData;
        chart.update('active');
    },

    /**
     * Destroy a specific chart
     * @param {string} canvasId - Canvas element ID
     */
    destroyChart(canvasId) {
        if (this.instances[canvasId]) {
            this.instances[canvasId].destroy();
            delete this.instances[canvasId];
        }
    },

    /**
     * Destroy all charts
     */
    destroyAll() {
        Object.keys(this.instances).forEach(id => {
            this.instances[id].destroy();
        });
        this.instances = {};
    }
};

// Make available globally
window.Charts = Charts;
