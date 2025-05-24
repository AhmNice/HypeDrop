import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { MessageCircleCodeIcon, MessagesSquare } from 'lucide-react';

const ChatPage = () => {
  const [activeTab, setActiveTab] = useState('chat');
  useEffect(()=>{
    document.title = 'Messages | HypeDrop'
  },[])
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Navbar activeTab={activeTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Messages" />

        <main className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="text-center max-w-md">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-purple-100 mb-6">
              <MessagesSquare
                size={48}
                className="text-purple-600"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Messages
            </h2>
            <p className="text-gray-600 mb-6">
              Start a conversation or continue an existing one
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center mx-auto">
              <MessagesSquare className="mr-2" size={20} />
              New Message
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;