import React, { useState, useEffect, useContext } from "react";
import {
  Checkbox,
  Typography,
  Row,
  Space,
  Input,
  Radio,
  Col,
  InputNumber,
  Select,
  Form,
} from "antd";
const { Title, Text } = Typography;
import NumberInput from "../Utils/NumberInput";
import FormContext from "../../../FormContext";

const statusObj = {
  url: "/findpeaks",
  prominence: {
    value: 1,
  },
};

function FindPeaks() {
  const [formDisabled, setFormDisabled] = useState(false);
  const [value, setValue] = useState(null);
  const [formOptions, setFormOptions] = useState(statusObj);
  const [form] = Form.useForm();

  const { setFindPeaks } = useContext(FormContext);

  const onDisableCheck = (e) => {
    setFormDisabled(!e.target.checked);
    setValue(null);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // useEffect(() => {
  //   if (value) {
  //     setFormOptions(statusObj[value]);
  //   } else {
  //     setFormOptions(null);
  //   }
  // }, [value]);

  useEffect(() => {
    setFindPeaks(formOptions);
  }, [formOptions]);

  return (
    <>
      <Row style={{ paddingBottom: "5px" }}>
        {/* <Col span={2}>
          <Checkbox
            style={{ marginBottom: "0.5em" }}
            onChange={onDisableCheck}
          />
        </Col> */}
        <Col span={5} offset={2}>
          <Title level={5}>Find Peaks</Title>
        </Col>
      </Row>
      <Row>
        <Col offset={2} flex="auto">
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            disabled={formDisabled}
          >
            <Form.Item
              label="Prominence"
              labelAlign="left"
              style={{ marginBottom: "12px" }}
            >
              <NumberInput
                text=""
                name="prominence"
                value={formOptions.prominence.value}
                min="1"
                max="25"
                step="1"
                currentState={formOptions}
                changeState={setFormOptions}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default FindPeaks;
