interface BrandProps {
	size: number;
}

import React, { useMemo } from "react";
import jobucsvg from "../../assets/jobuc_logo.svg";
import socialsipsvg from "../../assets/socialsips_logo.svg";
import "./styles.scss";

const JobucBrand: React.FC<BrandProps> = ({ size }) => {
	const styles: React.CSSProperties = useMemo(() => ({ width: size }), [size]);

	return (
		<>
			{/* <img
				src={jobucsvg}
				className="brand-img"
				alt="JOBUC Club"
				style={styles}
			/> */}
		</>
	);
};

const SocialSipsBrand: React.FC<BrandProps> = ({ size }) => {
	const styles: React.CSSProperties = useMemo(() => ({ width: size }), [size]);

	return (
		<h1 className="text-logo">
			<strong>e</strong>.bar
		</h1>
		// <img src={socialsipsvg} className="brand-img" style={styles} alt="Social Sips" />
	);
};

const Brands = { JobucBrand, SocialSipsBrand };

export { Brands };
