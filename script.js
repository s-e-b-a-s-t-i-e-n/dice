// Default probabilities favoring high numbers (for 6-sided dice)
const DEFAULT_PROBABILITIES_6 = {
    1: 5,   // 5%
    2: 8,   // 8%
    3: 12,  // 12%
    4: 20,  // 20%
    5: 25,  // 25%
    6: 30   // 30%
};

// Function to get current number of faces
function getFaceCount() {
    return parseInt(document.getElementById('faceCount').value) || 6;
}

// Function to generate default probabilities based on number of faces
function generateDefaultProbabilities(faceCount) {
    const probabilities = {};
    
    if (faceCount === 6) {
        // Use default biased probabilities for 6 faces
        return { ...DEFAULT_PROBABILITIES_6 };
    } else {
        // For other numbers of faces, create progressive bias
        const totalWeight = faceCount * (faceCount + 1) / 2; // Sum from 1 to faceCount
        
        for (let face = 1; face <= faceCount; face++) {
            // Higher faces have more weight
            const weight = face;
            probabilities[face] = Math.round((weight / totalWeight) * 100);
        }
        
        // Adjust to total exactly 100%
        const currentTotal = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
        const difference = 100 - currentTotal;
        
        // Add difference to highest face
        probabilities[faceCount] += difference;
        
        return probabilities;
    }
}

// Function to get current probabilities from interface
function getCurrentProbabilities() {
    const faceCount = getFaceCount();
    const probabilities = {};
    
    for (let face = 1; face <= faceCount; face++) {
        const input = document.getElementById(`prob${face}`);
        probabilities[face] = parseInt(input.value) || 0;
    }
    return probabilities;
}

// Function to generate a biased die with current probabilities
function rollBiasedDie() {
    const probabilities = getCurrentProbabilities();
    const faceCount = getFaceCount();
    const total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
    
    if (total === 0) {
        // If all probabilities are 0, use equiprobable probabilities
        return Math.floor(Math.random() * faceCount) + 1;
    }
    
    const random = Math.random() * total;
    let cumulativeProbability = 0;
    
    for (let face = 1; face <= faceCount; face++) {
        cumulativeProbability += probabilities[face];
        if (random <= cumulativeProbability) {
            return face;
        }
    }
    
    // Fallback (should never happen)
    return faceCount;
}

// Fonction pour lancer plusieurs dés avec cohérence
function rollDice(count, consistencyPercent = 0) {
    const results = [];
    let baseValue = null;
    
    for (let i = 0; i < count; i++) {
        let value;
        
        // Si c'est le premier dé
        if (i === 0) {
            value = rollBiasedDie();
            baseValue = value;
        } else {
            // Vérifier si la cohérence s'applique
            if (Math.random() * 100 <= consistencyPercent) {
                // Cohérence appliquée : utiliser la valeur de base ou une valeur très proche
                if (consistencyPercent === 100) {
                    // À 100%, tous les dés sont identiques
                    value = baseValue;
                } else {
                    // Pour les autres pourcentages, permettre une petite variation
                    const deviation = Math.floor(Math.random() * 3) - 1; // -1, 0, ou 1
                    value = Math.max(1, Math.min(6, baseValue + deviation));
                }
            } else {
                // Pas de cohérence : lancement normal
                value = rollBiasedDie();
                baseValue = value; // Mettre à jour la valeur de base pour les dés suivants
            }
        }
        
        results.push(value);
    }
    
    return results;
}

// Fonction pour afficher les dés
function displayDice(results) {
    const container = document.getElementById('diceContainer');
    container.innerHTML = '';
    
    results.forEach((value, index) => {
        const dieElement = document.createElement('div');
        dieElement.className = 'die';
        
        // Ajuster la taille de police selon la valeur
        if (value >= 10) {
            dieElement.setAttribute('data-high-value', 'true');
        }
        if (value >= 100) {
            dieElement.setAttribute('data-very-high-value', 'true');
        }
        
        // Ajouter le dé au conteneur immédiatement (sans valeur)
        container.appendChild(dieElement);
        
        // Animation de lancement avec délai progressif
        setTimeout(() => {
            dieElement.style.animation = 'roll 0.6s ease-out';
            
            // Afficher la valeur après l'animation de rotation
            setTimeout(() => {
                dieElement.textContent = value;
                dieElement.classList.add('revealed');
            }, 600); // Attendre la fin de l'animation de rotation
            
        }, index * 500); // Délai de 0,5 seconde entre chaque dé
    });
}

