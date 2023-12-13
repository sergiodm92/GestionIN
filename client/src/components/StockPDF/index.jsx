import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from 'react-pdf-table-fork'

const styles = StyleSheet.create({
  letterhead: {
    marginTop: '1vh',
    width: '100%',
  },
  letterheadImage: {
    height: '50px',
    width: '475px',
  },
  container: {
    paddingLeft: '4vh',
    paddingRight: '4vh',
  },
  date: {
    display: 'flex',
    flexDirection: 'column',
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
  subTitle: {
    fontSize: '1.7vh',
    textAlign: 'center',
    fontFamily: 'Times-BoldItalic',
    marginBottom: 4,
    marginTop: 8,
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
    margin: "0.5vh",
    borderColor: "white",
    fontSize: "1.25vh",
    fontFamily: 'Times-Italic',
  },
  tableTitle: {
    fontSize: "1.25vh",
    margin: "0.5vh",
    borderColor: "white",
    fontFamily: 'Times-Bold',
  },
  border: {
    borderColor: "white"
  },
  idColumn: {
    flexBasis: '15%',
  },
  typeColumn: {
    flexBasis: '15%',
  },
  sizeColumn: {
    flexBasis: '31%',
  },
  colorColumn: {
    flexBasis: '12%',
  },
  mboxColumn: {
    flexBasis: '17%',
  },
  unitsColumn: {
    flexBasis: '10%',
  },
  colorColumnText: {
    paddingLeft: '1vh',
    flexBasis: '12%',
  },
  mboxColumnText: {
    paddingLeft: '1vh',
    flexBasis: '17%',
  },
  unitsColumnText: {
    paddingLeft: '1vh',
    flexBasis: '10%',
  },
});

const PDFStockDetail = (data) => {

  const { place, stock, mBox, products } = data

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es');
  const formattedTime = currentDate.toLocaleTimeString('es');

  return (
    <Document>
      <Page size="A4" style={{ paddingBottom: '4vh' }}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" style={styles.letterheadImage} />
          </View>
          <View style={styles.container}>
            <View style={styles.date}>
              <Text>{formattedDate}</Text>
              <Text>{formattedTime}</Text>
            </View>
            <View>
              <Text style={styles.title}>{`Stock disponible en ${place}`}</Text>
            </View>
            {stock?.length > 0 && (
              <>
                <View>
                  <Text style={styles.subTitle}>Ataúdes</Text>
                </View>
                <Table data={stock}>
                  <TableHeader includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <TableCell style={{ ...styles.border, ...styles.idColumn }}><Text style={styles.tableTitle}>ID</Text></TableCell>
                    <TableCell style={{ ...styles.border, ...styles.typeColumn }}><Text style={styles.tableTitle}>Tipo</Text></TableCell>
                    <TableCell style={{ ...styles.border, ...styles.sizeColumn }}><Text style={styles.tableTitle}>Tamaño</Text></TableCell>
                    <TableCell style={{ ...styles.border, ...styles.colorColumn }}><Text style={styles.tableTitle}>Color</Text></TableCell>
                    <TableCell style={{ ...styles.border, ...styles.mboxColumn }}><Text style={styles.tableTitle}>Caja Metálica</Text></TableCell>
                    <TableCell style={{ ...styles.border, ...styles.unitsColumn }}><Text style={styles.tableTitle}>Unidades</Text></TableCell>
                  </TableHeader>
                  <TableBody includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <DataTableCell getContent={(e) => e.id} style={{ ...styles.tableText, ...styles.idColumn }} />
                    <DataTableCell getContent={(e) => e.type} style={{ ...styles.tableText, ...styles.typeColumn }} />
                    <DataTableCell getContent={(e) => e.size} style={{ ...styles.tableText, ...styles.sizeColumn }} />
                    <DataTableCell getContent={(e) => e.color} style={{ ...styles.tableText, ...styles.colorColumnText }} />
                    <DataTableCell getContent={(e) => (e.mbox ? "Si" : "No")} style={{ ...styles.tableText, ...styles.mboxColumnText }} />
                    <DataTableCell getContent={(e) => e.units} style={{ ...styles.tableText, ...styles.unitsColumnText }} />
                  </TableBody>
                </Table>
              </>
            )}
            {mBox.length > 0 && (
              <>
                <View>
                  <Text style={styles.subTitle}>Cajas Metálicas</Text>
                </View>
                <Table data={mBox}>
                  <TableHeader includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Tamaño</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Unidades</Text></TableCell>
                  </TableHeader>
                  <TableBody includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <DataTableCell getContent={(e) => e.size} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.units} style={styles.tableText} />
                  </TableBody>
                </Table>
              </>
            )}
            {products.length > 0 && (
              <>
                <View>
                  <Text style={styles.subTitle}>Productos</Text>
                </View>
                <Table data={products}>
                  <TableHeader includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>ID</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Nombre</Text></TableCell>
                    <TableCell style={styles.border}><Text style={styles.tableTitle}>Unidades</Text></TableCell>
                  </TableHeader>
                  <TableBody includeBottomBorder={false}
                    includeLeftBorder={false}
                    includeRightBorder={false}
                    includeTopBorder={false}>
                    <DataTableCell getContent={(e) => e.id} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.name} style={styles.tableText} />
                    <DataTableCell getContent={(e) => e.units} style={styles.tableText} />
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

export default PDFStockDetail;