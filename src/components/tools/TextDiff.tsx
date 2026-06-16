import React, { useState } from 'react';
import { GitCompare, Trash2 } from 'lucide-react';

interface DiffResultItem {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}

export const TextDiff: React.FC = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResultItem[]>([]);
  const [hasRun, setHasRun] = useState(false);

  // Dynamic Programming LCS Diff Algorithm
  const calculateDiff = () => {
    setHasRun(true);
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    
    const n = linesA.length;
    const m = linesB.length;
    
    // Prevent browser hanging on extremely large texts in browser memory
    if (n * m > 2000000) {
      setDiffResult([
        { type: 'removed', text: 'Text is too large to perform standard LCS diff in browser memory.' },
        { type: 'added', text: 'Please compare smaller snippets.' }
      ]);
      return;
    }

    const dp: number[][] = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (linesA[i - 1] === linesB[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    let i = n;
    let j = m;
    const result: DiffResultItem[] = [];

    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
        result.push({ type: 'unchanged', text: linesA[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        result.push({ type: 'added', text: linesB[j - 1] });
        j--;
      } else {
        result.push({ type: 'removed', text: linesA[i - 1] });
        i--;
      }
    }

    setDiffResult(result.reverse());
  };

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setDiffResult([]);
    setHasRun(false);
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <GitCompare size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Text Diff Checker</h2>
            <p>Compare two text snippets side-by-side using LCS diff alignment.</p>
          </div>
        </div>
      </div>

      <div className="grid-2col" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="diff-a">Original Text</label>
          <textarea
            id="diff-a"
            rows={8}
            placeholder="Paste original text here..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="diff-b">Modified Text</label>
          <textarea
            id="diff-b"
            rows={8}
            placeholder="Paste modified text here..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-primary" onClick={calculateDiff}>
          <GitCompare size={16} />
          <span>Compare Texts</span>
        </button>
        <button className="btn-base btn-danger" onClick={handleClear}>
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>

      {hasRun && (
        <div className="output-section">
          <span className="form-label">Diff Comparison</span>
          <div 
            className="output-container" 
            style={{ 
              padding: '0', 
              overflow: 'hidden', 
              maxHeight: 'none', 
              fontFamily: 'var(--font-mono)' 
            }}
          >
            {diffResult.length === 0 ? (
              <div style={{ padding: '16px', color: 'var(--color-text-tertiary)' }}>Texts are identical</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {diffResult.map((line, idx) => {
                  let bgColor = 'transparent';
                  let textColor = 'var(--color-text-primary)';
                  let indicator = ' ';
                  
                  if (line.type === 'added') {
                    bgColor = 'var(--color-success-bg)';
                    textColor = 'var(--color-success-text)';
                    indicator = '+';
                  } else if (line.type === 'removed') {
                    bgColor = 'var(--color-error-bg)';
                    textColor = 'var(--color-error-text)';
                    indicator = '-';
                  } else {
                    textColor = 'var(--color-text-secondary)';
                  }

                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        background: bgColor, 
                        color: textColor,
                        padding: '3px 12px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
                        fontSize: '13px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all'
                      }}
                    >
                      <span style={{ width: '24px', flexShrink: 0, opacity: 0.5, userSelect: 'none' }}>{indicator}</span>
                      <span>{line.text || ' '}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TextDiff;
