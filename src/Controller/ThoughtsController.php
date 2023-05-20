<?php

namespace App\Controller;

use DateTime;
use App\Entity\Think;
use App\Repository\ThinkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use App\WebSocket\Chat;
use App\WebSocket\Thoughts;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ThoughtsController extends AbstractController
{
    #[Route('/api/thoughts/new', name: 'app_thougths')]
    public function newThink(Request $request,EntityManagerInterface $em): JsonResponse
    {
        $think = new Think();
        $data = trim($request->getContent());
        if($data != null && strlen($data) > 2 ){
            $think->setMessage($data);
            $think->setDate(new DateTime());
            $em->persist($think);
            $em->flush();
        }
        

        return $this->json([
            'status' => $data
        ]);
    }
    
    #[Route('api/thoughts/list')]
    public function thoughts(ThinkRepository $thinkRepository){
        $thoughts = $thinkRepository->findAll();



        return $this->json(['thoughts'=>$thoughts]);
        
    }

    #[Route('api/thoughts/delete/{id}',methods:'delete')]
    public function deleteThink(Think $think,EntityManagerInterface $em){

        $em->remove($think);
        $em->flush();

        return $this->json(['message'=>'Think deleted !']);
        
    }

    #[Route('/websocket')]
    public function webSocket(Thoughts $thoughtsSocket){

        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    $thoughtsSocket
                )
            ),
            9595 // Port sur lequel le serveur WebSocket écoutera
        );

        $server->run();

        return $this->json(['success' => true]);
        
    }
}
