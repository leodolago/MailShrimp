import React from 'react';
import Header from '../../../shared/header';
import {PageContent} from '../../../shared/styles';
import {Container, Button, Form, Alert, Row, Col} from 'react-bootstrap';
import contactsService from '../../../services/contacts';
import {withRouter, Link} from 'react-router-dom';

class ContactAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: '',
            error: '',
            isLoading: false,
        }
    }

    handleSave = async(event) => {
        event.preventDefault();

        const {name, email, phone } = this.state;

        if(!name || !email || !phone) {
            this.setState({error: "Informe todos os campos para adicionar contato"})
        } else {
            try {
                const service = new contactsService();

                await service.add({ name, email, phone });

                this.props.history.push('/contacts')

            } catch(error) {
                this.setState({error: "Ocorreu um erro durante a criação do contato."})
            }
        }
    }

    renderError = () => {
        const { error } = this.state;

        return(
            <Alert variant='danger'>
            {error}
        </Alert>
        )
    }

    render() {
        return (
            <>
            <Header />
            <PageContent>
                <Container>
                    <Row>
                        <Col>
                            <h3>Adicionar  Contato</h3>
                            <p>Informe todos os campos</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} sm={12}>
                            {this.state.error && this.renderError()}
                            <Form onSubmit={this.handleSave}>
                                <Form.Group>
                                    <Form.Label>Nome:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite um nome"
                                        onChange={e => this.setState({name: e.target.value })} 
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite um e-mail"
                                        onChange={e => this.setState({email: e.target.value })} 
                                        />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Telefone:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite um telefone"
                                        onChange={e => this.setState({phone: e.target.value })} 
                                        />
                                </Form.Group>
                                <Button variant='primary' type='submit'>Adicionar contato</Button>
                                <Link className="btn btn-link" to='/contacts'>Voltar</Link>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </PageContent>
            </>
        )
    }
}

export default withRouter(ContactAdd);