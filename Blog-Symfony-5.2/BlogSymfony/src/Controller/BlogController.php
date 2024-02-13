<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Sports;
use Symfony\Component\HttpFoundation\Request;

use App\Form\SportsType;
use App\Form\CommentType;
use App\Entity\Commentaires;


class BlogController extends AbstractController
{

    /**
     * @Route("/blog", name="blog")
     */
    public function index(): Response
    {
      $repo=$this->getDoctrine()->getRepository(Sports::class);
      $sports = $repo->findAll();
        return $this->render('blog/index.html.twig', [
            'controller_name' => 'BlogController',
            'sports' => $sports,
        ]);
    }
    /**
     * @Route("/blog/new", name="blog_create")
     */
     public function new( Request $request){
       $manager = $this->getDoctrine()->getManager();
       $sports=new Sports();
       $form=$this->createForm(SportsType::class, $sports);
      $form->handleRequest($request);
      if($form->isSubmitted() && $form->isValid()){
        
        $manager->persist($sports);
        $manager->flush();
        return $this->redirectToRoute('blog_show', ['id' => $sports->getId()]);
     }

     return $this->render('blog/create.html.twig', [
       'formSports' =>$form->createView(),
       'editMode' =>false
     ]);

   }
    /**
     * @Route("/blog/{id}/edit", name="blog_edit",requirements={"id":"\d+"})
     */
     public function edit(Sports $sports, Request $request){
       $manager = $this->getDoctrine()->getManager();
       $form=$this->createForm(SportsType::class, $sports);
      $form->handleRequest($request);
      if($form->isSubmitted() && $form->isValid()){
      
        $manager->persist($sports);
        $manager->flush();

        return $this->redirectToRoute('blog_show', ['id' => $sports->getId()]);

      }
      return $this->render('blog/create.html.twig', [
        'formSports' =>$form->createView(),
        'editMode' => true
      ]);
    }
    /**
     * @Route("/blog/{id}", name="blog_show")
     */
    public function show(Sports $sports= null,Request $request){
      $manager = $this->getDoctrine()->getManager();
      $comment=new Commentaires();
      $form=$this->createForm(CommentType::class,$comment);
      $form->handleRequest($request);
      if($form->isSubmitted() && $form->isValid()){
        $comment->setSports($sports);
        $manager->persist($comment);
        $manager->flush();
        return $this->redirectToRoute('blog_show', ['id'=>$sports->getId()]);
      }
      return $this->render('blog/show.html.twig' ,[
        'sports'=>$sports,
        'commentForm'=>$form->createView()
      ]);
    }
 
}