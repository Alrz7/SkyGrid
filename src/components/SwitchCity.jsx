import ArrowLeft from "../assets/arrow_left.svg?react";
import ArrowRight from "../assets/arrow_right.svg?react";
import "./styles/SwitchCity.css";

export default function SwitchButtons(props) {
  return (
    <div>
      <button onClick={() => {props.onSwitchClick(false)}} className="switch-button left">
        <ArrowLeft />
      </button>
      <button onClick={() => {props.onSwitchClick(true)}} className="switch-button right">
        <ArrowRight />
      </button>
    </div>
  );
}
