interface BrandProps {
	size?: number;
}

import React from "react";
import { S } from "./Brands.styles";

const EBarBrand: React.FC<BrandProps> = () => {
	return (
		<S.TextLogo>
			<strong>e</strong>.bar
		</S.TextLogo>
		// <img src={socialsipsvg} className={s.brandImg} style={styles} alt="Social Sips" />
	);
};

const Brands = { EBarBrand };

export default Brands;
