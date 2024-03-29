import { createContext, useState, useEffect } from "react";

const AppContext = createContext({
  uploading: false,
  fileUploaded: false,
  dataReady: false,
  data: [],
  file : null,
});

export const ContextProvider = ({ children }) => {
  const [dataReady, setDataready] = useState(false);
  const [data, setData] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState("Test");
  const [ramanSpectrum, setRamanSpectrum] = useState(null);
  const [processed, setProcessed] = useState(false)

  const context = {
    dataReady,
    setDataready,
    data,
    setData,
    fileUploaded,
    setFileUploaded,
    file,
    setFile,
    ramanSpectrum,
    setRamanSpectrum,
    processed,
    setProcessed
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
