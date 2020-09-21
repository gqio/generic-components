export const render = ({ current, collections }) => {
  const componentsPages = [];
  for (const collectionName in collections)
    for (const page of collections[collectionName])
      if (page.collection !== "demo" && page.url.indexOf("demo") >= 0)
        componentsPages.push(page);
  return `
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
	<meta name="Description" content="Put your description here.">
	<link rel="stylesheet" type="text/css" href="/demo/styles.css">
	<script type="module" src="/generic-disclosure/index.js"></script>
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css">
	<script src="https://unpkg.com/prismjs@1.20.0/prism.js"></script>
	<title>${current.title || current.collection}</title>
</head>
<body>
	<div class="app">
		<div class="nav">
			<h1 class="title"><a href="/index.html">generic</a></h1>
			<nav>
				<ul>
					<li>
						<a href="/demo/demo-app.html">ShowCase</a>
					</li>
				${componentsPages
          .map((p) => `<li><a href="/${p.url}">${p.collection}</a></li>`)
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
