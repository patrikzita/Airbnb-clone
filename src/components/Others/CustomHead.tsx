import Head from "next/head";
import type { ReactNode } from "react";

type CustomHeadProps = {
  children: ReactNode;
  title: string;
  description: string;
};

const CustomHead = ({ title, description, children }: CustomHeadProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </>
  );
};

export default CustomHead;
