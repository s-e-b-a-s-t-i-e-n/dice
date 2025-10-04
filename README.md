# 🎲 Dice Roller

An interactive web application that allows you to roll dice with biased probabilities favoring high numbers.

## 🚀 Features

- **Number of dice selection**: Choose between 1 and 10 dice to roll
- **Customizable number of faces**: Define the number of faces per die (2 to 20 faces, 6 by default)
- **Customizable probabilities**: Define the probability of each face directly from the interface
- **Default biased probabilities**: Initial configuration favoring high numbers:
  - Face 1: 5%
  - Face 2: 8%
  - Face 3: 12%
  - Face 4: 20%
  - Face 5: 25%
  - Face 6: 30%
- **Dice consistency**: Control the percentage chance that dice show similar values (0% to 100%)
- **Modern interface**: Responsive design and smooth animations
- **Roll history**: View the last 10 rolls with timestamp and consistency level
- **Animations**: Rotation effect when rolling dice
- **Smart validation**: Automatic probability normalization and validation alerts

## 🎯 How to use

1. Open the `index.html` file in your web browser
2. Select the desired number of dice (1 to 10)
3. Adjust the consistency level with the slider (0% = independent dice, 100% = identical dice)
4. Click "Roll Dice" or press Enter
5. Observe the results with total and history

### 🎲 Dice consistency

The consistency feature allows you to control the similarity between dice in the same roll:

- **0%**: Each die is rolled independently with biased probabilities
- **50%**: Dice have a 50% chance of showing values similar to the first die
- **100%**: All dice show the same value (or very close values)

This feature is useful for creating dramatic effects or situations where dice "agree" with each other.

### 🎯 Customizable number of faces

The application allows you to define the number of faces per die:

- **Value range**: 2 to 20 faces per die
- **Default value**: 6 faces (classic die)
- **Automatic generation**: Probability controls update automatically
- **Smart probabilities**: For non-6 face dice, automatic generation of progressive bias
- **Adaptive display**: Dice adjust visually according to the displayed value

#### Usage examples:
- **2-sided die**: Heads or tails (1 or 2)
- **4-sided die**: Classic tetrahedron
- **8-sided die**: Octahedron
- **10-sided die**: For role-playing games
- **12-sided die**: Dodecahedron
- **20-sided die**: Icosahedron (classic D20)

### 🎯 Custom probabilities

The application allows you to define your own probabilities for each die face:

- **Real-time modification**: Change values and see bars update instantly
- **Automatic validation**: Total is displayed in color (green=100%, red>100%, orange<100%)
- **"Reset" button**: Restores default probabilities
- **"Normalize" button**: Automatically adjusts values to total 100%
- **Error handling**: Alerts if all probabilities are 0 or if total is not 100%

#### Configuration examples:
- **Equiprobable dice**: 16.67% for each face
- **Low-favoring dice**: 30%, 25%, 20%, 12%, 8%, 5%
- **Extreme dice**: 50% for 1 and 6, 0% for others

## 🛠️ Technologies used

- **HTML5**: Page structure
- **CSS3**: Styles and animations
- **JavaScript**: Biased dice logic and interactions

## 📁 Project structure

```
dice/
├── index.html      # Main page
├── script.js       # JavaScript logic
├── style.css       # CSS styles
└── README.md       # Documentation
```

## 🎲 Biased dice algorithm

The application uses a cumulative probability algorithm to generate biased results:

1. A random number between 0 and 1 is generated
2. Cumulative probabilities are calculated
3. The first number whose cumulative probability exceeds the random number is returned

This method ensures that high numbers actually have more chances of appearing.

## 🧪 Probability testing

To test probabilities in console, use:
```javascript
testProbabilities(10000); // Test over 10,000 rolls
```

## 📱 Compatibility

- Compatible with all modern browsers
- Responsive interface for mobile and desktop
- Works without internet connection
