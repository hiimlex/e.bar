import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "react-feather";
import "./styles.scss";

interface SalesWaitersProps {}

const SalesWaiters: React.FC<SalesWaitersProps> = () => {
	const [addedEvent, setAddedEvent] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [showOverlay, setShowOverlay] = useState(false);

	const scrollToLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
		}
	};

	const handleScroll = (event: Event) => {
		if (event.target) {
			const target = event.target as HTMLDivElement;
			const showOverlay = target.scrollLeft > 0;

			setShowOverlay(showOverlay);
		}
	};

	useEffect(() => {
		if (containerRef.current && !addedEvent) {
			containerRef.current.addEventListener("scroll", handleScroll);

			setAddedEvent(true);
		}

		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener("scroll", handleScroll);
			}
		};
	}, [containerRef]);

	return (
		<main className="sales-waiters" ref={containerRef}>
			<section
				className={`sales-waiters-labels ${
					showOverlay ? "sales-waiters-labels-sticky" : ""
				}`}
			>
				<header className="sales-waiters-header no-background no-padding">
					<span>Garçons</span>
				</header>
				<main className="sales-waiters-content no-background no-padding flex-center">
					<span>Pedidos</span>
				</main>
				<footer className="sales-waiters-footer no-background no-padding">
					<span>Valor Total</span>
				</footer>
			</section>
			<section className="sales-waiters-wrapper">
				<header className="sales-waiters-header sales-waiters-grid">
					<span className="sales-waiters-grid-item flex-center sales-waiters-header-title">
						Mateus
					</span>
					<div className="dashline-vertical" />
					<span className="sales-waiters-grid-item flex-center sales-waiters-header-title">
						Lucas
					</span>
					<div className="dashline-vertical" />
					<span className="sales-waiters-grid-item flex-center sales-waiters-header-title">
						---
					</span>
				</header>
				<main className="sales-waiters-content sales-waiters-grid">
					<div className="sales-waiters-grid-item sales-waiters-grid-list">
						{/* {Array.from({ length: 5 }).map((_, index) => (
							<SalesWaitersOrder id={index} key={index} />
						))} */}
					</div>

					<div className="dashline-vertical" />

					<div className="sales-waiters-grid-item sales-waiters-grid-list">
						{/* {Array.from({ length: 1 }).map((_, index) => (
							<SalesWaitersOrder id={index} key={index} />
						))} */}
					</div>

					<div className="dashline-vertical" />

					<div className="sales-waiters-grid-item sales-waiters-grid-list">
						<div className="sales-waiters-content-empty">
							Nenhum pedido encontrado
						</div>
					</div>
				</main>
				<footer className="sales-waiters-footer sales-waiters-grid">
					<div className="sales-waiters-grid-item flex-center">
						<div className=" sales-waiters-footer-title text-currency">
							<span>R$</span>
							<span>300</span>
						</div>
					</div>
					<div className="dashline-vertical" />
					<div className="sales-waiters-grid-item flex-center">
						<div className=" sales-waiters-footer-title text-currency">
							<span>R$</span>
							<span>300</span>
						</div>
					</div>
					<div className="dashline-vertical" />
					<div className="sales-waiters-grid-item flex-center">
						<div className="sales-waiters-footer-title text-currency">
							<span>R$</span>
							<span>0</span>
						</div>
					</div>
				</footer>
			</section>

			{showOverlay && (
				<div className="scroll-to-left button-rounded" onClick={scrollToLeft}>
					<ArrowLeft />
				</div>
			)}
		</main>
	);
};

export { SalesWaiters };
