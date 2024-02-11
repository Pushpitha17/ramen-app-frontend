import React, { useContext } from "react";
import AppContext from "../../AppContext";
import Plot from "react-plotly.js";
import { CSVLink, CSVDownload } from "react-csv";

function PreviewResults({ shift, intensity, ply, title , final, traceName }) {
  let trace1, trace2;
  let data = [];

  trace1 = {
    x: shift,
    y: intensity,
    type: "scatter",
    mode: "lines",
    name: 'Spectrum',
    marker: { color: final ? "#fe04d8" : "#0187ea" },
  };

  data.push(trace1);

  if (ply) {
    trace2 = {
      x: shift,
      y: ply,
      type: "scatter",
      mode: "lines",
      name: traceName,
      marker: { color: "#ff7979" },
    };

    data.push(trace2);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Plot data={data} layout={{ title: title }} style={{ width: "100%" }} />
    </div>
  );
}

export default PreviewResults;
