/**
 * Nora Widget - Local MP3 Audio Playback Only
 * No speech synthesis. Pure HTML5 audio player.
 * Female voice only. Greeting button plays language-specific MP3.
 */
(function () {
    // ===== CONFIGURATION =====
    var currentLanguage = 'ar';  // Default to Arabic
    
    // Map languages to local MP3 files (FEMALE VOICE ONLY)
    var audioFiles = {
        ar: 'nora-ar.mp3',      // Arabic - Female
        en: 'nora-en.mp3',      // English - Female
        de: 'nora-de.mp3',      // German - Female
        es: 'nora-es.mp3',      // Spanish - Female
        fr: 'nora-fr.mp3'       // French - Female
    };

    // ===== AUDIO PLAYER =====
    
    /**
     * Get or create the hidden audio player element
     */
    function getAudioPlayer() {
   var existing = document.getElementById('noraAudioPlayer');
if (existing) return existing;
        var audio = document.createElement('audio');
        audio.id = 'noraAudioPlayer';
        audio.preload = 'auto';
        audio.volume = 1.0;
        audio.hidden = true;
        document.body.appendChild(audio);
        return audio;
    }

    /**
     * Play greeting audio for the current language
     * NO speech synthesis. Pure MP3 playback.
     */
    function playGreeting() {
        var filename = audioFiles[currentLanguage];
        if (!filename) {
            console.error('❌ No audio file for language:', currentLanguage);
            return;
        }

        var audio = getAudioPlayer();
        
        // Stop any currently playing audio
        audio.pause();
        audio.currentTime = 0;
        
        // Load and play the MP3 file
        audio.src = filename;
        
        var playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(function() {
                    console.log('✓ Playing greeting: ' + filename);
                })
                .catch(function(error) {
                    console.error('❌ Playback failed:', error.message);
                });
        }
    }

    /**
     * Stop all audio playback
     */
    function stopAudio() {
        var audio = document.getElementById('noraAudioPlayer');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

    // ===== CHAT WIDGET UI =====

    /**
     * Load stylesheet
     */
    function loadStyles() {
        if (document.getElementById('nora-widget-styles')) return;
        var link = document.createElement('link');
        link.id = 'nora-widget-styles';
        link.rel = 'stylesheet';
        link.href = 'nora-widget.css';
        document.head.appendChild(link);
    }

    /**
     * Create the Nora chat widget with greeting button
     */
    function createChatWidget() {
        if (document.getElementById('noraChat')) return;

        var container = document.createElement('div');
        container.id = 'noraChat';
        container.className = 'nora-chat';

        // Chat panel with greeting button prominently displayed
        container.innerHTML = 
            '<section class="nora-chat-panel" aria-label="Nora chat widget">' +
                '<div class="nora-chat-header">' +
                    '<h2>Nora</h2>' +
                    '<p class="nora-chat-subtitle">Your Secure AI Assistant</p>' +
                '</div>' +
                
              '<p class="nora-chat-reply">Hello! I am your Secure AI Assistant, ready to help.</p>' +  
                    '<button id="noraGreetingBtn" class="nora-button nora-greeting-btn" type="button" aria-label="Play Nora greeting in current language" title="Hear Nora\'s greeting (Female Voice)">' +
                        '<span class="nora-btn-icon">🎙️</span>' +
                        '<span class="nora-btn-text">Play Greeting</span>' +
                    '</button>' +
                    '<button id="noraStopBtn" class="nora-button nora-stop-btn" type="button" aria-label="Stop audio playback" title="Stop Audio">' +
                        '<span class="nora-btn-icon">⏹️</span>' +
                        '<span class="nora-btn-text">Stop</span>' +
                    '</button>' +
                '</div>' +
                
                '<form class="nora-chat-form">' +
                    '<input type="text" aria-label="Message to Nora" placeholder="Ask me anything..." autocomplete="off">' +
                    '<button type="submit">Send</button>' +
                '</form>' +
            '</section>' +
            
            '<button class="nora-chat-toggle" type="button" aria-label="Open Nora chat" aria-expanded="false" title="Chat with Nora">' +
                '💬' +
            '</button>';

        document.body.appendChild(container);

        // ===== EVENT HANDLERS =====

        var panel = container.querySelector('.nora-chat-panel');
        var toggle = container.querySelector('.nora-chat-toggle');
        var form = container.querySelector('.nora-chat-form');
        var input = form.querySelector('input');
        var greetingBtn = container.querySelector('#noraGreetingBtn');
        var stopBtn = container.querySelector('#noraStopBtn');

        // Toggle chat panel open/closed
        toggle.addEventListener('click', function() {
            var isOpen = panel.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                input.focus();
            }
        });

     // Play greeting when button clicked

      

        // Handle form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!input.value.trim()) return;
            
            var reply = container.querySelector('.nora-chat-reply');
            reply.textContent = 'Thank you for your message. I\'m here to help you explore the InnoDignity ecosystem.';
            input.value = '';
        });
    }

    // ===== LANGUAGE TRACKING =====

    /**
     * Track language changes from other widgets
     */
    function trackLanguageChanges() {
        // Listen for custom language change events
        window.addEventListener('innodignity-language-changed', function(e) {
            if (e.detail && e.detail.language) {
                currentLanguage = e.detail.language;
                console.log('✓ Nora language switched to:', currentLanguage);
            }
        });

        // Track if setLanguage function exists globally
        if (typeof window.setLanguage === 'function' && !window.setLanguage.__noraTracked) {
            var original = window.setLanguage;
            window.setLanguage = function(lang) {
                currentLanguage = lang;
                return original.apply(this, arguments);
            };
            window.setLanguage.__noraTracked = true;
        }
    }

    // ===== INITIALIZATION =====

    /**
     * Initialize widget on DOM ready
     */
    function init() {
        console.log('Initializing Nora Widget (Female Voice, Local MP3 Only)');
        
        loadStyles();
        createChatWidget();
        trackLanguageChanges();

        // Expose public API
        window.NoraTTS = {
            /**
             * Play greeting for specified or current language
             * @param {string} lang - Optional language code (ar, en, de, es, fr)
             */
            play: function(lang) {
                if (lang && audioFiles[lang]) {
                    currentLanguage = lang;
                }
                playGreeting();
            },

            /**
             * Stop all audio
             */
            stop: function() {
                stopAudio();
            },

            /**
             * Get playback status
             */
            status: function() {
                var audio = document.getElementById('noraAudioPlayer');
                return {
                    currentLanguage: currentLanguage,
                    playing: audio && !audio.paused,
                    currentTime: audio ? audio.currentTime : 0,
                    duration: audio ? audio.duration : 0,
                    supportedLanguages: Object.keys(audioFiles),
                    voiceType: 'Female (Local MP3 Only)'
                };
            }
        };

        console.log('✓ Nora Widget ready - Female voice, local MP3, no speech synthesis');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
// متغير عام لحفظ الصوت الحالي لضمان التحكم به وإيقافه
let currentNoraAudio = null;

// دالة تشغيل صوت نورا حسب اللغة النشطة
function playNoraGreeting(lang) {
    // إيقاف أي صوت يعمل حالياً قبل تشغيل الجديد
    if (currentNoraAudio) {
        currentNoraAudio.pause();
        currentNoraAudio.currentTime = 0;
    }

    // تحديد ملف الـ MP3 المناسب لكل لغة
    let audioFile = 'nora-ar.mp3'; // الافتراضي بالعربية
    if (lang === 'en') audioFile = 'nora-en.mp3';
    else if (lang === 'de') audioFile = 'nora-de.mp3';
    else if (lang === 'fr') audioFile = 'nora-fr.mp3';
    else if (lang === 'es') audioFile = 'nora-es.mp3';

    // إنشاء وتشغيل الصوت الجديد
    currentNoraAudio = new Audio(audioFile);
    currentNoraAudio.play().catch(function(error) {
        console.log("Audio playback failed (Requires user interaction):", error);
    });
}

// دالة إيقاف الصوت تماماً عند الضغط على زر Stop
function stopAudio() {
    if (currentNoraAudio) {
        currentNoraAudio.pause();
        currentNoraAudio.currentTime = 0;
        console.log("Audio stopped by user.");
    }
}