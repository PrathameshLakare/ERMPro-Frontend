import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/layout/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjects } from "@/context/ProjectsContext";
import { toast } from "sonner";

type ProjectForm = {
  _id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "planning" | "active" | "completed";
};

const CreateProject = () => {
  const [skillsInput, setSkillsInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const { refetchProjects } = useProjects();
  const location = useLocation();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const projectToEdit = location.state?.project as ProjectForm | undefined;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectForm>();

  const addSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      const newSkills = [...skills, skillsInput.trim()];
      setSkills(newSkills);
      setValue("requiredSkills", newSkills);
      setSkillsInput("");
    }
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    setValue("requiredSkills", updated);
  };

  const onSubmit = async (data: ProjectForm) => {
    try {
      const endpoint = projectToEdit
        ? `${url}/api/projects/${projectToEdit._id}`
        : `${url}/api/projects`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify(data),
      });

      if (!res.ok)
        throw new Error(
          `Failed to ${projectToEdit ? "update" : "create"} project`
        );

      refetchProjects();
      toast(`Project ${projectToEdit ? "updated" : "created"} successfully!`);

      navigate(
        projectToEdit
          ? `/projects/${projectToEdit._id}`
          : "/manager/project-management"
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message);
      } else {
        toast("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (projectToEdit) {
      setValue("name", projectToEdit.name);
      setValue("description", projectToEdit.description);

      const formatForInput = (dateStr: string) => {
        const d = new Date(dateStr);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setValue("startDate", formatForInput(projectToEdit.startDate));
      setValue("endDate", formatForInput(projectToEdit.endDate));

      setValue("teamSize", projectToEdit.teamSize);
      setValue("status", projectToEdit.status);
      setSkills(projectToEdit.requiredSkills || []);
      setValue("requiredSkills", projectToEdit.requiredSkills || []);
    }
  }, [projectToEdit, setValue]);

  return (
    <Sidebar>
      <div className="max-w-3xl mx-auto mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Create New Project</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label className="mb-2">Project Name</Label>
                <Input {...register("name", { required: true })} />
                {errors.name && (
                  <p className="text-sm text-red-500">Name is required</p>
                )}
              </div>

              <div>
                <Label className="mb-2">Description</Label>
                <Input {...register("description", { required: true })} />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    Description is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">Start Date</Label>
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
                  <Label className="mb-2">End Date</Label>
                  <Input
                    type="date"
                    {...register("endDate", { required: true })}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500">End date is required</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <Label className="mb-2">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Size */}
              <div>
                <Label className="mb-2">Team Size</Label>
                <Input
                  type="number"
                  min={1}
                  {...register("teamSize", { required: true })}
                />
                {errors.teamSize && (
                  <p className="text-sm text-red-500">Team size is required</p>
                )}
              </div>

              {/* Status */}
              <div>
                <Label className="mb-2">Status</Label>
                <Select
                  onValueChange={(val) =>
                    setValue(
                      "status",
                      val as "planning" | "active" | "completed"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">Status is required</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {projectToEdit ? "Update Project" : "Create Project"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  );
};

export default CreateProject;
