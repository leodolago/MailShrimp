import React from 'react';
import Header from '../../../shared/header'
import {Container} from 'react-bootstrap';
import {PageContent} from '../../../shared/styles';
import {withRouter} from 'react-router-dom';

class Dashboard extends React.Component {
    
    render() {
        return (
            <>
            <Header />
            <PageContent>
                <Container>
                    <h2>Dashboard</h2>
                    <p>Aqui podemos listar os últimos envios, contatos adicionado ou </p>
                </Container>
            </PageContent>
        </>   
        )          
    }   
}

export default withRouter(Dashboard);