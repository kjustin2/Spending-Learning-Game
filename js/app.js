/**
 * Main Application Entry Point
 * Initializes the game when DOM is ready
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Money Choices - Initializing...');
    
    // Check for required dependencies
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is required but not loaded');
        return;
    }
    
    // Initialize game engine
    const game = new GameEngine();
    
    // Initialize UI manager
    const ui = new UIManager(game);
    
    // Make available globally for debugging
    window.app = {
        game,
        ui,
        version: '1.0.0'
    };
    
    console.log('✅ Money Choices - Ready!');
    console.log('💡 Tip: Access window.app for debugging');
});

// Handle page visibility for saving state
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && window.app?.game) {
        window.app.game.saveState();
        console.log('💾 Game state saved');
    }
});

// Handle before unload
window.addEventListener('beforeunload', () => {
    if (window.app?.game) {
        window.app.game.saveState();
    }
});
