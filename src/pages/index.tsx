import React from "react";
import Head from "next/head";
import { useKeenSlider } from "keen-slider/react";
import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";

//npm i keen-slider para o carrocel
import "keen-slider/keen-slider";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shope</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <>
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                // usado para evitar que o next fique lendo o link sem ser nescessario e pese o servidor
                prefetch={false}
              >
                <Product className="keen-slider__slide">
                  <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt=""
                  />
                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>
                </Product>
              </Link>
            </>
          );
        })}
      </HomeContainer>
    </>
  );
}
// usa o servidor do react para devolver uma api usado apenas para api mas nem sempre se usa pois demora a resposta para o usuario
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
  };
};
