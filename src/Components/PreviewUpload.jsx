import React, { useContext } from "react";
import AppContext from "../../AppContext";
import Plot from "react-plotly.js";

function PreviewUpload(data) {
  return (
    <div style={{ display :'flex', justifyContent : "center" , padding : "30px" }}>
      <Plot
        data={[
          {
            x: data.data[0],
            y: data.data[1],
            type: "scatter",
            mode: "lines",
            marker: { color: "#2980b9" },
          },
        ]}
        layout={{ title: "Preview" }}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default PreviewUpload;
