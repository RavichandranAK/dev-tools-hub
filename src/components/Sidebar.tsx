import React from 'react';
import { 
  Home, 
  Braces, 
  Lock, 
  Link, 
  GitCompare, 
  Type, 
  Hash, 
  Fingerprint, 
  Shield, 
  AlignLeft, 
  Clock, 
  Palette, 
  Binary, 
  Code2, 
  Key, 
  Table 
} from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  desc: string;
  category: 'Text' | 'Generators' | 'Convert';
  icon: React.ComponentType<any>;
}

export const toolsList: ToolItem[] = [
  { id: 'json', name: 'JSON Formatter', desc: 'Validate & beautify JSON', category: 'Text', icon: Braces },
  { id: 'base64', name: 'Base64 Converter', desc: 'Encode & decode Base64', category: 'Text', icon: Lock },
  { id: 'url', name: 'URL Encoder', desc: 'Encode & decode URLs', category: 'Text', icon: Link },
  { id: 'diff', name: 'Text Diff', desc: 'Compare two texts', category: 'Text', icon: GitCompare },
  { id: 'case', name: 'Case Converter', desc: 'camelCase, snake_case...', category: 'Text', icon: Type },
  { id: 'hash', name: 'Hash Generator', desc: 'MD5, SHA1, SHA256, SHA512', category: 'Generators', icon: Hash },
  { id: 'uuid', name: 'UUID Generator', desc: 'Generate random UUIDs', category: 'Generators', icon: Fingerprint },
  { id: 'password', name: 'Password Gen', desc: 'Secure random passwords', category: 'Generators', icon: Shield },
  { id: 'lorem', name: 'Lorem Ipsum', desc: 'Generate placeholder text', category: 'Generators', icon: AlignLeft },
  { id: 'timestamp', name: 'Timestamp', desc: 'Convert epoch & dates', category: 'Convert', icon: Clock },
  { id: 'color', name: 'Color Converter', desc: 'HEX, RGB, HSL', category: 'Convert', icon: Palette },
  { id: 'number', name: 'Number Base', desc: 'Binary, hex, octal', category: 'Convert', icon: Binary },
  { id: 'regex', name: 'Regex Tester', desc: 'Test & debug patterns', category: 'Convert', icon: Code2 },
  { id: 'jwt', name: 'JWT Decoder', desc: 'Decode JWT tokens', category: 'Convert', icon: Key },
  { id: 'csv', name: 'CSV → JSON', desc: 'Convert CSV to JSON', category: 'Convert', icon: Table },
];

interface SidebarProps {
  currentTool: string;
  setCurrentTool: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  searchQuery: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTool, 
  setCurrentTool, 
  isOpen, 
  setIsOpen,
  searchQuery
}) => {
  const categories: ('Text' | 'Generators' | 'Convert')[] = ['Text', 'Generators', 'Convert'];

  // Filter tools based on search query
  const filteredTools = toolsList.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setCurrentTool(id);
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)}
      />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Tool categories">
        <button 
          className={`sidebar-item ${currentTool === 'home' ? 'active' : ''}`}
          onClick={() => handleSelect('home')}
        >
          <Home />
          <span>Home</span>
        </button>

        {categories.map(cat => {
          const catTools = filteredTools.filter(t => t.category === cat);
          if (catTools.length === 0) return null;

          return (
            <React.Fragment key={cat}>
              <div className="sidebar-section-title">{cat}</div>
              {catTools.map(tool => {
                const IconComponent = tool.icon;
                return (
                  <button
                    key={tool.id}
                    className={`sidebar-item ${currentTool === tool.id ? 'active' : ''}`}
                    onClick={() => handleSelect(tool.id)}
                  >
                    <IconComponent />
                    <span>{tool.name}</span>
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
};
