<header>
	<div class="header-positioning">
		<h1 class="header-name"><?php 
			if (preg_match("/vis/", $_SERVER['PHP_SELF']) === 1)
				echo "Audio Visualisation";
			else
				echo "Dave Woods";
		 ?></h1>
		<h3>A Portfolio</h3>
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