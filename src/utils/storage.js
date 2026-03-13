import localforage from 'localforage'

localforage.config({
  name: 'GeminiChatbot',
  storeName: 'chat_history',
  description: 'Chat history storage for Gemini chatbot'
})

export const saveChat = async (chat) => {
  try {
    await localforage.setItem(chat.id, chat)
    return true
  } catch (error) {
    console.error('Error saving chat:', error)
    return false
  }
}

export const loadChats = async () => {
  try {
    const chats = []
    await localforage.iterate((value, key) => {
      chats.push(value)
    })
    return chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  } catch (error) {
    console.error('Error loading chats:', error)
    return []
  }
}

export const loadChat = async (id) => {
  try {
    const chat = await localforage.getItem(id)
    return chat
  } catch (error) {
    console.error('Error loading chat:', error)
    return null
  }
}

export const deleteChat = async (id) => {
  try {
    await localforage.removeItem(id)
    return true
  } catch (error) {
    console.error('Error deleting chat:', error)
    return false
  }
}

export const updateChat = async (id, updates) => {
  try {
    const chat = await localforage.getItem(id)
    if (chat) {
      const updatedChat = { ...chat, ...updates }
      await localforage.setItem(id, updatedChat)
      return true
    }
    return false
  } catch (error) {
    console.error('Error updating chat:', error)
    return false
  }
}

export const clearAllChats = async () => {
  try {
    await localforage.clear()
    return true
  } catch (error) {
    console.error('Error clearing chats:', error)
    return false
  }
}