import React from 'react'
import { Button } from 'react-bootstrap'

const ChatHistory = ({ chats, currentChatId, onSelectChat, onDeleteChat, onNewChat, onClose }) => {
  return (
    <div className="chat-history">
      <div className="history-header">
        <h5>Chats</h5>
        <Button size="sm" variant="outline-primary" onClick={onNewChat}>New</Button>
        <Button size="sm" variant="outline-secondary" onClick={onClose}>Close</Button>
      </div>
      <div className="history-list">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div key={chat.id} className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}>
              <button className="chat-title" onClick={() => onSelectChat(chat)}>{chat.title || 'Untitled'}</button>
              <Button size="sm" variant="danger" onClick={() => onDeleteChat(chat.id)}>Delete</Button>
            </div>
          ))
        ) : (
          <p>No saved chats yet.</p>
        )}
      </div>

      <style jsx>{`
        .chat-history {
          padding: 14px;
          height: 100%;
          background: linear-gradient(180deg, #111827 0%, #0f172a 100%);
          border-right: 1px solid rgba(148, 163, 184, 0.2);
          color: #e2e8f0;
          overflow-y: auto;
        }
        .history-header {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .history-header h5 {
          margin: 0;
          font-size: 0.95rem;
          color: #f8fafc;
          font-weight: 700;
        }
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          padding: 8px;
          background: #0f172a;
        }
        .history-item.active {
          border-color: rgba(56, 189, 248, 0.8);
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.35);
        }
        .chat-title {
          background: none;
          border: none;
          text-align: left;
          color: #e2e8f0;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          padding: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.92rem;
        }
        .history-item button {
          color: #dbeafe;
        }
      `}</style>
    </div>
  )
}

export default ChatHistory
