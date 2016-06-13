<?php

if (!empty($_GET['basenames']) && $_GET['basenames'] == 1)
{
	$filenames = array_diff(scandir($_SERVER['DOCUMENT_ROOT']."/assets/audio/blizzdir", 1), array('..', '.'));
	$basenames = array();
	foreach ($filenames as $fn)
	{
		if (endsWith($fn, ".wav"))
			$basenames[] = preg_replace('/\\.[^.\\s]{3,4}$/', '', $fn);
	}
	echo json_encode($basenames);
}


function dirToArray($dir)
{    
	$result = array(); 

	$cdir = scandir($dir); 
	foreach ($cdir as $key => $value) 
	{ 
		if (!in_array($value,array(".",".."))) 
		{ 
			if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
			{ 
				$result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value); 
			} 
			else 
			{ 
				$result[] = $value; 
			} 
		} 
	} 
	return $result;
}

function startsWith($haystack, $needle)
{
    return strncmp($haystack, $needle, strlen($needle)) === 0;
}

function endsWith($haystack, $needle)
{
    return $needle === '' || substr_compare($haystack, $needle, -strlen($needle)) === 0;
}

?>