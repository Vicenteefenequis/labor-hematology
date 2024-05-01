import * as React from 'react'

function Logo({ width = 149, height = width * 1.02, ...props }) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 149 152"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 9.56C0 4.28 4.332 0 9.675 0H26.53a16.57 16.57 0 0110.43 3.685l5.128 4.155.128.115c.118-.04.236-.078.355-.115 9.25-2.928 20.474-3.485 31.929-3.485 11.455 0 22.678.557 31.929 3.485.118.037.237.076.355.115l.128-.115 5.128-4.155A16.567 16.567 0 01122.469 0h16.856C144.668 0 149 4.28 149 9.56v5.91c0 4.572-1.949 8.933-5.37 12.012l-4.136 3.724a17.48 17.48 0 01-7.076 3.863l-.978.268c3.832 9.036 5.95 18.694 5.95 26.508 0 31.431-19.683 45.006-37.026 56.967C86.706 128.231 74.5 136.65 74.5 152c0-15.35-12.206-23.769-25.864-33.188C31.293 106.851 11.61 93.276 11.61 61.845c0-7.813 2.118-17.472 5.95-26.508l-.978-.269a17.477 17.477 0 01-7.076-3.862L5.37 27.482A16.164 16.164 0 010 15.47V9.56zM87.078 87.54c0 1.502-.663 2.942-1.842 4.004-1.18 1.062-2.779 1.658-4.447 1.658-1.44 0-2.83-.445-3.941-1.25 1.892 5.005 6.735 9.747 14.1 2.121 6.502-7.085-.289-22.03-6.905-30.899-2.206-2.956-5.826-4.379-9.543-4.379-3.717 0-7.337 1.423-9.543 4.38-6.616 8.867-13.407 23.813-6.905 30.898 7.365 7.626 12.208 2.884 14.1-2.12-1.112.804-2.5 1.25-3.94 1.25-1.669 0-3.269-.597-4.448-1.659-1.18-1.062-1.842-2.502-1.842-4.004h25.156zm-36.662-44.24h-17.52l13.808 10.924c3.038 2.404 7.48 1.636 9.36-1.62 2.373-4.108-.78-9.303-5.648-9.303zm48.168 0h17.52l-13.808 10.924c-3.038 2.404-7.48 1.636-9.36-1.62-2.373-4.108.78-9.303 5.648-9.303z"
				fill="#2CAC5B"
			/>
		</svg>
	)
}

export default Logo
