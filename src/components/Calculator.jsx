import { useDispatch, useSelector } from "react-redux";
import "../styles/Calculator.css";
import { addDigit, applyOperator, clearAll, deleteLast, calculateResult } from "../store/calculatorSlice";

//Calculator component, (i prefer the class but is deprecated in modern React)
//all state management is done with Redux toolkit
//all the logic is in the calculatorSlice.js file 
const Calculator = () => {
    const dispatch = useDispatch();
    const { expression, currentInput } = useSelector((state) => state.calculator);

    const handleACClick = () => {
        dispatch(clearAll());
    };

    const handleDigitClick = (digit) => {
        dispatch(addDigit(digit));
    };

    const handleOperatorClick = (operator) => {
        dispatch(applyOperator(operator));
    };

    const handleDeleteClick = () => {
        dispatch(deleteLast());
    };

    const handleEqualsClick = () => {
        dispatch(calculateResult());
    };

    return (
        <div id="calculator-frame">
            <h1>JavaScript Calculator in React + Redux</h1>
            <div id="calculator-body">
                <div id="display">
                    <div id="expression-display">{expression}</div>
                    <div id="current-display">{currentInput || "0"}</div>
                </div>
                <div id="buttons-container">
                    <div id="first-row" className="button-row">
                        <button id="clear" onClick={() => handleACClick()}>AC</button>
                        <button id="divide" onClick={() => handleOperatorClick("/")}>/</button>
                        <button id="multiply" onClick={() => handleOperatorClick("*")}>x</button>
                        <button id="delete" onClick={() => handleDeleteClick()}>DEL</button>
                    </div>
                    <div id="second-row" className="button-row">
                        <button id="seven" onClick={() => handleDigitClick("7")}>7</button>
                        <button id="eight" onClick={() => handleDigitClick("8")}>8</button>
                        <button id="nine" onClick={() => handleDigitClick("9")}>9</button>
                        <button id="subtract" onClick={() => handleOperatorClick("-")}>-</button>
                    </div>
                    <div id="third-row" className="button-row">
                        <button id="four" onClick={() => handleDigitClick("4")}>4</button>
                        <button id="five" onClick={() => handleDigitClick("5")}>5</button>
                        <button id="six" onClick={() => handleDigitClick("6")}>6</button>
                        <button id="add" onClick={() => handleOperatorClick("+")}>+</button>
                    </div>
                    <div id="fourth-row" className="button-row">
                        <button id="one" onClick={() => handleDigitClick("1")}>1</button>
                        <button id="two" onClick={() => handleDigitClick("2")}>2</button>
                        <button id="three" onClick={() => handleDigitClick("3")}>3</button>
                        <button id="equals" onClick={handleEqualsClick}>=</button>
                    </div>
                    <div id="fifth-row" className="button-row">
                        <button id="logo1" className="logo-container" disabled>
                            <img id="logo-img1" src="DF.svg" alt="Logo" />
                        </button>
                        <button id="zero" onClick={() => handleDigitClick("0")}>0</button>
                        <button id="decimal" onClick={() => handleDigitClick(".")}>.</button>
                        <button id="logo2" className="logo-container" disabled>
                            <img id="logo-img1" src="DF.svg" alt="Logo" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;