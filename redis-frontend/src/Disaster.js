import React from "react";
import Sidebar from "./Sidebar";
import "./Disaster.css";

const Disaster = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <h1>Disaster Preparedness & Response</h1>
        <p>
          This page provides vital information on disaster preparedness,
          emergency contacts, and real-time updates to ensure the safety of our
          community.
        </p>

        <div className="section">
          <h2>📞 Emergency Contacts & Hotlines</h2>
          <ul>
            <li><strong>Barangay Hotline:</strong> 0912-345-6789</li>
            <li><strong>City Hall:</strong> 123-4567</li>
            <li><strong>Disaster Response Team:</strong> 0987-654-3210</li>
            <li><strong>Fire Department:</strong> 911</li>
            <li><strong>Police Station:</strong> 117</li>
            <li><strong>Medical Emergency:</strong> 112</li>
            <li><strong>NGOs (Red Cross, DSWD):</strong> 143</li>
          </ul>
        </div>

        <div className="section">
          <h2>⚠️ Disaster Preparedness Tips</h2>
          <ul>
            <li><strong>Before a Disaster:</strong> Prepare emergency kits, know evacuation routes.</li>
            <li><strong>During a Disaster:</strong> Stay calm, follow official instructions, evacuate if needed.</li>
            <li><strong>After a Disaster:</strong> Check for injuries, seek help if needed, report damages.</li>
          </ul>
        </div>

        <div className="section">
          <h2>🎒 Emergency Kit Checklist</h2>
          <ul>
            <li>✅ Drinking water (3-day supply)</li>
            <li>✅ Non-perishable food</li>
            <li>✅ First aid kit</li>
            <li>✅ Flashlights & batteries</li>
            <li>✅ Whistle for signaling</li>
            <li>✅ Important documents (IDs, emergency contacts)</li>
          </ul>
        </div>

        <div className="section">
          <h2>🗺️ Evacuation Plans & Safe Zones</h2>
          <p>Know the nearest evacuation centers in your area:</p>
          <ul>
            <li>🏢 Barangay Hall</li>
            <li>🏫 Local School Gym</li>
            <li>⛪ Church Evacuation Area</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Disaster;
