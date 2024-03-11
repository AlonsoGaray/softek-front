interface Props {
  color: string;
  width: string;
  height: string;
  rotate?: boolean;
}

export const Arrow = ({ color, width, height, rotate }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clipPath="url(#clip0_6991_236)"
      transform={rotate ? 'rotate(180 12 12)' : ''}
    >
      <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" />
      <path
        d="M12.9715 15.9037L9.06396 11.9999L12.9715 8.09619L14.029 9.15369L11.1865 11.9999L14.029 14.8462L12.9715 15.9037Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_6991_236">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
