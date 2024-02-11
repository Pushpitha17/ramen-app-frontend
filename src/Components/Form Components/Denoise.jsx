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
    url: "/denoise/moving_avg",
    window: {
      value: 3,
    },
    order: false,
  },
  2: {
    url: "/denoise/savgol",
    window: {
      value: 7,
    },
    order: {
      value: 1,
    },
  },
  3: {
    url: "/denoise/lowess",
    window: {
      value: 5,
    },
    order: {
      value: 1,
    },
  },
};

function Denoise() {
  const [formDisabled, setFormDisabled] = useState(true);
  const [value, setValue] = useState(null);
  const [formOptions, setFormOptions] = useState(null);
  const [form] = Form.useForm();

  const { setDenoising } = useContext(FormContext)

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
    setDenoising(formOptions)
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
          <Title level={5}>DeNoise</Title>
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
                {/* <Radio value={1}> Moving Average </Radio> */}
                <Radio value={2}> Savitzky-Golay </Radio>
                <Radio value={3}> LOWESS </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Parameters" labelAlign="left" style={{ marginBottom : '12px' }}>
              <Row>
                {formDisabled ? (
                  <Text disabled={true}>Denoising is Not Checked</Text>
                ) : (
                  <></>
                )}
                {!formDisabled && !value ? (
                  <Text>Select a Denoising Method</Text>
                ) : (
                  <></>
                )}
                {!formDisabled && value && formOptions ? (
                  <>
                    {" "}
                    {formOptions.window ? (
                      <NumberInput
                        text="Window"
                        name="window"
                        value={formOptions.window.value}
                        min="1"
                        max="99"
                        step="2"
                        currentState={formOptions}
                        changeState={setFormOptions}
                      />
                    ) : (
                      <></>
                    )}
                    {formOptions.order ? (
                      <NumberInput
                        text="Order"
                        name="order"
                        value={formOptions.order.value}
                        min="1"
                        max="20"
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

export default Denoise;
