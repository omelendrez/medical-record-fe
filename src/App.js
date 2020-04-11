import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Customers from './components/customers/Customers'
import CustomerAdd from './components/customers/CustomerAdd'
import CustomerEdit from './components/customers/CustomerEdit'
import CustomerView from './components/customers/CustomerView'
import Pets from './components/pets/Pets'
import Consultations from './components/consultations/Consultations'

function App() {
  const [filter, setFilter] = useState('')

  return (
    <BrowserRouter>
      <Navbar doSearch={setFilter} />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/clientes" exact component={() => <Customers filter={filter} />} />
          <Route path="/clientes/:id" exact component={CustomerView} />
          <Route path="/nuevo-cliente" component={() => <CustomerAdd />} />
          <Route path="/edit-cliente/:id" exact component={CustomerEdit} />
          <Route path="/pacientes" component={() => <Pets filter={filter} />} />
          <Route path="/consultas" component={() => <Consultations filter={filter} />} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
