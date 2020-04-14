import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { ThemeContext } from './ThemeContext';

const Header = ({ siteTitle }) => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  return (
    <Wrapper>
      My Website
      {typeof colorMode !== 'undefined' && (
        <label>
          <input
            type="checkbox"
            checked={colorMode === 'dark'}
            onChange={ev => {
              setColorMode(ev.target.checked ? 'dark' : 'light');
            }}
          />{' '}
          Dark
        </label>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export default Header;
