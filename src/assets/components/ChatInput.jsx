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
          padding: 20px 30px;
          background: linear-gradient(135deg, #ffffff 0%, #f0faf5 100%);
          border-top: 2px solid #a8e6cf;
        }
        .input-wrapper {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          background: white;
          border: 2px solid #a8e6cf;
          border-radius: 30px;
          padding: 5px 5px 5px 15px;
          transition: all 0.3s;
        }
        .input-wrapper:focus-within {
          border-color: #7ccf9c;
          box-shadow: 0 0 0 3px rgba(124, 207, 156, 0.2);
        }
        .attach-btn {
          color: #7ccf9c;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .attach-btn:hover:not(:disabled) {
          background: #d4edda;
          color: #2c3e50;
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
          max-height: 150px;
          background: transparent;
        }
        .message-input:focus {
          outline: none;
          box-shadow: none;
        }
        .message-input::placeholder {
          color: #b8e0d4;
        }
        .send-btn {
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #a8e6cf 0%, #7ccf9c 100%);
          border: none;
          color: white;
          transition: all 0.3s;
        }
        .send-btn:hover:not(:disabled) {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 5px 15px rgba(124, 207, 156, 0.4);
        }
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 767px) {
          .chat-input-container {
            padding: 15px 20px;
          }
          .input-wrapper {
            padding: 3px 3px 3px 12px;
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