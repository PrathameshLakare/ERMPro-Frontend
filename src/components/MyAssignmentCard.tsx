import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Project = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "planning" | "active" | "completed";
};

type AssignmentWithEngineerIdOnly = {
  _id: string;
  role: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  engineerId: string;
};

type MyAssignmentCardProps = {
  assignment: AssignmentWithEngineerIdOnly;
};

const MyAssignmentCard = ({ assignment }: MyAssignmentCardProps) => {
  const { role, startDate, endDate, projectId: project } = assignment;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project?.name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {project?.description}
        </p>

        <div className="my-4 flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
          Skills:{" "}
          {project?.requiredSkills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          Project Duration: {new Date(project?.startDate).toLocaleDateString()}{" "}
          - {new Date(project?.endDate).toLocaleDateString()}
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          Assignment Duration: {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          Team Size: {project?.teamSize}
        </p>

        <Badge variant={project?.status === "active" ? "default" : "secondary"}>
          {project?.status.toUpperCase()}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default MyAssignmentCard;
