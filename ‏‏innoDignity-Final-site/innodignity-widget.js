/**
 * InnoDignity Complete Widget System
 * Includes: Floating Agent Widget, Language Switcher, Voice Studio Bar
 * Supports: Multiple languages, Female/Male voices via Web Speech API
 */

(function () {
    const LANGUAGES = {
        ar: { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
        en: { code: 'en-US', name: 'English', flag: '🇺🇸' },
        de: { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
        es: { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
        fr: { code: 'fr-FR', name: 'Français', flag: '🇫🇷' }
    };

    const VOICE_MESSAGES = {
        ar: {
            welcome: 'أهلا وسهلا بك في نظام إينو ديجنيتي',
            greeting: 'مرحبا، أنا نورا، مساعدتك الذكية الآمنة'
        },
        en: {
            welcome: 'Welcome to InnoDignity System',
            greeting: 'Hello, I am Nora, your secure intelligent assistant'
        },
        de: {
            welcome: 'Willkommen zum InnoDignity System',
            greeting: 'Hallo, ich bin Nora, Ihre sichere intelligente Assistentin'
        },
        es: {
            welcome: 'Bienvenido al Sistema InnoDignity',
            greeting: 'Hola, soy Nora, tu asistente inteligente seguro'
        },
        fr: {
            welcome: 'Bienvenue dans le système InnoDignity',
            greeting: 'Bonjour, je suis Nora, votre assistant intelligent sécurisé'
        }
    };

    let currentLanguage = localStorage.getItem('innodignity_language') || 'en';
    let widgetOpen = false;
    let currentVoiceGender = 'female';
    let isPlaying = false;

    // Initialize widget on DOM ready
    function init() {
        createWidgetHTML();
        attachEventListeners();
        setLanguageFromURL();
        loadSavedPreferences();
    }

    // Create all widget HTML elements
    function createWidgetHTML() {
        const existingContainer = document.getElementById('innodignity-widget-container');
        if (existingContainer) return;

        // Main container
        const container = document.createElement('div');
        container.id = 'innodignity-widget-container';
        container.innerHTML = `
            <!-- Floating Widget Toggle Button -->
            <div id="innodignity-widget-toggle" class="innodignity-widget-toggle" title="Open InnoDignity Agent">
                <div class="innodignity-widget-icon">🤖</div>
                <div class="innodignity-widget-pulse"></div>
            </div>

            <!-- Main Widget Panel -->
            <div id="innodignity-widget-panel" class="innodignity-widget-panel innodignity-hidden">
                <!-- Widget Header -->
                <div class="innodignity-widget-header">
                    <div class="innodignity-widget-title">
                        <span class="innodignity-agent-icon">🤖</span>
                        <span class="innodignity-agent-name">InnoDignity Agent (Secure)</span>
                    </div>
                    <button id="innodignity-widget-close" class="innodignity-widget-close" title="Close widget">✕</button>
                </div>

                <!-- Language Switcher -->
                <div class="innodignity-language-switcher">
                    <div class="innodignity-lang-label">🌐 Language:</div>
                    <div class="innodignity-lang-buttons">
                        <button class="innodignity-lang-btn" data-lang="ar">العربية</button>
                        <button class="innodignity-lang-btn innodignity-lang-active" data-lang="en">EN</button>
                        <button class="innodignity-lang-btn" data-lang="de">DE</button>
                        <button class="innodignity-lang-btn" data-lang="es">ES</button>
                        <button class="innodignity-lang-btn" data-lang="fr">FR</button>
                    </div>
                </div>

                <!-- Voice Studio Bar -->
                <div class="innodignity-voice-studio">
                    <div class="innodignity-voice-label">🎤 Voice Studio:</div>
                    
                    <!-- Voice Gender Selection -->
                    <div class="innodignity-voice-gender">
                        <button class="innodignity-voice-gender-btn innodignity-voice-active" data-gender="female" title="Female voice">
                            <span class="innodignity-voice-gender-icon">👩</span>
                            <span>Female</span>
                        </button>
                        <button class="innodignity-voice-gender-btn" data-gender="male" title="Male voice">
                            <span class="innodignity-voice-gender-icon">👨</span>
                            <span>Male</span>
                        </button>
                    </div>

                    <!-- Voice Controls -->
                    <div class="innodignity-voice-controls">
                        <button id="innodignity-voice-welcome" class="innodignity-voice-btn" title="Play welcome message">
                            <span class="innodignity-voice-icon">🎙️</span>
                            Welcome
                        </button>
                        <button id="innodignity-voice-greeting" class="innodignity-voice-btn" title="Play greeting">
                            <span class="innodignity-voice-icon">💬</span>
                            Greeting
                        </button>
                        <button id="innodignity-voice-stop" class="innodignity-voice-btn innodignity-voice-stop-btn" title="Stop playing">
                            <span class="innodignity-voice-icon">⏹️</span>
                            Stop
                        </button>
                    </div>

                    <!-- Voice Status -->
                    <div id="innodignity-voice-status" class="innodignity-voice-status">
                        Ready
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="innodignity-quick-links">
                    <a href="#" class="innodignity-quick-link" onclick="window.open('https://innodignity.com', '_blank'); return false;">
                        🌐 Official Site
                    </a>
                    <a href="#" class="innodignity-quick-link" onclick="alert('Contact: info@innodignity.com'); return false;">
                        📧 Contact Us
                    </a>
                </div>

                <!-- Widget Footer -->
                <div class="innodignity-widget-footer">
                    <small>Secure AI Assistant | InnoDignity © 2026</small>
                </div>
            </div>

            <!-- Overlay (for closing widget when clicking outside) -->
            <div id="innodignity-overlay" class="innodignity-overlay innodignity-hidden"></div>
        `;

        document.body.appendChild(container);
    }

    // Attach all event listeners
    function attachEventListeners() {
        // Widget toggle
        document.getElementById('innodignity-widget-toggle').addEventListener('click', toggleWidget);
        document.getElementById('innodignity-widget-close').addEventListener('click', closeWidget);
        document.getElementById('innodignity-overlay').addEventListener('click', closeWidget);

        // Language buttons
        document.querySelectorAll('.innodignity-lang-btn').forEach(btn => {
            btn.addEventListener('click', handleLanguageChange);
        });

        // Voice gender buttons
        document.querySelectorAll('.innodignity-voice-gender-btn').forEach(btn => {
            btn.addEventListener('click', handleVoiceGenderChange);
        });

        // Voice control buttons
        document.getElementById('innodignity-voice-welcome').addEventListener('click', playWelcomeVoice);
        document.getElementById('innodignity-voice-greeting').addEventListener('click', playGreetingVoice);
        document.getElementById('innodignity-voice-stop').addEventListener('click', stopVoice);

        // Set initial active language button
        updateLanguageButtonUI();
    }

    // Toggle widget open/close
    function toggleWidget() {
        widgetOpen ? closeWidget() : openWidget();
    }

    // Open widget
    function openWidget() {
        const panel = document.getElementById('innodignity-widget-panel');
        const overlay = document.getElementById('innodignity-overlay');
        panel.classList.remove('innodignity-hidden');
        overlay.classList.remove('innodignity-hidden');
        widgetOpen = true;
    }

    // Close widget
    function closeWidget() {
        const panel = document.getElementById('innodignity-widget-panel');
        const overlay = document.getElementById('innodignity-overlay');
        panel.classList.add('innodignity-hidden');
        overlay.classList.add('innodignity-hidden');
        widgetOpen = false;
    }

    // Handle language change
    function handleLanguageChange(e) {
        const lang = e.target.dataset.lang;
        if (!lang) return;
        
        currentLanguage = lang;
        localStorage.setItem('innodignity_language', lang);
        updateLanguageButtonUI();
        updateVoiceStatusMessage();
        
        // Trigger custom event for page components to listen
        window.dispatchEvent(new CustomEvent('innodignity-language-changed', { detail: { language: lang } }));
    }

    // Update language button UI
    function updateLanguageButtonUI() {
        document.querySelectorAll('.innodignity-lang-btn').forEach(btn => {
            btn.classList.remove('innodignity-lang-active');
            if (btn.dataset.lang === currentLanguage) {
                btn.classList.add('innodignity-lang-active');
            }
        });
    }

    // Handle voice gender change
    function handleVoiceGenderChange(e) {
        const gender = e.target.closest('.innodignity-voice-gender-btn')?.dataset.gender;
        if (!gender) return;

        currentVoiceGender = gender;
        localStorage.setItem('innodignity_voice_gender', gender);

        document.querySelectorAll('.innodignity-voice-gender-btn').forEach(btn => {
            btn.classList.remove('innodignity-voice-active');
        });
        e.target.closest('.innodignity-voice-gender-btn').classList.add('innodignity-voice-active');
        
        updateVoiceStatusMessage();
    }

    // Update voice status message
    function updateVoiceStatusMessage() {
        const status = document.getElementById('innodignity-voice-status');
        const genderLabel = currentVoiceGender === 'female' ? '👩' : '👨';
        const langName = LANGUAGES[currentLanguage]?.name || 'Unknown';
        status.textContent = `${genderLabel} ${currentVoiceGender.charAt(0).toUpperCase() + currentVoiceGender.slice(1)} • ${langName}`;
    }

    // Speak text using High-Fidelity TTS Engine for crystal-clear, professional audio
    function speakText(text, gender = null) {
        if (!text) return;

        // Stop any currently playing speech
        stopVoice();

        const voiceGender = gender || currentVoiceGender;
        const statusEl = document.getElementById('innodignity-voice-status');
        
        if (!statusEl) return;

        // Check if High-Fidelity TTS Engine is available
        if (window.HiFiTTS) {
            // Use crystal-clear high-fidelity audio
            console.log('Using High-Fidelity TTS Engine for:', currentLanguage);
            
            isPlaying = true;
            statusEl.textContent = '🎙️ Crystal-clear audio generating...';

            try {
                window.HiFiTTS.play(text, currentLanguage).then(() => {
                    isPlaying = false;
                    statusEl.textContent = '✓ Audio complete';
                    setTimeout(updateVoiceStatusMessage, 2000);
                }).catch((error) => {
                    console.error('HiFi TTS Error:', error);
                    isPlaying = false;
                    statusEl.textContent = '⚠️ Using fallback audio';
                    playWithFallbackVoice(text, voiceGender);
                });
            } catch (error) {
                console.error('TTS Engine error:', error);
                isPlaying = false;
                statusEl.textContent = '⚠️ Using fallback audio';
                playWithFallbackVoice(text, voiceGender);
            }
        } else {
            // Fallback to Web Speech API if HiFi TTS not available
            console.warn('HiFi TTS Engine not available, using Web Speech API fallback');
            statusEl.textContent = '🔊 Playing with system voice...';
            playWithFallbackVoice(text, voiceGender);
        }
    }

    /**
     * Fallback voice playback using Web Speech API
     */
    function playWithFallbackVoice(text, voiceGender = 'female') {
        if (!('speechSynthesis' in window)) {
            document.getElementById('innodignity-voice-status').textContent = '❌ Speech not supported';
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const langCode = LANGUAGES[currentLanguage]?.code || 'en-US';
        utterance.lang = langCode;
        
        // Find best available voice
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
            const matchingVoice = voices.find(voice => {
                const isFemale = voiceGender === 'female';
                const voiceLang = voice.lang.split('-')[0];
                const langBase = langCode.split('-')[0];
                const voiceName = voice.name.toLowerCase();
                
                const genderMatch = isFemale ? 
                    (voiceName.includes('female') || 
                     voiceName.includes('woman') || 
                     voiceName.includes('samantha') ||
                     voiceName.includes('victoria') ||
                     voiceName.includes('zira')) :
                    (voiceName.includes('male') || 
                     voiceName.includes('man') || 
                     voiceName.includes('david') ||
                     voiceName.includes('george') ||
                     voiceName.includes('mark'));
                
                return voiceLang === langBase && genderMatch;
            });

            if (matchingVoice) {
                utterance.voice = matchingVoice;
            }
        }

        utterance.rate = 1.0;
        utterance.pitch = voiceGender === 'female' ? 1.2 : 0.9;
        utterance.volume = 1.0;

        isPlaying = true;
        const statusEl = document.getElementById('innodignity-voice-status');

        utterance.onend = () => {
            isPlaying = false;
            if (statusEl) {
                statusEl.textContent = '✓ Complete';
                setTimeout(updateVoiceStatusMessage, 2000);
            }
        };

        utterance.onerror = (event) => {
            isPlaying = false;
            if (statusEl) {
                statusEl.textContent = '❌ Playback error';
            }
        };

        window.speechSynthesis.speak(utterance);
    }

    // Play welcome voice
    function playWelcomeVoice() {
        const text = VOICE_MESSAGES[currentLanguage]?.welcome || 'Welcome';
        speakText(text);
    }

    // Play greeting voice
    function playGreetingVoice() {
        const text = VOICE_MESSAGES[currentLanguage]?.greeting || 'Hello';
        speakText(text);
    }

    // Stop voice
    function stopVoice() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            isPlaying = false;
            document.getElementById('innodignity-voice-status').textContent = '⏹️ Stopped';
            setTimeout(updateVoiceStatusMessage, 1000);
        }
    }

    // Set language from URL if available
    function setLanguageFromURL() {
        const htmlTag = document.documentElement;
        const pageLang = htmlTag.getAttribute('lang');
        
        if (pageLang && Object.keys(LANGUAGES).includes(pageLang)) {
            currentLanguage = pageLang;
            localStorage.setItem('innodignity_language', pageLang);
            updateLanguageButtonUI();
        }
    }

    // Load saved preferences
    function loadSavedPreferences() {
        const savedLanguage = localStorage.getItem('innodignity_language');
        const savedVoiceGender = localStorage.getItem('innodignity_voice_gender');

        if (savedLanguage && Object.keys(LANGUAGES).includes(savedLanguage)) {
            currentLanguage = savedLanguage;
            updateLanguageButtonUI();
        }

        if (savedVoiceGender && ['female', 'male'].includes(savedVoiceGender)) {
            currentVoiceGender = savedVoiceGender;
            document.querySelectorAll('.innodignity-voice-gender-btn').forEach(btn => {
                btn.classList.remove('innodignity-voice-active');
                if (btn.dataset.gender === savedVoiceGender) {
                    btn.classList.add('innodignity-voice-active');
                }
            });
        }

        updateVoiceStatusMessage();
    }

    // Expose API for external use
    window.InnoDignityWidget = {
        getCurrentLanguage: () => currentLanguage,
        setLanguage: (lang) => {
            if (Object.keys(LANGUAGES).includes(lang)) {
                currentLanguage = lang;
                localStorage.setItem('innodignity_language', lang);
                updateLanguageButtonUI();
            }
        },
        speak: speakText,
        stop: stopVoice,
        openWidget,
        closeWidget
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also initialize on voices loaded
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            // Voices have loaded
        };
    }
})();
