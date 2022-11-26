import { render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Pagination from '../Pagination'


const displayRecords = jest.fn();
describe('pagination section',() => {
    
it('renders pagination section', () => {
  const {container} = render(<Router><Pagination recordCount={100} perPage={10}/></Router>);
  expect(container).toMatchSnapshot();
});

it('check no of pages present as well as not there',  () => {
    const {container, getByTestId,queryByTestId} = render(<Router><Pagination pages={10} recordCount={20} perPage={10} getRecords={jest.fn()}/></Router>);
    expect(getByTestId('page-test-id1')).toBeInTheDocument();
    expect(getByTestId('page-test-id2')).toBeInTheDocument();
    expect(queryByTestId('page-test-id3')).not.toBeInTheDocument();
})

});