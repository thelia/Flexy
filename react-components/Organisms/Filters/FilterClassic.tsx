import React from 'react';
import { map } from 'lodash';
import FilterPill from '@react/Molecules/Filters/FilterPill';
import type { FilterClassicProps } from '@react/Organisms/Filters/FilterClassic.types';

export default function FilterClassic({
                                        label,
                                        options,
                                        name,
                                        onChange = () => {
                                        },
                                        defaultValue
                                      }: FilterClassicProps) {
  return (
    <>
      {label && (<div className='paragraph-4 font-semibold mb-[9px]'>{label}</div>)}
      <div className='hidden md:flex gap-2 flex-wrap'>
        {map(options, (option) => (
          <FilterPill
            key={option.id}
            onChange={({ checked, value }) => {
              onChange({ checked, value, name });
            }}
            defaultChecked={defaultValue === option.id}
            customText={option.title}
            name={name}
            value={option.id}
            inputType='radio'
          />))}
      </div>
      <div className='md:hidden'>
      </div>
    </>
  );
}
