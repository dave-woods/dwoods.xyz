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
	<?php require_once $_SERVER['DOCUMENT_ROOT']."/assets/php/header.php"; ?>
	<div class="intern-report-wrap">
		<?php if (isset($_GET['m']) && isset($_GET['d']) && !empty($_GET['m']) && !empty($_GET['d'])) : ?>

		<?php 

		$m = $_GET['m'];
		$d = $_GET['d'];

		if (file_exists("2016/".$m."/".$d.".php"))
			include_once("2016/".$m."/".$d.".php");

		?>

		<div class="report-navigator">
			<a <?php 

			if ($m == "may" && $d == "30")
			{
				echo "disabled href='#'";
			}
			elseif ($d == "1")
			{
				echo "href='?".($m == "june" ? "m=may&d=31" : ($m == "july" ? "m=june&d=30" : "#"))."'";
			}
			else
			{
				echo "href='?m=".$m."&d=".((int)$d - 1)."'";
			}

			?>>Previous report</a><a <?php 

			if (($m == "july" && $d == "22"))// || !file_exists("2016/".$m."/".((int)$d + 1).".php"))
			{
				echo "disabled href='#'";
			}
			elseif (($m == "may" && $d == "31") || ($m == "june" && $d == "30"))
			{
				echo "href='?".($m == "june" ? "m=july&d=1" : ($m == "may" ? "m=june&d=1" : "#"))."'";
			}
			else
			{
				echo "href='?m=".$m."&d=".((int)$d + 1)."'";
			}

			?>>Next report</a>
		</div>

		<?php else : ?>

			<div class="strip">
				<ul class="report-list">
					<?php
						foreach (dirToArray("2016") as $subdir => $contents)
						{
							echo "<li>$subdir<ul>";

							natsort($contents);

							foreach ($contents as $index => $report)
							{
								if (endsWith($report, ".php"))
								{
									$rname = preg_replace('/\\.[^.\\s]{3,4}$/', '', $report);
									echo "<li><a href='?m=$subdir&d=$rname'>".$rname."</a></li>";
								}
							}
							echo "</ul></li>";
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

		<?php endif; ?>

	</div>
</body>
</html>
