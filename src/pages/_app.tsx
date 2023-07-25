/* eslint-disable @next/next/no-img-element */
import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";

import logoImg from "../assets/Logo(3).svg";
import Image from "next/image";
import Link from "next/link";

globalStyles();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
