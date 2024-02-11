import { createContext, useState, useEffect } from "react";

const FormContext = createContext({
  denoising: false,
  baseline: false,
  noramlizing: false,
});

export const FormContextProvider = ({ children }) => {
  const [denoising, setDenoising] = useState(false);
  const [baseline, setBaselineCorrection] = useState(false);
  const [noramlizing, setNormalizing] = useState(false);
  const [findPeaks, setFindPeaks] = useState(false);

  const context = {
    denoising,
    setDenoising,
    baseline,
    setBaselineCorrection,
    noramlizing,
    setNormalizing, 
    findPeaks, 
    setFindPeaks
  };

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

export default FormContext;
