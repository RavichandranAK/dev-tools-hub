import React, { useState, useEffect } from 'react';
import { Key, Trash2 } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  const decodeJWT = () => {
    setError('');
    if (!token.trim()) {
      setHeader('');
      setPayload('');
      return;
    }

    try {
      const parts = token.trim().split('.');
      if (parts.length < 2) {
        throw new Error('Invalid JWT format (requires header and payload segments separated by dots)');
      }

      const decodeBase64Url = (str: string) => {
        // Replace url safe characters
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        
        // CRITICAL BUG FIX: Pad base64 string to multiple of 4
        const pad = (4 - (base64.length % 4)) % 4;
        base64 = base64.padEnd(base64.length + pad, '=');

        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        
        const decodedText = new TextDecoder().decode(bytes);
        return JSON.stringify(JSON.parse(decodedText), null, 2);
      };

      setHeader(decodeBase64Url(parts[0]));
      setPayload(decodeBase64Url(parts[1]));
    } catch (err: any) {
      setError(err.message);
      setHeader('');
      setPayload('');
    }
  };

  useEffect(() => {
    decodeJWT();
  }, [token]);

  const handleClear = () => {
    setToken('');
    setHeader('');
    setPayload('');
    setError('');
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Key size={22} />
          </div>
          <div className="tool-info-text">
            <h2>JWT Decoder</h2>
            <p>Decode JSON Web Tokens and view header and payload claims (no signature validation).</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="jwt-input">Encoded Token (JWT)</label>
        <textarea
          id="jwt-input"
          rows={4}
          placeholder="Paste encoded JWT here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-danger" onClick={handleClear}>
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>

      {error ? (
        <OutputBox content={`Error: ${error}`} className="error" label="Decoding Error" />
      ) : (
        <div className="grid-2col">
          <OutputBox content={header} className={header ? 'success' : ''} label="Header (Algorithm & Type)" />
          <OutputBox content={payload} className={payload ? 'success' : ''} label="Payload (Data Claims)" />
        </div>
      )}
    </div>
  );
};
export default JwtDecoder;
