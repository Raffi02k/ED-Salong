import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { App } from "./App";
export { renderHead, routePaths, getMetadata } from "./content/seo";
export { site } from "./content/siteContent";
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
