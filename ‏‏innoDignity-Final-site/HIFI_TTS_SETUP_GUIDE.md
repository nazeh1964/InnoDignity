# High-Fidelity TTS Engine Setup Guide

## Overview

The InnoDignity project now includes a professional-grade **High-Fidelity Text-to-Speech (TTS) Engine** that provides crystal-clear, human-like voice synthesis with studio-quality audio output.

### Supported Languages
- 🇸🇦 Arabic (ar-SA) - Female voice
- 🇺🇸 English (en-US) - Female voice  
- 🇩🇪 German (de-DE) - Female voice
- 🇪🇸 Spanish (es-ES) - Female voice
- 🇫🇷 French (fr-FR) - Female voice

---

## Quick Start (Fallback Mode)

The widget works immediately **without configuration** using the fallback Web Speech API. Simply include the scripts in your HTML:

```html
<!-- CSS Files -->
<link rel="stylesheet" href="innodignity-widget-style.css">
<link rel="stylesheet" href="nora-widget.css">

<!-- JS Files (in order) -->
<script src="hifi-tts-engine.js"></script>
<script src="innodignity-widget.js"></script>
<script src="nora-widget.js"></script>
```

When users click the voice/greeting buttons, they'll hear clear audio with automatic fallback voice selection.

---

## Premium Setup: Google Cloud Text-to-Speech

For **crystal-clear, professional studio-quality audio**, integrate with Google Cloud Text-to-Speech API.

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Cloud Text-to-Speech API"
4. Create an API key (Credentials > API Key)

### Step 2: Add API Key to Your Page

Add the API key to your HTML **before** loading the widget scripts:

```html
<script>
  // Set Google Cloud TTS API Key
  window.GOOGLE_TTS_API_KEY = 'YOUR_API_KEY_HERE';
</script>

<!-- Then load the TTS engine -->
<script src="hifi-tts-engine.js"></script>
<script src="innodignity-widget.js"></script>
<script src="nora-widget.js"></script>
```

### Step 3: Verify Configuration

Open your browser console and check:

```javascript
window.HiFiTTS.checkStatus()
```

You should see:
```json
{
  "googleCloud": {
    "configured": true,
    "apiKey": "***configured***"
  },
  "supportedLanguages": ["ar", "en", "de", "es", "fr"],
  "cacheSize": 0
}
```

---

## How It Works

### Voice Quality Hierarchy

1. **Primary (Highest Quality)**: Google Cloud Text-to-Speech API
   - Professional studio-quality voices
   - Perfect pronunciation
   - Natural prosody
   - Multi-language support
   - MP3 audio output

2. **Fallback 1**: Web Speech API
   - Built-in browser voices
   - No external API needed
   - Good quality, somewhat robotic

3. **Fallback 2**: System voices
   - Last resort
   - Device-specific voices

### Voice Models Used

The engine automatically selects the best female voice for each language:

| Language | Google Cloud Voice | Voice Code |
|----------|-------------------|-----------|
| Arabic | Hana (Saudi) | ar-SA-HanaNeural |
| English | C (Natural) | en-US-Neural2-C |
| German | B (Professional) | de-DE-Neural2-B |
| Spanish | A (Professional) | es-ES-Neural2-A |
| French | B (Professional) | fr-FR-Neural2-B |

---

## API Usage & Costs

### Google Cloud Pricing (as of 2024)

- **Free Tier**: 1,000,000 characters/month
- **Paid**: $16 per 1 million characters
- **Batch Requests**: Discounted rates available

### Optimization

The engine includes **automatic caching** to minimize API calls:

```javascript
// Messages are automatically cached after first use
// Subsequent plays use cached audio (instant, no API calls)
window.HiFiTTS.cache  // See all cached audio
```

---

## Using the TTS Engine Programmatically

### Basic Usage

```javascript
// Play text in current language
window.HiFiTTS.play('Hello World', 'en');

// Stop all audio
window.HiFiTTS.stop();

// Check status
const status = window.HiFiTTS.checkStatus();
console.log(status);
```

### With Nora Widget

```javascript
// Play custom message through Nora
window.NoraTTS.play('Custom message', 'ar');

// Stop playback
window.NoraTTS.stop();

// Check engine status
window.NoraTTS.status();
```

### With InnoDignity Agent Widget

The floating agent widget automatically uses HiFi TTS when available:

