import type { User } from 'screens/UsersScreen/types';

type GetReportDataResult = {
  lessThan18: number;
  moreThan18: number;
  moreThan25: number;
  employedCount: number;
  studentsCount: number;
  peopleByLocalities: Record<string, number>;
  averageGroupSize: number;
};

export function getReportData(users: User[]): GetReportDataResult {
  const result: GetReportDataResult = {
    lessThan18: 0,
    moreThan18: 0,
    moreThan25: 0,
    employedCount: 0,
    studentsCount: 0,
    peopleByLocalities: {},
    averageGroupSize: 0,
  };

  users.forEach((user) => {
    if (13 <= user.age && user.age <= 18) {
      result.lessThan18 += 1;
    }
    if (18 < user.age && user.age <= 25) {
      result.moreThan18 += 1;
    }
    if (user.age > 25) {
      result.moreThan25 += 1;
    }

    if (user.profession === 'Student') {
      result.studentsCount += 1;
    }
    if (user.profession === 'Employed') {
      result.employedCount += 1;
    }

    if (!result.peopleByLocalities[user.locality]) {
      result.peopleByLocalities[user.locality] = 1;
    } else {
      result.peopleByLocalities[user.locality] =
        result.peopleByLocalities[user.locality] + 1;
    }
  });

  const guestsCount = users.reduce(
    (acc, curr) => acc + curr.numberOfGuests + 1,
    0
  );
  result.averageGroupSize = Math.round(guestsCount / users.length);

  return result;
}