// Fonction pour afficher le total
function displayTotal(results) {
    const total = results.reduce((sum, value) => sum + value, 0);
    const totalElement = document.getElementById('total');
    totalElement.innerHTML = `<strong>Total: ${total}</strong>`;
}

// Function to add to history
function addToHistory(results, consistencyPercent = 0) {
    const historyElement = document.getElementById('history');
    const total = results.reduce((sum, value) => sum + value, 0);
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    let consistencyText = '';
    if (consistencyPercent > 0) {
        consistencyText = `<span class="consistency">Consistency: ${consistencyPercent}%</span>`;
    }
    
    historyItem.innerHTML = `
        <span class="dice-values">[${results.join(', ')}]</span>
        <span class="total">Total: ${total}</span>
        ${consistencyText}
        <span class="timestamp">${new Date().toLocaleTimeString()}</span>
    `;
    
    // Add to beginning of history
    historyElement.insertBefore(historyItem, historyElement.firstChild);
    
    // Limit history to 10 items
    while (historyElement.children.length > 10) {
        historyElement.removeChild(historyElement.lastChild);
    }
}

// Main roll function
function rollDiceHandler() {
    const diceCount = parseInt(document.getElementById('diceCount').value);
    const consistencyPercent = parseInt(document.getElementById('consistency').value);
    
    if (diceCount < 1 || diceCount > 10) {
        alert('Please choose between 1 and 10 dice');
        return;
    }
    
    // Disable button during animation
    const rollButton = document.getElementById('rollButton');
    rollButton.disabled = true;
    rollButton.textContent = 'Rolling...';
    
    // Roll dice with consistency
    const results = rollDice(diceCount, consistencyPercent);
    
    // Display results
    displayDice(results);
    displayTotal(results);
    addToHistory(results, consistencyPercent);
    
    // Re-enable button after animation
    setTimeout(() => {
        rollButton.disabled = false;
        rollButton.textContent = 'Roll Dice';
    }, 1000);
}

// Fonction pour valider l'input
function validateInput() {
    const input = document.getElementById('diceCount');
    let value = parseInt(input.value);
    
    if (isNaN(value) || value < 1) {
        input.value = 1;
    } else if (value > 10) {
        input.value = 10;
    }
}

// Fonction pour générer les contrôles de probabilité dynamiquement
function generateProbabilityControls() {
    const faceCount = getFaceCount();
    const container = document.getElementById('probabilityControls');
    container.innerHTML = '';
    
    const defaultProbs = generateDefaultProbabilities(faceCount);
    
    for (let face = 1; face <= faceCount; face++) {
        const probControlItem = document.createElement('div');
        probControlItem.className = 'prob-control-item';
        
        const faceValue = defaultProbs[face] || 0;
        
        probControlItem.innerHTML = `
            <span class="face">${face}</span>
            <input type="number" id="prob${face}" min="0" max="100" value="${faceValue}" step="1">
            <span class="percent">%</span>
            <div class="bar"><div class="fill" id="bar${face}" style="width: ${faceValue}%"></div></div>
        `;
        
        container.appendChild(probControlItem);
    }
    
    // Réattacher les gestionnaires d'événements
    attachProbabilityEventListeners();
    updateProbabilityBars();
}

// Fonction pour attacher les gestionnaires d'événements aux contrôles de probabilité
function attachProbabilityEventListeners() {
    const faceCount = getFaceCount();
    
    for (let face = 1; face <= faceCount; face++) {
        const input = document.getElementById(`prob${face}`);
        if (input) {
            input.addEventListener('input', updateProbabilityBars);
            input.addEventListener('blur', validateProbabilities);
        }
    }
}

// Fonction pour mettre à jour l'affichage de la cohérence
function updateConsistencyDisplay() {
    const consistencySlider = document.getElementById('consistency');
    const consistencyValue = document.getElementById('consistencyValue');
    consistencyValue.textContent = consistencySlider.value + '%';
}

