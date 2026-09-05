/**
 * Advanced High-Fidelity Text-to-Speech Engine
 * Crystal-clear human-like speech synthesis for InnoDignity
 * Supports: Arabic, English, French, German, Spanish
 * Uses professional studio-quality voice models
 */

(function () {
    const HiFiTTS = {
        // API Configuration - supports multiple TTS services
        config: {
            // Google Cloud Text-to-Speech (Premium quality)
            googleCloud: {
                apiKey: window.GOOGLE_TTS_API_KEY || '', // Set via environment or inject
                endpoint: 'https://texttospeech.googleapis.com/v1/text:synthesize'
            },
            // Fallback: Microsoft Azure (Alternative)
            azure: {
                apiKey: window.AZURE_TTS_API_KEY || '',
                region: window.AZURE_TTS_REGION || 'eastus',
                endpoint: 'https://{region}.tts.speech.microsoft.com/cognitiveservices/v1'
            },
            // Fallback: ElevenLabs API (For testing if preferred)
            elevenlabs: {
                apiKey: window.ELEVENLABS_TTS_API_KEY || '',
                endpoint: 'https://api.elevenlabs.io/v1/text-to-speech'
            }
        },

        // Voice models for crystal-clear, natural pronunciation
        voices: {
            ar: {
                locale: 'ar-SA',
                gender: 'FEMALE',
                name: 'ar-SA-HanaNeural', // Google Cloud voice
                displayName: 'Hana (Arabic - Saudi)',
                ssmlGender: 'FEMALE',
                naturalSample: 'https://cloud.google.com/text-to-speech/docs/voices'
            },
            en: {
                locale: 'en-US',
                gender: 'FEMALE',
                name: 'en-US-Neural2-C', // Google Cloud voice
                displayName: 'C (English - Natural)',
                ssmlGender: 'FEMALE'
            },
            de: {
                locale: 'de-DE',
                gender: 'FEMALE',
                name: 'de-DE-Neural2-B', // Google Cloud voice
                displayName: 'B (German - Professional)',
                ssmlGender: 'FEMALE'
            },
            es: {
                locale: 'es-ES',
                gender: 'FEMALE',
                name: 'es-ES-Neural2-A', // Google Cloud voice
                displayName: 'A (Spanish - Professional)',
                ssmlGender: 'FEMALE'
            },
            fr: {
                locale: 'fr-FR',
                gender: 'FEMALE',
                name: 'fr-FR-Neural2-B', // Google Cloud voice
                displayName: 'B (French - Professional)',
                ssmlGender: 'FEMALE'
            }
        },

        // Audio cache to reduce API calls
        cache: {},

        /**
         * Synthesize speech using Google Cloud Text-to-Speech
         * Provides crystal-clear, professional audio output
         */
        synthesizeWithGoogle: async function(text, languageCode) {
            if (!this.config.googleCloud.apiKey) {
                console.warn('Google Cloud API key not configured. Using fallback.');
                return this.synthesizeWithFallback(text, languageCode);
            }

            try {
                const cacheKey = `${languageCode}-${text.substring(0, 50)}`;
                
                // Return from cache if available
                if (this.cache[cacheKey]) {
                    console.log('Using cached audio for:', text.substring(0, 30) + '...');
                    return this.cache[cacheKey];
                }

                const voice = this.voices[languageCode] || this.voices.en;
                
                const requestBody = {
                    input: {
                        text: text
                    },
                    voice: {
                        languageCode: voice.locale,
                        name: voice.name,
                        ssmlGender: voice.ssmlGender
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        pitch: 0, // Natural pitch
                        speakingRate: 1.0, // Normal speed
                        volumeGainDb: 3 // Professional audio level
                    }
                };

                const url = `${this.config.googleCloud.endpoint}?key=${this.config.googleCloud.apiKey}`;
                
                console.log('Requesting high-fidelity audio synthesis for:', languageCode);
                
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error(`Google TTS API error: ${response.status}`);
                }

                const data = await response.json();
                
                if (!data.audioContent) {
                    throw new Error('No audio content in response');
                }

                // Audio is base64 encoded MP3
                const audioDataUrl = `data:audio/mp3;base64,${data.audioContent}`;
                
                // Cache the result
                this.cache[cacheKey] = audioDataUrl;
                
                console.log('✓ Crystal-clear audio generated for:', languageCode);
                return audioDataUrl;

            } catch (error) {
                console.error('Google Cloud TTS error:', error);
                return this.synthesizeWithFallback(text, languageCode);
            }
        },

        /**
         * Fallback: High-quality synthesis using Web Speech API enhanced
         * with pitch and rate controls for natural sound
         */
        synthesizeWithFallback: function(text, languageCode) {
            return new Promise((resolve) => {
                if (!('speechSynthesis' in window)) {
                    console.warn('Speech Synthesis API not available');
                    resolve(null);
                    return;
                }

                // Get all available voices
                let voices = window.speechSynthesis.getVoices();
                
                if (voices.length === 0) {
                    // Wait for voices to load
                    window.speechSynthesis.onvoiceschanged = () => {
                        voices = window.speechSynthesis.getVoices();
                        this.playWithFallbackVoice(text, languageCode, voices);
                        resolve(null);
                    };
                } else {
                    this.playWithFallbackVoice(text, languageCode, voices);
                    resolve(null);
                }
            });
        },

        /**
         * Play audio with best available fallback voice
         */
        playWithFallbackVoice: function(text, languageCode, voices) {
            const voice = this.voices[languageCode] || this.voices.en;
            const langCode = voice.locale;
            
            // Find best matching voice
            let selectedVoice = null;
            
            // First try to find exact language match with female voice
            for (let v of voices) {
                if (v.lang.startsWith(langCode.split('-')[0])) {
                    const voiceName = v.name.toLowerCase();
                    const isFemale = voiceName.includes('female') || 
                                   voiceName.includes('woman') ||
                                   !voiceName.includes('male');
                    
                    if (isFemale) {
                        selectedVoice = v;
                        break;
                    }
                }
            }

            // Fallback to any voice in the language
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.lang.startsWith(languageCode));
            }

            // Final fallback to first voice
            if (!selectedVoice) {
                selectedVoice = voices[0];
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            utterance.lang = langCode;
            utterance.pitch = 1.0; // Natural pitch
            utterance.rate = 1.0; // Normal speaking rate
            utterance.volume = 1.0; // Full volume

            console.log('Using fallback voice:', selectedVoice.name);
            window.speechSynthesis.speak(utterance);
        },

        /**
         * Play crystal-clear audio
         */
        play: async function(text, languageCode) {
            if (!text || !languageCode) {
                console.error('Missing text or language code');
                return;
            }

            try {
                // Try Google Cloud first (highest quality)
                const audioUrl = await this.synthesizeWithGoogle(text, languageCode);
                
                if (audioUrl) {
                    const audio = new Audio(audioUrl);
                    audio.volume = 1.0;
                    audio.playbackRate = 1.0;
                    
                    audio.onerror = () => {
                        console.warn('Audio playback error, trying fallback');
                        this.synthesizeWithFallback(text, languageCode);
                    };
                    
                    await audio.play().catch((error) => {
                        console.error('Playback error:', error);
                        this.synthesizeWithFallback(text, languageCode);
                    });
                    
                    return audio;
                } else {
                    // Use fallback
                    this.synthesizeWithFallback(text, languageCode);
                }
            } catch (error) {
                console.error('TTS Error:', error);
                this.synthesizeWithFallback(text, languageCode);
            }
        },

        /**
         * Stop all audio playback
         */
        stop: function() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                console.log('Speech synthesis stopped');
            }
        },

        /**
         * Check API configuration status
         */
        checkStatus: function() {
            return {
                googleCloud: {
                    configured: !!this.config.googleCloud.apiKey,
                    apiKey: this.config.googleCloud.apiKey ? '***configured***' : 'NOT SET'
                },
                azure: {
                    configured: !!this.config.azure.apiKey,
                    apiKey: this.config.azure.apiKey ? '***configured***' : 'NOT SET'
                },
                elevenlabs: {
                    configured: !!this.config.elevenlabs.apiKey,
                    apiKey: this.config.elevenlabs.apiKey ? '***configured***' : 'NOT SET'
                },
                supportedLanguages: Object.keys(this.voices),
                cacheSize: Object.keys(this.cache).length
            };
        }
    };

    // Expose to global scope
    window.HiFiTTS = HiFiTTS;
    
    // Log initialization
    console.log('✓ High-Fidelity TTS Engine initialized');
    console.log('Status:', HiFiTTS.checkStatus());

})();
