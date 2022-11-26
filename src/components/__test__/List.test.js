import { render } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import List from '../List'

test('renders logger system', () => {
  const {container} = render(<Router><List /></Router>);
  expect(container).toMatchSnapshot();
});
