import React, { Component } from 'react';
import { Link } from 'react-router';
import map from 'lodash/map';
import classNames from 'classnames';

const ColorPicker = ({ colors, current: { asset, type, color }, urlPrefix, onClick }) => {
  if (Object.keys(colors).length < 2) return <div />;

  return (
    <div className="colorPicker">
      {map(colors, colorItem => {
        const isActive = color === colorItem.id;
        const className = classNames('color', colorItem.id, {
          active: isActive
        });

        const file = colorItem.files[0];
        const color1 = asset === 'Eyes' ? ! colorItem.id.indexOf('brown_') && type != '03' ? file.svgColors[2] : file.svgColors[2] : file.svgColors[0];
        const color2 = asset === 'Eyes' ? ! colorItem.id.indexOf('brown_') && type != '03' ? file.svgColors[3] : file.svgColors[5] : file.svgColors[1];
        const borderColor = file.svgColors[file.svgColors.length - 1];

        const style = {
          background: `linear-gradient(to right, ${color1} 0%, ${color1} 50%, ${color2} 50%, ${color2} 100%)`,
          borderColor: isActive ? borderColor : undefined
        };

        return (
          <Link key={colorItem.id}
            to={`${urlPrefix}${colorItem.id}`}
            style={style}
            className={className} activeClassName="active"
            onClick={() => onClick(colorItem.id)}
          >
          </Link>
        );
      })}
    </div>
  );
}

export default ColorPicker;
