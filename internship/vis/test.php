<?php

header("Content-Type: application/json", true);
$myFile = "general.json";

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	if (!empty($_POST))
	{
		echo "Received data: ".json_encode($_POST);
		$genj = json_decode(file_get_contents($myFile), true);

		if ($genj == '')
		{
			$genj = array( $_POST['id'] => $_POST );
		}
		else
		{
			$genj[$_POST['id']] = $_POST;
		}

		file_put_contents($myFile, json_encode($genj));
	}
	else
	{
		echo "Nothing in POST\n";
	}
}
else
{
	echo "No data received\n";
}

?>