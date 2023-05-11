<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(): Response
    {
       return $this->render('/index.html.twig');
    }


    #[Route('/{reactRouting}', name: 'app_react_routes')]
    public function others(): Response
    {

        return $this->render('./index.html.twig');
    }
}
