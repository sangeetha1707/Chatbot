const STORAGE_KEY = 'gemini_chat_history'

export const loadChats = async () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Failed to load chats:', error)
    return []
  }
}

export const saveChat = async (chat) => {
  try {
    const chats = await loadChats()
    const idx = chats.findIndex((item) => item.id === chat.id)
    if (idx >= 0) {
      chats[idx] = { ...chats[idx], ...chat }
    } else {
      chats.push(chat)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  } catch (error) {
    console.error('Failed to save chat:', error)
  }
}

export const deleteChat = async (id) => {
  try {
    const chats = await loadChats()
    const updated = chats.filter((chat) => chat.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to delete chat:', error)
  }
}

export const updateChat = async (id, updates) => {
  try {
    const chats = await loadChats()
    const updated = chats.map((chat) => (chat.id === id ? { ...chat, ...updates } : chat))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to update chat:', error)
  }
}
