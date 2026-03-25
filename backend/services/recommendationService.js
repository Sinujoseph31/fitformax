const calculateTrend = (weights, goal) => {
    if (!weights || weights.length < 3) return null;

    const current = weights[0].value;
    const oldest = weights[weights.length - 1].value;
    const diff = current - oldest;
    
    const startDate = new Date(weights[weights.length - 1].timestamp);
    const endDate = new Date(weights[0].timestamp);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    let durationText = '';
    if (diffDays >= 30) {
        const months = Math.floor(diffDays / 30);
        durationText = `${months} month${months > 1 ? 's' : ''}`;
    } else if (diffDays >= 7) {
        const weeks = Math.floor(diffDays / 7);
        durationText = `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
        durationText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }

    const absDiff = parseFloat(Math.abs(diff).toFixed(1));
    const diffText = `${absDiff} kg`;

    let trend = 'stable';
    let status = 'AI Insight';
    let message = '';
    let action = '';

    if (Math.abs(diff) >= 2 && diffDays <= 4) {
        return {
            status: 'Check Data',
            message: `Your weight shifted by ${diffText} over the past ${durationText} (Likely water fluctuation)`,
            trend: diff > 0 ? 'increasing' : 'decreasing',
            diff: parseFloat(diff.toFixed(2)),
            action: 'Stay consistent, natural fluctuations happen',
            timeframe: durationText
        };
    }

    if (diff > 0.5) {
        trend = 'increasing';
        if (goal === 'Muscle Gain') {
            status = 'On Track';
            message = `You've gained ${diffText} over the past ${durationText} — solid progress`;
            action = 'Maintain calorie surplus & protein intake';
        } else {
            status = 'Slow Progress';
            message = `You've gained ${diffText} over the past ${durationText} — watch your intake`;
            action = 'Watch your carbs and increase daily steps';
        }
    } else if (diff < -0.5) {
        trend = 'decreasing';
        if (goal === 'Fat Loss') {
            status = 'On Track';
            message = `You've lost ${diffText} over the past ${durationText} — good consistency`;
            action = 'Stay consistent with your routine';
        } else {
            status = 'Slow Progress';
            message = `You've lost ${diffText} over the past ${durationText} — eat more protein`;
            action = 'Increase caloric intake to avoid muscle loss';
        }
    } else {
        trend = 'stable';
        message = `You've maintained your weight over the past ${durationText} — good stability`;
        if (goal === 'Maintain') {
            status = 'On Track';
            action = 'Keep doing exactly what you are doing';
        } else {
            status = 'Stagnant';
            action = 'Adjust your calories or routine intensity to break the plateau';
        }
    }

    return { status, message, trend, diff: parseFloat(diff.toFixed(2)), action, timeframe: durationText };
};

const getDietPlan = (goal, weight) => {
    const isHeavy = weight > 85; 
    const dietPlans = {
        'Fat Loss': {
            breakfast: isHeavy ? '2 Besan chillas with mint chutney' : 'Poha with sprouts',
            lunch: isHeavy ? '1 Roti + 1 bowl Dal + large Cucumber salad' : '1 Roti + 1 bowl Dal + Sabzi',
            snack: 'Roasted Makhana / Black chana chaat',
            dinner: 'Grilled Paneer Salad / Dal soup with roasted veggies'
        },
        'Muscle Gain': {
            breakfast: isHeavy ? '4 Eggs bhurji + Oats' : 'Paneer sandwich + Banana shake',
            lunch: isHeavy ? '3 Rotis + Soya chunks curry + Thick Dal' : '2 Rotis + Soya chunks curry + Rice',
            snack: 'Peanut butter toast + Whey protein / Curd with dry fruits',
            dinner: 'Chicken curry / Paneer tikka + 2 Rotis'
        },
        'Maintain': {
            breakfast: 'Oats upma / Idli sambari with coconut chutney',
            lunch: '2 Rotis + Dal + Seasonal Sabzi + Curd',
            snack: 'Handful of almonds & walnuts + Green Tea',
            dinner: 'Khichdi with kadhi / Mix veg brown rice'
        }
    };
    return dietPlans[goal] || dietPlans['Maintain'];
};

const getWorkoutPlan = (goal) => {
    const rotation = Math.floor(Math.random() * 2); 
    const workoutPlans = {
        'Fat Loss': {
            focus: 'High Intensity & Cardio Focus',
            schedule: rotation === 0 ? [
                'Monday: HIIT (30 mins) + Core',
                'Wednesday: Full Body Circuit',
                'Friday: LISS Cardio (45 mins brisk walk/jog)',
                'Saturday: Active Recovery (Yoga / Stretching)'
            ] : [
                'Tuesday: Tabata Intervals (20 mins)',
                'Thursday: Bodyweight Strength circuit',
                'Saturday: Long Run / Swim (45 mins)',
                'Sunday: Mobility Flow'
            ]
        },
        'Muscle Gain': {
            focus: 'Hypertrophy & Heavy Lifts',
            schedule: rotation === 0 ? [
                'Monday: Push (Chest, Shoulders, Triceps)',
                'Tuesday: Pull (Back, Biceps)',
                'Thursday: Legs & Core',
                'Friday: Upper Body Focus',
                'Saturday: Lower Body Focus'
            ] : [
                'Monday: Heavy Chest & Triceps',
                'Wednesday: Heavy Back & Biceps',
                'Friday: Heavy Quads & Calves',
                'Saturday: Hamstrings & Shoulders',
                'Sunday: Core & Arms Isolation'
            ]
        },
        'Maintain': {
            focus: 'Balanced Strength & Conditioning',
            schedule: rotation === 0 ? [
                'Monday: Upper Body Strength',
                'Wednesday: Lower Body Strength',
                'Friday: Full Body Functional Training'
            ] : [
                'Tuesday: 5K Run + Core',
                'Thursday: Kettlebell Full Body',
                'Saturday: Yoga & Calisthenics'
            ]
        }
    };
    return workoutPlans[goal] || workoutPlans['Maintain'];
};

module.exports = { calculateTrend, getDietPlan, getWorkoutPlan };
