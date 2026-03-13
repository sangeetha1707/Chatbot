import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FiMenu, FiDelete, FiEdit2, FiCheck, FiX } from 'react-icons/fi'

const ChatHeader = ({ 
  chatTitle, 
  onClearChat, 
  onToggleHistory, 
  showHistory,
  onUpdateTitle 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(chatTitle)

  const handleEditSubmit = () => {
    if (editedTitle.trim()) {
      onUpdateTitle(editedTitle.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedTitle(chatTitle)
    setIsEditing(false)
  }

  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="header-left">
          <Button 
            variant="link" 
            onClick={onToggleHistory}
            className="menu-btn d-md-none"
          >
            <FiMenu size={24} />
          </Button>
          
          {isEditing ? (
            <div className="title-edit">
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                autoFocus
                className="title-input"
              />
              <Button variant="link" onClick={handleEditSubmit} className="edit-action">
                <FiCheck size={18} />
              </Button>
              <Button variant="link" onClick={handleCancelEdit} className="edit-action">
                <FiX size={18} />
              </Button>
            </div>
          ) : (
            <div className="header-info">
              <h2 className="mb-0">{chatTitle}</h2>
              <p className="mb-0 text-muted">Powered by Gemini 2.0 Flash</p>
            </div>
          )}
        </div>
        
        <div className="header-actions">
          {!isEditing && (
            <Button 
              variant="link" 
              onClick={() => setIsEditing(true)}
              className="edit-title-btn d-none d-md-inline-block"
              title="Edit title"
            >
              <FiEdit2 size={16} />
            </Button>
          )}
          <Button 
            variant="outline-danger" 
            onClick={onClearChat}
            className="clear-btn"
            title="New chat"
          >
            <FiDelete /> New Chat
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        .chat-header {
          padding: 20px 30px;
          background: linear-gradient(135deg, #ffffff 0%, #f0faf5 100%);
          border-bottom: 2px solid #a8e6cf;
          box-shadow: 0 2px 10px rgba(168, 230, 207, 0.2);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }
        .menu-btn {
          color: #7ccf9c;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .menu-btn:hover {
          color: #a8e6cf;
        }
        .header-info h2 {
          font-size: 1.4rem;
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .header-info p {
          font-size: 0.85rem;
          color: #7ccf9c;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .edit-title-btn {
          color: #7ccf9c;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .edit-title-btn:hover {
          background: #d4edda;
          color: #2c3e50;
        }
        .clear-btn {
          font-size: 0.9rem;
          padding: 8px 16px;
          border-radius: 25px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
          border: none;
          color: white;
          font-weight: 500;
          transition: all 0.3s;
        }
        .clear-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        .title-edit {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 5px 10px;
          border-radius: 25px;
          border: 2px solid #a8e6cf;
        }
        .title-input {
          border: none;
          background: transparent;
          padding: 5px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          min-width: 250px;
        }
        .title-input:focus {
          outline: none;
          box-shadow: none;
        }
        .edit-action {
          color: #7ccf9c;
          padding: 5px;
        }
        .edit-action:hover {
          color: #2c3e50;
        }
        
        @media (max-width: 767px) {
          .chat-header {
            padding: 15px 20px;
          }
          .header-info h2 {
            font-size: 1.2rem;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .clear-btn span {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatHeader