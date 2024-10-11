<?php

namespace FlexyBundle\Twig\Components;

use Propel\Runtime\ActiveQuery\Criteria;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use TwigEngine\Service\DataAccess\DataAccessService;
use Symfony\UX\TwigComponent\Attribute\ExposeInTemplate;
use Thelia\Type\BooleanOrBothType;
use TheliaBlocks\Model\BlockGroupQuery;
use TheliaBlocks\Service\JsonBlockService;
use Thelia\Core\HttpFoundation\Session\Session;

#[AsTwigComponent(template: '@components/Organisms/Blocks/Blocks.html.twig')]
class Blocks
{
  #[ExposeInTemplate]
  public ?string $id = null;

  #[ExposeInTemplate]
  public ?string $slug = null;

  #[ExposeInTemplate]
  public ?string $item_type = null;

  #[ExposeInTemplate]
  public ?string $item_id = null;

  #[ExposeInTemplate]
  public ?int $visible = 1;

  #[ExposeInTemplate]
  public ?array $blocks = null;

  public function __construct(
    private readonly DataAccessService $dataAccessService,
    private JsonBlockService $jsonBlockService,
    private RequestStack $requestStack
  ) {}


  public function getBlocks()
  {

    $request = $this->requestStack->getCurrentRequest();

    /** @var Session $session */
    $session =  $request->getSession();

    $locale = $session->getLang()->getLocale();

    $search = BlockGroupQuery::create();

    if (null !== $this->id) {
      $search->filterById($this->id, Criteria::IN);
    }

    if (null !== $this->slug) {
      $search->filterBySlug($this->slug, Criteria::IN);


      if (null !== $this->item_id && null !== $this->item_type) {
        $search->useItemBlockGroupQuery()
          ->filterByItemType($this->item_type)
          ->filterByItemId($this->item_id)
          ->endUse();
      }

      if ($this->visible !== BooleanOrBothType::ANY) {
        $search->filterByVisible($this->visible ? 1 : 0);
      }
    }
    $blocks = $search->find();

    foreach ($blocks as $block) {
      $this->blocks[] = $this->jsonBlockService->renderJsonBlocks($block->setLocale($locale)->getJsonContent());
    }

    return $this->blocks;
  }
}
