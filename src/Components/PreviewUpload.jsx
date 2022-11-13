import React, { useContext } from "react";
import AppContext from "../../AppContext";
import Plot from "react-plotly.js";

function PreviewUpload(data) {
  console.log({ x: data[0], y: data[1], a: data.data[1] });

  return (
    <div style={{ display :'flex', justifyContent : "center" , padding : "30px" }}>
      <Plot
        data={[
          {
            x: data.data[0],
            y: data.data[1],
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
          },
        ]}
        layout={{ title: "Preview" }}
      />
    </div>
  );
}

export default PreviewUpload;
