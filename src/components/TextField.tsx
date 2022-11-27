import { ForwardedRef, forwardRef, Fragment } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

import { Text, useThemeColor, View } from './Themed';
import { Spacer } from './Spacer';

export type Props = {
  placeholder?: string;
  label?: string;
  status?: 'default' | 'error';
  description?: string;
  style?: StyleProp<TextStyle>;
  value: TextInputProps['value'];
  onChange: TextInputProps['onChangeText'];
  onBlur?: TextInputProps['onBlur'];
  keyboardType?: TextInputProps['keyboardType'];
  multiline?: TextInputProps['multiline'];
  maxLength?: TextInputProps['maxLength'];
};

export const TextField = forwardRef(function TextField(
  {
    value,
    onChange,
    label,
    placeholder,
    keyboardType,
    onBlur,
    multiline,
    maxLength,
    style,
    status,
    description,
  }: Props,
  ref: ForwardedRef<TextInput>
) {
  const backgroundColor = useThemeColor('secondary');
  const textColor = useThemeColor('text');

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Spacer height={6} />
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[
          { backgroundColor, color: textColor },
          styles.input,
          style,
          status === 'error' && styles.inputError,
        ]}
        keyboardType={keyboardType}
        onBlur={onBlur}
        multiline={multiline}
        maxLength={maxLength}
      />
      {description && (
        <Fragment>
          <Spacer height={3} />
          <Text
            style={[
              styles.description,
              status === 'error' && styles.descriptionError,
            ]}
          >
            {description}
          </Text>
        </Fragment>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 13,
    marginLeft: 10,
  },
  input: {
    height: 45,
    borderRadius: 10,
    fontSize: 19,
    paddingLeft: 10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#f00',
  },
  description: {
    fontSize: 11,
    marginLeft: 10,
  },
  descriptionError: {
    color: '#f00',
  },
});
