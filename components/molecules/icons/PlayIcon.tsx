export function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
    >
      <g filter="url(#filter0_d_114_19821)">
        <circle
          cx="26.9453"
          cy="25.498"
          r="22"
          fill="url(#paint0_radial_114_19821)"
        />
      </g>
      <path
        d="M37.7969 25.4964L21.5245 34.8913L21.5245 16.1016L37.7969 25.4964Z"
        fill="#343434"
      />
      <defs>
        <filter
          id="filter0_d_114_19821"
          x="0.945312"
          y="0.498047"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_114_19821"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_114_19821"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_114_19821"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(26.9453 25.498) rotate(90) scale(27.6557)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#FEFEFE" />
        </radialGradient>
      </defs>
    </svg>
  );
}
