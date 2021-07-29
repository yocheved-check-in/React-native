import * as React from "react";

import Svg, { Path } from "react-native-svg";

interface EyeProps {
}

export default class Eye extends React.PureComponent<EyeProps> {

  render() {
    return (
      <Svg width={11} height={11} viewBox="0 0 8 8">
        <Path
          d="M3.791.4A3.587 3.587 0 0 0 .205 3.988a3.586 3.586 0 1 0 7.172 0A3.587 3.587 0 0 0 3.791.4z"
          fill="#000"
          fillRule="evenodd"
        />
      </Svg>
    );
  }
}
