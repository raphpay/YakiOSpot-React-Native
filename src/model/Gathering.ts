interface Gathering {
  name: string;
  date: Date;
  peopleUIDs: string[];
}

const MockGathering: Gathering = {
  name: "Birthday Party",
  date: new Date("2023-10-15"),
  peopleUIDs: ["iuyzauiydbiuaz", "ijoiejzdoizejfdoijze", "iuzaiudzaiudzaiudz"],
};
