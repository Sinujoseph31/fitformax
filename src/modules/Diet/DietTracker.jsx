import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2, Coffee, Utensils, Moon, Apple, ChevronDown, ChevronUp, Dumbbell, Settings, X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import MacroRing from './MacroRing';
import FoodSearchModal from './FoodSearchModal';
import './Diet.css';

const getDS = (date) => date.toISOString().split('T')[0];
const MEALS_LAYOUT_KEY = `fx_meals_layout`;
const MEALS_META_KEY = `fx_meals_meta`;

const MASTER_MEALS = [
  { key: 'breakfast',   label: 'Breakfast',     icon: <Coffee size={18} />,     color: '#f59e0b', time: '7–9 AM' },
  { key: 'morningsnack',label: 'Morning Snack', icon: <Apple size={18} />,      color: '#fbbf24', time: '10–11 AM' },
  { key: 'lunch',       label: 'Lunch',         icon: <Utensils size={18} />,   color: '#00f5a0', time: '12–2 PM' },
  { key: 'preworkout',  label: 'Pre-Workout',   icon: <Dumbbell size={18} />,   color: '#f87171', time: 'Before Gym' },
  { key: 'postworkout', label: 'Post-Workout',  icon: <Plus size={18} />,       color: '#8b5cf6', time: 'After Gym' },
  { key: 'dinner',      label: 'Dinner',        icon: <Moon size={18} />,       color: '#60a5fa', time: '7–9 PM' },
  { key: 'eveningsnack',label: 'Evening Snack', icon: <Apple size={18} />,      color: '#f472b6', time: '4–6 PM' },
  { key: 'snacks',      label: 'General Snacks',icon: <Utensils size={18} />,    color: '#94a3b8', time: 'Anytime' },
];

const DEFAULT_LAYOUT = ['breakfast', 'lunch', 'dinner', 'snacks'];

// Dynamic Macro Goals Loader
const getMacroGoals = () => {
    const savedPlan = localStorage.getItem('fx_diet_plan');
    if (savedPlan) {
        try {
            const plan = JSON.parse(savedPlan);
            // Derive calories from desc or direct property if we added it
            const cals = parseInt(plan.desc?.match(/(\d+)kcal/)?.[1]) || 2000;
            return {
                calories: cals,
                protein: plan.macros?.protein ? Math.round((cals * (plan.macros.protein / 100)) / 4) : 150,
                carbs: plan.macros?.carbs ? Math.round((cals * (plan.macros.carbs / 100)) / 4) : 250,
                fat: plan.macros?.fat ? Math.round((cals * (plan.macros.fat / 100)) / 9) : 65
            };
        } catch (e) {}
    }
    return { calories: 2000, protein: 150, carbs: 250, fat: 65 };
};

const MACRO_GOALS = getMacroGoals();

