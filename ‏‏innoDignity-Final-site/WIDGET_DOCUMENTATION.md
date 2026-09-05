# InnoDignity Widget System - Complete Documentation

## Overview

The InnoDignity Widget System is a sophisticated, floating agent interface that provides:
- **Floating InnoDignity Agent (Secure) Widget** - Professional AI agent assistant
- **Multi-Language Support** - Automatic language detection and switching (AR, EN, DE, ES, FR)
- **Voice Studio Bar** - Advanced text-to-speech with female/male voice options
- **Language Switcher** - Quick language selection interface
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Web Speech API Integration** - Cross-browser compatible voice synthesis

---

## Files Included

### Core Files

1. **innodignity-widget.js** (Main Widget JavaScript)
   - Complete widget initialization and functionality
   - Language management system
   - Web Speech API voice synthesis with gender selection
   - Event handling and state management
   - Public API for external control

2. **innodignity-widget-style.css** (Widget Styling)
   - Professional gradient styling
   - Animations and transitions
   - Responsive design breakpoints
   - RTL support for Arabic
   - Accessibility features

### HTML Integration

All HTML files in the project have been updated with:
```html
<!-- In <head> section -->
<link rel="stylesheet" href="innodignity-widget-style.css">

<!-- Before closing </body> tag -->
<script src="innodignity-widget.js"></script>
```

---

## Features

### 1. Floating Agent Toggle Button

A beautiful, animated floating button in the bottom-right corner:
- Cyan color with gold border
- Pulse animation effect
- Hover effects and scale animation
- Mobile-optimized positioning

### 2. Widget Panel

When opened, displays:

#### Language Switcher
- Quick access buttons for all 5 languages
- Arabic (العربية), English, German (Deutsch), Spanish (Español), French (Français)
- Persistent language selection using localStorage
- Active language highlighting

#### Voice Studio Bar
Features include:

**Voice Gender Selection:**
- Female voice (👩) - Default
- Male voice (👨)
- Persistent preference storage
- Real-time status display

**Voice Controls:**
- 🎙️ Welcome - Play welcome message in selected language
- 💬 Greeting - Play greeting message in selected language
- ⏹️ Stop - Stop any playing audio

**Voice Status Display:**
Shows current language, gender, and playback status (e.g., "👩 Female • English")

#### Quick Links
- Official Site link
- Contact Us link

#### Widget Footer
Professional branding and copyright information

### 3. Overlay
- Semi-transparent background overlay when widget is open
- Click to close functionality
- Prevents interaction with page content behind

---

## Supported Languages

| Language | Code | Flag | Voice Code |
|----------|------|------|-----------|
| Arabic | ar | 🇸🇦 | ar-SA |
| English | en | 🇺🇸 | en-US |
| German | de | 🇩🇪 | de-DE |
| Spanish | es | 🇪🇸 | es-ES |
| French | fr | 🇫🇷 | fr-FR |

---

## Voice Messages

The widget includes pre-recorded messages for each language:

### Arabic (العربية)
- Welcome: "أهلا وسهلا بك في نظام إينو ديجنيتي"
- Greeting: "مرحبا، أنا نورا، مساعدتك الذكية الآمنة"

### English
- Welcome: "Welcome to InnoDignity System"
- Greeting: "Hello, I am Nora, your secure intelligent assistant"

### German (Deutsch)
- Welcome: "Willkommen zum InnoDignity System"
- Greeting: "Hallo, ich bin Nora, Ihre sichere intelligente Assistentin"

### Spanish (Español)
- Welcome: "Bienvenido al Sistema InnoDignity"
- Greeting: "Hola, soy Nora, tu asistente inteligente seguro"

### French (Français)
- Welcome: "Bienvenue dans le système InnoDignity"
- Greeting: "Bonjour, je suis Nora, votre assistant intelligent sécurisé"

---

## Usage

### Automatic Initialization

The widget automatically initializes on page load:
```javascript
// No additional setup required!
// Just include the script tag:
<script src="innodignity-widget.js"></script>
```

### Using the Public API

External scripts can control the widget:

```javascript
// Get current language
const lang = window.InnoDignityWidget.getCurrentLanguage();
console.log(lang); // Output: 'en'

// Set language programmatically
window.InnoDignityWidget.setLanguage('de');

// Speak custom text
window.InnoDignityWidget.speak('Hello, welcome!', 'female');

// Stop speech
window.InnoDignityWidget.stop();

// Open/Close widget
window.InnoDignityWidget.openWidget();
window.InnoDignityWidget.closeWidget();
```

### Listening to Language Changes

External code can listen for language changes:

```javascript
window.addEventListener('innodignity-language-changed', function(event) {
    const newLanguage = event.detail.language;
    console.log('Language changed to:', newLanguage);
    // Update your page content accordingly
});
```

---

## Voice Synthesis Details

### Web Speech API Support

The widget uses the Web Speech API for text-to-speech with:
- Automatic voice selection based on gender preference
- Language-specific pitch adjustment
- Rate: 1.0x (normal speed)
- Pitch: 1.3x for female, 0.8x for male
- Volume: Maximum (1.0)

### Voice Selection Algorithm

1. Detects available voices on the device
2. Filters by current language setting
3. Selects voice matching gender preference:
   - **Female voices:** Searches for keywords: "female", "woman", "samantha", "victoria"
   - **Male voices:** Searches for keywords: "male", "man", "david", "george"
4. Falls back to first available voice if no perfect match

### Browser Compatibility

- Chrome/Edge: Full support with multiple voices
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support (depends on OS voices)

---

## Customization

