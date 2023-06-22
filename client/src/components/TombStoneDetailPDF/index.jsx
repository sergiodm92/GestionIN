import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  letterhead: {
    width: '100%',
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
    marginBottom: 10
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
    width: '48%',
    backgroundColor: '#bdd0b95b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    marginBottom: 15
  }
});

const PDFTombstoneDetail = (deceaseds) => {

  const date = new Date().toLocaleDateString('es')

  return (
    <Document>
      <Page size="A4" style={{ paddingBottom: '4vh' }}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" />
          </View>
          <View style={styles.container}>
            <View style={styles.date}>
              <Text>{date}</Text>
            </View>
            {deceaseds?.deceaseds.tombstones.length > 0 && (
              <>
                <View>
                  <Text style={styles.title}>Lápidas Faltantes</Text>
                </View>
                <View style={styles.cardsContainer}>
                  {deceaseds?.deceaseds.tombstones.map((d, index) => (
                    <View key={index} style={styles.cards}>
                      <Text style={styles.name}>{d.name}</Text>
                      <Text style={styles.text}>
                        {new Date(d.dob).toLocaleDateString('es')} - {new Date(d.dod).toLocaleDateString('es')}
                      </Text>
                      <Text style={styles.text}>Cementerio: {d.cementery}El Salvador</Text>
                      <Text style={styles.text}>
                        Sector: 25A{d.sector} . Parcela: 34{d.parcel} . Nivel: 2{d.level}
                      </Text>
                      <Text style={styles.text}>Símbolo de la Religión: {d.religion_symbol}</Text>
                      <Text style={styles.text}>Texto: {d.news_paper}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
            {deceaseds?.deceaseds.plaques.length > 0 && (
              <>
                <View>
                  <Text style={styles.title}>Placas Faltantes</Text>
                </View>
                <View style={styles.cardsContainer}>
                  {deceaseds?.deceaseds.plaques.map((d, index) => (
                    <View key={index} style={styles.cards}>
                      <Text style={styles.name}>{d.name}</Text>
                      <Text style={styles.text}>
                        {new Date(d.dob).toLocaleDateString('es')} - {new Date(d.dod).toLocaleDateString('es')}
                      </Text>
                      <Text style={styles.text}>Cementerio: {d.cementery}El Salvador</Text>
                      <Text style={styles.text}>Texto: {d.news_paper}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTombstoneDetail;