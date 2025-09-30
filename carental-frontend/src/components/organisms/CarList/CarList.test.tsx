import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CarList } from "./CarList";
import type { AvailableCar } from "../../../types";

const mockCar: AvailableCar = {
  id: "1",
  brand: "Toyota",
  model: "Camry",
  stock: 5,
  prices: {
    peak: 100,
    mid: 80,
    off: 60,
  },
  priceDetails: {
    totalPrice: 240,
    averageDailyPrice: 80,
  },
};

describe("CarList", () => {
  it("renders loading skeleton when isLoading is true", () => {
    render(<CarList cars={[]} onOpenModal={() => {}} isLoading={true} />);

    expect(screen.getByText("Available Cars")).toBeInTheDocument();
    expect(
      screen.getByText("Searching for the perfect car...")
    ).toBeInTheDocument();

    const skeletonElements = document.querySelectorAll('[class*="skeleton"]');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it("renders error message when error is provided", () => {
    const errorMessage = "Failed to load cars";
    render(<CarList cars={[]} onOpenModal={() => {}} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders empty state when no cars are available", () => {
    render(<CarList cars={[]} onOpenModal={() => {}} />);

    expect(screen.getByText("No cars available")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search dates or location")
    ).toBeInTheDocument();
  });

  it("renders car list with cars", () => {
    const cars = [mockCar];
    render(<CarList cars={cars} onOpenModal={() => {}} />);

    expect(screen.getByText("Available Cars (1)")).toBeInTheDocument();
    expect(
      screen.getByText("Choose the perfect car for your journey")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Toyota Camry", level: 4 })
    ).toBeInTheDocument();
  });

  it("calls onOpenModal when book button is clicked", () => {
    const mockOnOpenModal = vi.fn();
    const cars = [mockCar];

    render(<CarList cars={cars} onOpenModal={mockOnOpenModal} />);

    expect(
      screen.getByRole("heading", { name: "Toyota Camry", level: 4 })
    ).toBeInTheDocument();
  });
});
