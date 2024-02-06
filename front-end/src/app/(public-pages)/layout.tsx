import MainContainerAuth from '@/compenents/MainContainerAuth';
import '@/styles/global.css';
import { Metadata } from 'next';

type Props = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: {
      default: 'Casa Eficiente',
      template: 'Casa Eficiente',    },
  };

export default function RootLayout({ children }: Props) {
    return (
    <html lang="en">
      <body>
        <MainContainerAuth>
            {children}
        </MainContainerAuth>
      </body>
    </html>
    );
}