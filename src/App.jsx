import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ChatHeader from './assets/components/ChatHeader'
import ChatMessage from './assets/components/ChatMessage'
import ChatInput from './assets/components/ChatInput'
import TypingIndicator from './assets/components/TypingIndicator'
import ChatHistory from './assets/components/ChatHistory'
import useGemini from './assets/hooks/useGemini'
import { saveChat, loadChats, deleteChat, updateChat } from './utils/storage'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [chatId, setChatId] = useState(null)
  const [chatTitle, setChatTitle] = useState('New Conversation')
  const [showHistory, setShowHistory] = useState(false)
  const [savedChats, setSavedChats] = useState([])
  const { sendMessage, loading, error } = useGemini()
  const messagesEndRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    loadSavedChats()
    startNewChat()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadSavedChats = async () => {
    const chats = await loadChats()
    setSavedChats(chats)
  }

  const startNewChat = () => {
    const newChatId = uuidv4()
    setChatId(newChatId)
    setChatTitle('New Conversation')
    const welcomeMessage = {
      id: Date.now(),
      text: "Hello! I'm your Gemini AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
    setMessages([welcomeMessage])
    setShowHistory(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsTyping(true)

    if (messages.length === 1) {
      const newTitle = messageText.length > 30 
        ? messageText.substring(0, 30) + '...' 
        : messageText
      setChatTitle(newTitle)
    }

    try {
      const botResponse = await sendMessage(messageText)
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
      
      const finalMessages = [...updatedMessages, botMessage]
      setMessages(finalMessages)
      
      await saveChat({
        id: chatId,
        title: messages.length === 1 ? messageText : chatTitle,
        messages: finalMessages,
        timestamp: new Date().toISOString()
      })
      
      await loadSavedChats()
      
    } catch (err) {
      console.error('Error getting response:', err)
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      }
      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
    } finally {
      setIsTyping(false)
    }
  }

  const handleClearChat = () => {
    startNewChat()
  }

  const handleDeleteChat = async (id) => {
    await deleteChat(id)
    await loadSavedChats()
    if (id === chatId) {
      startNewChat()
    }
  }

  const handleSelectChat = (chat) => {
    setChatId(chat.id)
    setChatTitle(chat.title)
    setMessages(chat.messages)
    setShowHistory(false)
  }

  const handleUpdateTitle = async (newTitle) => {
    setChatTitle(newTitle)
    if (chatId) {
      await updateChat(chatId, { title: newTitle })
      await loadSavedChats()
    }
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <Container fluid className="chat-container p-0">
      <Row className="g-0 h-100">
        <Col md={3} className={`history-sidebar ${showHistory ? 'show' : ''}`}>
          <ChatHistory
            chats={savedChats}
            currentChatId={chatId}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
            onNewChat={startNewChat}
            onClose={() => setShowHistory(false)}
          />
        </Col>
        
        <Col md={{ span: 9 }} className="chat-main">
          <div className="chat-card">
            <ChatHeader 
              chatTitle={chatTitle}
              onClearChat={handleClearChat}
              onToggleHistory={toggleHistory}
              showHistory={showHistory}
              onUpdateTitle={handleUpdateTitle}
            />
            
            <div className="chat-messages">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput onSendMessage={handleSendMessage} loading={isTyping} />
            
            {error && (
              <div className="error-alert">
                ⚠️ {error}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App