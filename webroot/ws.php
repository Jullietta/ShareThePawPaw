<?php

require_once '../classes/DB.php';

$retArr = array();

// FIND GOODIES
if (isset($_GET['find']) && !empty($_GET['find'])) {
	$find = $_GET['find'];
	$sql = 'SELECT g.id, g.latitude, g.longitude, g.notes, g.status, g.dt_added, gn.name, gn.group as icon';
	$sql .= ' FROM goodie g LEFT JOIN goodie_name gn ON g.name_id = gn.id';
		
// RETURN ALL GOODIES
	if ($find == 'all') {
		$bindParams = NULL;
		
	// if a type has been specified
		if (isset($_GET['type'])) {
			$sql .= ' WHERE gn.name="' . ucwords(trim($_GET['type'])) . '"';
		}
		
	// else no type has been specified
		$res = DB::selRows($sql, $bindParams);
		if (count($res) > 0) {
			foreach($res as $arr) {
				if (isset($arr['dt_added'])) {
					$arr['date_added'] = date('d M Y', $arr['dt_added']);
					unset($arr['dt_added']);
				}
				$retArr[] = $arr;
			}	
		}
		
// RETURN GOODIE DETAIL
	} else if ((int) $find > 0) {
		$sql .= ' WHERE g.id=:id';
		$bindParams = array(
			array('id', $find, PDO::PARAM_INT)
		);
		$retArr = DB::selRow($sql, $bindParams);
	}
	
	
// ADD GOODIES
} else if (isset($_POST) && count($_POST) > 0) {
	if (isset($_POST['name_id']) && isset($_POST['lat']) && isset($_POST['lon'])) {
		$name_id = (int) $_POST['name_id'];
		$lat = (double) $_POST['lat'];
		$lon = (double) $_POST['lon'];
		$notes = mb_convert_encoding($_POST['notes'] , "UTF-8");
		
		$dt_added = date('U');
		$sql = 'INSERT INTO goodie (name_id, latitude, longitude, notes, dt_added) VALUES (:name_id, :lat, :lon, :notes, :dt_added)'; 		
		$bindParams = array(
			array('name_id', $name_id, PDO::PARAM_INT),
			array('lat', $lat, PDO::PARAM_STR),
			array('lon', $lon, PDO::PARAM_STR),
			array('notes', $notes, PDO::PARAM_STR),
			array('dt_added', $dt_added, PDO::PARAM_STR),
		);
		
		$id = DB::insertData($sql, $bindParams);
		$retArr = array('status' => 'OK');
	}
}

echo json_encode($retArr);


?>