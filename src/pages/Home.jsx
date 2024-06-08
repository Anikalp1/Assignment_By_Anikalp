import React from 'react';
import ChipAutoComplete from '../pages/ChipAutocomplete';

const Home = () => {
  const options = [
    { value: 'react', label: 'React' },
    { value: 'html5', label: 'HTML5' },
    { value: 'css3', label: 'CSS3' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'node', label: 'Node JS' },
    { value: 'express', label: 'Express JS' },
    { value: 'bootstrap', label: 'Bootstrap' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'material', label: 'Material UI' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'next', label: 'Next JS' },
    { value: 'angular', label: 'Angular' },
  ];

  const handleSkillChange = (selectedOptions) => {
    console.log('Selected skills:', selectedOptions);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 p-5">
      <h1 className="font-sans text-4xl text-blue-600 font-bold mb-8">Select Your Skill</h1>
      <div className="w-full max-w-xl">
        <ChipAutoComplete
          options={options}
          placeholder="Search your skills here"
          onChange={handleSkillChange}
        />
      </div>
    </div>
  );
};

export default Home;
