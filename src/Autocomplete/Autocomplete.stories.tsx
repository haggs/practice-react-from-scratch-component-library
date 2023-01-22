import React, { useState } from 'react';
import Autocomplete from './Autocomplete';

export default {
  title: 'Autocomplete',
};

const MOVIES = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Godfather: Part II',
  'Il buono, il brutto, il cattivo.',
  'Pulp Fiction',
  'Inception',
  "Schindler's List",
  '12 Angry Men',
  "One Flew Over the Cuckoo's Nest",
  'The Dark Knight',
  'Star Wars: Episode V - The Empire Strikes Back',
  'The Lord of the Rings: The Return of the King',
  'Shichinin no samurai',
  'Star Wars',
  'Goodfellas',
  'Casablanca',
  'Fight Club',
  'Cidade de Deus',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Rear Window',
  "C'era una volta il West",
  'Raiders of the Lost Ark',
  'Toy Story 3',
  'Psycho',
  'The Usual Suspects',
  'The Matrix',
  'The Silence of the Lambs',
  'Se7en',
  'Memento',
  "It's a Wonderful Life",
  'The Lord of the Rings: The Two Towers',
  'Sunset Blvd.',
  'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  'Forrest Gump',
  'Léon',
  'Citizen Kane',
  'Apocalypse Now',
  'North by Northwest',
  'American Beauty',
  'American History X',
  'Taxi Driver',
  'Terminator 2: Judgment Day',
  'Saving Private Ryan',
  'Vertigo',
  "Le fabuleux destin d'Amélie Poulain",
  'Alien',
  'WALL·E',
  'Lawrence of Arabia',
  'The Shining',
  'Sen to Chihiro no kamikakushi',
  'Paths of Glory',
  'A Clockwork Orange',
  'Double Indemnity',
  'To Kill a Mockingbird',
  'The Pianist',
  'Das Leben der Anderen',
  'The Departed',
  'M',
  'City Lights',
  'Aliens',
  'Eternal Sunshine of the Spotless Mind',
  'Requiem for a Dream',
  'Das Boot',
];

export const Normal = () => {
  const [text, setText] = useState('');
  return (
    <Autocomplete
      value={text}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value)
      }
      placeholder="Movies"
      options={MOVIES}
    />
  );
};

export const GetOptions = () => {
  const [text, setText] = useState('');

  const getOptions = (inputText: string) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    }).then(() => {
      return MOVIES.filter((movie) =>
        movie.toLowerCase().includes(inputText.toLowerCase())
      );
    });
  };

  return (
    <Autocomplete
      value={text}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value)
      }
      getOptions={getOptions}
      placeholder="Movies"
    />
  );
};
