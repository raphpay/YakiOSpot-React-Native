import Utils from "../business-logic/utils";

interface Gathering {
  id: string;
  name: string;
  date: Date;
  peopleUIDs: string[];
}

const MockGathering: Gathering = {
  id: Utils.generateUUID(),
  name: "Birthday Party",
  date: new Date("2023-10-15"),
  peopleUIDs: ["iuyzauiydbiuaz", "ijoiejzdoizejfdoijze", "iuzaiudzaiudzaiudz"],
};

export default Gathering;
