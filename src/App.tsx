import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import ManagerDashboard from "./pages/manager/TeamOverview";
import CreateAssignment from "./pages/manager/CreateAssignment";
import ProjectManagement from "./pages/manager/ProjectManagement";
import ProjectDetails from "./pages/manager/ProjectDetails";
import CreateProject from "./pages/manager/CreateProject";
import { EngineerProvider } from "./context/EngineerContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { AssignmentsProvider } from "./context/AssignmentsContext";
import { MyAssignments } from "./pages/engineer/MyAssignments";
import Profile from "./pages/engineer/Profile";
import { ProfileProvider } from "./context/ProfileContext";
import { Toaster } from "@/components/ui/sonner";
import AllAssignments from "./pages/manager/AllAssignments";
import AnalyticsPage from "./pages/manager/Analytics";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/*"
          element={
            <PrivateRoute allowedRoles={["manager", "engineer"]}>
              <ProfileProvider>
                <EngineerProvider>
                  <ProjectsProvider>
                    <AssignmentsProvider>
                      <MainLayout />
                      <Routes>
                        {/* Manager Routes */}
                        <Route
                          path="/manager/team-overview"
                          element={<ManagerDashboard />}
                        />
                        <Route
                          path="/manager/create-assignment"
                          element={<CreateAssignment />}
                        />
                        <Route
                          path="/manager/project-management"
                          element={<ProjectManagement />}
                        />
                        <Route
                          path="/projects/:id"
                          element={<ProjectDetails />}
                        />
                        <Route
                          path="/create-project"
                          element={<CreateProject />}
                        />
                        <Route
                          path="/assignments/all"
                          element={<AllAssignments />}
                        />
                        <Route
                          path="/manager/analytics"
                          element={<AnalyticsPage />}
                        />

                        {/* Engineer Routes */}
                        <Route
                          path="/engineer/assignments"
                          element={<MyAssignments />}
                        />
                        <Route path="/engineer/profile" element={<Profile />} />
                      </Routes>
                    </AssignmentsProvider>
                  </ProjectsProvider>
                </EngineerProvider>
              </ProfileProvider>
            </PrivateRoute>
          }
        />
      </Routes>

      <Toaster position="bottom-right" richColors closeButton />
    </Router>
  );
}

export default App;
