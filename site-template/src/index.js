import path from "path";
import styles from "./styles.css";

export const render = ({ current, pages }) => {
  const componentsPages = [];
  let demoPage = "";
  for (const page of pages) {
    if (page.collection !== "demo" && /^generic/.test(page.url))
      componentsPages.push({...page, collection:page.url.substring(0,page.url.indexOf('/'))});
    else if (page.url.endsWith("demo-app.html")) demoPage = page;
  }
  const relative = (url) =>
    path.relative("/" + path.dirname(current.url), "/" + url);
  return `
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
	<meta name="Description" content="Put your description here.">
	<style>${styles.toString()}</style>
	<script type="module" src="${relative('disclosure.js')}"></script>
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
						<a href="${relative(demoPage.url)}">Demo</a>
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
