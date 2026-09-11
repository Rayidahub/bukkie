import { useState } from 'react';
import { IcCheck, IcCopy } from '../lib';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group my-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-pine-dark text-white/80 px-4 py-2 rounded-t-lg border-b border-white/10">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-sm font-mono">{filename}</span>
          )}
          {language && (
            <span className="text-xs px-2 py-0.5 bg-white/10 rounded uppercase">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 text-sm hover:bg-white/10 rounded transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <IcCheck className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <IcCopy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto bg-pine-dark/50 rounded-b-lg">
        <pre className="p-4 text-sm">
          <code className={`language-${language} text-white/90 font-mono`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
