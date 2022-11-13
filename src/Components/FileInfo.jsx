import React from "react";
import { Row, Alert, Button } from "antd";
import { PaperClipOutlined, DeleteOutlined } from "@ant-design/icons";

function FileInfo({ title, onDelete, success, fileUploaded, uploading }) {
  return (
    <>
      <Row>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div className="fileinfo">
            <div>
              <PaperClipOutlined />
              <span style={{ paddingLeft: "10px" }}>{title}</span>
            </div>
            <div>
              <Button danger type="link" onClick={onDelete}>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        </div>
      </Row>
      {fileUploaded && !success && (
        <Alert
          message="Error Uploading File"
          showIcon
          description="Error Description Error Description Error Description Error Description"
          type="error"
          onClick={onDelete}
          action={
            <Button size="small" danger>
              Try Again
            </Button>
          }
        />
      )}
    </>
  );
}

export default FileInfo;
