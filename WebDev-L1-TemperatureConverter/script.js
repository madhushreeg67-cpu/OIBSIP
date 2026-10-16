/* ==========================================================================
   WebDev-L1-TemperatureConverter - script.js
   Conversion Logic & Absolute Zero Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('converterForm');
    const tempInput = document.getElementById('tempInput');
    const unitSelect = document.getElementById('unitSelect');
    const btnClear = document.getElementById('btnClear');
    const validationMessage = document.getElementById('validationMessage');
    const valCelsius = document.getElementById('valCelsius');
    const valFahrenheit = document.getElementById('valFahrenheit');
    const valKelvin = document.getElementById('valKelvin');
    const thermalStatus = document.getElementById('thermalStatus');
    const thermalIcon = document.getElementById('thermalIcon');
    const presetButtons = document.querySelectorAll('.btn-preset');

    // Absolute Zero Constants
    const ABSOLUTE_ZERO = {
        celsius: -273.15,
        fahrenheit: -459.67,
        kelvin: 0
    };

    // Show / Hide Clear Button based on input
    tempInput.addEventListener('input', () => {
        clearError();
        btnClear.style.display = tempInput.value.trim() !== '' ? 'block' : 'none';
    });

    btnClear.addEventListener('click', () => {
        tempInput.value = '';
        btnClear.style.display = 'none';
        clearError();
        resetResults();
        tempInput.focus();
    });

    unitSelect.addEventListener('change', () => {
        clearError();
    });

    // Preset buttons click handling
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            const unit = btn.getAttribute('data-unit');
            tempInput.value = val;
            unitSelect.value = unit;
            btnClear.style.display = 'block';
            clearError();
            performConversion();
        });
    });

    // Form submit -> Run conversion
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        performConversion();
    });

    /**
     * Perform the temperature conversion with rigorous validation
     */
    function performConversion() {
        const rawValue = tempInput.value.trim();
        const unit = unitSelect.value;

        // 1. Validation: Empty Input
        if (rawValue === '') {
            showError('Please enter a temperature value to convert.');
            resetResults();
            tempInput.focus();
            return;
        }

        // 2. Validation: Non-Numeric Input
        const numericValue = parseFloat(rawValue);
        if (isNaN(numericValue) || !isFinite(numericValue)) {
            showError('Please enter a valid numeric temperature.');
            resetResults();
            tempInput.focus();
            return;
        }

        // 3. Validation: Absolute Zero Thresholds
        if (unit === 'celsius' && numericValue < ABSOLUTE_ZERO.celsius) {
            showError(`Temperature cannot be below absolute zero (${ABSOLUTE_ZERO.celsius}°C / 0 K).`);
            resetResults();
            return;
        }

        if (unit === 'fahrenheit' && numericValue < ABSOLUTE_ZERO.fahrenheit) {
            showError(`Temperature cannot be below absolute zero (${ABSOLUTE_ZERO.fahrenheit}°F / 0 K).`);
            resetResults();
            return;
        }

        if (unit === 'kelvin' && numericValue < ABSOLUTE_ZERO.kelvin) {
            showError('Temperature in Kelvin cannot be negative (0 K is absolute zero).');
            resetResults();
            return;
        }

        // 4. Valid Input: Clear previous errors
        clearError();

        // 5. Convert to Base Unit (Celsius)
        let celsius;
        if (unit === 'celsius') {
            celsius = numericValue;
        } else if (unit === 'fahrenheit') {
            celsius = (numericValue - 32) * (5 / 9);
        } else if (unit === 'kelvin') {
            celsius = numericValue - 273.15;
        }

        // 6. Calculate all equivalent units from Celsius
        const fahrenheit = (celsius * 9 / 5) + 32;
        const kelvin = celsius + 273.15;

        // 7. Display formatted results
        valCelsius.textContent = `${formatTemp(celsius)}°C`;
        valFahrenheit.textContent = `${formatTemp(fahrenheit)}°F`;
        valKelvin.textContent = `${formatTemp(kelvin)} K`;

        // 8. Update thermal status tag & icon
        updateThermalStatus(celsius);
    }

    /**
     * Format temperature number cleanly (avoid trailing floating precision artifacts)
     */
    function formatTemp(num) {
        // Round to 2 decimal places if needed, while preserving exact integers
        const rounded = Math.round(num * 100) / 100;
        return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
    }

    /**
     * Display error in the validation banner
     */
    function showError(message) {
        validationMessage.textContent = message;
        validationMessage.className = 'validation-message error';
        validationMessage.style.display = 'flex';
    }

    /**
     * Clear validation banner
     */
    function clearError() {
        validationMessage.textContent = '';
        validationMessage.className = 'validation-message';
        validationMessage.style.display = 'none';
    }

    /**
     * Reset result cards to placeholder dashes
     */
    function resetResults() {
        valCelsius.textContent = '--';
        valFahrenheit.textContent = '--';
        valKelvin.textContent = '--';
        thermalStatus.textContent = 'Awaiting Input';
        thermalStatus.style.color = 'var(--text-muted)';
        thermalStatus.style.background = 'rgba(255, 255, 255, 0.05)';
        if (thermalIcon) {
            thermalIcon.innerHTML = `<span class="icon-emoji">🌡️</span>`;
        }
    }

    /**
     * Dynamic Thermal Status Indicator
     */
    function updateThermalStatus(celsius) {
        if (celsius <= 0) {
            thermalStatus.textContent = celsius <= -200 ? 'Extreme Cryogenic' : 'Freezing Cold';
            thermalStatus.style.color = '#38bdf8';
            thermalStatus.style.background = 'rgba(56, 189, 248, 0.12)';
            thermalIcon.innerHTML = `<span class="icon-emoji">❄️</span>`;
        } else if (celsius <= 20) {
            thermalStatus.textContent = 'Cool / Mild';
            thermalStatus.style.color = '#34d399';
            thermalStatus.style.background = 'rgba(52, 211, 153, 0.12)';
            thermalIcon.innerHTML = `<span class="icon-emoji">🌤️</span>`;
        } else if (celsius <= 45) {
            thermalStatus.textContent = 'Warm / Body Temp';
            thermalStatus.style.color = '#fbbf24';
            thermalStatus.style.background = 'rgba(251, 191, 36, 0.12)';
            thermalIcon.innerHTML = `<span class="icon-emoji">☀️</span>`;
        } else {
            thermalStatus.textContent = celsius >= 100 ? 'Boiling Point / Extreme' : 'Very Hot';
            thermalStatus.style.color = '#f87171';
            thermalStatus.style.background = 'rgba(248, 113, 113, 0.12)';
            thermalIcon.innerHTML = `<span class="icon-emoji">🔥</span>`;
        }
    }
});
