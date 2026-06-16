import React, { useState } from 'react';
import { Type, Trash2 } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const getWords = (str: string): string[] => {
    return str
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
  };

  const convertCase = (type: 'camel' | 'pascal' | 'snake' | 'kebab' | 'upper' | 'lower' | 'title') => {
    if (!input) {
      setOutput('');
      return;
    }
    const words = getWords(input);
    let result = '';
    
    switch (type) {
      case 'camel':
        result = words.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('');
        break;
      case 'pascal':
        result = words.map(w => w[0].toUpperCase() + w.slice(1)).join('');
        break;
      case 'snake':
        result = words.join('_');
        break;
      case 'kebab':
        result = words.join('-');
        break;
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = words.map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        break;
    }
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Type size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Case Converter</h2>
            <p>Convert text strings between common variable and text cases.</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="case-input">Input String</label>
        <textarea
          id="case-input"
          rows={5}
          placeholder="Enter text to convert (e.g. hello_world or someVariableName)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ gap: '8px', marginBottom: '20px' }}>
        <button className="btn-base" onClick={() => convertCase('camel')}>camelCase</button>
        <button className="btn-base" onClick={() => convertCase('pascal')}>PascalCase</button>
        <button className="btn-base" onClick={() => convertCase('snake')}>snake_case</button>
        <button className="btn-base" onClick={() => convertCase('kebab')}>kebab-case</button>
        <button className="btn-base" onClick={() => convertCase('upper')}>UPPER</button>
        <button className="btn-base" onClick={() => convertCase('lower')}>lower</button>
        <button className="btn-base" onClick={() => convertCase('title')}>Title Case</button>
        <button className="btn-base btn-danger btn-icon" onClick={handleClear} title="Clear inputs">
          <Trash2 size={16} />
        </button>
      </div>

      <OutputBox content={output} />
    </div>
  );
};
export default CaseConverter;
