// const path = require("path");

import * as path from "path";

export const render = ({ current, collections }) => {
  const componentsPages = [];
  for (const collectionName in collections)
    for (const page of collections[collectionName])
      if (page.collection !== "demo" && page.url.indexOf("demo") >= 0)
        componentsPages.push(page);
  const relative = (url) =>
    path.relative("/" + path.dirname(current.url), "/" + url);
  return `
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
	<meta name="Description" content="Put your description here.">
	<link rel="stylesheet" type="text/css" href="${relative(
    "site/dist/styles.css"
  )}">
	<script type="module" src="${relative("generic-disclosure/index.js")}"></script>
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css">
	<script src="https://unpkg.com/prismjs@1.20.0/prism.js"></script>
	<title>${current.title || current.collection}</title>
</head>
<body>
	<div class="app">
		<div class="nav">
			<h1 class="title"><a href="${relative("index.html")}">generic</a></h1>
			<nav>
				<ul>
					<li>
						<a href="${relative("demo/index.html")}">Demo</a>
					</li>
				${componentsPages
          .map(
            (p) => `<li><a href="${relative(p.url)}">${p.collection}</a></li>`
          )
          .join("\n")}
					<li>
						<a href="https://github.com/thepassle/generic-components">Github</a>
					</li>
				</ul>
			</nav>
		</div>
		<main class="content">
${current.content}
		</main>
	</div>
</body>
</html>`;
};
