import React, { useContext, useState } from "react";
import { message, Upload } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import AppContext from "../../AppContext";
import FileInfo from "./FileInfo";
import * as d3 from "d3";
import Papa from "papaparse";

const { Dragger } = Upload;

function UploadBlock() {
  const [uploading, setUploading] = useState(false);

  const [success, setSuccess] = useState(false);

  const {
    dataReady,
    setDataready,
    data,
    setData,
    file,
    setFile,
    fileUploaded,
    setFileUploaded,
  } = useContext(AppContext);

  const props = {
    name: "file",
    multiple: false,
    disable: !uploading,
    accept: ".csv",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload(file) {
      setUploading(true);
      return Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: function (results) {
          const col_1 = [];
          const col_2 = [];
          for (let item of results.data) {
            col_1.push(item[0]);
            col_2.push(item[1]);
          }
          setData([col_1, col_2]);
          setFileUploaded(true)
          setDataready(true)
        },
      });
    },
    onChange(info) {
      const { status } = info.file;
      setFile(info.file.name);
      console.log(status);

      if (status == "uploading") {
        setUploading(true);
      }
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setFileUploaded(true);
        setSuccess(true);
      } else if (status === "error") {
        setFileUploaded(true);
        setSuccess(false);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onDelete = () => {
    setFileUploaded(false);
    setData(false);
    setUploading(false);
  };

  console.log({ uploading, fileUploaded, success, data, file });

  return (
    <>
      {!uploading && !fileUploaded ? (
        <Dragger {...props}>
          <>
            <p className="ant-upload-drag-icon">
              <FileExcelOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Upload a CSV file without cloumn headers.
            </p>
            <p className="ant-upload-hint">
              With Two columns having wave shift and intensity respectively.
            </p>
          </>
        </Dragger>
      ) : (
        <FileInfo
          onDelete={onDelete}
          title={file}
          success={dataReady}
          fileUploaded={fileUploaded}
          uploading={uploading}
        />
      )}
    </>
  );
}

export default UploadBlock;
