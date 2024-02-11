import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Typography, Button, Divider } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import AppContext from "../../AppContext";
import FormContext from "../../FormContext";
import PreviewResults from "./PreviewResults";
import { round } from "lodash";
import _ from "lodash";

const { Title, Text } = Typography;

function ResultsBlock() {
  const { ramanSpectrum, setRamanSpectrum, file } = useContext(AppContext);
  const { denoising, baseline, noramlizing } = useContext(FormContext);
  console.log({ ramanSpectrum, denoising, baseline, noramlizing, file });

  let peaks = ramanSpectrum.peaks;
  peaks = _.sortBy(peaks, (e) => e[1]);
  peaks.reverse();

  const peak_col1 = _.slice(peaks, 0, Math.ceil(peaks.length / 2));
  const peak_col2 = _.slice(peaks, Math.ceil(peaks.length / 2));

  return (
    <div style={{ marginTop: "30px", marginBottom: "100px" }}>
      <Title level={3} style={{ textAlign: "center", paddingBottom: "20px" }}>
        Processed Results
      </Title>
      <Row>
        {denoising && (
          <Col
            offset={3}
            span={18}
            style={{ padding: "0 5px", textAlign: "center" }}
          >
            {/* <Title strong>Denoising</Title> */}
            <PreviewResults
              shift={ramanSpectrum.shift}
              intensity={ramanSpectrum.denoised_i}
              title="Denoised"
            ></PreviewResults>
          </Col>
        )}
        {baseline && (
          <Col
            offset={3}
            span={18}
            style={{ padding: "0 20px", textAlign: "center" }}
          >
            {/* <Title strong>Baseline Correction</Title> */}
            <PreviewResults
              shift={ramanSpectrum.shift}
              intensity={ramanSpectrum.preBaselineCorrection}
              ply={ramanSpectrum.baseline_ply}
              title="Fitting Polynomial"
              traceName="Polynomial"
            ></PreviewResults>
            <PreviewResults
              shift={ramanSpectrum.shift}
              intensity={ramanSpectrum.preBaselineCorrection}
              ply={ramanSpectrum.baseline}
              title="Baseline"
              traceName="Baseline"
            ></PreviewResults>
          </Col>
        )}
        {noramlizing && (
          <Col
            offset={3}
            span={18}
            style={{ padding: "0 20px", textAlign: "center" }}
          >
            {/* <Title strong>Normalizing</Title> */}
            <PreviewResults
              shift={ramanSpectrum.shift}
              intensity={ramanSpectrum.normalized_i}
              title="Normalized"
            ></PreviewResults>
          </Col>
        )}
      </Row>
      <Divider style={{ backgroundColor: "#535c68" }} />
      <Title level={5} style={{ textAlign: "center", padding: "20px" }}>
        Output
      </Title>
      <Row>
        <Col span={20} offset={2}>
          <PreviewResults
            shift={ramanSpectrum.shift}
            intensity={ramanSpectrum.lastprocessed}
            title={file}
            final={true}
          ></PreviewResults>
        </Col>
      </Row>
      <Row>
        <Col offset={3} span={18} style={{ padding: "0 20px", marginBottom : '30pxw' }}>
          <Row style={{ paddingBottom: "5px" }}>
            <Col span={6}>
              <Title level={5}>Peaks</Title>
              <Text>shift , intensity</Text>
            </Col>
            <Col span={8}>
              {/* <ul>
                {peak_col1.map((item) => (
                  <li>
                    {round(item[0], 2)}
                    {" , "}
                    {round(item[1], 2)}{" "}
                  </li>
                ))}
              </ul> */}
              <ul>
                {peak_col1.map((item) => (
                  <li>
                    {round(item[0], 2)}
                    {" , "}
                    {item[1].toExponential(4)}{" "}
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={8}>
              <ul>
                {peak_col2.map((item) => (
                  <li>
                  {round(item[0], 2)}
                  {" , "}
                  {item[1].toExponential(4)}{" "}
                </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
      <Col span={18} offset={3}>
          <Button size="large" icon={<DownloadOutlined />}>
            Download
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ResultsBlock;
