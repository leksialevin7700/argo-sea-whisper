import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import { Message } from '../FloatChat';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatInterface = ({ messages, onSendMessage }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsTyping(true);
    onSendMessage(input);
    setInput('');
    
    // Simulate realistic processing delay
    setTimeout(() => setIsTyping(false), 1500 + Math.random() * 1000);
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Ocean Data Assistant
        </h3>
        <p className="text-sm text-muted-foreground">Ask me about ARGO oceanographic data</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.type === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border shadow-sm",
                message.type === 'user' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              
              <div className={cn(
                "rounded-lg px-3 py-2 text-sm shadow-sm",
                message.type === 'user'
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted"
              )}>
                <p className="leading-relaxed">{message.content}</p>
                <div className="mt-1 text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border shadow-sm bg-muted">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg px-3 py-2 text-sm shadow-sm bg-muted">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ocean temperature, salinity, trends..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};