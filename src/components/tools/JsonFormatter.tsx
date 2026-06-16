import React, { useState } from 'react';
import { Braces, Minimize2, Sparkles, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const formatJSON = () => {
    if (!input.trim()) {
      setOutput('');
      setStatus({ type: null, message: '' });
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus({ type: 'success', message: 'Valid JSON' });
    } catch (err: any) {
      setOutput('Error: ' + err.message);
      setStatus({ type: 'error', message: 'Invalid JSON: ' + err.message });
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setOutput('');
      setStatus({ type: null, message: '' });
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setStatus({ type: 'success', message: 'Valid JSON (Minified)' });
    } catch (err: any) {
      setOutput('Error: ' + err.message);
      setStatus({ type: 'error', message: 'Invalid JSON: ' + err.message });
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setStatus({ type: null, message: '' });
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Braces size={22} />
          </div>
          <div className="tool-info-text">
            <h2>JSON Formatter & Validator</h2>
            <p>Validate, beautify, and minify your JSON data.</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="json-input">Input JSON</label>
        <textarea
          id="json-input"
          rows={8}
          placeholder='{"name": "Alice", "age": 28, "skills": ["React", "TypeScript"]}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-primary" onClick={formatJSON}>
          <Sparkles size={16} />
          <span>Format</span>
        </button>
        <button className="btn-base" onClick={minifyJSON}>
          <Minimize2 size={16} />
          <span>Minify</span>
        </button>
        <button className="btn-base btn-danger" onClick={handleClear}>
          <Trash2 size={16} />
          <span>Clear</span>
        </button>

        {status.type && (
          <span className={`badge ${status.type === 'success' ? 'badge-success' : 'badge-error'}`} style={{ marginLeft: 'auto' }}>
            {status.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            <span>{status.message}</span>
          </span>
        )}
      </div>

      <OutputBox 
        content={output} 
        className={status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''} 
      />
    </div>
  );
};
export default JsonFormatter;
