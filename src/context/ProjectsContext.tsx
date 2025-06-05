import React, { createContext, useContext, useEffect, useState } from "react";

export type Project = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "planning" | "active" | "completed";
  managerId?: { name: string; email: string };
};

type ProjectsContextType = {
  projects: Project[] | null;
  loading: boolean;
  error: string | null;
  refetchProjects: () => void;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${url}/api/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ projects, loading, error, refetchProjects: fetchProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
