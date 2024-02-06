import { Metadata } from 'next';

type Props = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: {
      default: 'Casa Eficiente',
      template: 'Casa Eficiente',
    },
  };
  

export default function RootLayout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    );
}