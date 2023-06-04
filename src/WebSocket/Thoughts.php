<?php 
namespace App\WebSocket;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Thoughts implements MessageComponentInterface
{
    protected $clients;
    private $timer;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        date_default_timezone_set('Europe/Paris'); // Définir le fuseau horaire
        // $this->loop();
    }


    public function onOpen(ConnectionInterface $conn)
    {
        // La connexion est établie
        // Faites ce que vous devez faire lorsque la connexion WebSocket est ouverte
        $this->clients->attach($conn);

        $conn->send('connécté');


        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // Un message est reçu
        // Traitez le message reçu et renvoyez la réponse appropriée
        switch ($msg) {
            case 'newMsg' || 'deleted':
                $this->sendMessageToAllClients('fetchMsg');
        }



        
        
    }

    public function onClose(ConnectionInterface $conn)
    {
        // La connexion est fermée
        // Effectuez les actions nécessaires lorsqu'une connexion WebSocket est fermée
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        // Une erreur s'est produite
        // Gérez les erreurs qui se produisent lors des communications WebSocket
    }




    private function sendMessageToAllClients($message)
    {
        foreach ($this->clients as $client) {
            $client->send($message);
        }
    }


        public function loop(){
        sleep(60);
            $time = date('H:i:s') . "\n";
            echo $time;
            $this->sendMessageToAllClients($time);
            $this->loop();
        
    }
}
