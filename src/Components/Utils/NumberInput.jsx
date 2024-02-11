import React, { useState, useEffect } from "react";
import { Typography, Row, Col, InputNumber } from "antd";
const { Text } = Typography;

function NumberInput({
  name,
  text,
  min,
  max,
  step,
  currentState,
  value,
  changeState,
}) {
  const [error, setError] = useState("");
  const [localValue, setValue] = useState(value);

  useEffect(() => {
    if (parseFloat(localValue) > max || parseFloat(localValue) < min) {
      setError("error");
    } else {
      setError("");
    }
  }, [value]);

  const changeLocalState = (val) => {
    setValue(val);
    changeState({
      ...currentState,
      [name]: {
        value: val,
      },
    });
  };

  return (
    <Col span={10} offset={0}>
      {/* <Row justify="center" align="center">
        <Col
          flex="auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Text style={{ paddingRight: "10px", fontSize: "14px" }}>{text}</Text>
        </Col>
        <Col span={12}>
          <InputNumber
            style={{
              width: "auto",
              fontSize: "12px",
            }}
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={changeLocalState}
            status={error}
            stringMode
          />
        </Col>
        <Col span={2}></Col>
      </Row> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          paddingRight: "20px",
        }}
      >
        <Text style={{ paddingRight: "10px", fontSize: "14px" }}>{text}</Text>
        <InputNumber
          style={{
            width: "100px",
            fontSize: "12px",
          }}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={changeLocalState}
          status={error}
          stringMode
        />
      </div>
    </Col>
  );
}

export default NumberInput;
