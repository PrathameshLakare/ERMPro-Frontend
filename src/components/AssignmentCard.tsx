import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

type AssignmentCardProps = {
  assignment: AssignmentWithEngineerObject;
};

const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  const {
    role,
    startDate,
    endDate,
    projectId: project,
    engineerId: engineer,
  } = assignment;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-1">
          <strong>Engineer:</strong> {engineer.name ?? "Unknown"}
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          Project: {project.description}
        </p>

        <div className="my-4 flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
          Skills:{" "}
          {project.requiredSkills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          Project Duration: {new Date(project.startDate).toLocaleDateString()} -{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          Assignment Duration: {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>

        <p className="text-sm text-muted-foreground mb-2">
          Team Size: {project.teamSize}
        </p>

        <Badge variant={project.status === "active" ? "default" : "secondary"}>
          {project.status.toUpperCase()}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
