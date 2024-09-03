import { useState } from "react";
import Profile from "../Components/Overview/Profile";
import Settings from "../Components/Overview/Settings";

const Overview = () => {
  const [checked, setChecked] = useState("tab1");
  return (
    <div
      style={{ minHeight: "calc(100vh - 160px)" }}
      className="mb-5 flex flex-col justify-center items-center"
    >
      <div className="tab-container my-10">
        <input
          checked={checked === "tab1"}
          onChange={() => setChecked("tab1")}
          type="radio"
          name="tab"
          id="tab1"
          className="tab tab--1"
        />
        <label htmlFor="tab1" className="tab_label">
          Profile
        </label>

        <input
          checked={checked === "tab2"}
          onChange={() => setChecked("tab2")}
          type="radio"
          name="tab"
          id="tab2"
          className="tab tab--2"
        />
        <label htmlFor="tab2" className="tab_label">
          Settings
        </label>
        <div className="indicator"></div>
      </div>
      <div className="min-h-96">
        {checked === "tab1" ? <Profile /> : <Settings />}
      </div>
    </div>
  );
};

export default Overview;
