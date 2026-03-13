import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FiMenu, FiEdit2, FiCheck, FiX } from 'react-icons/fi'

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
              <p className="mb-0 text-muted">Powered by Gemini 2.5 Flash</p>
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
            Delete Chat
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        .chat-header {
          padding: 20px 26px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 0 0 rgba(15, 23, 42, 0.05);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
        }
        .menu-btn {
          color: var(--primary);
          padding: 0;
          display: flex;
          align-items: center;
        }
        .menu-btn:hover {
          color: var(--primary-dark);
        }
        .header-info h2 {
          font-size: 1.25rem;
          color: #0f172a;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .header-info p {
          font-size: 0.78rem;
          color: #64748b;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .edit-title-btn {
          color: #0f172a;
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        .edit-title-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .clear-btn {
          font-size: 0.85rem;
          padding: 7px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0f76b1 100%);
          border: none;
          color: #ffffff;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .clear-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(14, 165, 233, 0.33);
        }
        .title-edit {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
        }
        .title-input {
          border: none;
          background: transparent;
          padding: 4px;
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e293b;
          min-width: 220px;
        }
        .title-input:focus {
          outline: none;
          box-shadow: none;
        }
        .edit-action {
          color: #0f172a;
          padding: 5px;
        }
        .edit-action:hover {
          color: #0f172a;
        }
        @media (max-width: 767px) {
          .chat-header {
            padding: 14px 18px;
          }
          .header-info h2 {
            font-size: 1rem;
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