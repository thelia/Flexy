import React from 'react';
import type { FilterPillProps } from '@react/Molecules/Filters/FilterPill.types';

export default function FilterPill({
  classes = '',
  value,
  name,
  disabled = false,
  iconColor,
  customText,
  inputType = 'checkbox',
  onChange = () => {},
  defaultChecked = false
}: FilterPillProps) {
  return (
    <label className={`FilterPill${classes}`}>
      <input
        type={inputType}
        className="hidden"
        value={value}
        defaultChecked={defaultChecked}
        name={name}
        disabled={disabled}
        onChange={(e) => {
          const checked = e.target.checked;
          onChange({ checked, value });
        }}
      />
      {iconColor && (
        <span
          className="FilterPill-icon"
          style={iconColor ? { color: iconColor } : {}}
        >
          iconColor
        </span>
      )}
      {customText}

      {/*{closeButton && (<span className='FilterPill-iconClose'>{ux_icon("close")}</span> )}*/}
    </label>
  );
}
