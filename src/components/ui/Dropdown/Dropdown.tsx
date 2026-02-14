import { useEffect, useRef, useState } from 'react';
import css from './Dropdown.module.css';
import SvgIcon from '../icons/SvgIcon';
import type { FilterSort } from '../../../types/psychologistsTypes';

const options: FilterSort[] = ['A-Z', 'Z-A', '<170$', '>170$', 'Popular', 'NotPopular', 'All'];

interface DropdownProps {
  value: FilterSort;
  onFilter: (value: FilterSort) => void;
}

const Dropdown = ({ value, onFilter }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: FilterSort) => {
    onFilter(value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <span className={css.label}>Filters</span>
      <button className={css.dropdownButton} type="button" onClick={handleToggle}>
        {value}
        <SvgIcon
          name="dropdownArrow"
          height={20}
          width={20}
          className={`${css.dropdownIcon} ${isOpen ? css.dropdownIconOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div className={css.dropdownListWrapper}>
          <ul className={css.dropdownList}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  handleSelect(option);
                }}
                className={`${css.dropdownItem} ${value === option ? css.selected : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
