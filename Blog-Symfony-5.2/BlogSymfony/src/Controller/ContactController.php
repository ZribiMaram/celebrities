<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\ContactType;
use App\Entity\ContactVisitor;

class ContactController extends AbstractController
{
  /**
   * @Route("/contact", priority=10, name="blog_contact",requirements={"id":"\d+"})
   */
  public function contact(Request $request){
    $manager = $this->getDoctrine()->getManager();
    $contact=new ContactVisitor();
    $form=$this->createForm(ContactType::class,$contact);
    $form->handleRequest($request);
    if($form->isSubmitted() && $form->isValid()){
      $manager->persist($contact);
      $manager->flush();
      return $this->redirectToRoute('blog');
    }
    return $this->render('blog/contact.html.twig' ,[
      'contactForm'=>$form->createView()
    ]);
  }

}
