/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { useRouter } from 'next/router';
import { useState, useEffect, createContext, useContext } from 'react';
import { PDfContext } from './_app';

Font.register({ family: 'Inter', src: '/Inter/Inter.ttf' });

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingHorizontal: 30,
    fontFamily: 'Inter',
  },
});

const userContext = createContext(null);

const PDF = ({ templateData }: { templateData: any }) => {
  return (
    <>
      {templateData && (
        <Document>
          <Page style={styles.body}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Text wrap={false} style={{ alignSelf: 'flex-end' }}>
                {templateData}
              </Text>
            </View>
            <View>
              <Image src='vercel.svg' />
            </View>
          </Page>
        </Document>
      )}
    </>
  );
};
const PDFView = () => {
  const [client, setClient] = useState(false);
  const [userState, setUserState] = useState('');
  const templateContext = useContext(PDfContext)

  useEffect(() => {
    setUserState('Ping user one');
  }, []);

  useEffect(() => {
    setClient(true);
  }, []);

  return <PDFViewer>{<PDF templateData={templateContext} />}</PDFViewer>;
};
export default PDFView;
