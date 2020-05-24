import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Customers from './components/customers/Customers'
import CustomerAdd from './components/customers/CustomerAdd'
import CustomerEdit from './components/customers/CustomerEdit'
import CustomerView from './components/customers/CustomerView'
import Debtors from './components/customers/Debtors'
import Pets from './components/pets/Pets'
import PetAdd from './components/pets/PetAdd'
import PetEdit from './components/pets/PetEdit'
import Consultations from './components/consultations/Consultations'
import ConsultationAdd from './components/consultations/ConsultationAdd'
import ConsultationEdit from './components/consultations/ConsultationEdit'
import Dewormings from './components/dewormings/Dewormings'
import Restore from './components/Restore'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/clientes" exact component={Customers} />
          <Route path="/clientes/:id" exact component={CustomerView} />
          <Route path="/clientes/:id/:petId" exact component={CustomerView} />
          <Route path="/nuevo-cliente" component={CustomerAdd} />
          <Route path="/edit-cliente/:id" exact component={CustomerEdit} />
          <Route path="/pacientes" exact component={Pets} />
          <Route path="/nuevo-paciente/:id" exact component={PetAdd} />
          <Route path="/edit-paciente/:id" exact component={PetEdit} />
          <Route path="/consultas" component={Consultations} />
          <Route path="/edit-consulta/:consultationId" exact component={ConsultationEdit} />
          <Route path="/nueva-consulta/:customerId/:petId" exact component={ConsultationAdd} />
          <Route path="/restaurar/:table" exact component={Restore} />
          <Route path="/deudores" exact component={Debtors} />
          <Route path="/vacunas" exact component={() => <h1>Vacunaciones</h1>} />
          <Route path="/desparasitaciones" exact component={Dewormings} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
