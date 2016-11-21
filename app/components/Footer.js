import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className='container'>
                    <div className='row text-center'>
                        <p>React Project</p>
                        <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong></p>
                        <p><i className="fa fa-github"></i> <a href="https://github.com/AdeleH/">@AdeleH</a></p>
                    </div>
                </div>
            </footer>
        );
    }
}
