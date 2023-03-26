import fetch from "node-fetch";
import { writeFileSync } from "fs";

const fetchData = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/route/routes", {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  });

  return (await response.json()) as Record<
    string,
    { url: string; method: string }
  >;
};

const getSafeParamName = (param: string) => {
  return param.replaceAll(/\?/g, "");
};

const getParamType = (param: string) => {
  const optionalType = param.includes("?") ? "|null" : "";

  param = getSafeParamName(param);

  return `${param}: string|number${optionalType}`;
};

const fixParamInUrl = (url: string, param: string) => {
  return url.replace(`{${param}}`, `\${${getSafeParamName(param)}}`);
};

const updateRoutesFile = async () => {
  const data = await fetchData();

  const routes = Object.keys(data)
    .map((key) => {
      const method = data[key].method;
      const paramData = /\{([^}]+)\}/g.exec(data[key].url);
      const params = paramData ? getParamType(paramData[1]) : "";
      const urlTemplate = paramData
        ? fixParamInUrl(data[key].url, paramData[1])
        : data[key].url;
      return `"${key}": {url: (${params}) => \`/${urlTemplate}\`, method: "${method}"}`;
    })
    .join(",\n");

  writeFileSync("./api/routes.ts", `export const routes = {${routes}}`);
};

updateRoutesFile();
