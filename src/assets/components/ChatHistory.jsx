import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { FiMessageSquare, FiTrash2, FiPlus, FiX } from 'react-icons/fi'
import { formatDistanceToNow } from 'date-fns'

const ChatHistory = ({ 
  chats, 
  currentChatId, 
  onSelectChat, 
  onDeleteChat, 
  onNewChat,
  onClose 
}) => {
  return (
    <div className="chat-history">
      <div className="history-header">
        <h3>Chat History</h3>
        <Button variant="link" onClick={onClose} className="close-btn d-md-none">
          <FiX size={24} />
        </Button>
      </div>
      
      <Button 
        variant="primary" 
        onClick={onNewChat}
        className="new-chat-btn"
      >
        <FiPlus /> New Chat
      </Button>
      
      <ListGroup variant="flush" className="history-list">
        {chats.length === 0 ? (
          <div className="empty-history">
            <FiMessageSquare size={40} />
            <p>No chat history yet</p>
            <small>Start a new conversation</small>
          </div>
        ) : (
          chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(chat => (
              <ListGroup.Item 
                key={chat.id}
                className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
              >
                <div 
                  className="chat-info"
                  onClick={() => onSelectChat(chat)}
                >
                  <FiMessageSquare className="chat-icon" />
                  <div className="chat-details">
                    <div className="chat-title">{chat.title}</div>
                    <div className="chat-time">
                      {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="link" 
                  onClick={() => onDeleteChat(chat.id)}
                  className="delete-btn"
                  title="Delete chat"
                >
                  <FiTrash2 />
                </Button>
              </ListGroup.Item>
            ))
        )}
      </ListGroup>
      
      <style jsx>{`
        .chat-history {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #ffffff 0%, #f0faf5 100%);
          padding: 20px;
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .history-header h3 {
          color: #2c3e50;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }
        .close-btn {
          color: #7ccf9c;
          padding: 0;
        }
        .close-btn:hover {
          color: #2c3e50;
        }
        .new-chat-btn {
          width: 100%;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #a8e6cf 0%, #7ccf9c 100%);
          border: none;
          padding: 12px;
          border-radius: 30px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
        }
        .new-chat-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(124, 207, 156, 0.4);
        }
        .history-list {
          flex: 1;
          overflow-y: auto;
          border: none;
        }
        .history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 15px;
          margin-bottom: 8px;
          border: 2px solid #a8e6cf;
          border-radius: 15px !important;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }
        .history-item:hover {
          background: #f0faf5;
          border-color: #7ccf9c;
          transform: translateX(5px);
        }
        .history-item.active {
          background: #a8e6cf;
          border-color: #7ccf9c;
        }
        .history-item.active .chat-title,
        .history-item.active .chat-time {
          color: #2c3e50;
        }
        .chat-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        .chat-icon {
          color: #7ccf9c;
          font-size: 1.2rem;
        }
        .chat-details {
          flex: 1;
        }
        .chat-title {
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 4px;
          font-size: 0.95rem;
        }
        .chat-time {
          font-size: 0.75rem;
          color: #7ccf9c;
        }
        .delete-btn {
          color: #ff6b6b;
          padding: 5px;
          opacity: 0;
          transition: all 0.3s;
        }
        .history-item:hover .delete-btn {
          opacity: 1;
        }
        .delete-btn:hover {
          color: #ff4444;
          transform: scale(1.1);
        }
        .empty-history {
          text-align: center;
          padding: 40px 20px;
          color: #b8e0d4;
        }
        .empty-history p {
          margin: 10px 0 5px;
          color: #2c3e50;
        }
        .empty-history small {
          color: #7ccf9c;
        }
        
        .history-list::-webkit-scrollbar {
          width: 6px;
        }
        .history-list::-webkit-scrollbar-track {
          background: #f0faf5;
        }
        .history-list::-webkit-scrollbar-thumb {
          background: #a8e6cf;
          border-radius: 3px;
        }
        .history-list::-webkit-scrollbar-thumb:hover {
          background: #7ccf9c;
        }
        
        @media (max-width: 767px) {
          .chat-history {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatHistory