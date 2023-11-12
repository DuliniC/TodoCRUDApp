import React, { useState } from 'react';
import { Priorities } from '../models/TodoPriorityEnum';

interface MyFormState {
  selectedOption: Priorities | 0;
}

const MyForm: React.FC = () => {
  const [formState, setFormState] = useState<MyFormState>({
    selectedOption: 0,
  });

  const handleOptionClick = (option: Priorities) => {
    setFormState({
      ...formState,
      selectedOption: option,
    });
  };

  return (
    <div>
      {Object.values(Priorities).map((option) => (
        <div
          key={option}
          onClick={() => handleOptionClick(option as Priorities)}
          style={{
            padding: '10px',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor:
              formState.selectedOption === option ? '#e0e0e0' : 'transparent',
          }}
        >
          {option}
        </div>
      ))}
      <p>Selected Option: {formState.selectedOption}</p>
    </div>
  );
};

export default MyForm;
