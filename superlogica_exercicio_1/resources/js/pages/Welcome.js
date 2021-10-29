import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { LoginContext } from '../context/LoginContext';
import { list } from '../request/user';

/* const columns = [];
 */
const columns = [
    {
        name: 'Nome completo',
        selector: 'full_name',
    },
    {
        name: 'Nome de Login',
        selector: 'user_name',
    },
    {
        name: 'Email',
        selector: 'email',
    },
    {
        name: 'CEP',
        selector: 'cep',
    },
];

const Welcome = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selector_search, setSelectorSearch] = useState('fullname');

    const { nome, logout } = useContext(LoginContext);
    
    useEffect(() => {
        list(null, onData)
    }, []);

    const onData = (data) => {
        setData(data);
    }

    const onSearch = () => {
        var form_data = {
            "selector": selector_search,
            "search": search,
        };

        list(form_data, onData)
    }

    return (
        <>
            <h5>Bem Vindo, {nome} - <a href="#" onClick={() => logout()}>Sair</a></h5>
            
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label>Selecione o campo a ser Buscado</Label>
                                    <Input 
                                        type="select" 
                                        className="form-control"
                                        value={selector_search}
                                        onChange={(e) => setSelectorSearch(e.target.value)}
                                    >
                                        {columns.map(e => 
                                            <option value={e.selector}>{e.name}</option>
                                        )}
                                    </Input>
                                </Col>
                                <Col>
                                    <Label>Buscar</Label>
                                    <Input 
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Button color="info" onClick={onSearch}>Buscar</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
                <hr/>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            </Card>
        </>
    );
}

export default Welcome;