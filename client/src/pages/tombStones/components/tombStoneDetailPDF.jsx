import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  letterhead: {
    width: '100%',
  },
  container: {
    paddingLeft: '4vh',
    paddingRight: '4vh',
  },
  title: {
    fontSize: '1.8vh',
    textAlign: 'center',
    fontFamily: 'Times-BoldItalic',
    marginBottom: 10
  }
});

const PDFTombstoneDetail = () => {

  return (
    <Document>
      <Page size="A4" style={{paddingBottom: '4vh'}}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" />
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Lápidas y Placas Faltantes</Text>
            </View>
            <View>
                
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTombstoneDetail;