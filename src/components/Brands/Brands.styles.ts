import styled from "styled-components";

const BrandImg = styled.img`
	height: auto;
	object-fit: cover;
`;

const TextLogo = styled.h1`
	font-size: 28px;
	color: ${({ theme }) => theme.colors.secondary};
	width: fit-content;
`;

const PrimaryText = styled.strong`
	color: ${({ theme }) => theme.colors.primary};
	width: fit-content;
`;

export default  {
	BrandImg,
	PrimaryText,
	TextLogo,
};
