import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { Link } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit'
import Logout from './Logout';

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const auth = useAuthUser();
  const [query, setQuery] = useState('');

  return (

    <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand>Expense Calculator</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <Link to='/'> <MDBNavbarLink aria-current='page'>
              Home
              </MDBNavbarLink></Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <Link to='/add-expense'><MDBNavbarLink>Add Expense</MDBNavbarLink></Link>
            </MDBNavbarItem>

            <MDBNavbarItem className='ms-auto'>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                {auth().name}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link><Logout/></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  )
}

