import React, { useState, useCallback, useRef } from 'react';
import { X, Search, Plus, Loader, ArrowRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OFF_SEARCH_API = 'https://world.openfoodfacts.org/api/v0/search.pl';

const COMMON_FOODS = [
  // Proteins - Meats & Veg
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
  
  // Carbs & Grains
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
  
  // Dals & Legumes
  { name: 'Dal (Tarka/Yellow Cooked)', calories: 116, protein: 8, carbs: 18, fat: 2 },
  { name: 'Chickpeas (Chana Cooked)', calories: 164, protein: 8.9, carbs: 27, fat: 2.6 },
  { name: 'Rajma (Kidney Beans Cooked)', calories: 127, protein: 8.7, carbs: 23, fat: 0.5 },
  { name: 'Lentils (Cooked)', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Soy Chunks (Cooked)', calories: 123, protein: 24, carbs: 7, fat: 0.5 },
  
  // Fruits
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

  // Vegetables
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: 'Spinach (Cooked)', calories: 23, protein: 3, carbs: 3.6, fat: 0.3 },
  { name: 'Carrots (Raw)', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  { name: 'Cucumber', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
  { name: 'Cauliflower', calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
  { name: 'Mushrooms', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  
  // Fats & Nuts
  { name: 'Peanut Butter (1 tbsp)', calories: 94, protein: 4, carbs: 3, fat: 8 },
  { name: 'Almonds (10 pcs)', calories: 70, protein: 2.5, carbs: 2.5, fat: 6 },
  { name: 'Walnuts (5 pcs)', calories: 130, protein: 3, carbs: 2.5, fat: 13 },
  { name: 'Olive Oil (1 tbsp)', calories: 119, protein: 0, carbs: 0, fat: 13.5 },
  { name: 'Ghee / Clarified Butter (1 tbsp)', calories: 112, protein: 0, carbs: 0, fat: 12.7 },
  { name: 'Butter (1 tbsp)', calories: 102, protein: 0.1, carbs: 0, fat: 11.5 },
  { name: 'Flax Seeds (1 tbsp)', calories: 55, protein: 1.9, carbs: 3, fat: 4.3 },
  { name: 'Chia Seeds (1 tbsp)', calories: 60, protein: 2, carbs: 5, fat: 4 },
  
  // Dairy & Bev
  { name: 'Milk (Full Fat)', calories: 64, protein: 3.3, carbs: 4.8, fat: 3.7 },
  { name: 'Milk (Skimmed)', calories: 35, protein: 3.4, carbs: 5, fat: 0.1 },
  { name: 'Cheese (Cheddar, 1 slice)', calories: 113, protein: 7, carbs: 0.4, fat: 9 },
  { name: 'Coffee (Black)', calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  { name: 'Green Tea', calories: 0, protein: 0, carbs: 0, fat: 0 },
  { name: 'Honey (1 tsp)', calories: 21, protein: 0, carbs: 6, fat: 0 },
  { name: 'Coconut Water', calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2 },
  { name: 'Almond Milk (Unsweetened)', calories: 15, protein: 0.6, carbs: 0.3, fat: 1.2 },
  { name: 'Orange Juice (1 cup)', calories: 112, protein: 1.7, carbs: 26, fat: 0.5 },
  
  // More Snacks & Indian Bites
  { name: 'Samosa (1 pc)', calories: 262, protein: 3.5, carbs: 24, fat: 17 },
  { name: 'Vada Pav (1 pc)', calories: 300, protein: 7, carbs: 45, fat: 12 },
  { name: 'Medu Vada (1 pc)', calories: 97, protein: 2, carbs: 12, fat: 4.5 },
  { name: 'Mixed Nuts (1 handful)', calories: 172, protein: 6, carbs: 6, fat: 15 },
  { name: 'Popcorn (Air-popped, 1 cup)', calories: 31, protein: 1, carbs: 6, fat: 0.4 },
  { name: 'Dark Chocolate (1 square)', calories: 60, protein: 0.8, carbs: 4.5, fat: 4.5 },
  { name: 'Hummus (2 tbsp)', calories: 50, protein: 2, carbs: 4, fat: 3 },
  { name: 'Roasted Chana (1 tbsp)', calories: 45, protein: 2.5, carbs: 6, fat: 1 },
  { name: 'Masala Oats (1 cup)', calories: 160, protein: 5, carbs: 28, fat: 3.5 },
  
  // Additional Protein & Veg
  { name: 'Chicken Sausage (1pc)', calories: 90, protein: 12, carbs: 1, fat: 4 },
  { name: 'Baked Beans (100g)', calories: 155, protein: 6, carbs: 21, fat: 0.5 },
  { name: 'Corn (Sweet/Boiled)', calories: 86, protein: 3, carbs: 19, fat: 1.2 },
  { name: 'Mixed Vegetables (Steamed)', calories: 45, protein: 2, carbs: 9, fat: 0.2 },
  { name: 'Lentil Soup (1 cup)', calories: 160, protein: 10, carbs: 24, fat: 2 },
  { name: 'Cottage Cheese (Plain)', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
  { name: 'Peanuts (Roasted, 1 tbsp)', calories: 52, protein: 2.4, carbs: 1.5, fat: 4.4 },
  { name: 'Pumpkin Seeds (1 tbsp)', calories: 56, protein: 3, carbs: 1, fat: 4.8 },
  { name: 'Sunflower Seeds (1 tbsp)', calories: 51, protein: 1.7, carbs: 1.7, fat: 4.5 },
  { name: 'Dates (2 pcs)', calories: 40, protein: 0.4, carbs: 11, fat: 0.1 },
  { name: 'Fig (Anjeer, 1 pc)', calories: 47, protein: 0.6, carbs: 12, fat: 0.2 },
  { name: 'Cashews (5 pcs)', calories: 45, protein: 1.5, carbs: 2.5, fat: 3.5 },
  { name: 'Pistachios (10 pcs)', calories: 40, protein: 1.5, carbs: 2, fat: 3 },
].map(f => ({ ...f, id: 'local-' + f.name, isLocal: true }));

function extractMacros(item) {
  if (item.isLocal) return item;
  const n = item.nutriments || {};
  const kcal = n['energy-kcal_100g'] || n['energy-kcal'] || n['energy-kcal_value'] || 0;
  return {
    name: (item.product_name || item.generic_name || 'Unknown').trim(),
    calories: Math.round(kcal || (n['energy_100g'] / 4.184) || 0),
    protein: Math.round((n['proteins_100g'] || 0) * 10) / 10,
    carbs:   Math.round((n['carbohydrates_100g'] || 0) * 10) / 10,
    fat:     Math.round((n['fat_100g'] || 0) * 10) / 10,
  };
}

export default function FoodSearchModal({ mealType, onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(100);
  const [unit, setUnit] = useState('g');
  const [queuedFoods, setQueuedFoods] = useState([]);
  const debounceRef = useRef(null);

  const UNITS = [
    { id: 'g',     label: 'Grams',      mult: 1 },
    { id: 'ml',    label: 'ML',         mult: 1 },
    { id: 'glass', label: 'Glass',      mult: 250 },
    { id: 'cup',   label: 'Cup',        mult: 200 },
    { id: 'piece', label: 'Piece',      mult: 100 },
  ];

  const search = useCallback(async (q) => {
    if (!q.trim() || q.length < 2) { setResults([]); return; }
    setLoading(true);
    const terms = q.toLowerCase().split(' ').filter(t => t);
    const locals = COMMON_FOODS.filter(f => terms.every(t => f.name.toLowerCase().includes(t)));

    try {
      const res = await fetch(`${OFF_SEARCH_API}?search_terms=${encodeURIComponent(q)}&page_size=15&json=1`);
      const data = await res.json();
      setResults([...locals, ...(data.products || [])].slice(0, 15));
    } catch { setResults(locals); }
    setLoading(false);
  }, []);

  const handleInput = (e) => {
    setQuery(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(e.target.value), 400);
  };

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
      id: Date.now()
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

  const removeFromQueue = (id) => {
    setQueuedFoods(prev => prev.filter(f => f.id !== id));
  };

  const currentRatio = (qty * UNITS.find(u => u.id === unit).mult) / 100;

  return (
    <div className="fsm-overlay" onClick={onClose}>
      <motion.div className="fsm-modal" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={e => e.stopPropagation()}>
        <div className="fsm-header">
          <div>
            <h3>Add Items</h3>
            <p>to {mealType}</p>
          </div>
          <button className="fsm-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {queuedFoods.length > 0 && (
          <div className="fsm-queue">
            <div className="fsm-queue-header">
              <span>{queuedFoods.length} items queued</span>
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

        <div className="fsm-search">
          <Search size={18} className="fsm-search-icon" />
          <input autoFocus placeholder="Search for food..." value={query} onChange={handleInput} />
          {loading && <Loader size={16} className="fsm-loader spin" />}
        </div>

        {!selected ? (
          <div className="fsm-results">
            {results.map((item, i) => {
              const m = extractMacros(item);
              return (
                <button key={i} className="fsm-item" onClick={() => { setSelected(m); setQty(unit === 'g' || unit === 'ml' ? 100 : 1); }}>
                  <div className="fsm-item-name">{m.name}</div>
                  <div className="fsm-item-macros">
                    <span className="cal">{m.calories} kcal</span>
                    <span>P {m.protein}g</span>
                    <span>C {m.carbs}g</span>
                  </div>
                </button>
              );
            })}
            {query.length > 1 && results.length === 0 && !loading && (
              <div className="fsm-no-results">No matches found. Try again.</div>
            )}
          </div>
        ) : (
          <div className="fsm-portion">
            <button className="fsm-back" onClick={() => setSelected(null)}>← Back to search</button>
            <div className="fsm-selected-name">{selected.name}</div>
            
            <div className="fsm-unit-selector">
              {UNITS.map(u => (
                <button key={u.id} className={`fsm-unit-btn ${unit === u.id ? 'active' : ''}`} onClick={() => { setUnit(u.id); setQty(u.id === 'g' || u.id === 'ml' ? 100 : 1); }}>{u.label}</button>
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
              <div className="fsm-prev-item">
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
            </div>

            <button className="fsm-add-btn" onClick={handleQueue}>
              <Plus size={18} /> Add to Selection
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
