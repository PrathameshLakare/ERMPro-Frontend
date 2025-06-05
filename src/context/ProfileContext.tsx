import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  name: string;
  email: string;
  skills: string[];
  seniority: string;
};

type ProfileContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updatedData: Partial<User>) => Promise<void>;
  token: string | null;
  setToken: (token: string | null) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const fetchProfile = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUser(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData: Partial<User>) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!res.ok) {
      throw new Error("Profile update failed");
    }

    const updatedUser = await res.json();
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{ user, loading, error, updateProfile, token, setToken }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
