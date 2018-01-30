import React, { PropTypes } from 'react';
import { View, Platform } from 'react-native';
import { Surface, Shape, Path, Group } from '../../react-native/Libraries/ART/ReactNativeART';
import MetricsPath from 'art/metrics/path';

let lineCap = 'butt';
export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r, startDegree, endDegree) {

    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);
    return p;
  }

  extractFill(fill) {
    if (fill == 0) {
      return 0;
    } else if (fill < 0.01 && fill > 0) {
      return 0.01;
    } else if (fill > 99.99 && fill < 100) {
      return 99.85;
    } else if (fill >= 100) {
      return 100;
    } else {
      return fill;
    }
  }

  render() {
    const { size, width, tintColor, backgroundColor, style, rotation, linecap, children, isComming } = this.props;
    let backgroundPath = '';
    let circlePath = '';
    const fill = this.extractFill(this.props.fill);
    if (isComming == 'leave') {
      backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360 * .9999);
      circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * .9999) * fill / 100);
      lineCap = 'butt';
    } else {
      backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 260);
      circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * .9999) * fill / 100);
      lineCap = 'round';
    }
    // const circlePath = { isComming== 'leave' ? this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, (360 * .9999) * fill / 100) :  };
    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation - 90} originX={size / 2} originY={size / 2}>
            <Shape d={backgroundPath}
              stroke={backgroundColor}
              strokeWidth={width} />
            <Shape d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={linecap} />
          </Group>
        </Surface>
        {
          children && children(fill)
        }
      </View>
    )
  }
}

CircularProgress.propTypes = {
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string,
  children: PropTypes.func
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  linecap: lineCap,
}
