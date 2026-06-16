import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, toolsList } from './components/Sidebar';

// Import Tools
import JsonFormatter from './components/tools/JsonFormatter';
import Base64Converter from './components/tools/Base64Converter';
import UrlEncoder from './components/tools/UrlEncoder';
import TextDiff from './components/tools/TextDiff';
import CaseConverter from './components/tools/CaseConverter';
import HashGenerator from './components/tools/HashGenerator';
import UuidGenerator from './components/tools/UuidGenerator';
import PasswordGenerator from './components/tools/PasswordGenerator';
import LoremIpsum from './components/tools/LoremIpsum';
import TimestampConverter from './components/tools/TimestampConverter';
import ColorConverter from './components/tools/ColorConverter';
import NumberBase from './components/tools/NumberBase';
import RegexTester from './components/tools/RegexTester';
import JwtDecoder from './components/tools/JwtDecoder';
import CsvToJson from './components/tools/CsvToJson';

function App() {
  const [currentTool, setCurrentTool] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Set default body theme class to 'dark' on mount
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Render the active tool component
  const renderActiveTool = () => {
    switch (currentTool) {
      case 'json':
        return <JsonFormatter />;
      case 'base64':
        return <Base64Converter />;
      case 'url':
        return <UrlEncoder />;
      case 'diff':
        return <TextDiff />;
      case 'case':
        return <CaseConverter />;
      case 'hash':
        return <HashGenerator />;
      case 'uuid':
        return <UuidGenerator />;
      case 'password':
        return <PasswordGenerator />;
      case 'lorem':
        return <LoremIpsum />;
      case 'timestamp':
        return <TimestampConverter />;
      case 'color':
        return <ColorConverter />;
      case 'number':
        return <NumberBase />;
      case 'regex':
        return <RegexTester />;
      case 'jwt':
        return <JwtDecoder />;
      case 'csv':
        return <CsvToJson />;
      default:
        return renderHomeDashboard();
    }
  };

  // Filter tools based on search query
  const filteredTools = toolsList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHomeDashboard = () => (
    <div className="content-wrapper">
      <div className="dashboard-hero">
        <h1>Developer Tools Hub</h1>
        <p>A collection of robust, browser-based utility tools for your daily development workflow.</p>
      </div>

      <div className="tools-grid">
        {filteredTools.map(tool => {
          const IconComp = tool.icon;
          return (
            <div 
              key={tool.id} 
              className="tool-card"
              onClick={() => setCurrentTool(tool.id)}
            >
              <div className="tool-card-icon">
                <IconComp size={22} />
              </div>
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </div>
          );
        })}
        {filteredTools.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-tertiary)' }}>
            No tools found matching your search.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Header 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={setTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="layout">
        <Sidebar 
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          searchQuery={searchQuery}
        />
        
        <main className="main-content">
          {renderActiveTool()}
        </main>
      </div>
    </div>
  );
}

export default App;
