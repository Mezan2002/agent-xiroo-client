"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ToolContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function ToolProvider({ children }) {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/tool`);
      const data = await res.json();
      setTools(data);
    } catch (err) {
      console.error("Failed to fetch tools:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const toggleTool = async (id, active) => {
    try {
      const res = await fetch(`${API_URL}/api/tool/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      const updated = await res.json();
      setTools(tools.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error("Failed to toggle tool:", err);
    }
  };

  const addTool = async (toolData) => {
    try {
      const res = await fetch(`${API_URL}/api/tool`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolData)
      });
      const newTool = await res.json();
      setTools([...tools, newTool]);
      return newTool;
    } catch (err) {
      console.error("Failed to add tool:", err);
    }
  };

  const updateTool = async (id, toolData) => {
    try {
      const res = await fetch(`${API_URL}/api/tool/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolData)
      });
      const updated = await res.json();
      setTools(tools.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      console.error("Failed to update tool:", err);
    }
  };

  const deleteTool = async (id) => {
    try {
      await fetch(`${API_URL}/api/tool/${id}`, { method: 'DELETE' });
      setTools(tools.filter(t => t.id !== id));
    } catch (err) {
      console.error("Failed to delete tool:", err);
    }
  };

  return (
    <ToolContext.Provider value={{ tools, toggleTool, addTool, updateTool, deleteTool, loading }}>
      {children}
    </ToolContext.Provider>
  );
}

export const useTool = () => useContext(ToolContext);
