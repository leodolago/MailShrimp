import React from 'react';
import Header from '../../../shared/header';
import {PageContent} from '../../../shared/styles';
import {Container, Table, Row, Col} from 'react-bootstrap';
import {Link, withRouter, useRouteMatch} from 'react-router-dom';
import ContactsService from '../../../services/contacts';

function RenderLine({contact}) {
    const {url} = useRouteMatch();

    return (
        <tr key={contact.id}>
          <td>
            <Link to={`${url}/${contact.id}`}>{contact.email}</Link>
          </td>
          <td>{contact.name}</td>
        </tr>
      )
}


function RenderTable({contacts}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>E-mail</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((item) => <RenderLine key={item.id} contact={item} />)}
            </tbody>
        </Table>
    )

}

function RenderEmptyRow() {
    return (
        <tr>
            <td colSpan={2}>Nenhum contato disponível</td>
        </tr>
    )
}

class Contacts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            contacts: [],
        }
    }

    async componentDidMount() {
        const service = new ContactsService();
    
        const result = await service.getAll();
    
        this.setState({
          isLoading: false,
          contacts: result,
        })
    } 

    render() {
        const { isLoading, contacts } = this.state;
    
        return (
          <>
            <Header />
            <PageContent>
              <Container>
                <Row>
                  <Col>
                    <h3>Contatos</h3>
                  </Col>
                  <Col>
                    <Link className='btn btn-success float-right' to='/contacts/add'>Adicionar contato</Link>
                  </Col>
                </Row>
                <p>Relação de contatos cadastrados.</p>
                {contacts.length === 0 && <RenderEmptyRow />}
                {!isLoading && <RenderTable contacts={contacts} />}
              </Container>
            </PageContent>
          </>
        )
    
      }

}

export default withRouter(Contacts);