```javascript
// Manually trigger voice playback
window.InnoDignityWidget.speak('Hello', 'female');

// Change language dynamically
window.InnoDignityWidget.setLanguage('ar');

// Listen for language changes
window.addEventListener('innodignity-language-changed', (e) => {
  console.log('Language changed to:', e.detail.language);
});
```

---

## Security & Privacy

✅ **Privacy-First Design**
- Audio generated server-side (Google Cloud or device)
- No voice data stored locally
- No tracking or telemetry
- LocalStorage used only for user preferences

✅ **API Key Safety**
- Set via JavaScript variable (not hardcoded in HTML)
- Implement CORS restrictions in Google Cloud Console
- Use restricted API keys (HTTP referrer restrictions)

**Recommended Security Setup:**

1. In Google Cloud Console, go to Credentials
2. Edit your API key
3. Set "API restrictions" to "Cloud Text-to-Speech API" only
4. Set "Application restrictions" to "HTTP referrers"
5. Add your domain: `https://yourdomain.com/*`

---

## Error Handling & Debugging

### Console Logging

The engine logs detailed information for debugging:

```
✓ High-Fidelity TTS Engine initialized
✓ Crystal-clear audio generated for: en
✓ Using voice: Hana (Saudi) for language: ar
⚠️ Using fallback voice
❌ API error: 403 Forbidden
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "API key not configured" | Set `window.GOOGLE_TTS_API_KEY` before loading scripts |
| "No audio content in response" | Check API key is valid and has quota remaining |
| "Speech Synthesis API not available" | Browser doesn't support Web Speech API (Safari, Firefox fallback available) |
| "No voices available" | Wait for `voiceschanged` event or refresh page |

### Enable Debug Mode

Add this before loading scripts:

```javascript
window.DEBUG_TTS = true;  // Enables verbose console logging
```

---

## Browser Compatibility

| Browser | HiFi Quality | Fallback | Notes |
|---------|-------------|----------|-------|
| Chrome | ✅ Full | ✅ Good | Best support |
| Edge | ✅ Full | ✅ Good | Excellent voices |
| Firefox | ⚠️ Fallback only | ✅ Good | No native support for Google TTS |
| Safari | ⚠️ Fallback only | ⚠️ Limited | Limited Web Speech API |
| Mobile (Android) | ✅ Full | ✅ Good | Google Play Services required |
| Mobile (iOS) | ⚠️ Fallback | ✅ Good | Using device voices |

---

## Advanced Configuration

### Using Alternative TTS Services

The engine is designed to support multiple backends. To add Azure or ElevenLabs:

```javascript
window.AZURE_TTS_API_KEY = 'your-key';
window.AZURE_TTS_REGION = 'eastus';

// Or ElevenLabs
window.ELEVENLABS_TTS_API_KEY = 'your-key';
```

Future versions will automatically try these fallbacks.

### Caching Strategy

Clear cache to force regeneration:

```javascript
// Clear all cached audio
window.HiFiTTS.cache = {};

// Or clear specific language
Object.keys(window.HiFiTTS.cache).forEach(key => {
  if (key.startsWith('ar-')) delete window.HiFiTTS.cache[key];
});
```

---

## Testing & Validation

### Manual Testing

```javascript
// Test all languages
['ar', 'en', 'de', 'es', 'fr'].forEach(lang => {
  setTimeout(() => {
    window.HiFiTTS.play('Testing ' + lang, lang);
  }, 2000);
});
```

### Performance Monitoring

```javascript
console.time('TTS Synthesis');
window.HiFiTTS.play('Test', 'en');
console.timeEnd('TTS Synthesis');
```

---

## Maintenance & Updates

### Regular Checks

- Monitor Google Cloud API quota usage
- Review console for errors
- Test all language voices monthly
- Update API keys if expired

### Upgrading

The engine is backwards compatible. Simply update:

```bash
# Replace hifi-tts-engine.js with latest version
# No changes needed to calling code
```

---

## Support & Resources

- **Google Cloud TTS Docs**: https://cloud.google.com/text-to-speech/docs
- **Web Speech API**: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
- **InnoDignity Contact**: nazehotman@gmail.com
- **WhatsApp**: +972 54 494 3569

---

## License & Attribution

High-Fidelity TTS Engine © 2026 InnoDignity
Licensed for use with InnoDignity ecosystem

Google Cloud Text-to-Speech API is subject to [Google Cloud Terms of Service](https://cloud.google.com/terms)

---

**Last Updated:** August 29, 2026  
**Version:** 1.0.0  
**Status:** Production Ready
