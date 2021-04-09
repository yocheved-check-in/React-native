export const fallback = "en";
export const supportedLocales = {
  en: {
    name: "English",
    translationFileLoader: () => require("../lang/en.json"),
    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve(),
  },
  he: {
    name: "Hebrew",
    translationFileLoader: () => require("../lang/he.json"),
    momentLocaleLoader: () => import("moment/locale/he"),
  },
};
export const defaultNamespace = "common";
export const namespaces = [
  "common",
  "CheckIn",
  "RoomService",
  "ListOfTodos",
  "AddTodoScreen",
  "DatePickerAndroid",
];
