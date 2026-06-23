export enum Category {
  all_gplx_600 = 'all_gplx_600',
  crit_gplx_600 = 'crit_gplx_600',
  test = 'test',
}

export const categoryProfiles = [
  {
    value: Category.all_gplx_600,
    label: "Toàn bộ 600 câu hỏi",
    isTest: false,
  },
  {
    value: Category.crit_gplx_600,
    label: "Ôn tập 17 câu điểm liệt",
    isTest: false,
  },
  {
    value: Category.test,
    label: "Thi thử",
    isTest: true,
  },
];

export const alphabeticNumeral = (index: number) => {
  const asciiCode = index + 65;
  const letter = String.fromCharCode(asciiCode);
  return letter + ". ";
};

export const showCategory = (category: Category) => {
  const result = categoryProfiles.find(c => c.value === category);
  if (result) {
    return result.label;
  }
  return "Unknown";
};

export const PROFILES_KEY = 'quiz-profiles';
