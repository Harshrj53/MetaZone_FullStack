import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm the MetaZone Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userMsg.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    const getBotResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
            return "Hello! Looking for something specific?";
        }
        if (lowerQuery.includes('order') || lowerQuery.includes('track')) {
            return "You can track your orders in the 'My Orders' section of your profile.";
        }
        if (lowerQuery.includes('return') || lowerQuery.includes('refund')) {
            return "We have a 30-day return policy. Please contact support@metazone.com for assistance.";
        }
        if (lowerQuery.includes('shipping') || lowerQuery.includes('delivery')) {
            return "Shipping is free for all orders! Delivery usually takes 3-5 business days.";
        }
        if (lowerQuery.includes('discount') || lowerQuery.includes('coupon')) {
            return "Check our homepage for the latest discount codes! Or refer a friend to earn credits.";
        }
        if (lowerQuery.includes('product') || lowerQuery.includes('stock')) {
            return "You can search for products using the search bar at the top of the page.";
        }

        return "I'm not sure about that. Try asking about orders, shipping, or returns!";
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110"
                >
                    <FaRobot size={28} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] border border-gray-200 overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-primary text-white p-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <FaRobot className="mr-2" />
                            <span className="font-bold">MetaZone Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                                disabled={!inputText.trim()}
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
