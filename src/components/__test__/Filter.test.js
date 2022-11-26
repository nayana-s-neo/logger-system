import { render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Filter from '../Filter';

const applicationTypes = ['LEASE_REGISTRATION','ADD_COMPANY_EMPLOYEE','CERT_PROP_OWNERSHIP'];
const actionTypes = ['SUBMIT_APPLICATION','ADD_EMPLOYEE','INITIATE_APPLICATION'];

const resetSearch = jest.fn();
const getNewDate = jest.fn();

describe('filter section',() => {
  beforeEach(() => {
    jest.resetAllMocks();
 });


it('renders filter section', () => {
  const {container} = render(<Router><Filter applicationTypes={applicationTypes} actionTypes={actionTypes}/></Router>);
  expect(container).toMatchSnapshot();
});

it('check filter elements present', async () => {
    const {getByTestId} = render(<Router><Filter applicationTypes={applicationTypes} actionTypes={actionTypes} resetSearch={resetSearch} getNewDate={getNewDate} /></Router>);
    expect(getByTestId('search-logger')).toBeInTheDocument();
    expect(getByTestId('log-id')).toBeInTheDocument();
    expect(getByTestId('application-id')).toBeInTheDocument();
    expect(getByTestId('action-type')).toBeInTheDocument();
    expect(getByTestId('application-type')).toBeInTheDocument();
    expect(getByTestId('search-logger')).toBeInTheDocument();
});
});