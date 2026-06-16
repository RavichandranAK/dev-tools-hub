import React, { useState, useEffect } from 'react';
import { Code2, Trash2 } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('My phone number is 123-456-7890.');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const testRegex = () => {
    setIsError(false);
    if (!pattern) {
      setOutput('');
      return;
    }
    try {
      const re = new RegExp(pattern, flags);
      const matches: { text: string; index: number }[] = [];
      let m;

      if (flags.includes('g')) {
        let iterations = 0;
        const maxIterations = 5000;
        while ((m = re.exec(text)) !== null) {
          matches.push({ text: m[0], index: m.index });
          
          // CRITICAL BUG FIX: If match length is 0, advance lastIndex manually 
          // to prevent browser infinite loop freezing.
          if (m[0].length === 0) {
            re.lastIndex++;
          }
          
          iterations++;
          if (iterations > maxIterations) {
            matches.push({ text: '[TRUNCATED: Too many matches]', index: -1 });
            break;
          }
        }
      } else {
        m = re.exec(text);
        if (m) {
          matches.push({ text: m[0], index: m.index });
        }
      }

      if (matches.length === 0) {
        setOutput('No matches found.');
      } else {
        const lines = matches.map((match, i) => 
          `[${i + 1}] (Index: ${match.index}): "${match.text}"`
        );
        setOutput(`${matches.length} match${matches.length > 1 ? 'es' : ''} found:\n${lines.join('\n')}`);
      }
    } catch (err: any) {
      setIsError(true);
      setOutput('Invalid RegExp: ' + err.message);
    }
  };

  useEffect(() => {
    testRegex();
  }, [pattern, flags, text]);

  const handleClear = () => {
    setPattern('');
    setFlags('g');
    setText('');
    setOutput('');
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Code2 size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Regex Tester</h2>
            <p>Test and debug JavaScript regular expressions in real-time without loop freezes.</p>
          </div>
        </div>
      </div>

      <div className="grid-2col" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="regex-pattern">Regex Pattern</label>
          <input
            id="regex-pattern"
            type="text"
            placeholder="e.g. \d+"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="regex-flags">Flags</label>
          <input
            id="regex-flags"
            type="text"
            placeholder="g, i, m..."
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="regex-text">Test String</label>
        <textarea
          id="regex-text"
          rows={5}
          placeholder="Enter test text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-danger" onClick={handleClear}>
          <Trash2 size={16} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="output-section">
        <span className="form-label">Matches & Results</span>
        <div className={`output-container ${isError ? 'error' : output && output !== 'No matches found.' ? 'success' : ''}`}>
          {output || <span style={{ color: 'var(--color-text-tertiary)' }}>Matches will be updated as you type...</span>}
        </div>
      </div>
    </div>
  );
};
export default RegexTester;
