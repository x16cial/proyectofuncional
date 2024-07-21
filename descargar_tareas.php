<?php
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename="lista_tareas.txt"');


// Obtener tareas desde los parámetros GET
$tareas = [];
if (isset($_GET['tarea']) && isset($_GET['color'])) {
  $nombresTareas = $_GET['tarea'];
  $coloresTareas = $_GET['color'];

  for ($i = 0; $i < count($nombresTareas); $i++) {
    $tareas[] = ["tarea" => $nombresTareas[$i], "color" => $coloresTareas[$i]];
  }
}

// Imprimir las tareas
foreach ($tareas as $tarea) {
  echo $tarea['tarea'] . " - " . $tarea['color'] . "\n";
}
?>
