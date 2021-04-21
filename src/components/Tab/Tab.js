import React, { useState } from "react";
import "./Tab.css";

export default function Tab(props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="Tabs">
      {props.tabs.map((tab, i) => {
        return (
          <div
            key={tab.label}
            className={activeTab === i ? "Tab active" : "Tab"}
            onClick={() => {
              setActiveTab(i);
              props.onClick(tab);
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
