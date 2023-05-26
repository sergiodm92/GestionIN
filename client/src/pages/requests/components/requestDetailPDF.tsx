import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { PostRequest } from '../../../types/requestsInterfaces';

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
    marginBottom: 15
  },
  row:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    textAlign: 'justify'
  },
  lastRow:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:40,
    marginBottom: 10,
    textAlign: 'justify',
  },
  items: {
    display: 'flex',
    flexDirection: 'row'
    
  },
  itemSignature:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap:5
  },
  itemTitle: {
    fontSize: '1.5vh',
    fontWeight: 'semibold',
    fontFamily: 'Times-Roman'
  },
  itemText: {
    fontSize: '1.5vh',
    fontWeight: 'light',
    fontFamily: 'Times-Italic'
  }
});

const PDFDetail = (data: PostRequest) => {
  const { request, deceased } = data;
  return (
    <Document>
      <Page size="A4" style={{paddingBottom: '4vh'}}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685133684/DR%20full%20code/Instituto_del_norte_-_Membrete_apivse.png" />
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Solicitud de Siniestro</Text>
            </View>
            <View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Apellido y Nombre del fallecido:</Text>
                        <Text style={styles.itemText}> {deceased.name}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Lugar de Fallecimiento:</Text>
                        <Text style={styles.itemText}> {deceased.pod}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Fecha:</Text>
                        <Text style={styles.itemText}> {new Date(deceased.dod).toLocaleDateString("es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Hora:</Text>
                        <Text style={styles.itemText}> {`${
                            new Date(deceased.dod).getHours() < 10
                                ? "0" + new Date(deceased.dod).getHours()
                                : new Date(deceased.dod).getHours()
                            } : ${
                            new Date(deceased.dod).getMinutes() < 10
                                ? "0" + new Date(deceased.dod).getMinutes()
                                : new Date(deceased.dod).getMinutes()
                            }`}
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Fecha de Nacimiento:</Text>
                        <Text style={styles.itemText}>{new Date(deceased.dob).toLocaleDateString("es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>DNI:</Text>
                        <Text style={styles.itemText}>{deceased.dni}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Lugar de velatorio:</Text>
                        <Text style={styles.itemText}> {request.funeral}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Nombre del Titular:</Text>
                        <Text style={styles.itemText}> {request.holder_name}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Parentesco:</Text>
                        <Text style={styles.itemText}> {request.holder_relationship}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>N° de Certificado:</Text>
                        <Text style={styles.itemText}> {request.cetificate_number}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Póliza:</Text>
                        <Text style={styles.itemText}> {request.policy}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Forma que paga el seguro:</Text>
                        <Text style={styles.itemText}> {request.way_to_pay}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Convenio:</Text>
                        <Text style={styles.itemText}> {request.agreement}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Ataúd:</Text>
                        <Text style={styles.itemText}> {request.id_coffin}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Adicional:</Text>
                        <Text style={styles.itemText}> {request.additional}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Corona:</Text>
                        <Text style={styles.itemText}> {request.wreath ? "Si" : "No"}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Presente de funeral:</Text>
                        <Text style={styles.itemText}> {request.present}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Cementerio:</Text>
                        <Text style={styles.itemText}> {request.cementery}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Lugar de inhumación:</Text>
                        <Text style={styles.itemText}> {request.burial_place}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Hora:</Text>
                        <Text style={styles.itemText}> {request.burial_time}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Revestimiento:</Text>
                        <Text style={styles.itemText}> {request.cladding}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Mejoramiento del servicio:</Text>
                        <Text style={styles.itemText}> {request.service_improvement}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Texto de Placa:</Text>
                        <Text style={styles.itemText}> {deceased.leyend}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Esquela:</Text>
                        <Text style={styles.itemText}> {deceased.news_paper}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Nombre del Diario:</Text>
                        <Text style={styles.itemText}> {deceased.news_paper_name}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.itemTitle}>            Por la presente doy conformidad por un servicio de Sepelio efectuado conforme a las condiciones de la póliza contratada en Servicios Sociales Instituto del Norte S.A.</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.itemTitle}>            Por lo tanto la Empresa ha cumplido en forma satisfactoria con todo lo convenido y no admitirá reclamo alguno en el futuro.</Text>
                </View>
                <View style={styles.lastRow}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Lugar y Fecha:</Text>
                        <Text style={styles.itemText}> {request.place} {new Date(request.date).toLocaleDateString("es")}</Text>
                    </View>
                    <View style={styles.itemSignature}>
                        <Text style={styles.itemTitle}>_____________________________</Text>
                        <Text style={styles.itemText}> Firma</Text>
                        <Text style={styles.itemTitle}>Apellido y Nombre:______________________________</Text>
                        <Text style={styles.itemTitle}>N° de Documento:_______________________________</Text>
                        <Text style={styles.itemTitle}>Domicilio:_____________________________________</Text>
                        <Text style={styles.itemTitle}>Teléfono:______________________________________</Text>
                    </View>
                </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDetail;
