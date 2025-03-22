import type { ButtonHTMLAttributes } from 'react';

const Cancel = () => {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{ height: '50%' }}
    >
      <g>
        <polygon
          className="st0"
          points="512,52.535 459.467,0.002 256.002,203.462 52.538,0.002 0,52.535 203.47,256.005 0,459.465 
        52.533,511.998 256.002,308.527 459.467,511.998 512,459.475 308.536,256.005"
          style={{ fill: '#fb2780' }}
        ></polygon>
      </g>
    </svg>
  );
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...rest } = props;
  return (
    <button {...rest} className="w-14 h-14 bg-[#323232] rounded-full flex items-center justify-center ml-5 mr-5">
      <Cancel />
    </button>
  );
};

export default Button;
