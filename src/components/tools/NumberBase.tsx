import React, { useState } from 'react';
import { Binary } from 'lucide-react';

export const NumberBase: React.FC = () => {
  const [dec, setDec] = useState('');
  const [bin, setBin] = useState('');
  const [hex, setHex] = useState('');
  const [oct, setOct] = useState('');

  const clearAll = () => {
    setDec('');
    setBin('');
    setHex('');
    setOct('');
  };

  const updateFromDec = (val: string) => {
    setDec(val);
    if (!val.trim()) {
      clearAll();
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setBin(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setOct(num.toString(8));
    } else {
      setBin('');
      setHex('');
      setOct('');
    }
  };

  const updateFromBin = (val: string) => {
    setBin(val);
    if (!val.trim()) {
      clearAll();
      return;
    }
    const cleanVal = val.replace(/[^01]/g, '');
    if (cleanVal !== val) setBin(cleanVal);
    
    const num = parseInt(cleanVal, 2);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setHex(num.toString(16).toUpperCase());
      setOct(num.toString(8));
    } else {
      setDec('');
      setHex('');
      setOct('');
    }
  };

  const updateFromHex = (val: string) => {
    setHex(val);
    if (!val.trim()) {
      clearAll();
      return;
    }
    const cleanVal = val.replace(/[^0-9a-fA-F]/g, '');
    if (cleanVal !== val) setHex(cleanVal);

    const num = parseInt(cleanVal, 16);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setBin(num.toString(2));
      setOct(num.toString(8));
    } else {
      setDec('');
      setBin('');
      setOct('');
    }
  };

  const updateFromOct = (val: string) => {
    setOct(val);
    if (!val.trim()) {
      clearAll();
      return;
    }
    const cleanVal = val.replace(/[^0-7]/g, '');
    if (cleanVal !== val) setOct(cleanVal);

    const num = parseInt(cleanVal, 8);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setBin(num.toString(2));
      setHex(num.toString(16).toUpperCase());
    } else {
      setDec('');
      setBin('');
      setHex('');
    }
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Binary size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Number Base Converter</h2>
            <p>Convert integer numbers bidirectionally between Decimal, Binary, Hexadecimal, and Octal formats.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="num-dec">Decimal (Base 10)</label>
          <input
            id="num-dec"
            type="text"
            placeholder="e.g. 255"
            value={dec}
            onChange={(e) => updateFromDec(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="num-bin">Binary (Base 2)</label>
          <input
            id="num-bin"
            type="text"
            placeholder="e.g. 11111111"
            value={bin}
            onChange={(e) => updateFromBin(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="num-hex">Hexadecimal (Base 16)</label>
          <input
            id="num-hex"
            type="text"
            placeholder="e.g. FF"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="num-oct">Octal (Base 8)</label>
          <input
            id="num-oct"
            type="text"
            placeholder="e.g. 377"
            value={oct}
            onChange={(e) => updateFromOct(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default NumberBase;
