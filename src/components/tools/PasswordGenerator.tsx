import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numChars = '0123456789';
    const symChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    let chars = '';
    if (uppercase) chars += upperChars;
    if (lowercase) chars += lowerChars;
    if (numbers) chars += numChars;
    if (symbols) chars += symChars;

    if (!chars) {
      setPassword('Error: Please select at least one option.');
      return;
    }

    const randomArray = new Uint32Array(length);
    crypto.getRandomValues(randomArray);
    
    const pw = Array.from(randomArray)
      .map(val => chars[val % chars.length])
      .join('');
      
    setPassword(pw);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Shield size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Password Generator</h2>
            <p>Generate highly secure, cryptographically random password strings.</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="pwd-length">Length: {length}</label>
        <input
          id="pwd-length"
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          style={{ width: '100%', height: '6px', background: 'var(--color-border)', borderRadius: '3px', outline: 'none' }}
        />
      </div>

      <div className="flex-row" style={{ gap: '20px', marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <span>Uppercase</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <span>Lowercase</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <span>Numbers</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <span>Symbols</span>
        </label>
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-primary" onClick={generatePassword}>
          <RefreshCw size={16} />
          <span>Regenerate</span>
        </button>
      </div>

      <OutputBox content={password} label="Generated Password" />
    </div>
  );
};
export default PasswordGenerator;
