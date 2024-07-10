interface BrandProps {
	size?: number;
}

import React from "react";
import "./styles.scss";

const EBarBrand: React.FC<BrandProps> = () => {
	return (
		<h1 className="text-logo">
			<strong>e</strong>.bar
		</h1>
		// <img src={socialsipsvg} className="brand-img" style={styles} alt="Social Sips" />
	);
};

const Brands = { EBarBrand };

export { Brands };
