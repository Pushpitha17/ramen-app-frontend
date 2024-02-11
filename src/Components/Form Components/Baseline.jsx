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
    url: "/baseline/polyfit",
    order: {
      value: 4,
    },
    iterations: {
      value: 128,
    },
  },
};

function Baseline() {
  const [formDisabled, setFormDisabled] = useState(true);
  const [value, setValue] = useState(null);
  const [formOptions, setFormOptions] = useState(null);
  const [form] = Form.useForm();

  const { setBaselineCorrection } = useContext(FormContext)

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
      setFormOptions(null)
    }
  }, [value]);

  useEffect(() => {
    setBaselineCorrection(formOptions)
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
          <Title level={5}>Baseline Correction</Title>
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
            <Form.Item label="Method" labelAlign="left" style={{ marginBottom : '12px' }}>
              <Radio.Group onChange={handleChange} value={value}>
                <Radio value={1}> Polynomial Fit </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Parameters" labelAlign="left" style={{ marginBottom : '12px' }}>
              <Row>
                {formDisabled ? (
                  <Text disabled={true}>Baseline correction is Not Selected</Text>
                ) : (
                  <></>
                )}
                {!formDisabled && !value ? (
                  <Text>Select a Baseline correction Method</Text>
                ) : (
                  <></>
                )}
                {!formDisabled && value && formOptions ? (
                  <>
                    {" "}
                    {formOptions.order ? (
                      <NumberInput
                        text="Order"
                        name="order"
                        value={formOptions.order.value}
                        min="0"
                        max="10"
                        step="1"
                        currentState={formOptions}
                        changeState={setFormOptions}
                      />
                    ) : (
                      <></>
                    )}
                    {formOptions.order ? (
                      <NumberInput
                        text="Iterations"
                        name="iterations"
                        value={formOptions.iterations.value}
                        min="0"
                        max="256"
                        step="1"
                        currentState={formOptions}
                        changeState={setFormOptions}
                      />
                    ) : (
                      <></>
                    )}
                  </>
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

export default Baseline;
