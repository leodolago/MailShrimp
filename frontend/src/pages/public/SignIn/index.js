import React from 'react';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import {BoxForm, BoxContent} from '../../../shared/styles';
import {Link, withRouter} from 'react-router-dom';
import AccountsService from '../../../services/accounts';
import { login } from '../../../services/auth';

import Logo from '../../../assets/logo.png'

class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
    };

    handleSignIn = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;

        if(!email || !password ) {
            this.setState({error: "Informe todos os campos para acessar"})
        } else {
            try {
                const service = new AccountsService();

                const response = await service.login(email, password);
        
                login(response.data.token);

                this.props.history.push("/")

            } catch(error) {
                console.log(error);
                this.setState({error: 'Ocorreu um erro durante atentativa de login'})
            }

        }
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={5}>
                        <BoxContent>
                            <img src={Logo} alt='MailShrimp' />
                        </BoxContent>
                        <BoxForm>
                        <h2>Login</h2>
                        <p>Informe seus dados para autenticar:</p>   
                        <Form onSubmit={this.handleSignIn}>
                            <Form.Group controlId="emailGroup">
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Digite seu e-mail"
                                    onChange={e => this.setState({ email: e.target.value})}
                                    />
                                </Form.Group>
                                 <Form.Group controlId="passwordGroup">
                                    <Form.Label>Senha:</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Digite sua senha" 
                                        onChange={e => this.setState({ password: e.target.value})}
                                        />
                                </Form.Group>
                                <Button block variant="secondary" type="submit">
                                    Fazer login
                                </Button>
                            </Form>
                        </BoxForm> 
                        <BoxContent>
                            <p>Novo na plataforma?</p>
                            <Link className="button" to="/signup">Crie sua conta agora</Link>
                        </BoxContent>
                    </Col>
                </Row>
            </Container>
        )
    }    
}

export default withRouter(SignIn);