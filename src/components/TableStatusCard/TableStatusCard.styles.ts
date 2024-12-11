import styled from "styled-components";
import { shouldForwardProp } from "../../styles";

const TableItem = styled.div.withConfig({
	shouldForwardProp,
})<{
	active?: boolean;
}>``;

export default {
	TableItem,
};
