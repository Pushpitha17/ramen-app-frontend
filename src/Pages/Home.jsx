import React, { useContext } from "react";
import MainLayout from "../Components/Layout";
import { Col, Row, Typography, Button } from "antd";
import PreviewUpload from "../Components/PreviewUpload";
import UploadBlock from "../Components/UploadBlock";
import AppContext from "../../AppContext";
import FormBlock from "../Components/FormBlock";
import { FormContextProvider } from "../../FormContext";
import FormContext from "../../FormContext";
import ResultsBlock from "../Components/ResultsBlock";
import { useEffect } from "react";

function Home() {
  const { data, processed } = useContext(AppContext);

  return (
    <div>
      <UploadBlock />
      <Row>
        <Col span={18} offset={3}>{data.length && <PreviewUpload data={data} />}</Col>
      </Row>
      <FormContextProvider>
        <FormBlock />
        {processed && <ResultsBlock />}
      </FormContextProvider>
    </div>
  );
}

export default Home;
