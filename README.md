1. Game Setup & Word List
Word Source: Create two text files: one containing a list of secret_words.txt (the possible answers),
Selection: Write a function to randomly pick a secret word from your secret_words.txt file at the start of the game.

2. The Game Loop
Main Loop: Set up a while loop that allows the user exactly 6 attempts.
User Input: Prompt the user to input a 5-letter word.
Validation: Before processing the guess, validate that:
- It is exactly 5 letters long.
- It consists only of valid letters.
- It is an actual word present in your valid_guesses.txt file.

3. Core Logic (Evaluating the Guess)
This is the heart of the project. For each of the 5 letters, apply these rules:
- Green (Perfect Match): If the guessed letter matches the letter in the secret word at the same index.
- Yellow (Wrong Position): If the guessed letter exists in the secret word, but not at that specific index (and isn't already claimed by a green letter).
- Gray (Not in Word): If the guessed letter doesn't exist anywhere in the secret word.

4. Game Over Conditions
Win Condition: If the user’s guess exactly matches the secret word, trigger a win state and congratulate them.
Loss Condition: If the user runs out of 6 tries without guessing the word, reveal the secret word to them and end the game.

5. UI/StylingTerminal Version:
Web Version: Use JavaScript to dynamically create a \(6 \times 5\) grid of tiles that flip colors using CSS animations.
