import { useState, useRef, useEffect } from "react";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  MessageSquare, Search, Phone, Video, Info, Image, Smile, ThumbsUp, 
  Paperclip, Send, Mic, MoreHorizontal, ChevronLeft,
  Heart, Star, X, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  read: boolean;
  avatar: string;
  reactions?: {
    type: string;
    count: number;
  }[];
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  members?: {
    name: string;
    avatar: string;
  }[];
}

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
  },
  {
    id: 6,
    name: "AliExpress Team",
    avatar: "https://picsum.photos/id/60/100",
    lastMessage: "Welcome to our platform!",
    timestamp: "Mon",
    unread: 0,
    online: true
  },
  {
    id: 7,
    name: "Gadget Enthusiasts",
    avatar: "https://picsum.photos/id/26/100",
    lastMessage: "John: Has anyone tried the new model?",
    timestamp: "Sun",
    unread: 3,
    online: true,
    isGroup: true,
    members: [
      { name: "John Smith", avatar: "https://picsum.photos/id/22/100" },
      { name: "Lisa Wang", avatar: "https://picsum.photos/id/29/100" },
      { name: "Robert Green", avatar: "https://picsum.photos/id/33/100" },
    ]
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
      avatar: "https://picsum.photos/id/64/100",
      reactions: [{ type: "👍", count: 1 }]
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
      avatar: "https://picsum.photos/id/100/100",
      reactions: [{ type: "❤️", count: 1 }]
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
  ],
  7: [
    {
      id: 1,
      sender: "John Smith",
      content: "Has anyone tried the new model of the smart watch that was released this month?",
      timestamp: "Sunday",
      isOwn: false,
      read: true,
      avatar: "https://picsum.photos/id/22/100"
    },
    {
      id: 2,
      sender: "Lisa Wang",
      content: "I ordered it last week but it hasn't arrived yet. I'll let you know my thoughts when it does!",
      timestamp: "Sunday",
      isOwn: false,
      read: true,
      avatar: "https://picsum.photos/id/29/100"
    },
    {
      id: 3,
      sender: "Robert Green",
      content: "I saw it in store and the build quality looks great. The battery life is supposed to be much better too.",
      timestamp: "Yesterday",
      isOwn: false,
      read: false,
      avatar: "https://picsum.photos/id/33/100"
    },
    {
      id: 4,
      sender: "John Smith",
      content: "That's good to hear! I'm especially interested in the new fitness tracking features.",
      timestamp: "Today",
      isOwn: false,
      read: false,
      avatar: "https://picsum.photos/id/22/100"
    },
    {
      id: 5,
      sender: "Lisa Wang",
      content: "Same here! I heard they've improved the heart rate monitoring significantly.",
      timestamp: "Just now",
      isOwn: false,
      read: false,
      avatar: "https://picsum.photos/id/29/100"
    }
  ]
};

