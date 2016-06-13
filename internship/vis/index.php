<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width" />
	<title>Dave Woods</title>
	<link rel="stylesheet" href="/assets/css/main.css"/>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="/assets/js/xsa-to-ipa.js" type="text/javascript" charset="utf-8" async defer></script>
	<script src="/assets/js/main.js" type="text/javascript" charset="utf-8" async defer></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/wavesurfer.js/1.0.52/wavesurfer.min.js"></script>
</head>
<body>
	<?php require_once $_SERVER['DOCUMENT_ROOT']."/assets/php/header.php"; ?>
	<div class="intern-vis-wrap">
		<div class="strip">
			<div id="wavelabel-wrap">
				<div id="waveform"></div>
				<div id="labels"></div>
			</div>
			<div id="audio-info"><span title="Click for file list" id="audio-title">Title</span><div id="filesearch"><input id="filesearch-tb" placeholder="Search for a filename" type="text"/><div id="filesearch-sb"></div></div><span><span id="audio-position">0.000</span> / <span id="audio-duration">0.000</span></span></div>
			<div id="play-btn">Click to play/pause</div>
			<div id="kb-ctrls">
				<ul id="kb-ctrls-tooltip">
					<li><strong>Space</strong> = Play / Pause</li>
					<li><strong>Left</strong> / <strong>Right</strong> = Skip forward / back by 0.1s</li>
					<li><strong>Shift</strong><strong> +</strong> <strong>Left</strong> / <strong>Right</strong> = Skip forward / back by 0.01s</li>
					<li><strong>Ctrl</strong><strong> +</strong> <strong>Left</strong> / <strong>Right</strong> = Skip to the beginning / end</li>
					<li><strong>[</strong> / <strong>] </strong>= Zoom in / out horizontally</li>
					<li><strong>,</strong> / <strong>. </strong>= Previous / next clip</li>
					<li><strong>G</strong> / <strong>B</strong> = Rate as good / bad</li>
					<li><strong>Z</strong> = Toggle half-speed playback</li>
				</ul>
				Keyboard Controls
			</div>
		</div>
		<div class="strip">
			<div id="utterance-text">Utterance Text <small>[EDIT]</small>: <span id="text"></span></div>
			<p class="label-question">How was the label alignment?</p>
			<div id="feedback"><div class="feedback-btn" id="good">Good</div><div class="feedback-btn" id="bad">Bad</div><textarea placeholder="Please let us know what was wrong... Hit Ctrl+Enter to submit" id="bad-reason"></textarea></div>
		</div>
		<div class="strip" id="clip-nav"><div id="prev-clip">Previous Clip</div><div id="next-clip">Next Clip</div></div>
	</div>
</body>
</html>
