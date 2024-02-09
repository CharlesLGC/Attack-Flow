// PDFContext.js
import { createContext } from 'react';

const PDFContext = createContext({
  menuState: null, // Initial state
  setMenuState: () => {}, // Setter function
});

export default PDFContext;
