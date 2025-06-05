import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";

type Project = {
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

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const ProjectDetails = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const {
    data: project,
    loading,
    error,
  } = useFetch<Project>(`${url}/api/projects/${id}`);

  const navigate = useNavigate();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!project) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <Sidebar>
      <div className="max-w-3xl mx-auto mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{project.name}</CardTitle>

            <p className="text-muted-foreground">{project.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p>
                <strong>Duration:</strong> {formatDate(project.startDate)} –{" "}
                {formatDate(project.endDate)}
              </p>
            </div>

            <div>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  variant={
                    project.status === "active"
                      ? "default"
                      : project.status === "completed"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {project.status}
                </Badge>
              </p>
            </div>

            <div>
              <p>
                <strong>Team Size:</strong> {project.teamSize}
              </p>
            </div>

            <div>
              <p className="mb-1">
                <strong>Required Skills:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {project.managerId && (
              <div>
                <p>
                  <strong>Managed by:</strong> {project.managerId.name} (
                  {project.managerId.email})
                </p>
              </div>
            )}

            <Button
              className="mt-4 px-6 py-2 max-w-max"
              onClick={() =>
                navigate("/create-project", { state: { project } })
              }
            >
              Update Project Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
};

export default ProjectDetails;
