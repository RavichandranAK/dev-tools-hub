import React, { useState } from 'react';
import { Table, Trash2, ArrowRight } from 'lucide-react';
import { OutputBox } from './OutputBox';

export const CsvToJson: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  // Quote-aware CSV parser
  const parseCSV = (csvStr: string): string[][] => {
    const result: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < csvStr.length; i++) {
      const char = csvStr[i];
      const nextChar = csvStr[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Double double-quotes inside quotes is an escaped quote
          cell += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote context
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(cell.trim());
        cell = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++; // Skip LF part of CRLF
        }
        row.push(cell.trim());
        result.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }

    // Flush remaining characters
    if (cell || row.length > 0) {
      row.push(cell.trim());
      result.push(row);
    }

    // Filter out completely empty lines
    return result.filter(r => r.length > 0 && r.some(val => val !== ''));
  };

  const handleConvert = () => {
    setIsError(false);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const parsedLines = parseCSV(input);
      if (parsedLines.length === 0) {
        setOutput('[]');
        return;
      }

      const headers = parsedLines[0];
      const jsonResult = parsedLines.slice(1).map(row => {
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] !== undefined ? row[index] : '';
        });
        return obj;
      });

      setOutput(JSON.stringify(jsonResult, null, 2));
    } catch (err: any) {
      setIsError(true);
      setOutput('Error converting CSV: ' + err.message);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setIsError(false);
  };

  return (
    <div className="tool-panel">
      <div className="tool-header-row">
        <div className="tool-info">
          <div className="tool-icon-wrap">
            <Table size={22} />
          </div>
          <div className="tool-info-text">
            <h2>CSV to JSON Converter</h2>
            <p>Convert comma-separated values (first row = headers) into JSON arrays.</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="csv-input">Input CSV Data</label>
        <textarea
          id="csv-input"
          rows={6}
          placeholder='name,age,city&#10;"Smith, John",32,"New York"&#10;"Doe, Jane",28,"San Francisco"'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex-row" style={{ marginBottom: '20px' }}>
        <button className="btn-base btn-primary" onClick={handleConvert}>
          <ArrowRight size={16} />
          <span>Convert CSV</span>
        </button>
        <button className="btn-base btn-danger" onClick={handleClear}>
          <Trash2 size={16} />
          <span>Clear</span>
        </button>
      </div>

      <OutputBox content={output} className={isError ? 'error' : output ? 'success' : ''} />
    </div>
  );
};
export default CsvToJson;
