import React, { createContext, useContext, useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;

export type Engineer = {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
  availableCapacity: number;
};

type EngineerContextType = {
  engineers: Engineer[];
  loading: boolean;
  error: string | null;
  fetchEngineers: () => Promise<void>;
};

const EngineerContext = createContext<EngineerContextType | undefined>(
  undefined
);

export const EngineerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEngineers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${url}/api/engineers/with-capacity`);
      if (!res.ok) throw new Error("Failed to fetch engineers");
      const data: Engineer[] = await res.json();
      setEngineers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngineers();
  }, []);

  return (
    <EngineerContext.Provider
      value={{ engineers, loading, error, fetchEngineers }}
    >
      {children}
    </EngineerContext.Provider>
  );
};

export const useEngineers = (): EngineerContextType => {
  const context = useContext(EngineerContext);
  if (!context) {
    throw new Error("useEngineers must be used within an EngineerProvider");
  }
  return context;
};
