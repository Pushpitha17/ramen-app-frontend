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
  1: {
    url: "/normalize/minmax",
    parameters: true,
    height: {
      value: 3,
    },
  },
  2: {
    url: "/normalize/one",
    parameters: false,
    height: false,
  },
  3: {
    url: "/normalize/two",
    parameters: false,
    height: false,
  },
  4: {
    url: "/normalize/inf",
    parameters: false,
    height: false,
  },
  5: {
    url: "/normalize/snv",
    parameters: false,
    height: false,
  },
};

function Normalizing() {
  const [formDisabled, setFormDisabled] = useState(true);
  const [value, setValue] = useState(null);
  const [formOptions, setFormOptions] = useState(null);
  const [form] = Form.useForm();

  const { setNormalizing } = useContext(FormContext);

  const onDisableCheck = (e) => {
    setFormDisabled(!e.target.checked);
    setValue(null);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value) {
      setFormOptions(statusObj[value]);
    }else{
      setFormOptions(null);
    }
  }, [value]);

  useEffect(() => {
    setNormalizing(formOptions);
  }, [formOptions]);

  return (
    <>
      <Row style={{ paddingBottom: "5px" }}>
        <Col span={2}>
          <Checkbox
            style={{ marginBottom: "0.5em" }}
            onChange={onDisableCheck}
          />
        </Col>
        <Col flex="auto">
          <Title level={5}>Normalize</Title>
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
              label="Method"
              labelAlign="left"
              style={{ marginBottom: "12px" }}
            >
              <Radio.Group onChange={handleChange} value={value}>
                <Radio value={1}> Min-Max Norm </Radio>
                <Radio value={2}> 1-Norm </Radio>
                <Radio value={3}> 2-Norm </Radio>
                <Radio value={4}> Inf-Norm </Radio>
                <Radio value={5}> SNV-Norm </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Parameters"
              labelAlign="left"
              style={{ marginBottom: "12px" }}
            >
              <Row>
                {formDisabled ? (
                  <Text disabled={true}>Normalizing is Not Checked</Text>
                ) : (
                  <></>
                )}
                {!formDisabled && !value ? (
                  <Text>Select a Noramlising Method</Text>
                ) : (
                  <></>
                )}
                {(!formDisabled && value ) && (formOptions && formOptions.parameters) ? (
                  <>
                    {" "}
                    <NumberInput
                      text="Height"
                      name="height"
                      value={formOptions.height.value}
                      min="0"
                      max="10"
                      step="1"
                      currentState={formOptions}
                      changeState={setFormOptions}
                    />
                  </>
                ) : (
                  <></>
                )}
                {(formOptions && !formOptions.parameters) ? (
                  <Text>None</Text>
                ) : (
                  <></>
                )}
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Normalizing;
