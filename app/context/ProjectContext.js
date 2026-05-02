"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("All Projects");
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/project`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (projectData) => {
    try {
      const res = await fetch(`${API_URL}/api/project`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      const newProject = await res.json();
      setProjects([newProject, ...projects]);
      return newProject;
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const res = await fetch(`${API_URL}/api/project/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      const updated = await res.json();
      setProjects(projects.map(p => p._id === id ? updated : p));
      return updated;
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await fetch(`${API_URL}/api/project/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, activeProject, setActiveProject, addProject, updateProject, deleteProject, loading }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
