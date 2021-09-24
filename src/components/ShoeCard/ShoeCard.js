import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const renderVariantFlag = (variant) => {
    switch (variant) {
      case "on-sale":
        return <VariantFlag style={{'--color': COLORS.primary}}>Sale</VariantFlag>;
      case "new-release":
        return <VariantFlag style={{'--color': COLORS.secondary}}>Just Released!</VariantFlag>;
      default:
        return null;
    }
  };
  const PriceTag =
    variant === "on-sale" ? (
      <OldPrice>{formatPrice(price)}</OldPrice>
    ) : (
      <Price>{formatPrice(price)}</Price>
    );

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {renderVariantFlag(variant)}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {PriceTag}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const VariantFlag = styled.span`
  position: absolute;
  background-color: var(--color);
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.mediumbold};
  padding: 6px;
  font-size: 0.875rem;
  border-radius: 2px;
  right: -4px;
  top: 12px;
  
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 auto;
  width: 300px;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const OldPrice = styled.span`
  text-decoration-line: line-through;
  color: ${COLORS.gray[700]};
`;

export default ShoeCard;
