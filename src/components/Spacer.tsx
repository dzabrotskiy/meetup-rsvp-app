import React from 'react';
import { View } from './Themed';

type SpacingProps = {
  width?: number | string;
  height?: number;
};

export const Spacer = ({ width, height }: SpacingProps) => (
  <View
    style={[width ? { width } : { height }, { backgroundColor: 'transparent' }]}
  />
);
