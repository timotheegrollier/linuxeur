<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\WebSocket\Thoughts;


require dirname(__DIR__) . '/vendor/autoload.php';


    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Thoughts()
            )
        ),
        9595 // Port sur lequel le serveur WebSocket écoutera
    );

    $server->run();

    return $this->json(['success' => true]);
    
?>