import { cleanup,fireEvent,render,screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import "@testing-library/jest-dom/extend-expect";
import { Rewardsdisplay } from '../components/Rewardsdisplay';

afterEach(cleanup);

it("renders witout crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Rewardsdisplay></Rewardsdisplay>, div);

})

describe("Rewardsfetch component" , () => {
    render(<Rewardsdisplay></Rewardsdisplay>);
    const button = screen.getByTestId("btngetTransaction");
    const stdate = screen.getByTestId("txtstdate");
    const enddate = screen.getByTestId("txtenddate");

  
    test("button text" , () => {
        expect(button).toHaveTextContent("Get all Transactions");

    })

    test("should be able to edit start date" , () => {
        const currdate = new Date().toISOString().slice(0,10);
        fireEvent.change(stdate,{target:{value:currdate}});
        expect(stdate.value).toEqual(currdate);

    })

    
    test("should be able to edit end date" , () => {
        const currdate = new Date().toISOString().slice(0,10);
        fireEvent.change(enddate,{target:{value:currdate}});
        expect(enddate.value).toEqual(currdate);

    })

})