import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjects } from "@/context/ProjectsContext";
import { useEngineers } from "@/context/EngineerContext";
import { toast } from "sonner";

type AssignmentFormData = {
  engineerId: string;
  projectId: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
};

const CreateAssignment = () => {
  const { engineers, loading, error } = useEngineers();
  const { projects } = useProjects();

  const url = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AssignmentFormData>();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const onSubmit = async (data: AssignmentFormData) => {
    try {
      const res = await fetch(`${url}/api/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create assignment");
      toast("Assignment created successfully!");
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message);
      } else {
        toast("An unknown error occurred");
      }
    }
  };

  return (
    <Sidebar>
      <div className="max-w-3xl mx-auto mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create New Assignment</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Engineer</Label>
                  <Select onValueChange={(val) => setValue("engineerId", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Engineer" />
                    </SelectTrigger>
                    <SelectContent>
                      {engineers.map((e) => (
                        <SelectItem key={e._id} value={e._id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.engineerId && (
                    <p className="text-sm text-red-500">Engineer is required</p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block">Project</Label>
                  <Select onValueChange={(val) => setValue("projectId", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectId && (
                    <p className="text-sm text-red-500">Project is required</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Allocation %</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  {...register("allocationPercentage", { required: true })}
                />
                <p className="text-xs text-muted-foreground">
                  Enter between 0 to 100
                </p>
                {errors.allocationPercentage && (
                  <p className="text-sm text-red-500">Allocation is required</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Start Date</Label>
                  <Input
                    type="date"
                    {...register("startDate", { required: true })}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500">
                      Start date is required
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 block">End Date</Label>
                  <Input
                    type="date"
                    {...register("endDate", { required: true })}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500">End date is required</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Role</Label>
                <Input type="text" {...register("role", { required: true })} />
                {errors.role && (
                  <p className="text-sm text-red-500">Role is required</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Create Assignment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
};

export default CreateAssignment;
