import App from './app.js';
import enableInlineVideo from 'iphone-inline-video';

// Skip video if Mac CNA
if (window.innerHeight == 512 && window.innerWidth == 900) { MYAPPS.end(); }

// Timeout after 75 seconds if window does not load
let timeout = null;
timeout = setTimeout(() => {
    console.log("page taking too long to load");
    MYAPPS.end();
}, 75000);

// Initialize app's internal variables to various DOM pieces
let app = new App(MYAPPS, enableInlineVideo);
window.addEventListener("DOMContentLoaded", e => {
    app.initialize();
})

// Start the javascript app (try to play video)
window.addEventListener("load", e => {
    clearTimeout(timeout); // clear above timeout
    app.start();
});