// Fonction pour mettre à jour les barres de probabilité
function updateProbabilityBars() {
    const probabilities = getCurrentProbabilities();
    const faceCount = getFaceCount();
    const total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
    
    for (let face = 1; face <= faceCount; face++) {
        const bar = document.getElementById(`bar${face}`);
        if (bar) {
            const percentage = total > 0 ? (probabilities[face] / total * 100) : 0;
            bar.style.width = percentage + '%';
        }
    }
    
    // Mettre à jour le total
    document.getElementById('totalProb').textContent = total;
    
    // Changer la couleur du total selon qu'il est correct ou non
    const totalElement = document.getElementById('totalProb');
    if (total === 100) {
        totalElement.style.color = '#28a745';
    } else if (total > 100) {
        totalElement.style.color = '#dc3545';
    } else {
        totalElement.style.color = '#ffc107';
    }
}

// Fonction pour réinitialiser les probabilités
function resetProbabilities() {
    const faceCount = getFaceCount();
    const defaultProbs = generateDefaultProbabilities(faceCount);
    
    for (let face = 1; face <= faceCount; face++) {
        const input = document.getElementById(`prob${face}`);
        if (input) {
            input.value = defaultProbs[face];
        }
    }
    updateProbabilityBars();
}

// Function to normalize probabilities to 100%
function normalizeProbabilities() {
    const probabilities = getCurrentProbabilities();
    const faceCount = getFaceCount();
    const total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
    
    if (total === 0) {
        alert('Cannot normalize: all probabilities are 0');
        return;
    }
    
    // Calculate normalized probabilities with precision
    const normalizedProbs = {};
    let allocatedTotal = 0;
    
    // First pass: round down for each probability
    for (let face = 1; face <= faceCount; face++) {
        const normalizedValue = Math.floor((probabilities[face] / total) * 100);
        normalizedProbs[face] = normalizedValue;
        allocatedTotal += normalizedValue;
    }
    
    // Second pass: distribute remainder to reach exactly 100%
    const remainder = 100 - allocatedTotal;
    
    if (remainder > 0) {
        // Find faces with largest decimal parts
        const decimalParts = [];
        for (let face = 1; face <= faceCount; face++) {
            const decimalPart = ((probabilities[face] / total) * 100) - Math.floor((probabilities[face] / total) * 100);
            decimalParts.push({ face, decimalPart });
        }
        
        // Sort by decimal part descending
        decimalParts.sort((a, b) => b.decimalPart - a.decimalPart);
        
        // Add 1 to faces with largest decimal parts
        for (let i = 0; i < remainder && i < decimalParts.length; i++) {
            normalizedProbs[decimalParts[i].face]++;
        }
    }
    
    // Apply normalized values
    for (let face = 1; face <= faceCount; face++) {
        const input = document.getElementById(`prob${face}`);
        if (input) {
            input.value = normalizedProbs[face];
        }
    }
    
    updateProbabilityBars();
}

// Function to validate probabilities
function validateProbabilities() {
    const probabilities = getCurrentProbabilities();
    const total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
    
    if (total === 0) {
        alert('Warning: all probabilities are 0. Dice will use equiprobable probabilities.');
        return false;
    }
    
    if (total !== 100) {
        const response = confirm(`Total probabilities is ${total}% instead of 100%. Do you want to normalize automatically?`);
        if (response) {
            normalizeProbabilities();
        }
        return false;
    }
    
    return true;
}

// Événements
document.addEventListener('DOMContentLoaded', function() {
    const rollButton = document.getElementById('rollButton');
    const diceCountInput = document.getElementById('diceCount');
    const faceCountInput = document.getElementById('faceCount');
    const consistencySlider = document.getElementById('consistency');
    const resetProbButton = document.getElementById('resetProb');
    const normalizeProbButton = document.getElementById('normalizeProb');
    
    rollButton.addEventListener('click', rollDiceHandler);
    diceCountInput.addEventListener('input', validateInput);
    faceCountInput.addEventListener('input', function() {
        generateProbabilityControls();
    });
    consistencySlider.addEventListener('input', updateConsistencyDisplay);
    resetProbButton.addEventListener('click', resetProbabilities);
    normalizeProbButton.addEventListener('click', normalizeProbabilities);
    
    // Permettre le lancement avec la touche Entrée
    diceCountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            rollDiceHandler();
        }
    });
    
    // Initialiser l'affichage
    updateConsistencyDisplay();
    generateProbabilityControls();
    
    // Lancement initial pour démonstration
    rollDiceHandler();
});

