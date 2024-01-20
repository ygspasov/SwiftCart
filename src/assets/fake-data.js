import bookImage1 from './books/Dune.jpg';
import bookImage2 from './books/Dune_The_Battle_of_Corrin.jpg';
import bookImage3 from './books/Dune_The_Machine_Crusade.jpg';
import bookImage4 from './books/Mentats_of_Dune.jpg';

export const products = [
  {
    id: '123',
    name: 'Dune',
    price: '6.00',
    description: 'Dune is a 1965 epic science fiction novel book by American author Frank Herbert',
    imageUrl: bookImage1,
    averageRating: '5.0',
  },
  {
    id: '234',
    name: 'Mentats of Dune',
    price: '12.00',
    description:
      'Mentats of Dune is a 2014 science fiction novel by Brian Herbert and Kevin J. Anderson, set in the Dune universe created by Frank Herbert.',
    imageUrl: bookImage2,
    averageRating: '5.0',
  },
  {
    id: '345',
    name: 'The Battle of Corrin',
    price: '9.00',
    description:
      'The Battle of Corrin is a 2004 science fiction novel by Brian Herbert and Kevin J. Anderson, set in the fictional Dune universe created by Frank Herbert',
    imageUrl: bookImage3,
    averageRating: '5.0',
  },
  {
    id: '456',
    name: 'Dune: The Machine Crusade',
    price: '19.00',
    description:
      'Dune: The Machine Crusade is a 2003 science fiction novel by Brian Herbert and Kevin J. Anderson, set in the fictional Dune universe created by Frank Herbert.',
    imageUrl: bookImage4,
    averageRating: '5.0',
  },
];

export const cartItems = [products[0], products[2], products[3]];
