import ContainerAuth from "@/compenents/container-auth";

type Props = {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <ContainerAuth>
          {children}
        </ContainerAuth>
    );
} 