import React, { useState, useEffect } from 'react';
import { Fingerprint, RefreshCw } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const UuidGenerator: React.FC = () => {
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');

  const uuidv4 = (): string => {
    // Standard RFC4122 v4 UUID generator using crypto.getRandomValues
    const typedArray = new Uint8Array(16);
    crypto.getRandomValues(typedArray);
    
    // Set version 4 bits
    typedArray[6] = (typedArray[6] & 0x0f) | 0x40;
    // Set variant bits
    typedArray[8] = (typedArray[8] & 0x3f) | 0x80;
    
    const hex: string[] = [];
    for (let i = 0; i < 16; i++) {
      hex.push(typedArray[i].toString(16).padStart(2, '0'));
    }
    
    return [
      hex.slice(0, 4).join(''),
      hex.slice(4, 6).join(''),
      hex.slice(6, 8).join(''),
      hex.slice(8, 10).join(''),
      hex.slice(10, 16).join('')
    ].join('-');
  };

  const generateUUIDs = (generateCount: number = count) => {
    const safeCount = Math.min(100, Math.max(1, generateCount));
    const uuids: string[] = [];
    for (let i = 0; i < safeCount; i++) {
      uuids.push(uuidv4());
    }
    setOutput(uuids.join('\n'));
  };

  // Generate initial UUIDs on load
  useEffect(() => {
    generateUUIDs(5);
  }, []);

  const handleGenerate = () => {
    generateUUIDs(count);
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Fingerprint size={22} />
          </div>
          <div className="tool-info-text">
            <h2>UUID Generator</h2>
            <p>Generate cryptographically secure RFC4122 Version 4 UUIDs.</p>
          </div>
        </div>
      </div>

      <div className="row" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <div className="form-group" style={{ margin: 0, width: '120px' }}>
          <label className="form-label" htmlFor="uuid-count">Quantity</label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
          />
        </div>
        <button 
          className="btn-base btn-primary" 
          onClick={handleGenerate}
          style={{ marginTop: '20px' }}
        >
          <RefreshCw size={16} />
          <span>Generate</span>
        </button>
      </div>

      <OutputBox content={output} label="Generated UUIDs" />
    </div>
  );
};
export default UuidGenerator;
