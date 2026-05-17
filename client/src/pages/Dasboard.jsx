import { useLocation } from "react-router-dom";
import ProjectView from "./ProjectView";           // adjust path if needed
import DigitalMarketing from "./DigitalMarketing"; // adjust path if needed
import Navbar from "../components/Navbar";         // adjust path if needed

const Dashboard = () => {
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get("tab") || "projects";

  return (
    <div style={{ minHeight: "100vh", background: "#080b14" }}>
      <Navbar />
      {/* paddingTop matches navbar height so content isn't hidden behind it */}
      <div style={{ paddingTop: "70px" }}>
        {tab === "projects"  && <ProjectView />}
        {tab === "marketing" && <DigitalMarketing />}
      </div>
    </div>
  );
};

export default Dashboard;