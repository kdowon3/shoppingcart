"use client";

import React from "react";
import { GNB } from "../../components/GNB";
import { GNB_TYPE, PRODUCTS } from "../../constants/common";
import styled from "@emotion/styled";
import { Product } from "../../components/Product";
import { Box } from "../../styles/StyleComponent";
import { useCartStore } from "../../store/CartStore"; // zustand store import

function HomePage() {
  const addToCart = useCartStore((state) => state.addToCart); // zustand의 addToCart 함수 사용

  return (
    <Base>
      <GNB type={GNB_TYPE.MAIN} />
      <Inner>
        <Box gap={30}>
          {PRODUCTS.map((product, id) => (
            <Product key={id} product={product} addToCart={addToCart} /> // addToCart 전달
          ))}
        </Box>
      </Inner>
    </Base>
  );
}

export default HomePage;

const Base = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 72px 20px 69px;
`;
