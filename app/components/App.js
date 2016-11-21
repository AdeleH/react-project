import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
    // {this.props.children} now renders the active child route handler.
    // It will render one of the following components depending on the URL path:
    // Home, or Profile etc.
    render() {
        return (
            <div>
                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default App;
