import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const appendValue = (value) => {
    setInput(input + value);
  };

  const clearDisplay = () => {
    setInput("");
  };

  const deleteLast = () => {
    if (input) {
      setInput(input.slice(0, -1));
    }
  };

  const calculate = async () => {
    try {
      const response = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ expression: input })
      });

      const data = await response.json();
      setInput(String(data.result));
    } catch (error) {
      alert("Backend not running!");
    }
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>

      <input type="text" value={input} readOnly />

      <div className="buttons">

        <button onClick={() => appendValue("7")}>7</button>
        <button onClick={() => appendValue("8")}>8</button>
        <button onClick={() => appendValue("9")}>9</button>
        <button onClick={() => appendValue("/")}>÷</button>

        <button onClick={() => appendValue("4")}>4</button>
        <button onClick={() => appendValue("5")}>5</button>
        <button onClick={() => appendValue("6")}>6</button>
        <button onClick={() => appendValue("*")}>×</button>

        <button onClick={() => appendValue("1")}>1</button>
        <button onClick={() => appendValue("2")}>2</button>
        <button onClick={() => appendValue("3")}>3</button>
        <button onClick={() => appendValue("-")}>-</button>

        <button onClick={() => appendValue("0")}>0</button>
        <button onClick={() => appendValue(".")}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => appendValue("+")}>+</button>

        <button className="clear" onClick={clearDisplay}>C</button>
        <button onClick={deleteLast}>D</button>

      </div>
    </div>
  );
}

export default App;