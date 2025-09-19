import { Navbar } from '@/components/Navbar';
import { FloatChat } from '@/components/FloatChat';

const Chat = () => {
  return (
    <div className="min-h-screen bg-surface-gradient">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <FloatChat />
      </div>
    </div>
  );
};

export default Chat;


