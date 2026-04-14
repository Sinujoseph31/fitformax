export const WORKOUT_CATEGORIES = [
  'All',
  'Bodybuilding',
  'Strength / Power',
  'Weight Loss / HIIT',
  'Home / No Equipment',
  'Yoga / Mobility',
  'AI Generated'
];

export const PREDEFINED_WORKOUTS = [
  {
    id: 'bro_split_pro',
    name: 'Classic 5-Day Bro Split',
    category: 'Bodybuilding',
    desc: 'The gold standard for hypertrophy. One muscle group per day for maximum volume and recovery.',
    difficulty: 'Advanced',
    duration: '60-75 min',
    tags: ['Mass', 'Aesthetics', 'Gym'],
    schedule: [
      { 
        day: 'Monday', focus: 'Chest & Abs', 
        exercises: [
          { id: 'chest_press_bb_flat', sets: 4, reps: '8-10' },
          { id: 'incline_bb_press', sets: 3, reps: '10-12' },
          { id: 'chest_fly_db', sets: 3, reps: '15' },
          { id: 'push_ups', sets: 3, reps: 'Failure' },
          { id: 'plank_static', sets: 3, reps: '60s' }
        ] 
      },
      { 
        day: 'Tuesday', focus: 'Back Thickness', 
        exercises: [
          { id: 'deadlift_bb', sets: 3, reps: '5-8' },
          { id: 'row_bb_bent', sets: 4, reps: '8-10' },
          { id: 'lat_pull_wide', sets: 3, reps: '12' },
          { id: 'row_db_single', sets: 3, reps: '12/ea' },
          { id: 'pull_up', sets: 3, reps: '8-12' }
        ] 
      },
      { 
        day: 'Wednesday', focus: 'Leg Day (Quads)', 
        exercises: [
          { id: 'squat_bb_back', sets: 4, reps: '8-10' },
          { id: 'leg_press_machine', sets: 3, reps: '12-15' },
          { id: 'bulgarian_split_squat', sets: 3, reps: '10/ea' },
          { id: 'home_wall_sit', sets: 3, reps: '45s' }
        ] 
      },
      { 
        day: 'Thursday', focus: 'Shoulder Boulder', 
        exercises: [
          { id: 'shoulder_press_bb', sets: 4, reps: '8-10' },
          { id: 'lateral_raise_db', sets: 3, reps: '15' },
          { id: 'rear_delt_fly', sets: 3, reps: '15' },
          { id: 'shrug_bb', sets: 4, reps: '12' }
        ] 
      },
      { 
        day: 'Friday', focus: 'Arms Arsenal', 
        exercises: [
          { id: 'bicep_curl_bb', sets: 3, reps: '10-12' },
          { id: 'skullcrusher_ez', sets: 3, reps: '10-12' },
          { id: 'hammer_curl_db', sets: 3, reps: '12' },
          { id: 'tricep_pushdown_rope', sets: 3, reps: '15' },
          { id: 'bench_dips', sets: 3, reps: '15' }
        ] 
      },
      { day: 'Saturday', focus: 'Active Recovery/Cardio', exercises: [{ id: 'running_outdoors', sets: 1, reps: '30 min' }] },
      { day: 'Sunday', focus: 'Rest', exercises: [] }
    ]
  },
  {
    id: 'ppl_beginner',
    name: 'Push / Pull / Legs (PPL)',
    category: 'Strength / Power',
    desc: 'The most efficient 3-day split. Trains all major movement patterns for balanced growth.',
    difficulty: 'Intermediate',
    duration: '45-60 min',
    tags: ['Strength', 'Efficiency', '3-Day'],
    schedule: [
      { 
        day: 'Mon/Thu (Push)', focus: 'Chest, Shoulders, Triceps', 
        exercises: [
          { id: 'chest_press_db_flat', sets: 4, reps: '8-10' },
          { id: 'shoulder_press_db', sets: 3, reps: '10' },
          { id: 'lateral_raise_db', sets: 3, reps: '12' },
          { id: 'tricep_pushdown_rope', sets: 4, reps: '12' }
        ] 
      },
      { 
        day: 'Tue/Fri (Pull)', focus: 'Back & Biceps', 
        exercises: [
          { id: 'pull_up', sets: 3, reps: 'Failure' },
          { id: 'row_db_single', sets: 3, reps: '10' },
          { id: 'rear_delt_fly', sets: 3, reps: '15' },
          { id: 'bicep_curl_db_alt', sets: 4, reps: '12' }
        ] 
      },
      { 
        day: 'Wed/Sat (Legs)', focus: 'Quads & Hamstrings', 
        exercises: [
          { id: 'squat_bb_back', sets: 4, reps: '8' },
          { id: 'romanian_deadlift', sets: 3, reps: '10' },
          { id: 'leg_press_machine', sets: 3, reps: '12' }
        ] 
      }
    ]
  },
  {
    id: 'phul_workout',
    name: 'P.H.U.L. (Power Hypertrophy Upper Lower)',
    category: 'Strength / Power',
    desc: 'A 4-day split blending powerlifting strength principles with bodybuilding hypertrophy. Highly recommended by Muscle & Strength.',
    difficulty: 'Advanced',
    duration: '60 min',
    tags: ['Powerbuilding', '4-Day Split'],
    schedule: [
      { 
        day: 'Monday', focus: 'Upper Power', 
        exercises: [
          { id: 'chest_press_bb_flat', sets: 4, reps: '3-5' },
          { id: 'incline_bb_press', sets: 3, reps: '6-10' },
          { id: 'row_bb_bent', sets: 4, reps: '3-5' },
          { id: 'lat_pull_wide', sets: 3, reps: '6-10' },
          { id: 'shoulder_press_bb', sets: 3, reps: '5-8' }
        ] 
      },
      { 
        day: 'Tuesday', focus: 'Lower Power', 
        exercises: [
          { id: 'squat_bb_back', sets: 4, reps: '3-5' },
          { id: 'deadlift_bb', sets: 4, reps: '3-5' },
          { id: 'leg_press_machine', sets: 5, reps: '10-15' },
          { id: 'home_glute_bridge', sets: 3, reps: '8-10' }
        ] 
      },
      { day: 'Wednesday', focus: 'Rest & Recovery', exercises: [] },
      { 
        day: 'Thursday', focus: 'Upper Hypertrophy', 
        exercises: [
          { id: 'chest_press_db_flat', sets: 4, reps: '8-12' },
          { id: 'chest_fly_db', sets: 4, reps: '10-15' },
          { id: 'row_db_single', sets: 4, reps: '8-12' },
          { id: 'lateral_raise_db', sets: 4, reps: '12-15' },
          { id: 'bicep_curl_db_alt', sets: 3, reps: '12' },
          { id: 'tricep_pushdown_rope', sets: 3, reps: '12' }
        ] 
      },
      { 
        day: 'Friday', focus: 'Lower Hypertrophy', 
        exercises: [
          { id: 'squat_bb_back', sets: 4, reps: '8-12' },
          { id: 'romanian_deadlift', sets: 4, reps: '8-12' },
          { id: 'bulgarian_split_squat', sets: 3, reps: '10/ea' },
          { id: 'lunges_walking', sets: 3, reps: '15/ea' }
        ] 
      },
      { day: 'Saturday', focus: 'Active Rest', exercises: [{ id: 'running_outdoors', sets: 1, reps: '45 min' }] },
      { day: 'Sunday', focus: 'Rest', exercises: [] }
    ]
  },
  {
    id: 'fat_destroyer_12',
    name: '12-Week Fat Destroyer',
    category: 'Weight Loss / HIIT',
    desc: 'High-octane fat burning routine mixing fast-paced compound lifts with savage HIIT cardio intervals.',
    difficulty: 'Intermediate',
    duration: '45 min',
    tags: ['Fat Loss', 'HIIT', 'Conditioning'],
    schedule: [
      { 
        day: 'Monday', focus: 'Full Body Circuit A', 
        exercises: [
          { id: 'kb_swing', sets: 4, reps: '15' },
          { id: 'push_ups', sets: 4, reps: '15' },
          { id: 'row_db_single', sets: 4, reps: '12' },
          { id: 'squat_bb_back', sets: 3, reps: '15' },
          { id: 'hiit_burpees', sets: 3, reps: '60s' }
        ] 
      },
      { 
        day: 'Tuesday', focus: 'Savage Core & Cardio', 
        exercises: [
          { id: 'running_outdoors', sets: 4, reps: 'Sprint 30s' },
          { id: 'plank_static', sets: 4, reps: '60s' },
          { id: 'russian_twist_db', sets: 4, reps: '20' },
          { id: 'leg_raise_hanging', sets: 3, reps: '12' }
        ] 
      },
      { 
        day: 'Wednesday', focus: 'Full Body Circuit B', 
        exercises: [
          { id: 'power_clean', sets: 4, reps: '8' },
          { id: 'chest_press_db_flat', sets: 3, reps: '15' },
          { id: 'lunges_walking', sets: 3, reps: '20' },
          { id: 'lateral_raise_db', sets: 3, reps: '15' },
          { id: 'hiit_burpees', sets: 4, reps: '45s' }
        ] 
      },
      { day: 'Thursday', focus: 'Active Recovery Yoga', exercises: [{ id: 'sun_salutation', sets: 5, reps: 'Flow' }, { id: 'downward_dog', sets: 3, reps: '60s hold' }] },
      { 
        day: 'Friday', focus: 'Metabolic Conditioning', 
        exercises: [
          { id: 'kb_swing', sets: 5, reps: '20' },
          { id: 'bulgarian_split_squat', sets: 3, reps: '12/ea' },
          { id: 'home_chair_dips', sets: 3, reps: '20' },
          { id: 'plank_static', sets: 3, reps: '90s' }
        ] 
      },
      { day: 'Saturday & Sunday', focus: 'Rest', exercises: [] }
    ]
  },
  {
    id: 'womens_sculpt_30',
    name: 'Advanced Women\'s Sculpt & Tone',
    category: 'Bodybuilding',
    desc: 'An intensive 5-day cycle prioritizing glute development, core tightness, and upper body toning.',
    difficulty: 'Intermediate',
    duration: '50-60 min',
    tags: ['Women', 'Glutes', 'Tone'],
    schedule: [
      { 
        day: 'Day 1', focus: 'Heavy Glutes & Hamstrings', 
        exercises: [
          { id: 'hip_thrust_bb', sets: 4, reps: '10' },
          { id: 'romanian_deadlift', sets: 4, reps: '12' },
          { id: 'bulgarian_split_squat', sets: 3, reps: '12/ea' },
          { id: 'home_glute_bridge', sets: 3, reps: '20' }
        ] 
      },
      { 
        day: 'Day 2', focus: 'Upper Body Toning', 
        exercises: [
          { id: 'shoulder_press_db', sets: 3, reps: '12' },
          { id: 'lateral_raise_db', sets: 3, reps: '15' },
          { id: 'lat_pull_wide', sets: 3, reps: '15' },
          { id: 'push_ups', sets: 3, reps: 'Max' }
        ] 
      },
      { 
        day: 'Day 3', focus: 'Quads & Core', 
        exercises: [
          { id: 'squat_bb_back', sets: 4, reps: '10' },
          { id: 'leg_press_machine', sets: 3, reps: '15' },
          { id: 'hollow_body_hold', sets: 3, reps: '45s' },
          { id: 'russian_twist_db', sets: 3, reps: '30' }
        ] 
      },
      { day: 'Day 4', focus: 'Yoga & Mobility Flow', exercises: [{ id: 'warrior_pose_2', sets: 3, reps: '60s hold' }, { id: 'sun_salutation', sets: 5, reps: 'Flow' }] },
      { 
        day: 'Day 5', focus: 'Total Body Conditoning', 
        exercises: [
          { id: 'kb_swing', sets: 4, reps: '20' },
          { id: 'lunges_walking', sets: 4, reps: '24' },
          { id: 'bicep_curl_db_alt', sets: 3, reps: '15' },
          { id: 'tricep_pushdown_rope', sets: 3, reps: '15' }
        ] 
      }
    ]
  },
  {
    id: 'dumbell_only_5day',
    name: '5-Day DB Only Gym/Home Split',
    category: 'Home / No Equipment',
    desc: 'The ultimate accessible routine for those with only a set of dumbbells. Maximum functional hypertrophy without machines.',
    difficulty: 'Beginner',
    duration: '45 min',
    tags: ['Dumbbell', 'Accessible', 'Muscle Building'],
    schedule: [
      { 
        day: 'Monday', focus: 'Chest & Triceps', 
        exercises: [
          { id: 'chest_press_db_flat', sets: 4, reps: '10' },
          { id: 'chest_fly_db', sets: 4, reps: '12' },
          { id: 'home_chair_dips', sets: 3, reps: '15' },
          { id: 'skullcrusher_ez', sets: 3, reps: '12' }
        ] 
      },
      { 
        day: 'Tuesday', focus: 'Back & Biceps', 
        exercises: [
          { id: 'row_db_single', sets: 4, reps: '10/ea' },
          { id: 'pull_up', sets: 3, reps: 'Max' },
          { id: 'hammer_curl_db', sets: 4, reps: '12' },
          { id: 'bicep_curl_db_alt', sets: 3, reps: '12' }
        ] 
      },
      { 
        day: 'Wednesday', focus: 'Legs & Core', 
        exercises: [
          { id: 'bulgarian_split_squat', sets: 4, reps: '10/ea' },
          { id: 'lunges_walking', sets: 4, reps: '20' },
          { id: 'home_wall_sit', sets: 3, reps: '60s' },
          { id: 'russian_twist_db', sets: 3, reps: '30' }
        ] 
      },
      { 
        day: 'Thursday', focus: 'Shoulders', 
        exercises: [
          { id: 'shoulder_press_db', sets: 4, reps: '10' },
          { id: 'lateral_raise_db', sets: 4, reps: '15' },
          { id: 'rear_delt_fly', sets: 4, reps: '15' },
          { id: 'shoulder_press_bb', sets: 3, reps: '12' }
        ] 
      },
      { 
        day: 'Friday', focus: 'Full Body DB Flow', 
        exercises: [
          { id: 'kb_swing', sets: 3, reps: '20' },
          { id: 'chest_press_db_flat', sets: 3, reps: '12' },
          { id: 'row_db_single', sets: 3, reps: '12' },
          { id: 'lunges_walking', sets: 3, reps: '16' }
        ] 
      }
    ]
  },
  {
    id: 'home_warrior',
    name: 'Zero Equipment Warrior',
    category: 'Home / No Equipment',
    desc: 'Zero gym? No problem. High-intensity bodyweight routines to burn fat and build functional strength.',
    difficulty: 'Beginner',
    duration: '30 min',
    tags: ['Home', 'No Equipment', 'Calisthenics'],
    schedule: [
      { 
        day: 'Daily Circuit', focus: 'Full Body Calisthenics', 
        exercises: [
          { id: 'muscle_up', sets: 3, reps: 'Failure' },
          { id: 'pistol_squat', sets: 3, reps: '5/ea' },
          { id: 'handstand_pushup', sets: 3, reps: 'Failure' },
          { id: 'hiit_burpees', sets: 3, reps: '60s' },
          { id: 'hollow_body_hold', sets: 3, reps: '60s' }
        ] 
      }
    ]
  },
  {
    id: 'arnold_golden_six',
    name: 'Arnold\'s Golden Six',
    category: 'Bodybuilding',
    desc: 'The exact full-body routine Arnold Schwarzenegger used to pack on early mass. High volume, old-school fundamentals.',
    difficulty: 'Intermediate',
    duration: '75 min',
    tags: ['Old School', 'Mass', 'Full Body'],
    schedule: [
      { 
        day: 'Mon / Wed / Fri', focus: 'Full Body Hypertrophy', 
        exercises: [
          { id: 'squat_bb_back', sets: 4, reps: '10' },
          { id: 'chest_press_bb_flat', sets: 3, reps: '10' },
          { id: 'pull_up', sets: 3, reps: 'Max' },
          { id: 'shoulder_press_bb', sets: 4, reps: '10' },
          { id: 'bicep_curl_bb', sets: 3, reps: '10' },
          { id: 'plank_static', sets: 3, reps: 'Failure' }
        ] 
      },
      { day: 'Tue / Thu / Sat / Sun', focus: 'Rest & Recovery', exercises: [] }
    ]
  },
  {
    id: 'german_volume',
    name: 'German Volume Training (GVT)',
    category: 'Bodybuilding',
    desc: 'The ultimate plateau buster. Also known as the 10-sets method. Extremely demanding, builds massive muscle fibers.',
    difficulty: 'Advanced',
    duration: '60-80 min',
    tags: ['Mass', 'GVT', 'High Volume'],
    schedule: [
      { 
        day: 'Monday', focus: 'Chest & Back (10x10)', 
        exercises: [
          { id: 'chest_press_bb_flat', sets: 10, reps: '10' },
          { id: 'row_bb_bent', sets: 10, reps: '10' },
          { id: 'chest_fly_db', sets: 3, reps: '10-12' },
          { id: 'lat_pull_wide', sets: 3, reps: '10-12' }
        ] 
      },
      { 
        day: 'Wednesday', focus: 'Legs & Abs (10x10)', 
        exercises: [
          { id: 'squat_bb_back', sets: 10, reps: '10' },
          { id: 'romanian_deadlift', sets: 3, reps: '10' },
          { id: 'russian_twist_db', sets: 3, reps: '20' }
        ] 
      },
      { 
        day: 'Friday', focus: 'Arms & Shoulders (10x10)', 
        exercises: [
          { id: 'lateral_raise_db', sets: 10, reps: '10' },
          { id: 'bicep_curl_bb', sets: 3, reps: '10' },
          { id: 'skullcrusher_ez', sets: 3, reps: '10' }
        ] 
      },
      { day: 'Tue / Thu / Sat / Sun', focus: 'Rest', exercises: [] }
    ]
  },
  {
    id: 'wendler_531',
    name: 'Wendler\'s 5/3/1 Powerlifting',
    category: 'Strength / Power',
    desc: 'The absolute gold-standard percentage-based strength program. Designed for breaking 1-rep max records.',
    difficulty: 'Advanced',
    duration: '60 min',
    tags: ['Powerlifting', 'Strength', '5/3/1'],
    schedule: [
      { 
        day: 'Day 1', focus: 'Military Press & Accessories', 
        exercises: [
          { id: 'shoulder_press_bb', sets: 3, reps: '5/3/1+' },
          { id: 'lateral_raise_db', sets: 4, reps: '12' },
          { id: 'pull_up', sets: 3, reps: 'Max' }
        ] 
      },
      { 
        day: 'Day 2', focus: 'Deadlift & Hamstrings', 
        exercises: [
          { id: 'deadlift_bb', sets: 3, reps: '5/3/1+' },
          { id: 'romanian_deadlift', sets: 4, reps: '10' },
          { id: 'plank_static', sets: 4, reps: '60s' }
        ] 
      },
      { 
        day: 'Day 3', focus: 'Bench Press & Chest', 
        exercises: [
          { id: 'chest_press_bb_flat', sets: 3, reps: '5/3/1+' },
          { id: 'incline_bb_press', sets: 4, reps: '10' },
          { id: 'row_db_single', sets: 4, reps: '10' }
        ] 
      },
      { 
        day: 'Day 4', focus: 'Squat & Legs', 
        exercises: [
          { id: 'squat_bb_back', sets: 3, reps: '5/3/1+' },
          { id: 'leg_press_machine', sets: 4, reps: '15' },
          { id: 'lunges_walking', sets: 3, reps: '12/ea' }
        ] 
      }
    ]
  },
  {
    id: 'shortcut_size_top',
    name: 'Shortcut to Size (Periodization)',
    category: 'Bodybuilding',
    desc: 'Jim Stoppani\'s legendary micro-periodization program. Rotates through different rep ranges weekly to avoid plateaus.',
    difficulty: 'Intermediate',
    duration: '70 min',
    tags: ['Periodization', 'Science-Based', 'Mass'],
    schedule: [
      { day: 'Day 1', focus: 'Chest & Biceps', exercises: [{ id: 'chest_press_bb_flat', sets: 4, reps: '12-15' }, { id: 'incline_db_press', sets: 3, reps: '12' }, { id: 'bicep_curl_bb', sets: 4, reps: '15' }] },
      { day: 'Day 2', focus: 'Legs & Calves', exercises: [{ id: 'squat_bb_back', sets: 4, reps: '12' }, { id: 'romanian_deadlift', sets: 3, reps: '12' }, { id: 'leg_press_machine', sets: 3, reps: '20' }] },
      { day: 'Day 3', focus: 'Rest', exercises: [] },
      { day: 'Day 4', focus: 'Shoulders & Triceps', exercises: [{ id: 'shoulder_press_db', sets: 4, reps: '12' }, { id: 'lateral_raise_db', sets: 3, reps: '15' }, { id: 'tricep_pushdown_rope', sets: 4, reps: '15' }] },
      { day: 'Day 5', focus: 'Back & Abs', exercises: [{ id: 'row_bb_bent', sets: 4, reps: '12' }, { id: 'pull_up', sets: 3, reps: 'Max' }, { id: 'plank_static', sets: 3, reps: '60s' }] }
    ]
  },
  {
    id: 'superhuman_body',
    name: 'Superhuman Aesthetics',
    category: 'Bodybuilding',
    desc: 'Inspired by the Buff Dudes. Focusing on the "Superhuman" V-Taper: big shoulders, wide back, and narrow waist.',
    difficulty: 'Advanced',
    duration: '65 min',
    tags: ['Aesthetics', 'V-Taper', 'Powerbuilding'],
    schedule: [
      { day: 'Monday', focus: 'Upper Body Power', exercises: [{ id: 'chest_press_bb_flat', sets: 5, reps: '5' }, { id: 'row_bb_bent', sets: 5, reps: '5' }, { id: 'shoulder_press_bb', sets: 5, reps: '5' }] },
      { day: 'Wednesday', focus: 'Lower Body Strength', exercises: [{ id: 'squat_bb_back', sets: 5, reps: '5' }, { id: 'deadlift_bb', sets: 3, reps: '3' }, { id: 'kb_swing', sets: 3, reps: '15' }] },
      { day: 'Friday', focus: 'Aesthetic Specialization', exercises: [{ id: 'lateral_raise_db', sets: 4, reps: '15' }, { id: 'rear_delt_fly', sets: 4, reps: '15' }, { id: 'pull_up', sets: 4, reps: '12' }, { id: 'plank_static', sets: 4, reps: '90s' }] }
    ]
  },
  {
    id: 'yoga_mobility_extreme',
    name: 'Total Mobility & Power Yoga',
    category: 'Yoga / Mobility',
    desc: 'For athletes who need flexibility. Integrates powerful holds with active stretching to increase range of motion and core stability.',
    difficulty: 'Beginner',
    duration: '40 min',
    tags: ['Recovery', 'Mobility', 'Core'],
    schedule: [
      { day: 'Morning Flow', focus: 'Spinal Mobility & Glutes', exercises: [{ id: 'sun_salutation', sets: 8, reps: 'Cycles' }, { id: 'warrior_pose_2', sets: 4, reps: '60s' }, { id: 'hollow_body_hold', sets: 4, reps: '45s' }] }
    ]
  },
  {
    id: 'hiit_bodyweight_burn',
    name: '4-Week Bodyweight Burner',
    category: 'Weight Loss / HIIT',
    desc: 'Pure high-intensity bodyweight training. No equipment needed. Perfect for burning fat while traveling or at home.',
    difficulty: 'Intermediate',
    duration: '30 min',
    tags: ['HIIT', 'No Equipment', 'Travel'],
    schedule: [
      { day: 'Circuit', focus: 'Metabolic Conditioning', exercises: [{ id: 'hiit_burpees', sets: 5, reps: '45s' }, { id: 'lunges_walking', sets: 5, reps: '60s' }, { id: 'push_ups', sets: 5, reps: 'Max' }, { id: 'plank_static', sets: 5, reps: '60s' }] }
    ]
  }
];
