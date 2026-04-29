// ==================== CALCULATOR FUNCTIONS ====================

let calcDisplay = document.getElementById('calcDisplay');
let calcExpression = '';

function appendToCalc(value) {
    calcExpression += value;
    calcDisplay.value = calcExpression;
}

function calculateResult() {
    try {
        let result = eval(calcExpression);
        calcDisplay.value = result;
        calcExpression = result.toString();
    } catch (error) {
        calcDisplay.value = 'Error';
        calcExpression = '';
    }
}

function clearCalc() {
    calcExpression = '';
    calcDisplay.value = '';
}

// ==================== UNIT CONVERTER FUNCTIONS ====================

// Conversion factors to base units
const conversionFactors = {
    length: {
        m: 1,
        km: 0.001,
        mi: 0.000621371,
        ft: 3.28084
    },
    weight: {
        kg: 1,
        lb: 2.20462,
        oz: 35.274,
        g: 1000
    },
    temperature: {
        C: (val) => val,
        F: (val) => (val * 9/5) + 32,
        K: (val) => val + 273.15
    }
};

const lengthUnits = ['m', 'km', 'mi', 'ft'];
const weightUnits = ['kg', 'lb', 'oz', 'g'];
const temperatureUnits = ['C', 'F', 'K'];

function updateConversionUnits() {
    const conversionType = document.getElementById('conversionType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    let units = [];
    if (conversionType === 'length') units = lengthUnits;
    else if (conversionType === 'weight') units = weightUnits;
    else if (conversionType === 'temperature') units = temperatureUnits;
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    units.forEach(unit => {
        let option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromUnit.appendChild(option1);
        
        let option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toUnit.appendChild(option2);
    });
    
    // Set default to units
    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }
    
    convertUnit();
}

function convertUnit() {
    const conversionType = document.getElementById('conversionType').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const toValueField = document.getElementById('toValue');
    
    if (isNaN(fromValue)) {
        toValueField.value = '';
        return;
    }
    
    let result = 0;
    
    if (conversionType === 'temperature') {
        // Temperature conversion
        let celsius = fromValue;
        
        // Convert input to Celsius first
        if (fromUnit === 'F') {
            celsius = (fromValue - 32) * 5/9;
        } else if (fromUnit === 'K') {
            celsius = fromValue - 273.15;
        }
        
        // Convert Celsius to target unit
        if (toUnit === 'F') {
            result = (celsius * 9/5) + 32;
        } else if (toUnit === 'K') {
            result = celsius + 273.15;
        } else {
            result = celsius;
        }
    } else {
        // Length and weight conversion
        const fromFactor = conversionFactors[conversionType][fromUnit];
        const toFactor = conversionFactors[conversionType][toUnit];
        result = (fromValue / fromFactor) * toFactor;
    }
    
    toValueField.value = result.toFixed(4);
}

// Initialize converter
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('conversionType')) {
        updateConversionUnits();
    }
});

// ==================== TEXT EDITOR FUNCTIONS ====================

const textInput = document.getElementById('textInput');

if (textInput) {
    textInput.addEventListener('input', updateTextStats);
}

function updateTextStats() {
    const text = textInput.value;
    const charCount = text.length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    document.getElementById('charCount').textContent = charCount;
    document.getElementById('wordCount').textContent = wordCount;
}

function textToUpperCase() {
    textInput.value = textInput.value.toUpperCase();
    updateTextStats();
}

function textToLowerCase() {
    textInput.value = textInput.value.toLowerCase();
    updateTextStats();
}

function textCapitalize() {
    const text = textInput.value;
    const capitalized = text.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
    textInput.value = capitalized;
    updateTextStats();
}

function textReverse() {
    const text = textInput.value;
    const reversed = text.split('').reverse().join('');
    textInput.value = reversed;
    updateTextStats();
}

function countWords() {
    const text = textInput.value;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    alert(`Word Count: ${wordCount}\nCharacter Count: ${text.length}`);
}

function clearText() {
    textInput.value = '';
    updateTextStats();
}

// Initialize text stats on page load
window.addEventListener('load', function() {
    if (textInput) {
        updateTextStats();
    }
});
