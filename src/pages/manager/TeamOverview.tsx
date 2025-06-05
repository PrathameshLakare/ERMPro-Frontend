import { useState } from "react";
import EngineerCard from "@/components/EngineerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import { useEngineers } from "@/context/EngineerContext";

const ManagerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const { engineers, loading, error } = useEngineers();

  const allSkills = Array.from(new Set(engineers.map((e) => e.skills).flat()));

  const filteredEngineers = engineers.filter((eng) => {
    const matchesName = eng.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill
      ? eng.skills.includes(selectedSkill)
      : true;
    return matchesName && matchesSkill;
  });

  if (loading) return <p className="text-center mt-10">Loading engineers...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <Sidebar>
      <div className="p-6 space-y-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Team Overview</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Search and filter engineers by name or skill
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />

            <div className="flex gap-2 overflow-x-auto">
              <Button
                size="sm"
                variant={!selectedSkill ? "default" : "outline"}
                onClick={() => setSelectedSkill("")}
              >
                All Skills
              </Button>
              {allSkills.map((skill) => (
                <Button
                  key={skill}
                  size="sm"
                  variant={selectedSkill === skill ? "default" : "outline"}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEngineers.map((eng) => (
            <EngineerCard key={eng.email} engineer={eng} />
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default ManagerDashboard;
