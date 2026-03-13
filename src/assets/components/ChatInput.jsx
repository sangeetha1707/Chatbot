import React, { useState, useRef, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FiSend, FiPaperclip } from 'react-icons/fi'

const ChatInput = ({ onSendMessage, loading }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !loading) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="chat-input-container">
      <Form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Button variant="link" className="attach-btn" disabled={loading}>
            <FiPaperclip size={20} />
          </Button>
          
          <Form.Control
            as="textarea"
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={loading}
            className="message-input"
            rows={1}
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            disabled={!message.trim() || loading}
            className="send-btn"
          >
            <FiSend size={20} />
          </Button>
        </div>
      </Form>
      
      <style jsx>{`
        .chat-input-container {
          padding: 18px 24px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .input-wrapper {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 999px;
          padding: 8px 10px;
          transition: all 0.2s ease;
        }
        .input-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.18);
        }
        .attach-btn {
          color: #64748b;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .attach-btn:hover:not(:disabled) {
          background: #e2e8f0;
          color: #0f172a;
        }
        .attach-btn:disabled {
          opacity: 0.5;
        }
        .message-input {
          border: none;
          padding: 8px 0;
          resize: none;
          font-size: 0.95rem;
          line-height: 1.5;
          max-height: 160px;
          min-height: 36px;
          background: transparent;
          color: #0f172a;
        }
        .message-input:focus {
          outline: none;
          box-shadow: none;
        }
        .message-input::placeholder {
          color: #94a3b8;
        }
        .send-btn {
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          border: none;
          color: #ffffff;
          transition: all 0.2s ease;
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 5px 12px rgba(14, 165, 233, 0.4);
        }
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 767px) {
          .chat-input-container {
            padding: 12px 16px;
          }
          .input-wrapper {
            padding: 6px 8px;
          }
          .send-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatInput