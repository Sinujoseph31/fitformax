export const EXERCISES = [
  // ── CHEST ──
  {
    id: 'chest_press_bb_flat', name: 'Barbell Bench Press', category: 'Chest', icon: '🏋️‍♂️',
    description: 'The king of chest mass. A compound horizontal push that builds thickness and power.',
    muscles: ['Chest', 'Triceps', 'Front Delts'], equipment: 'Barbell',
    gifUrl: 'https://raw.githubusercontent.com/jdfprater/praterfit/master/exercises/Flat%20Barbell%20Bench%20Press.gif',
    steps: ['Lie flat, grip bar slightly wider than shoulder-width', 'Retract shoulder blades into bench', 'Lower bar slowly to mid-chest (2-3 sec)', 'Press explosively back to start', 'Lock out elbows at top — repeat'],
    mistakes: ['Flaring elbows 90° out (destroys shoulder joints)', 'Bouncing bar off chest instead of full control', 'Lifting hips off the bench', 'Too wide or too narrow grip', 'Not retracting shoulder blades before unracking']
  },
  {
    id: 'chest_press_db_flat', name: 'Dumbbell Bench Press', category: 'Chest', icon: '🏋️',
    description: 'Greater range of motion and stabilizer activation than barbell.',
    muscles: ['Chest', 'Shoulders', 'Triceps'], equipment: 'Dumbbell',
    steps: ['Sit on bench, dumbbells on knees, kick up to chest', 'Grip neutral, wrists straight over elbows', 'Lower dumbbells to chest level slowly', 'Press up and slightly inward — squeeze at top', 'Keep controlled descent each rep'],
    mistakes: ['Letting dumbbells drift too far apart at bottom', 'Wrists bending back under load', 'Crashing dumbbells together at top', 'Using momentum to kick up too heavy weights', 'No stretch at the bottom — short range of motion']
  },
  {
    id: 'incline_bb_press', name: 'Incline Barbell Press', category: 'Chest', icon: '📈',
    description: 'Builds the upper chest for a full, rounded pec look.',
    muscles: ['Upper Chest', 'Front Delts', 'Triceps'], equipment: 'Barbell',
    steps: ['Set bench to 30–45 degrees', 'Grip bar slightly outside shoulder-width', 'Unrack — hold bar over upper chest', 'Lower to upper pec line slowly', 'Drive bar up — squeeze upper chest hard'],
    mistakes: ['Too steep of bench angle (becomes a shoulder press)', 'Lowering bar to mid or lower chest', 'Grip too narrow — limits chest activation', 'Flared elbows at the bottom', 'Not locking shoulder blades down first']
  },
  {
    id: 'push_ups', name: 'Push Ups', category: 'Chest', icon: '🧱',
    description: 'The fundamental bodyweight push movement — trains chest, core, and triceps.',
    muscles: ['Chest', 'Triceps', 'Core'], equipment: 'Bodyweight',
    steps: ['Place hands slightly wider than shoulder-width', 'Set feet together, body in a straight plank', 'Brace core and glutes tight throughout', 'Lower chest to 1 inch from floor (3 sec)', 'Push back up explosively — full arm extension'],
    mistakes: ['Hips sagging or piking upward', 'Head drooping forward instead of neutral spine', 'Partial reps — not lowering fully', 'Elbows flaring 90 degrees out', 'Holding breath — exhale on the push']
  },
  {
    id: 'chest_fly_db', name: 'Dumbbell Chest Fly', category: 'Chest', icon: '🦋',
    description: 'Isolation movement for chest stretch and center-line contraction.',
    muscles: ['Chest'], equipment: 'Dumbbell',
    steps: ['Lie flat, hold dumbbells above chest with slight elbow bend', 'Open arms wide in arc until chest stretches fully', 'Feel stretch at bottom — do not force or bounce', 'Squeeze chest to bring dumbbells back up in same arc', 'Pause and contract hard at the top'],
    mistakes: ['Bending elbows too much — turns it into a press', 'Lifting too heavy — leads to shoulder rotation injury', 'Not feeling chest — going through the motion', 'Dumbbells hitting each other at top', 'Rushing the eccentric — lose the stretch benefit']
  },

  // ── BACK ──
  {
    id: 'deadlift_bb', name: 'Barbell Deadlift', category: 'Back', icon: '⚡',
    description: 'The King of Lifts — full body compound for total strength and back thickness.',
    muscles: ['Full Back', 'Glutes', 'Hamstrings'], equipment: 'Barbell',
    gifUrl: 'https://raw.githubusercontent.com/jdfprater/praterfit/master/exercises/Deadlift.gif',
    steps: ['Stand with bar over mid-foot, feet hip-width', 'Hinge down — grip just outside legs', 'Brace core hard, lats tight (protect armpits)', 'Push floor away with legs — bar stays against shins', 'Stand tall — hips and shoulders rise at same rate', 'Hinge hips back to lower bar with control'],
    mistakes: ['Rounding lower back — high injury risk', 'Bar drifting away from body (lever arm increases)', 'Jerking the bar off floor instead of slow tension buildup', 'Hips shooting up first — becomes a good morning', 'Looking up excessively — strains cervical spine']
  },
  {
    id: 'pull_up', name: 'Pull Ups', category: 'Back', icon: '🦇',
    description: 'The gold standard vertical pull for lat width and upper back development.',
    muscles: ['Lats', 'Back', 'Biceps'], equipment: 'Bodyweight',
    steps: ['Hang from bar, overhand grip, slightly wider than shoulder width', 'Depress shoulder blades (pull them down)', 'Drive elbows toward hips while pulling chin over bar', 'Squeeze lats hard at the top', 'Lower with control — full dead hang each rep'],
    mistakes: ['Kipping or swinging for momentum', 'Short reps — not reaching full dead hang at bottom', 'Shrugging traps instead of using lats', 'Head jutting forward to fake reaching bar', 'Gripping too wide — limits range of motion']
  },
  {
    id: 'row_bb_bent', name: 'Bent Over Barbell Row', category: 'Back', icon: '🚣',
    description: 'Heaviest horizontal pull for building mid-back thickness and strength.',
    muscles: ['Mid Back', 'Lats', 'Rhomboids'], equipment: 'Barbell',
    steps: ['Stand with bar on floor, hinge to 45 degrees', 'Grip slightly wider than shoulder-width', 'Keep back flat — brace core throughout', 'Pull bar to belly button — drive elbows behind body', 'Squeeze mid-back hard at top — lower slow'],
    mistakes: ['Standing too upright — turns it into an upright row', 'Using lower back momentum (bouncing torso)', 'Pulling to chest instead of belly button', 'Not squeezing at top — no contraction', 'Rounded back under heavy load — injury risk']
  },
  {
    id: 'lat_pull_wide', name: 'Lat Pulldown (Wide Grip)', category: 'Back', icon: '📐',
    description: 'Primary machine vertical pull for V-taper and lat width.',
    muscles: ['Lats', 'Rear Delts'], equipment: 'Machine',
    steps: ['Sit, pad securing thighs, grip wider than shoulder width', 'Lean back slightly (10–15 degrees)', 'Pull bar to upper chest — drive elbows down', 'Squeeze lats at bottom — hold 1 sec', 'Control bar back up — full stretch at top'],
    mistakes: ['Pulling bar behind neck — shoulder/cervical injury', 'Leaning back too far — becomes a row', 'Using biceps — not focusing on elbows down', 'Letting weight crash up — losing tension', 'Grip too wide — limits range of motion']
  },
  {
    id: 'row_db_single', name: 'Single Arm Dumbbell Row', category: 'Back', icon: '🛶',
    description: 'Unilateral row that maximizes range of motion and corrects imbalances.',
    muscles: ['Lats', 'Middle Back'], equipment: 'Dumbbell',
    steps: ['Place hand and knee on bench for support', 'Hold dumbbell — arm hanging straight down', 'Pull elbow straight back and up past hip', 'Squeeze lat and rhomboid at the top', 'Lower slowly — full stretch at the bottom'],
    mistakes: ['Rotating torso to help pull — cheating the movement', 'Pulling with bicep instead of elbow', 'Not getting full stretch at the bottom', 'Shrugging the shoulder at top', 'Going too heavy — losing strict form']
  },

  // ── LEGS ──
  {
    id: 'squat_bb_back', name: 'Barbell Back Squat', category: 'Legs', icon: '🦵',
    description: 'The undisputed king of lower body — builds quads, glutes, and core strength.',
    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Core'], equipment: 'Barbell',
    gifUrl: 'https://raw.githubusercontent.com/jdfprater/praterfit/master/exercises/Back%20Squat.gif',
    steps: ['Bar on upper traps, step back — feet shoulder width', 'Toes out 30 degrees, brace core hard', 'Push knees outward — sit down (not back only)', 'Break parallel — thighs below horizontal', 'Drive through heels — hips and chest rise together'],
    mistakes: ['Knees caving inward (valgus collapse)', 'Heels coming off floor — mobility issue', 'Good morning squat (chest drops, hips rise early)', 'Shallow depth — not reaching parallel', 'Too much forward lean — bar position issue']
  },
  {
    id: 'romanian_deadlift', name: 'Romanian Deadlift (RDL)', category: 'Legs', icon: '🍗',
    description: 'The best hamstring and glute builder using a hip hinge pattern.',
    muscles: ['Hamstrings', 'Glutes'], equipment: 'Barbell',
    steps: ['Stand, bar in hands at hip level — soft knees', 'Push hips back — bar slides down thighs', 'Lower until hamstrings are deeply stretched', 'Drive hips forward to stand — squeeze glutes hard', 'Keep bar close to body the entire time'],
    mistakes: ['Rounding lower back instead of hinging at hip', 'Bending knees too much — becomes a deadlift', 'Bar drifting away from legs', 'Going too low — losing spinal position', 'Not squeezing glutes at the top']
  },
  {
    id: 'hip_thrust_bb', name: 'Barbell Hip Thrust', category: 'Legs', icon: '🍑',
    description: 'The number one glute hypertrophy exercise by research consensus.',
    muscles: ['Glutes'], equipment: 'Barbell',
    steps: ['Sit on floor with upper back on bench edge', 'Bar over hips — pad for comfort', 'Plant feet flat, hip-width, chest tall', 'Drive hips up — squeeze glutes hard at top', 'Hold 1 second — lower with control'],
    mistakes: ['Pushing hips too high — hyperextends lower back', 'Feet too far from body — reduces glute activation', 'Chin tucked — tuck chin to chest throughout', 'Not reaching full hip extension at top', 'Allowing knees to cave inward']
  },
  {
    id: 'bulgarian_split_squat', name: 'Bulgarian Split Squat', category: 'Legs', icon: '🦵',
    description: 'Single-leg powerhouse for quad and glute hypertrophy with balance challenge.',
    muscles: ['Quads', 'Glutes'], equipment: 'Dumbbell',
    steps: ['Rear foot on bench, front foot forward', 'Hold dumbbells at side — stand tall', 'Lower rear knee toward floor slowly', 'Keep front shin mostly vertical throughout', 'Drive through front heel to stand — repeat'],
    mistakes: ['Front knee caving inward', 'Too short a stance — forward lean is excessive', 'Rising on tiptoe of rear foot', 'Bouncing at the bottom to reverse direction', 'Using momentum — always slow controlled lowering']
  },
  {
    id: 'leg_press_machine', name: 'Leg Press', category: 'Legs', icon: '🚜',
    description: 'High-volume quad and glute loading with full back support.',
    muscles: ['Quads', 'Glutes'], equipment: 'Machine',
    steps: ['Sit in machine — back and hips flat against pad', 'Feet shoulder-width at mid-platform', 'Release safety handles and lower weight slowly', 'Stop when knees are at 90 degrees minimum', 'Press weight up — do not lock knees out fully'],
    mistakes: ['Allowing lower back to round off seat at bottom', 'Locking knees out — stress on joint', 'Feet too low on platform — ankle stress', 'Partial range of motion', 'Too heavy load — compensating with bounce']
  },
  {
    id: 'lunges_walking', name: 'Walking Lunges', category: 'Legs', icon: '🚶',
    description: 'Dynamic leg movement improving strength, stability and coordination.',
    muscles: ['Quads', 'Glutes', 'Stability'], equipment: 'Dumbbell',
    steps: ['Stand tall holding dumbbells at sides', 'Step forward — lower rear knee toward ground', 'Front shin stays vertical — knee over ankle', 'Push off front foot and bring rear leg forward', 'Immediately step into next lunge — alternate legs'],
    mistakes: ['Knee touching or slamming into floor', 'Front knee shooting past toes — too short a step', 'Leaning torso forward', 'Dumbbells swinging — lack of control', 'Looking down — lose balance and posture']
  },

  // ── SHOULDERS ──
  {
    id: 'shoulder_press_bb', name: 'Overhead Press (OHP)', category: 'Shoulders', icon: '⛰️',
    description: 'The benchmark of upper body pressing strength and shoulder mass.',
    muscles: ['Front Delts', 'Shoulders', 'Triceps'], equipment: 'Barbell',
    steps: ['Stand or sit — bar at upper chest level', 'Grip just outside shoulder-width', 'Brace core and glutes — rib cage down', 'Press bar straight up — head moves back slightly', 'Lock arms out — lower under control'],
    mistakes: ['Leaning back excessively — turns into incline press', 'Bar path drifting forward instead of straight up', 'Flared elbows — close to 45 degrees is better', 'Not fully locking out arms at top', 'Hyperextending lower back — core not engaged']
  },
  {
    id: 'lateral_raise_db', name: 'Lateral Raise', category: 'Shoulders', icon: '👐',
    description: 'The only way to grow wide, capped side deltoids.',
    muscles: ['Side Delts'], equipment: 'Dumbbell',
    steps: ['Stand with dumbbells at sides — slight forward lean', 'Lead with elbows — not hands — raise out to sides', 'Stop at shoulder height — no higher', 'Pinky side slightly higher than thumb (pour water out)', 'Lower slowly in 3 seconds — no swinging'],
    mistakes: ['Using shoulders to shrug dumbbells up', 'Going too heavy — turning into a full-body swing', 'Wrists higher than elbows at top', 'Rushing the lowering phase — removes time under tension', 'Raising above shoulder level — impingement risk']
  },
  {
    id: 'shoulder_press_db', name: 'Dumbbell Shoulder Press', category: 'Shoulders', icon: '🏙️',
    description: 'Seated or standing press for balanced shoulder mass and strength.',
    muscles: ['Shoulders', 'Triceps'], equipment: 'Dumbbell',
    steps: ['Sit on bench with back support — dumbbells at shoulder height', 'Elbows at 90 degrees and in line with shoulders', 'Press overhead — squeeze at top', 'Lower controlled until upper arms are parallel to floor', 'Keep core engaged — do not arch lower back'],
    mistakes: ['Elbows too far forward or backward', 'Arching back heavily to push weight up', 'Partial reps — not reaching full extension', 'Spinning dumbbells inward at top too aggressively', 'Neck craning forward under load']
  },
  {
    id: 'rear_delt_fly', name: 'Rear Delt Fly', category: 'Shoulders', icon: '🦅',
    description: 'Essential for rear delts, shoulder health, and a 3D shoulder look.',
    muscles: ['Rear Delts'], equipment: 'Dumbbell',
    steps: ['Hinge forward 45+ degrees — back flat', 'Hold dumbbells hanging in front, slight elbow bend', 'Lead with pinkies — raise elbows out to sides', 'Squeeze rear delts at the top — hold briefly', 'Lower under control — no swinging'],
    mistakes: ['Using too much weight and rocking body', 'Shrugging traps instead of targeting rear delts', 'Straight arms — should have a slight elbow bend', 'Not hinging forward enough — loses rear delt isolation', 'Rushing reps — no contraction at top']
  },
  {
    id: 'shrug_bb', name: 'Barbell Shrugs', category: 'Shoulders', icon: '🤷‍♂️',
    description: 'The definitive trap builder for neck thickness and upper back size.',
    muscles: ['Traps'], equipment: 'Barbell',
    steps: ['Stand holding bar in front, arms straight', 'Shrug shoulders straight up — not forward/backward', 'Squeeze traps hard at the top — hold 1 second', 'Lower shoulders all the way down slowly', 'Full depression and elevation each rep'],
    mistakes: ['Rolling shoulders forward or backward — strain risk', 'Using neck to assist the movement', 'Partial range — only slight lift', 'Going too heavy — lose squeeze at top', 'Rushing — speed removes trap activation']
  },

  // ── ARMS ──
  {
    id: 'bicep_curl_bb', name: 'Barbell Bicep Curl', category: 'Arms', icon: '💪',
    description: 'Mass builder for the biceps using a straight bar.',
    muscles: ['Biceps'], equipment: 'Barbell',
    steps: ['Stand, grip bar shoulder-width, arms fully extended', 'Pin elbows to sides throughout entire movement', 'Curl bar up — squeeze bicep at top of movement', 'Hold squeeze for 1 second at peak', 'Lower under full control — 3 second descent'],
    mistakes: ['Swinging body to help curl weight up', 'Elbows drifting forward — reduces bicep tension', 'Not reaching full extension at bottom', 'Gripping too wide or narrow', 'Rushing the negative — losing half the work']
  },
  {
    id: 'hammer_curl_db', name: 'Hammer Curls', category: 'Arms', icon: '🔨',
    description: 'Targets brachialis and forearms for true arm thickness.',
    muscles: ['Biceps', 'Forearms'], equipment: 'Dumbbell',
    steps: ['Stand holding dumbbells in neutral grip (palms facing each other)', 'Keep elbows pinned at sides', 'Curl both dumbbells up simultaneously or alternating', 'Squeeze brachialis at top of movement', 'Lower controlled — full extension at bottom'],
    mistakes: ['Rotating wrists — this becomes a regular curl', 'Elbows swinging forward past neutral', 'Alternating too fast — losing control', 'Short ranging — not fully extending', 'Gripping too loose — affects forearm activation']
  },
  {
    id: 'tricep_pushdown_rope', name: 'Rope Pushdowns', category: 'Arms', icon: '📉',
    description: 'Cable isolation for tricep lateral and medial head separation.',
    muscles: ['Triceps'], equipment: 'Cable',
    steps: ['Set cable to high pulley — attach rope', 'Stand close, grip rope with palms facing inward', 'Pin elbows at sides — do not move them', 'Push rope down and flare ends apart at bottom', 'Squeeze hard — let rope rise back with control'],
    mistakes: ['Elbows drifting away from body during movement', 'Leaning forward too much — uses bodyweight not triceps', 'Not separating rope at bottom — reduces contraction', 'Using too much weight — elbows flare heavily', 'Rushed reps — no squeeze at full extension']
  },
  {
    id: 'skullcrusher_ez', name: 'Skullcrushers', category: 'Arms', icon: '💀',
    description: 'Heavy tricep isolation for the long head — the biggest part of the arm.',
    muscles: ['Triceps'], equipment: 'Barbell',
    steps: ['Lie flat on bench — hold EZ bar above chest', 'Keep upper arms vertical and perfectly still', 'Bend elbows — lower bar to forehead level', 'Stretch fully — feel the long head lengthen', 'Extend elbows to press bar back up to start'],
    mistakes: ['Elbows flaring wide — loses tricep isolation', 'Upper arms drifting backward — becomes a pullover hybrid', 'Not going low enough — short range of motion', 'Too heavy — elbows cannot stay stable', 'Bouncing bar off forehead to assist rep']
  },
  {
    id: 'bicep_curl_db_alt', name: 'Alternating DB Curl', category: 'Arms', icon: '💪',
    description: 'Classic isolation curl with wrist supination for peak contraction.',
    muscles: ['Biceps'], equipment: 'Dumbbell',
    steps: ['Stand, dumbbells hanging at sides in neutral grip', 'Curl one dumbbell — rotate palm upward as you lift', 'Full supination (palm faces ceiling) at the top', 'Squeeze bicep peak hard at top', 'Lower slowly — rotate back to neutral as you lower'],
    mistakes: ['Not supinating wrist — loses extra peak contraction', 'Both arms moving simultaneously removes the benefit', 'Shrugging or raising elbow to assist curl', 'Swinging opposite arm/body to generate momentum', 'Short range at top — not fully contracting']
  },
  {
    id: 'bench_dips', name: 'Bench Dips', category: 'Arms', icon: '🪑',
    description: 'Simple but effective tricep and lower chest builder using a bench.',
    muscles: ['Triceps', 'Chest'], equipment: 'Bodyweight',
    steps: ['Place hands on bench edge behind you, fingers forward', 'Extend legs out in front — heels on floor', 'Lower body by bending elbows to 90 degrees', 'Elbows should track straight back — not flare out', 'Press through palms to extend arms fully'],
    mistakes: ['Elbows flaring wide — shoulder stress', 'Not going deep enough — short dip', 'Hips drifting too far from bench', 'Shrugging shoulders up during the dip', 'Legs bent too much — reduces difficulty and form']
  },

  // ── ABS ──
  {
    id: 'plank_static', name: 'Standard Plank', category: 'Abs', icon: '🧱',
    description: 'The foundation of core stability — trains all deep core muscles.',
    muscles: ['Core', 'Abs'], equipment: 'Bodyweight',
    steps: ['Forearms on floor, elbows under shoulders', 'Rise up on toes — body in a straight line', 'Brace abs like bracing for a punch', 'Squeeze glutes firmly throughout', 'Hold — breathe steadily — do not hold breath'],
    mistakes: ['Hips sagging down — lower back strain', 'Hips piking too high — loses core challenge', 'Head drooping down or craning up', 'Holding breath — always breathe', 'Hands clasped — elbows should be parallel']
  },
  {
    id: 'leg_raise_hanging', name: 'Hanging Leg Raise', category: 'Abs', icon: '🐒',
    description: 'Elite lower ab and hip flexor movement demanding serious core strength.',
    muscles: ['Lower Abs', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Hang from pull-up bar — dead hang position', 'Press shoulders down (depress scapulae)', 'Raise legs together — either knees bent or straight', 'Bring thighs to chest or above parallel if able', 'Lower legs slowly — no swinging momentum'],
    mistakes: ['Swinging body — using momentum entirely', 'Bending knees to make it easier without intent', 'Rushing the lowering phase — loses eccentric strength', 'Not fully depressing lats when hanging', 'Arching lower back at bottom to assist the lift']
  },
  {
    id: 'russian_twist_db', name: 'Russian Twists', category: 'Abs', icon: '🌪️',
    description: 'Rotational oblique movement for a slim and strong midsection.',
    muscles: ['Obliques'], equipment: 'Dumbbell',
    steps: ['Sit on floor, knees bent, feet lifted or on floor', 'Hold weight at chest — lean back to 45 degrees', 'Rotate torso to right — not just arms', 'Touch weight to floor beside hip', 'Rotate to the left — that is one full rep'],
    mistakes: ['Only moving arms — no torso rotation', 'Leaning back too far — lower back takes over', 'Feet on floor making it too easy — elevate for challenge', 'Arching back — abs not engaged enough', 'Too fast — removes full rotation and contraction']
  },
  {
    id: 'hollow_body_hold', name: 'Hollow Body Hold', category: 'Abs', icon: '🚣‍♀️',
    description: 'Gymnastic-based deep core hold that builds true functional core strength.',
    muscles: ['Deep Core'], equipment: 'Bodyweight',
    steps: ['Lie on back — raise arms overhead and legs up', 'Press lower back firmly into the floor', 'Raise shoulder blades off floor slightly', 'Hold body in a curved hollow dish shape', 'Breathe steadily — hold for time'],
    mistakes: ['Lower back arching off floor — core not engaged', 'Separating arms from ears — reduces lever arm', 'Bending knees to make it easier (without intent)', 'Holding breath — makes core tense incorrectly', 'Raising legs too high — reduces difficulty and form']
  },

  // ── HOME WORKOUTS ──
  {
    id: 'home_incline_pushup', name: 'Incline Sofa Pushup', category: 'Home', icon: '🛋️',
    description: 'Easier pushup variant targeting lower chest using any sofa or sturdy surface.',
    muscles: ['Lower Chest', 'Triceps'], equipment: 'Sofa/Chair',
    steps: ['Place hands on sofa edge, slightly wider than shoulder-width', 'Step feet back — body in a straight plank line', 'Lower chest toward sofa surface slowly', 'Keep elbows at 45 degrees — not flaring wide', 'Press back up — full arm extension at top'],
    mistakes: ['Hips dropping — body not in straight line', 'Hands placed too high on sofa back (wrong leverage)', 'Elbows flaring to 90 degrees outward', 'Partial reps — not touching chest to sofa', 'Looking down — neutral spine is essential']
  },
  {
    id: 'home_chair_dips', name: 'Chair Tricep Dips', category: 'Home', icon: '🪑',
    description: 'Effective tricep builder with zero equipment using any sturdy chair.',
    muscles: ['Triceps', 'Chest'], equipment: 'Chair',
    steps: ['Place hands on chair seat edge — fingers facing forward', 'Slide hips off chair — legs extended or bent', 'Lower body bending elbows to 90 degrees', 'Elbows should track straight back behind you', 'Press through palms — full arm extension at top'],
    mistakes: ['Elbows flaring wide — shoulder impingement', 'Hips too far from chair — changes leverage', 'Not lowering deep enough', 'Chair moving or sliding — always use non-slip surface', 'Shrugging shoulders up throughout the movement']
  },
  {
    id: 'home_wall_sit', name: 'Wall Sit', category: 'Home', icon: '🧱',
    description: 'Isometric quad burner — requires only a flat wall.',
    muscles: ['Quads'], equipment: 'Wall',
    steps: ['Stand with back against a flat wall', 'Slide down until thighs are parallel to floor', 'Knees should be at 90 degrees — shins vertical', 'Keep back fully flat against wall throughout', 'Hold — breathe steadily — time yourself'],
    mistakes: ['Knees not at 90 degrees — too shallow', 'Back peeling off wall — sliding down', 'Feet too close to wall — knees go past toes', 'Holding breath — exhale steadily', 'Looking down — keep head back against wall']
  },
  {
    id: 'home_glute_bridge', name: 'Floor Glute Bridge', category: 'Home', icon: '🧘',
    description: 'Simple glute activation and strength builder requiring no equipment.',
    muscles: ['Glutes', 'Hamstrings'], equipment: 'Bodyweight',
    steps: ['Lie on back — knees bent, feet flat near hips', 'Press arms flat to floor for stability', 'Drive hips straight up — squeeze glutes at top', 'Hold for 1–2 seconds fully contracted', 'Lower hips slowly — hover just above floor between reps'],
    mistakes: ['Not squeezing glutes at the top — just lifting hips', 'Feet too far — hamstrings dominate', 'Hyperextending lower back at top', 'Knees caving inward throughout movement', 'Dropping hips to floor for full rest between reps']
  },
  {
    id: 'home_pike_pushup', name: 'Pike Pushup', category: 'Home', icon: '⛰️',
    description: 'Bodyweight shoulder press alternative using an inverted V position.',
    muscles: ['Shoulders', 'Triceps'], equipment: 'Bodyweight',
    steps: ['Start in push-up position — walk feet toward hands', 'Raise hips high — body forms an inverted V', 'Bend elbows — lower head toward floor between hands', 'Head should move forward as it descends', 'Press back up extending arms — return to V position'],
    mistakes: ['Hips not high enough — becomes a regular pushup', 'Looking up instead of at feet', 'Head moving straight down — should move slightly forward', 'Not touching head near floor — short range', 'Feet too close — too steep angle']
  },
  {
    id: 'home_step_up', name: 'Stair Step-Ups', category: 'Home', icon: '🪜',
    description: 'Unilateral leg strength using household stairs.',
    muscles: ['Quads', 'Glutes'], equipment: 'Stairs',
    steps: ['Stand at bottom of stair — one foot on step', 'Drive through the heel of the raised foot', 'Stand fully upright on the step — do not use back leg', 'Slowly lower the opposite leg back to floor', 'Repeat all reps on one leg before switching'],
    mistakes: ['Pushing off back foot — defeats the purpose', 'Leaning heavily forward', 'Step too low — reduces quad activation', 'Knees caving in on the driving step', 'Moving too fast — remove the eccentric control']
  },

  // ── CALISTHENICS ──
  {
    id: 'muscle_up', name: 'Muscle Up', category: 'Calisthenics', icon: '🦍',
    description: 'The pinnacle bar movement — combines a pull-up and a dip in one fluid motion.',
    muscles: ['Back', 'Triceps', 'Chest'], equipment: 'Bodyweight',
    steps: ['Grip bar with false grip — wrists over bar', 'Generate explosive pull — elbows drive behind body', 'As chin passes bar — transition forward rapidly', 'Rotate wrists and lean chest over bar', 'Lock arms out fully in a top dip position'],
    mistakes: ['Weak pull — not getting chin above bar', 'Missing the transition — stalling mid-move', 'No false grip — makes wrist rotation impossible', 'Kipping too much — building without strength base', 'Arms not locked out at top']
  },
  {
    id: 'pistol_squat', name: 'Pistol Squat', category: 'Calisthenics', icon: '🔫',
    description: 'Single-leg squat requiring extreme balance, strength, and mobility.',
    muscles: ['Quads', 'Glutes', 'Balance'], equipment: 'Bodyweight',
    steps: ['Stand on one leg — extend other leg forward', 'Arms extended forward for counterbalance', 'Slowly lower on single leg — go all the way down', 'Keep heel flat — do not let it rise', 'Drive through heel to stand — maintain balance'],
    mistakes: ['Heel rising off floor — ankle mobility issue', 'Leaning excessively forward', 'Knee caving dramatically inward', 'Not reaching full depth', 'Using wall or support when building strength incorrectly']
  },
  {
    id: 'handstand_pushup', name: 'Handstand Pushup', category: 'Calisthenics', icon: '🙃',
    description: 'Elite bodyweight shoulder press — requires full body tension and control.',
    muscles: ['Shoulders', 'Triceps', 'Balance'], equipment: 'Bodyweight',
    steps: ['Kick up against wall — hands shoulder-width', 'Body straight — core and glutes engaged', 'Lower head toward floor by bending elbows', 'Head should just touch floor lightly at bottom', 'Press back up explosively — full arm lock at top'],
    mistakes: ['Elbows flaring wide — shoulder impingement', 'Not bracing core — banana back position', 'Hands too close or too far from wall', 'Head crashing into floor — not controlled lowering', 'Looking up instead of at floor between hands']
  },

  // ── OLYMPIC ──
  {
    id: 'kb_swing', name: 'Kettlebell Swing', category: 'Olympic', icon: '🔔',
    description: 'Explosive hip hinge for power, conditioning, and posterior chain development.',
    muscles: ['Glutes', 'Hamstrings', 'Lower Back'], equipment: 'Kettlebell',
    steps: ['Stand feet hip-width — hike bell between legs', 'Hinge at hips — back flat, lats tight', 'Snap hips forward explosively — bell floats up', 'Stand tall — squeeze glutes hard at top', 'Let bell fall — hinge back to absorb — repeat'],
    mistakes: ['Squatting the swing instead of hinging', 'Arms pulling the bell — must be passive', 'Leaning back at top — should be vertical', 'Loose back — core must be braced throughout', 'Rounding lower back on the hinge back']
  },
  {
    id: 'power_clean', name: 'Power Clean', category: 'Olympic', icon: '💥',
    description: 'Explosive Olympic lift developing total body power and athleticism.',
    muscles: ['Full Body', 'Back', 'Traps'], equipment: 'Barbell',
    steps: ['Set up like deadlift — bar over mid-foot', 'First pull: deadlift bar to knee height', 'Second pull: explosive hip extension — triple extension', 'Shrug and pull elbows high and wide rapidly', 'Drop under — receive bar in front rack at shoulder'],
    mistakes: ['Early arm bend in the pull — arms stay straight until shrug', 'Jumping forward during the pull', 'Bar pulling away from body during first pull', 'Not getting under the bar fast enough', 'Catching bar with wrists — should be on shoulders']
  },

  // ── YOGA ──
  {
    id: 'sun_salutation', name: 'Sun Salutation A', category: 'Yoga', icon: '☀️',
    description: 'Foundational morning flow linking breath and movement through 12 poses.',
    muscles: ['Full Body', 'Flexibility'], equipment: 'Yoga Mat',
    steps: ['Mountain pose — hands at heart center', 'Inhale — arms sweep overhead (Raised Hands)', 'Exhale — fold forward (Standing Forward Bend)', 'Inhale — half lift — flat back', 'Exhale — step or jump to plank — lower to floor', 'Inhale — Cobra or Upward Dog', 'Exhale — Downward Facing Dog — hold 5 breaths', 'Walk or jump feet to hands — repeat'],
    mistakes: ['Rushing through poses without connecting to breath', 'Collapsing lower back in Cobra', 'Upward Dog on knees instead of tops of feet', 'Shoulders shrugging in Downward Dog', 'Not pressing fully through palms in every pose']
  },
  {
    id: 'warrior_pose_2', name: 'Warrior II', category: 'Yoga', icon: '🤺',
    description: 'Standing strength and focus pose building leg endurance and hip opening.',
    muscles: ['Legs', 'Shoulders'], equipment: 'Yoga Mat',
    steps: ['Step feet wide apart — 4 feet — front foot faces forward', 'Bend front knee over ankle — 90 degrees', 'Rear foot turns in 45 degrees', 'Arms extend wide parallel to floor', 'Gaze over front fingertips — strong, steady hold'],
    mistakes: ['Front knee collapsing inward', 'Knee going past toes of front foot', 'Arms drooping — they must be energized and extended', 'Leaning forward — keep torso stacked over hips', 'Rear hip opening less than 45 degrees']
  },
  {
    id: 'downward_dog', name: 'Downward Facing Dog', category: 'Yoga', icon: '🐕',
    description: 'Active recovery and stretch — lengthens spine, hamstrings, and calves.',
    muscles: ['Hamstrings', 'Calves', 'Back'], equipment: 'Yoga Mat',
    steps: ['Start on hands and knees — hands shoulder-width', 'Spread fingers wide — press evenly through palms', 'Tuck toes — lift hips high toward ceiling', 'Straighten arms and legs — heels press toward mat', 'Lengthen spine — tailbone reaches up'],
    mistakes: ['Rounded upper back — spine should be long', 'Weight in wrists only — press through full palm', 'Shoulders shrugging to ears', 'Feet too close to hands — shortens the stretch', 'Knees locked — slight bend is fine for tight hamstrings']
  },

  // ── CARDIO ──
  {
    id: 'hiit_burpees', name: 'Burpees', category: 'Cardio', icon: '🐸',
    description: 'Total body conditioning — combines push, squat, and jump in one brutal movement.',
    muscles: ['Heart', 'Full Body'], equipment: 'Bodyweight',
    steps: ['Stand — squat down and place hands on floor', 'Jump or step feet back to push-up position', 'Chest to floor — full push-up', 'Jump or step feet back to hands', 'Explode up — full jump with arms overhead'],
    mistakes: ['Worming chest to floor instead of full pushup', 'Not standing fully upright on the jump', 'Landing with stiff legs on the jump', 'Letting lower back sag in plank position', 'Going so fast that all form breaks down']
  },
  {
    id: 'running_outdoors', name: 'Outdoors Running', category: 'Cardio', icon: '🏃',
    description: 'The most natural form of cardio — adapts heart rate, lungs, and legs progressively.',
    muscles: ['Heart', 'Legs'], equipment: 'None',
    steps: ['Start with 5-min brisk walk warm-up', 'Begin at conversational pace — can speak in full sentences', 'Land midfoot — not heel striking', 'Relax shoulders and arms — swing from elbows', 'Cool down 5-min walk and calf/hamstring stretching'],
    mistakes: ['Starting too fast and burning out in first quarter', 'Heavy heel striking — high injury risk over time', 'Shoulders raised and tense throughout', 'Holding breath instead of rhythmic nasal/mouth breathing', 'Skipping warm-up and cool-down — injury over time']
  }
];

export const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Abs', 'Home', 'Yoga', 'Cardio', 'Calisthenics', 'Olympic'];
export const EQUIPMENT = ['Dumbbell', 'Barbell', 'Cable', 'Machine', 'Bodyweight', 'Kettlebell', 'Yoga Mat', 'Chair', 'Sofa', 'None'];
