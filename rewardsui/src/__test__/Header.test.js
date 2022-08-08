import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../components/Header';

import { render, screen } from '@testing-library/react';


it("renders witout crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header></Header>, div);

})
