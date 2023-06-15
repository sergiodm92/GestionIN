import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  letterhead: {
    width: '100%',
  },
  container: {
    paddingLeft: '4vh',
    paddingRight: '4vh',
  },
  date:{
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
    marginBottom: 10
  },
  text: {
    fontSize: '1.5vh',
    fontWeight: 'light',
    fontFamily: 'Times-Italic',
    marginBottom: 7
  },
  cards:{
    marginBottom: 30
  }
});

const PDFTombstoneDetail = (deceaseds) => {

  const date = new Date().toLocaleDateString("es")

  return (
    <Document>
      <Page size="A4" style={{paddingBottom: '4vh'}}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" />
          </View>
          <View style={styles.container}>
            <View style={styles.date}>
                <Text>{date}</Text>
            </View>
            <View>
              <Text style={styles.title}>Lápidas Faltantes</Text>
            </View>
            <View>
              {deceaseds?.deceaseds.tombstones.map((d, index) => (
                <View key={index}>
                  <Text style={styles.text}>- {d.name} . {new Date(d.dob).toLocaleDateString("es")} - {new Date(d.dod).toLocaleDateString("es")} . {d.pod}</Text>
                  <Text style={styles.text}>Texto: {d.leyend}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text style={styles.title}>Placas Faltantes</Text>
            </View>
            <View>
              {deceaseds?.deceaseds.plaques.map((d, index) => (
                <View key={index} style={styles.cards}>
                  <Text style={styles.text}>- {d.name} . {new Date(d.dob).toLocaleDateString("es")} - {new Date(d.dod).toLocaleDateString("es")} . {d.pod}</Text>
                  <Text style={styles.text}>Texto: {d.leyend}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTombstoneDetail;