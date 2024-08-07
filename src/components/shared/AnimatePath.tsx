const AnimatePath = () => {
  return (
    <svg
      width="1005"
      height="768"
      viewBox="0 0 1005 768"
      fill="none"
      path="M117.787 82.3594C68.6242 82.3594 40.0658 122.33 88.7115 168.296C137.357 214.262 859.214 130.99 732.889 9.74644C650.653 -69.1821 30.0433 864.447 6 717.223C55.1628 601.309 859.214 820.48 963.215 679.251C1025.39 570.531 997.136 383.248 963.215 344.832"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M117.787 82.3594C68.6242 82.3594 40.0658 122.33 88.7115 168.296C137.357 214.262 859.214 130.99 732.889 9.74644C650.653 -69.1821 30.0433 864.447 6 717.223C55.1628 601.309 859.214 820.48 963.215 679.251C1025.39 570.531 997.136 383.248 963.215 344.832"
        // fill="currentColor"
        stroke="black"
        stroke-width="10"
      />

      <circle
        cx="0"
        cy="0"
        r="10"
        // x="0"
        // y="0"
        // width="20"
        // height="20"
        style={{ stroke: 'green', fill: 'red' }}
      >
        <animateMotion
          path="M117.787 82.3594C68.6242 82.3594 40.0658 122.33 88.7115 168.296C137.357 214.262 859.214 130.99 732.889 9.74644C650.653 -69.1821 30.0433 864.447 6 717.223C55.1628 601.309 859.214 820.48 963.215 679.251C1025.39 570.531 997.136 383.248 963.215 344.832"
          begin="0s"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* <path
        d="M4.5 12.5C4.5 13.3284 5.17157 14 6 14H18C18.8284 14 19.5 13.3284 19.5 12.5C19.5 11.6716 18.8284 11 18 11H6C5.17157 11 4.5 11.6716 4.5 12.5Z"
        fill="currentColor"
      />
      <path
        d="M4.5 6.5C4.5 7.32843 5.17157 8 6 8H18C18.8284 8 19.5 7.32843 19.5 6.5C19.5 5.67157 18.8284 5 18 5H6C5.17157 5 4.5 5.67157 4.5 6.5Z"
        fill="currentColor"
      />
      <path
        d="M4.5 18.5C4.5 19.3284 5.17157 20 6 20H18C18.8284 20 19.5 19.3284 19.5 18.5C19.5 17.6716 18.8284 17 18 17H6C5.17157 17 4.5 17.6716 4.5 18.5Z"
        fill="currentColor" */}
    </svg>
  );
};
export default AnimatePath;
