import { useState } from 'react';
import { IcClose, IcSpark } from '../lib';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface FAQ {
  question: string;
  answer: string;
}

const FAQ_DATABASE: FAQ[] = [
  {
    question: 'What services do you offer?',
    answer: 'I specialize in graphic design, digital media, branding, and visual communication. This includes social media graphics, newsletters, print design, and campaign systems.',
  },
  {
    question: 'How can I contact you?',
    answer: 'You can reach me through the contact form on this site, or email me at esther.olowomakan@gmail.com. I typically respond within 24 hours.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes! While I\'m based in Lagos, Nigeria, I work with clients globally. Communication is seamless via email and video calls.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines depend on scope. A single flyer can be completed in 1-2 days, while a complete brand identity typically takes 2-3 weeks.',
  },
  {
    question: 'Can I see more of your work?',
    answer: 'Absolutely! Browse the Projects section to see my complete portfolio with detailed case studies.',
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes, I include revisions in my packages to ensure you\'re completely satisfied with the final result.',
  },
];

const DEFAULT_RESPONSES = [
  "Thanks for your message! I'll get back to you soon. In the meantime, feel free to explore my portfolio or check out the FAQ section.",
  "I appreciate your interest! For specific project inquiries, please use the contact form and I'll respond within 24 hours.",
  "Great question! You can find more information in the About and Services sections. If you need anything else, don't hesitate to reach out.",
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm Esther's assistant. How can I help you today?",
      isUser: false,
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(input);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Check FAQ database
    for (const faq of FAQ_DATABASE) {
      if (lowerInput.includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' '))) {
        return faq.answer;
      }
    }

    // Keyword matching
    if (lowerInput.includes('service') || lowerInput.includes('offer')) {
      return FAQ_DATABASE[0].answer;
    }
    if (lowerInput.includes('contact') || lowerInput.includes('email')) {
      return FAQ_DATABASE[1].answer;
    }
    if (lowerInput.includes('international') || lowerInput.includes('global')) {
      return FAQ_DATABASE[2].answer;
    }
    if (lowerInput.includes('timeline') || lowerInput.includes('how long')) {
      return FAQ_DATABASE[3].answer;
    }
    if (lowerInput.includes('portfolio') || lowerInput.includes('work')) {
      return FAQ_DATABASE[4].answer;
    }
    if (lowerInput.includes('revision')) {
      return FAQ_DATABASE[5].answer;
    }

    // Default response
    return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9997] flex h-14 w-14 items-center justify-center rounded-full bg-pine text-white shadow-2xl transition-all hover:bg-pine-dark hover:scale-110"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <IcClose className="h-6 w-6" />
        ) : (
          <IcSpark className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9997] w-80 sm:w-96 animate-pop-in">
          <div className="rounded-2xl bg-white shadow-2xl border border-line overflow-hidden">
            {/* Header */}
            <div className="bg-pine text-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
                  <IcSpark className="h-5 w-5 text-pine" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Esther's Assistant</h3>
                  <p className="text-xs text-white/70">Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-mist">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? 'bg-pine text-white'
                        : 'bg-white border border-line text-ink'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-line rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-line p-3 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-line rounded-lg focus:outline-none focus:border-pine text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-4 py-2 bg-pine text-white rounded-lg hover:bg-pine-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-slate mt-2 text-center">
                Try asking: "What services do you offer?" or "How can I contact you?"
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
