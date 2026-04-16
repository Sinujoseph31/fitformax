import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X, Search, Plus, Loader, ArrowRight, Trash2, Sparkles, Mic, MicOff, Package, CheckCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiCall } from '../../utils/api';

const OFF_SEARCH_API = 'https://world.openfoodfacts.org/api/v0/search.pl';

const QUICK_SUGGESTIONS = [
  'Chicken Breast', 'Brown Rice', 'Oats', 'Banana', 'Egg', 'Paneer',
  'Dal', 'Chapati', 'Greek Yogurt', 'Salmon', 'Sweet Potato', 'Avocado',
];

const COMMON_FOODS = [
  { name: 'Chicken Breast (Cooked)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Chicken Thigh (Cooked)', calories: 209, protein: 26, carbs: 0, fat: 10.9 },
  { name: 'Egg (Large Boiled)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Egg White (1 large)', calories: 17, protein: 3.6, carbs: 0.2, fat: 0.1 },
  { name: 'Paneer (Indian Cottage Cheese)', calories: 265, protein: 18, carbs: 1.2, fat: 20 },
  { name: 'Whey Protein (1 Scoop)', calories: 120, protein: 24, carbs: 3, fat: 1.5 },
  { name: 'Greek Yogurt (Plain)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Salmon (Grilled)', calories: 208, protein: 22, carbs: 0, fat: 13 },
  { name: 'Tofu (Extra Firm)', calories: 83, protein: 10, carbs: 1.2, fat: 5 },
  { name: 'Beef Steak (Sirloin)', calories: 250, protein: 26, carbs: 0, fat: 15 },
  { name: 'Mutton / Lamb (Cooked)', calories: 294, protein: 25, carbs: 0, fat: 21 },
  { name: 'Fish (Tilapia/White)', calories: 128, protein: 26, carbs: 0, fat: 2.7 },
  { name: 'Turkey Breast', calories: 135, protein: 30, carbs: 0, fat: 1 },
  { name: 'Prawns / Shrimp', calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
  { name: 'White Rice (Cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Brown Rice (Cooked)', calories: 112, protein: 2.3, carbs: 24, fat: 0.8 },
  { name: 'Chapati / Roti (1 pc)', calories: 85, protein: 3, carbs: 18, fat: 0.5 },
  { name: 'Paratha (Plain, 1 pc)', calories: 260, protein: 5, carbs: 35, fat: 11 },
  { name: 'Naan (1 pc)', calories: 262, protein: 9, carbs: 45, fat: 5 },
  { name: 'Oats (Cooked/Milk)', calories: 150, protein: 6, carbs: 25, fat: 3 },
  { name: 'Sweet Potato (Boiled)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { name: 'Potato (Boiled)', calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  { name: 'Quinoa (Cooked)', calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
  { name: 'Bread (Whole Wheat, 1 Slice)', calories: 69, protein: 3.6, carbs: 12, fat: 0.9 },
  { name: 'Pasta (Cooked)', calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  { name: 'Idli (1 pc)', calories: 58, protein: 1.6, carbs: 12, fat: 0.1 },
  { name: 'Dosa (Plain, 1 pc)', calories: 133, protein: 2, carbs: 25, fat: 3.5 },
  { name: 'Upma (1 cup)', calories: 192, protein: 4.5, carbs: 36, fat: 3.5 },
  { name: 'Poha (1 cup)', calories: 180, protein: 3.5, carbs: 25, fat: 8 },
  { name: 'Dal (Tarka/Yellow Cooked)', calories: 116, protein: 8, carbs: 18, fat: 2 },
  { name: 'Chickpeas (Chana Cooked)', calories: 164, protein: 8.9, carbs: 27, fat: 2.6 },
  { name: 'Rajma (Kidney Beans Cooked)', calories: 127, protein: 8.7, carbs: 23, fat: 0.5 },
  { name: 'Lentils (Cooked)', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Soy Chunks (Cooked)', calories: 123, protein: 24, carbs: 7, fat: 0.5 },
  { name: 'Banana (Medium)', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { name: 'Apple (Medium)', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15 },
  { name: 'Papaya', calories: 43, protein: 0.5, carbs: 11, fat: 0.3 },
  { name: 'Mango', calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  { name: 'Watermelon', calories: 30, protein: 0.6, carbs: 8, fat: 0.2 },
  { name: 'Grapes', calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
  { name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },
  { name: 'Strawberries', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  { name: 'Guava', calories: 68, protein: 2.5, carbs: 14, fat: 1 },
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: 'Spinach (Cooked)', calories: 23, protein: 3, carbs: 3.6, fat: 0.3 },
  { name: 'Carrots (Raw)', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  { name: 'Cucumber', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
  { name: 'Cauliflower', calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  { name: 'Mushrooms', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  { name: 'Peanut Butter (1 tbsp)', calories: 94, protein: 4, carbs: 3, fat: 8 },
  { name: 'Almonds (10 pcs)', calories: 70, protein: 2.5, carbs: 2.5, fat: 6 },
  { name: 'Walnuts (5 pcs)', calories: 130, protein: 3, carbs: 2.5, fat: 13 },
  { name: 'Olive Oil (1 tbsp)', calories: 119, protein: 0, carbs: 0, fat: 13.5 },
  { name: 'Ghee / Clarified Butter (1 tbsp)', calories: 112, protein: 0, carbs: 0, fat: 12.7 },
  { name: 'Milk (Full Fat)', calories: 64, protein: 3.3, carbs: 4.8, fat: 3.7 },
  { name: 'Milk (Skimmed)', calories: 35, protein: 3.4, carbs: 5, fat: 0.1 },
  { name: 'Coffee (Black)', calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  { name: 'Green Tea', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { name: 'Coconut Water', calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2 },
  { name: 'Samosa (1 pc)', calories: 262, protein: 3.5, carbs: 24, fat: 17 },
  { name: 'Puttu (1 pc / ~100g)', calories: 165, protein: 3.4, carbs: 36, fat: 0.4 },
  { name: 'Idiyappam (1 pc)', calories: 110, protein: 2, carbs: 24, fat: 0.5 },
  { name: 'Appam (1 pc)', calories: 120, protein: 2.5, carbs: 23, fat: 2 },
  { name: 'Biryani (Chicken, 1 cup)', calories: 290, protein: 18, carbs: 38, fat: 7 },
  { name: 'Kadai Paneer (1 cup)', calories: 268, protein: 16, carbs: 12, fat: 18 },
  { name: 'Butter Chicken (1 cup)', calories: 310, protein: 22, carbs: 14, fat: 19 },
  { name: 'Dal Makhani (1 cup)', calories: 195, protein: 10, carbs: 28, fat: 5 },
  { name: 'Sambar (1 cup)', calories: 90, protein: 5, carbs: 14, fat: 2 },
  { name: 'Mixed Nuts (1 handful)', calories: 172, protein: 6, carbs: 6, fat: 15 },
  { name: 'Dark Chocolate (1 square)', calories: 60, protein: 0.8, carbs: 4.5, fat: 4.5 },
  { name: 'Dates (2 pcs)', calories: 40, protein: 0.4, carbs: 11, fat: 0.1 },
].map(f => ({ ...f, id: 'local-' + f.name, isLocal: true }));

function extractMacros(item) {
  if (item.isLocal || item.isAI) return item;
  const n = item.nutriments || {};
  const kcal = n['energy-kcal_100g'] || n['energy-kcal'] || n['energy-kcal_value'] || 0;
  return {
    name: (item.product_name || item.generic_name || 'Unknown').trim(),
    calories: Math.round(kcal || (n['energy_100g'] / 4.184) || 0),
    protein: Math.round((n['proteins_100g'] || 0) * 10) / 10,
    carbs:   Math.round((n['carbohydrates_100g'] || 0) * 10) / 10,
    fat:     Math.round((n['fat_100g'] || 0) * 10) / 10,
    isBranded: true,
  };
}

const SOURCE_BADGES = {
  local:   { label: 'Verified', color: '#00f5a0', bg: 'rgba(0,245,160,0.1)', border: 'rgba(0,245,160,0.25)', Icon: CheckCircle },
  branded: { label: 'Branded', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)', Icon: Package },
  ai:      { label: 'Neural', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)', Icon: Sparkles },
};

function SourceBadge({ item }) {
  const src = item.isAI ? SOURCE_BADGES.ai : item.isLocal ? SOURCE_BADGES.local : SOURCE_BADGES.branded;
  const { label, color, bg, border, Icon } = src;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      fontSize: '0.58rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px',
      background: bg, color, border: `1px solid ${border}`,
      padding: '2px 6px', borderRadius: 4,
    }}>
      <Icon size={8} /> {label}
    </span>
  );
}

function VoiceWave({ active }) {
  return (
    <div className="voice-wave-bars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`voice-bar ${active ? 'voice-bar-animate' : ''}`}
          style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

export default function FoodSearchModal({ mealType, onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(100);
  const [unit, setUnit] = useState('g');
  const [queuedFoods, setQueuedFoods] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [activeStream, setActiveStream] = useState(null); // 'local' | 'branded' | 'neural'
  const debounceRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  const UNITS = [
    { id: 'g',     label: 'Grams',  mult: 1 },
    { id: 'ml',    label: 'ML',     mult: 1 },
    { id: 'glass', label: 'Glass',  mult: 250 },
    { id: 'cup',   label: 'Cup',    mult: 200 },
    { id: 'piece', label: 'Piece',  mult: 100 },
    { id: 'bowl',  label: 'Bowl',   mult: 300 },
  ];

  // ── Voice Setup ──────────────────────────────────────────────────────
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-IN'; // Indian English for better regional food names

    rec.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('');
      setVoiceTranscript(transcript);
      if (e.results[0].isFinal) {
        setQuery(transcript);
        search(transcript);
        setIsListening(false);
        setVoiceTranscript('');
      }
    };

    rec.onerror = () => { setIsListening(false); setVoiceTranscript(''); };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Voice search is not supported in this browser. Try Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setQuery('');
      setResults([]);
      setIsListening(true);
      setVoiceTranscript('');
      recognitionRef.current.start();
    }
  };

  // ── Multi-Stream Search ───────────────────────────────────────────────
  const search = useCallback(async (q) => {
    if (!q.trim() || q.length < 2) { setResults([]); setActiveStream(null); return; }
    setLoading(true);

    // STREAM 1: Local database — instant
    setActiveStream('local');
    const terms = q.toLowerCase().split(' ').filter(t => t);
    const locals = COMMON_FOODS.filter(f => terms.some(t => f.name.toLowerCase().includes(t)));
    setResults(locals);

    let combined = [...locals];

    // STREAM 2: Open Food Facts (branded products)
    setActiveStream('branded');
    try {
      const offRes = await fetch(`${OFF_SEARCH_API}?search_terms=${encodeURIComponent(q)}&page_size=12&json=1`);
      const offData = await offRes.json();
      if (offData?.products) {
        const branded = offData.products
          .filter(p => p.product_name && p.nutriments)
          .slice(0, 10);
        combined = [...combined, ...branded];
        setResults([...combined]);
      }
    } catch (e) {
      console.warn('[FoodSearch] OFF stream failed:', e.message);
    }

    // STREAM 3: Neural AI — finds ANYTHING not in local/branded
    setActiveStream('neural');
    try {
      const aiResult = await apiCall('/ai/food-lookup', 'POST', { query: q });
      console.log('[FoodSearch] AI result:', aiResult);
      if (aiResult) {
        const aiData = Array.isArray(aiResult) ? aiResult : [aiResult];
        // Only filter out completely null/empty items — NOT by name match
        const formattedAI = aiData
          .filter(item => item && item.name && typeof item.calories === 'number')
          .map(item => ({ ...item, isAI: true, id: 'ai-' + Math.random().toString(36).slice(2) }));
        // Prepend AI results so they appear first
        combined = [...formattedAI, ...combined];
        setResults([...combined].slice(0, 20));
      }
    } catch (e) {
      console.warn('[FoodSearch] Neural stream failed:', e.message);
    }

    setActiveStream(null);
    setLoading(false);
  }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 600);
  };

  // ── Portion & Queue ───────────────────────────────────────────────────
  const handleQueue = () => {
    if (!selected) return;
    const currentMult = UNITS.find(u => u.id === unit).mult;
    const ratio = (qty * currentMult) / 100;

    const foodToAdd = {
      ...selected,
      calories: Math.round(selected.calories * ratio),
      protein:  Math.round(selected.protein * ratio * 10) / 10,
      carbs:    Math.round(selected.carbs * ratio * 10) / 10,
      fat:      Math.round(selected.fat * ratio * 10) / 10,
      qty: Math.round(qty * currentMult),
      displayQty: `${qty} ${unit}`,
      id: Date.now(),
    };

    setQueuedFoods(prev => [...prev, foodToAdd]);
    setSelected(null);
    setQuery('');
    setResults([]);
  };

  const handleFinalSubmit = () => {
    queuedFoods.forEach(f => onAdd(f));
    onClose();
  };

  const removeFromQueue = (id) => setQueuedFoods(prev => prev.filter(f => f.id !== id));

  const currentRatio = (qty * UNITS.find(u => u.id === unit).mult) / 100;

  const streamLabel = activeStream === 'local' ? 'Scanning local database…'
    : activeStream === 'branded' ? 'Searching branded products…'
    : activeStream === 'neural' ? 'Running Neural AI lookup…'
    : null;

  return (
    <div className="fsm-overlay" onClick={onClose}>
      <motion.div className="fsm-modal" initial={{ y: 30, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0.97 }} transition={{ type: 'spring', damping: 22, stiffness: 300 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="fsm-header">
          <div>
            <h3>Food Finder</h3>
            <p>to {mealType}</p>
          </div>
          <button className="fsm-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Queued Items */}
        {queuedFoods.length > 0 && (
          <div className="fsm-queue">
            <div className="fsm-queue-header">
              <span><Zap size={12} style={{ marginRight: 4 }} />{queuedFoods.length} item{queuedFoods.length > 1 ? 's' : ''} ready</span>
              <button className="fsm-log-all" onClick={handleFinalSubmit}>
                Log All <ArrowRight size={14} style={{ marginLeft: 6 }} />
              </button>
            </div>
            <div className="fsm-queue-list">
              {queuedFoods.map(f => (
                <div key={f.id} className="fsm-queue-item">
                  <span>{f.name} ({f.displayQty})</span>
                  <button onClick={() => removeFromQueue(f.id)}><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar with Voice */}
        <div className="fsm-search">
          <Search size={18} className="fsm-search-icon" />
          <input
            ref={inputRef}
            autoFocus
            placeholder={isListening ? 'Listening… say your food name' : 'Search any food (e.g. Puttu, Chicken Curry)'}
            value={isListening ? voiceTranscript || '' : query}
            onChange={handleInput}
          />
          <button
            className={`fsm-voice-btn ${isListening ? 'fsm-voice-active' : ''}`}
            onClick={toggleVoice}
            title={isListening ? 'Stop listening' : 'Voice search'}
          >
            {isListening ? (
              <><VoiceWave active /><MicOff size={16} /></>
            ) : (
              <Mic size={16} />
            )}
          </button>
          {loading && !isListening && <Loader size={16} className="fsm-loader spin" />}
        </div>

        {/* Stream Status Bar */}
        <AnimatePresence>
          {streamLabel && (
            <motion.div className="fsm-stream-status" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <span className={`stream-dot stream-dot-${activeStream}`} />
              {streamLabel}
            </motion.div>
          )}
        </AnimatePresence>

        {!selected ? (
          <div className="fsm-results">
            {/* Quick Suggestions (shown when no query) */}
            {query.length === 0 && (
              <div className="fsm-suggestions">
                <p className="fsm-suggestions-label">Quick picks</p>
                <div className="fsm-suggestion-chips">
                  {QUICK_SUGGESTIONS.map(s => (
                    <button key={s} className="fsm-chip" onClick={() => { setQuery(s); search(s); }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {results.map((item, i) => {
                const m = extractMacros(item);
                if (!m.name) return null;
                return (
                  <motion.button
                    key={item.id || i}
                    className="fsm-item"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => { setSelected(m); setQty(unit === 'g' || unit === 'ml' ? 100 : 1); }}
                  >
                    <div className="fsm-item-top">
                      <div className="fsm-item-name">{m.name}</div>
                      <SourceBadge item={item} />
                    </div>
                    <div className="fsm-item-macros">
                      <span className="cal">{m.calories} kcal</span>
                      <span>P {m.protein}g</span>
                      <span>C {m.carbs}g</span>
                      <span>F {m.fat}g</span>
                      <span className="fsm-per100">per 100g</span>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>

            {query.length > 1 && results.length === 0 && !loading && (
              <motion.div className="fsm-no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Sparkles size={24} style={{ opacity: 0.3, marginBottom: 8 }} />
                <p>No matches found.</p>
                <span>Try rewording (e.g. "Kerala Puttu" or "Boiled Egg")</span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="fsm-portion">
            <button className="fsm-back" onClick={() => setSelected(null)}>← Back to results</button>

            <div className="fsm-selected-header">
              <div className="fsm-selected-name">{selected.name}</div>
              <SourceBadge item={selected} />
            </div>

            <div className="fsm-unit-selector">
              {UNITS.map(u => (
                <button key={u.id} className={`fsm-unit-btn ${unit === u.id ? 'active' : ''}`}
                  onClick={() => { setUnit(u.id); setQty(u.id === 'g' || u.id === 'ml' ? 100 : 1); }}>
                  {u.label}
                </button>
              ))}
            </div>

            <div className="fsm-qty-row">
              <label>Portion Amount</label>
              <div className="fsm-qty-ctrl">
                <button onClick={() => setQty(Math.max(1, qty - (unit === 'g' || unit === 'ml' ? 10 : 1)))}>−</button>
                <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} />
                <button onClick={() => setQty(qty + (unit === 'g' || unit === 'ml' ? 10 : 1))}>+</button>
              </div>
            </div>

            <div className="fsm-preview">
              <div className="fsm-prev-item fsm-prev-cals">
                <span className="fsm-prev-val">{Math.round(selected.calories * currentRatio)}</span>
                <span className="fsm-prev-label">Calories</span>
              </div>
              <div className="fsm-prev-item">
                <span className="fsm-prev-val">{(selected.protein * currentRatio).toFixed(1)}</span>
                <span className="fsm-prev-label">Protein (g)</span>
              </div>
              <div className="fsm-prev-item">
                <span className="fsm-prev-val">{(selected.carbs * currentRatio).toFixed(1)}</span>
                <span className="fsm-prev-label">Carbs (g)</span>
              </div>
              <div className="fsm-prev-item">
                <span className="fsm-prev-val">{(selected.fat * currentRatio).toFixed(1)}</span>
                <span className="fsm-prev-label">Fat (g)</span>
              </div>
            </div>

            <button className="fsm-add-btn" onClick={handleQueue}>
              <Plus size={18} /> Add to Meal
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
