<?php

/* 
 * to='+destino+'&subject=GrepolisBot&message=
 */

$to         = $_GET["to"];
$subject    = $_GET["subject"];
$message    = $_GET["message"];

mail( $to, $subject, $message );