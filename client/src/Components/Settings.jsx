import React, { useState } from "react";
import TabButton from "./Elements/TabButton";
import UpdatePersonal from "./Settings/UpdatePersonal";
import UpdateParametrs from "./Settings/UpdateParametrs.jsx";
import UpdateEmail from "./Settings/UpdateEmail";
import UpdatePassword from "./Settings/UpdatePassword";
import "../css/tab.css";
import UpdateAvatar from "./Settings/UpdateAvatar.jsx";

export default function Settings() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const showContent = () => {
    switch (activeTab) {
      case 1:
        return <UpdatePersonal />;
      case 2:
        return <UpdateParametrs />;
      case 3:
        return <UpdateEmail />;
      case 4:
        return <UpdatePassword />;
      case 5:
        return <UpdateAvatar />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="settings-container">
        <div className="tabgroup">
          <TabButton
            className={activeTab === 1 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(1)}
          >
            Personal Information
          </TabButton>
          <TabButton
            className={activeTab === 2 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(2)}
          >
            Update Parametrs
          </TabButton>
          <TabButton
            className={activeTab === 3 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(3)}
          >
            Update Email
          </TabButton>
          <TabButton
            className={activeTab === 4 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(4)}
          >
            Update Password
          </TabButton>
          <TabButton
            className={activeTab === 5 ? "tab-active" : "tab-default"}
            onClick={() => handleTabClick(5)}
          >
            Update Avatar
          </TabButton>
        </div>
        {showContent()}
      </div>
    </>
  );
}
