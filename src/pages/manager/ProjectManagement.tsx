import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/context/ProjectsContext";

export type Project = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "planning" | "active" | "completed";
};

const ProjectManagement = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Sidebar>
      <div className="flex justify-between items-center max-w-5xl mx-auto mt-6 mb-4">
        <h1 className="text-2xl font-semibold">Project Management</h1>
        <Button onClick={() => navigate("/create-project")}>
          Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {projects.map((project) => (
          <Card
            key={project._id}
            className="hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/projects/${project._id}`)}
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-1 text-gray-500">
                {project.description.length > 80
                  ? `${project.description.slice(0, 80)}...`
                  : project.description}
              </p>
              <p className="text-sm mb-1">
                <strong>Status:</strong> {project.status}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-200 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Sidebar>
  );
};

export default ProjectManagement;
