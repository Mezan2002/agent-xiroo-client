"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const MemoryContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function MemoryProvider({ children }) {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load memories from MongoDB Backend
  const fetchMemories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/memory`);
      const data = await res.json();
      setMemories(data);
    } catch (err) {
      console.error("Failed to fetch memories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const addMemory = async (content, tag = "Fact", type = "long") => {
    try {
      const res = await fetch(`${API_URL}/api/memory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, tag, type })
      });
      const newEntry = await res.json();
      setMemories([newEntry, ...memories]);
    } catch (err) {
      console.error("Failed to add memory:", err);
    }
  };

  const removeMemory = async (id) => {
    try {
      await fetch(`${API_URL}/api/memory/${id}`, { method: 'DELETE' });
      setMemories(memories.filter(m => m._id !== id)); // Mongoose uses _id
    } catch (err) {
      console.error("Failed to delete memory:", err);
    }
  };

  const clearAllMemory = () => {
    // For now, just a placeholder or bulk delete
    alert("Bulk delete not implemented in backend yet.");
  };

  return (
    <MemoryContext.Provider value={{ memories, addMemory, removeMemory, clearAllMemory, loading }}>
      {children}
    </MemoryContext.Provider>
  );
}

export const useMemory = () => useContext(MemoryContext);
