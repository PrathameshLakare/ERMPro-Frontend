import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Projects = {
  name: string;
  status: string;
};

type ProjectProps = {
  projects: Projects[];
};

const ProjectOverview = ({ projects }: ProjectProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Project Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge
                variant={
                  project.status === "active"
                    ? "default"
                    : project.status === "completed"
                    ? "secondary"
                    : "outline"
                }
              >
                {project.status.toUpperCase()}
              </Badge>
              <Button size="sm" variant="outline">
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
