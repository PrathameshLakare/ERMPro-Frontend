import { createContext, useContext, useEffect, useState } from "react";

type Engineer = {
  _id: string;
  name: string;
  email?: string;
  skills?: string[];
  seniority?: string;
};

type Project = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "planning" | "active" | "completed";
  managerId: string;
};

type AssignmentWithEngineerObject = {
  _id: string;
  role: string;
  startDate: string;
  endDate: string;
  engineerId: Engineer;
  projectId: Project;
};

type Assignment = {
  _id: string;
  role: string;
  endDate: string;
  startDate: string;
  engineerId: string;
  projectId: Project;
};

type AssignmentsContextType = {
  myAssignments: Assignment[];
  allAssignments: AssignmentWithEngineerObject[];
  loading: boolean;
  error: string | null;
  refetchMy: () => void;
  refetchAll: () => void;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(
  undefined
);

export const useAssignments = () => {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error(
      "useAssignments must be used within an AssignmentsProvider"
    );
  }
  return context;
};

export const AssignmentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myAssignments, setMyAssignments] = useState<Assignment[]>([]);
  const [allAssignments, setAllAssignments] = useState<
    AssignmentWithEngineerObject[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_API_URL;

  const fetchMyAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${url}/api/assignments/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch my assignments");
      const data = await res.json();
      setMyAssignments(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${url}/api/assignments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch all assignments");
      const data = await res.json();
      setAllAssignments(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAssignments();
    fetchAllAssignments();
  }, []);

  return (
    <AssignmentsContext.Provider
      value={{
        myAssignments,
        allAssignments,
        loading,
        error,
        refetchMy: fetchMyAssignments,
        refetchAll: fetchAllAssignments,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
};
