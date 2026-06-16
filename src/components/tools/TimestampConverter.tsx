import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';

export const TimestampConverter: React.FC = () => {
  const [epoch, setEpoch] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [output, setOutput] = useState('');

  const setNow = () => {
    const nowSec = Math.floor(Date.now() / 1000);
    setEpoch(nowSec.toString());
    const d = new Date(nowSec * 1000);
    setDateStr(d.toISOString().slice(0, 19)); // ISO string format for date inputs
    
    setOutput(
      `UTC: ${d.toUTCString()}\n` +
      `ISO 8601: ${d.toISOString()}\n` +
      `Local: ${d.toString()}`
    );
  };

  useEffect(() => {
    setNow();
  }, []);

  const handleEpochToDate = () => {
    const epVal = parseInt(epoch);
    if (isNaN(epVal)) {
      setOutput('Error: Invalid Unix Timestamp');
      return;
    }
    const d = new Date(epVal * 1000);
    setDateStr(d.toISOString().slice(0, 19));
    setOutput(
      `UTC: ${d.toUTCString()}\n` +
      `ISO 8601: ${d.toISOString()}\n` +
      `Local: ${d.toString()}`
    );
  };

  const handleDateToEpoch = () => {
    if (!dateStr) {
      setOutput('Error: Date string is empty');
      return;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      setOutput('Error: Invalid Date');
      return;
    }
    const sec = Math.floor(d.getTime() / 1000);
    setEpoch(sec.toString());
    setOutput(
      `Unix Epoch: ${sec} seconds\n` +
      `Milliseconds: ${d.getTime()}\n` +
      `UTC: ${d.toUTCString()}\n` +
      `Local: ${d.toString()}`
    );
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Clock size={22} />
          </div>
          <div className="tool-info-text">
            <h2>Timestamp Converter</h2>
            <p>Convert Unix timestamps to human-readable dates, and vice versa.</p>
          </div>
        </div>
      </div>

      <div className="grid-2col" style={{ marginBottom: '20px' }}>
        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="epoch-input">Unix Epoch (seconds)</label>
            <input
              id="epoch-input"
              type="text"
              placeholder="e.g. 1718500000"
              value={epoch}
              onChange={(e) => setEpoch(e.target.value)}
            />
          </div>
          <div className="flex-row">
            <button className="btn-base btn-primary" onClick={handleEpochToDate}>
              <RefreshCw size={14} />
              <span>Convert to Date</span>
            </button>
            <button className="btn-base" onClick={setNow}>
              <span>Use Current Time</span>
            </button>
          </div>
        </div>

        <div>
          <div className="form-group">
            <label className="form-label" htmlFor="date-input">Human Date / ISO 8601</label>
            <input
              id="date-input"
              type="text"
              placeholder="e.g. 2024-06-16T10:00:00"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </div>
          <div className="flex-row">
            <button className="btn-base btn-primary" onClick={handleDateToEpoch}>
              <RefreshCw size={14} />
              <span>Convert to Epoch</span>
            </button>
          </div>
        </div>
      </div>

      <div className="output-section">
        <span className="form-label">Conversion Output</span>
        <div className="output-container" style={{ whiteSpace: 'pre-line' }}>
          {output}
        </div>
      </div>
    </div>
  );
};
export default TimestampConverter;
