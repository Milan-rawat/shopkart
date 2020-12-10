import React from 'react';
import Header from '../../Header/Header';
import Body from '../../Body/Body'
import Footer from '../../Footer/Footer'


class Home extends React.Component {
    render() {
        return(
            <>
                <Header />
                <Body />
                <Footer />
            </>
        )
    }
}

export default Home;