
import { useState, useRef, useEffect } from "react";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageSquare, Search, Phone, Video, Info, Image, Smile, ThumbsUp, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  read: boolean;
  avatar: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export default function Messages() {
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1); // First conversation selected by default
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isMobile !== undefined) {
      setIsReady(true);
    }
  }, [isMobile]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  // Mock conversation data
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://picsum.photos/id/64/100",
      lastMessage: "Great! Talk to you tomorrow",
      timestamp: "12:45 PM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Tech Gadget Store",
      avatar: "https://picsum.photos/id/20/100",
      lastMessage: "Your order has been shipped!",
      timestamp: "10:32 AM",
      unread: 1,
      online: true
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://picsum.photos/id/91/100",
      lastMessage: "Did you see the latest product?",
      timestamp: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: "Olivia Smith",
      avatar: "https://picsum.photos/id/45/100",
      lastMessage: "Thanks for your help!",
      timestamp: "Yesterday",
      unread: 0,
      online: true
    },
    {
      id: 5,
      name: "Fashion Boutique",
      avatar: "https://picsum.photos/id/81/100",
      lastMessage: "Your order #12345 has been confirmed",
      timestamp: "Mon",
      unread: 0,
      online: true
    }
  ];

  // Mock messages for the selected conversation
  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        sender: "Sarah Johnson",
        content: "Hey! How's it going with the new purchase?",
        timestamp: "12:30 PM",
        isOwn: false,
        read: true,
        avatar: "https://picsum.photos/id/64/100"
      },
      {
        id: 2,
        sender: "You",
        content: "It's great! The quality is much better than I expected.",
        timestamp: "12:35 PM",
        isOwn: true,
        read: true,
        avatar: "https://picsum.photos/id/100/100"
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        content: "That's awesome! Did you use the discount code I sent you?",
        timestamp: "12:37 PM",
        isOwn: false,
        read: true,
        avatar: "https://picsum.photos/id/64/100"
      },
      {
        id: 4,
        sender: "You",
        content: "Yes, I saved 15%! Thanks for sharing that.",
        timestamp: "12:40 PM",
        isOwn: true,
        read: true,
        avatar: "https://picsum.photos/id/100/100"
      },
      {
        id: 5,
        sender: "Sarah Johnson",
        content: "No problem! Let me know if you need anything else. I'm planning to order the same thing next week.",
        timestamp: "12:42 PM",
        isOwn: false,
        read: true,
        avatar: "https://picsum.photos/id/64/100"
      },
      {
        id: 6,
        sender: "You",
        content: "I'll definitely let you know. We should meet up soon!",
        timestamp: "12:43 PM",
        isOwn: true,
        read: true,
        avatar: "https://picsum.photos/id/100/100"
      },
      {
        id: 7,
        sender: "Sarah Johnson",
        content: "Great! Talk to you tomorrow",
        timestamp: "12:45 PM",
        isOwn: false,
        read: false,
        avatar: "https://picsum.photos/id/64/100"
      },
    ],
    2: [
      {
        id: 1,
        sender: "Tech Gadget Store",
        content: "Thank you for your purchase!",
        timestamp: "10:15 AM",
        isOwn: false,
        read: true,
        avatar: "https://picsum.photos/id/20/100"
      },
      {
        id: 2,
        sender: "Tech Gadget Store",
        content: "Your order #54321 has been processed and will be shipped soon.",
        timestamp: "10:16 AM",
        isOwn: false,
        read: true,
        avatar: "https://picsum.photos/id/20/100"
      },
      {
        id: 3,
        sender: "You",
        content: "Great! When can I expect delivery?",
        timestamp: "10:20 AM",
        isOwn: true,
        read: true,
        avatar: "https://picsum.photos/id/100/100"
      },
      {
        id: 4,
        sender: "Tech Gadget Store",
        content: "Your order has been shipped! Estimated delivery is in 3-5 business days.",
        timestamp: "10:32 AM",
        isOwn: false,
        read: false,
        avatar: "https://picsum.photos/id/20/100"
      },
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // Add message to current conversation
    const messageObj: Message = {
      id: Date.now(),
      sender: "You",
      content: newMessage,
      timestamp: "Just now",
      isOwn: true,
      read: false,
      avatar: "https://picsum.photos/id/100/100"
    };

    messages[selectedConversation] = [...(messages[selectedConversation] || []), messageObj];
    
    // Display toast for demo purposes
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
      duration: 2000,
    });

    // Clear input
    setNewMessage("");
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!isReady) {
    return <div className="h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const currentMessages = selectedConversation ? (messages[selectedConversation] || []) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* AliExpressHeader component with active tab set to messages */}
      <AliExpressHeader activeTabId="messages" />

      {/* Main content */}
      <div className="pt-[40px] pb-16 flex flex-1 overflow-hidden">
        <div className="flex h-[calc(100vh-56px)] w-full">
          {/* Conversations list - hidden on mobile when a conversation is selected */}
          <div 
            className={`border-r border-gray-200 bg-white w-full md:w-80 flex-shrink-0 
              ${isMobile && selectedConversation ? "hidden" : "flex flex-col"}`}
          >
            {/* Conversations header */}
            <div className="p-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedConversation === conversation.id ? "bg-gray-100" : ""}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-gray-200">
                      <img src={conversation.avatar} alt={conversation.name} className="object-cover" />
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium truncate">{conversation.name}</span>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white">{conversation.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Message content area - full width on mobile or when conversation selected */}
          {(selectedConversation || !isMobile) ? (
            <div className={`bg-white flex-1 flex flex-col ${isMobile && !selectedConversation ? "hidden" : "flex"}`}>
              {/* Conversation header */}
              {selectedConversationData && (
                <div className="border-b border-gray-200 p-2 flex items-center sticky top-0 bg-white z-10">
                  {isMobile && (
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="mr-2"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                    </Button>
                  )}
                  <div className="flex items-center flex-1">
                    <Avatar className="h-10 w-10">
                      <img src={selectedConversationData.avatar} alt={selectedConversationData.name} className="object-cover" />
                    </Avatar>
                    <div className="ml-2">
                      <div className="font-medium">{selectedConversationData.name}</div>
                      <div className="text-xs text-gray-500">
                        {selectedConversationData.online ? "Active now" : "Offline"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex">
                    <Button size="icon" variant="ghost">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8 mt-1 mr-2">
                        <img src={message.avatar} alt={message.sender} className="object-cover" />
                      </Avatar>
                    )}
                    <div 
                      className={`px-3 py-2 rounded-lg max-w-[75%] ${
                        message.isOwn 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.isOwn && (
                      <div className="flex flex-col ml-2 items-end">
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.read && (
                          <span className="text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message input */}
              <div className="border-t border-gray-200 p-2 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Button type="button" size="icon" variant="ghost">
                    <Image className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button type="button" size="icon" variant="ghost">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="pr-10 py-2 rounded-full"
                    />
                    <Button type="button" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2" variant="ghost">
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!newMessage.trim()} 
                    variant={newMessage.trim() ? "default" : "ghost"}
                    className="rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    {newMessage.trim() ? <Send className="h-5 w-5" /> : <ThumbsUp className="h-5 w-5" />}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 text-center p-4">
              <div>
                <MessageSquare className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Your Messages</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}