// Function to test probabilities (optional)
function testProbabilities(iterations = 10000) {
    const counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
    
    for (let i = 0; i < iterations; i++) {
        const result = rollBiasedDie();
        counts[result]++;
    }
    
    console.log('Probability test over', iterations, 'rolls:');
    for (let face = 1; face <= 6; face++) {
        const percentage = (counts[face] / iterations * 100).toFixed(2);
        console.log(`Face ${face}: ${counts[face]} times (${percentage}%)`);
    }
}

// Function to test normalization
function testNormalization() {
    console.log('Probability normalization test:');
    
    // Test with values that cause rounding problems
    const testCases = [
        { name: 'Case 1: 33, 33, 33', values: [33, 33, 33] },
        { name: 'Case 2: 16.67, 16.67, 16.67, 16.67, 16.67, 16.66', values: [16.67, 16.67, 16.67, 16.67, 16.67, 16.66] },
        { name: 'Case 3: 10, 20, 30, 40', values: [10, 20, 30, 40] },
        { name: 'Case 4: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n${testCase.name}:`);
        const originalTotal = testCase.values.reduce((sum, val) => sum + val, 0);
        console.log(`Original total: ${originalTotal}`);
        
        // Simulate normalization
        const normalizedProbs = {};
        let allocatedTotal = 0;
        
        // First pass: round down
        testCase.values.forEach((value, face) => {
            const normalizedValue = Math.floor((value / originalTotal) * 100);
            normalizedProbs[face + 1] = normalizedValue;
            allocatedTotal += normalizedValue;
        });
        
        // Second pass: distribute remainder
        const remainder = 100 - allocatedTotal;
        if (remainder > 0) {
            const decimalParts = [];
            testCase.values.forEach((value, face) => {
                const decimalPart = ((value / originalTotal) * 100) - Math.floor((value / originalTotal) * 100);
                decimalParts.push({ face: face + 1, decimalPart });
            });
            
            decimalParts.sort((a, b) => b.decimalPart - a.decimalPart);
            
            for (let i = 0; i < remainder && i < decimalParts.length; i++) {
                normalizedProbs[decimalParts[i].face]++;
            }
        }
        
        const finalTotal = Object.values(normalizedProbs).reduce((sum, val) => sum + val, 0);
        console.log(`Normalized total: ${finalTotal}`);
        console.log(`Values: [${Object.values(normalizedProbs).join(', ')}]`);
        console.log(`✓ ${finalTotal === 100 ? 'SUCCESS' : 'FAILURE'}`);
    });
}

// Function to test consistency
function testConsistency(consistencyPercent = 100, diceCount = 5, iterations = 100) {
    console.log(`Consistency test at ${consistencyPercent}% with ${diceCount} dice over ${iterations} rolls:`);
    
    let identicalCount = 0;
    let similarCount = 0;
    
    for (let i = 0; i < iterations; i++) {
        const results = rollDice(diceCount, consistencyPercent);
        
        // Check if all dice are identical
        const allIdentical = results.every(value => value === results[0]);
        if (allIdentical) {
            identicalCount++;
        }
        
        // Check if all dice are similar (max difference of 1)
        const maxDiff = Math.max(...results) - Math.min(...results);
        if (maxDiff <= 1) {
            similarCount++;
        }
        
        if (i < 10) { // Show first 10 results
            console.log(`Roll ${i + 1}: [${results.join(', ')}] - Identical: ${allIdentical}`);
        }
    }
    
    console.log(`Identical results: ${identicalCount}/${iterations} (${(identicalCount/iterations*100).toFixed(1)}%)`);
    console.log(`Similar results: ${similarCount}/${iterations} (${(similarCount/iterations*100).toFixed(1)}%)`);
}
