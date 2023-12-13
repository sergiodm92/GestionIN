import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import {Table, TableHeader,TableCell, TableBody, DataTableCell} from 'react-pdf-table-fork'

const styles = StyleSheet.create({
  letterhead: {
    marginTop: '1vh',
    width: '100%',
  },
  letterheadImage:{
    height:'50px',
    width:'475px',
  },
  container: {
    paddingLeft: '4vh',
    paddingRight: '4vh',
  },
  date: {
    display: 'flex',
    fontSize: '1.5vh',
    fontWeight: 'light',
    fontFamily: 'Times-Roman',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  title: {
    fontSize: '1.8vh',
    textAlign: 'center',
    fontFamily: 'Times-BoldItalic',
    marginBottom: 8,
    marginTop: 12,
  },
  cardsTitleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: '1.5vh',
    fontWeight: 'light',
    fontFamily: 'Times-Italic',
    marginBottom: 5,
    textAlign: 'justify'
  },
  name: {
    fontSize: '1.5vh',
    color: '#2E4C36',
    fontWeight: 'bold',
    fontFamily: 'Times-BoldItalic',
    marginBottom: 5
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cards: {
    width: '100%',
    backgroundColor: '#bdd0b95b',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15
  },
tableText: {
    margin:"0.5vh",
    borderColor:"white",
    fontSize:"1.25vh",
    fontFamily: 'Times-Italic',
},
tableTitle : {
  fontSize:"1.25vh",
  margin:"0.5vh",
  borderColor:"white",
  fontFamily: 'Times-Bold',
},
border:{
    borderColor:"white"
}
});

const PDFTombstoneDetail = (deceaseds) => {

  const date = new Date().toLocaleDateString('es')

  return (
    <Document>
      <Page size="A4" style={{ paddingBottom: '4vh' }} orientation={deceaseds?.deceaseds.tombstones.length > 0? "landscape" : "portrait"}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" style={styles.letterheadImage}/>
          </View>
          <View style={styles.container}>
            <View style={styles.date}>
              <Text>{date}</Text>
            </View>
            {deceaseds?.deceaseds.tombstones.length > 0 && (
              <>
                <View>
                  <Text style={styles.title}>Pedido de Lápidas</Text>
                </View>
                <Table data={deceaseds?.deceaseds.tombstones}>
                  <TableHeader includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Nombre</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>F.nac.</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>F.fall.</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Cementerio</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Sector</Text></TableCell>
                    <TableCell style={styles.border} ><Text style={styles.tableTitle}>Parcela</Text></TableCell>
                    <TableCell style={styles.border} ><Text style={styles.tableTitle}>Nivel</Text></TableCell>
                    <TableCell style={styles.border} ><Text style={styles.tableTitle}>Religión</Text></TableCell>
                  </TableHeader>
                  <TableBody includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <DataTableCell getContent={(e) => e.name} style={styles.tableText} />
                    <DataTableCell getContent={(e) => new Date(e.dob).toLocaleDateString('es')} style={styles.tableText} />
                    <DataTableCell getContent={(e) => new Date(e.dod).toLocaleDateString('es')} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.cementery} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.sector} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.parcel} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.level} style={styles.tableText}  />
                    <DataTableCell getContent={(e) => e.religion_symbol} style={styles.tableText} />
                  </TableBody>
                </Table>
              </>
            )}
            {deceaseds?.deceaseds.plaques.length > 0 && (
              <>
                <View>
                  <Text style={styles.title}>Pedido de Placas</Text>
                </View>
                <Table data={deceaseds?.deceaseds.plaques}>
                  <TableHeader includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Nombre</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Nacimiento</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Fallecimiento</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Cementerio</Text></TableCell>
                  </TableHeader>
                  <TableBody includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <DataTableCell getContent={(e) => e.name} style={styles.tableText} />
                    <DataTableCell getContent={(e) => new Date(e.dob).toLocaleDateString('es')} style={styles.tableText} />
                    <DataTableCell getContent={(e) => new Date(e.dod).toLocaleDateString('es')} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.cementery} style={styles.tableText} />
                  </TableBody>
                </Table>
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTombstoneDetail;