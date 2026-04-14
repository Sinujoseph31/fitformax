export const DIET_CATEGORIES = [
  'All', 
  'Weight Loss', 
  'Muscle Gain', 
  'Maintenance', 
  'Specialty / Lifestyle', 
  'Medical / Health', 
  'Intermittent Fasting',
  'Athletic Performance',
  'Regional / Indian',
  'AI Generated'
];

export const PREDEFINED_DIETS = [
  // --- Standard Diets ---
  {
    id: 'd1',
    name: 'Standard Weight Loss Diet',
    category: 'Weight Loss',
    type: 'template',
    desc: 'A simple, high-protein calorie deficit plan focused on fat loss while keeping you full with fiber and vegetables.',
    macros: { protein: 35, carbs: 40, fat: 25 },
    rules: [
      'Maintain a 500 calorie daily deficit.',
      'Drink at least 8 glasses of water.',
      'Focus on lean meats and vegetables.'
    ],
    schedule: [
      { time: '06:30 AM', mealName: 'Wake Up Routine', notes: 'Hydrate the system.', items: ['16oz Water with Lemon'] },
      { time: '08:00 AM', mealName: 'Breakfast', notes: 'Start the day with protein.', items: ['3 Scrambled Eggs', '1 slice Whole Wheat Toast', 'Black Coffee'] },
      { time: '01:00 PM', mealName: 'Lunch', notes: 'High volume, low calorie.', items: ['Grilled Chicken Breast (6oz)', 'Large Mixed Salad', 'Light Vinaigrette Dressing'] },
      { time: '04:00 PM', mealName: 'Snack', items: ['1 Apple', 'Greek Yogurt (Low Fat)'] },
      { time: '07:30 PM', mealName: 'Dinner', items: ['Baked Fish (6oz)', 'Steamed Broccoli', '1/2 cup Quinoa'] },
      { time: '10:00 PM', mealName: 'Bedtime', notes: 'Prepare for deep sleep.', items: ['Sleep Aid / Herbal Tea if needed'] }
    ]
  },
  {
    id: 'd2',
    name: 'Standard Muscle Gain Diet',
    category: 'Muscle Gain',
    type: 'template',
    desc: 'A high-calorie, heavy carbohydrate plan meant to fuel intense workouts and build muscle mass effectively.',
    macros: { protein: 30, carbs: 50, fat: 20 },
    rules: [
      'Eat in a 300-500 calorie surplus.',
      'Do not skip meals.',
      'Ensure high carbs surrounding your workout.'
    ],
    schedule: [
      { time: '06:00 AM', mealName: 'Wake Up Routine', items: ['16oz Water'] },
      { time: '07:00 AM', mealName: 'Breakfast', items: ['1 cup Oatmeal', '2 Eggs, 2 Whites', '1 Banana'] },
      { time: '11:00 AM', mealName: 'Mid-Morning Fuel', items: ['Greek Yogurt', 'Handful of Almonds'] },
      { time: '01:30 PM', mealName: 'Lunch', items: ['8oz Ground Turkey', '1.5 cups White Rice', 'Green Beans'] },
      { time: '05:00 PM', mealName: 'Pre-Workout', items: ['2 slices Toast with Peanut Butter'] },
      { time: '08:00 PM', mealName: 'Post-Workout Dinner', items: ['8oz Chicken Breast', 'Large Sweet Potato'] },
      { time: '10:30 PM', mealName: 'Bedtime', notes: 'Casein slows digestion to stay anabolic.', items: ['1 cup Cottage Cheese'] }
    ]
  },
  {
    id: 'd3',
    name: 'Strict Keto Diet',
    category: 'Specialty / Lifestyle',
    type: 'template',
    desc: 'Minimizes carbohydrates almost completely to force the body into burning fat for fuel. Best for steady daytime energy.',
    macros: { protein: 25, carbs: 5, fat: 70 },
    rules: [
      'Keep carbs below 20g-30g daily.',
      'Eat healthy fats like olive oil, avocado, and butter.',
      'Increase salt to prevent keto flu.'
    ],
    schedule: [
      { time: '06:30 AM', mealName: 'Wake Up Routine', items: ['Water with Pink Himalayan Salt'] },
      { time: '07:30 AM', mealName: 'Breakfast', items: ['Black Coffee with 1 tbsp Butter/MCT Oil', '3 fried eggs', 'Bacon'] },
      { time: '01:00 PM', mealName: 'Lunch', items: ['Cobb Salad (Chicken, Bacon, Egg, Avocado, Blue Cheese Dressing)'] },
      { time: '06:30 PM', mealName: 'Dinner', items: ['Fatty Ribeye Steak', 'Creamed Spinach'] },
      { time: '10:00 PM', mealName: 'Bedtime', items: ['Magnesium Supplement', 'Sleep'] }
    ]
  },
  {
    id: 'd4',
    name: '16/8 Intermittent Fasting (Weight Loss)',
    category: 'Intermittent Fasting',
    type: 'template',
    desc: 'Fast for 16 hours, eat your daily calories within an 8-hour window. Promotes fat burning by keeping insulin very low through the morning.',
    macros: { protein: 35, carbs: 35, fat: 30 },
    rules: [
      'Only water, black coffee, or plain tea during the fasting window.',
      'Eat two large meals and one snack in your 8 hours.',
      'Focus the last meal on high protein and fat to carry you through the fast.'
    ],
    schedule: [
      { time: '07:00 AM', mealName: 'Wake Up Routine', items: ['16oz Water'] },
      { time: '08:00 AM', mealName: 'Fasting Period', notes: 'Zero Calories!', items: ['Black Coffee', '16oz Water'] },
      { time: '12:00 PM', mealName: 'Meal 1 (Fast Breaker)', items: ['Large Grilled Chicken Salad', 'Almonds'] },
      { time: '04:00 PM', mealName: 'Snack', items: ['Protein Shake', 'Apple'] },
      { time: '07:45 PM', mealName: 'Final Meal', items: ['Salmon', 'Asparagus', 'Brown Rice'] },
      { time: '10:30 PM', mealName: 'Bedtime', items: ['Herbal Tea', 'Sleep'] }
    ]
  },

  // --- Indian Regional Diets ---
  {
    id: 'ind1',
    name: 'Indian Vegetarian Weight Loss',
    category: 'Regional / Indian',
    type: 'template',
    desc: 'A pure vegetarian Indian diet optimized for fat loss. Focuses on portion control of carbs (roti/rice) while maximizing protein via lentils, paneer, and whey.',
    macros: { protein: 30, carbs: 45, fat: 25 },
    rules: [
      'Limit cooking oil (Ghee/Mustard Oil) to 2-3 teaspoons per day.',
      'Replace one heavy carb meal with a large bowl of salad or sprouts.',
      'Include a protein source (Dal, Chana, Paneer, Whey) in every meal.'
    ],
    schedule: [
      { time: '06:00 AM', mealName: 'Wake Up Routine', items: ['Warm water with Lemon and Chia Seeds'] },
      { time: '08:30 AM', mealName: 'Breakfast', notes: 'High fiber to keep you full.', items: ['2 Moong Dal Chilla (Pancakes)', 'Mint Chutney', 'Masala Chai (No Sugar)'] },
      { time: '01:30 PM', mealName: 'Lunch', items: ['1 portion Yellow Dal Tadka', '1 Multigrain Roti', 'Large Cucumber/Tomato Salad', '1/2 cup Low-fat Curd (Dahi)'] },
      { time: '05:00 PM', mealName: 'Evening Snack', items: ['1 cup Roasted Makhana (Fox Nuts)', 'Green Tea'] },
      { time: '08:00 PM', mealName: 'Dinner (Low Carb)', notes: 'Light dinner for better digestion.', items: ['150g Sauteed Paneer with Bell Peppers', '1 bowl Palak (Spinach) Soup'] },
      { time: '10:00 PM', mealName: 'Bedtime', items: ['Sleep aid: Chamomile Tea'] }
    ]
  },
  {
    id: 'ind2',
    name: 'Indian Non-Veg Muscle Gain',
    category: 'Regional / Indian',
    type: 'template',
    desc: 'Designed for building serious mass using traditional Indian cuisine. Heavy reliance on chicken, eggs, rice, and healthy fats.',
    macros: { protein: 35, carbs: 45, fat: 20 },
    rules: [
      'Maintain a caloric surplus for muscle growth.',
      'Use Ghee in moderation for joint health and hormones.',
      'Ensure high carbs post-workout.'
    ],
    schedule: [
      { time: '06:00 AM', mealName: 'Wake Up Routine', items: ['Water'] },
      { time: '07:00 AM', mealName: 'Pre-Workout', items: ['1 Banana', 'Black Coffee'] },
      { time: '09:00 AM', mealName: 'Breakfast (Post-Workout)', items: ['4 Boiled Egg Whites, 2 Whole Eggs', '2 slices Brown Bread', '1 scoop Whey Protein in Water'] },
      { time: '01:30 PM', mealName: 'Heavy Lunch', items: ['250g Chicken Curry (minimal oil)', '1.5 cups White Rice', 'Cucumber Salad'] },
      { time: '05:00 PM', mealName: 'Evening Fuel', items: ['2 Boiled Eggs', 'Handful of Roasted Chana (Chickpeas)'] },
      { time: '08:30 PM', mealName: 'Dinner', items: ['200g Fish Tikka or Grilled Fish', '2 Wheat Rotis', 'Mixed Veg Sabzi'] },
      { time: '10:30 PM', mealName: 'Bedtime', items: ['Warm Milk with Turmeric'] }
    ]
  },
  {
    id: 'ind3',
    name: 'South Indian Maintenance Protocol',
    category: 'Regional / Indian',
    type: 'template',
    desc: 'A perfectly balanced South Indian diet designed to maintain weight, featuring fermented foods for gut health and coconut for healthy fats.',
    macros: { protein: 25, carbs: 50, fat: 25 },
    rules: [
      'Enjoy fermented carbs (Idli/Dosa) but control portions.',
      'Include a serving of protein (Sambar/Egg/Fish) with every carb.',
      'Use coconut oil sparingly as it is calorie-dense.'
    ],
    schedule: [
      { time: '06:30 AM', mealName: 'Wake Up Routine', items: ['Water'] },
      { time: '08:30 AM', mealName: 'Breakfast', items: ['3 Idlis or 2 Plain Dosa', '1 cup Sambar', 'Coconut Chutney (1 tbsp)', 'Filter Coffee (little milk, no sugar)'] },
      { time: '01:00 PM', mealName: 'Lunch', items: ['1 cup Red Rice (Matta Rice)', 'Fish Curry (Meen Curry) or Heavy Dal', 'Cabbage Thoran (Stir fry)'] },
      { time: '04:30 PM', mealName: 'Snack', items: ['Sprouted Moong Salad', 'Buttermilk (Neer Mor)'] },
      { time: '08:00 PM', mealName: 'Dinner', items: ['2 Appams or Chapati', 'Egg Roast (2 eggs)', 'Side Salad'] },
      { time: '10:00 PM', mealName: 'Bedtime', items: ['Sleep'] }
    ]
  },
  {
    id: 'ind4',
    name: 'Indian Desi Keto (Low Carb)',
    category: 'Regional / Indian',
    type: 'template',
    desc: 'A strict adaptation of the Ketogenic diet using Indian ingredients. Eliminates all grains (roti/rice) and lentils (dal) to achieve ketosis.',
    macros: { protein: 25, carbs: 5, fat: 70 },
    rules: [
      'Strictly NO atta (wheat), rice, dal, or sugar.',
      'Rely on Paneer, Eggs, Chicken, Mutton, and green veggies.',
      'Cook generously in Butter, Ghee, or Coconut Oil.'
    ],
    schedule: [
      { time: '07:00 AM', mealName: 'Wake Up Routine', items: ['Water with Pink Himalayan Salt'] },
      { time: '08:00 AM', mealName: 'Breakfast', items: ['Masala Omelette (3 Eggs) cooked in Butter', 'Black Coffee with 1 tsp Coconut Oil'] },
      { time: '01:30 PM', mealName: 'Lunch', items: ['200g Paneer Tikka (made in air fryer or tandoor)', 'Mint Chutney', 'Cucumber & Radish Salad'] },
      { time: '05:00 PM', mealName: 'Snack', items: ['Handful of Almonds and Walnuts', 'Green Tea'] },
      { time: '08:00 PM', mealName: 'Dinner', items: ['Chicken Mutton/Kheema Fry (200g)', 'Bhindi (Okra) Sabzi cooked in Ghee'] },
      { time: '10:30 PM', mealName: 'Bedtime', items: ['Sleep'] }
    ]
  },
  {
    id: 'ind5',
    name: 'Ayurvedic Detox (Satvic Diet)',
    category: 'Regional / Indian',
    type: 'template',
    desc: 'Based on ancient Ayurvedic principles. Eliminates onion, garlic, heavy meats, and processed foods. Highly alkaline and easy on digestion.',
    macros: { protein: 20, carbs: 60, fat: 20 },
    rules: [
      'Zero meat, eggs, onion, garlic, or refined sugar.',
      'Eat fresh, seasonal fruits and light grains.',
      'Ensure dinner is eaten before sunset if possible.'
    ],
    schedule: [
      { time: '06:00 AM', mealName: 'Wake Up Routine', items: ['Warm water with ginger, lemon, and honey'] },
      { time: '07:00 AM', mealName: 'Morning Flush', items: ['5 soaked Almonds'] },
      { time: '08:30 AM', mealName: 'Breakfast', items: ['Large bowl of Papaya and Apple', '1 bowl Dalia (Broken Wheat Porridge)'] },
      { time: '01:00 PM', mealName: 'Lunch', items: ['Lauki (Bottle Gourd) Sabzi', '1 Ragi Roti', 'Small bowl of Moong Dal (No tadka)'] },
      { time: '04:00 PM', mealName: 'Snack', items: ['Fresh Coconut Water'] },
      { time: '06:30 PM', mealName: 'Dinner (Light)', items: ['Khichdi (Rice and Lentils cooked very soft)', 'Steamed Carrots'] },
      { time: '09:30 PM', mealName: 'Bedtime', items: ['Triphala Powder with warm water', 'Sleep'] }
    ]
  },
  {
    id: 'vertical_diet',
    name: 'The Vertical Diet (Performance)',
    category: 'Athletic Performance',
    type: 'template',
    desc: 'Developed by Stan Efferding for athletes. Optimizes digestion and hormone health through red meat, white rice, and high-micronutrient "vertical" foods.',
    macros: { protein: 30, carbs: 45, fat: 25 },
    rules: [
      'Focus on high-quality red meat for iron and zinc.',
      'Use white rice as the primary carb for easy digestion.',
      'Include daily carrots and orange juice for liver health.'
    ],
    schedule: [
      { time: '07:00 AM', mealName: 'Monster Mash Breakfast', items: ['Ground Beef (6oz)', 'White Rice (1 cup)', '2 Scrambled Eggs', 'Chicken Broth'] },
      { time: '01:00 PM', mealName: 'Lunch', items: ['Steak (6oz)', 'White Rice', 'Spinach', 'Daily Carrot'] },
      { time: '07:00 PM', mealName: 'Post-Workout Dinner', items: ['Ground Beef', 'White Rice', 'Orange Juice', 'Potato'] }
    ]
  },
  {
    id: 'med_longevity',
    name: 'Mediterranean Longevity Plan',
    category: 'Maintenance',
    type: 'template',
    desc: 'The benchmark for heart health and longevity. Rich in healthy fats, seafood, and fresh produce.',
    macros: { protein: 20, carbs: 40, fat: 40 },
    rules: [
      'Olive oil is your primary fat source.',
      'Seafood at least 3-4 times per week.',
      'Moderate cheese and wine consumption.'
    ],
    schedule: [
      { time: '08:00 AM', mealName: 'Breakfast', items: ['Greek Yogurt', 'Walnuts', 'Honey', 'Fresh Berries'] },
      { time: '01:30 PM', mealName: 'Lunch', items: ['Greek Salad with Feta', 'Extra Virgin Olive Oil', 'Whole Grain Pita'] },
      { time: '08:00 PM', mealName: 'Dinner', items: ['Grilled Sea Bass', 'Roasted Asparagus', 'Glass of Red Wine (Optional)'] }
    ]
  },
  {
    id: 'paleo_ancestral',
    name: 'Paleo / Ancestral Protocol',
    category: 'Specialty / Lifestyle',
    type: 'template',
    desc: 'Eat like your ancestors. Eliminates all grains, legumes, and dairy. Focuses on whole, unprocessed foods that the human body evolved to digest.',
    macros: { protein: 35, carbs: 20, fat: 45 },
    rules: [
      'No grains (bread/rice/pasta).',
      'No legumes or dairy.',
      'Eat grass-fed meats and seasonal wild fruits.'
    ],
    schedule: [
      { time: '07:30 AM', mealName: 'Paleo Hash', items: ['Sweet Potato Hash', 'Ground Pork', '3 Poached Eggs'] },
      { time: '01:00 PM', mealName: 'Lunch', items: ['Turkey Breast', 'Avocado', 'Berries', 'Cucumber'] },
      { time: '07:00 PM', mealName: 'Primal Dinner', items: ['Venison or Beef Roast', 'Mixed Root Vegetables', 'Olive Oil Drizzle'] }
    ]
  }
];
