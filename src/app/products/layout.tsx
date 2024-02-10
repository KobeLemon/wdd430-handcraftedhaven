import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <>
    
      {children}
    
    </>

  )

}