### Styling Customization

Edit `innodignity-widget-style.css` to customize:

**Color Scheme:**
```css
/* Cyan primary color */
#00e5ff

/* Gold accent color */
#ffd700

/* Dark blue background */
#0b1d3a
```

**Button Sizes:**
```css
.innodignity-widget-toggle {
    width: 60px;
    height: 60px;
}

.innodignity-widget-panel {
    width: 360px;
    max-height: 600px;
}
```

### Adding Custom Messages

Edit `innodignity-widget.js` to add custom voice messages:

```javascript
const VOICE_MESSAGES = {
    ar: {
        welcome: 'Your custom Arabic welcome message',
        greeting: 'Your custom Arabic greeting',
        custom: 'New message' // Add new messages
    },
    // ... other languages
};
```

### Changing Voice Gender Default

In `innodignity-widget.js`:
```javascript
let currentVoiceGender = 'female'; // Change to 'male' or other value
```

---

## Accessibility Features

✅ **Keyboard Support:**
- Tab navigation through all buttons
- Enter/Space to activate buttons
- Escape to close widget (can be added)

✅ **Visual Accessibility:**
- High contrast colors (cyan, gold on dark background)
- Focus indicators on interactive elements
- Clear button labels

✅ **Screen Reader Friendly:**
- Semantic HTML structure
- ARIA labels on buttons
- Clear text labels for all controls

✅ **Mobile Responsive:**
- Adaptive layout for screens < 480px
- Touch-friendly button sizes
- Mobile-optimized positioning

---

## RTL (Right-to-Left) Support

Automatic RTL support for Arabic:
```css
html[dir="rtl"] .innodignity-widget-toggle {
    right: auto;
    left: 30px;
}

html[dir="rtl"] .innodignity-widget-panel {
    direction: rtl;
}
```

The widget detects the HTML lang attribute and `dir` attribute automatically.

---

## Local Storage

The widget uses browser localStorage to persist user preferences:

```javascript
// Saved preferences:
localStorage.getItem('innodignity_language')      // Current language
localStorage.getItem('innodignity_voice_gender')  // Voice preference
```

These are automatically saved and restored on page reload.

---

## Performance

- **File Size:**
  - innodignity-widget.js: ~12 KB (minified: ~6 KB)
  - innodignity-widget-style.css: ~8 KB (minified: ~4 KB)

- **Load Time:** Non-blocking async initialization
- **Memory:** Minimal footprint, event-driven
- **DOM Impact:** Single container element with Shadow DOM-like encapsulation

---

## Error Handling

The widget gracefully handles:
- ❌ Missing Web Speech API (displays error message)
- ❌ Unavailable voices for language
- ❌ Speech synthesis errors
- ❌ LocalStorage access denied
- ✅ All failures degrade gracefully

---

## Integration Examples

### Example 1: Basic Usage
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="innodignity-widget-style.css">
</head>
<body>
    <h1>My InnoDignity Page</h1>
    
    <script src="innodignity-widget.js"></script>
</body>
</html>
```

### Example 2: Custom Language Switching
```html
<button onclick="window.InnoDignityWidget.setLanguage('de')">
    Switch to German
</button>

<button onclick="window.InnoDignityWidget.speak('Custom text')">
    Speak
</button>
```

### Example 3: Reacting to Language Changes
```javascript
window.addEventListener('innodignity-language-changed', (e) => {
    const lang = e.detail.language;
    
    // Update your page content
    document.documentElement.lang = lang;
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
});
```

---

## Troubleshooting

### Widget not appearing?
- Verify both CSS and JS files are linked
- Check browser console for errors
- Ensure z-index is high enough (10000+)

### Voice not playing?
- Check browser's Web Speech API support
- Ensure microphone/speaker is enabled
- Try different browser
- Check language is supported on device

### Text highlighting not working?
- This feature works with the HTML page's `speakText()` function
- Widget's voice commands work independently

### Widget closes immediately?
- Check for JavaScript errors
- Verify overlay click handler is attached
- Clear browser cache

---

## Technical Stack

- **Language:** Vanilla JavaScript (ES5 compatible)
- **CSS:** Modern CSS3 with Flexbox and Gradients
- **API:** Web Speech API (speechSynthesis)
- **Storage:** LocalStorage API
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)

---

## Security Considerations

✅ **Privacy:**
- No external API calls for voice synthesis
- Uses browser's built-in Web Speech API
- All data stored locally (localStorage only)
- No telemetry or tracking

✅ **Code Safety:**
- No eval() or dynamic code execution
- No external CDN dependencies
- Self-contained implementation
- Sandbox-compatible

---

## Version History

### v1.0.0 (Current)
- ✅ Complete floating agent widget
- ✅ Multi-language support (5 languages)
- ✅ Voice gender selection (female/male)
- ✅ Language switcher
- ✅ Voice studio controls
- ✅ Responsive design
- ✅ RTL support
- ✅ localStorage persistence
- ✅ Public API
- ✅ Accessibility features

---

## Support & Contact

**For issues or questions:**
- Email: nazehotman@gmail.com
- WhatsApp: +972 54 494 3569
- Official Site: https://innodignity.com

---

## License

© 2026 InnoDignity - All Rights Reserved

This widget system is part of the InnoDignity project and is subject to the project's licensing terms.

---

## Changelog

**v1.0.0 - Initial Release**
- Complete widget system implementation
- All 5 languages integrated
- Voice synthesis with gender options
- Full documentation

---

*Last Updated: August 29, 2026*
*Developed for InnoDignity Sovereign Bio-Intelligence Ecosystem*
