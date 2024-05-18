import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!#$%&'*+-@=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  function refreshPage() {
    window.location.reload(false);
  }

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="container">
        <h1 className="heading">Password Generator</h1>
        <div className="input-container">
          <input
            type="text"
            name="Password"
            id="password-field"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="copy-btn" onClick={copyPassToClipboard}>
            Copy
          </button>
        </div>

        <div className="btn-container">
          <div className="range-btn">
            <input
              type="range"
              id="length"
              min={6}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length {length}</label>
          </div>
          <div className="checkbox-btn">
            <input
              type="checkbox"
              id="number"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="checkbox-btn">
            <input
              type="checkbox"
              id="Character"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="Character">Character</label>
          </div>
        </div>
        <div>
          <button onClick={refreshPage} id="refresh-btn">
            Click to Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