export default function Messages() {
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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

  // Simulate typing indicator
  useEffect(() => {
    if (selectedConversation) {
      const typingInterval = setInterval(() => {
        setIsTyping(prev => !prev);
      }, 5000);
      
      return () => clearInterval(typingInterval);
    }
  }, [selectedConversation]);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    
    // Simulate reply after 2 seconds
    if (selectedConversation === 1) {
      setTimeout(() => {
        const replyObj: Message = {
          id: Date.now() + 1,
          sender: "Sarah Johnson",
          content: "I'm typing a response...",
          timestamp: "Just now",
          isOwn: false,
          read: false,
          avatar: "https://picsum.photos/id/64/100"
        };
        
        messages[selectedConversation] = [...(messages[selectedConversation] || []), replyObj];
        
        // Force update and scroll
        setNewMessage(" ");
        setNewMessage("");
        
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, 2000);
    }
  };

  const addReaction = (messageId: number, reactionType: string) => {
    if (!selectedConversation) return;
    
    const updatedMessages = messages[selectedConversation].map(message => {
      if (message.id === messageId) {
        const existingReactions = message.reactions || [];
        const existingReaction = existingReactions.find(r => r.type === reactionType);
        
        let newReactions;
        if (existingReaction) {
          newReactions = existingReactions.map(r => 
            r.type === reactionType ? { ...r, count: r.count + 1 } : r
          );
        } else {
          newReactions = [...existingReactions, { type: reactionType, count: 1 }];
        }
        
        return { ...message, reactions: newReactions };
      }
      return message;
    });
    
    messages[selectedConversation] = updatedMessages;
    setShowReactions(null);
    
    // Force update
    setNewMessage(" ");
    setNewMessage("");
  };

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Tap again to send your voice message",
        duration: 2000,
      });
    } else {
      toast({
        title: "Voice message sent",
        description: "Your voice message has been sent",
        duration: 2000,
      });
    }
  };

  if (!isReady) {
    return <div className="h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const currentMessages = selectedConversation ? (messages[selectedConversation] || []) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* AliExpressHeader component - only show when no conversation is selected */}
      {!selectedConversation && <AliExpressHeader activeTabId="messages" />}

      {/* Main content */}
      <div className={`${selectedConversation ? 'pt-0' : 'pt-[40px]'} pb-16 flex flex-1 overflow-hidden`}>
        <div className="flex h-[calc(100vh-56px)] w-full">
          {/* Conversations list - always visible on desktop, or visible on mobile when no conversation is selected */}
          <div 
            className={`border-r border-gray-200 bg-white w-full md:w-80 flex-shrink-0 
              ${isMobile && selectedConversation ? "hidden" : "flex flex-col"}`}
          >
            {/* Conversations header with back chevron */}
            <div className="p-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <ChevronLeft className="h-5 w-5 mr-1" />
                <h2 className="text-lg font-semibold">Messages</h2>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedConversation === conversation.id ? "bg-blue-50" : ""}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border border-gray-200">
                      <img src={conversation.avatar} alt={conversation.name} className="object-cover" />
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                    {conversation.isGroup && (
                      <span className="absolute -bottom-1 -right-1 bg-gray-200 rounded-full p-0.5 border border-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <span className={`font-medium truncate ${conversation.unread > 0 ? "font-semibold" : ""}`}>
                        {conversation.name}
                      </span>
                      <span className={`text-xs ${conversation.unread > 0 ? "text-blue-600 font-bold" : "text-gray-500"}`}>
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread > 0 ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                      {conversation.isGroup && conversation.lastMessage.includes(":") 
                        ? conversation.lastMessage 
                        : conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="ml-2 bg-blue-600 text-white">{conversation.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Message content area - hidden on mobile when no conversation is selected */}
          {selectedConversation ? (
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
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="flex items-center flex-1">
                    <Avatar className="h-10 w-10">
                      <img src={selectedConversationData.avatar} alt={selectedConversationData.name} className="object-cover" />
                    </Avatar>
                    <div className="ml-2">
                      <div className="font-medium flex items-center">
                        {selectedConversationData.name}
                        {selectedConversationData.online && (
                          <span className="ml-2 text-xs text-green-600 flex items-center">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                            Active now
                          </span>
                        )}
                      </div>
                      {selectedConversationData.isGroup && (
                        <div className="text-xs text-gray-500 flex items-center">
                          <span className="flex -space-x-1 mr-1">
                            {selectedConversationData.members?.slice(0, 3).map((member, idx) => (
                              <span key={idx} className="h-4 w-4 rounded-full overflow-hidden border border-white">
                                <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                              </span>
                            ))}
                          </span>
                          {selectedConversationData.members?.length} members
                        </div>
                      )}
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Info className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">View profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Mute notifications</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Search in conversation</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-500">Block</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
              
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {/* Date separator */}
                <div className="flex justify-center mb-4">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 group ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8 mt-1 mr-2">
                        <img src={message.avatar} alt={message.sender} className="object-cover" />
                      </Avatar>
                    )}
                    <div className="relative">
                      <div 
                        className={`px-3 py-2 rounded-lg max-w-[75%] ${
                          message.isOwn 
                            ? 'bg-blue-500 text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                        onDoubleClick={() => setShowReactions(message.id)}
                      >
                        {selectedConversationData?.isGroup && !message.isOwn && (
                          <div className="text-xs font-medium mb-1">{message.sender}</div>
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className={`absolute ${message.isOwn ? 'left-0' : 'right-0'} -bottom-3 bg-white rounded-full px-1 py-0.5 shadow-sm border border-gray-100 flex items-center`}>
                          {message.reactions.map((reaction, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="text-xs">{reaction.type}</span>
                              <span className="text-xs text-gray-600 ml-0.5">{reaction.count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Message options */}
                      <div className={`absolute top-0 ${message.isOwn ? 'left-0 -translate-x-full -translate-y-1/4' : 'right-0 translate-x-full -translate-y-1/4'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <Popover open={showReactions === message.id} onOpenChange={() => setShowReactions(null)}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm border border-gray-200">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 flex gap-1" side="top">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => addReaction(message.id, "👍")}>
                              <span className="text-lg">👍</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => addReaction(message.id, "❤️")}>
                              <span className="text-lg">❤️</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => addReaction(message.id, "😂")}>
                              <span className="text-lg">😂</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => addReaction(message.id, "😮")}>
                              <span className="text-lg">😮</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => addReaction(message.id, "😢")}>
                              <span className="text-lg">😢</span>
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
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
                
                {/* Typing indicator */}
                {isTyping && selectedConversation === 1 && (
                  <div className="flex mb-4">
                    <Avatar className="h-8 w-8 mt-1 mr-2">
                      <img src="https://picsum.photos/id/64/100" alt="Sarah" className="object-cover" />
                    </Avatar>
                    <div className="bg-gray-200 px-3 py-2 rounded-lg rounded-bl-none">
                      <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button type="button" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2" variant="ghost">
                          <Smile className="h-5 w-5 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="grid grid-cols-8 gap-1">
                          {["😀", "😂", "❤️", "👍", "😊", "🎉", "😎", "👋", 
                            "🔥", "🙌", "👏", "🤔", "😢", "😍", "🤣", "😮"].map(emoji => (
                            <Button 
                              key={emoji} 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setNewMessage(prev => prev + emoji);
                              }}
                            >
                              <span className="text-lg">{emoji}</span>
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleRecordToggle} 
                    size="icon" 
                    variant="ghost"
                    className={`rounded-full ${isRecording ? "bg-red-500 text-white" : ""}`}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!newMessage.trim() && !isRecording} 
                    variant={newMessage.trim() || isRecording ? "default" : "ghost"}
                    className="rounded-full bg-blue-500 hover:bg-blue-600"
                  >
                    {newMessage.trim() ? <Send className="h-5 w-5" /> : <ThumbsUp className="h-5 w-5" />}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            // Display this when no conversation is selected on desktop or mobile
            <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 text-center p-4">
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
