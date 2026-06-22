export const categoryOptions = [
  {
    value: "gplx_600",
    option: "GPLX-600",
  },
];

export const difficultyOptions = [
  {
    value: "easy",
    option: "Easy",
  },
  {
    value: "medium",
    option: "Medium",
  },
  {
    value: "hard",
    option: "Hard",
  },
];

export const alphabeticNumeral = (index: number) => {
  const asciiCode = index + 65;
  const letter = String.fromCharCode(asciiCode);
  return letter + ". ";
};

export const showCategory = (category: string) => {
  if (category === "gplx_600") return "GPLX 600";
  else return "Unknown";
};
