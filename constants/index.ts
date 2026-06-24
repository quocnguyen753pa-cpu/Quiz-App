export enum Category {
  all_gplx_600 = 'all_gplx_600',
  all_random_gplx_600 = 'all_random_gplx_600',
  crit_gplx_600 = 'crit_gplx_600',
  crit_random_gplx_600 = 'crit_random_gplx_600',
  sign_gplx_600 = 'sign_gplx_600',
  sign_random_gplx_600 = 'sign_random_gplx_600',
  sand_shape_gplx_600 = 'sand_shape_gplx_600',
  sand_shape_random_gplx_600 = 'sand_shape_random_gplx_600',
  test = 'test',
}

export const categoryProfiles = [
  {
    value: Category.all_gplx_600,
    label: "Toàn bộ 600 câu hỏi",
    isSave: true,
    isTest: false,
  },
  {
    value: Category.all_random_gplx_600,
    label: "Toàn bộ 600 câu hỏi - ngẫu nhiên",
    isSave: false,
    isTest: false,
  },
  {
    value: Category.crit_gplx_600,
    label: "Ôn tập các câu điểm liệt",
    isSave: true,
    isTest: false,
  },
  {
    value: Category.crit_random_gplx_600,
    label: "Ôn tập các câu điểm liệt - ngẫu nhiên",
    isSave: false,
    isTest: false,
  },
  {
    value: Category.sign_gplx_600,
    label: "Ôn tập biển báo",
    isSave: true,
    isTest: false,
  },
  {
    value: Category.sign_random_gplx_600,
    label: "Ôn tập biển báo - ngẫu nhiên",
    isSave: false,
    isTest: false,
  },
  {
    value: Category.sand_shape_gplx_600,
    label: "Ôn tập sa hình",
    isSave: true,
    isTest: false,
  },
  {
    value: Category.sand_shape_random_gplx_600,
    label: "Ôn tập sa hình - ngẫu nhiên",
    isSave: false,
    isTest: false,
  },
  {
    value: Category.test,
    label: "Thi thử",
    isSave: false,
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
