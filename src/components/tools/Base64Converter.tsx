import React, { useState } from 'react';
import { Lock, RefreshCw, Trash2 } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    if (!input) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        // Safe UTF-8 Base64 encoding using standard JS methods
        const utf8Bytes = new TextEncoder().encode(input);
        // Convert Uint8Array to binary string
        let binary = '';
        const len = utf8Bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(utf8Bytes[i]);
        }
        setOutput(btoa(binary));
      } else {
        // Decode Base64 string to binary string
        const binary = atob(input.trim());
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        setOutput(new TextDecoder().decode(bytes));
      }
    } catch (err: any) {
      setError(err.message);
      setOutput('Error: ' + err.message);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Lock size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Base64 Converter</h2>
            <p>Encode plain text to Base64 or decode Base64 strings.</p>
          </div>
        </div>
      </div>

      <div className="tabs-container" style={{ marginBottom: '20px' }}>
        <button 
          className={`tab-btn ${mode === 'encode' ? 'active' : ''}`}
          onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
        >
          Encode
        </button>
        <button 
          className={`tab-btn ${mode === 'decode' ? 'active' : ''}`}
          onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
        >
          Decode
        </button>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="b64-input">Input Text</label>
        <textarea
          id="b64-input"
          rows={6}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-primary" onClick={handleConvert}>
          <RefreshCw size={16} />
          <span>Convert</span>
        </button>
        <button className="btn-base btn-danger" onClick={handleClear}>
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>

      <OutputBox 
        content={output} 
        className={error ? 'error' : ''} 
      />
    </div>
  );
};
export default Base64Converter;
