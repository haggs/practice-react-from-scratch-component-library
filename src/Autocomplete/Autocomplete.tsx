import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import * as S from './Autocomplete.styles';

export interface AutocompleteProps extends HTMLProps<HTMLInputElement> {
  options?: string[];
  getOptions?: (inputText: string) => Promise<string[]>;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  getOptions,
  onChange,
  ...inputProps
}) => {
  useEffect(() => {
    if (!options && !getOptions) {
      console.warn(
        'Autocomplete: neither options or getOptions were specified. This component will show no options.'
      );
    } else if (options && getOptions) {
      console.warn(
        'Autocomplete: both options and getOptions were specified, ignoring getOptions and using provided options'
      );
    }
  }, [options, getOptions]);

  const shouldFetchOptions = getOptions && !options;
  const [activeOption, setActiveOption] = useState<number>(0);
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const hasOptions = filteredOptions.length > 0;
  const fetchDelayTimeout = useRef(null);

  const handleReceivedFetchedOptions = (fetchedOptions: string[]) => {
    setFilteredOptions(fetchedOptions);
    setShowOptions(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    if (shouldFetchOptions) {
      clearInterval(fetchDelayTimeout.current);
      fetchDelayTimeout.current = setTimeout(() => {
        getOptions(text).then(handleReceivedFetchedOptions);
      }, 500);
      setShowOptions(false);
    } else {
      let newFilteredOptions: string[];
      if (text) {
        newFilteredOptions = options.filter((option) =>
          option.toLowerCase().includes(text.toLowerCase())
        );
      } else {
        newFilteredOptions = options;
      }

      setFilteredOptions(newFilteredOptions);
      setShowOptions(true);
    }

    onChange(event);
  };

  const handleSelectOption = (option: string) => {
    if (onChange) {
      const event = {
        target: { value: option },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
      setShowOptions(false);
      setActiveOption(0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSelectOption(filteredOptions[activeOption]);
    } else if (event.key === 'ArrowUp') {
      if (activeOption !== 0) {
        setActiveOption(activeOption - 1);
      }
    } else if (event.key === 'ArrowDown') {
      if (activeOption !== filteredOptions.length - 1) {
        setActiveOption(activeOption + 1);
      }
    } else if (event.key === 'Escape') {
      setActiveOption(0);
      setShowOptions(false);
    }
  };

  const renderOption = (option: string, i: number) => {
    return (
      <S.Option
        role="option"
        key={option + i}
        active={activeOption === i}
        onClick={() => handleSelectOption(option)}
        onMouseOver={() => setActiveOption(i)}
        onKeyDown={handleKeyDown}
        onFocus={() => setActiveOption(i)}
        tabIndex={0}
      >
        {option}
      </S.Option>
    );
  };

  const handleInputFocus = () => {
    if (!shouldFetchOptions) {
      setShowOptions(true);
    }
  };

  return (
    <S.Wrapper>
      <input
        type="text"
        data-testid="Autocomplete-Input"
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      {showOptions && (
        <S.Popup data-testid="Autocomplete-Popup">
          {hasOptions ? (
            filteredOptions.map(renderOption)
          ) : (
            <S.Option active={false} role="option">
              No options
            </S.Option>
          )}
        </S.Popup>
      )}
    </S.Wrapper>
  );
};

export default Autocomplete;
