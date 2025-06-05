import { useAssignments } from "@/context/AssignmentsContext";
import Sidebar from "@/components/layout/Sidebar";
import AssignmentCard from "@/components/AssignmentCard";

const AllAssignments = () => {
  const { allAssignments, loading, error } = useAssignments();

  return (
    <Sidebar>
      <div className="p-6 space-y-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">All Assignments</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !allAssignments || allAssignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAssignments.length > 0 &&
              allAssignments.map((assignment) => (
                <AssignmentCard key={assignment._id} assignment={assignment} />
              ))}
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default AllAssignments;
