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
                      <Text style={styles.text}>Símbolo de la Religión: {d.religionSymbol}</Text>
                      <Text style={styles.text}>Texto: {d.leyend}</Text>
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
                      <Text style={styles.text}>Texto: {d.leyend}</Text>
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






// import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   letterhead: {
//     width: '100%',
//   },
//   container: {
//     paddingLeft: '4vh',
//     paddingRight: '4vh',
//   },
//   date:{
//     display: 'flex',
//     fontSize: '1.5vh',
//     fontWeight: 'light',
//     fontFamily: 'Times-Roman',
//     alignItems: 'flex-end',
//     marginBottom: 10
//   },
//   title: {
//     fontSize: '1.8vh',
//     textAlign: 'center',
//     fontFamily: 'Times-BoldItalic',
//     marginBottom: 10
//   },
//   text: {
//     fontSize: '1.5vh',
//     fontWeight: 'light',
//     fontFamily: 'Times-Italic',
//     marginBottom: 5
//   },
//   name: {
//     fontSize: '1.5vh',
//     fontWeight: 'bold',
//     fontFamily: 'Times-BoldItalic',
//     marginBottom: 5
//   },
//   cardsContainer: {
//     width: "100%",
//     display: "flex",
//   },
//   cards:{
//     backgroundColor: "#bdd0b95b",
//     borderRadius: "1vh",
//     marginBottom: 15,
//     padding: 5
//   },
//   row:{
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   }
// });

// const PDFTombstoneDetail = (deceaseds) => {

//   const date = new Date().toLocaleDateString("es")

//   return (
//     <Document>
//       <Page size="A4" style={{paddingBottom: '4vh'}}>
//         <View>
//           <View style={styles.letterhead} fixed>
//             <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" />
//           </View>
//           <View style={styles.container}>
//             <View style={styles.date}>
//                 <Text>{date}</Text>
//             </View>
//             {deceaseds?.deceaseds.tombstones.length>0 ?
//             <>
//               <View>
//                 <Text style={styles.title}>Lápidas Faltantes</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.name}>Nombre</Text>
//                 <Text style={styles.name}>Nacimiento</Text>
//                 <Text style={styles.name}>Fallecimiento</Text>
//                 <Text style={styles.name}>Cementerio</Text>
//                 <Text style={styles.name}>Sector</Text>
//                 <Text style={styles.name}>Parcela</Text>
//                 <Text style={styles.name}>Nivel</Text>
//                 <Text style={styles.name}>Símbolo</Text>
//               </View>
//               <View style={styles.cardsContainer}>
//                 {deceaseds?.deceaseds.tombstones.map((d, index) => (
//                   <View key={index} style={styles.cards}>
//                     <View style={styles.row}>
//                       <Text style={styles.text}>{d.name} del Rosario Benavides</Text>
//                       <Text style={styles.text}>{new Date(d.dob).toLocaleDateString("es")}</Text>
//                       <Text style={styles.text}>{new Date(d.dod).toLocaleDateString("es")}</Text>
//                       <Text style={styles.text}>{d.cementery} El Salvador</Text>
//                       <Text style={styles.text}>{d.sector}25A</Text>
//                       <Text style={styles.text}>{d.parcela}36</Text>
//                       <Text style={styles.text}>{d.level}2</Text>
//                       <Text style={styles.text}>Cruz</Text>
//                     </View>
//                     <Text style={styles.text}>Texto: {d.leyend}</Text>
//                   </View>
//                 ))}
//               </View>
//             </>
//             : null}
//             {deceaseds?.deceaseds.plaques.length>0 ?
//             <>
//               <View>
//                 <Text style={styles.title}>Placas Faltantes</Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={styles.name}>Nombre</Text>
//                 <Text style={styles.name}>Nacimiento</Text>
//                 <Text style={styles.name}>Fallecimiento</Text>
//                 <Text style={styles.name}>Cementerio</Text>
//               </View>
//               <View>
//                 {deceaseds?.deceaseds.plaques.map((d, index) => (
//                   <View key={index} style={styles.cards}>
//                     <View style={styles.row}>
//                       <Text style={styles.text}>{d.name}</Text>
//                       <Text style={styles.text}>{new Date(d.dob).toLocaleDateString("es")}</Text>
//                       <Text style={styles.text}>{new Date(d.dod).toLocaleDateString("es")}</Text>
//                       <Text style={styles.text}>{d.cementery}El Salvador</Text>
//                     </View>
//                     <Text style={styles.text}>Texto: {d.leyend}</Text>
//                   </View>
//                 ))}
//               </View>
//             </>
//             : null}
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default PDFTombstoneDetail;