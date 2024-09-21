import { Button } from "../../../components/Button";
import { GNB } from "../../../components/GNB";
import { GNB_TYPE, PRODUCTS } from "../../../constants/common";
import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";  // next/link 사용
import { useRouter } from 'next/router';  // useRouter로 동적 라우팅 처리
import { useCartStore } from "../../../store/CartStore";  // zustand 스토어 불러오기

function ProductPage() {
  const router = useRouter();
  const { id } = router.query;  // URL에서 id 추출
  const cart = useCartStore((state) => state.cart);  // zustand에서 cart 가져오기
  const setCart = useCartStore((state) => state.setCart);  // zustand에서 setCart 가져오기
  const product = PRODUCTS.find((item) => item.id === parseInt(id));  // id로 제품 찾기

  const handleCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      alert("이미 장바구니에 추가된 상품입니다.");
      return;
    }
    const newCart = [...cart, product];
    setCart(newCart);
    alert("장바구니에 추가되었습니다.");
  };

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;  // 제품이 없을 경우 처리
  }

  return (
    <Base>
      <GNB type={GNB_TYPE.BACK} pageName="상품 상세" />
      <Inner>
        <Title>
          상품 이름: <Highlight>{product.name}</Highlight>
        </Title>
        <Desc>
          <Highlight>{product.description}</Highlight>
        </Desc>
        <Price>
          상품 가격: <Highlight>{product.price}원</Highlight>
        </Price>
        <Button onClick={() => handleCart(product)}>장바구니 담기</Button>
        <Link href={`/product/${product.id}`}>
          <Button>제품 설명 보기</Button>
        </Link>  {/* Link로 라우팅 처리 */}
      </Inner>
    </Base>
  );
}

export default ProductPage;

const Base = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  padding: 72px 20px 69px;
`;

const Text = styled.div`
  font-family: "Pretendard Variable", sans-serif;
  color: black;
  text-align: start;
  word-break: break-all;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: 500;
  line-height: 135%;
`;

const Desc = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  line-height: 135%;
`;

const Price = styled(Text)`
  font-size: 24px;
  font-weight: 500;
  line-height: 135%;
`;

const Highlight = styled.span`
  background: linear-gradient(to bottom, pink 70%, transparent 60%);
  background-size: 100% 40%;
  background-repeat: no-repeat;
  background-position: 0 100%;
`;
