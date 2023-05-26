import {Page, Text, View, Document, Image} from '@react-pdf/renderer';
import { PostRequest } from '../../../types/requestsInterfaces';

const PDFDetail = (data: PostRequest)=>{
    const {request, deceased}= data
    console.log(request)    
    console.log(deceased)    
    let fecha = new Date().toLocaleDateString('es')
    return (
        <Document>
            <Page size='A4'>
                <View>
                    {/* <View style={{width:"100%"}}>
                        <Image src="/public/logo.png"/>
                    </View> */}
                    <View style={{margin:"4vh", marginTop:0}}>
                        <View>
                            <Text style={{fontSize:"1.5vh", textAlign:"right", fontFamily:"Helvetica"}}>Fecha de emisión: {fecha}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
export default PDFDetail