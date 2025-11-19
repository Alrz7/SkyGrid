import { useEffect } from "react";
import CurvedLine from "../assets/roadLine.svg?react";
import "./styles/CurvedLine.css";

export default function CurvedLineComp({ city }: { city: string }) {
  return <CurvedLine className="curved-line" />;
}
