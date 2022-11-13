import React, { useContext } from "react";
import MainLayout from "../Components/Layout";
import PreviewUpload from "../Components/PreviewUpload";
import UploadBlock from "../Components/UploadBlock";
import AppContext from "../../AppContext";

function Home() {
  const { data } = useContext(AppContext);

  return (
    <div>
      <UploadBlock />
      {data.length && <PreviewUpload data={data} />}
    </div>
  );
}

export default Home;
