import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Mic, ChevronDown, Menu, Search, MoreVertical } from 'lucide-react';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hey there! How are you doing?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'I\'m good, thanks! Just working on some projects.', time: '10:32 AM' },
    { id: 3, sender: 'other', text: 'That sounds interesting. What kind of projects?', time: '10:33 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-medium">JD</span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'me'
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-white border border-gray-200 rounded-bl-none'}`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-purple-100' : 'text-gray-500'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Smile className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none max-h-20"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${newMessage.trim() ? 'text-purple-600 hover:bg-purple-50' : 'text-gray-400'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;