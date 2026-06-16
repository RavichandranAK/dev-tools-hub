import React, { useState } from 'react';
import { Hash, Trash2 } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { OutputBox } from './OutputBox';

type AlgoType = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

export const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoType>('SHA-256');

  const generateHash = (algo: AlgoType = selectedAlgo) => {
    if (!input) {
      setOutput('');
      return;
    }
    let hashResult = '';
    switch (algo) {
      case 'MD5':
        hashResult = CryptoJS.MD5(input).toString();
        break;
      case 'SHA-1':
        hashResult = CryptoJS.SHA1(input).toString();
        break;
      case 'SHA-256':
        hashResult = CryptoJS.SHA256(input).toString();
        break;
      case 'SHA-512':
        hashResult = CryptoJS.SHA512(input).toString();
        break;
    }
    setOutput(`${algo} HASH:\n${hashResult}`);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleAlgoChange = (algo: AlgoType) => {
    setSelectedAlgo(algo);
    if (input) {
      generateHash(algo);
    }
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Hash size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Hash Generator</h2>
            <p>Generate cryptographic MD5, SHA-1, SHA-256, and SHA-512 hashes from input text.</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="hash-input">Input String</label>
        <textarea
          id="hash-input"
          rows={5}
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button 
          className={`btn-base ${selectedAlgo === 'SHA-256' ? 'btn-primary' : ''}`}
          onClick={() => handleAlgoChange('SHA-256')}
        >
          SHA-256
        </button>
        <button 
          className={`btn-base ${selectedAlgo === 'SHA-1' ? 'btn-primary' : ''}`}
          onClick={() => handleAlgoChange('SHA-1')}
        >
          SHA-1
        </button>
        <button 
          className={`btn-base ${selectedAlgo === 'SHA-512' ? 'btn-primary' : ''}`}
          onClick={() => handleAlgoChange('SHA-512')}
        >
          SHA-512
        </button>
        <button 
          className={`btn-base ${selectedAlgo === 'MD5' ? 'btn-primary' : ''}`}
          onClick={() => handleAlgoChange('MD5')}
        >
          MD5
        </button>
        <button className="btn-base btn-danger btn-icon" onClick={handleClear} title="Clear text">
          <Trash2 size={16} />
        </button>
      </div>

      <OutputBox content={output} />
    </div>
  );
};
export default HashGenerator;
