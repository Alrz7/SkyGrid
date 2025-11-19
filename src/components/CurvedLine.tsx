import { useEffect, useRef } from "react";
import CurvedLine from "../assets/roadLine.svg?react";
import "./styles/CurvedLine.css";

export default function CurvedLineComp({ setLocation }: { setLocation: any }) {
  const svgRef = useRef<SVGSVGElement>(null);

  const getSVGCorners = () => {
    if (!svgRef.current) return null;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();

    const corners = {
      topLeft: { x: rect.left, y: rect.top },
      topRight: { x: rect.right, y: rect.top },
      bottomLeft: { x: rect.left, y: rect.bottom },
      bottomRight: { x: rect.right, y: rect.bottom },
      width: rect.width,
      height: rect.height,
    };
    console.log("۴ گوشه SVG:", corners);

    const locDatas = getDynamicParabola(
      corners.width,
      corners.topLeft.y
      // corners.bottomRight.y
    );
    console.log(locDatas);

    let entPoint = 0.8;
    let calPoint = 0;
    if (entPoint < 0.5) {
      calPoint = 1 - entPoint;
    } else if (entPoint > 0.5) {
      calPoint = 1 - entPoint;
    } else {
      calPoint = entPoint;
    }
    const x = window.innerWidth * calPoint - window.innerWidth / 2;
    const y = locDatas.a * (x + locDatas.h) ** 2 + locDatas.k;
    console.log([window.innerWidth * entPoint, y]);
    setLocation([window.innerWidth * entPoint, y]);
  };

  useEffect(() => {
    const handleResize = () => {
      getSVGCorners();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <CurvedLine className="curved-line" ref={svgRef} />;
}

const getDynamicParabola = (svgWidth: number, svgTop: number) => {
  const scale = svgWidth / 874;

  const a = 0.001 * (1 / scale);
  const h = -40 * scale;
  const k = svgTop - 12 * scale - 45;

  return { a, h, k };
};
