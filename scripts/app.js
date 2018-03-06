export default class App {
    constructor(MYAPPS, enableInlineVideo) {
        this.MYAPPS = MYAPPS;
        this.enableInlineVideo = enableInlineVideo;
    }

    start() {
        this.enableInlineVideo(this.video, { iPad: true });
        this.video.play();
        if(!this.video.paused) {
            this.videoPlayingHandler();
        }
        this.loader.style.display = "none";
    }

    // --------------------------------------------------------------------------------
    // End of app Handling
    // --------------------------------------------------------------------------------
    revealNext() {
        this.pauseTimer();
        this.message.innerHTML = this.postCount;
        this.continueBtn.style.display = "inline-block";
        this.continueBtn.addEventListener("click", e => {
            let timestamp = this.video.currentTime;
            this.log({timestamp: timestamp});
            this.MYAPPS.end();
        });
    };

    log(data) {
        data.sk = this.MYAPPS.getSk();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "index.php", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("success!");
            }
        };
    
        xhr.send(JSON.stringify(data));
    }

    // --------------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------------
    posterClickHandler(e) {
        if (this.poster.style.visibility == "hidden") {
            this.setPosterVisibility(true)
            this.video.pause();
            this.pauseTimer();
        } else {
            this.setPosterVisibility(false);
            this.video.play();
            this.timeout = setTimeout(() => this.playTimer(), 10000);
            // Experiment -->
            this.video.parentElement.style.visibility = "visible";
            // <-- Experiment Over
        }
    }

    videoPlayingHandler(e) {
        // Experiment -->
        this.video.parentElement.style.visibility = "visible";
        this.video.parentElement.style.zIndex = 1;
        // <-- Experiment Over

        clearTimeout(this.timeout);

        this.setPosterVisibility(false);
        this.loader.style.display = "none";
        this.playTimer();
    }

    videoPauseHandler(e) {
        this.countDown();
        this.setPosterVisibility(true);
        this.pauseTimer();
    }

    videoEndedHandler(e) {
        this.setPosterVisibility(true);
        this.revealNext();
    }

    setPosterVisibility(visible) {
        if(visible) {
            this.poster.style.visibility = "visible";
        } else {
            this.poster.style.visibility = "hidden";
        }
    }

    // --------------------------------------------------------------------------------
    // Timer Logic
    // --------------------------------------------------------------------------------
    playTimer() {
        if (this.time > 0) {
            this.startTime = new Date();
            this.message.innerHTML = this.countdownMessage(this.time);

            if(this.timerID) {
                clearInterval(this.timerID);
                this.timerID = null;
            }
    
            let timerID = setInterval(() => {
                this.countDown();
                this.message.innerHTML = this.countdownMessage(this.time);
                if (this.time <= 1) {
                    this.time = 0;
                    this.revealNext();
                }
            }, 500);
            setTimeout(() => {
                clearInterval(timerID);
            }, this.time * 1000);

            this.timerID = timerID;
        }
    };
    
    pauseTimer() {
        clearInterval(this.timerID);
        this.timerID = null;
    };

    countdownMessage(time) {
        return this.leftCount + Math.round(time) + this.rightCount;
    }
    
    countDown() {
        let now = new Date();
        this.time -= (now - this.startTime) / 1000;
        this.startTime = now;
    }

    // --------------------------------------------------------------------------------
    // Initialization
    // --------------------------------------------------------------------------------
    initialize() {
        // Set DOM elements
        let posterwrapper =  document.getElementsByTagName("posterwrapper")[0];
        this.video = document.getElementsByTagName("video")[0];
        this.poster = document.getElementsByTagName("poster")[0];
        this.message = document.getElementsByClassName("continue-message")[0];
        this.continueBtn = document.getElementsByClassName("continue-button")[0];
        this.loader = document.getElementById("loader");

        // Load in settings from window put in by backend
        this.loadSettings();

        // Initialize Timer to NULL
        this.timerID = null;
        this.startTime = new Date();

        // Initialize Timeout to NULL
        this.timeout = null;
        
        // Add handlers to Poster and Video
        posterwrapper.addEventListener("click", this.posterClickHandler.bind(this));
        this.video.addEventListener("playing", this.videoPlayingHandler.bind(this));
        this.video.addEventListener("pause", this.videoPauseHandler.bind(this));
        this.video.addEventListener("ended", this.videoEndedHandler.bind(this))
    }

    loadSettings() {
        this.leftCount = "Continue in ";
        this.rightCount = " seconds...";
        this.postCount = "";
        if (window.settings) {
            if (window.settings.timer) {
                this.time = window.settings.timer;
            }
            if (window.settings.leftCount) {
                this.leftCount = window.settings.leftCount;
            }
            if (window.settings.rightCount) {
                this.rightCount = window.settings.rightCount;
            }
            if (window.settings.postCount) {
                this.postCount = window.settings.postCount;
            }
        }
    }
}