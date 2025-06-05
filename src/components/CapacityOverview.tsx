import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Engineer = {
  name: string;
  capacity: number;
};

type CapacityProps = {
  engineers: Engineer[];
};

const CapacityOverview = ({ engineers }: CapacityProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {engineers.map((eng, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{eng.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">
              Capacity Allocated: {eng.capacity}%
            </p>
            <Progress value={eng.capacity} />
            <p className="mt-2 text-xs text-right text-gray-500">
              {100 - eng.capacity}% Available
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CapacityOverview;
