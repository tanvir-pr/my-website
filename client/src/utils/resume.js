import { site } from "../data/site";

export const CV_URL = site.cvUrl;
export const CV_FILENAME = site.cvFilename;
export const RESUME_URL = CV_URL;
export const RESUME_FILENAME = CV_FILENAME;

export const downloadCv = () => {
  const link = document.createElement("a");
  link.href = CV_URL;
  link.download = CV_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/** @deprecated use downloadCv */
export const downloadResume = downloadCv;
