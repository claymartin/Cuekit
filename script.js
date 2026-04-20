// Cue Kit JavaScript for interactivity

// Update slider value displays in real-time
function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const valueSpan = document.getElementById(valueId);
    slider.addEventListener('input', function() {
        valueSpan.textContent = slider.value;
    });
}

// Initialize slider updates for cue-plan.html
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('confidence')) {
        updateSliderValue('confidence', 'confidence-value');
        updateSliderValue('anxiety', 'anxiety-value');
        updateSliderValue('focus', 'focus-value');
        updateSliderValue('tension', 'tension-value');
    }
});

// Cue definitions
const cues = {
    breathing: { color: 'blue', name: 'Breathing: Calm your body and reset after mistakes.', fullName: 'Breathing' },
    imagery: { color: 'yellow', name: 'Imagery: Picture yourself executing plays before they happen.', fullName: 'Imagery' },
    selfTalk: { color: 'orange', name: 'Self-Talk: Use short phrases to boost confidence and cut through negative thoughts.', fullName: 'Self-Talk' },
    focusCues: { color: 'purple', name: 'Focus Cues: Lock attention onto the one thing that matters this rally.', fullName: 'Focus Cues' },
    muscleRelaxation: { color: 'brown', name: 'Muscle Relaxation: Release tension so your body moves freely.', fullName: 'Muscle Relaxation' },
    resetRoutine: { color: 'white', name: 'Reset Routine: Flush the last point and start the next one clean.', fullName: 'Reset Routine' }
};

// Generate cue plan logic
function generateCuePlan() {
    const confidence = parseInt(document.getElementById('confidence').value);
    const anxiety = parseInt(document.getElementById('anxiety').value);
    const focus = parseInt(document.getElementById('focus').value);
    const tension = parseInt(document.getElementById('tension').value);
    const challenge = document.querySelector('input[name="challenge"]:checked')?.value;
    const preference = document.querySelector('input[name="preference"]:checked')?.value;

    if (!challenge || !preference) {
        alert('Please answer all questions.');
        return;
    }

    // Determine primary cue based on ratings
    let primaryKey;
    if (anxiety >= 4) {
        primaryKey = 'breathing';
    } else if (tension >= 4) {
        primaryKey = 'muscleRelaxation';
    } else if (confidence <= 2) {
        primaryKey = 'selfTalk';
    } else if (focus <= 2) {
        primaryKey = 'focusCues';
    } else {
        primaryKey = 'resetRoutine';
    }

    // Determine secondary cue based on challenge
    let secondaryKey;
    switch (challenge) {
        case 'overthinking':
            secondaryKey = 'imagery';
            break;
        case 'tension':
            secondaryKey = 'muscleRelaxation';
            break;
        case 'focus':
            secondaryKey = 'focusCues';
            break;
        case 'confidence':
            secondaryKey = 'selfTalk';
            break;
        default:
            secondaryKey = 'resetRoutine';
    }

    // Avoid duplicate cues
    if (secondaryKey === primaryKey) {
        secondaryKey = Object.keys(cues).find(key => key !== primaryKey);
    }

    // Determine routine based on preference
    let routine;
    if (preference === 'structured') {
        routine = 'Perform a 3-step reset routine between points: 1. Take a deep breath (breathing cue), 2. Visualize the next play (imagery cue), 3. Affirm "I\'ve got this" (self-talk cue).';
    } else {
        routine = 'Use your primary and secondary cues flexibly as needed between points.';
    }

    // Display the plan
    document.getElementById('primary-cue').textContent = cues[primaryKey].name;
    document.getElementById('secondary-cue').textContent = cues[secondaryKey].name;
    document.getElementById('routine').textContent = routine;

    // Display colors
    const cueColorsDiv = document.getElementById('cue-colors');
    cueColorsDiv.innerHTML = '';
    const primaryDiv = document.createElement('div');
    primaryDiv.className = `cue-card cue-${cues[primaryKey].color}`;
    primaryDiv.textContent = `${cues[primaryKey].color.toUpperCase()} - ${cues[primaryKey].fullName}`;
    cueColorsDiv.appendChild(primaryDiv);

    const secondaryDiv = document.createElement('div');
    secondaryDiv.className = `cue-card cue-${cues[secondaryKey].color}`;
    secondaryDiv.textContent = `${cues[secondaryKey].color.toUpperCase()} - ${cues[secondaryKey].fullName}`;
    cueColorsDiv.appendChild(secondaryDiv);

    document.getElementById('cue-plan-output').style.display = 'block';
}

// Attach event listener to generate button
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-plan');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateCuePlan);
    }
});