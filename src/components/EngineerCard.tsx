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
  email: string;
  skills: string[];
  seniority: string;
  maxCapacity: number;
  availableCapacity: number;
};

type EngineerCardProps = {
  engineer: Engineer;
};

const EngineerCard = ({ engineer }: EngineerCardProps) => {
  const { name, email, skills, seniority, maxCapacity, availableCapacity } =
    engineer;

  const usedCapacity = maxCapacity - availableCapacity;
  const usedPercentage = maxCapacity
    ? Math.round((usedCapacity / maxCapacity) * 100)
    : 0;

  const getBarColor = () => {
    if (usedPercentage < 50) return "bg-green-500";
    if (usedPercentage < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{seniority}-level Engineer</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{email}</p>

        <div className="my-4 flex flex-wrap gap-2">
          {skills &&
            skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
        </div>

        <p className="text-sm text-muted-foreground mb-1">Capacity Usage</p>
        <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
          <div
            className={`h-full ${getBarColor()}`}
            style={{ width: `${usedPercentage}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground mt-1 text-right">
          {availableCapacity}h Available ({usedPercentage}% Used)
        </p>
      </CardContent>
    </Card>
  );
};

export default EngineerCard;
