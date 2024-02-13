<?php

namespace App\Form;

use App\Entity\Sports;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;


class SportsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
          
            ->add('category', ChoiceType::class, [
                'required'=>false,
            'choices' => [
                 'Sports de équipe' => 'Sports de équipe',
             'Sports individuels' => 'Sports individuels',
             'Sports de raquette' => 'Sports de raquette',
             'Sports de combat' => 'Sports de combat',
             'Sports nautiques' => 'Sports nautiques',
             'Sports  de hiver' => 'Sports  de hiver',
             'Sports de plein air' => 'Sports de plein air',
               //Add more roles as needed
                  ],
                  'expanded' => false,
                  'multiple' => false,
              
              ])
            ->add('description')
            ->add('image')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Sports::class,
        ]);
    }
}