export default function DietTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const dateKey = useMemo(() => getDS(selectedDate), [selectedDate]);
  const isToday = dateKey === getDS(new Date());

  const [activeKeys, setActiveKeys] = useState(() => {
    try { return JSON.parse(localStorage.getItem(MEALS_LAYOUT_KEY)) || DEFAULT_LAYOUT; }
    catch { return DEFAULT_LAYOUT; }
  });

  const [meals, setMeals] = useState({});

  const [slotMeta, setSlotMeta] = useState(() => {
    try { return JSON.parse(localStorage.getItem(MEALS_META_KEY)) || {}; }
    catch { return {}; }
  });

  const [searchOpen, setSearchOpen] = useState(null);
  const [addSlotOpen, setAddSlotOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [expanded, setExpanded] = useState(Object.fromEntries(MASTER_MEALS.map(m => [m.key, true])));

  // Load meals for selected date
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`fx_meals_data_${dateKey}`));
      setMeals(saved || Object.fromEntries(MASTER_MEALS.map(m => [m.key, []])));
    } catch {
      setMeals(Object.fromEntries(MASTER_MEALS.map(m => [m.key, []])));
    }
  }, [dateKey]);

  // Persist changes
  useEffect(() => { localStorage.setItem(MEALS_LAYOUT_KEY, JSON.stringify(activeKeys)); }, [activeKeys]);
  useEffect(() => { 
    if (Object.keys(meals).length > 0) {
      localStorage.setItem(`fx_meals_data_${dateKey}`, JSON.stringify(meals));
    }
  }, [meals, dateKey]);
  useEffect(() => { localStorage.setItem(MEALS_META_KEY, JSON.stringify(slotMeta)); }, [slotMeta]);

  const addFood = (mealKey, food) => {
    setMeals(prev => ({ ...prev, [mealKey]: [...(prev[mealKey] || []), food] }));
  };

  const removeFood = (mealKey, foodId) => {
    setMeals(prev => ({ ...prev, [mealKey]: (prev[mealKey] || []).filter(f => f.id !== foodId) }));
  };

  const changeDate = (offset) => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + offset);
    setSelectedDate(next);
  };

  const setToday = () => setSelectedDate(new Date());

  const addMealSlot = (key) => {
    if (!activeKeys.includes(key)) {
      setActiveKeys(prev => [...prev, key]);
      setAddSlotOpen(false);
    }
  };

  const removeMealSlot = (key, e) => {
    e.stopPropagation();
    if (window.confirm(`Remove this meal slot and all its logged food?`)) {
      setActiveKeys(prev => prev.filter(k => k !== key));
      setMeals(prev => ({ ...prev, [key]: [] }));
    }
  };

  const saveSlotEdit = () => {
    if (editingSlot) {
      setSlotMeta(prev => ({
        ...prev,
        [editingSlot.key]: { label: editingSlot.label, time: editingSlot.time }
      }));
      setEditingSlot(null);
    }
  };

  const activeFoods = activeKeys.map(k => meals[k] || []).flat();
  const totals = activeFoods.reduce((acc, f) => ({
    calories: acc.calories + (f.calories || 0),
    protein:  acc.protein  + (f.protein  || 0),
    carbs:    acc.carbs    + (f.carbs    || 0),
    fat:      acc.fat      + (f.fat      || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const remaining = Math.max(0, MACRO_GOALS.calories - totals.calories);

  const formattedDate = useMemo(() => {
    const d = new Date(selectedDate);
    if (dateKey === getDS(new Date())) return 'Today';
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if (dateKey === getDS(yesterday)) return 'Yesterday';
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateKey === getDS(tomorrow)) return 'Tomorrow';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, [selectedDate, dateKey]);

  return (
    <div className="diet-tracker fade-in">
      <div className="diet-header">
        <div className="diet-title-group">
          <h1>Meal Tracker</h1>
          <div className="date-navigator">
            <button className="date-nav-btn" onClick={() => changeDate(-1)}><ChevronLeft size={20} /></button>
            <div className="date-display" onClick={setToday}>
              <Calendar size={14} style={{ marginRight: 8, opacity: 0.6 }} />
              <span>{formattedDate}</span>
            </div>
            <button className="date-nav-btn" onClick={() => changeDate(1)}><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="diet-remaining">
          <span className="remaining-val">{remaining.toLocaleString()}</span>
          <span className="remaining-label">kcal left</span>
        </div>
      </div>

      <div className="macro-rings-card glass-card">
        <div className="macro-center-ring">
          <MacroRing value={totals.calories} max={MACRO_GOALS.calories} color="#00f5a0" label="Calories" unit="kcal" size={120} />
        </div>
        <div className="macro-side-rings">
          <MacroRing value={totals.protein} max={MACRO_GOALS.protein} color="#60a5fa" label="Protein"  unit="g" size={80} />
          <MacroRing value={totals.carbs}   max={MACRO_GOALS.carbs}   color="#f59e0b" label="Carbs"    unit="g" size={80} />
          <MacroRing value={totals.fat}     max={MACRO_GOALS.fat}     color="#f472b6" label="Fat"      unit="g" size={80} />
        </div>
      </div>

      <div className="meal-cards">
        {activeKeys.map(key => {
          let master = MASTER_MEALS.find(m => m.key === key);
          
          if (!master && key.startsWith('protocol_slot_')) {
             master = {
                 key: key,
                 label: 'Protocol Node',
                 icon: <Sparkles size={18} />,
                 color: '#8b5cf6',
                 time: 'Scheduled'
             };
          } else if (!master) {
             return null;
          }
          
          const meta = slotMeta[key] || {};
          const label = meta.label || master.label;
          const time = meta.time || master.time;
          const foods = meals[key] || [];
          const mealCals = foods.reduce((s, f) => s + (f.calories || 0), 0);
          const isOpen = expanded[key];
          const isEditing = editingSlot?.key === key;

          return (
            <motion.div key={key} className="meal-card glass-card" layout>
              <div className="meal-card-header" onClick={() => !isEditing && setExpanded(p => ({ ...p, [key]: !p[key] }))}>
                <div className="meal-icon-wrap" style={{ background: master.color + '22', border: `1px solid ${master.color}44` }}>
                  <span style={{ color: master.color }}>{master.icon}</span>
                </div>
                
                <div className="meal-card-title">
                  {isEditing ? (
                    <div className="slot-edit-fields" onClick={e => e.stopPropagation()}>
                      <input className="slot-edit-input" value={editingSlot.label} onChange={e => setEditingSlot({...editingSlot, label: e.target.value})} autoFocus/>
                      <input className="slot-edit-time" value={editingSlot.time} onChange={e => setEditingSlot({...editingSlot, time: e.target.value})}/>
                    </div>
                  ) : (
                    <>
                      <h3>{label}</h3>
                      <span className="meal-time">{time}</span>
                    </>
                  )}
                </div>

                <div className="meal-card-right">
                  {mealCals > 0 && <span className="meal-cal-badge" style={{ color: master.color }}>{mealCals} kcal</span>}
                  {isEditing ? (
                    <button className="slot-save-btn" onClick={(e) => { e.stopPropagation(); saveSlotEdit(); }}>Save</button>
                  ) : (
                    isOpen && <button className="slot-edit-trigger" onClick={(e) => { e.stopPropagation(); setEditingSlot({ key, label, time }); }}><Settings size={12} /></button>
                  )}
                  {!isEditing && <button className="meal-slot-remove" onClick={(e) => removeMealSlot(key, e)}><Trash2 size={14} /></button>}
                  {isOpen ? <ChevronUp size={18} opacity={0.4} /> : <ChevronDown size={18} opacity={0.4} />}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div className="meal-card-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    {foods.length === 0 && <p className="meal-empty">No foods logged yet.</p>}
                    {foods.map(food => (
                      <div key={food.id} className="food-row">
                        <div className="food-row-info">
                          <span className="food-name">{food.name}</span>
                          <span className="food-macros">{food.displayQty || `${food.qty}g`} · {food.calories} kcal · P {food.protein}g · C {food.carbs}g · F {food.fat}g</span>
                        </div>
                        <button className="food-delete" onClick={() => removeFood(key, food.id)}><Trash2 size={14} /></button>
                      </div>
                    ))}
                    <button className="meal-add-btn" style={{ borderColor: master.color + '55', color: master.color }} onClick={() => setSearchOpen(key)}>
                      <Plus size={16} /> Add Food
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <button className="add-slot-trigger" onClick={() => setAddSlotOpen(true)}>
          <Plus size={20} /> Add New Meal Slot
        </button>
      </div>

      <AnimatePresence>
        {addSlotOpen && (
          <div className="fsm-overlay" onClick={() => setAddSlotOpen(false)}>
            <motion.div className="fsm-modal slot-picker" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="fsm-header" style={{ border: 'none', paddingBottom: 0 }}>
                <h3>Meal Template</h3>
                <button className="fsm-close-btn" onClick={() => setAddSlotOpen(false)}><X size={20} /></button>
              </div>
              <p style={{ padding: '0 24px 20px', fontSize: '0.85rem', opacity: 0.5 }}>Choose a preset to add to your day</p>
              <div className="slot-grid">
                {MASTER_MEALS.filter(m => !activeKeys.includes(m.key)).map(m => (
                  <button key={m.key} className="slot-option" onClick={() => addMealSlot(m.key)}>
                    <div className="slot-icon" style={{ background: m.color + '22', color: m.color }}>{m.icon}</div>
                    <span className="slot-label">{m.label}</span>
                    <span className="slot-time">{m.time}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <FoodSearchModal
            mealType={slotMeta[searchOpen]?.label || MASTER_MEALS.find(m => m.key === searchOpen)?.label}
            onAdd={(food) => addFood(searchOpen, food)}
            onClose={() => setSearchOpen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
