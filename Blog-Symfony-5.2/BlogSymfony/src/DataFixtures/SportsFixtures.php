<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Sports;

use App\Entity\Commentaires;
class SportsFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker=\Faker\Factory::create('fr_FR');
        for($i=1;$i<=3;$i++){
     
         
          for($j=1;$j<=mt_rand(4,6);$j++){
            $sports=new Sports();
            $description='<p>' . join($faker->paragraphs(5),) .'</p>';

            $sports->setTitle($faker->sentence())
                    ->setDescription($description)
                    ->setImage($faker->imageUrl());
                    
                    $manager->persist($sports);


                    for($l=1;$l<=mt_rand(4,6);$l++){
                      $comment= new Commentaires();

                      $description='<p>' . join($faker->paragraphs(2),) .'</p>';
                    
                      $comment->setAuthor($faker->name)
                          
                              ->setSports($sports);
                              $manager->persist($comment);
                            }
                          }
                        }
                        $manager->flush();
                      }
                    }
