<?php require_once $_SERVER['DOCUMENT_ROOT']."/assets/php/functions.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dave Woods</title>
	<meta name="viewport" content="width=device-width" />
	<link rel="stylesheet" href="/assets/css/main.css"/>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="/assets/js/main.js" type="text/javascript" charset="utf-8" async defer></script>
</head>
<body>
	<header>
		<div class="header-positioning">
			<h1 class="header-name">Reports</h1>

			<nav class="site-nav">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="#about">About</a>
					</li>
					<li>
						<a href="#projects">Projects</a>
					</li>
					<li>
						<a href="#papers">Papers</a>
					</li>
					<li>
						<a href="#contact">Contact</a>
					</li>
					<li>
						<a href="/internship/reports">Internship Reports</a>
					</li>
					<li>
						<a href="/internship/vis">Internship AudioVis</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>
	<div class="intern-report-wrap">
		<div class="strip">
			<ul class="report-list">
				<?php
					$reports = array_diff(scandir(".", 1), array('..', '.'));
					foreach ($reports as $report)
					{
						if (endsWith($report, ".html"))
							echo "<li><a href='$report'>".preg_replace('/\\.[^.\\s]{3,4}$/', '', $report)."</a></li>";
					}
				?>
			</ul>
		</div>
		<div class="strip">
			<ul class="report-list">
				<li>
					<a target="_blank" href="https://github.com/dave-woods/dave-woods.github.io/blob/master/internship/maryinstall.md">Installing and Using MaryTTS</a>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
