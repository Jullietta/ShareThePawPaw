<?php
class DB {

	const QT_SELECT = 1;
	const QT_INSERT = 2;
	private static $pdo;
	private static $errconn;
	private function __construct() {} 
	private function __clone() {} 
	
	public static function insertData($sql, $bindParams) {
		$res = self::prepExec($sql, $bindParams, QT_INSERT);
		if (!empty($res)) {
			return $res->lastInsertId();
		}
		return NULL;
	}

	public static function selRow($sql, $bindParams) 
	{
		if ($res = self::prepExec($sql, $bindParams)) {
		// query should return 0 or 1 rows
			if ($res->rowCount() < 2) {
				return $res->fetch(PDO::FETCH_ASSOC);
			} else {
//				throw new SbException($res->rowCount() . ' rows returned for a single-row query.');
			}
		}
		return false;
	}

	public static function selRows($sql, $bindParams) {
		$res = self::prepExec($sql, $bindParams);
		if (!empty($res)) {
			return $res->fetchAll(PDO::FETCH_ASSOC);
		}
		return NULL;
	}

// ** PRIVATE FUNCTIONS **
	private static function getInst()
	{
		if (is_null(self::$pdo)) {

			try {
				self::$pdo = new PDO('mysql:dbname=db44059_pawpaw;host=internal-db.s44059.gridserver.com', 'db44059_pawpaw', 'PawPaw55');
				self::$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, TRUE);
				self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			} catch (PDOException $e) {
				EHandler::except($e, 'PDO');
			}
		}		
		return self::$pdo;
	}
	
	private static function prepExec($sql, $bindParams, $type=QT_SELECT) {
		if (!empty($sql)) {
			try {
				$conn = self::getInst();
				$stmt = $conn->prepare($sql);
				if (!empty($bindParams)) {
					foreach($bindParams as $key => $vals) {
						$stmt->bindValue(':' . $vals[0], (int) $vals[1], PDO::PARAM_INT);
					}
				}
			// if inserting return the connection, so can get insert id, otherwise return statement to get rowcount
				if ($stmt->execute()) {
					return ($type == QT_INSERT ? $conn : $stmt);
				} else {
					return NULL;
				}				

			} catch (PDOException $e) {
				echo '<br />SQL=' . $sql;
				echo '<br />';
				print_r($bindParams);
				echo '<br />';
				print_r($e);
			}
		}
	}
}
?>