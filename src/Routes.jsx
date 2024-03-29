import React from 'react'
import { Switch, Route } from 'react-router-dom'

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
import DewormingAdd from './components/dewormings/DewormingAdd'
import DewormingEdit from './components/dewormings/DewormingEdit'
import Vaccinations from './components/vaccinations/Vaccinations'
import VaccinationAdd from './components/vaccinations/VaccinationAdd'
import VaccinationEdit from './components/vaccinations/VaccinationEdit'
import Restore from './components/Restore'
import Calendar from './components/Calendar'
import Appointments from './components/Appointments'

import Documents from './components/documents/Documents'
import DocumentAdd from './components/documents/DocumentAdd'

function Routes() {
  return (
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
      <Route
        path="/edit-consulta/:consultationId"
        exact
        component={ConsultationEdit}
      />
      <Route
        path="/nueva-consulta/:customerId/:petId"
        exact
        component={ConsultationAdd}
      />

      <Route path="/restaurar/:table" exact component={Restore} />

      <Route path="/deudores" exact component={Debtors} />

      <Route path="/desparasitaciones" exact component={Dewormings} />
      <Route
        path="/edit-desparasitacion/:dewormingId"
        exact
        component={DewormingEdit}
      />
      <Route
        path="/nueva-desparasitacion/:customerId/:petId"
        exact
        component={DewormingAdd}
      />

      <Route path="/documentos" exact component={Documents} />

      <Route
        path="/nuevo-documento/:customerId/:petId"
        exact
        component={DocumentAdd}
      />

      <Route path="/vacunaciones" exact component={Vaccinations} />
      <Route path="/edit-vacunacion/:id" exact component={VaccinationEdit} />
      <Route
        path="/nueva-vacunacion/:customerId/:petId"
        exact
        component={VaccinationAdd}
      />

      <Route path="/calendario" exact component={Calendar} />

      <Route path="/turnos" exact component={Appointments} />
    </Switch>
  )
}

export default Routes
