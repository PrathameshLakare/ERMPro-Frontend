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
    <ProfileProvider>
      <EngineerProvider>
        <ProjectsProvider>
          <AssignmentsProvider>
            <Router>
              <MainLayout />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route
                  path="/manager/team-overview"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <ManagerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/manager/create-assignment"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <CreateAssignment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/manager/project-management"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <ProjectManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <ProjectDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-project"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <CreateProject />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/assignments/all"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <AllAssignments />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/manager/analytics"
                  element={
                    <PrivateRoute allowedRoles={["manager"]}>
                      <AnalyticsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/engineer/assignments"
                  element={
                    <PrivateRoute allowedRoles={["engineer"]}>
                      <MyAssignments />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/engineer/profile"
                  element={
                    <PrivateRoute allowedRoles={["engineer"]}>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <Toaster position="bottom-right" richColors closeButton />
            </Router>
          </AssignmentsProvider>
        </ProjectsProvider>
      </EngineerProvider>
    </ProfileProvider>
  );
}

export default App;
