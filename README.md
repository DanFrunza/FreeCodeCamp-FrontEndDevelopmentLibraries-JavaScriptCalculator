
# JavaScript Calculator

This is the JavaScript Calculator project created for the freeCodeCamp Front End Development Libraries (v8) certification. It is the fourth project in the curriculum and implements a simple calculator UI and logic using React and Redux (Redux Toolkit).

## Purpose

The app implements a basic, user-friendly calculator that supports digits, decimal input, basic arithmetic operators (+, −, ×, ÷), clearing, and deleting input. It was built to satisfy the project requirements for the freeCodeCamp certification and to practice state management patterns with Redux Toolkit.

## Key files

- `src/store/calculatorSlice.js` — The heart of the app. This file contains the Redux slice where all calculator logic lives: the state shape, reducers/actions (for adding digits, choosing operators, decimal handling, evaluation, clearing, deleting, etc.), and any helper functions used to compute results.

- `src/store/store.js` — The Redux store configuration. This file wires the `calculatorSlice` into the store and exports the configured store used by the React app.

- `src/components/Calculator.jsx` — The main calculator component. This component handles rendering the calculator UI (display, buttons) and dispatches actions to the slice when users press buttons.

When reading the code, focus first on `calculatorSlice.js` — it contains the business logic and the rules that determine how input is processed and how results are produced.

## Implementation notes (what I did in the slice)

- State shape (conceptually): the slice keeps the currently displayed value, the previous value (when an operator has been entered), the current operator, and flags to control overwriting vs appending input.

- Reducers / Actions implemented (high level):
	- addDigit: append a new digit to the current input (handles leading zero behavior)
	- addDecimal: handle decimal point input and prevent multiple decimals in the same number
	- chooseOperator: store the selected operator and prepare state for the next value
	- evaluate: compute the result using the current operator and operands
	- clearAll: reset the calculator to initial state
	- deleteDigit: remove the last digit from the current input

- Calculation logic: the slice contains helper logic to parse string inputs, perform arithmetic, and format the output for the display. All non-UI decisions (when to overwrite, when to chain calculations, how decimals are merged) are located in the slice so the component remains focused on rendering and dispatching.

## Known limitations / edge cases

I handled the core behaviors required for the project, but there are a few edge cases and advanced behaviors that are not fully covered yet:

- Parentheses and operator precedence: this project evaluates operations in a simple, immediate/left-to-right style rather than parsing full mathematical expressions with precedence and parentheses.
- Some consecutive operator sequences (e.g., repeated operators pressed quickly) may not behave exactly as every commercial calculator would — the slice tries to handle common cases but a few unusual input sequences could produce unexpected intermediate states.
- Very long numbers, extremely large results, and precision edge-cases for decimals (floating point rounding) are not exhaustively handled; improvements could include big-number handling or stricter rounding.
- Divide-by-zero is guarded at a basic level in the evaluation logic, but user-facing messaging and graceful handling could be improved.

If you want, I can add tests or additional logic to address these edge cases (expression parsing, better decimal precision, improved operator chaining, or UI feedback for errors).

## How to run

This project scaffolding uses Vite. From the `calculator` folder, run:

```bash
npm install
npm run dev
```

Open the listed local URL (usually `http://localhost:5173`) in your browser to view the app.

## Future improvements

- Add unit tests for the slice reducers and helper functions to verify edge cases.
- Improve decimal/precision handling and formatting of very large/small numbers.
- Implement full expression parsing to support parentheses and operator precedence.
- Improve UI/UX: keyboard support, accessibility enhancements, and error messaging for invalid operations.

