"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generate } from "@/lib/ai";
import { useState } from "react";

// Define a type for messages
type Message = {
  sender: "user" | "ai";
  text: string;
};

export function AIchat() {
  // Use the defined type for the messages state
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessage = async () => {
    // Add user's message to the message list
    const userMessage: Message = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear input field
    setMessage("");

    // Generate AI response
    const aiResponse = await generate(message);
    const aiMessage: Message = { sender: "ai", text: aiResponse };

    // Add AI response to the message list
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-900 text-white py-4 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold'>AI Chat</h1>
          <div className='flex items-center space-x-4'>
            <button className='hover:bg-gray-800 rounded-md px-3 py-2'>
              <SettingsIcon className='h-5 w-5' />
            </button>
            <button className='hover:bg-gray-800 rounded-md px-3 py-2'>
              <HandHelpingIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
      </header>
      <div className='flex-1 overflow-y-auto p-6'>
        <div className='space-y-4'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 ${
                msg.sender === "ai" ? "" : "justify-end"
              }`}
            >
              {msg.sender === "ai" && (
                <Avatar className='shrink-0'>
                  <AvatarImage
                    alt='AI'
                    src='/placeholder-user.jpg'
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`${
                  msg.sender === "ai"
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-blue-500 text-white"
                } rounded-lg p-4 max-w-[70%]`}
              >
                <p>{msg.text}</p>
              </div>
              {msg.sender === "user" && (
                <Avatar className='shrink-0'>
                  <AvatarImage
                    alt='User'
                    src='/placeholder-user.jpg'
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='bg-gray-100 dark:bg-gray-800 p-4'>
        <div className='flex items-center space-x-2'>
          <Textarea
            className='flex-1 rounded-lg border border-gray-300 dark p-2'
            placeholder='Type your message...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button
            className='rounded-lg px-4 py-2'
            onClick={getMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

function HandHelpingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14' />
      <path d='m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9' />
      <path d='m2 13 6 6' />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle
        cx='12'
        cy='12'
        r='3'
      />
    </svg>
  );
}
