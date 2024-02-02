import PaidIcon from "@mui/icons-material/Paid";
import { Chip } from "@mui/material";

type TotalProps = {
	total: number;
};

export function Total({total}: TotalProps) {
	return (
		<Chip
			label={`Total - ${new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(total)}`}
			sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
			color="primary"
			icon={<PaidIcon />}
		/>
	);
}
