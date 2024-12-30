import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Dropdowns from "./components/Dropdowns";
import Graph from "./components/Graph";
import Home from "./components/Home";
import PerformanceTest from "./components/PerformanceTest";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css";

const metricOptions = [
  { value: "lcp", label: "Largest Contentful Paint" },
  { value: "cls", label: "Cumulative Layout Shift" },
];

const deviceOptions = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
];

const App = () => {
  const [metric, setMetric] = useState(""); 
  const [device, setDevice] = useState(""); 
  const [graphData, setGraphData] = useState([]); 

  useEffect(() => {
    if (!metric || !device) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://example-metrics.speedvitals.workers.dev/?metric=${metric}&device=${device}`
        );
        setGraphData(response.data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setGraphData([]);
      }
    };

    fetchData();
  }, [metric, device]);

  const PerformanceReport = () => (
    <div>
      <h1>Performance Report</h1>
      <div className="dropdowns">
        <Dropdowns
          label="Metric"
          options={metricOptions}
          value={metric} 
          onChange={(selectedOption) => setMetric(selectedOption.value)} 
        />
        <Dropdowns
          label="Device"
          options={deviceOptions}
          value={device} 
          onChange={(selectedOption) => setDevice(selectedOption.value)} 
        />
      </div>

      <Graph
        data={metric && device ? graphData : []}
        title={metric && device ? metricOptions.find((o) => o.value === metric)?.label || "" : ""}
        metric={metric}
        device={device}
      />
    </div>
  );

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<PerformanceReport />} />
            <Route path="/home" element={<Home />} />
            <Route path="/performance-test" element={<PerformanceTest />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
