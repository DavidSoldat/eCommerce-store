import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { groupBrandsByLetter } from "../utils/helpers";
import { getBrands } from "../utils/api/products";

export default function Brandspage() {
  // const brands = {
  //   A: ["Alexander McQueen", "Armani", "Acne Studios"],
  //   B: [
  //     "Balenciaga",
  //     "Bottega Veneta",
  //     "Burberry",
  //     "Balmain",
  //     "Brunello Cucinelli",
  //   ],
  //   C: ["Chanel", "Christian Dior", "Celine", "Calvin Klein"],
  //   F: ["Fendi", "Ferragamo", "Fenty"],
  //   G: ["Gucci", "Givenchy", "Golden Goose"],
  //   H: ["Hermès", "Hugo Boss"],
  //   L: ["Louis Vuitton", "Loewe"],
  //   M: ["Moncler", "Maison Margiela", "Miu Miu", "Max Mara"],
  //   P: ["Prada", "Philipp Plein", "Polo Ralph Lauren"],
  //   S: ["Saint Laurent", "Stella McCartney", "Salvatore Ferragamo"],
  //   V: ["Valentino", "Versace", "Vetements"],
  //   Z: ["Zara", "Zegna", "Zadig & Voltaire"],
  // };

  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    async function fetchBrands() {
      const response = await getBrands();
      setBrands(response);
    }

    fetchBrands();
  }, []);

  const groupedBrands: Record<string, { id: number; name: string }[]> =
    groupBrandsByLetter(brands);
  return (
    <div className="mx-auto h-full max-w-[1240px] px-4">
      <Divider />

      <div className="min-h-screen p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Our brands</h1>
        <div className="mx-auto my-8 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.keys(groupedBrands)
            .sort()
            .map((letter) => (
              <div
                key={letter}
                className="rounded-lg bg-[#f0f0f0] p-6 shadow-sm"
              >
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  {letter}
                </h2>

                <ul className="space-y-2">
                  {groupedBrands[letter].map((brand) => (
                    <li
                      key={brand.id}
                      className="text-lg text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {brand.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
