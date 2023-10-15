const inputText = document.getElementById('inputText');
const wordCount = document.getElementById('wordCount');
const charCountWithSpaces = document.getElementById('charCountWithSpaces');
const charCountWithoutSpaces = document.getElementById('charCountWithoutSpaces');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');
const syllableCount = document.getElementById('syllableCount');
const readTime = document.getElementById('readTime');
const syllablesPerWord = document.getElementById('syllablesPerWord');
const avgWordLength = document.getElementById('avgWordLength');
const avgSentenceLength = document.getElementById('avgSentenceLength');
const uniqueWords = document.getElementById('uniqueWords');
const monosyllabicWords = document.getElementById('monosyllabicWords');
const polysyllabicWords = document.getElementById('polysyllabicWords');
const readabilityLevel = document.getElementById('readabilityLevel');
const shortWords = document.getElementById('shortWords');
const longWords = document.getElementById('longWords');

inputText.addEventListener('input', updateCounts);

function updateCounts() {
    const text = inputText.value;

    // Word Count
    const words = text.match(/\b\w+\b/g);
    wordCount.textContent = words ? words.length : 0;

    // Character Count (with spaces)
    charCountWithSpaces.textContent = text.length;

    // Character Count (without spaces)
    charCountWithoutSpaces.textContent = text.replace(/\s/g, '').length;

    // Sentence Count
    const sentences = text.split(/[.!?]/).filter(Boolean).length;
    sentenceCount.textContent = sentences;

    // Paragraph Count
    const paragraphs = text.split(/\n\n/).filter(Boolean).length;
    paragraphCount.textContent = paragraphs;

    // Syllable Count (a simple approximation)
    const syllables = text.split(/\s+/).map(word => word.split(/[^aeiouy]/i).filter(Boolean)).flat().length;
    syllableCount.textContent = syllables;

    // Syllables per Word
    const syllablesPerWordValue = words ? (syllables / words.length).toFixed(2) : 0;
    syllablesPerWord.textContent = syllablesPerWordValue;

    // Read Time (in minutes, assuming 200 words per minute)
    const wordsPerMinute = 200;
    const readTimeMinutes = wordCount.textContent / wordsPerMinute;
    readTime.textContent = readTimeMinutes.toFixed(2);

    // Additional Features

    // Average Word Length (char)
    const avgWordLengthValue = words ? (text.replace(/[^a-zA-Z]/g, '').length / words.length).toFixed(2) : 0;
    avgWordLength.textContent = avgWordLengthValue;

    // Average Sentence Length (word)
    avgSentenceLength.textContent = sentences ? (words.length / sentences).toFixed(2) : 0;

    // Unique Words
    const uniqueWordsSet = new Set(words);
    uniqueWords.textContent = uniqueWordsSet.size;

    // Monosyllabic Words (1 syllable)
    const monosyllabicWordsCount = words.filter(word => countSyllables(word) === 1).length;
    monosyllabicWords.textContent = monosyllabicWordsCount;

    // Polysyllabic Words (≥3 syllables)
    const polysyllabicWordsCount = words.filter(word => countSyllables(word) >= 3).length;
    polysyllabicWords.textContent = polysyllabicWordsCount;

    // Readability Level (Difficult Words)
    const difficultWordsCount = words.filter(word => isDifficultWord(word)).length;
    readabilityLevel.textContent = difficultWordsCount;

    // Short Words (<=4 characters)
    const shortWordsCount = words.filter(word => word.length <= 4).length;
    shortWords.textContent = shortWordsCount;

    // Long Words (>=7 characters)
    const longWordsCount = words.filter(word => word.length >= 7).length;
    longWords.textContent = longWordsCount;
}

// Function to count syllables in a word (you can add this at the end of your JavaScript)
function countSyllables(word) {
    // Implement a syllable counting logic here (there are various methods)
    // For a simple approximation, you can use a library like "syllable" or implement a basic logic.
    // Example using a basic logic (not very accurate):
    return word.toLowerCase().split(/[aeiouy]+/).length - 1;
}

// Function to check if a word is difficult (you can customize this function)
function isDifficultWord(word) {
    // Implement a logic to determine if a word is difficult.
    // You can use a list of known difficult words or a more sophisticated approach.
    // For simplicity, you can customize this function as needed.
    // Example: return true if the word contains specific patterns or letters.
    return /your_difficult_word_pattern/.test(word);
}

updateCounts(); // Initial update
