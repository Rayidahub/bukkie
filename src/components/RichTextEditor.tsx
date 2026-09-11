import { useState, useRef, useEffect } from 'react';
import { IcBold, IcItalic, IcList, IcListOrdered, IcLink, IcHeading, IcQuoteBlock, IcCode } from '../lib';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleHeading = () => {
    execCommand('formatBlock', 'h2');
  };

  const handleQuote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  const handleCode = () => {
    execCommand('formatBlock', 'pre');
  };

  const ToolbarButton = ({ onClick, icon: Icon, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded hover:bg-pine/10 transition-colors"
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="border border-line rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-line bg-mist p-2 flex flex-wrap gap-1">
        <ToolbarButton onClick={() => execCommand('bold')} icon={IcBold} title="Bold" />
        <ToolbarButton onClick={() => execCommand('italic')} icon={IcItalic} title="Italic" />
        <div className="w-px bg-line mx-1" />
        <ToolbarButton onClick={handleHeading} icon={IcHeading} title="Heading" />
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} icon={IcList} title="Bullet List" />
        <ToolbarButton onClick={() => execCommand('insertOrderedList')} icon={IcListOrdered} title="Numbered List" />
        <div className="w-px bg-line mx-1" />
        <ToolbarButton onClick={handleLink} icon={IcLink} title="Link" />
        <ToolbarButton onClick={handleQuote} icon={IcQuoteBlock} title="Quote" />
        <ToolbarButton onClick={handleCode} icon={IcCode} title="Code Block" />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
        className={`min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none transition-colors ${
          isFocused ? 'bg-white' : 'bg-mist/50'
        }`}
        style={{
          minHeight: '300px',
        }}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] h1,
        [contenteditable] h2,
        [contenteditable] h3 {
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        [contenteditable] h2 {
          font-size: 1.5em;
        }
        [contenteditable] h3 {
          font-size: 1.25em;
        }
        [contenteditable] p {
          margin-bottom: 1em;
        }
        [contenteditable] ul,
        [contenteditable] ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #f7b900;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #47566e;
        }
        [contenteditable] pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          margin: 1em 0;
        }
        [contenteditable] code {
          background: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-size: 0.9em;
        }
        [contenteditable] a {
          color: #00439a;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
