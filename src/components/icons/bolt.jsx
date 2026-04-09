const BoltIcon = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 25"
    className={className}
    {...props}
  >
    <g fill="none">
      <path
        d="M12 15V23.0359C12 24.0747 13.3876 24.4247 13.8803 23.5103L19.9902 12.1709C20.4887 11.1737 19.7633 10.0002 18.6484 10H12V6C9.5 8.5 7.87348 10.6369 7.5 15H12Z"
        fill="url(#bolt_g0)"
        mask="url(#bolt_mask)"
      />
      <path
        d="M12 15V23.0359C12 24.0747 13.3876 24.4247 13.8803 23.5103L19.9902 12.1709C20.4887 11.1737 19.7633 10.0002 18.6484 10H12V6C9.5 8.5 7.87348 10.6369 7.5 15H12Z"
        fill="url(#bolt_g0)"
        filter="url(#bolt_blur)"
        clipPath="url(#bolt_clip)"
      />
      <path
        d="M12 9V1.96408C12 0.925331 10.6124 0.575284 10.1197 1.48974L4.00979 12.8291C3.51129 13.8263 4.23674 14.9998 5.35158 15H12V9Z"
        fill="url(#bolt_g1)"
      />
      <path
        d="M10.1201 1.48889C10.6131 0.575627 11.9995 0.925489 12 1.9635V11.9996H11.25V1.9635C11.2499 1.87984 11.2247 1.83362 11.2002 1.80432C11.1708 1.76933 11.1232 1.73694 11.0615 1.72131C10.9997 1.70575 10.9419 1.71126 10.8994 1.72815C10.8639 1.74232 10.8201 1.77156 10.7803 1.84534L5.30762 11.9996H4.45605L10.1201 1.48889Z"
        fill="url(#bolt_g2)"
      />
      <defs>
        <linearGradient id="bolt_g0" x1="13.825" y1="6" x2="13.825" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
        <linearGradient id="bolt_g1" x1="7.925" y1="-2" x2="7.925" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6" />
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="bolt_g2" x1="8.228" y1=".963" x2="8.228" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="bolt_blur" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur" />
        </filter>
        <clipPath id="bolt_clip">
          <path d="M12 9V1.96408C12 0.925331 10.6124 0.575284 10.1197 1.48974L4.00979 12.8291C3.51129 13.8263 4.23674 14.9998 5.35158 15H12V9Z" />
        </clipPath>
        <mask id="bolt_mask">
          <rect width="100%" height="100%" fill="#FFF" />
          <path d="M12 9V1.96408C12 0.925331 10.6124 0.575284 10.1197 1.48974L4.00979 12.8291C3.51129 13.8263 4.23674 14.9998 5.35158 15H12V9Z" fill="#000" />
        </mask>
      </defs>
    </g>
  </svg>
);

export default BoltIcon;
