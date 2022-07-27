import React, { useState, useEffect } from "react"
import { Document, Page, Text, View, PDFDownloadLink, PDFViewer, StyleSheet, Image } from "@react-pdf/renderer"
import { formatDate, formatDateExtended, getTreatmentStage, getAge } from "../../../services/utils"
import logo from '../../../logo.jpg'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  header: {
    border: 1,
    lineHeight: 1.4,
    borderRadius: 5,
    borderColor: '#3388af',
    margin: 20,
    width: '60%'
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: 1,
    lineHeight: 1.4,
    borderColor: '#eaeaea',
    marginLeft: 20,
    marginRight: 40,
    fontSize: 12
  },
  itemDate: {
    color: '#3388af',
    fontSize: 12
  },
  name: {
    color: '#3388af',
    fontWeight: 900
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  lowercase: {
    textTransform: 'lowercase'
  },
  date: {
    textAlign: 'right',
    fontSize: 8,
    color: '#3388af',
    position: 'absolute',
    right: 20,
    top: 20
  },
  logo: {
    width: "20%",
    position: 'absolute',
    top: 30,
    right: 10
  }
})

const PDFDocument = ({ records, pet, customer }) => {
  const { name: peName, breed, birthDate, weight, height, color } = pet
  const { name: customerName, address, phone, email } = customer

  if (!records?.length) return null

  return (
    <Document>
      <Page style={styles.page} orientation="portrait" size="A4">
        <Text style={styles.date}>
          {formatDateExtended(new Date())}
        </Text>
        <Image src={logo} alt="logo" style={styles.logo} />
        <View style={styles.header}>
          <View style={{ ...styles.section, border: 0, marginBottom: 0 }}>
            <Text style={{ ...styles.name, ...styles.capitalize }}>
              Cliente: {customerName}
            </Text>
            {Boolean(address) && <Text style={styles.capitalize}>Domicilio: {address}</Text>}
            {Boolean(phone) && <Text>Teléfono: {phone}</Text>}
            {Boolean(email) && <Text style={styles.lowercase}>Email: {email}</Text>}
          </View>
          <View style={{ ...styles.section, border: 0, marginTop: 0, marginBottom: 0 }}>
            <Text style={styles.name}>
              Paciente: {peName}
            </Text>
            {Boolean(email) && <Text style={styles.capitalize}>Raza: {breed}</Text>}
            {Boolean(birthDate) && <Text>Fecha de nacimiento: {formatDate(birthDate)} ({getAge(birthDate)})</Text>}
            {Boolean(weight) && <Text>Peso: {weight}</Text>}
            {Boolean(height) && <Text>Altura: {height}</Text>}
            {Boolean(color) && <Text>Color: {color}</Text>}
          </View>
        </View>

        {records.map((record) => {
          if (record.vaccination) {
            return (
              <View style={styles.section} key={record.id}>
                <Text style={styles.itemDate}>{formatDate(record.date)}</Text>
                <Text>Vacuna: {record.vaccination}</Text>
              </View>
            )
          }
          if (record.deworming) {
            return (
              <View style={styles.section} key={record.id}>
                <Text style={styles.itemDate}>{formatDate(record.date)}</Text>
                <Text>Desparasitación: {record.deworming}</Text>
              </View>)
          }
          return (
            <View style={styles.section} key={record.id}>
              <Text style={styles.itemDate}>{formatDate(record.date)}</Text>
              {Boolean(record.anamnesis) && <Text>Anamnesis: {record.anamnesis}</Text>}
              {Boolean(record.diagnosis) && <Text>Diagnostico: {record.diagnosis}</Text>}
              {Boolean(record.treatment) && <Text>Tratamiento: {record.treatment}</Text>}
              {Boolean(record.treatmentStage) && <Text>Status tratamiento: {getTreatmentStage(record.treatmentStage)}</Text>}
            </View>
          )
        })}
        <View style={{ ...styles.section, border: 0, marginTop: 10 }}>
          <Text>Veterinaria Colitas Felices, Bahía Blanca, {formatDateExtended(new Date())}</Text>
        </View>

      </Page>
    </Document>
  )
}

const PDFGenerator = ({ customer, pet, data }) => {
  const [records, setRecords] = useState([])
  useEffect(() => {
    if (data.consultas) {
      const { consultas, vacunaciones, desparasitaciones } = data
      const records = [...consultas.rows, ...vacunaciones.rows, ...desparasitaciones.rows]
      setRecords(records.sort((a, b) => new Date(a.date) - new Date(b.date)))
    }
  }, [data])

  if (!records?.length) return null

  return (
    <>
      <PDFDownloadLink
        document={<PDFDocument records={records} pet={pet} customer={customer} />}
        fileName={`${pet.name}-Historia-Clinica.pdf`}
      >
        <button className='btn btn-primary'>Descargar PDF</button>
      </PDFDownloadLink>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <PDFDocument records={records} pet={pet} customer={customer} />
      </PDFViewer>
    </>
  )
}

export default PDFGenerator

