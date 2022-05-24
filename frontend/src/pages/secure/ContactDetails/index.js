import React from 'react';
import Header from '../../../shared/header';
import { PageContent } from '../../../shared/styles';
import { Container } from 'react-bootstrap';
import ContactsService from '../../../services/contacts';
import { withRouter} from 'react-router-dom';

function RenderContact({contact}) {
  return (
    <>
      <p>Nome: {contact.name}</p>
      <p>E-mail: {contact.email}</p>
      <p>Telefone: {contact.phone}</p>
    </>
  )
}

class ContactDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contact: null,
    }
  }

  async getContact(contactId) {
    const service = new ContactsService();

    const result = await service.getOne(contactId)

    this.setState({
      contact: result,
      isLoading: false,
    })
  }

  async componentDidMount() {
    const { params: { contactId }} = this.props.match;

    await this.getContact(contactId);
  }  

  render() {
    const { isLoading, contact } = this.state;

    return (
      <>
        <Header />
        <PageContent>
          <Container>
            <h3>Dados do contato</h3>
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <>
                <p>Nome: {contact.name}</p>
                <p>E-mail: {contact.email}</p>
                <p>Telefone: {contact.phone}</p>
              </>
            )}
          </Container>
        </PageContent>
      </>
    )
  }
}

export default  withRouter(ContactDetails);