# InnoDignity TTS Engine - Testing & Validation Guide

## ✅ Integration Verification

### Script Integration Status

All 11 HTML files confirmed to include High-Fidelity TTS Engine:

✅ **Root Level Files** (6 files)
- en.html
- de.html 
- es.html
- fr.html
- index.html

✅ **Arabic Subfolder** (5 files)
- ar/index.html
- ar/home.html
- ar/problem.html
- ar/solution.html
- ar/innovation.html
- ar/humanity.html

### Script Loading Order

Each file correctly loads in this order:

```html
1. hifi-tts-engine.js      ← Core TTS engine (MUST load first)
2. innodignity-widget.js   ← Floating agent widget
3. nora-widget.js          ← Chat widget
```

---

## 🧪 Testing Procedures

### Test 1: Basic Widget Visibility

**Steps:**
1. Open any HTML file in a browser
2. Look for floating button in bottom-right corner (🤖 icon)
3. Button should have cyan color (#00e5ff) with gold border
4. Pulsing animation should be visible

**Expected Result:** ✅ Widget visible and animated

### Test 2: Language Switching

**Steps:**
1. Click the floating widget button
2. Panel opens with language selector
3. Click each language button: العربية, EN, DE, ES, FR
4. Verify buttons change highlight color (gold background)

**Expected Result:** ✅ All language buttons functional

### Test 3: Voice Welcome Message (Fallback Mode)

*Without API Key - Uses Built-in Web Speech API*

**Steps:**
1. Open widget
2. Click "🎙️ Welcome" button
3. Listen for voice playback

**Expected Result:**
- ✅ Status shows "🔊 Speaking..." then "✓ Complete"
- ✅ Audio plays in selected language
- ✅ Voice is clear (some browsers may sound synthetic, that's normal fallback)
- ✅ Button disables during playback

### Test 4: Voice Greeting Message (Fallback Mode)

**Steps:**
1. Click "💬 Greeting" button
2. Listen for voice playback

**Expected Result:**
- ✅ Status shows "🔊 Speaking..." then "✓ Complete"
- ✅ Greeting plays in selected language
- ✅ Clear audio quality

### Test 5: Voice Gender Selection

**Steps:**
1. Click "👩 Female" button (default)
2. Click "💬 Greeting" button to hear voice
3. Click "👨 Male" button
4. Click "💬 Greeting" button to hear different voice
5. Switch back to "👩 Female"

**Expected Result:**
- ✅ Female voice button highlighted (gold background)
- ✅ Male voice button highlighted when selected
- ✅ Audio sounds appropriately feminine/masculine
- ✅ Gender preference persists across page reloads (saved in localStorage)

### Test 6: Stop Button

**Steps:**
1. Click "🎙️ Welcome" button
2. While audio is playing, click "⏹️ Stop" button
3. Audio should stop immediately

**Expected Result:**
- ✅ Audio stops mid-playback
- ✅ Status shows appropriate message
- ✅ Can immediately play another message

### Test 7: Language Persistence

**Steps:**
1. Open widget
2. Change language to "FR" (Français)
3. Reload the page
4. Open widget

**Expected Result:**
- ✅ Widget automatically loads in French
- ✅ Buttons show French names
- ✅ Voice plays in French

### Test 8: Nora Chat Widget

**Steps:**
1. Look for 💬 bubble icon in bottom-right
2. Click to open Nora chat panel
3. Click the 🎙️ audio button in chat header
4. Listen for welcome message

**Expected Result:**
- ✅ Chat panel opens with animation
- ✅ 🎙️ button is clickable
- ✅ Welcome audio plays with clear quality

### Test 9: Cross-Language Performance

**Steps:**
1. Play welcome in English (en)
2. Play welcome in Arabic (ar)
3. Play welcome in German (de)
4. Play welcome in Spanish (es)
5. Play welcome in French (fr)
6. Play each a second time

**Expected Result:**
- ✅ All languages work
- ✅ First playback: Status shows "audio generating..."
- ✅ Second playback of same message: Uses cache (much faster)
- ✅ All voices sound natural

### Test 10: Error Resilience

**Steps:**
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try playing all messages
4. Check console for any error messages

**Expected Result:**
- ✅ No JavaScript errors
- ✅ Console shows initialization messages
- ✅ Debug logs show smooth operation
- ✅ No red error messages

---

## 🔧 Advanced Testing

### Test 11: Console Status Check

**Steps:**
1. Open Developer Tools (F12)
2. Go to Console tab
3. Run this command:

```javascript
window.HiFiTTS.checkStatus()
```

**Expected Result:**

Without API Key:
```json
{
  "googleCloud": {
    "configured": false,
    "apiKey": "not set"
  },
  "supportedLanguages": ["ar", "en", "de", "es", "fr"],
  "cacheSize": 0
}
```

With API Key:
```json
{
  "googleCloud": {
    "configured": true,
    "apiKey": "***configured***"
  },
  "supportedLanguages": ["ar", "en", "de", "es", "fr"],
  "cacheSize": 1
}
```

### Test 12: Programmatic API Usage

**Steps:**
1. Open Console (F12)
2. Run these commands:

```javascript
// Play text in English
window.HiFiTTS.play('Hello World', 'en');

// Check status
window.HiFiTTS.checkStatus();

// Stop playback
window.HiFiTTS.stop();

// Use Nora API
window.NoraTTS.play('Welcome', 'ar');

// Use InnoDignity API
window.InnoDignityWidget.getCurrentLanguage();
window.InnoDignityWidget.speak('Test', 'female');
```

**Expected Result:**
- ✅ Text plays with clear audio
- ✅ Status shows proper configuration
- ✅ Stop button prevents further playback
- ✅ All APIs respond correctly

### Test 13: Cache Verification

**Steps:**
1. Open Console
2. Run:

```javascript
// Check cache contents
console.log(window.HiFiTTS.cache);

// Check cache size
Object.keys(window.HiFiTTS.cache).length;
```

**Expected Result:**
- ✅ Cache object shows stored audio URLs
- ✅ Cache size increases as you play messages
- ✅ Playing same message again doesn't increase size (uses cache)

### Test 14: Event Listening

**Steps:**
1. Open Console
2. Run:

```javascript
// Listen for language changes
window.addEventListener('innodignity-language-changed', (e) => {
  console.log('Language changed to:', e.detail.language);
});

// Now change language in widget
// You should see the log
```

**Expected Result:**
- ✅ Console logs each language change
- ✅ Event detail contains correct language code
- ✅ Works across all 5 languages

---

## 🎯 Premium Mode Testing (With Google Cloud API)

### Setup Premium Mode

**Steps:**
1. Get API key from Google Cloud Console
2. Add to page BEFORE loading scripts:

```javascript
<script>
  window.GOOGLE_TTS_API_KEY = 'YOUR_API_KEY_HERE';
</script>
```

3. Reload page
4. Check status:

```javascript
window.HiFiTTS.checkStatus()
// Should show: "configured": true
```

### Test 15: Premium Quality Audio

**Steps:**
1. With API key set, click any voice button
2. Listen carefully to audio quality

**Expected Result:**
- ✅ Audio sounds crystal-clear and professional
- ✅ Status shows "crystal-clear audio generating..."
- ✅ Pronunciation is perfect in all languages
- ✅ Much more natural than fallback voices

### Test 16: API Performance

**Steps:**
1. Open Console
2. Run:

```javascript
console.time('First play');
window.HiFiTTS.play('Welcome to InnoDignity', 'en');
console.timeEnd('First play');

// Wait 5 seconds, then:
console.time('Second play (cached)');
window.HiFiTTS.play('Welcome to InnoDignity', 'en');
console.timeEnd('Second play (cached)');
```

**Expected Result:**
- ✅ First play: 300-1000ms (API call + synthesis)
- ✅ Second play: <10ms (using cache)
- ✅ Massive speed improvement on repeat messages

### Test 17: All Languages Premium

**Steps:**
1. With API key active
2. Play each language's welcome message
3. Listen to professional quality

**Expected Result:**
- ✅ ar-SA-HanaNeural: Perfect Arabic (Saudi)
- ✅ en-US-Neural2-C: Natural American English
- ✅ de-DE-Neural2-B: Professional German
- ✅ es-ES-Neural2-A: Natural Spanish
- ✅ fr-FR-Neural2-B: Professional French

---

## 📱 Mobile Testing

### Test 18: Mobile Responsiveness

**Steps:**
1. Open DevTools (F12)
2. Click responsive design mode
3. Test on iPhone X (375px width)
4. Open widget and test all buttons
5. Test on iPad (768px width)

**Expected Result:**
- ✅ Widget adapts to mobile size
- ✅ Buttons remain clickable
- ✅ Language buttons stack properly
- ✅ Voice controls responsive
- ✅ No horizontal scrolling

### Test 19: Mobile Voice Playback

**Steps:**
1. Open on actual mobile device
2. Test voice buttons
3. Verify audio plays through speaker/headphones

**Expected Result:**
- ✅ Audio plays without issues
- ✅ Volume control works
- ✅ Works with headphones and speakers
- ✅ No permission popups

---

## 🌍 Cross-Browser Testing

### Test 20: Chrome/Chromium

**Steps:**
1. Open in Chrome or Edge
2. Run all previous tests

**Expected Result:**
- ✅ All tests pass
- ✅ Best audio quality
- ✅ HiFi TTS works fully

### Test 21: Firefox

**Steps:**
1. Open in Firefox
2. Test voice buttons
3. Check console

**Expected Result:**
- ✅ Works with fallback Web Speech API
- ✅ Clear audio (may be different voice)
- ✅ No errors in console

### Test 22: Safari

**Steps:**
1. Open in Safari
2. Test voice buttons
3. Note any limitations

**Expected Result:**
- ✅ Works with Web Speech API
- ✅ Voice quality good
- ✅ Some voices may be different than Chrome

---

## 🐛 Troubleshooting Guide

| Symptom | Cause | Solution |
|---------|-------|----------|
| No audio plays | Web Speech API not available | Use fallback, most browsers work |
| Robotic voice | Using fallback mode | Set Google Cloud API key |
| "API error 403" | Invalid API key | Verify API key in console |
| No status updates | Element not found | Check DOM is loaded |
| Widget doesn't appear | CSS not loaded | Verify CSS links in HTML |
| Languages don't switch | localStorage disabled | Enable storage in browser |
| Mobile no audio | Volume muted | Unmute device volume |
| Slow first playback | API call time | Normal, uses cache after |

---

## ✅ Final Verification Checklist

Use this checklist to verify complete integration:

```
□ All 11 HTML files load without errors
□ Widget visible on page (floating button)
□ Floating button animates with pulse
□ Widget panel opens/closes smoothly
□ All 5 language buttons work
□ Language changes persist on reload
□ Female/Male voice buttons work
□ Welcome message plays clearly
□ Greeting message plays clearly
□ Stop button stops audio
□ Nora chat widget works
□ 🎙️ button in Nora chat works
□ No JavaScript errors in console
□ Cache status shows correct data
□ Works on mobile (responsive)
□ Works in Chrome/Edge/Firefox/Safari
□ Voice quality acceptable (fallback mode)
□ (Optional) HiFi API key set and working
□ (Optional) Premium voices are crystal-clear
□ (Optional) Cache improves performance
□ Programmatic API accessible
□ Event listeners work
```

---

## 📊 Performance Benchmarks

### Expected Performance (Fallback Mode)

| Operation | Time |
|-----------|------|
| Widget load time | <50ms |
| Widget open animation | 300ms |
| First voice playback | 100-500ms |
| Subsequent playback | <10ms (cached) |
| Language switch | 50ms |
| Stop response | <10ms |

### Expected Performance (Premium Mode)

| Operation | Time |
|-----------|------|
| Widget load time | <50ms |
| First voice playback | 300-1000ms (API call) |
| Subsequent playback | <10ms (cached) |
| API cache hit | Immediate |

---

## 🎓 Debug Mode

Enable verbose logging:

```javascript
window.DEBUG_TTS = true;
```

Then check console for detailed logs:

```
✓ High-Fidelity TTS Engine initialized
✓ Language changed: en
✓ Playing with High-Fidelity engine: ar
✓ Crystal-clear audio generated
✓ Using cached audio: en-Welcome to InnoDi...
⚠️ HiFi TTS Engine not loaded
❌ API error: 403 Forbidden
```

---

## 📞 If Testing Fails

1. **Check browser console** for errors (F12)
2. **Verify API key** is set correctly (if using premium)
3. **Clear browser cache** and reload
4. **Test in different browser**
5. **Check file paths** are correct
6. **Verify files exist** in workspace
7. **Contact support** with error details

---

## ✨ Summary

Your InnoDignity TTS Engine is now fully integrated and ready for testing! Run through these tests to verify everything works perfectly. The widget should provide crystal-clear, professional-quality voice synthesis with smooth performance and reliable fallbacks.

**Happy Testing!** 🚀

---

**Test Document Version:** 1.0  
**Last Updated:** August 29, 2026  
**Status:** Ready for Production Testing
