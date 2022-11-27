import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ScreenContainer } from 'components/ScreenContainer';
import { useMemo } from 'react';
import getRandomColor from 'randomcolor';
import { MaterialIcons } from '@expo/vector-icons';

import users from 'mock/users.json';
import { primaryColor } from 'constants/Colors';
import { Field } from 'components/Field';
import { Spacer } from 'components/Spacer';
import { UserDetailRow } from 'screens/UserDetailsScreen/UserDetailRow';

import { getReportData } from './getReportData';

const chartConfig = {
  backgroundColor: primaryColor,
  backgroundGradientFrom: primaryColor,
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export function ReportsScreen() {
  const graphData = useMemo(() => {
    const {
      lessThan18,
      moreThan18,
      moreThan25,
      employedCount,
      studentsCount,
      peopleByLocalities,
      averageGroupSize,
    } = getReportData(users);

    return {
      numberOfPeopleByAge: [
        {
          name: '(13-18)',
          count: lessThan18,
          color: primaryColor,
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: '(18-25)',
          count: moreThan18,
          color: '#ffa726',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: '(25+)',
          count: moreThan25,
          color: '#ff6464',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ],
      numberOfPeopleByLocalitiesData: Object.entries(peopleByLocalities).map(
        ([locality, count]) => ({
          name: locality,
          count,
          color: getRandomColor(),
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        })
      ),
      employedAndStudentsCountData: [
        {
          name: 'Employed',
          count: employedCount,
          color: primaryColor,
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Students',
          count: studentsCount,
          color: '#ffa726',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ],
      averageGroupSize,
    };
  }, []);

  return (
    <ScreenContainer>
      <UserDetailRow
        icon={<MaterialIcons name="analytics" size={30} color={primaryColor} />}
        label="Average Group Size"
        value={graphData.averageGroupSize}
      />
      <Spacer height={20} />
      <Field label=" Number of people in a given age range">
        <PieChart
          data={graphData.numberOfPeopleByAge}
          width={Dimensions.get('window').width - 40}
          height={220}
          accessor="count"
          chartConfig={chartConfig}
          paddingLeft="0"
          center={[0, 0]}
          absolute={true}
          backgroundColor={'transparent'}
        />
      </Field>
      <Spacer height={20} />
      <Field label="Number of people by localities">
        <PieChart
          data={graphData.numberOfPeopleByLocalitiesData}
          width={Dimensions.get('window').width - 40}
          height={220}
          accessor="count"
          chartConfig={chartConfig}
          paddingLeft="0"
          center={[0, 0]}
          absolute={true}
          backgroundColor={'transparent'}
        />
      </Field>
      <Spacer height={20} />
      <Field label="Professionals & students count">
        <PieChart
          data={graphData.employedAndStudentsCountData}
          width={Dimensions.get('window').width - 40}
          height={220}
          accessor="count"
          chartConfig={chartConfig}
          paddingLeft="0"
          center={[0, 0]}
          absolute={true}
          backgroundColor={'transparent'}
        />
      </Field>
      <Spacer height={40} />
    </ScreenContainer>
  );
}
