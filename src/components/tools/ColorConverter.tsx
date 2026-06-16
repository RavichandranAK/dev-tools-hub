import React, { useState } from 'react';
import { Palette } from 'lucide-react';

export const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState('rgb(99, 102, 241)');
  const [hsl, setHsl] = useState('hsl(239, 84%, 67%)');
  const [pickerColor, setPickerColor] = useState('#6366f1');

  // Conversion Helpers
  const hexToRgb = (hexStr: string) => {
    let cleanHex = hexStr.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) return null;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (c: number) => {
      const h = Math.max(0, Math.min(255, c)).toString(16);
      return h.length === 1 ? '0' + h : h;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r = l;
    let g = l;
    let b = l;

    if (s !== 0) {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Synchronizers
  const updateFromHex = (value: string) => {
    setHex(value);
    const rgbVal = hexToRgb(value);
    if (rgbVal) {
      const { r, g, b } = rgbVal;
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const { h, s, l } = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
      if (value.length === 7) {
        setPickerColor(value);
      }
    }
  };

  const updateFromRgb = (value: string) => {
    setRgb(value);
    // Parse rgb(r, g, b) or r, g, b
    const matches = value.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const r = parseInt(matches[0]);
      const g = parseInt(matches[1]);
      const b = parseInt(matches[2]);
      if (r <= 255 && g <= 255 && b <= 255) {
        const hexVal = rgbToHex(r, g, b);
        setHex(hexVal);
        setPickerColor(hexVal);
        const { h, s, l } = rgbToHsl(r, g, b);
        setHsl(`hsl(${h}, ${s}%, ${l}%)`);
      }
    }
  };

  const updateFromHsl = (value: string) => {
    setHsl(value);
    // Parse hsl(h, s%, l%) or h, s, l
    const matches = value.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const h = parseInt(matches[0]);
      const s = parseInt(matches[1]);
      const l = parseInt(matches[2]);
      if (h <= 360 && s <= 100 && l <= 100) {
        const { r, g, b } = hslToRgb(h, s, l);
        setRgb(`rgb(${r}, ${g}, ${b})`);
        const hexVal = rgbToHex(r, g, b);
        setHex(hexVal);
        setPickerColor(hexVal);
      }
    }
  };

  const updateFromPicker = (value: string) => {
    setPickerColor(value);
    setHex(value);
    const rgbVal = hexToRgb(value);
    if (rgbVal) {
      const { r, g, b } = rgbVal;
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const { h, s, l } = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    }
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Palette size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Color Converter</h2>
            <p>Convert and inspect colors bidirectionally between HEX, RGB, and HSL formats.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '64px', height: '64px' }}>
          <input
            type="color"
            value={pickerColor}
            onChange={(e) => updateFromPicker(e.target.value)}
            style={{
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              zIndex: 2,
            }}
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'var(--border-radius-md)',
              border: '2px solid var(--color-border)',
              background: hex,
              boxShadow: 'var(--shadow-sm)',
              zIndex: 1,
            }}
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" htmlFor="hex-color">HEX Code</label>
            <input
              id="hex-color"
              type="text"
              value={hex}
              placeholder="#ffffff"
              onChange={(e) => updateFromHex(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid-2col" style={{ marginBottom: '24px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="rgb-color">RGB Format</label>
          <input
            id="rgb-color"
            type="text"
            value={rgb}
            placeholder="rgb(255, 255, 255)"
            onChange={(e) => updateFromRgb(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="hsl-color">HSL Format</label>
          <input
            id="hsl-color"
            type="text"
            value={hsl}
            placeholder="hsl(0, 0%, 100%)"
            onChange={(e) => updateFromHsl(e.target.value)}
          />
        </div>
      </div>

      <div>
        <span className="form-label">Color Preview Palette</span>
        <div 
          style={{ 
            height: '80px', 
            borderRadius: 'var(--border-radius-lg)', 
            background: hex,
            transition: 'background var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hexToRgb(hex) && (hexToRgb(hex)!.r * 0.299 + hexToRgb(hex)!.g * 0.587 + hexToRgb(hex)!.b * 0.114) > 186 ? '#000' : '#fff',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.04em',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
          }}
        >
          {hex.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default ColorConverter;
