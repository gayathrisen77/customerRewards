import { cleanup,fireEvent,render,screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom/extend-expect";

import { Transactions } from '../components/Transactions';

afterEach(cleanup);

it("renders witout crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Transactions></Transactions>, div);

})

describe("testing Transactions component " , () => {
    render(<Transactions></Transactions>);
    const emptytbl = screen.getByTestId("Emptytbl");

     test("with no date range" , () => {
        expect(emptytbl).toHaveTextContent("select date range to fetch the transactions");

    });
})

   /* const wrapper = mount(<Transactions />);
    const table = wrapper.find('tsttblAlltransaction');
    const row = table.find('tr')
   // const node = table.find(Node)

    it('table grid', () => {
        expect(table).toHaveLength(1);
        expect(row).toHaveLength(1);
        //expect(node).toHaveLength(whateverYouExpect);
    });
})
*/
