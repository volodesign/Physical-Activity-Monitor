import React, { useState } from "react";
import TabButton from "./Elements/TabButton";
import DashboardContent from "./Dashboard/DashboardContent";
import Files from "./Dashboard/Files";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const showContent = () => {
    switch (activeTab) {
      case 1:
        return <DashboardContent />;
      case 2:
        return <Files />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="dashboard-container">
        <div className="tabgroup">
          <TabButton
            className={activeTab === 1 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(1)}
          >
            Dashboard
          </TabButton>
          <TabButton
            className={activeTab === 2 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(2)}
          >
            My files
          </TabButton>
        </div>
        {showContent()}
      </div>
    </>
  );
}
