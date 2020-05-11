import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Outlook</Navbar.Brand>
               
                <Form inline className='d-sm-block headerform' >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>

            
        </>
    )
}

export default Header;