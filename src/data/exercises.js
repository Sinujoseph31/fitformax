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
  {
    id: 'incline_db_press', name: 'Incline Dumbbell Press', category: 'Chest', icon: '🏋️',
    description: 'Builds the upper chest with independent arm movement for balance and depth.',
    muscles: ['Upper Chest', 'Front Delts', 'Triceps'], equipment: 'Dumbbell',
    steps: ['Set bench to 30–45 degrees', 'Kick dumbbells up to shoulder height', 'Press dumbbells up and slightly inward', 'Lower with control until elbows are slightly below parallel', 'Keep core tight and feet planted'],
    mistakes: ['Bench angle too steep', 'Bouncing dumbbells off chest', 'Flaring elbows excessively wide', 'Arching lower back heavily']
  },
  {
    id: 'cable_crossover', name: 'Cable Crossover', category: 'Chest', icon: '📉',
    description: 'Constant tension isolation exercise for total chest development.',
    muscles: ['Chest', 'Inner Chest'], equipment: 'Cable',
    steps: ['Set pulleys high and grab handles', 'Step forward holding handles, lean slightly forward', 'Bring hands together in a wide arc like giving a hug', 'Squeeze chest at the center', 'Control the weight back to the starting stretch'],
    mistakes: ['Pressing the cables instead of flying/hugging', 'Standing too upright', 'Not pausing at the contraction', 'Using too much weight and losing form']
  },
  {
    id: 'pec_deck', name: 'Machine Pec Deck', category: 'Chest', icon: '🦋',
    description: 'A safe and effective machine isolation for peak chest contraction.',
    muscles: ['Chest', 'Inner Chest'], equipment: 'Machine',
    steps: ['Sit and adjust seat so handles are at chest level', 'Grip handles with slight elbow bend', 'Contract chest to bring handles together', 'Hold the squeeze for 1 second', 'Slowly let arms back until you feel a deep stretch'],
    mistakes: ['Sitting too low or high', 'Slamming the weights back', 'Bringing elbows too far back behind shoulders']
  },
  {
    id: 'decline_bb_press', name: 'Decline Barbell Press', category: 'Chest', icon: '⬇️',
    description: 'Targets the lower pectorals and allows for heavy loads.',
    muscles: ['Lower Chest', 'Triceps'], equipment: 'Barbell',
    steps: ['Lock legs into decline bench', 'Unrack bar and lower to lower chest/sternum', 'Press weight straight up', 'Keep elbows at a 45-degree angle', 'Rack safely or use a spotter'],
    mistakes: ['Lowering bar to neck or collarbone', 'Bouncing off chest', 'Overarching the back']
  },
  {
    id: 'chest_dips', name: 'Weighted Chest Dips', category: 'Chest', icon: '🪑',
    description: 'A heavy compound movement emphasizing the lower chest and triceps.',
    muscles: ['Lower Chest', 'Triceps', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Mount dip station and lean torso forward', 'Lower body until arm is past 90 degrees', 'Push back up extending arms fully', 'Keep chin tucked and legs slightly behind body', 'Add weight belt for progressive overload'],
    mistakes: ['Staying completely upright (targets triceps more)', 'Not going deep enough', 'Flaring elbows too wide, risking shoulder injury']
  },
  {
    id: 'svend_press', name: 'Svend Press', category: 'Chest', icon: '🍽️',
    description: 'A unique inner-chest squeezing exercise using weight plates.',
    muscles: ['Inner Chest', 'Front Delts'], equipment: 'Dumbbell',
    steps: ['Stand, squeeze two small plates together at chest', 'Push the plates straight out in front of you', 'Squeeze chest as hard as possible', 'Bring plates back to chest slowly', 'Do not drop the plates!'],
    mistakes: ['Using a dumbbell instead of flat plates', 'Rushing the movement without squeezing', 'Dropping the arms too low']
  },
  {
    id: 'low_to_high_cable', name: 'Low-to-High Cable Fly', category: 'Chest', icon: '📈',
    description: 'Targets the upper chest with an upward sweeping motion.',
    muscles: ['Upper Chest', 'Front Delts'], equipment: 'Cable',
    steps: ['Set pulleys to the lowest level', 'Step forward from machine', 'Sweep arms upward and inward until hands meet at upper chest', 'Squeeze upper chest hard', 'Lower weight back to starting stretch'],
    mistakes: ['Bending elbows into a curl', 'Using momentum instead of chest', 'Shrugging traps to lift handles']
  },
  {
    id: 'machine_chest_press', name: 'Machine Chest Press', category: 'Chest', icon: '🚜',
    description: 'Allows for heavy horizontal pushing without relying on stabilizers.',
    muscles: ['Chest', 'Triceps'], equipment: 'Machine',
    steps: ['Adjust seat so handles align with mid-chest', 'Press the handles out until arms are extended', 'Do not lock out elbows completely', 'Return to start slowly until feeling a stretch', 'Keep back flat against the pad'],
    mistakes: ['Pushing with shoulders coming off pad', 'Rushing the eccentric phase', 'Handling too much weight and bouncing']
  },
  {
    id: 'decline_db_press', name: 'Decline Dumbbell Press', category: 'Chest', icon: '⬇️',
    description: 'Targets the lower pectorals using dumbbells for an extended range of motion.',
    muscles: ['Lower Chest', 'Triceps'], equipment: 'Dumbbell',
    steps: ['Lock legs into decline bench', 'Hold dumbbells at chest level', 'Press weights up and together', 'Lower with control until feel a stretch'],
    mistakes: ['Going too heavy and dropping dumbbells', 'Bouncing at the bottom']
  },
  {
    id: 'hammer_strength_press', name: 'Hammer Strength Press', category: 'Chest', icon: '🚜',
    description: 'Plate-loaded machine simulating a bench press with a fixed, safe path.',
    muscles: ['Chest', 'Triceps'], equipment: 'Machine',
    steps: ['Adjust seat to align handles with mid-chest', 'Grip handles and press out', 'Squeeze chest at full extension', 'Lower slowly'],
    mistakes: ['Seat adjusted too high or low', 'Not pausing at full contraction']
  },
  {
    id: 'incline_db_fly', name: 'Incline Dumbbell Fly', category: 'Chest', icon: '🦋',
    description: 'Isolation for the upper chest to maximize stretch.',
    muscles: ['Upper Chest'], equipment: 'Dumbbell',
    steps: ['Set bench to 30 degrees', 'Hold dumbbells above chest', 'Lower arms in a wide arc', 'Bring back up squeezing upper chest'],
    mistakes: ['Bending elbows too much', 'Going too low and stressing shoulders']
  },
  {
    id: 'decline_db_fly', name: 'Decline Dumbbell Fly', category: 'Chest', icon: '🦋',
    description: 'Isolation targeting the lower pecs.',
    muscles: ['Lower Chest'], equipment: 'Dumbbell',
    steps: ['Set decline bench and lower dumbbells in wide arc', 'Focus on squeezing lower chest', 'Return to start'],
    mistakes: ['Letting dumbbells touch at top (loses tension)', 'Rushing the movement']
  },
  {
    id: 'high_to_low_cable_fly', name: 'High-to-Low Cable Fly', category: 'Chest', icon: '📉',
    description: 'Cable movement focused heavily on the lower pectorals.',
    muscles: ['Lower Chest'], equipment: 'Cable',
    steps: ['Set pulleys high', 'Step forward and lean slightly', 'Bring handles down and together below chest', 'Squeeze hard at the bottom'],
    mistakes: ['Bending arms into a press', 'Standing too straight']
  },
  {
    id: 'incline_pushup', name: 'Incline Push-Ups', category: 'Chest', icon: '🧱',
    description: 'A lighter push-up variant targeting the lower chest.',
    muscles: ['Lower Chest', 'Triceps'], equipment: 'Bodyweight',
    steps: ['Place hands on elevated surface', 'Keep body straight', 'Lower chest to edge', 'Push back up'],
    mistakes: ['Hips dropping', 'Flaring elbows']
  },
  {
    id: 'decline_pushup', name: 'Decline Push-Ups', category: 'Chest', icon: '🧱',
    description: 'Advanced push-up hitting the upper chest and shoulders.',
    muscles: ['Upper Chest', 'Front Delts'], equipment: 'Bodyweight',
    steps: ['Place feet on elevated surface', 'Hands on floor', 'Lower head toward floor', 'Push back up'],
    mistakes: ['Arching lower back', 'Not going low enough']
  },
  {
    id: 'single_arm_cable_fly', name: 'Cable Single Arm Fly', category: 'Chest', icon: '📉',
    description: 'Unilateral chest isolation allowing crossover past midline.',
    muscles: ['Inner Chest', 'Chest'], equipment: 'Cable',
    steps: ['Stand sideways to cable machine', 'Hold handle and step out for tension', 'Pull arm across body past center', 'Slowly return'],
    mistakes: ['Twisting torso', 'Using too much weight']
  },
  {
    id: 'resistance_band_fly', name: 'Resistance Band Fly', category: 'Chest', icon: '➰',
    description: 'Great chest activation using ascending tension from bands.',
    muscles: ['Chest'], equipment: 'None',
    steps: ['Anchor band behind you', 'Hold ends in hands', 'Bring hands together straight out in front', 'Squeeze chest against peak band tension'],
    mistakes: ['Band slipping', 'Not extending fully']
  },
  {
    id: 'isometric_chest_squeeze', name: 'Isometric Chest Squeeze', category: 'Chest', icon: '🧘',
    description: 'No-equipment static hold to recruit chest fibers.',
    muscles: ['Inner Chest'], equipment: 'Bodyweight',
    steps: ['Press palms together right in front of chest', 'Push as hard as you can for 10-20 seconds', 'Breathe normally', 'Release and repeat'],
    mistakes: ['Holding breath', 'Pushing hands too high or low']
  },
  {
    id: 'guillotine_press', name: 'Guillotine Press', category: 'Chest', icon: '💀',
    description: 'Advanced lift to target upper chest (Caution: Risk of dropping bar on neck).',
    muscles: ['Upper Chest'], equipment: 'Barbell',
    steps: ['Use wide grip on flat bench', 'Lower bar directly to neck line', 'Keep elbows flared wide', 'Press back up', 'Must use a spotter or safety pins'],
    mistakes: ['Using heavy weight', 'No safety measures']
  },
  {
    id: 'spoto_press', name: 'Spoto Press', category: 'Chest', icon: '⏸️',
    description: 'Bench press variation pausing 1 inch above the chest to build bottom-end power.',
    muscles: ['Chest'], equipment: 'Barbell',
    steps: ['Lower bar normally', 'Stop 1 inch above chest and hold 1-2 sec', 'Explode back up', 'Maintain full body tightness during pause'],
    mistakes: ['Resting bar on chest', 'Losing tightness during pause']
  },
  {
    id: 'floor_press', name: 'Floor Press', category: 'Chest', icon: '🧱',
    description: 'Pressing from the floor limits range of motion, reducing shoulder strain and building lockout strength.',
    muscles: ['Chest', 'Triceps'], equipment: 'Barbell',
    steps: ['Lie back on floor under bar', 'Unrack and lower until triceps touch floor', 'Pause briefly', 'Press to lockout'],
    mistakes: ['Slamming elbows into ground', 'Lifting hips']
  },
  {
    id: 'smith_machine_bench', name: 'Smith Machine Bench Press', category: 'Chest', icon: '🚜',
    description: 'Fixed bar path for safe pressing without a spotter.',
    muscles: ['Chest', 'Triceps'], equipment: 'Machine',
    steps: ['Position bench so bar hits mid-chest', 'Unrack bar', 'Lower to chest', 'Press back up'],
    mistakes: ['Misaligned bench', 'Locking elbows forcefully']
  },  // ── BACK ──
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
  {
    id: 't_bar_row', name: 'T-Bar Row', category: 'Back', icon: '🚣',
    description: 'Heavy compound row focusing on mid-back thickness and lats.',
    muscles: ['Mid Back', 'Lats'], equipment: 'Barbell',
    steps: ['Straddle the bar and hinge at hips', 'Grip the handles (V-bar or provided handles)', 'Keep back flat and core tight', 'Pull weight toward upper abdomen', 'Squeeze shoulder blades together at the top'],
    mistakes: ['Standing too upright', 'Jerking the weight up using lower back', 'Not reaching a full stretch at the bottom']
  },
  {
    id: 'seated_cable_row', name: 'Seated Cable Row', category: 'Back', icon: '🚣',
    description: 'Horizontal cable pull for constant tension on the rhomboids and lats.',
    muscles: ['Mid Back', 'Lats', 'Rhomboids'], equipment: 'Cable',
    steps: ['Sit on machine with feet on platforms, knees slightly bent', 'Lean forward to grab handle, then sit upright', 'Pull handle to stomach while keeping torso stationary', 'Squeeze shoulder blades together', 'Return slowly until arms are fully extended'],
    mistakes: ['Rocking torso excessively forward and backward', 'Pulling with biceps instead of back', 'Shrugging shoulders during the pull']
  },
  {
    id: 'pendlay_row', name: 'Pendlay Row', category: 'Back', icon: '🏋️‍♂️',
    description: 'Explosive barbell row starting from a dead stop on the floor each rep.',
    muscles: ['Mid Back', 'Lats', 'Lower Back'], equipment: 'Barbell',
    steps: ['Stand over bar, hinge until torso is parallel to floor', 'Grip bar slightly wider than shoulder width', 'Explosively pull bar to lower chest/upper stomach', 'Return bar completely to the floor', 'Pause briefly before the next rep'],
    mistakes: ['Raising the torso during the pull', 'Bouncing the bar off the floor', 'Not maintaining a flat lower back']
  },
  {
    id: 'underhand_lat_pulldown', name: 'Underhand Lat Pulldown', category: 'Back', icon: '📐',
    description: 'Reverse grip pulldown focusing more on the lower lats and biceps.',
    muscles: ['Lower Lats', 'Biceps'], equipment: 'Machine',
    steps: ['Sit at machine, grip bar palms facing toward you (shoulder width)', 'Keep chest up and lean back slightly', 'Pull bar down to upper chest', 'Squeeze lats at the bottom', 'Slowly extend arms back up'],
    mistakes: ['Pulling the bar too low (past chest)', 'Overarching the lower back excessively', 'Letting the weight yank arms up']
  },
  {
    id: 'straight_arm_pulldown', name: 'Straight Arm Pulldown', category: 'Back', icon: '📉',
    description: 'Isolation exercise targeting the lats without engaging the biceps.',
    muscles: ['Lats'], equipment: 'Cable',
    steps: ['Stand facing cable machine, attach straight bar high', 'Grip bar slightly wider than shoulder-width, arms straight', 'Hinge slightly at hips, keep core tight', 'Push the bar down to your thighs using only lats', 'Slowly return bar to eye level'],
    mistakes: ['Bending elbows (turns it into a tricep pushdown)', 'Using momentum to swing the weight down', 'Standing completely upright']
  },
  {
    id: 'chest_supported_row', name: 'Chest-Supported Dumbbell Row', category: 'Back', icon: '🛶',
    description: 'Isolates the back by removing lower back from the equation.',
    muscles: ['Mid Back', 'Lats'], equipment: 'Dumbbell',
    steps: ['Set bench to 30-45 degree incline', 'Lie face down on bench holding dumbbells', 'Pull dumbbells up by driving elbows toward ceiling', 'Squeeze shoulder blades firmly at the top', 'Lower weights with control'],
    mistakes: ['Lifting chest off the bench to use momentum', 'Pulling hands to armpits instead of hips']
  },
  {
    id: 'chin_up', name: 'Chin-Ups', category: 'Back', icon: '🦇',
    description: 'Vertical pull shifting more focus onto the biceps and lower lats.',
    muscles: ['Lats', 'Biceps'], equipment: 'Bodyweight',
    steps: ['Grab bar with an underhand grip (palms facing you), shoulder-width', 'Hang freely with straight arms', 'Pull yourself up until chin clears the bar', 'Squeeze lats and biceps', 'Lower under control to a dead hang'],
    mistakes: ['Kipping or swinging legs for momentum', 'Not coming all the way down (half reps)', 'Craning neck to reach the bar']
  },
  {
    id: 'inverted_row', name: 'Inverted Row', category: 'Back', icon: '🧗',
    description: 'Bodyweight horizontal pull excellent for building mid-back strength.',
    muscles: ['Mid Back', 'Lats'], equipment: 'Bodyweight',
    steps: ['Set barbell in a rack at waist height', 'Lie underneath and grip bar wider than shoulders', 'Keep body in a perfectly straight line with heels on floor', 'Pull chest forcefully to the bar', 'Lower slowly until arms straight'],
    mistakes: ['Hips sagging toward the floor', 'Craning neck forward to meet the bar', 'Not touching the chest to the bar']
  },
  {
    id: 'machine_reverse_fly', name: 'Reverse Pec Deck (Butterfly)', category: 'Back', icon: '🦅',
    description: 'Machine isolation to target the rear deltoids and rhomboids.',
    muscles: ['Rear Delts', 'Rhomboids'], equipment: 'Machine',
    steps: ['Adjust machine so handles are in front of you', 'Sit facing the pad, grip handles horizontally', 'Pull arms backward in an arc until parallel with shoulders', 'Squeeze rear delts hard', 'Return handles with control'],
    mistakes: ['Using momentum to yank the handles back', 'Arching back off the pad', 'Going too far back and straining shoulders']
  },
  {
    id: 'rack_pulls', name: 'Rack Pulls', category: 'Back', icon: '⚡',
    description: 'Heavy partial deadlift variant targeting upper back and traps.',
    muscles: ['Upper Back', 'Traps', 'Lower Back'], equipment: 'Barbell',
    steps: ['Set safety pins in rack just above or below knees', 'Stand with bar close to body, grip firmly', 'Brace core and drive hips forward to lift bar', 'Lock out completely, squeezing glutes and back', 'Lower bar directly back to pins'],
    mistakes: ['Rounding the upper/lower back', 'Leaning back too far at lockout', 'Bouncing the bar off the pins between reps']
  },
  {
    id: 'v_bar_pulldown', name: 'Close-Grip V-Bar Pulldown', category: 'Back', icon: '📐',
    description: 'Vertical pull variant focusing on lat lengthening and center back thickness.',
    muscles: ['Lats', 'Mid Back'], equipment: 'Machine',
    steps: ['Attach V-bar to pulldown cable, sit down', 'Lean back slightly and keep chest high', 'Pull V-bar down to upper chest/sternum', 'Squeeze back hard at the bottom', 'Slowly let elbows stretch up fully'],
    mistakes: ['Rocking forcefully backward to move the weight', 'Yanking the handle down with biceps', 'Not stretching fully at the top']
  },
  {
    id: 'meadows_row', name: 'Meadows Row', category: 'Back', icon: '🛶',
    description: 'Unique unilateral barbell row that challenges the lats with a great stretch.',
    muscles: ['Lats', 'Upper Back'], equipment: 'Barbell',
    steps: ['Place one end of barbell in a landmine or corner', 'Stand perpendicular to bar, hinge at hips', 'Grip the thick end of the bar with outside hand', 'Drive elbow up and slightly out until hand reaches hip level', 'Lower with control for a deep stretch'],
    mistakes: ['Rotating the torso excessively', 'Standing too upright', 'Using straps when grip isn\'t a limiting factor']
  },
  {
    id: 'good_mornings', name: 'Good Mornings', category: 'Back', icon: '🌅',
    description: 'Barbell hinge highly strengthening the erector spinae (lower back) and hamstrings.',
    muscles: ['Lower Back', 'Hamstrings', 'Glutes'], equipment: 'Barbell',
    steps: ['Place barbell across shoulders like a squat', 'Keep legs slightly bent or straight, brace core', 'Hinge hips backward while keeping back perfectly flat', 'Lower torso until parallel with floor (or flexibility allows)', 'Squeeze glutes and hamstrings to return upright'],
    mistakes: ['Rounding the lower back', 'Turning the movement into a squat by bending knees', 'Going too heavy and failing to maintain rigid spine']
  },
  {
    id: 'db_pullover', name: 'Dumbbell Pullover', category: 'Back', icon: '🏋️',
    description: 'Classic movement that deeply stretches and builds the lats and chest.',
    muscles: ['Lats', 'Chest'], equipment: 'Dumbbell',
    steps: ['Lie perpendicular across a flat bench, upper back supported', 'Hold a single dumbbell with both hands straight over chest', 'Lower dumbbell backward over head while keeping arms mostly straight', 'Feel deep stretch in lats/ribcage', 'Pull dumbbell back to starting position over chest'],
    mistakes: ['Bending elbows drastically to turn it into a tricep extension', 'Hips lifting too high, removing the stretch leverage', 'Using too heavy a weight and risking shoulder injury']
  },
  {
    id: 'assisted_pull_up', name: 'Assisted Pull-Up Machine', category: 'Back', icon: '🤖',
    description: 'Machine-based pull-up variant using a counterweight for easier progression.',
    muscles: ['Lats', 'Biceps'], equipment: 'Machine',
    steps: ['Select counterweight (heavier is easier)', 'Kneel or stand on the pad and grip the handles', 'Pull yourself up until chin is over the bar', 'Lower down slowly'],
    mistakes: ['Using momentum', 'Not getting full extension at the bottom']
  },
  {
    id: 'back_extension', name: 'Back Extension', category: 'Back', icon: '🪑',
    description: 'Isolates the lower back erectors, glutes, and hamstrings safely.',
    muscles: ['Lower Back', 'Glutes'], equipment: 'Machine',
    steps: ['Lock legs into the extension machine', 'Cross arms over chest or hold weight', 'Lower torso until you feel a deep stretch in hamstrings', 'Raise torso back up until body is straight'],
    mistakes: ['Hyperextending the lower back at the top', 'Going too fast and using momentum']
  },
  {
    id: 'face_pull', name: 'Face Pulls', category: 'Back', icon: '📉',
    description: 'Essential for shoulder health, rear delts, and upper back posture.',
    muscles: ['Rear Delts', 'Traps', 'Rhomboids'], equipment: 'Cable',
    steps: ['Set cable at eye level with a rope attachment', 'Pull rope toward your face, letting hands split apart', 'Squeeze shoulders back and externally rotate elbows up', 'Return slowly with control'],
    mistakes: ['Pulling too heavy and using momentum', 'Not pulling the rope past the ears']
  },
  {
    id: 'scapular_pull_up', name: 'Scapular Pull-Ups', category: 'Back', icon: '🦇',
    description: 'A pre-hab movement relying solely on shoulder blade depression.',
    muscles: ['Lower Traps', 'Rhomboids'], equipment: 'Bodyweight',
    steps: ['Hang from a pull-up bar with a dead hang', 'Keeping arms completely straight, pull shoulder blades down and back', 'Hold the top contraction for 1 second', 'Return to a dead hang'],
    mistakes: ['Bending the elbows to lift the body', 'Swinging']
  },
  {
    id: 'superman_hold', name: 'Superman Hold', category: 'Back', icon: '🦸',
    description: 'No-equipment lower back and glute strengthener.',
    muscles: ['Lower Back', 'Glutes'], equipment: 'None',
    steps: ['Lie face down on the floor with arms extended forward', 'Lift your arms, chest, and legs off the floor simultaneously', 'Squeeze lower back and hold the position', 'Lower slowly back to the ground'],
    mistakes: ['Jerking up suddenly', 'Looking straight up and straining the neck (look down/forward)']
  },
  {
    id: 'resistance_band_row', name: 'Resistance Band Row', category: 'Back', icon: '➰',
    description: 'Convenient back row variant for home or travel workouts.',
    muscles: ['Mid Back', 'Lats'], equipment: 'None',
    steps: ['Anchor the band or wrap around feet while seated', 'Grip band ends with both hands', 'Pull elbows straight back behind body', 'Squeeze shoulder blades together', 'Slowly extend arms'],
    mistakes: ['Letting the band snap forwards suddenly', 'Shrugging shoulders instead of pulling back']
  },
  {
    id: 'front_squat_bb', name: 'Front Squat', category: 'Legs', icon: '🦵',
    description: 'Quadricep-dominant squat variation demanding high core strength and thoracic mobility.',
    muscles: ['Quads', 'Core'], equipment: 'Barbell',
    steps: ['Rest barbell across front delts and collarbone', 'Keep elbows high, pointing forward', 'Squat down keeping torso completely upright', 'Drive back up through mid-foot'],
    mistakes: ['Dropping elbows, causing bar to roll forward', 'Leaning torso forward instead of sitting straight down']
  },
  {
    id: 'leg_extension', name: 'Leg Extension', category: 'Legs', icon: '🦵',
    description: 'Machine isolation to carve and strengthen the quadriceps.',
    muscles: ['Quads'], equipment: 'Machine',
    steps: ['Sit on machine, back flat against pad', 'Position shin pad just above ankles', 'Extend legs fully to straight position', 'Squeeze quads hard at the top', 'Control weight back down'],
    mistakes: ['Using momentum to kick the weight up', 'Not extending fully']
  },
  {
    id: 'lying_leg_curl', name: 'Lying Leg Curl', category: 'Legs', icon: '🍗',
    description: 'Hamstring isolation utilizing constant machine tension.',
    muscles: ['Hamstrings'], equipment: 'Machine',
    steps: ['Lie face down, positioning pad just above heels', 'Keep hips pressed firmly into bench', 'Curl legs up attempting to touch pad to glutes', 'Squeeze hamstrings', 'Lower weight slowly'],
    mistakes: ['Lifting hips off the pad to cheat the weight', 'Rushing the eccentric descent']
  },
  {
    id: 'seated_leg_curl', name: 'Seated Leg Curl', category: 'Legs', icon: '🍗',
    description: 'Seated hamstring isolation allowing for deep stretch from the hip angle.',
    muscles: ['Hamstrings'], equipment: 'Machine',
    steps: ['Sit on machine with pad against lower leg', 'Lower the thigh restraint tight against quads', 'Curl legs down and back as far as possible', 'Flex hamstrings hard at bottom'],
    mistakes: ['Not locking thigh pad tightly', 'Short range of motion']
  },
  {
    id: 'standing_calf_raise', name: 'Standing Calf Raise', category: 'Legs', icon: '🦵',
    description: 'Heavy isolation for the gastrocnemius calf muscle.',
    muscles: ['Calves'], equipment: 'Machine',
    steps: ['Stand on platform with shoulders under pads', 'Lower heels down for a deep stretch', 'Press up onto toes as high as possible', 'Hold the contraction briefly', 'Lower slowly'],
    mistakes: ['Bouncing at the bottom', 'Bending knees to use quads']
  },
  {
    id: 'seated_calf_raise', name: 'Seated Calf Raise', category: 'Legs', icon: '🦵',
    description: 'Targets the underlying soleus calf muscle due to the bent knee angle.',
    muscles: ['Calves'], equipment: 'Machine',
    steps: ['Sit with pads resting over lower thighs', 'Drop heels completely below platform', 'Press up onto toes', 'Contract hard at top'],
    mistakes: ['Not stretching fully at bottom', 'Bouncing reps quickly']
  },
  {
    id: 'hack_squat', name: 'Hack Squat', category: 'Legs', icon: '🚜',
    description: 'Machine-based squat variant keeping the torso rigid to isolate quads safely.',
    muscles: ['Quads', 'Glutes'], equipment: 'Machine',
    steps: ['Position back onto pad, shoulders under supports', 'Place feet mid-platform, shoulder width', 'Lower machine until knees are at 90 degrees or below', 'Press through platform to stand'],
    mistakes: ['Placing feet too high (turns it into glute press)', 'Locking knees violently at the top']
  },
  {
    id: 'goblet_squat', name: 'Goblet Squat', category: 'Legs', icon: '🏺',
    description: 'Excellent functional squat for beginners focusing on depth and upward posture.',
    muscles: ['Quads', 'Glutes', 'Core'], equipment: 'Dumbbell',
    steps: ['Hold dumbbell vertically against chest', 'Squat down deeply until elbows touch inside of knees', 'Keep chest tall', 'Stand back up'],
    mistakes: ['Letting the dumbbell pull you forward', 'Knees caving inward']
  },
  {
    id: 'sumo_squat', name: 'Sumo Squat', category: 'Legs', icon: '🦵',
    description: 'Wide-stance squat emphasizing the adductors (inner thighs) and glutes.',
    muscles: ['Glutes', 'Adductors', 'Quads'], equipment: 'Dumbbell',
    steps: ['Take a very wide stance, toes pointed outward 45 degrees', 'Hold a dumbbell hanging between legs', 'Squat straight down, keeping knees tracking over toes', 'Squeeze glutes to stand'],
    mistakes: ['Knees falling inward', 'Rounding lower back at the bottom']
  },
  {
    id: 'hip_abductor', name: 'Hip Abductor Machine', category: 'Legs', icon: '🪑',
    description: 'Isolates the outer glutes and abductor muscles.',
    muscles: ['Glutes', 'Abductors'], equipment: 'Machine',
    steps: ['Sit on machine, pads against outside of knees', 'Press legs outward against pad resistance', 'Hold contraction briefly', 'Slowly bring legs back together'],
    mistakes: ['Using momentum', 'Lifting hips off the seat']
  },
  {
    id: 'hip_adductor', name: 'Hip Adductor Machine', category: 'Legs', icon: '🪑',
    description: 'Isolates the inner thigh adductor muscles safely.',
    muscles: ['Adductors'], equipment: 'Machine',
    steps: ['Sit on machine, pads against inside of knees', 'Squeeze thighs completely together', 'Hold peak contraction', 'Open legs slowly under control'],
    mistakes: ['Releasing weight too quickly causing muscle strain', 'Using full stack and sacrificing form']
  },
  {
    id: 'reverse_lunges_db', name: 'Reverse Lunges', category: 'Legs', icon: '🚶',
    description: 'A safer lunge variant for the knees, deeply stretching the glutes.',
    muscles: ['Glutes', 'Quads'], equipment: 'Dumbbell',
    steps: ['Hold dumbbells, stand tall', 'Take a large step backward with one foot', 'Lower hips until both knees are bent 90 degrees', 'Push off front foot to return to standing'],
    mistakes: ['Stepping straight back like walking a tightrope (lose balance)', 'Not stepping far enough back']
  },
  {
    id: 'glute_kickback_cable', name: 'Cable Glute Kickbacks', category: 'Legs', icon: '🍑',
    description: 'Isolates the gluteus maximus without quadricep intervention.',
    muscles: ['Glutes'], equipment: 'Cable',
    steps: ['Attach ankle cuff to low pulley', 'Face machine, hinge forward slightly bracing on pole', 'Kick leg straight back, squeezing glute', 'Do not arch lower back', 'Return foot slowly to start'],
    mistakes: ['Arching back heavily to kick higher (targets lower back)', 'Swinging leg using momentum']
  },
  {
    id: 'glute_ham_raise', name: 'Glute Ham Raise (GHR)', category: 'Legs', icon: '⚙️',
    description: 'Intense hamstring curling relying on full bodyweight leverage.',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'], equipment: 'Machine',
    steps: ['Lock ankles into GHD machine, knees resting on pad', 'Start with torso upright', 'Lower torso forward until parallel to floor', 'Squeeze hamstrings and glutes to pull body back up'],
    mistakes: ['Bending at hips instead of knees', 'Using lower back completely to lift']
  },
  // ── SHOULDERS ──
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
  {
    id: 'push_press', name: 'Push Press', category: 'Shoulders', icon: '🚀',
    description: 'Explosive overhead press using leg drive to move heavier weight.',
    muscles: ['Front Delts', 'Triceps', 'Core'], equipment: 'Barbell',
    steps: ['Hold barbell at upper chest', 'Dip down slightly by bending knees', 'Explosively drive upward with legs while pressing the bar overhead', 'Lockout arms and lower back to chest under control'],
    mistakes: ['Dipping too low into a full squat', 'Pressing before the legs finish driving']
  },
  {
    id: 'arnold_press', name: 'Arnold Press', category: 'Shoulders', icon: '🤖',
    description: 'Rotational dumbbell press targeting all three heads of the deltoid.',
    muscles: ['Front Delts', 'Side Delts'], equipment: 'Dumbbell',
    steps: ['Sit on a bench with back support', 'Hold dumbbells in front of face, palms facing you', 'Press weights up while rotating your hands outward', 'Finish with palms facing forward at lockout', 'Reverse the motion to the start'],
    mistakes: ['Not rotating smoothly throughout the movement', 'Using momentum to swing the weights up']
  },
  {
    id: 'front_raise_db', name: 'Dumbbell Front Raise', category: 'Shoulders', icon: '🤲',
    description: 'Isolation exercise targeting exclusively the anterior (front) deltoids.',
    muscles: ['Front Delts'], equipment: 'Dumbbell',
    steps: ['Hold dumbbells in front of thighs, palms facing backward', 'Raise arms straight up in front of you to eye level', 'Keep a slight bend in the elbows', 'Lower slowly to the starting position'],
    mistakes: ['Swinging the body backward to lift the weight', 'Raising the dumbbells completely over the head']
  },
  {
    id: 'front_raise_cable', name: 'Cable Front Raise', category: 'Shoulders', icon: '📉',
    description: 'Constant tension isolation for the front deltoids using a cable machine.',
    muscles: ['Front Delts'], equipment: 'Cable',
    steps: ['Use a low pulley with a straight bar or rope', 'Stand facing away from the machine, cable passing between legs', 'Raise the attachment forward to shoulder height', 'Control the descent'],
    mistakes: ['Leaning forward against the cable pull', 'Bending elbows into a curl']
  },
  {
    id: 'lateral_raise_cable', name: 'Cable Lateral Raise', category: 'Shoulders', icon: '📉',
    description: 'Excellent side delt isolation providing continuous tension at the bottom of the movement.',
    muscles: ['Side Delts'], equipment: 'Cable',
    steps: ['Set pulley to the lowest position', 'Stand sideways to the machine, grabbing handle with outside hand', 'Raise arm out to the side until parallel with floor', 'Lower slowly, maintaining tension at the bottom'],
    mistakes: ['Standing too far from the machine', 'Pulling the cable in front of the body instead of directly to the side']
  },
  {
    id: 'upright_row_bb', name: 'Barbell Upright Row', category: 'Shoulders', icon: '🏋️',
    description: 'Compound vertical pull targeting the traps and side deltoids.',
    muscles: ['Side Delts', 'Traps'], equipment: 'Barbell',
    steps: ['Hold barbell with an overhand grip resting against thighs', 'Pull the bar straight up the body toward the chin', 'Lead the movement by raising your elbows high', 'Pause at the top and lower slowly'],
    mistakes: ['Using a grip that is too close (strains wrists/shoulders)', 'Pulling the bar away from the body']
  },
  {
    id: 'rear_delt_fly_db', name: 'Bent Over Rear Delt Fly', category: 'Shoulders', icon: '🦇',
    description: 'Isolates the posterior deltoids, essential for rounded 3D shoulders.',
    muscles: ['Rear Delts', 'Rhomboids'], equipment: 'Dumbbell',
    steps: ['Hinge at the hips until torso is nearly parallel to the floor', 'Hold dumbbells with arms hanging straight down', 'Raise arms out to the sides with a slight elbow bend', 'Squeeze rear delts at the top and return to start'],
    mistakes: ['Rowing the weight up instead of flying it out', 'Standing up during the rep']
  },
  {
    id: 'seated_bb_press', name: 'Seated Barbell Press', category: 'Shoulders', icon: '🪑',
    description: 'Strict overhead press variant eliminating leg drive.',
    muscles: ['Front Delts', 'Triceps'], equipment: 'Barbell',
    steps: ['Adjust a bench with full back support in a rack', 'Unrack the barbell at upper chest level', 'Press the weight straight overhead to lockout', 'Lower the bar back to the upper chest under control'],
    mistakes: ['Arching the back excessively off the pad', 'Not lowering the bar all the way down']
  },
  {
    id: 'landmine_press', name: 'Landmine Press', category: 'Shoulders', icon: '🦯',
    description: 'Shoulder-friendly unilateral overhead press variant.',
    muscles: ['Front Delts', 'Upper Chest', 'Triceps'], equipment: 'Barbell',
    steps: ['Place one end of a barbell in a corner or landmine attachment', 'Hold the thick end with one hand at shoulder level', 'Press the bar up and slightly forward', 'Lower back to the shoulder'],
    mistakes: ['Pressing across the body', 'Over-rotating the torso']
  },
  {
    id: 'z_press', name: 'Z Press', category: 'Shoulders', icon: '🧘',
    description: 'Advanced seated press on the floor requiring intense core stabilization.',
    muscles: ['Front Delts', 'Core'], equipment: 'Barbell',
    steps: ['Sit flat on the floor with legs straight out in front', 'Hold a barbell or dumbbells at shoulder height', 'Press the weight overhead while keeping the torso perfectly upright', 'Slowly lower back down'],
    mistakes: ['Leaning back to press', 'Bending the knees']
  },
  {
    id: 'shrugs_db', name: 'Dumbbell Shrugs', category: 'Shoulders', icon: '🤷',
    description: 'Direct isolation for the upper trapezius muscles.',
    muscles: ['Traps'], equipment: 'Dumbbell',
    steps: ['Stand tall holding dumbbells at your sides', 'Elevate shoulders as high as possible straight toward ears', 'Hold the squeeze for 1-2 seconds', 'Lower shoulders back down fully'],
    mistakes: ['Rolling the shoulders in a circular motion', 'Using momentum by bending knees']
  },
  {
    id: 'shrugs_bb', name: 'Barbell Shrugs', category: 'Shoulders', icon: '🤷‍♂️',
    description: 'Heavy overload variation for the upper traps.',
    muscles: ['Traps'], equipment: 'Barbell',
    steps: ['Hold a barbell in front of thighs with an overhand grip', 'Shrug shoulders straight up toward the ears', 'Squeeze hard at the peak', 'Control the weight back down'],
    mistakes: ['Using arms to lift the weight via a subtle upright row', 'Craning neck forward to cheat the distance']
  },
  {
    id: 'machine_shoulder_press', name: 'Machine Shoulder Press', category: 'Shoulders', icon: '🚜',
    description: 'Safe, guided path pressing to push deltoids to complete failure.',
    muscles: ['Front Delts', 'Side Delts', 'Triceps'], equipment: 'Machine',
    steps: ['Adjust seat so handles are at shoulder height', 'Grip handles and press straight up', 'Do not fully lock out elbows to keep tension on delts', 'Lower slowly until feeling a stretch'],
    mistakes: ['Seat too low, causing extreme stress on rotator cuff', 'Slamming the weight plates down on every rep']
  },
  {
    id: 'y_raise', name: 'Y-Raise (Incline Bench)', category: 'Shoulders', icon: 'Y',
    description: 'Excellent postural exercise strengthening the lower traps and side delts.',
    muscles: ['Side Delts', 'Lower Traps'], equipment: 'Dumbbell',
    steps: ['Lie chest-down on a 45-degree incline bench', 'Hold light dumbbells straight down', 'Raise arms up and out in a Y-shape with thumbs pointed up', 'Hold briefly at the top', 'Lower under control'],
    mistakes: ['Using heavy weights and breaking form', 'Throwing the arms up using momentum']
  },
  {
    id: 'machine_lateral_raise', name: 'Machine Lateral Raise', category: 'Shoulders', icon: '🚜',
    description: 'Guided side delt isolation allowing for maximum mechanical tension.',
    muscles: ['Side Delts'], equipment: 'Machine',
    steps: ['Adjust seat height so shoulders align with machine pivot point', 'Rest arms against pads', 'Raise arms out to the sides in a controlled arc', 'Squeeze side delts at the top — hold briefly', 'Lower weight plates slowly without letting them touch'],
    mistakes: ['Shrugging with traps to lift the weight', 'Using momentum to swing the pads up']
  },
  {
    id: 'leaning_lateral_raise', name: 'Leaning lateral Raise', category: 'Shoulders', icon: '📐',
    description: 'Unilateral side delt variant increasing tension at the top of the movement.',
    muscles: ['Side Delts'], equipment: 'Dumbbell',
    steps: ['Hold a stationary pole or rack and lean your body away at a 30-degree angle', 'Hold dumbbell in the outside hand', 'Raise the dumbbell out to the side until parallel with floor', 'Lower under full control'],
    mistakes: ['Leaning too far or not enough', 'Swinging the dumbbell to generate momentum']
  },
  {
    id: 'reverse_pec_deck', name: 'Reverse Pec Deck (Rear Delt Fly Machine)', category: 'Shoulders', icon: '🪑',
    description: 'Machine isolation for the posterior deltoids and rhomboids.',
    muscles: ['Rear Delts', 'Upper Back'], equipment: 'Machine',
    steps: ['Sit facing the machine, chest against the pad', 'Grip handles with palms facing inward or down', 'Pull handles back in a wide arc until arms are in line with shoulders', 'Squeeze rear delts hard', 'Return to start position slowly'],
    mistakes: ['Shrugging shoulders up during the pull', 'Bending elbows too much — turns into a row']
  },
  {
    id: 'face_pull_cable', name: 'Face Pull', category: 'Shoulders', icon: '🎭',
    description: 'Essential exercise for rear delt development and shoulder health.',
    muscles: ['Rear Delts', 'Traps', 'Rotator Cuff'], equipment: 'Cable',
    steps: ['Set cable pulley to eye level — attach rope', 'Grip rope with thumbs facing backward', 'Pull rope toward your forehead, pulling the ends apart', 'Retract shoulder blades and rotate hands outward at the end', 'Control the return'],
    mistakes: ['Using too much weight and leaning back', 'Pulling down toward chest instead of toward face']
  },
  {
    id: 'cable_rear_delt_fly', name: 'Cable Rear Delt Fly', category: 'Shoulders', icon: '📉',
    description: 'Constant tension isolation for the posterior deltoids.',
    muscles: ['Rear Delts'], equipment: 'Cable',
    steps: ['Set pulleys at or slightly above shoulder height', 'Cross arms and grab opposite handles (no attachment needed)', 'Pull arms out and back in a wide arc', 'Keep elbows high and slightly bent', 'Slowly bring hands back together'],
    mistakes: ['Dropping elbows below shoulder level', 'Allowing the torso to rock forward and back']
  },
  {
    id: 'farmers_carry', name: 'Farmer’s Carry', category: 'Shoulders', icon: '🚜',
    description: 'Functional strength builder for grip, traps, and core stability.',
    muscles: ['Traps', 'Forearms', 'Core'], equipment: 'Dumbbell',
    steps: ['Deadlift two heavy dumbbells or kettlebells to your sides', 'Stand tall, shoulders back and down', 'Walk forward with small, controlled steps', 'Maintain a rigid core and upright posture throughout', 'Put weights down under control after set distance/time'],
    mistakes: ['Slumping shoulders forward', 'Taking steps that are too large — losing stability']
  },
  {
    id: 'external_rotation_cable', name: 'External Rotation (Cable/Band)', category: 'Shoulders', icon: '🔄',
    description: 'Prehab isolation focusing on the infraspinatus and teres minor (rotator cuff).',
    muscles: ['Rotator Cuff'], equipment: 'Cable',
    steps: ['Set pulley to elbow height', 'Stand sideways to machine, elbow tucked into side at 90 degrees', 'Grip handle with the outside hand', 'Rotate forearm outward away from the machine', 'Maintain the 90-degree elbow angle throughout'],
    mistakes: ['Allowing the elbow to drift away from the torso', 'Using too much weight — lose the isolation']
  },
  {
    id: 'band_pull_aparts', name: 'Band Pull-Aparts', category: 'Shoulders', icon: '➰',
    description: 'High-rep postural exercise targeting the rear delts and mid-traps.',
    muscles: ['Rear Delts', 'Traps'], equipment: 'None',
    steps: ['Hold a resistance band with arms straight in front at shoulder height', 'Pull the band apart until it touches your chest', 'Squeeze shoulder blades together', 'Return slowly to the start'],
    mistakes: ['Shrugging shoulders up', 'Bending elbows during the pull']
  },
  {
    id: 'internal_rotation_cable', name: 'Internal Rotation (Cable/Band)', category: 'Shoulders', icon: '🔄',
    description: 'Isolates the subscapularis rotator cuff muscle for balanced shoulder health.',
    muscles: ['Rotator Cuff'], equipment: 'Cable',
    steps: ['Set pulley to elbow height', 'Stand sideways to machine, elbow tucked into side at 90 degrees', 'Grip handle with the inside hand', 'Rotate forearm inward across your body', 'Slowly return to start'],
    mistakes: ['Using body rotation to help the movement', 'Wrist flexion/extension instead of shoulder rotation']
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
  {
    id: 'ez_bar_curl', name: 'EZ-Bar Curl', category: 'Arms', icon: '〽️',
    description: 'A wrist-friendly barbell curl using the angled EZ bar for reduced wrist strain.',
    muscles: ['Biceps', 'Brachialis'], equipment: 'Barbell',
    steps: ['Stand — grip EZ bar at the angled outer grip (palms slightly inward)', 'Pin elbows to sides', 'Curl bar up in a smooth arc — squeeze bicep at top', 'Hold peak contraction for 1 second', 'Slowly lower until arms are fully extended'],
    mistakes: ['Elbows drifting forward and up to generate momentum', 'Not reaching full extension at the bottom', 'Using the wrist to curl rather than the elbow']
  },
  {
    id: 'tricep_pushdown_bar', name: 'Tricep Pushdown (Bar)', category: 'Arms', icon: '📊',
    description: 'Classic straight or V-bar cable pushdown for overall tricep mass and definition.',
    muscles: ['Triceps'], equipment: 'Cable',
    steps: ['Set cable to high pulley — attach a straight bar or V-bar', 'Stand close, grip bar overhand at chest height', 'Pin elbows firmly to sides', 'Push bar down to full lockout — squeeze triceps', 'Slowly return bar back to starting position'],
    mistakes: ['Elbows drifting away from body', 'Leaning the entire upper body forward to push', 'Incomplete lockout at the bottom — short-changing the squeeze']
  },
  {
    id: 'reverse_grip_pushdown', name: 'Reverse Grip Pushdown', category: 'Arms', icon: '🔃',
    description: 'Underhand-grip pushdown that preferentially targets the medial (inner) tricep head.',
    muscles: ['Triceps'], equipment: 'Cable',
    steps: ['Set cable to high pulley — attach a straight bar', 'Grip bar with palms facing UP (underhand/supinated grip)', 'Pin elbows against sides — do not let them move', 'Push the bar down to full extension', 'Slowly return and repeat'],
    mistakes: ['Wrists breaking downward — maintain a neutral wrist throughout', 'Elbows flaring out — loses the medial head emphasis', 'Going too heavy — form collapses immediately']
  },
  {
    id: 'cable_kickback_arm', name: 'Cable Kickbacks (Tricep)', category: 'Arms', icon: '🦵',
    description: 'Cable variation of the tricep kickback providing constant tension throughout the full range.',
    muscles: ['Triceps'], equipment: 'Cable',
    steps: ['Set low pulley — attach a single handle', 'Hinge body forward at the hips until nearly parallel', 'Lift elbow up behind the body until upper arm is parallel to floor', 'Extend arm backward — fully lock out the tricep', 'Slowly allow forearm to return to 90 degrees'],
    mistakes: ['Upper arm dropping during the push-back — loses isolation', 'Using momentum to swing the arm', 'Standing too upright — needs forward hinge to work correctly']
  },
  {
    id: 'ez_bar_preacher_curl', name: 'EZ Bar Preacher Curl', category: 'Arms', icon: '📖',
    description: 'Strict bicep isolation using an angled bar on a preacher bench — eliminates cheating entirely.',
    muscles: ['Biceps'], equipment: 'Barbell',
    steps: ['Sit at preacher bench — upper arms flat on pad', 'Hold EZ bar at shoulder width', 'Lower bar in a slow arc until arms are almost fully extended', 'Curl bar back up — stop just short of vertical to keep tension', 'Squeeze biceps hard at the top'],
    mistakes: ['Leaning over the pad to assist the lift', 'Letting the bar drop too fast — lose eccentric benefit', 'Full lockout at bottom — creates joint impingement risk']
  },
  {
    id: 'incline_db_curl', name: 'Incline Dumbbell Curl', category: 'Arms', icon: '📐',
    description: 'Sets the bicep on maximum stretch from the inclined position for full long-head development.',
    muscles: ['Biceps'], equipment: 'Dumbbell',
    steps: ['Set an incline bench to 45–60 degrees', 'Sit back — let arms hang straight down', 'Curl dumbbells up while keeping upper arms vertical', 'Fully supinate wrist as you lift', 'Lower slowly back to a full hang'],
    mistakes: ['Bench angle too steep — loses the stretch advantage', 'Swinging body to assist the curl', 'Not supinating wrist at the top']
  },
  {
    id: 'concentration_curl', name: 'Concentration Curl', category: 'Arms', icon: '🔬',
    description: 'Peak contraction isolation curl locking the elbow against the inner thigh.',
    muscles: ['Biceps'], equipment: 'Dumbbell',
    steps: ['Sit on bench, lean forward slightly', 'Brace upper arm on inner thigh just above knee', 'Curl dumbbell up turning palm outward at top', 'Squeeze bicep peak hard', 'Lower completely to full extension'],
    mistakes: ['Moving the upper arm off the thigh to cheat', 'Not fully extending at the bottom', 'Going too heavy — the strict position amplifies intensity']
  },
  {
    id: 'cable_bicep_curl', name: 'Cable Bicep Curl', category: 'Arms', icon: '📉',
    description: 'Constant cable tension curve provides a unique stimulus versus free weights.',
    muscles: ['Biceps'], equipment: 'Cable',
    steps: ['Set low pulley with a straight bar or EZ attachment', 'Stand close, grip bar underhand shoulder-width', 'Pin elbows to sides throughout', 'Curl bar up toward chin — squeeze at top', 'Lower slowly under full cable tension'],
    mistakes: ['Stepping too far from machine — cable pulls at wrong angle', 'Elbows drifting to generate momentum', 'Jerking reps instead of smooth curls']
  },
  {
    id: 'spider_curl', name: 'Spider Curl', category: 'Arms', icon: '🕷️',
    description: 'Prone incline curl maximizing bicep tension at the point of peak contraction.',
    muscles: ['Biceps'], equipment: 'Dumbbell',
    steps: ['Lie chest-down on an incline bench set to 45 degrees', 'Let arms hang straight down from shoulders', 'Curl dumbbells up keeping upper arm stationary', 'Squeeze at the top', 'Lower fully back to hang'],
    mistakes: ['Swinging arms forward to generate momentum', 'Bench angle too high — reduces the effect', 'Partial range of motion at the top']
  },
  {
    id: 'zottman_curl', name: 'Zottman Curl', category: 'Arms', icon: '⚡',
    description: 'Unique curl hitting both the bicep (supinated concentric) and forearm (pronated eccentric).',
    muscles: ['Biceps', 'Forearms'], equipment: 'Dumbbell',
    steps: ['Stand holding dumbbells — palms forward', 'Curl both up with a supinated grip', 'At the top, rotate both hands so palms face down', 'Slowly lower in this pronated position', 'Rotate back to supinated at the bottom'],
    mistakes: ['Rotating palms too early on the way up', 'Rushing the lowering phase — the eccentric is half the exercise']
  },
  {
    id: 'machine_preacher_curl', name: 'Machine Preacher Curl', category: 'Arms', icon: '🚜',
    description: 'Machine-assisted strict curl for hypertrophy with constant tension throughout the movement.',
    muscles: ['Biceps'], equipment: 'Machine',
    steps: ['Adjust seat so armpits rest on pad top', 'Grip handles — palms up', 'Curl arms fully to the top', 'Squeeze biceps peak', 'Lower weight slowly to full extension'],
    mistakes: ['Seat too low — wrong angle on the bicep', 'Letting weights stack touch at the bottom — loses tension']
  },
  {
    id: 'close_grip_bench_press', name: 'Close Grip Bench Press', category: 'Arms', icon: '🏋️',
    description: 'Compound tricep mass builder using a narrow barbell grip.',
    muscles: ['Triceps', 'Chest'], equipment: 'Barbell',
    steps: ['Lie flat on bench — grip bar with hands shoulder-width or slightly closer', 'Unrack and lower bar to lower chest / sternum area', 'Keep elbows tucked close to torso throughout', 'Press up explosively — full lockout at top', 'Control descent — 2–3 second lowering'],
    mistakes: ['Grip too narrow — causes wrist and shoulder pain', 'Elbows flaring wide — works chest more than triceps', 'Bar bouncing off chest']
  },
  {
    id: 'overhead_tricep_ext_cable', name: 'Overhead Cable Tricep Extension', category: 'Arms', icon: '📡',
    description: 'Stretches the long head of the tricep from an overhead position for maximum growth stimulus.',
    muscles: ['Triceps'], equipment: 'Cable',
    steps: ['Set high pulley — attach rope or single handle', 'Face away from machine — hold rope behind head with both hands', 'Start with elbows bent and elbows high', 'Extend arms forward and overhead fully', 'Return slowly — feel the long head stretch deeply'],
    mistakes: ['Elbows flaring wide', 'Using only wrist to extend instead of elbow extension', 'Leaning forward excessively']
  },
  {
    id: 'overhead_tricep_ext_db', name: 'Overhead Dumbbell Tricep Extension', category: 'Arms', icon: '🏙️',
    description: 'Single or dual dumbbell overhead extension for long-head tricep emphasis.',
    muscles: ['Triceps'], equipment: 'Dumbbell',
    steps: ['Sit or stand — hold one dumbbell with both hands overhead', 'Lower dumbbell behind head by bending elbows', 'Keep elbows pointing directly up and close to head', 'Press dumbbell back up to start — full lockout'],
    mistakes: ['Elbows flaring outward to the sides', 'Moving upper arms — should be locked vertical', 'Short range — not lowering behind the head']
  },
  {
    id: 'single_arm_cable_pushdown', name: 'Single Arm Cable Pushdown', category: 'Arms', icon: '☝️',
    description: 'Unilateral isolation to identify and fix muscle imbalances in the triceps.',
    muscles: ['Triceps'], equipment: 'Cable',
    steps: ['Set high pulley — attach single handle', 'Stand sideways or facing machine', 'Grip handle — elbow tucked to side', 'Push handle straight down to full lockout', 'Slowly let arm rise back up under control'],
    mistakes: ['Elbow drifting away from body', 'Leaning into the pushdown with body weight', 'Not achieving full lockout at the bottom']
  },
  {
    id: 'parallel_bar_dips', name: 'Parallel Bar Dips (Tricep Focus)', category: 'Arms', icon: '🏗️',
    description: 'Bodyweight tricep compound — the squat of upper body pushing movements.',
    muscles: ['Triceps', 'Chest', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Grip parallel bars — arm straight, torso upright', 'Keep torso mostly vertical (slight lean focuses triceps)', 'Lower body — elbows track straight back', 'Stop when upper arms are parallel to floor', 'Press back up to lockout — squeeze triceps'],
    mistakes: ['Leaning forward too much — becomes a chest dip', 'Not descending to parallel — partial rep', 'Elbows flaring dramatically outward']
  },
  {
    id: 'diamond_pushup', name: 'Diamond Pushups', category: 'Arms', icon: '💎',
    description: 'Bodyweight tricep isolation with hands forming a diamond under the chest.',
    muscles: ['Triceps', 'Chest'], equipment: 'Bodyweight',
    steps: ['Place hands on floor — index fingers and thumbs touching forming a diamond', 'Arms extended in plank position', 'Lower chest toward hands — elbows flare back', 'Chest nearly touches the diamond', 'Press back up to full extension'],
    mistakes: ['Thumbs not touching — loses the narrow-grip benefit', 'Hips sagging — losing body alignment', 'Elbows flaring sideways rather than tracking back']
  },
  {
    id: 'dumbbell_kickback', name: 'Dumbbell Kickbacks', category: 'Arms', icon: '🦵',
    description: 'Strict tricep isolation with the arm parallel to the floor for constant tension.',
    muscles: ['Triceps'], equipment: 'Dumbbell',
    steps: ['Hinge forward until torso is nearly parallel to floor', 'Brace one hand on knee or bench', 'Upper arm parallel to floor — elbow at 90 degrees', 'Extend forearm backward — fully lock tricep at top', 'Slowly return forearm to 90 degrees'],
    mistakes: ['Upper arm dropping — loses the isolation', 'Swinging the weight rather than extending', 'Going too heavy — range collapses']
  },
  {
    id: 'wrist_curl_flexion', name: 'Wrist Curls (Flexion)', category: 'Arms', icon: '🦾',
    description: 'Direct forearm flexor isolation for grip strength and forearm size.',
    muscles: ['Forearms'], equipment: 'Barbell',
    steps: ['Sit — forearms resting on thighs, palms up', 'Hold barbell with a shoulder-width underhand grip', 'Lower bar by opening fingers slightly and extending wrists back', 'Curl wrists upward — forearm flexors contract fully', 'Hold at top — return slowly'],
    mistakes: ['Moving forearms off thighs', 'Gripping with knuckles rather than using wrist movement', 'Going too heavy — wrist health is fragile']
  },
  {
    id: 'wrist_curl_extension', name: 'Wrist Curls (Extension)', category: 'Arms', icon: '🦾',
    description: 'Targets the forearm extensors — critical for elbow health and balanced forearm development.',
    muscles: ['Forearms'], equipment: 'Barbell',
    steps: ['Sit — forearms on thighs, palms facing down', 'Hold barbell with an overhand grip', 'Lower bar by flexing wrists downward', 'Raise wrists back up — extensor muscles contract', 'Perform with light weight — high reps'],
    mistakes: ['Going too heavy — wrist strain', 'Moving forearms up and down rather than just the wrist', 'Skipping this — most gym-goers destroy the balance with too much flexion']
  },
  {
    id: 'reverse_barbell_curl', name: 'Reverse Barbell Curl', category: 'Arms', icon: '🔄',
    description: 'Overhand-grip curl targeting the brachioradialis (outer forearm) and brachialis.',
    muscles: ['Forearms', 'Biceps'], equipment: 'Barbell',
    steps: ['Stand — grip barbell with palms facing DOWN (overhand)', 'Pin elbows to sides', 'Curl bar upward — full range of motion', 'Squeeze at the top', 'Lower slowly — resist the weight'],
    mistakes: ['Wrists breaking (curling instead of staying neutral)', 'Using a full barbell when EZ bar is safer on the wrists', 'Swinging the bar upward with momentum']
  },
  {
    id: 'plate_pinch', name: 'Plate Pinch', category: 'Arms', icon: '🎯',
    description: 'Finger and grip strength builder using weight plate pinching.',
    muscles: ['Forearms', 'Grip'], equipment: 'Barbell',
    steps: ['Hold one or two weight plates together using only the fingers and thumb (pinching)', 'Stand or hold at your side', 'Hold for time or walk a distance', 'Switch hands', 'Increase plate weight over time as grip improves'],
    mistakes: ['Using a full fist instead of a strict pinch', 'Plates too heavy causing immediate drop — start lighter']
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
  {
    id: 'ab_crunch_machine', name: 'Ab Crunch Machine', category: 'Abs', icon: '🚜',
    description: 'Guided machine crunch allowing progressive overload directly on the abs.',
    muscles: ['Upper Abs'], equipment: 'Machine',
    steps: ['Sit in the machine, adjust weight and seat height', 'Hold handles or cross arms on pads', 'Crunch forward using your abs — not your neck or hips', 'Squeeze hard at the fully contracted position', 'Return slowly — resist the weight on the way back'],
    mistakes: ['Using hip flexors to pull down instead of abs', 'Going too heavy and sacrificing range of motion', 'Releasing weight too fast on the return']
  },
  {
    id: 'captains_chair_raise', name: "Captain's Chair Leg Raise", category: 'Abs', icon: '🪑',
    description: 'Hanging raise using a padded arm captain\'s chair that targets the lower abs intensely.',
    muscles: ['Lower Abs', 'Hip Flexors'], equipment: 'Machine',
    steps: ['Step onto the captain\'s chair — rest forearms on pads, back flat against backrest', 'Hang legs straight down', 'Raise knees toward chest (beginner) or keep legs straight and raise to parallel', 'Squeeze abs at the top', 'Lower legs slowly under control'],
    mistakes: ['Swinging the body to generate momentum', 'Only raising legs partway — short range of motion', 'Not pressing back into the pad']
  },
  {
    id: 'reverse_crunch', name: 'Reverse Crunch', category: 'Abs', icon: '🔃',
    description: 'Lower ab crunch that curls the hips and pelvis upward instead of the shoulders.',
    muscles: ['Lower Abs'], equipment: 'Bodyweight',
    steps: ['Lie on back — knees bent, feet slightly off the floor', 'Place hands flat at your sides or under your lower back', 'Use your abs to curl your pelvis and knees toward your chest', 'Lift hips off the floor at the top', 'Lower slowly — do not let feet touch the floor'],
    mistakes: ['Using momentum to swing knees in', 'Not lifting the hips at the top — loses lower ab engagement', 'Pressing with hands too heavily to assist']
  },
  {
    id: 'side_crunch', name: 'Side Crunch', category: 'Abs', icon: '↔️',
    description: 'Lateral crunch performed upright to target one side of the obliques at a time.',
    muscles: ['Obliques'], equipment: 'Bodyweight',
    steps: ['Stand upright holding a dumbbell in one hand', 'Lean to the same side slowly — going as far as comfortable', 'Crunch upright by contracting the opposite oblique', 'Do not use the lower back to return — use your side ab', 'Complete all reps on one side before switching'],
    mistakes: ['Leaning forward or backward during the movement', 'Pulling with the arm rather than the core', 'Going too heavy — reduces range of motion']
  },
  {
    id: 'bird_dog', name: 'Bird Dog', category: 'Abs', icon: '🐦',
    description: 'Anti-rotation stability exercise strengthening the lower back and deep core simultaneously.',
    muscles: ['Deep Core', 'Lower Back', 'Glutes'], equipment: 'Bodyweight',
    steps: ['Start on all fours — hands directly below shoulders, knees below hips', 'Brace your core — maintain a flat back throughout', 'Simultaneously extend your right arm forward and left leg straight back', 'Hold for 2–3 seconds at full extension', 'Return to start slowly and repeat on the other side'],
    mistakes: ['Rotating the hips or spine to reach further', 'Raising the arm or leg too high — hyperextends the spine', 'Moving too fast — control is everything in this exercise']
  },
  {
    id: 'toes_to_bar', name: 'Toes-to-Bar', category: 'Abs', icon: '🎯',
    description: 'Elite bar exercise requiring full lower ab and hip flexor strength through a complete range.',
    muscles: ['Lower Abs', 'Hip Flexors', 'Lats'], equipment: 'Bodyweight',
    steps: ['Hang from pull-up bar with an overhand grip', 'Begin with legs straight — engage lats to stabilize', 'Use core to raise both legs simultaneously', 'Bring toes all the way up to touch the bar', 'Lower both legs under control without swinging'],
    mistakes: ['Swinging and kipping to get legs up', 'Bending knees — use straight legs for full challenge', 'Dropping legs quickly — the eccentric phase is critical', 'Not engaging the lats — causes excessive swing']
  },
  {
    id: 'crunch_basic', name: 'Crunches', category: 'Abs', icon: '🤸',
    description: 'The foundational upper ab isolation exercise.',
    muscles: ['Upper Abs'], equipment: 'Bodyweight',
    steps: ['Lie on back — knees bent, feet flat on floor', 'Place hands lightly behind head — do not pull neck', 'Exhale and curl shoulders off the floor toward knees', 'Focus on contracting abs — not pulling with neck', 'Lower back without fully relaxing — keep tension'],
    mistakes: ['Jerking neck with hands to get up', 'Going all the way down between reps — losing tension', 'Using hip flexors to sit up instead of abs']
  },
  {
    id: 'bicycle_crunch', name: 'Bicycle Crunches', category: 'Abs', icon: '🚲',
    description: 'Dynamic rotational crunch working upper abs and obliques simultaneously.',
    muscles: ['Upper Abs', 'Obliques'], equipment: 'Bodyweight',
    steps: ['Lie on back — hands behind head, legs raised', 'Bring right elbow toward left knee while extending right leg', 'Twist the torso — not just the elbow', 'Alternate sides in a pedalling motion', 'Do not rush — full rotation each rep'],
    mistakes: ['Pulling head forward with hands', 'Barely rotating — going through the motion without twist', 'Moving too fast — momentum replaces muscle work']
  },
  {
    id: 'cable_crunch', name: 'Cable Crunch', category: 'Abs', icon: '📉',
    description: 'Weighted ab exercise allowing progressive overload for the upper abs.',
    muscles: ['Upper Abs'], equipment: 'Cable',
    steps: ['Kneel in front of high cable — attach rope', 'Grip rope beside ears — hold constant throughout', 'Crunch downward pulling elbows toward knees', 'Round the spine — do not hip hinge', 'Return slowly without releasing the cable tension'],
    mistakes: ['Bending at the hips (good morning motion) instead of spinal flexion', 'Using own bodyweight to pull down rather than abs', 'Looking up — keep chin tucked throughout']
  },
  {
    id: 'decline_crunch', name: 'Decline Bench Crunch', category: 'Abs', icon: '📐',
    description: 'Increased difficulty crunch using a decline bench for a larger range of motion.',
    muscles: ['Upper Abs'], equipment: 'Machine',
    steps: ['Secure feet under pads on a decline bench', 'Arms crossed on chest or lightly behind head', 'Lower torso back until nearly flat', 'Curl up — round the spine toward knees', 'Squeeze abs hard at the top'],
    mistakes: ['Swinging body using momentum', 'Not going all the way down — limits range of motion', 'Pulling neck with hands']
  },
  {
    id: 'v_up', name: 'V-Ups', category: 'Abs', icon: 'V',
    description: 'Full-range jackknife movement targeting upper and lower abs simultaneously.',
    muscles: ['Upper Abs', 'Lower Abs', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Lie flat, arms extended overhead, legs straight', 'Simultaneously raise legs and torso upward', 'Touch fingers to toes at the peak (form a V shape)', 'Lower both together in a controlled motion', 'Hover hands and feet above the floor between reps'],
    mistakes: ['Bending knees to make it easier', 'Collapsing when lowering — keep core engaged on return', 'Pulling on the neck instead of using the abs']
  },
  {
    id: 'leg_raise_flat', name: 'Lying Leg Raise', category: 'Abs', icon: '🦵',
    description: 'Lower ab isolation keeping the lower back pressed against the mat.',
    muscles: ['Lower Abs', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Lie flat on back — hands flat or under lower back', 'Keep legs straight and raise them to 90 degrees', 'Slowly lower legs toward the floor', 'Stop just before heels touch the floor', 'Raise again — repeat'],
    mistakes: ['Lower back arching off the floor during descent', 'Bending knees to make it easier', 'Dropping legs quickly rather than lowering with control']
  },
  {
    id: 'flutter_kicks', name: 'Flutter Kicks', category: 'Abs', icon: '🦶',
    description: 'Rhythmic alternating leg movement producing sustained lower ab and hip flexor burn.',
    muscles: ['Lower Abs', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Lie on back, legs extended, hands under glutes for support', 'Lift both feet 6–12 inches off the floor', 'Alternate kicking legs up and down in small rapid movements', 'Keep core braced — lower back pressed to floor', 'Continue for time or reps'],
    mistakes: ['Lower back lifting off the floor', 'Kicking too high — reduces lower ab demands', 'Relaxing the core and letting hips take over']
  },
  {
    id: 'mountain_climbers', name: 'Mountain Climbers', category: 'Abs', icon: '⛰️',
    description: 'High-intensity movement combining core stability with cardio conditioning.',
    muscles: ['Abs', 'Hip Flexors', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Start in a push-up position — body in a straight line', 'Drive one knee toward the chest', 'Quickly switch legs in a running motion', 'Maintain a flat back — hips not sagging or piking', 'Perform at fast pace for conditioning or slow for core focus'],
    mistakes: ['Piking hips high in the air', 'Looking down — chin should be neutral over hands', 'Allowing hips to bounce rather than staying stable']
  },
  {
    id: 'side_plank', name: 'Side Plank', category: 'Abs', icon: '📏',
    description: 'Lateral core stability exercise targeting the obliques and hip abductors.',
    muscles: ['Obliques', 'Glutes'], equipment: 'Bodyweight',
    steps: ['Lie on side — forearm on floor, elbow below shoulder', 'Stack feet or stagger them for balance', 'Lift hips off the floor — body forms a straight line from head to feet', 'Keep hips elevated — do not let them sag', 'Hold for time — switch sides'],
    mistakes: ['Hips sagging downward', 'Rotating torso toward the floor', 'Placing feet incorrectly — staggered gives less challenge than stacked']
  },
  {
    id: 'oblique_crunch', name: 'Oblique Crunch', category: 'Abs', icon: '↩️',
    description: 'Targeted side crunch isolating the external and internal obliques.',
    muscles: ['Obliques'], equipment: 'Bodyweight',
    steps: ['Lie on back — drop knees to one side', 'Place hands lightly behind head', 'Crunch upward toward ceiling — not toward knees', 'Squeeze the upper oblique hard at the top', 'Lower and repeat — switch sides'],
    mistakes: ['Pulling neck forward', 'Rotating the spine simultaneously — keep hips planted', 'Rush — slow controlled contraction is more effective']
  },
  {
    id: 'woodchop_cable', name: 'Cable Wood Chop', category: 'Abs', icon: '🪓',
    description: 'Rotational core movement training the obliques to generate and resist twisting forces.',
    muscles: ['Obliques', 'Core'], equipment: 'Cable',
    steps: ['Set cable at high pulley — attach single handle', 'Stand sideways — grip handle with both hands', 'Pull cable diagonally down and across body like chopping wood', 'Rotate torso — hips stay relatively stable', 'Slowly return to start pulling against cable tension'],
    mistakes: ['Rotating the hips instead of the torso', 'Using arms to pull rather than core to rotate', 'Standing too close to the machine — limits range of motion']
  },
  {
    id: 'pallof_press', name: 'Pallof Press', category: 'Abs', icon: '🛡️',
    description: 'Anti-rotation stability exercise building deep core and oblique resilience.',
    muscles: ['Core', 'Obliques'], equipment: 'Cable',
    steps: ['Set cable at chest height — stand sideways to machine', 'Hold handle with both hands at chest', 'Press hands straight out in front — resist the pull of the cable', 'Hold the extended position for 2 seconds', 'Pull handle back to chest — repeat'],
    mistakes: ['Rotating toward the machine when pressing out', 'Standing too close — weight stack touches the machine', 'Only doing small range — fully extend arms each rep']
  },
  {
    id: 'ab_wheel_rollout', name: 'Ab Wheel Rollout', category: 'Abs', icon: '🎡',
    description: 'One of the most challenging core exercises demanding anti-extension strength.',
    muscles: ['Deep Core', 'Abs', 'Lats'], equipment: 'Machine',
    steps: ['Kneel on floor — grip ab wheel handles directly below shoulders', 'Brace core hard — maintain a neutral spine', 'Slowly roll forward until arms are extended', 'Pull back using abs — not momentum', 'Return to kneeling start position under control'],
    mistakes: ['Hips dropping before rolling out', 'Using lower back extension rather than ab control', 'Rolling out too far before core is strong enough']
  },
  {
    id: 'dragon_flag', name: 'Dragon Flag', category: 'Abs', icon: '🐉',
    description: 'Bruce Lee\'s signature advanced core exercise for extreme full-body tension.',
    muscles: ['Core', 'Abs', 'Lower Back'], equipment: 'Bodyweight',
    steps: ['Lie on a bench — grip the bench behind your head firmly', 'Raise entire body straight up like a candle — only shoulders on bench', 'Keep body rigid as a plank', 'Lower slowly — hips must not break the plank line', 'Stop just before body touches the bench at bottom'],
    mistakes: ['Breaking at the hips on the way down', 'Starting with straight legs when still building strength — tuck knees', 'Lowering too fast — the eccentric is where the work is done']
  },
  {
    id: 'toe_touches', name: 'Toe Touches', category: 'Abs', icon: '🦶',
    description: 'Vertical leg crunch focusing maximum effort on the upper abs and rectus abdominis.',
    muscles: ['Upper Abs'], equipment: 'Bodyweight',
    steps: ['Lie on back — raise legs straight up to 90 degrees', 'Arms extended upward toward feet', 'Crunch upward — try to touch toes with fingertips', 'Lower upper body with control — do not go fully flat'],
    mistakes: ['Kicking legs during the crunch', 'Letting legs collapse from 90 degrees during reps', 'Bobbing quickly — loses contraction at the top']
  },
  {
    id: 'seated_leg_tuck', name: 'Seated Leg Tucks', category: 'Abs', icon: '🤸',
    description: 'Bench-based compression movement training hip flexors and lower abs together.',
    muscles: ['Lower Abs', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Sit on edge of bench — lean back slightly, hands gripping bench behind', 'Extend legs forward — slightly above the floor', 'Draw knees in toward chest', 'Extend legs back out — hover above floor', 'Repeat continuously without resting feet'],
    mistakes: ['Feet resting on the floor between reps', 'Leaning too far back — turns it into a hip flexor exercise only', 'Using momentum to swing legs in and out']
  },
  {
    id: 'dead_bug', name: 'Dead Bug', category: 'Abs', icon: '🐛',
    description: 'A safe, spine-friendly anti-extension exercise building deep core stability.',
    muscles: ['Deep Core', 'Abs'], equipment: 'Bodyweight',
    steps: ['Lie on back — arms straight up toward ceiling, knees bent at 90 degrees', 'Press lower back firmly into floor throughout', 'Slowly lower opposite arm and leg toward the floor simultaneously', 'Stop just before touching the floor', 'Return to center and repeat on the other side'],
    mistakes: ['Lower back lifting off the floor — losing spinal stability', 'Moving too fast — stability is the goal, not speed', 'Allowing the non-working limbs to drift']
  },
  {
    id: 'windshield_wipers', name: 'Windshield Wipers', category: 'Abs', icon: '🚗',
    description: 'Advanced rotational core exercise with straight legs perpendicular to the floor.',
    muscles: ['Obliques', 'Core', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Lie on back — raise both legs straight to 90 degrees', 'Arms extended to sides for balance', 'Slowly lower both legs to one side — stop before touching the floor', 'Raise legs back to center', 'Lower to the opposite side — repeat'],
    mistakes: ['Legs not staying straight', 'Shoulders lifting off the floor', 'Dropping legs too fast — uses momentum instead of oblique control']
  },
  {
    id: 'sit_up', name: 'Sit-Ups', category: 'Abs', icon: '🧘',
    description: 'Classic full-range core movement combining abs and hip flexors.',
    muscles: ['Abs', 'Hip Flexors'], equipment: 'Bodyweight',
    steps: ['Lie on back — knees bent, feet flat or anchored', 'Arms crossed at chest or hands behind head (lightly)', 'Rise all the way up until torso is upright', 'Lower in a slow controlled manner', 'Do not fully collapse at the bottom — hover before reversing'],
    mistakes: ['Using momentum to pull up rather than abs', 'Ankles off the floor — not anchored', 'Bending at the neck to initiate the movement']
  },
  {
    id: 'box_crunch', name: 'Box Position Crunch', category: 'Abs', icon: '📦',
    description: 'Hip-flexor-free crunch variant with legs elevated at 90 degrees on a bench or chair.',
    muscles: ['Upper Abs'], equipment: 'Bodyweight',
    steps: ['Lie on back — place calves on a bench, hips at 90 degrees', 'Arms behind head lightly', 'Crunch upper body toward thighs', 'This position removes the hip flexors from the movement', 'Lower shoulders to floor slowly between each rep'],
    mistakes: ['Pulling neck forward', 'Placing legs too low — hip flexors re-engage', 'Moving the bench — hold it still']
  },
  {
    id: 'L_sit', name: 'L-Sit Hold', category: 'Abs', icon: '💺',
    description: 'Isometric compressed hold on the parallel bars demanding elite core and hip flexor strength.',
    muscles: ['Hip Flexors', 'Core', 'Triceps'], equipment: 'Bodyweight',
    steps: ['Support yourself on parallel bars — arms fully straight', 'Lift legs until they are parallel to the floor', 'Hold this L position — do not let legs drop', 'Keep torso upright and tall', 'Build hold time progressively'],
    mistakes: ['Bending the knees — tuck first if needed', 'Letting shoulders shrug up', 'Hips not high enough — body should be in a true L shape']
  },
  {
    id: 'plank_variations', name: 'Plank Variations (RKC / Long Lever)', category: 'Abs', icon: '🧱',
    description: 'Advanced plank variants that dramatically increase core activation.',
    muscles: ['Core', 'Deep Abs'], equipment: 'Bodyweight',
    steps: ['Get into a standard forearm plank position', 'For RKC: squeeze every muscle simultaneously (glutes, quads, fists, abs)', 'For Long Lever: move elbows slightly forward of shoulders', 'Hold while actively bracing — not just maintaining position', 'Progress by adding duration or using a weight vest'],
    mistakes: ['Passive plank — just holding without active tension', 'Hips piking or sagging over time', 'Holding breath rather than breathing steadily throughout']
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
  {
    id: 'home_pushup', name: 'Push-Ups', category: 'Home', icon: '💪',
    description: 'The king of home chest exercises — no equipment needed.',
    muscles: ['Chest', 'Triceps', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Place hands slightly wider than shoulder-width on the floor', 'Body forms a straight line from head to heels', 'Lower chest to the floor — elbows at 45 degree angle', 'Press back up to full arm extension', 'Brace core throughout the entire movement'],
    mistakes: ['Hips sagging down to the floor', 'Elbows flaring out at 90 degrees', 'Head drooping or craning upward', 'Partial range — chest must nearly touch the floor']
  },
  {
    id: 'home_wide_pushup', name: 'Wide Grip Push-Up', category: 'Home', icon: '🤲',
    description: 'Wider hand placement shifts emphasis to the outer chest and front delts.',
    muscles: ['Chest', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Set hands significantly wider than shoulder-width', 'Keep elbows pointing slightly outward', 'Lower chest directly between hands', 'Press back up — squeeze chest at the top'],
    mistakes: ['Hands placed so wide that wrists are stressed', 'Elbows caving inward during the press']
  },
  {
    id: 'home_narrow_pushup', name: 'Narrow Push-Up', category: 'Home', icon: '💎',
    description: 'Close hand placement targeting the triceps with heavy chest secondary involvement.',
    muscles: ['Triceps', 'Chest'], equipment: 'Bodyweight',
    steps: ['Place hands directly below chest — thumbs nearly touching', 'Elbows track straight back alongside the body', 'Lower chest toward hands with control', 'Press up fully — squeeze triceps at lockout'],
    mistakes: ['Hands too far forward — turns it into a regular push-up', 'Elbows flaring to the sides instead of tracking back']
  },
  {
    id: 'home_decline_pushup', name: 'Decline Push-Up', category: 'Home', icon: '📉',
    description: 'Feet elevated push-up targeting the upper chest and anterior deltoids.',
    muscles: ['Upper Chest', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Place feet on a chair, sofa, or bed', 'Hands on the floor slightly wider than shoulders', 'Body forms a straight declined line', 'Lower chest toward the floor', 'Press back up powerfully'],
    mistakes: ['Feet too high — becomes a vertical handstand push-up', 'Hips piking — lose the straight body line']
  },
  {
    id: 'home_archer_pushup', name: 'Archer Push-Up', category: 'Home', icon: '🏹',
    description: 'Advanced unilateral push-up developing one-arm push-up prerequisite strength.',
    muscles: ['Chest', 'Triceps', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Start in a wide push-up position', 'Shift your body to one side bending one elbow', 'Keep the opposite arm mostly straight as a brace', 'Lower yourself over the bent-arm side', 'Press back up and repeat or alternate sides'],
    mistakes: ['Both elbows bending equally — removes the unilateral challenge', 'Too narrow a start — limits the lean range']
  },
  {
    id: 'home_squat', name: 'Bodyweight Squat', category: 'Home', icon: '🦵',
    description: 'The fundamental lower body movement for home training.',
    muscles: ['Quads', 'Glutes'], equipment: 'Bodyweight',
    steps: ['Stand with feet shoulder-width apart, toes slightly out', 'Chest proud, core braced', 'Push hips back and down — thighs reach parallel or below', 'Keep heels flat throughout the descent', 'Drive back up through the full foot'],
    mistakes: ['Heels rising as you descend — ankle mobility issue', 'Chest collapsing forward', 'Knees caving inward on the way up']
  },
  {
    id: 'home_lunge', name: 'Bodyweight Lunges', category: 'Home', icon: '🚶',
    description: 'Unilateral leg movement for quad, glute, and balance development at home.',
    muscles: ['Quads', 'Glutes'], equipment: 'Bodyweight',
    steps: ['Stand tall — step one foot forward into a wide stance', 'Lower back knee toward the floor', 'Front shin stays vertical — knee directly over ankle', 'Push back through the front heel to return', 'Alternate legs each rep'],
    mistakes: ['Front knee shooting past toes', 'Leaning torso forward heavily', 'Back knee slamming into the floor']
  },
  {
    id: 'home_sumo_squat', name: 'Sumo Squat at Home', category: 'Home', icon: '🤸',
    description: 'Wide stance squat emphasising inner thighs and glutes with no equipment.',
    muscles: ['Glutes', 'Adductors', 'Quads'], equipment: 'Bodyweight',
    steps: ['Take a very wide stance — toes pointing out 45 degrees', 'Hands clasped at chest or overhead for balance', 'Squat straight down keeping knees over toes', 'Squeeze glutes and inner thighs as you stand'],
    mistakes: ['Heels lifting off the ground', 'Knees collapsing inward dramatically']
  },
  {
    id: 'home_single_leg_rdl', name: 'Single Leg Romanian Deadlift', category: 'Home', icon: '🦩',
    description: 'Balance and hamstring exercise requiring no equipment — great for home training.',
    muscles: ['Hamstrings', 'Glutes', 'Balance'], equipment: 'Bodyweight',
    steps: ['Stand on one leg — slight bend in the knee', 'Hinge at the hip — extend straight leg behind you', 'Lower torso until it is parallel to the floor', 'Maintain a flat back — feel the hamstring stretch', 'Drive hip forward to stand back up'],
    mistakes: ['Rounding the lower back to reach further', 'Rotating the hips open instead of staying square', 'Standing leg too straight — unlocks the knee completely']
  },
  {
    id: 'home_hip_thrust_floor', name: 'Floor Hip Thrust (Bodyweight)', category: 'Home', icon: '🌉',
    description: 'Excellent glute activator that can be done against any sofa or bed frame.',
    muscles: ['Glutes', 'Hamstrings'], equipment: 'Bodyweight',
    steps: ['Sit with upper back against a couch or bed — knees bent, feet flat', 'Drive hips up by squeezing glutes hard', 'Reach full hip extension — body forms a straight line from knees to shoulders', 'Hold squeeze for 2 seconds', 'Lower with control — hover above ground before repeating'],
    mistakes: ['Hyperextending lower back at the top', 'Feet placed too far away — hamstrings dominate over glutes', 'Not squeezing glutes — just lift the hips']
  },
  {
    id: 'home_donkey_kick', name: 'Donkey Kicks', category: 'Home', icon: '🦵',
    description: 'All-fours glute isolation exercise requiring no equipment.',
    muscles: ['Glutes'], equipment: 'Bodyweight',
    steps: ['Start on all fours — wrists below shoulders, knees below hips', 'Keep core braced and back flat', 'Drive one heel straight up toward the ceiling', 'Squeeze glute hard at the top', 'Lower with control — do not touch knee to floor between reps'],
    mistakes: ['Rotating hips to kick higher — arches the lower back', 'Kicking forward instead of straight up and back']
  },
  {
    id: 'home_fire_hydrant', name: 'Fire Hydrants', category: 'Home', icon: '🚒',
    description: 'Hip abduction movement on all fours for outer glute and hip development.',
    muscles: ['Glutes', 'Abductors'], equipment: 'Bodyweight',
    steps: ['Start on all fours — core tight, spine neutral', 'Keep knee bent at 90 degrees', 'Lift one knee out to the side as high as possible', 'Hold briefly — squeeze the outer glute', 'Return under control — repeat all reps before switching'],
    mistakes: ['Tilting the whole pelvis to lift higher', 'Going too fast — remove the glute engagement', 'Letting the back round or sag']
  },
  {
    id: 'home_burpee', name: 'Burpees', category: 'Home', icon: '🔥',
    description: 'Full-body cardio and strength exercise burning maximum calories.',
    muscles: ['Full Body'], equipment: 'Bodyweight',
    steps: ['Stand tall — drop hands to the floor', 'Jump or step feet back into a push-up position', 'Perform a push-up (optional for more intensity)', 'Jump or step feet back toward hands', 'Explosively jump up — arms overhead', 'Land softly and immediately begin the next rep'],
    mistakes: ['Letting the hips sag in the plank position', 'Not fully extending upward in the jump', 'Skipping the push-up — reduces the upper body benefit']
  },
  {
    id: 'home_high_knees', name: 'High Knees', category: 'Home', icon: '🏃',
    description: 'High-intensity running in place to elevate heart rate and build hip flexor strength.',
    muscles: ['Hip Flexors', 'Core', 'Calves'], equipment: 'Bodyweight',
    steps: ['Stand tall — run in place lifting knees to hip height', 'Pump arms in coordination with legs', 'Land on the balls of your feet', 'Maintain an upright posture throughout', 'Perform at maximum intensity for conditioning'],
    mistakes: ['Leaning backward as you run', 'Not bringing knees to hip height', 'Looking at feet instead of keeping head neutral']
  },
  {
    id: 'home_jumping_jack', name: 'Jumping Jacks', category: 'Home', icon: '⭐',
    description: 'Classic full-body warm-up and cardio movement requiring zero equipment.',
    muscles: ['Full Body', 'Calves'], equipment: 'Bodyweight',
    steps: ['Stand with feet together, arms at sides', 'Jump — simultaneously spread feet wide and raise arms overhead', 'Jump again — return feet together and arms to sides', 'Keep a slight bend in the knees on landing', 'Maintain a steady rhythm'],
    mistakes: ['Locking knees straight on landing', 'Not fully raising arms overhead', 'Letting posture slump forward']
  },
  {
    id: 'home_tricep_dip_floor', name: 'Floor Tricep Dips', category: 'Home', icon: '🪑',
    description: 'Tricep dip variation using just the floor — great for beginners.',
    muscles: ['Triceps'], equipment: 'Bodyweight',
    steps: ['Sit on the floor — hands behind you, fingers pointing forward', 'Lift hips off the floor — straighten arms', 'Bend elbows — lower hips toward floor', 'Stop just before hips touch', 'Press back up — fully extend arms at the top'],
    mistakes: ['Letting hips touch the floor between reps', 'Wrists turned sideways — risk strain', 'Shrugging shoulders throughout the movement']
  },
  {
    id: 'home_inchworm', name: 'Inchworm', category: 'Home', icon: '🐛',
    description: 'Dynamic stretch and core warm-up combining hip flexibility with shoulder stability.',
    muscles: ['Core', 'Hamstrings', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Stand tall — hinge at hips and place hands on the floor', 'Walk hands forward until you reach a plank position', 'Hold the plank briefly — brace core', 'Walk hands back toward feet', 'Stand up and repeat'],
    mistakes: ['Bending knees to reach the floor', 'Not maintaining a rigid plank during the hold', 'Rushing — slow movement gives more benefit']
  },
  {
    id: 'home_superman', name: 'Superman Hold', category: 'Home', icon: '🦸',
    description: 'Lower back strengthener using bodyweight extension lying face down.',
    muscles: ['Lower Back', 'Glutes'], equipment: 'Bodyweight',
    steps: ['Lie face down — arms extended forward', 'Simultaneously lift arms, chest, and legs off the floor', 'Squeeze lower back and glutes hard at the top', 'Hold for 2–3 seconds', 'Lower slowly and repeat'],
    mistakes: ['Only lifting arms — legs must rise too', 'Looking straight up — keep gaze toward the floor', 'Holding breath throughout the hold']
  },
  {
    id: 'home_shoulder_tap', name: 'Shoulder Taps', category: 'Home', icon: '👋',
    description: 'Anti-rotation plank variation developing deep core stability and shoulder strength.',
    muscles: ['Core', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Start in a high plank — hands below shoulders', 'Lift one hand and tap the opposite shoulder', 'Resist the rotation — keep hips level', 'Return hand to floor and repeat on the other side', 'Move at a slow, controlled pace'],
    mistakes: ['Hips rocking side to side', 'Stepping feet too wide to compensate for instability', 'Going too fast — defeats the anti-rotation purpose']
  },
  {
    id: 'home_plank_to_pushup', name: 'Plank to Push-Up', category: 'Home', icon: '🔄',
    description: 'Dynamic movement transitioning between forearm and high plank to build full core control.',
    muscles: ['Core', 'Triceps', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Start in a forearm plank', 'Press up one hand at a time to a high plank', 'Lower back down one arm at a time to the forearm plank', 'Alternate which arm leads each rep', 'Maintain even hips throughout'],
    mistakes: ['Hips rocking with each transition', 'Always leading with the same arm — creates imbalances', 'Rushing — lose core stability']
  },
  {
    id: 'home_bear_crawl', name: 'Bear Crawl', category: 'Home', icon: '🐻',
    description: 'Crawling movement with hovering knees building quadruped core and shoulder stability.',
    muscles: ['Core', 'Shoulders', 'Quads'], equipment: 'Bodyweight',
    steps: ['Start on all fours — lift knees 2 inches off the floor', 'Move opposite arm and leg simultaneously forward', 'Keep back flat — do not let knees touch the floor', 'Crawl forward for distance or in place rhythmically'],
    mistakes: ['Knees touching the floor', 'Moving same-side arm and leg — breaks the pattern', 'Hips rising too high — back must stay flat']
  },
  {
    id: 'home_towel_row', name: 'Door Frame / Towel Row', category: 'Home', icon: '🚪',
    description: 'Improvised pulling exercise using a towel through a door for back and biceps.',
    muscles: ['Back', 'Biceps'], equipment: 'Bodyweight',
    steps: ['Loop a towel around a door handle — hold both ends', 'Lean back from the door with arms straight', 'Pull yourself toward the door — drive elbows back', 'Squeeze shoulder blades at the top', 'Extend arms and lean back to start'],
    mistakes: ['Door not secured properly — safety risk', 'Feet too close to the door — removes difficulty', 'Pulling with arms only rather than leading elbows']
  },
  {
    id: 'home_calf_raise_stair', name: 'Stair Calf Raise', category: 'Home', icon: '🪜',
    description: 'Full-range calf raise using the bottom step of any household staircase.',
    muscles: ['Calves'], equipment: 'Bodyweight',
    steps: ['Stand on the edge of the bottom stair step — heels hanging off', 'Hold wall for balance', 'Lower heels as far below the step as possible', 'Rise up onto tiptoes — squeeze calves hard', 'Perform slow reps with a pause at the top and stretch at the bottom'],
    mistakes: ['Bouncing at the bottom', 'Using both hands for balance — use one to make it harder', 'Not going through the full range — partial reps are far less effective']
  },
  {
    id: 'home_bear_plank_shoulder_tap', name: 'Bear Plank Hold', category: 'Home', icon: '🐻',
    description: 'Hovering bear crawl position held isometrically for intense core and quad burn.',
    muscles: ['Core', 'Quads', 'Shoulders'], equipment: 'Bodyweight',
    steps: ['Get on all fours — knees hovering 2 inches from the floor', 'Maintain a flat back and neutral neck', 'Hold position — breathe steadily', 'Do not let knees touch the floor at any point', 'Build hold time progressively'],
    mistakes: ['Hips rising up to take weight off the knees', 'Holding breath', 'Knees touching the floor']
  },
  {
    id: 'home_lateral_lunge', name: 'Lateral (Side) Lunge', category: 'Home', icon: '↔️',
    description: 'Side-to-side lunge developing inner thigh, glute, and knee stability.',
    muscles: ['Glutes', 'Adductors', 'Quads'], equipment: 'Bodyweight',
    steps: ['Stand with feet together — hands at chest', 'Take a wide step to one side', 'Bend the stepping knee — push hips back', 'Keep the opposite leg straight', 'Push back to center and repeat on the other side'],
    mistakes: ['Bent leg knee caving inward', 'Leaning torso forward excessively', 'Touching feet between reps — removes dynamic stability challenge']
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
  {
    id: 'warrior_1', name: 'Warrior I (Virabhadrasana I)', category: 'Yoga', icon: '🤺',
    description: 'Powerful standing lunge opening the hips and building lower body strength.',
    muscles: ['Quads', 'Hip Flexors', 'Core'], equipment: 'Yoga Mat',
    steps: ['Step one foot back 3-4 feet into a lunge', 'Back foot turns out 45 degrees, front foot points forward', 'Bend front knee to 90 degrees', 'Raise arms overhead — palms facing each other', 'Square hips to the front and breathe deeply'],
    mistakes: ['Front knee caving inward', 'Back heel lifting off the mat', 'Arms forward instead of overhead', 'Torso leaning forward over the knee']
  },
  {
    id: 'tree_pose', name: 'Tree Pose (Vrksasana)', category: 'Yoga', icon: '🌳',
    description: 'Single-leg balance pose developing focus, stability and hip mobility.',
    muscles: ['Glutes', 'Core', 'Balance'], equipment: 'Yoga Mat',
    steps: ['Stand tall on one leg', 'Place the sole of the opposite foot on the inner thigh or calf — never the knee', 'Bring hands to prayer position at chest or raise overhead', 'Fix gaze on a still point for balance', 'Hold and breathe — repeat on other side'],
    mistakes: ['Placing foot directly on the knee — stresses the joint', 'Hips tilting sideways — keep them level', 'Forgetting to breathe — tension will topple you']
  },
  {
    id: 'triangle_pose', name: 'Triangle Pose (Trikonasana)', category: 'Yoga', icon: '📐',
    description: 'Standing lateral stretch opening the hips, chest, and thoracic spine.',
    muscles: ['Adductors', 'Hamstrings', 'Obliques'], equipment: 'Yoga Mat',
    steps: ['Stand with feet 3-4 feet apart', 'Front foot points forward, back foot turns 90 degrees out', 'Extend arms wide at shoulder height', 'Hinge at the hip — lower front hand toward shin or a block', 'Rotate chest upward — gaze toward upper hand'],
    mistakes: ['Bending the front knee — keep it straight', 'Collapsing chest toward the floor', 'Forcing the hand below where it naturally falls']
  },
  {
    id: 'chair_pose', name: 'Chair Pose (Utkatasana)', category: 'Yoga', icon: '🪑',
    description: 'Yoga squat that builds quad, glute and core strength while opening the chest.',
    muscles: ['Quads', 'Glutes', 'Core'], equipment: 'Yoga Mat',
    steps: ['Stand with feet hip-width apart', 'Bend knees deeply as if sitting in an imaginary chair', 'Keep weight in heels — knees over toes', 'Raise arms overhead — biceps by ears', 'Drop tailbone down and elongate the spine'],
    mistakes: ['Knees shooting past the toes', 'Lower back arching — tuck tailbone slightly', 'Arms angled instead of reaching straight up']
  },
  {
    id: 'crescent_lunge', name: 'Crescent Lunge (Anjaneyasana)', category: 'Yoga', icon: '🌙',
    description: 'Deep hip flexor opener in a high lunge position with arms raised.',
    muscles: ['Hip Flexors', 'Quads', 'Shoulders'], equipment: 'Yoga Mat',
    steps: ['Step into a wide lunge — back knee hovers or rests on mat', 'Front knee at 90 degrees above ankle', 'Raise both arms overhead — sink hips forward and down', 'Tuck pelvis slightly — feel the hip flexor stretch', 'Open chest and gaze slightly upward'],
    mistakes: ['Front knee caving inward or past the toes', 'Arching lower back excessively', 'Not sinking the hips into the stretch']
  },
  {
    id: 'mountain_pose', name: 'Mountain Pose (Tadasana)', category: 'Yoga', icon: '⛰️',
    description: 'The foundation of all standing yoga poses — active alignment from feet to crown.',
    muscles: ['Core', 'Full Body'], equipment: 'Yoga Mat',
    steps: ['Stand with feet together or hip-width apart', 'Spread toes — root evenly through both feet', 'Engage thighs — lift kneecaps slightly', 'Lengthen tailbone down, lift through the crown', 'Arms at sides — palms face forward'],
    mistakes: ['Locking knees back into hyperextension', 'Ribcage jutting forward', 'Shoulders rounded forward or shrugging up']
  },
  {
    id: 'forward_fold', name: 'Standing Forward Fold (Uttanasana)', category: 'Yoga', icon: '🙇',
    description: 'Deep hamstring and spinal release folding from the hips.',
    muscles: ['Hamstrings', 'Lower Back'], equipment: 'Yoga Mat',
    steps: ['Stand with feet hip-width — inhale to lengthen spine', 'Exhale and hinge at hips — fold torso toward legs', 'Let head hang heavy', 'Hands can rest on floor, blocks, or hold opposite elbows', 'With each exhale, soften and fold a little deeper'],
    mistakes: ['Bending from the waist instead of the hips', 'Forcing straight legs — slight knee bend is fine', 'Strain in the neck — let the head completely relax']
  },
  {
    id: 'seated_forward_fold', name: 'Seated Forward Fold (Paschimottanasana)', category: 'Yoga', icon: '🧘',
    description: 'Deep seated hamstring and back-of-body stretch done on the floor.',
    muscles: ['Hamstrings', 'Lower Back', 'Calves'], equipment: 'Yoga Mat',
    steps: ['Sit with legs straight out in front — spine tall', 'Flex feet — toes pointing toward ceiling', 'Inhale and lengthen spine upward', 'Exhale and hinge forward from the hips — not the waist', 'Hold feet, ankles, or shins — breathe and gradually deepen'],
    mistakes: ['Rounding the spine excessively to reach further', 'Legs bending at the knee to reach the feet', 'Forcing the stretch — every exhale should release the tension gently']
  },
  {
    id: 'cobra_pose', name: 'Cobra Pose (Bhujangasana)', category: 'Yoga', icon: '🐍',
    description: 'Heart-opening backbend strengthening the spine and opening the chest.',
    muscles: ['Spine', 'Chest', 'Shoulders'], equipment: 'Yoga Mat',
    steps: ['Lie face down — hands under shoulders, elbows tucked in', 'Press tops of feet and thighs into the mat', 'Inhale and press palms down — lift chest off mat', 'Keep elbows slightly bent — use back muscles, not arms', 'Squeeze shoulder blades together and look forward'],
    mistakes: ['Arms fully straight — elbows should have a soft bend', 'Lifting too high and collapsing the lower back', 'Thighs lifting off the mat — roots must stay grounded']
  },
  {
    id: 'upward_dog', name: 'Upward Facing Dog (Urdhva Mukha Svanasana)', category: 'Yoga', icon: '🐕',
    description: 'Stronger backbend than cobra — thighs lift fully off the mat.',
    muscles: ['Spine', 'Chest', 'Triceps', 'Core'], equipment: 'Yoga Mat',
    steps: ['Lie face down — hands under shoulders', 'Press into palms — straighten arms fully', 'Lift chest, hips, and thighs all off the mat', 'Only hands and tops of feet touch the floor', 'Roll shoulders back and open the chest wide'],
    mistakes: ['Thighs not clearing the mat — this distinguishes it from cobra', 'Wrists bent sharply — distribute weight evenly', 'Head dropping back and compressing the neck']
  },
  {
    id: 'child_pose', name: "Child's Pose (Balasana)", category: 'Yoga', icon: '👶',
    description: 'Gentle resting pose releasing the lower back, hips, and shoulders.',
    muscles: ['Lower Back', 'Hips', 'Shoulders'], equipment: 'Yoga Mat',
    steps: ['Kneel on mat — big toes touching, knees wide or together', 'Sit back onto heels', 'Fold torso forward — arms extended in front or at sides', 'Rest forehead on the mat', 'Breathe into the back body and relax completely'],
    mistakes: ['Hips not reaching the heels — place a blanket under the seat', 'Tension held in the arms — let them be completely passive', 'Rushing through — this is a genuine rest pose']
  },
  {
    id: 'pigeon_pose', name: "Pigeon Pose (Eka Pada Rajakapotasana)", category: 'Yoga', icon: '🕊️',
    description: 'Deep glute and hip flexor stretch — the most effective hip opener in yoga.',
    muscles: ['Glutes', 'Hip Flexors', 'Piriformis'], equipment: 'Yoga Mat',
    steps: ['From downward dog — bring one knee forward toward the same-side wrist', 'Shin rests at an angle across the mat (more angle = more intense)', 'Back leg extends straight behind — hip square to the mat', 'Lower torso forward over front shin — rest on forearms or forehead', 'Hold 1-3 minutes — breathe into the tightness'],
    mistakes: ['Hips tilting to one side — use a block under the hip to square', 'Back foot sickling outward instead of pointing straight', 'Forcing the position before the body is warm']
  },
  {
    id: 'bridge_pose', name: 'Bridge Pose (Setu Bandha)', category: 'Yoga', icon: '🌉',
    description: 'Gentle backbend strengthening the glutes and opening the chest and hip flexors.',
    muscles: ['Glutes', 'Hamstrings', 'Spine'], equipment: 'Yoga Mat',
    steps: ['Lie on back — knees bent, feet flat, hip-width apart', 'Arms at sides, palms down', 'Inhale — press feet and arms into mat', 'Lift hips toward ceiling — squeeze glutes', 'Optionally clasp hands under back and roll shoulders together'],
    mistakes: ['Feet too far from hips — reduces glute activation', 'Knees splaying outward', 'Neck cranking up — keep it relaxed on the mat']
  },
  {
    id: 'wheel_pose', name: 'Wheel Pose (Urdhva Dhanurasana)', category: 'Yoga', icon: '⭕',
    description: 'Full backbend — the deepest spinal extension and chest opener in yoga.',
    muscles: ['Spine', 'Chest', 'Shoulders', 'Glutes'], equipment: 'Yoga Mat',
    steps: ['Lie on back — feet flat, knees bent, hands under shoulders fingers toward feet', 'Inhale — press into all four points and lift hips up', 'Straighten arms completely — head hangs', 'Press thighs parallel and firm — feet and hands pressing evenly', 'Hold for 5 breaths — exit slowly'],
    mistakes: ['Knees dropping outward', 'Wrists collapsing — align wrist fold lines parallel to the mat edge', 'Jumping in before building with bridge pose']
  },
  {
    id: 'seated_twist', name: 'Seated Spinal Twist (Ardha Matsyendrasana)', category: 'Yoga', icon: '🌀',
    description: 'Detoxifying spinal rotation improving thoracic mobility and digestion.',
    muscles: ['Obliques', 'Spine', 'Hips'], equipment: 'Yoga Mat',
    steps: ['Sit with legs straight — bend one knee and cross foot over the other thigh', 'Plant that foot flat on the floor outside the straight leg', 'Inhale and sit tall — exhale and rotate toward the bent knee', 'Hook opposite elbow outside the bent knee for leverage', 'Gaze over the back shoulder — hold 5 breaths each side'],
    mistakes: ['Collapsing the spine through the twist — always lengthen before rotating', 'Forcing the twist using arms before the body is ready']
  },
  {
    id: 'boat_pose', name: 'Boat Pose (Navasana)', category: 'Yoga', icon: '⛵',
    description: 'Challenging core compression hold strengthening the abs and hip flexors simultaneously.',
    muscles: ['Abs', 'Hip Flexors', 'Core'], equipment: 'Yoga Mat',
    steps: ['Sit on mat — knees bent, feet flat', 'Lean back slightly until you feel core engage', 'Lift feet — shins parallel to the floor (bent) or legs straight (advanced)', 'Arms extend parallel to the floor beside the legs', 'Hold and breathe — do not hold breath'],
    mistakes: ['Spine rounding heavily — try to remain as upright as possible', 'Holding breath — this is what creates unnecessary shaking', 'Going straight to full straight legs without core prep']
  },
  {
    id: 'camel_pose', name: 'Camel Pose (Ustrasana)', category: 'Yoga', icon: '🐪',
    description: 'Deep kneeling backbend opening the entire front body from hips to chin.',
    muscles: ['Hip Flexors', 'Chest', 'Spine'], equipment: 'Yoga Mat',
    steps: ['Kneel with hips over knees — thighs vertical', 'Tuck toes under (easier) or tops of feet flat', 'Place hands on lower back — fingers pointing down', 'Inhale — lift chest up and back', 'Reach hands toward heels — drop head back only if the neck is comfortable'],
    mistakes: ['Leading with the head and neck', 'Hips shifting forward of the knees', 'Compressing the lumbar spine — engage core throughout']
  },
  {
    id: 'half_moon', name: 'Half Moon Pose (Ardha Chandrasana)', category: 'Yoga', icon: '🌙',
    description: 'Standing balance pose combining lateral extension with a single-leg hold.',
    muscles: ['Glutes', 'Core', 'Hamstrings', 'Balance'], equipment: 'Yoga Mat',
    steps: ['Begin in triangle pose', 'Bend front knee slightly — shift weight onto that foot', 'Place hand on the floor or block 12 inches in front', 'Lift back leg to hip height — extend it strongly', 'Open hips to the side and extend the top arm toward the ceiling'],
    mistakes: ['Looking down — try to rotate gaze upward', 'Back leg not hip height — too low reduces hip opening', 'Weight concentrated only in the wrist — use all four fingers and the palm']
  },
  {
    id: 'eagle_pose', name: 'Eagle Pose (Garudasana)', category: 'Yoga', icon: '🦅',
    description: 'Standing balance combining crossed arm and leg wrap to open hips and shoulders.',
    muscles: ['Glutes', 'Shoulders', 'Hips', 'Balance'], equipment: 'Yoga Mat',
    steps: ['Stand on one leg — bend the standing knee slightly', 'Cross the opposite thigh over — try to hook the foot behind the calf', 'Cross arms at the elbows — wrap forearms and bring palms to face', 'Sink hips lower — lift elbows to shoulder height', 'Hold and breathe'],
    mistakes: ['Rushing to get the foot wrap instead of maintaining balance', 'Elbows below shoulder height — reduces shoulder opening', 'Standing leg locked']
  },
  {
    id: 'happy_baby', name: 'Happy Baby (Ananda Balasana)', category: 'Yoga', icon: '👶',
    description: 'Restorative inner groin and lower back release lying on the back.',
    muscles: ['Inner Groin', 'Lower Back', 'Hips'], equipment: 'Yoga Mat',
    steps: ['Lie on back — bring knees to chest', 'Open knees wide — one knee at each side of your torso', 'Hold the outer edges of the feet — or inside arches', 'Flex feet — press soles toward ceiling', 'Rock gently side to side for a lower back massage'],
    mistakes: ['Neck lifting off the mat', 'Tailbone lifting — keep hips grounded', 'Holding rigidly — allow the body to rock and release']
  },
  {
    id: 'legs_up_wall', name: 'Legs Up the Wall (Viparita Karani)', category: 'Yoga', icon: '🧘',
    description: 'Gentle inversion promoting recovery, circulation and relaxation of the nervous system.',
    muscles: ['Hamstrings', 'Lower Back'], equipment: 'Yoga Mat',
    steps: ['Sit sideways against a wall — roll onto back and swing legs up the wall', 'Hips as close to the wall as comfortable', 'Arms out to sides — palms facing up', 'Close eyes and breathe naturally', 'Hold 5-15 minutes for maximum restorative effect'],
    mistakes: ['Hips too far from the wall — reduces the inversion benefit', 'Forcing extremely tight hamstrings into a straight-leg position — slightly bend if needed', 'Using this pose when contraindicated (e.g., glaucoma, high blood pressure)']
  },
  {
    id: 'corpse_pose', name: 'Corpse Pose / Savasana', category: 'Yoga', icon: '💤',
    description: 'Final resting pose — the hardest and most important pose in yoga.',
    muscles: ['Full Body'], equipment: 'Yoga Mat',
    steps: ['Lie flat on back — feet fall naturally to the sides', 'Arms alongside but away from body — palms face up', 'Close your eyes and breathe naturally', 'Consciously relax every body part from toes to crown', 'Remain still for 5-10 minutes — do not sleep'],
    mistakes: ['Leaving early — the nervous system needs at least 5 minutes to integrate the practice', 'Crossing arms or legs — creates subtle tension', 'Checking phone or fidgeting — the practice truly begins here']
  },
  {
    id: 'cat_cow', name: 'Cat-Cow Stretch (Marjaryasana-Bitilasana)', category: 'Yoga', icon: '🐄',
    description: 'Dynamic spinal mobilisation flowing between flexion and extension, perfect for warming up the back.',
    muscles: ['Spine', 'Core', 'Neck'], equipment: 'Yoga Mat',
    steps: ['Start on all fours — wrists below shoulders, knees below hips', 'Inhale — drop belly, lift tailbone and head (Cow)', 'Exhale — round spine toward ceiling, tuck chin and tailbone (Cat)', 'Flow smoothly between the two positions', 'Repeat 10-15 times to fully mobilise the spine'],
    mistakes: ['Moving from the neck only — full spine should wave', 'Holding breath — the breath drives the movement', 'Moving too fast — slow rhythmic movement is far more effective']
  },
  {
    id: 'lizard_pose', name: 'Lizard Pose (Utthan Pristhasana)', category: 'Yoga', icon: '🦎',
    description: 'Deep hip flexor and groin opener in a low lunge position.',
    muscles: ['Hip Flexors', 'Groin', 'Hamstrings'], equipment: 'Yoga Mat',
    steps: ['Step one foot outside the same-side hand into a low lunge', 'Lower the back knee to the mat', 'Both hands inside the front foot on the mat', 'Gradually lower forearms toward the mat for a deeper stretch', 'Keep back long and hips sinking toward the floor'],
    mistakes: ['Front knee caving inward', 'Front foot too close to the center — prevents the hip from opening', 'Rushing to forearms before the hips are open enough']
  },
  {
    id: 'reclined_pigeon', name: 'Reclined Pigeon (Figure 4 Stretch)', category: 'Yoga', icon: '↩️',
    description: 'Gentle accessible alternative to pigeon pose — great for all levels.',
    muscles: ['Glutes', 'Piriformis', 'Hips'], equipment: 'Yoga Mat',
    steps: ['Lie on back — knees bent, feet flat', 'Cross one ankle over the opposite thigh just below the knee', 'Flex the crossed foot', 'Draw both legs toward chest — thread hands around or behind the lower thigh', 'Hold and breathe — repeat on the other side'],
    mistakes: ['Foot not flexed — risks knee strain', 'Craning neck forward — let head rest on mat', 'Not drawing legs close enough to feel the stretch']
  },
  {
    id: 'wide_angle_forward_fold', name: 'Wide Angle Forward Fold (Upavistha Konasana)', category: 'Yoga', icon: '🦋',
    description: 'Wide-legged seated stretch for inner thighs, hamstrings and lower back simultaneously.',
    muscles: ['Adductors', 'Hamstrings', 'Lower Back'], equipment: 'Yoga Mat',
    steps: ['Sit with legs spread wide in a V shape', 'Flex feet — toes pointing upward', 'Inhale and lengthen spine', 'Walk hands forward between legs — fold from the hips', 'Eventually rest chest on the floor between the legs (advanced)'],
    mistakes: ['Posterior pelvic tilt — sit on a folded blanket if the back rounds severely', 'Legs collapsing inward — press outer thighs down', 'Pushing too aggressively — inner thigh muscles can strain']
  },
  {
    id: 'supported_shoulder_stand', name: 'Shoulderstand (Sarvangasana)', category: 'Yoga', icon: '🙃',
    description: 'Inversion stimulating the thyroid, calming the mind, and developing core strength.',
    muscles: ['Core', 'Neck', 'Shoulders'], equipment: 'Yoga Mat',
    steps: ['Lie on back — swing legs overhead (use a folded blanket under shoulders)', 'Support lower back with both hands', 'Extend legs straight toward the ceiling', 'Weight on shoulders and upper arms — NOT the neck', 'Hold 1-3 minutes — breathe evenly'],
    mistakes: ['Turning the head while in the pose — serious neck injury risk', 'Weight on the neck instead of the shoulders — use blankets to elevate properly', 'Not using the core — allow the legs to passively hang instead of actively pointing']
  },
  {
    id: 'revolved_triangle', name: 'Revolved Triangle (Parivrtta Trikonasana)', category: 'Yoga', icon: '🔺',
    description: 'Balance, twist and hamstring stretch combined — one of the most challenging standing poses.',
    muscles: ['Obliques', 'Hamstrings', 'Balance', 'Spine'], equipment: 'Yoga Mat',
    steps: ['Stand with feet 3 feet apart', 'Front foot points forward, back foot at 45 degrees', 'Inhale and lengthen spine', 'Exhale and rotate torso — bring opposite hand to outside or inside of front foot', 'Extend the top arm upward and gaze toward it'],
    mistakes: ['Hips rotating open instead of staying square', 'The lower back rounding to reach the pose', 'Hand on the floor too far from the foot']
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
  },
  {
    id: 'treadmill_run', name: 'Treadmill Running', category: 'Cardio', icon: '🏃',
    description: 'Controlled paced running on a treadmill for precise heart rate and pace management.',
    muscles: ['Heart', 'Legs', 'Core'], equipment: 'Machine',
    steps: ['Warm up at brisk walking pace for 3-5 minutes', 'Gradually increase speed to your target zone', 'Maintain upright posture — slight forward lean', 'Arms swing naturally from the shoulder', 'Cool down by reducing speed gradually over 3-5 minutes'],
    mistakes: ['Holding the handrails — removes most of the caloric burn', 'Landing with a heavy heel strike', 'Setting incline to zero — 1% better mimics outdoor running', 'Sudden speed jumps without gradual progression']
  },
  {
    id: 'cycling_stationary', name: 'Stationary Bike', category: 'Cardio', icon: '🚴',
    description: 'Low-impact cycling that is gentle on the joints while providing strong cardio stimulus.',
    muscles: ['Heart', 'Quads', 'Glutes', 'Calves'], equipment: 'Machine',
    steps: ['Set seat height so knee has a slight bend at the bottom of the pedal stroke', 'Set resistance to feel some push-back — not just spinning freely', 'Maintain cadence of 70-100 RPM', 'Keep back straight and avoid hunching', 'Use interval or steady-state programs for variety'],
    mistakes: ['Seat too low — creates knee strain', 'No resistance — no cardiovascular or muscular benefit', 'Hunching over the handlebars — compresses breathing']
  },
  {
    id: 'rowing_machine', name: 'Rowing Machine (Ergometer)', category: 'Cardio', icon: '🚣',
    description: 'Full-body cardio hitting 86% of all muscles — legs, back, core and arms all working.',
    muscles: ['Back', 'Legs', 'Core', 'Arms', 'Heart'], equipment: 'Machine',
    steps: ['Sit on the erg — feet strapped in, knees bent (the catch)', 'Drive legs straight first — do not pull arms simultaneously', 'Once legs are almost straight, lean back 5-15 degrees', 'Pull handle to lower chest — drive elbows wide', 'Extend arms first, then hinge forward, then bend knees (the return)'],
    mistakes: ['Pulling with arms first — legs drive 60% of the power', 'Lunging forward before the drive sequence', 'Back rounded — serious lumbar injury risk', 'Yanking the handle — smooth powerful strokes are more efficient']
  },
  {
    id: 'elliptical', name: 'Elliptical Trainer', category: 'Cardio', icon: '🔁',
    description: 'Low-impact full-body cardio that mimics running motion without the joint stress.',
    muscles: ['Heart', 'Legs', 'Glutes', 'Chest', 'Back'], equipment: 'Machine',
    steps: ['Step onto pedals — grip handles lightly', 'Begin pedalling in a smooth oval motion', 'Push and pull the handles to engage upper body', 'Keep core engaged — do not lean on the machine', 'Vary resistance and direction (forward/reverse) for a different muscle challenge'],
    mistakes: ['Hands just resting on handles without pushing/pulling', 'Leaning heavily on the handles — unloads the legs', 'Going too fast at zero resistance — no benefit']
  },
  {
    id: 'stairmaster', name: 'Stairmaster / Step Mill', category: 'Cardio', icon: '🪜',
    description: 'Simulated stair climbing that builds the glutes, quads and calves while burning high calories.',
    muscles: ['Glutes', 'Quads', 'Calves', 'Heart'], equipment: 'Machine',
    steps: ['Step on — set speed to a moderate challenge', 'Stand upright — minimal contact on handrails', 'Step with full foot on each step — engage the glute', 'Maintain upright posture throughout', 'Use glute drive on each step — not just the calf to push off'],
    mistakes: ['Leaning heavily on the side rails — reduces effort by up to 40%', 'Very small steps — does not load the glute properly', 'Hips swinging side to side']
  },
  {
    id: 'jump_rope', name: 'Jump Rope (Skipping)', category: 'Cardio', icon: '🪢',
    description: 'Elite cardio tool used by boxers worldwide — high calorie burn and coordination development.',
    muscles: ['Calves', 'Shoulders', 'Core', 'Heart'], equipment: 'None',
    steps: ['Hold handles at hip level — rope behind you', 'Swing rope over head and jump with both feet simultaneously', 'Land on balls of feet — keep jumps small and efficient', 'Wrists do the rotation — not the whole arm', 'Progress to double-unders, alternating feet, or boxer step'],
    mistakes: ['Jumping too high — only need to clear the rope', 'Arms swinging wide — keeps rope arc from staying consistent', 'Landing flat-footed — high impact and breaks rhythm']
  },
  {
    id: 'hiit_sprints', name: 'HIIT Sprint Intervals', category: 'Cardio', icon: '⚡',
    description: 'Maximum intensity sprint intervals alternating with recovery — burns fat for hours post-workout.',
    muscles: ['Heart', 'Legs', 'Glutes', 'Core'], equipment: 'None',
    steps: ['Warm up for 5 minutes at easy jog', 'Sprint at 90-100% max effort for 20-30 seconds', 'Walk or slow jog for 40-60 seconds recovery', 'Repeat 6-10 rounds', 'Cool down 5 minutes easy walking and stretching'],
    mistakes: ['Skipping warm-up — high injury risk with cold muscles at max effort', 'Not going hard enough — HIIT only works when intensity is truly maximum', 'Too many rounds before building base  — quality over quantity']
  },
  {
    id: 'battle_ropes', name: 'Battle Ropes', category: 'Cardio', icon: '🌊',
    description: 'Upper body dominant HIIT tool delivering intense cardiovascular and shoulder conditioning.',
    muscles: ['Shoulders', 'Core', 'Arms', 'Heart'], equipment: 'None',
    steps: ['Stand with athletic stance — knees slightly bent, core braced', 'Hold one end of each rope', 'Create alternating waves — one arm up as the other goes down', 'Keep the waves reaching the anchor point', 'Vary with slams, circles, or simultaneous waves for different stimuli'],
    mistakes: ['Letting waves die before reaching the anchor', 'Upright posture with legs straight — remove the athletic base', 'Only alternating — mix in slams and circles every set']
  },
  {
    id: 'box_jumps', name: 'Box Jumps', category: 'Cardio', icon: '📦',
    description: 'Explosive plyometric jump onto a box building power, fast-twitch muscle and cardiovascular fitness.',
    muscles: ['Quads', 'Glutes', 'Calves', 'Heart'], equipment: 'Machine',
    steps: ['Stand facing the box — feet hip-width', 'Swing arms back and load the hips', 'Explode upward — swing arms forward for momentum', 'Land softly on top with both feet on the box simultaneously', 'Step down (do not jump down repeatedly) — reset and repeat'],
    mistakes: ['Landing with stiff knees — absorb through the hips', 'Box too high before mastering lower heights', 'Jumping back down repeatedly — high Achilles tendon injury risk']
  },
  {
    id: 'squat_jumps', name: 'Jump Squats', category: 'Cardio', icon: '🦘',
    description: 'Plyometric squat that adds explosive power and spikes heart rate rapidly.',
    muscles: ['Quads', 'Glutes', 'Heart'], equipment: 'Bodyweight',
    steps: ['Stand with feet shoulder-width apart', 'Lower into a squat — arms swing back', 'Explode upward — jump as high as possible', 'Arms swing forward on the way up', 'Land softly — immediately descend into the next squat'],
    mistakes: ['Shallow squat before the jump — reduces power output', 'Landing with stiff legs — heavy joint stress', 'Letting chest collapse on the take-off']
  },
  {
    id: 'cycling_outdoor', name: 'Outdoor Cycling', category: 'Cardio', icon: '🚵',
    description: 'Real-world cycling providing varied terrain, fresh air and sustained moderate-high cardio.',
    muscles: ['Heart', 'Quads', 'Glutes', 'Hamstrings', 'Calves'], equipment: 'None',
    steps: ['Adjust seat so knee has a slight bend at full extension', 'Warm up with flat terrain for 5-10 minutes', 'Use gears to maintain a cadence of 70-90 RPM', 'Attack hills from a seated position using lower gears', 'Cool down — spin easy for the final 5 minutes'],
    mistakes: ['Seat too low — power loss and knee strain', 'Mashing big gears at low cadence — hard on the joints', 'No helmet — safety essential']
  },
  {
    id: 'swimming_laps', name: 'Swimming (Laps)', category: 'Cardio', icon: '🏊',
    description: 'The most joint-friendly full-body cardio — works every muscle while breathing is a constant challenge.',
    muscles: ['Full Body', 'Heart', 'Lungs'], equipment: 'None',
    steps: ['Warm up with 2 easy lengths freestyle', 'Choose a stroke — freestyle, breaststroke, backstroke or butterfly', 'Focus on technique over speed — reduce drag', 'Breathe rhythmically — every 2-3 strokes for freestyle', 'Alternate strokes across sets for variety and full-body balance'],
    mistakes: ['Head lifted too high — sinks hips and increases drag', 'Short choppy strokes — reach fully and pull through to the hip', 'Skipping flip turns — add 30% more efficiency over time']
  },
  {
    id: 'walking_brisk', name: 'Brisk Walking', category: 'Cardio', icon: '🚶',
    description: 'The most underrated fat-burning activity — sustainable, low-impact and highly effective.',
    muscles: ['Heart', 'Legs', 'Glutes'], equipment: 'None',
    steps: ['Walk at a pace that elevates breathing — can speak in short sentences', 'Arms swing bent at 90 degrees — do not cross the body midline', 'Stride naturally — heel to midfoot landing', 'Maintain upright posture — do not look down', 'Target 30-60 minutes at 60-70% max heart rate'],
    mistakes: ['Walking too slowly for cardiovascular benefit', 'Slouching or looking at the phone', 'Arms hanging at sides — reduces caloric burn by 10%']
  },
  {
    id: 'incline_walk', name: 'Incline Treadmill Walk (12-3-30)', category: 'Cardio', icon: '🏔️',
    description: 'Viral high-incline walking protocol delivering serious glute and cardio results.',
    muscles: ['Glutes', 'Hamstrings', 'Heart', 'Calves'], equipment: 'Machine',
    steps: ['Set treadmill incline to 12%', 'Set speed to 3 mph', 'Walk for 30 minutes', 'Do not hold the handrails — let arms swing freely', 'Maintain upright posture — do not hunch forward'],
    mistakes: ['Holding handrails — removes most of the challenge and caloric burn', 'Starting at 12-3-30 without base fitness — work up gradually', 'Leaning forward into the incline — stand tall throughout']
  },
  {
    id: 'shadow_boxing', name: 'Shadow Boxing', category: 'Cardio', icon: '🥊',
    description: 'Boxing drill requiring zero equipment that trains coordination, agility and cardio simultaneously.',
    muscles: ['Shoulders', 'Core', 'Heart', 'Legs'], equipment: 'None',
    steps: ['Get into boxing stance — dominant foot back', 'Throw combinations — jab, cross, hook, uppercut', 'Move your feet constantly — do not stand still', 'Rotate from the hips on every power punch', 'Use 3-minute rounds with 1-minute rest like a boxing match'],
    mistakes: ['Punching with only the arm — rotation generates power and burns more calories', 'Flat feet — stay light on the balls of your feet', 'Ignoring defense — add slips and weaves for full-body movement']
  },
  {
    id: 'kettlebell_swing', name: 'Kettlebell Swings', category: 'Cardio', icon: '🔔',
    description: 'Hip-hinge explosive movement combining strength and cardio into one powerful exercise.',
    muscles: ['Glutes', 'Hamstrings', 'Core', 'Shoulders', 'Heart'], equipment: 'Kettlebell',
    steps: ['Stand with feet slightly wider than hip-width, kettlebell on the floor ahead', 'Hinge forward and grip handle with both hands', 'Hike the bell back between the legs like a hiking snap', 'Drive hips forward explosively — let the bell float to chest height', 'Let it swing back — re-hinge immediately and repeat'],
    mistakes: ['Squatting instead of hinging — this is a hinge exercise', 'Using the arms to lift the bell — arms are just a rope', 'Hyperextending the lower back at the top — squeeze glutes and stand tall']
  },
  {
    id: 'sled_push', name: 'Sled Push', category: 'Cardio', icon: '🛷',
    description: 'Brutal full-body conditioning pushing a weighted sled — no eccentric, all push.',
    muscles: ['Quads', 'Glutes', 'Core', 'Shoulders', 'Heart'], equipment: 'Machine',
    steps: ['Load sled with appropriate weight for your goal (heavy = strength, light = conditioning)', 'Grip handles — lean body at 45 degrees into the sled', 'Drive hard off alternate feet — short powerful steps', 'Keep core braced throughout', 'Push for 20-40 meters per set'],
    mistakes: ['Standing too upright — reduces power transfer into the sled', 'Short choppy steps with bent knees — long powerful drives are more effective', 'Loaded too heavy to maintain a lean and speed']
  },
  {
    id: 'assault_bike', name: 'Assault Bike / Air Bike', category: 'Cardio', icon: '💨',
    description: 'The most brutally effective cardio machine — resistance increases the harder you push.',
    muscles: ['Full Body', 'Heart'], equipment: 'Machine',
    steps: ['Set up seat height so knee has slight bend at the bottom', 'Push and pull handles simultaneously with pedalling', 'Drive hard — max effort intervals are most effective', 'For HIIT: 20 seconds max / 40 seconds rest x 8-10 rounds', 'For steady-state: maintain a pace that keeps breathing elevated'],
    mistakes: ['Leaning too far forward — reduces leg drive', 'Arms doing more than legs — should be equal effort', 'Going too steady — the bike rewards maximum effort intervals']
  },
  {
    id: 'hiit_tabata', name: 'Tabata Protocol', category: 'Cardio', icon: '⏱️',
    description: 'Science-backed 4-minute HIIT protocol: 20 seconds on / 10 seconds off × 8 rounds.',
    muscles: ['Full Body', 'Heart'], equipment: 'None',
    steps: ['Choose any full-body movement: burpees, squat jumps, mountain climbers', '20 seconds absolute maximum effort', '10 seconds complete rest', 'Repeat 8 rounds (4 minutes total)', 'Rest 1 minute and repeat with a different exercise'],
    mistakes: ['Not going truly maximum in the 20-second windows', 'Choosing a movement that is too technical — breaks down when fatigued', 'Stopping at 4 minutes — 3-4 rounds of Tabata is a full workout']
  },
  {
    id: 'dance_cardio', name: 'Dance Cardio / Zumba', category: 'Cardio', icon: '💃',
    description: 'High-energy dance-based cardio improving coordination, mood and cardiovascular fitness.',
    muscles: ['Full Body', 'Heart'], equipment: 'None',
    steps: ['Follow an instructor or put on an upbeat playlist', 'Move to the beat — improvise or follow choreography', 'Put effort into every move — exaggerate ranges of motion', 'Keep moving between songs — keep heart rate elevated', 'Aim for 30-45 minutes of sustained movement'],
    mistakes: ['Moving without intensity — dancing softly burns very little', 'Self-consciousness stopping full range movement', 'Stopping during difficult sequences instead of improvising']
  },
  {
    id: 'hiking', name: 'Hiking', category: 'Cardio', icon: '🥾',
    description: 'Sustained outdoor cardio over varied terrain — excellent for glutes, quads and mental health.',
    muscles: ['Glutes', 'Quads', 'Calves', 'Heart'], equipment: 'None',
    steps: ['Wear proper footwear with ankle support', 'Start on flat trails before progressing to elevation gain', 'Use trekking poles for longer distances and knee protection', 'Maintain a pace where breathing is elevated but conversational', 'Hydrate consistently regardless of thirst feeling'],
    mistakes: ['Inappropriate footwear — leading cause of hiking injuries', 'Insufficient water — estimate 500ml per hour minimum', 'Descending too fast — knees take 4x bodyweight on steep downhills']
  },
  {
    id: 'jumping_lunges', name: 'Jumping Lunges', category: 'Cardio', icon: '🦘',
    description: 'Plyometric lunge alternating legs in mid-air for power and cardio conditioning.',
    muscles: ['Quads', 'Glutes', 'Heart'], equipment: 'Bodyweight',
    steps: ['Start in a lunge position', 'Swing arms and push off both feet to jump', 'Switch legs in mid-air', 'Land softly in a lunge on the opposite leg', 'Immediately descend and repeat'],
    mistakes: ['Landing with a stiff knee instead of absorbing the impact', 'Front knee diving past the toes on landing', 'Minimal jump height — the real benefit needs explosive take-off']
  },
  {
    id: 'bear_crawl_cardio', name: 'Bear Crawl Sprint', category: 'Cardio', icon: '🐻',
    description: 'Fast bear crawl for distance — a savage full-body conditioning drill.',
    muscles: ['Core', 'Shoulders', 'Quads', 'Heart'], equipment: 'Bodyweight',
    steps: ['Get into the bear crawl position — knees hovering', 'Crawl forward as fast as possible maintaining form', 'Move opposite arm and leg simultaneously', 'Keep hips level — do not let them hike upward', 'Sprint crawl 20-30 meters — rest and repeat'],
    mistakes: ['Hips rising — slows movement and removes core demand', 'Knees dragging the floor', 'Same-side arm and leg moving together — breaks the pattern']
  },
  {
    id: 'cycling_spin_class', name: 'Indoor Spin Class', category: 'Cardio', icon: '🚴',
    description: 'High-energy group cycling class combining music, intervals and motivation for maximum output.',
    muscles: ['Heart', 'Quads', 'Glutes', 'Calves'], equipment: 'Machine',
    steps: ['Set up bike properly before class — seat and handlebar height', 'Follow instructor cues for resistance and cadence', 'Climbs (heavy resistance/slow cadence) develop strength', 'Sprints (light resistance/fast cadence) develop cardio', 'Recover between intervals — do not max out on every block'],
    mistakes: ['Ignoring resistance entirely — fake sprints at lower resistance', 'Coming out of the saddle too early — build the strength first', 'Using momentum rather than leg power during sprints']
  },
  {
    id: 'rowing_ergometer_intervals', name: 'Row Machine Intervals', category: 'Cardio', icon: '🚣',
    description: 'Powerful interval protocol on the rower alternating maximum effort with active rest.',
    muscles: ['Full Body', 'Heart'], equipment: 'Machine',
    steps: ['Warm up with 5 minutes easy rowing', 'Row 500m or 1 minute at maximum sustainable power', 'Rest 2 minutes easy paddling', 'Repeat 4-6 rounds', 'Record your split times — aim to maintain consistency across all rounds'],
    mistakes: ['Dying off heavily in later rounds — pace yourself slightly slower in round 1', 'Using arms and back without leg drive', 'Not tracking splits — numbers are how you measure and improve']
  }
];

export const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Abs', 'Home', 'Yoga', 'Cardio', 'Calisthenics', 'Olympic'];
export const EQUIPMENT = ['Dumbbell', 'Barbell', 'Cable', 'Machine', 'Bodyweight', 'Kettlebell', 'Yoga Mat', 'Chair', 'Sofa', 'None'];
