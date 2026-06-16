import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface OutputBoxProps {
  content: string;
  className?: string;
  label?: string;
}

export const OutputBox: React.FC<OutputBoxProps> = ({ 
  content, 
  className = '', 
  label = 'Output' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="output-section">
      <div className="output-header">
        <span className="form-label">{label}</span>
        {content && (
          <button 
            type="button"
            className="btn-base" 
            onClick={handleCopy} 
            style={{ padding: '6px 12px', fontSize: '12px', height: '32px' }}
          >
            {copied ? (
              <>
                <Check size={14} style={{ color: 'var(--color-success-text)' }} />
                <span style={{ color: 'var(--color-success-text)' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      <div className={`output-container ${className}`}>
        {content || <span style={{ color: 'var(--color-text-tertiary)' }}>No output generated yet</span>}
      </div>
    </div>
  );
};
