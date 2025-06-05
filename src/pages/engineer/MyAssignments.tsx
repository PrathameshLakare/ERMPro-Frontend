import Sidebar from "@/components/layout/Sidebar";
import MyAssignmentCard from "@/components/MyAssignmentCard";
import { useAssignments } from "@/context/AssignmentsContext";
import { useProfile } from "@/context/ProfileContext";
import { useEffect } from "react";

export const MyAssignments = () => {
  const { myAssignments, loading, error, refetchMy } = useAssignments();
  const { user } = useProfile();

  useEffect(() => {
    if (user) {
      refetchMy();
    }
  }, [user]);

  if (loading) return <p className="text-center pt-4">Loading...</p>;
  if (error) return <p className="text-center pt-4">Error: {error}</p>;

  return (
    <Sidebar>
      <div className="p-6 max-w-7xl mx-auto">
        {user && (
          <p className="text-sm text-muted-foreground mb-1">
            Welcome back,{" "}
            <span className="font-semibold text-primary">{user.name}</span>!
          </p>
        )}
        <h1 className="text-2xl font-semibold my-6">My Assignments</h1>

        {myAssignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAssignments.map((assignment) => (
              <MyAssignmentCard key={assignment._id} assignment={assignment} />
            ))}
          </div>
        )}
      </div>
    </Sidebar>
  );
};
