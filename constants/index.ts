export enum Category {
  all_gplx_600 = 'all_gplx_600',
  all_random_gplx_600 = 'all_random_gplx_600',
  crit_gplx_600 = 'crit_gplx_600',
  crit_random_gplx_600 = 'crit_random_gplx_600',
  sign_gplx_600 = 'sign_gplx_600',
  sign_random_gplx_600 = 'sign_random_gplx_600',
  sand_shape_gplx_600 = 'sand_shape_gplx_600',
  sand_shape_random_gplx_600 = 'sand_shape_random_gplx_600',
  test_A_A1 = 'test_A_A1',
  test_B = 'test_B',
  test_C1 = 'test_C1',
  test_C = 'test_C',
  test_D1_D2_D = 'test_D1_D2_D',
  test_CIE_CE_DIE_D2E_DE = 'test_CIE_CE_DIE_D2E_DE',
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
  // {
  //   value: Category.test_A_A1,
  //   label: "Thi thử - Hạng A, A1",
  //   isSave: false,
  //   isTest: true,
  //   duration: 1140,
  //   correctQuestions: 21,
  // },
  {
    value: Category.test_B,
    label: "Thi thử - Hạng B",
    isSave: false,
    isTest: true,
    duration: 1200,
    correctQuestions: 27,
  },
  {
    value: Category.test_C1,
    label: "Thi thử - Hạng C1",
    isSave: false,
    isTest: true,
    duration: 1320,
    correctQuestions: 32,
  },
  {
    value: Category.test_C,
    label: "Thi thử - Hạng C",
    isSave: false,
    isTest: true,
    duration: 1440,
    correctQuestions: 36,
  },
  {
    value: Category.test_D1_D2_D,
    label: "Thi thử - Hạng D1, D2, D",
    isSave: false,
    isTest: true,
    duration: 1560,
    correctQuestions: 41,
  },
  {
    value: Category.test_CIE_CE_DIE_D2E_DE,
    label: "Thi thử - Hạng CIE, CE, DIE, D2E, DE",
    isSave: false,
    isTest: true,
    duration: 1560,
    correctQuestions: 41,
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
