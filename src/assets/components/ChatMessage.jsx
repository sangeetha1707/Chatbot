import React from 'react'
import ReactMarkdown from 'react-markdown'
import { FaUser, FaRobot } from 'react-icons/fa'
import { format, isToday, isYesterday } from 'date-fns'

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot'
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    if (isToday(date)) {
      return format(date, 'hh:mm a')
    } else if (isYesterday(date)) {
      return 'Yesterday ' + format(date, 'hh:mm a')
    } else {
      return format(date, 'MMM d, hh:mm a')
    }
  }

  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
      <div className="message-container">
        <div className="avatar">
          {isBot ? <FaRobot size={20} /> : <FaUser size={20} />}
        </div>
        <div className={`message-bubble ${isBot ? 'bot-message' : 'user-message'} ${message.isError ? 'error-message' : ''}`}>
          <div className="message-content">
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p style={{margin: '0 0 8px 0'}} {...props} />,
                a: ({node, ...props}) => <a style={{color: isBot ? '#7ccf9c' : 'white', textDecoration: 'underline'}} {...props} />,
                code: ({node, inline, ...props}) => (
                  inline 
                    ? <code style={{background: isBot ? '#f0faf5' : 'rgba(255,255,255,0.2)', padding: '2px 4px', borderRadius: '4px'}} {...props} />
                    : <pre style={{background: '#f0faf5', padding: '10px', borderRadius: '8px', overflow: 'auto'}}><code {...props} /></pre>
                )
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
          <div className="timestamp">
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .message-wrapper {
          margin-bottom: 20px;
          animation: fadeIn 0.3s ease;
        }
        .message-wrapper.bot {
          display: flex;
          justify-content: flex-start;
        }
        .message-wrapper.user {
          display: flex;
          justify-content: flex-end;
        }
        .message-container {
          display: flex;
          max-width: 80%;
          align-items: flex-start;
          gap: 10px;
        }
        .user .message-container {
          flex-direction: row-reverse;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #b8e0d4;
          color: #2c3e50;
          flex-shrink: 0;
          box-shadow: 0 2px 5px rgba(168, 230, 207, 0.3);
        }
        .bot .avatar {
          background: linear-gradient(135deg, #a8e6cf 0%, #7ccf9c 100%);
          color: white;
        }
        .user .avatar {
          background: linear-gradient(135deg, #b8e0d4 0%, #a8e6cf 100%);
          color: #2c3e50;
        }
        .message-bubble {
          padding: 12px 16px;
          border-radius: 20px;
          position: relative;
          word-wrap: break-word;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .bot-message {
          background: white;
          border: 2px solid #a8e6cf;
          border-top-left-radius: 4px;
          color: #2c3e50;
        }
        .user-message {
          background: linear-gradient(135deg, #a8e6cf 0%, #7ccf9c 100%);
          color: #2c3e50;
          border-top-right-radius: 4px;
          border: 2px solid #7ccf9c;
        }
        .error-message {
          background: #ffe6e6;
          color: #d8000c;
          border: 2px solid #ffb3b3;
        }
        .message-content {
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .message-content :global(pre) {
          background: #f0faf5;
          padding: 10px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 10px 0;
        }
        .message-content :global(code) {
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        .timestamp {
          font-size: 0.7rem;
          margin-top: 6px;
          opacity: 0.6;
          text-align: right;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 767px) {
          .message-container {
            max-width: 90%;
          }
          .avatar {
            width: 32px;
            height: 32px;
          }
          .avatar svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatMessage