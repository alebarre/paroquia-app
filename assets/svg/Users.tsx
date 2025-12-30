import * as React from "react";
import Svg, { Path } from "react-native-svg";
import SVGComponent from "./GoogleLogo";
const Users = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 11C7.20914 11 9 9.20914 9 7C9 4.79086 7.20914 3 5 3C2.79086 3 1 4.79086 1 7C1 9.20914 2.79086 11 5 11Z"
      stroke="#000000ff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3C12.8604 3.2203 13.623 3.7207 14.1676 4.42231C14.7122 5.12392 15.0078 5.98683 15.0078 6.875C15.0078 7.76317 14.7122 8.62608 14.1676 9.32769C13.623 10.0293 12.8604 10.5297 12 10.75"
      stroke="#000000ff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="#000000ff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 20.87V18.87C22.9993 17.9837 22.7044 17.1228 22.1614 16.4223C21.6184 15.7219 20.8581 15.2216 20 15"
      stroke="#000000ff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Users;
