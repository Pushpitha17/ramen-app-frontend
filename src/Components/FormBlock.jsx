import React, { useState, useContext } from "react";
import { Col, Row, Typography, Button } from "antd";
import Denoise from "./Form Components/Denoise";
import Normalizing from "./Form Components/Normalizing";
import Baseline from "./Form Components/Baseline";
import FindPeaks from "./Form Components/FindPeaks";
import FormContext from "../../FormContext";
import AppContext from "../../AppContext";

const { Title } = Typography;
// const baseurl = "http://127.0.0.1:8080";
const baseurl = "https://project-ramen-b1bf5.el.r.appspot.com";

function FormBlock() {
  const { denoising, baseline, noramlizing, findPeaks } =
    useContext(FormContext);
  const { ramanSpectrum, setRamanSpectrum, setProcessed } =
    useContext(AppContext);
  const [processing, setProcessing] = useState(false);

  const calculate = async (url, params) => {
    const res = await fetch(`${baseurl}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(params),
    });

    return await res.json();
  };

  const handleClick = async () => {
    console.log(denoising, baseline, noramlizing, findPeaks);
    console.log({ unprocessed: ramanSpectrum });

    setProcessed(false);
    setProcessing(true);

    let denoised_i, baseline_i, normalize_i, baseline_ply, baseline_corrected_i;
    let lastprocessed_i = ramanSpectrum.raw_intensity;
    let preBaselineCorrection = ramanSpectrum.raw_intensity;

    //denoising
    if (denoising) {
      const denoising_params = {
        spectrum: {
          shift: ramanSpectrum.shift,
          intensity: lastprocessed_i,
        },
        ...(denoising.window && { window: denoising.window.value }),
        ...(denoising.order && { order: denoising.order.value }),
      };

      const denoise_results = await calculate(denoising.url, denoising_params);
      // console.log(denoise_results);

      denoised_i = denoise_results.intensity;
      preBaselineCorrection = denoised_i;
      lastprocessed_i = denoised_i;
    }

    //baseline
    if (baseline) {
      const baseline_params = {
        spectrum: {
          shift: ramanSpectrum.shift,
          intensity: lastprocessed_i,
        },
        order: baseline.order.value,
        iterations: baseline.iterations.value,
      };

      const baseline_results = await calculate(baseline.url, baseline_params);

      baseline_corrected_i = baseline_results.intensity;
      baseline_i = baseline_results.baseline
      baseline_ply = baseline_results.polynomial;
      lastprocessed_i = baseline_corrected_i;
      // console.log(baseline_results);
    }

    //normalizing
    if (noramlizing) {
      const noramlizing_params = {
        spectrum: {
          shift: ramanSpectrum.shift,
          intensity: lastprocessed_i,
        },
        ...(noramlizing.height && { height: noramlizing.height.value }),
      };

      const normalize_results = await calculate(
        noramlizing.url,
        noramlizing_params
      );
      // console.log(normalize_results);
      normalize_i = normalize_results.intensity;
      lastprocessed_i = normalize_i;
    }

    //findpeaks
    const findPeaks_params = {
      ...(findPeaks.prominence && { prominence: findPeaks.prominence.value / 10 }),
      spectrum: {
        shift: ramanSpectrum.shift,
        intensity: lastprocessed_i,
      },
    };

    const findpeaks_results = await calculate(findPeaks.url, findPeaks_params);
    await setRamanSpectrum({
      ...ramanSpectrum,
      peaks: findpeaks_results.peaks,
      denoised_i: denoised_i,
      baseline_corrected_i: baseline_corrected_i,
      baseline : baseline_i,
      preBaselineCorrection,
      baseline_ply,
      lastprocessed: lastprocessed_i,
      normalized_i: normalize_i,
    });

    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div style={{ padding: "50px 0" }}>
      <Title level={3} style={{ textAlign: "center", paddingBottom: "50px" }}>
        Select Preprocessing Parameters
      </Title>
      <Row>
        <Col offset={4} span={16} style={{ padding: "0 20px" }}>
          <Denoise />
        </Col>
      </Row>
      <Row>
        <Col offset={4} span={16} style={{ padding: "20px 20px" }}>
          <Baseline />
        </Col>
      </Row>
      <Row>
        <Col offset={4} span={16} style={{ padding: "20px 20px" }}>
          <Normalizing />
        </Col>
      </Row>
      <Row>
        <Col offset={4} span={16} style={{ padding: "20px 20px" }}>
          <FindPeaks />
        </Col>
      </Row>
      <Row>
        <Col
          offset={4}
          span={16}
          style={{ padding: "50px 0 0 0", textAlign: "center" }}
        >
          {!processing && (
            <Button
              type="primary"
              onClick={handleClick}
              disabled={!ramanSpectrum}
            >
              Process Spectrum
            </Button>
          )}
          {processing && (
            <Button type="primary" loading>
              Processing
            </Button>
          )}

          {!ramanSpectrum && (
            <Title type="warning" strong>
              Please Upload Spectrum data from the top to continue
            </Title>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default FormBlock;
