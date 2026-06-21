"use client";

import { Bot, Send, UserRound } from "lucide-react";
import { useState } from "react";

const starterQuestions = [
  "What is Oleksii strongest fit for?",
  "Summarize his Upwork acquisition experience.",
  "What outreach systems has he built?",
];

export default function PortfolioAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ask me about Oleksii's experience, strengths, career journey, outreach work, or how to contact him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(text) {
    const question = text.trim();

    if (!question || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The assistant is unavailable.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error.message ||
            "I could not answer right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="assistant-shell">
      <div className="assistant-chat" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
            <div className="chat-icon" aria-hidden="true">
              {message.role === "assistant" ? <Bot size={18} /> : <UserRound size={18} />}
            </div>
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading ? (
          <div className="chat-message assistant">
            <div className="chat-icon" aria-hidden="true">
              <Bot size={18} />
            </div>
            <p>Thinking through the portfolio...</p>
          </div>
        ) : null}
      </div>

      <div className="prompt-row">
        {starterQuestions.map((question) => (
          <button type="button" key={question} onClick={() => sendMessage(question)}>
            {question}
          </button>
        ))}
      </div>

      <form className="assistant-form" onSubmit={handleSubmit}>
        <input
          aria-label="Ask the portfolio assistant"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about experience, tools, outreach, fit..."
        />
        <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send question">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
