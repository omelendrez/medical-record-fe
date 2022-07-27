import React, { useState, useEffect } from "react"
import { Document, Page, Text, View, PDFDownloadLink, PDFViewer, StyleSheet, Image } from "@react-pdf/renderer"
import { formatDate, formatDateExtended, getTreatmentStage } from "../../../services/utils"
import logo from '../../../logo.jpg'

const styles = StyleSheet.create({
  page: {
    size: 'A4',
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontSize: 10
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: 1,
    lineHeight: 1.2,
    borderColor: '#ccc',
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    color: '#3388af',
    fontSize: 16,
  },
  date: {
    textAlign: 'right',
    margin: 10,
    fontSize: 8,
    color: '#3388af'
  }
})

const PDFDocument = ({ records, pet }) => {
  const { name, breed, birthDate, weight, height, color } = pet

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.date}>
          {formatDateExtended(new Date())}
        </Text>
        <Image src={logo} alt="logo" style={{ maxWidth: "20%" }} />
        <View style={{ ...styles.section, border: 0 }}>
          <Text>Historia clínica de paciente ordenada por fecha de intervención en orden ascendente.</Text>
        </View>
        <View style={{ ...styles.section, fontSize: 12 }}>
          <Text style={styles.name}>
            Nombre: {name}
          </Text>
          <Text>Raza: {breed}</Text>
          <Text>Fecha de nacimiento: {formatDate(birthDate)}</Text>
          <Text>Peso: {weight}</Text>
          <Text>Altura: {height}</Text>
          <Text>Color: {color}</Text>
        </View>
        {records.map((record) => {
          if (record.vaccination) {
            return (
              <View style={styles.section} key={record.id}>
                <Text>{formatDate(record.date)}</Text>
                <Text>Vacuna: {record.vaccination}</Text>
              </View>
            )
          }
          if (record.deworming) {
            return (
              <View style={styles.section} key={record.id}>
                <Text>{formatDate(record.date)}</Text>
                <Text>Desparasitación: {record.deworming}</Text>
              </View>)
          }
          return (
            <View style={styles.section} key={record.id}>
              <Text>{formatDate(record.date)}</Text>
              <Text>Anamnesis: {record.anamnesis}</Text>
              <Text>Diagnostico: {record.diagnosis}</Text>
              <Text>Tratamiento: {record.treatment}</Text>
              <Text>Status tratamiento: {getTreatmentStage(record.treatmentStage)}</Text>
            </View>
          )
        })}
        <View style={{ ...styles.section, border: 0, marginTop: 10 }}>
          <Text>Veterinaria Colitas Felices, Bahía Blanca {formatDateExtended(new Date())}</Text>
        </View>

      </Page>
    </Document>
  )
}

const PDFGenerator = ({ pet, data }) => {
  const [records, setRecords] = useState([])
  useEffect(() => {
    if (data.consultas) {
      const { consultas, vacunaciones, desparasitaciones } = data
      const records = [...consultas.rows, ...vacunaciones.rows, ...desparasitaciones.rows]
      setRecords(records.sort((a, b) => new Date(a.date) - new Date(b.date)))
    }
  }, [data])

  return (
    <>
      <PDFDownloadLink
        document={<PDFDocument records={records} pet={pet} />}
        fileName={`${pet.name}-Historia-Clinica.pdf`}
      >
        <button className='btn btn-primary'>Descargar PDF</button>
      </PDFDownloadLink>
      <PDFViewer style={{ width: "100%", height: "90vh" }}>
        <PDFDocument records={records} pet={pet} />
      </PDFViewer>
    </>
  )
}

export default PDFGenerator

