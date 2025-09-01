(() => {
  // ---------- Config ----------
  const SKIP_TAGS = new Set(["SCRIPT","STYLE","NOSCRIPT","CODE","PRE","TEXTAREA","INPUT","SELECT"]);
  const BN_RANGE = /[\u0980-\u09FF]/; // Bengali Unicode block check
  const ZW_RE = /[\u200C\u200D]/g;    // ZWJ/ZWNJ
  const BN_VIRAMA = "\u09CD";
  const BN_NUKTA = "\u09BC";
  const BN_YA = "\u09AF";  // য
  const BN_YO = "\u09DF";  // য়

  // ---------- Bengali → Devanagari maps & rules ----------
  const map = {
    // independent vowels
    "অ":"अ","আ":"आ","ই":"इ","ঈ":"ई","উ":"उ","ঊ":"ऊ",
    "ঋ":"ऋ","ৠ":"ॠ","এ":"ए","ঐ":"ऐ","ও":"ओ","ঔ":"औ",
    // Consonants
      "ক": "क", "খ": "ख", "গ": "ग", "ঘ": "घ", "ঙ": "ङ",
      "চ": "च", "ছ": "छ", "জ": "ज", "ঝ": "झ", "ঞ": "ञ",
      "ট": "ट", "ঠ": "ठ", "ড": "ड", "ঢ": "ढ", "ণ": "ण",
      "ত": "त", "থ": "थ", "দ": "द", "ধ": "ध", "ন": "न",
      "প": "प", "ফ": "फ", "ব": "ब", "ভ": "भ", "ম": "म",
      "য": "य", "র": "र", "ল": "ल", "শ": "श", "ষ": "ष",
      "স": "स", "হ": "ह","ৎ": "त्","ঽ": "ऽ",
    // matras
    "া":"ा","ি":"ि","ী":"ी","ু":"ु","ূ":"ू","ৃ":"ृ",
    "ে":"े","ৈ":"ै","ো":"ो","ৌ":"ौ",
    // signs
    "ঁ":"ं","ং":"ं","ঃ":"ः","্":"्",
    // digits
    "০":"०","১":"१","২":"२","৩":"३","৪":"४",
    "৫":"५","৬":"६","৭":"७","৮":"८","৯":"९",
    // punctuation (preserve)
    "।":"।","॥":"॥"
  };

  // helper: escape a string for regex character class
  const escapeForClass = s => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // consonants set (we'll use this when building conjunct regexes)
  const CONSONANTS = "কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়";

  // Normalize function (remove ZWJ/ZWNJ and normalize য+nukta → য়)
  function normalizeBn(str) {
    return str.replace(ZW_RE, "").replace(new RegExp(BN_YA + BN_NUKTA, "g"), BN_YO);
  }

  // Conjunct / special-case rules (apply before char-by-char mapping)
  function applyConjunctRules(s) {
    // common ligatures to Devanagari (Bengali sequences)
    s = s.replace(/ক্ষ/g, "क्ष")
         .replace(/জ্ঞ/g, "ज्ञ")
         .replace(/ত্র/g, "त्र")
         .replace(/প্র/g, "प्र")
         .replace(/ব্র/g, "ब्र")
         .replace(/স্ত্র/g, "स्त्र");

    // ya-phala: C + virama + (য or য়)  ->  mapped_consonant + "्य"
    const consClass = "[" + escapeForClass(CONSONANTS) + "]";
    const yaRegex = new RegExp("(" + consClass + ")" + BN_VIRAMA + "[" + BN_YA + BN_YO + "]", "g");
    s = s.replace(yaRegex, (m, c) => (map[c] || c) + "्य");

    // ra-phala: C + virama + (র or ৰ) -> mapped_consonant + "्र"
    const raChars = "\u09B0\u09F0"; // র + ৰ
    const raRegex = new RegExp("(" + consClass + ")" + BN_VIRAMA + "[" + escapeForClass(raChars) + "]", "g");
    s = s.replace(raRegex, (m, c) => (map[c] || c) + "्र");

    return s;
  }

  // Main transliteration of a string
  function transliterateString(input) {
    if (!input || !BN_RANGE.test(input)) return input; // quick skip if no bengali
    let s = normalizeBn(input);
    s = applyConjunctRules(s);

    // char-by-char mapping (if character is already Devanagari we leave it)
    const out = Array.from(s).map(ch => {
      if (ch === BN_YO || ch === "য়") return "य"; // extra precaution
      if (ch === BN_NUKTA) return ""; // drop stray nukta
      if (map[ch] !== undefined) return map[ch];
      return ch; // leave any non-Bengali or already-Devanagari chars alone
    });
    return out.join("");
  }

  // Transliterate a text node (in-place)
  function transliterateTextNode(tnode) {
    if (!tnode || !tnode.nodeValue) return;
    if (!BN_RANGE.test(tnode.nodeValue)) return; // skip
    tnode.nodeValue = transliterateString(tnode.nodeValue);
  }

  // Transliterate all text nodes under an element (efficient TreeWalker)
  function transliterateElement(rootEl) {
    if (!rootEl) return;
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
    let cur;
    while ((cur = walker.nextNode())) {
      // skip if parent is a tag we shouldn't touch
      const p = cur.parentNode;
      if (p && p.nodeType === 1 && SKIP_TAGS.has(p.nodeName)) continue;
      transliterateTextNode(cur);
    }
  }

  // ---------- Initial run ----------
  transliterateElement(document.body);

  // ---------- MutationObserver (safe) ----------
  let observer;
  observer = new MutationObserver((mutations) => {
    // Disconnect while we process to avoid reacting to our own edits
    observer.disconnect();

    try {
      for (const m of mutations) {
        if (m.type === "childList") {
          // newly added DOM nodes (e.g. dynamic page content)
          m.addedNodes.forEach(node => {
            if (!node) return;
            if (node.nodeType === Node.TEXT_NODE) {
              transliterateTextNode(node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Skip whole subtrees that are in SKIP_TAGS
              if (SKIP_TAGS.has(node.nodeName)) return;
              transliterateElement(node);
            }
          });
        } else if (m.type === "characterData") {
          // a text node changed (update it)
          transliterateTextNode(m.target);
        }
      }
    } finally {
      // Reconnect observer after processing
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  });

  // Start observing
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  console.log("✅ Transliterator active — initial pass done. Watching DOM changes (safe mode).");
})();
