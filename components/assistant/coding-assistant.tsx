"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Send,
  User,
  Code,
  Sparkles,
  Lightbulb,
  Zap,
  BarChart,
  MessageSquare,
} from "lucide-react";
import { useDashboardData } from "@/contexts/dashboard-data-context";
import { processQueryOnBackend } from "@/services/assistant-service";

interface Message {
  id: number;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  code?: string;
  data?: any;
}

export function CodingAssistant() {
  const dashboardData = useDashboardData();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm your coding assistant. I can help you understand your dashboard data, provide coding tips, or suggest practice problems. Try asking me about your solved problems, platform stats, or recommendations.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Process the query and generate a response
      console.log(dashboardData);
      const response = await processQueryOnBackend(inputValue, dashboardData);

      const assistantResponse: Message = {
        id: messages.length + 2,
        content: response.text,
        sender: "assistant",
        timestamp: new Date(),
        code: response.code,
        data: response.data,
      };

      setMessages((prev) => [...prev, assistantResponse]);
    } catch (error) {
      console.error("Error processing message:", error);

      // Add error message
      const errorResponse: Message = {
        id: messages.length + 2,
        content:
          "I encountered an error while processing your request. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // Focus on input after setting the value
    const inputElement = document.getElementById("assistant-input");
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <Card className="glow-card flex h-[calc(100vh-200px)] min-h-[600px] flex-col">
      <Tabs defaultValue="chat" className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl font-bold">
              Coding Assistant
            </CardTitle>
          </div>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Code className="h-4 w-4" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <TabsContent
            value="chat"
            className="flex h-full flex-col data-[state=active]:flex-1"
          >
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-neon-cyan/20 text-white"
                          : "bg-secondary/30"
                      }`}
                    >
                      {message.sender === "assistant" && (
                        <Avatar className="mt-0.5 h-8 w-8">
                          <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.code && (
                          <div className="mt-2 rounded-md bg-secondary/50 p-3">
                            <pre className="text-xs text-neon-cyan">
                              <code>{message.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* Render data visualizations if available */}
                        {message.data && message.data.total && (
                          <div className="mt-2 rounded-md bg-secondary/30 p-3">
                            <div className="text-xs font-medium mb-1">
                              Problem Distribution
                            </div>
                            <div className="flex gap-1 h-4">
                              <div
                                className="bg-green-500/70 rounded-l-sm text-xs flex items-center justify-center text-black font-medium"
                                style={{
                                  width: `${
                                    (message.data.easy / message.data.total) *
                                    100
                                  }%`,
                                }}
                              >
                                {message.data.easy}
                              </div>
                              <div
                                className="bg-yellow-500/70 text-xs flex items-center justify-center text-black font-medium"
                                style={{
                                  width: `${
                                    (message.data.medium / message.data.total) *
                                    100
                                  }%`,
                                }}
                              >
                                {message.data.medium}
                              </div>
                              <div
                                className="bg-red-500/70 rounded-r-sm text-xs flex items-center justify-center text-black font-medium"
                                style={{
                                  width: `${
                                    (message.data.hard / message.data.total) *
                                    100
                                  }%`,
                                }}
                              >
                                {message.data.hard}
                              </div>
                            </div>
                            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                              <span>Easy</span>
                              <span>Medium</span>
                              <span>Hard</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="mt-0.5 h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                          />
                          <AvatarFallback className="bg-neon-cyan/20 text-neon-cyan">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-secondary/30 p-3">
                      <Avatar className="mt-0.5 h-8 w-8">
                        <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-neon-purple"></div>
                        <div
                          className="h-2 w-2 animate-pulse rounded-full bg-neon-purple"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-pulse rounded-full bg-neon-purple"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-secondary/50 p-4">
              <div className="flex items-center gap-2">
                <Input
                  id="assistant-input"
                  placeholder="Ask me about your coding stats, platforms, or recommendations..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-secondary/20 border-secondary/50"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-neon-cyan text-black hover:bg-neon-cyan/90"
                  disabled={inputValue.trim() === "" || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() =>
                    handleQuickQuestion("How many problems have I solved?")
                  }
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Problem stats
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() =>
                    handleQuickQuestion("What's my LeetCode progress?")
                  }
                >
                  <BarChart className="mr-1 h-3 w-3" />
                  Platform stats
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() =>
                    handleQuickQuestion("What should I focus on improving?")
                  }
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Improvement areas
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() =>
                    handleQuickQuestion("Recommend me some problems to solve")
                  }
                >
                  <Code className="mr-1 h-3 w-3" />
                  Recommendations
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="practice"
            className="h-full data-[state=active]:flex-1"
          >
            <div className="flex h-full items-center justify-center p-4">
              <div className="text-center">
                <Code className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Practice Mode</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Interactive problem-solving mode coming soon!
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="insights"
            className="h-full data-[state=active]:flex-1"
          >
            <div className="flex h-full items-center justify-center p-4">
              <div className="text-center">
                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">Insights</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Personalized learning insights coming soon!
                </p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
