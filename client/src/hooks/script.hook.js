import { useEffect } from "react";

export const useScript = ({
  url,
  isAsync = false,
  data = [],
  parentSelector = "body",
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    const parent = document.querySelector(parentSelector);
    script.src = url;
    script.async = isAsync;
    data.forEach(({ attr, value }) => (script.dataset[`${attr}`] = value));
    parent.appendChild(script);
    return () => {
      parent.removeChild(script);
    };
  });
};
