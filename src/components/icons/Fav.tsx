import type { ButtonHTMLAttributes } from 'react';

const Fav = () => {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      style={{ height: '50%' }}
    >
      <g>
        <path
          d="M380.63,32.196C302.639,33.698,264.47,88.893,256,139.075c-8.47-50.182-46.638-105.378-124.63-106.879
        C59.462,30.814,0,86.128,0,187.076c0,129.588,146.582,189.45,246.817,286.25c3.489,3.371,2.668,3.284,2.668,3.284
        c1.647,2.031,4.014,3.208,6.504,3.208v0.011c0,0,0.006,0,0.011,0c0,0,0.006,0,0.011,0v-0.011c2.489,0,4.856-1.177,6.503-3.208
        c0,0-0.821,0.086,2.669-3.284C365.418,376.526,512,316.664,512,187.076C512,86.128,452.538,30.814,380.63,32.196z"
          style={{ fill: '#84d02c' }}
        ></path>
      </g>
    </svg>
  );
};

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...rest } = props;
  return (
    <button {...rest} className="w-14 h-14 bg-[#323232] rounded-full flex items-center justify-center ml-5 mr-5">
      <Fav />
    </button>
  );
};

export default Button;
