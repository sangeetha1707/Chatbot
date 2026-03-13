import React from 'react'
import { FaRobot } from 'react-icons/fa'

const TypingIndicator = () => {
  return (
    <div className="typing-wrapper">
      <div className="typing-container">
        <div className="avatar">
          <FaRobot size={20} />
        </div>
        <div className="typing-bubble">
          <div className="typing-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .typing-wrapper {
          margin-bottom: 20px;
          display: flex;
          justify-content: flex-start;
          animation: fadeIn 0.3s ease;
        }
        .typing-container {
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 70%;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #a8e6cf 0%, #7ccf9c 100%);
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 5px rgba(168, 230, 207, 0.3);
        }
        .typing-bubble {
          background: white;
          border: 2px solid #a8e6cf;
          border-radius: 20px;
          border-top-left-radius: 4px;
          padding: 15px 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .typing-dots {
          display: flex;
          gap: 6px;
        }
        .dot {
          width: 10px;
          height: 10px;
          background: #a8e6cf;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            background: #a8e6cf;
          }
          30% {
            transform: translateY(-10px);
            background: #7ccf9c;
          }
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
          .avatar {
            width: 32px;
            height: 32px;
          }
          .typing-bubble {
            padding: 12px 15px;
          }
          .dot {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </div>
  )
}

export default TypingIndicator