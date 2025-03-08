export const LoadingCircleSvg = ({ size = 16 }: { size?: number }) => {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx={size / 2 + 1}
        cy={size / 2 + 1}
        r={size / 2 - 2}
        style={{
          stroke: "currentColor",
          fill: "none",
          strokeWidth: "2px",
          strokeDasharray: "2",
        }}
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          dur="2s"
          type="rotate"
          from={`0 ${size / 2 + 1} ${size / 2 + 1}`}
          to={`360 ${size / 2 + 1} ${size / 2 + 1}`}
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
