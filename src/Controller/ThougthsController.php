<?php

namespace App\Controller;

use DateTime;
use App\Entity\Think;
use App\Repository\ThinkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ThougthsController extends AbstractController
{
    #[Route('/api/thoughts/new', name: 'app_thougths')]
    public function newThink(Request $request,EntityManagerInterface $em): JsonResponse
    {
        $think = new Think();
        $data = trim($request->getContent());
        if($data != null && strlen($data) > 4 ){
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
}
