import React, { useState } from 'react';
import { Link, RefreshCw, Trash2 } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const UrlEncoder: React.FC = () => {
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
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
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
            <Link size={22} />
          </div>
          <div className="tool-info-text">
            <h2>URL Encoder / Decoder</h2>
            <p>Encode or decode URL characters safely.</p>
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
        <label className="form-label" htmlFor="url-input">Input URL / Text</label>
        <textarea
          id="url-input"
          rows={6}
          placeholder={mode === 'encode' ? 'Enter text (e.g. query params)...' : 'Enter URL encoded text...'}
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
export default UrlEncoder;
