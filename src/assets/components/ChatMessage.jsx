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
          margin-bottom: 16px;
          animation: fadeIn 0.25s ease;
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
          max-width: 82%;
          align-items: flex-start;
          gap: 10px;
        }
        .user .message-container {
          flex-direction: row-reverse;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1e293b;
          color: #e2e8f0;
          flex-shrink: 0;
          box-shadow: 0 3px 8px rgba(15, 23, 42, 0.2);
        }
        .bot .avatar {
          background: #0ea5e9;
          color: #ffffff;
        }
        .user .avatar {
          background: #10b981;
          color: #ffffff;
        }
        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
          box-shadow: 0 3px 6px rgba(15, 23, 42, 0.08);
        }
        .bot-message {
          background: #f8fafc;
          border: 1px solid #dbeafe;
          border-top-left-radius: 6px;
          color: #0f172a;
        }
        .user-message {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #fff;
          border-top-right-radius: 6px;
          border: 1px solid #334155;
        }
        .error-message {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        .message-content {
          font-size: 0.95rem;
          line-height: 1.55;
        }
        .message-content :global(pre) {
          background: #e2e8f0;
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
          font-size: 0.68rem;
          margin-top: 6px;
          opacity: 0.55;
          text-align: right;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 767px) {
          .message-container {
            max-width: 88%;
          }
          .avatar {
            width: 30px;
            height: 30px;
          }
          .avatar svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatMessage