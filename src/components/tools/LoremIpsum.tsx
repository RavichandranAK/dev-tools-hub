import React, { useState, useEffect } from 'react';
import { AlignLeft, RefreshCw } from 'lucide-react';
import { OutputBox } from './OutputBox';

const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

export const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');

  const generateLorem = (pCount: number = count) => {
    const safeCount = Math.min(20, Math.max(1, pCount));
    const paras: string[] = [];
    for (let i = 0; i < safeCount; i++) {
      const len = 25 + Math.floor(Math.random() * 30);
      const words: string[] = [];
      for (let j = 0; j < len; j++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      paras.push(words.join(' ') + '.');
    }
    setOutput(paras.join('\n\n'));
  };

  useEffect(() => {
    generateLorem(3);
  }, []);

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <AlignLeft size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Lorem Ipsum Generator</h2>
            <p>Generate clean mockup paragraphs for copy-paste placeholders.</p>
          </div>
        </div>
      </div>

      <div className="row" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <div className="form-group" style={{ margin: 0, width: '120px' }}>
          <label className="form-label" htmlFor="lorem-count">Paragraphs</label>
          <input
            id="lorem-count"
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
          />
        </div>
        <button 
          className="btn-base btn-primary" 
          onClick={() => generateLorem(count)}
          style={{ marginTop: '20px' }}
        >
          <RefreshCw size={16} />
          <span>Generate</span>
        </button>
      </div>

      <OutputBox content={output} label="Generated Placeholder Text" />
    </div>
  );
};
export default LoremIpsum;
