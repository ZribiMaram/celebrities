<?php

// src/Form/RegistrationType.php
namespace App\Form;

use App\Entity\User;
use App\Repository\SportRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ResetType;
class RegistrationType extends AbstractType
{
   

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
       

        $builder
            ->add('email')
            ->add('username')
            ->add('name')
            ->add('departement')
            ->add('password', PasswordType::class)
            ->add('sport', ChoiceType::class, [
                'label' => 'Sports:',
                'required' => false,
                'choices' => [
                    'Football' => 'Football',
                    'Cricket' => 'Cricket',
                    'Hockey' => 'Hockey',
                    'Tennis' => 'Tennis',
                    'Golf' => 'Golf',
                    // Add more roles as needed
                ],
                'expanded' => false,
                'multiple' => false,
              
            ])
            ->add('niveau', ChoiceType::class, [
             
                'required' => false,
                'choices' => [
                    'Débutant' => 'Débutant',
                    'confirmé' => 'confirmé',
                    'pro' => 'pro',
                    'Supporter' => 'Supporter',
                    
                    
                ],
                'expanded' => false,
                'multiple' => false,
              
            ]);
           
          
            }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
