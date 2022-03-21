import React from 'react';

import { render } from 'tests';

import { Login } from './Login';

describe('Login', () => {
  test('Displays all information', async () => {
    const { getByLabelText } = render(<Login />);

    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
  });
});
