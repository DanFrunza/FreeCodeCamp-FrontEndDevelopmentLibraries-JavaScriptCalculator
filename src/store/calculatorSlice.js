import { createSlice } from '@reduxjs/toolkit';
import { evaluate } from 'mathjs';

const initialState = {
    expression: "",
    currentInput: "",
    result: null,
    overwrite: false,
};

//many use cases to consider for a robust calculator
//some use cases are not handled like the length of a number, multiple decimal points in a row, etc.
//but this is a basic implementation for fCC project purposes
const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addDigit(state, action) {
            const digit = action.payload;
            
            //if overwrite flag is set, replace currentInput with the new digit
            if(state.overwrite) {
                state.currentInput = digit;
                state.overwrite = false;
                return;
            }

            //if currentInput is empty, start new number
            if(state.currentInput === "") {
                if (digit === ".") {
                    state.currentInput = "0.";
                } else {
                    state.currentInput = digit;
                }
                return;
            }

            //if currentInput is "-", use it as a starting point for negative numbers
            if(state.currentInput === "-" && digit === ".") {
                state.currentInput = "-0.";
                return;
            }
            if(state.currentInput === "-" && digit !== ".") {
                state.currentInput = "-" + digit;
                return;
            }

            //if currentInput is "0" and digit is "0", do nothing
            if(state.currentInput === "0" && digit === "0") {
                return;
            }

            //if currentInput is "0" and digit is not ".", replace "0" with the new digit
            if(state.currentInput === "0" && digit !== ".") {
                state.currentInput = digit;
                return;
            }

            //if digit is "." and currentInput already includes ".", do nothing
            if(digit === "." && state.currentInput.includes(".")) {
                return;
            }

            state.currentInput += digit;
        },

        applyOperator(state, action) {
            const operator = action.payload;
            const lastChar = state.expression.slice(-1);

            //if "=" was pressed before, use the result as the new expression
            if(state.overwrite && state.result !== null) {
                state.expression = state.result.toString() + operator;
                state.currentInput = "";
                state.overwrite = false;
                return;
            }

            //if expression and currentInput are empty, we can start to construct the currentInput with "-"
            if(!state.currentInput && !state.expression && operator === "-") {
                state.currentInput = "-";
                return;
            }

            //if currenInput is empty and last char in expression is an operator, replace it
            if (!state.currentInput) {
                // Check for consecutive operators at the end of the expression
                const operatorsAtEnd = state.expression.match(/[\+\-\*\/]+$/);

                if (operatorsAtEnd) {
                    const lastOperators = operatorsAtEnd[0];

                    if (operator === "-") {
                       // Allow a negative sign after another operator
                        if (!lastOperators.endsWith("-")) {
                            state.expression += operator;
                        }
                    } else {
                        // Replace all consecutive operators at the end with the current operator
                        state.expression = state.expression.slice(0, state.expression.length - lastOperators.length) + operator;
                    }
                    return;
                } else {
                    // No operators at the end, simply add the operator
                    state.expression += operator;
                    return;
                }
            }

            //if currentInput is not empty, append the currentInput and operator to expression
            if(state.currentInput) {
                state.expression += state.currentInput + operator;
                state.currentInput = "";
            }
        },

        clearAll(state) {
            state.expression = "";
            state.currentInput = "";
            state.result = null;
            state.overwrite = false;
        },

        deleteLast(state) {
            if(state.currentInput) {
                state.currentInput = state.currentInput.slice(0, -1);

                // if becomes empty, show 0
                if(state.currentInput === "") {
                    state.currentInput = "";
                }
            }
        },

        calculateResult(state) {
            //if currentInput + expression are empty, do nothing
            if(!state.currentInput && !state.expression) {
                return;
            }

            let exp = state.expression;

            //if currentInput is not empty, append, else remove operator from expression if exists in the end
            if(state.currentInput) {
                exp += state.currentInput;
            } else {
                const lastChar = exp.slice(-1);
                if(["+", "-", "*", "/"].includes(lastChar)) {
                    exp = exp.slice(0, -1);
                }
            }

            if(!exp) return;

            try {
                const evalResult = evaluate(exp);
                state.result = evalResult;
                state.currentInput = evalResult.toString();
                state.expression = "";
                state.overwrite = true;
                } catch (error) {
                // Handle evaluation errors
                state.currentInput = "Error, refresh the page";
                state.expression = "";
                state.overwrite = false;
                state.result = null;
                }

        }
    },
});

export const { addDigit, applyOperator, clearAll, deleteLast, calculateResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;
