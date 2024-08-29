import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Attribute, CurrentCombination, PSE } from './PseSelector.types';
import FilterClassic from '@react/Organisms/Filters/FilterClassic';
import { find, map, isEqual } from 'lodash';


function PseSelector({
                       pses = [],
                       attributes = []
                     }: {
  pses: PSE[];
  attributes: Attribute[];
}) {
  const defaultPseCombination = useMemo(() => {
    const defaultPse = pses.find((pse) => pse.isDefault);
    return defaultPse?.combination ?? {};
  }, [pses]);
  const [currentCombination, setCurrentCombination] = useState<CurrentCombination>(defaultPseCombination);
  const [currentPSE, setcurrentPSE] = useState<PSE>();

  useEffect(() => {
    const matchingPSE = find(pses, pse => {
      return isEqual(pse.combination, currentCombination);
    });
    setcurrentPSE(matchingPSE);
  }, [currentCombination]);
  return (
    <>
      <div className='mt-[30px] flex flex-col gap-4'>
        {map(attributes, attribute => (
          <FilterClassic
            key={attribute.id}
            onChange={({ value }) => {
              setCurrentCombination((old) => ({ ...old, [attribute.id]: value }));
            }}
            defaultValue={currentCombination[attribute.id]}
            label={attribute.title}
            options={attribute.values}
            name={`attribute-${attribute.id}`}
          />))}
      </div>
      <div className='mt-[30px] h4'>
        {currentPSE?.price} €
      </div>

    </>
  );
}

export default function PseSelectorRoot() {
  const DOMElement = document.getElementById('PseSelector-root');

  if (!DOMElement) return;

  const root = createRoot(DOMElement);

  root.render(
    <PseSelector pses={window.PSES} attributes={window.ATTRIBUTES} />
  );
}
