import ArrowLeft from "@assets/arrow_left.svg?react";
import ArrowRight from "@assets/arrow_right.svg?react";
import "./styles/SwitchCity.css";

export default function SwitchButtons({
  onSwitchClick,
  page,
}: {
  onSwitchClick: any;
  page: any;
}) {
  return (
    <>
      {page == "main" ? (
        <div>
          <button
            onClick={() => {
              onSwitchClick(false);
            }}
            className="switch-button left"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => {
              onSwitchClick(true);
            }}
            className="switch-button right"
          >
            <ArrowRight />
          </button>
        </div>
      ) : null}
    </>
  );
}
