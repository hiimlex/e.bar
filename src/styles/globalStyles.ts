import { createGlobalStyle } from "styled-components";
import { hexPercentage } from "./theme";

export const GlobalStyles = createGlobalStyle`
	#root {
		display: flex;
		flex: 1;
	}

html {
	font-family: "Montserrat", sans-serif;
	margin: 0;
	padding: 0;
	background: ${({ theme }) => theme.colors.background};
	overflow-y: auto;
	overflow-x: hidden;
	width: 100%;
	height: 100%;
	line-height: 140%;
}

body {
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	height: 100%;
}

button,
select,
textarea,
input {
	font-family: "Montserrat", sans-serif;
}

* {
	box-sizing: border-box;
	margin: 0;
	outline: none;
}


::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: ${({ theme }) => theme.colors.secondary + hexPercentage[20]};
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: ${({ theme }) => theme.colors.secondary};
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	cursor: auto;
	opacity: 0.8;
}

@media (max-width: 768px) {
	html,
	body {
		&::-webkit-scrollbar {
			display: none;
		}
	}

	::-webkit-scrollbar {
		display: none;
	}
}
`;
