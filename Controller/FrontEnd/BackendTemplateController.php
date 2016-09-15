<?php

namespace WH\BackendTemplateBundle\Controller\FrontEnd;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * @Route("/backend-template")
 *
 * Class BackendTemplateController
 *
 * @package WH\BackendTemplateBundle\Controller
 */
class BackendTemplateController extends Controller
{

    /**
     * @Route("/index/", name="ft_wh_backendtemplate_index")
     * @Template("WHBackendTemplateBundle:BackendTemplate:index.html.twig")
     */
    public function indexAction()
    {

        return array();
    }

    /**
     * @Route("/base-elements/", name="ft_wh_backendtemplate_baseelements")
     * @Template("WHBackendTemplateBundle:BackendTemplate:base-elements.html.twig")
     */
    public function baseElementsAction()
    {

        return array(
            'wh-list-buttons',
            'wh-box',
            'wh-table',
            'wh-form',
            'wh-tabs',
        );
    }

}
