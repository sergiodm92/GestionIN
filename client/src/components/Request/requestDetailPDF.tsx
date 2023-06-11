import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { PostRequest } from '../../types/requestsInterfaces';
import { types, sizes, colors } from '../arrays';

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
  row:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    textAlign: 'justify',
    gap: 15
  },
  lastRow:{
    display: 'flex',
    flexDirection: 'row',
    marginTop:10,
    textAlign: 'justify',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
  },
  footer:{
    width: '100vh',
    display: 'flex',
    alignItems: 'flex-end'
  },
  itemSignature:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap:5
  },
  itemTitle: {
    fontSize: '1.2vh',
    color:'#43815A',
    fontWeight: 'semibold',
    fontFamily: 'Times-Roman'
  },
  itemText: {
    fontSize: '1.5vh',
    fontWeight: 'light',
    fontFamily: 'Times-Italic'
  },
  pharagraph:{
    fontSize: '1.5vh',
    fontFamily: 'Times-Roman'
  }
});

const PDFDetail = (data: PostRequest) => {
    const { request, deceased } = data;

    const date = new Date(request.date)

    const currentDay = date.getDay() < 10
                        ? "0" + date.getDay()
                        : date.getDay()
    const dayOfWeek = date.toLocaleString('es', { weekday: 'long' })
    const currentMonth = date.toLocaleString('es', { month: 'long' })
    const currentYear = date.getFullYear()

    const decomposeId = (id: string)=>{
        const typeInitials = id.slice(2, 4);
        const sizeInitials = id.slice(4, 6);
        const colorInitials = id.slice(6, 8);
        const metalBoxInitials = id.slice(8);

        const type = types.find((t) => t.initials === typeInitials)?.name || "";
        const size = sizes.find((s) => s.initials === sizeInitials)?.name || "";
        const color = colors.find((c) => c.initials === colorInitials)?.name || "";
        const metalBox = metalBoxInitials === "TR" ? "Si" : "No";

        return `Tipo: ${type}, Medida: ${size}, Color: ${color}, Caja metálica: ${metalBox}`
    }

  return (
    <Document>
      <Page size="A4" style={{paddingBottom: '4vh'}}>
        <View>
          <View style={styles.letterhead} fixed>
            <Image src="https://res.cloudinary.com/dk2al2urj/image/upload/v1685158810/DR%20full%20code/Instituto_del_norte_-_Membrete_ku2fzh.png" />
          </View>
          <View style={styles.container}>
            <View style={styles.date}>
                <Text>{`${request.place}, ${dayOfWeek} ${currentDay} de ${currentMonth} del ${currentYear}`}</Text>
            </View>
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
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Fecha:</Text>
                        <Text style={styles.itemText}> {new Date(deceased.dod).toLocaleDateString("es")}</Text>
                    </View>
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
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Parentesco:</Text>
                        <Text style={styles.itemText}> {request.holder_relationship}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>N° de Certificado:</Text>
                        <Text style={styles.itemText}> {request.certificate_number}</Text>
                    </View>
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
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Convenio:</Text>
                        <Text style={styles.itemText}> {request.agreement}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Ataúd:</Text>
                        <Text style={styles.itemText}> {decomposeId(request.id_coffin)}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Adicional:</Text>
                        <Text style={styles.itemText}> {request.additional}</Text>
                    </View>
                    <View style={styles.items}>
                        <Text style={styles.itemTitle}>Corona:</Text>
                        <Text style={styles.itemText}> {request.wreath ? "Si" : "No"}</Text>
                    </View>
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
                <View style={styles.lastRow}>
                    <Text style={styles.pharagraph}>Por la presente doy conformidad por un servicio de Sepelio efectuado conforme a las condiciones de la póliza contratada en Servicios Sociales Instituto del Norte S.A.</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.pharagraph}>Por lo tanto la Empresa ha cumplido en forma satisfactoria con todo lo convenido y no admitirá reclamo alguno en el futuro.</Text>
                </View>
                <View style={styles.lastRow}>
                    <View style={styles.footer}>
                        <View style={styles.itemSignature}>
                            <Text style={styles.itemText}>_____________________________</Text>
                            <Text style={styles.itemText}> Firma</Text>
                            <Text style={styles.itemText}>Apellido y Nombre:______________________________</Text>
                            <Text style={styles.itemText}>N° de Documento:_______________________________</Text>
                            <Text style={styles.itemText}>Domicilio:_____________________________________</Text>
                            <Text style={styles.itemText}>Teléfono:______________________________________</Text>
                        </View>
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
