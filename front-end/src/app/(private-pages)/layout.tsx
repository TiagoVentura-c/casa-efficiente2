import '@/styles/global.css';
import GlobalNav from '@/compenents/global-nav';
import MainContainer from '@/compenents/MainContainer';
import { Metadata } from 'next';
import DescriptionAlerts from '@/compenents/alert';


type Props = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: {
      default: 'Casa Eficiente',
      template: 'Propylea',    },
  };

export default function RootLayout({ children }: Props) {
    return (
    <html lang="en">
      <body>
        <MainContainer>
            <GlobalNav/>
            {children}
        </MainContainer>
      </body>
    </html>
    );
}