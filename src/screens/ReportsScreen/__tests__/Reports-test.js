import { getReportData } from '../getReportData';
import users from '../../../mock/users.json';

it('should be correct average group size', () => {
  const reportData = getReportData(users);

  expect(reportData.averageGroupSize).toBe(2);
});

it('should be correct number of people in a given age range', () => {
  const reportData = getReportData(users);

  expect(reportData.lessThan18).toBe(22);
  expect(reportData.moreThan18).toBe(27);
  expect(reportData.moreThan25).toBe(51);
});

it('should be correct number of people by localities', () => {
  const reportData = getReportData(users);

  expect(reportData.peopleByLocalities['UAE']).toBe(7);
  expect(reportData.peopleByLocalities['Poland']).toBe(14);
  expect(reportData.peopleByLocalities['Sweden']).toBe(2);
  expect(reportData.peopleByLocalities['New Zealand']).toBe(1);
});

it('should be correct number of students', () => {
  const reportData = getReportData(users);

  expect(reportData.studentsCount).toBe(79);
});

it('should be correct number of employed', () => {
  const reportData = getReportData(users);

  expect(reportData.employedCount).toBe(21);
});
