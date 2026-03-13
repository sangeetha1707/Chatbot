import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const useGemini = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async (message) => {
    setLoading(true)
    setError(null)

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      
      if (!API_KEY) {
        throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file')
      }

      const genAI = new GoogleGenerativeAI(API_KEY)
      
      // Using Gemini 2.5 Flash model
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })

      // Add context for better responses
      const prompt = `Please provide a helpful, accurate, and friendly response to: ${message}`
      
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      return text

    } catch (err) {
      console.error('Gemini API Error:', err)
      
      // Handle specific error types
      if (err.message.includes('API key')) {
        setError('Invalid or missing API key. Please check your configuration.')
      } else if (err.message.includes('quota')) {
        setError('API quota exceeded. Please try again later.')
      } else if (err.message.includes('network')) {
        setError('Network error. Please check your internet connection.')
      } else if (err.message.includes('model')) {
        setError('Model not available. Please try again later.')
      } else {
        setError('Failed to get response from Gemini. Please try again.')
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading, error }
}

export default useGemini