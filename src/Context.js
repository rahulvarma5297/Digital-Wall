import React from "react";

export const AppContext = React.createContext();
export const ContextProvider = ({ children }) => {
  const [store, setStore] = React.useState({
    data: [
      {
        id: "1",
        name: "Earth Changes and Journeys",
        color: "#A7F0F9",
        posts: [
          {
            id: "1",
            title: "Galapagos Islands, Ecuador",
            image: "https://picsum.photos/200/200",
            content:
              "The Galápagos Islands is a volcanic archipelago in the Pacific Ocean. It's considered one of the world's foremost destinations for wildlife-viewing. A province of Ecuador, it lies about 1,000km off its coast. Its isolated terrain shelters a diversity of plant and animal species, many found nowhere else. Charles Darwin visited in 1835. ",
            count: 0,
            like: 0,
            date: "21st Jan",
            bookmark: 1,
          },
          {
            id: "2",
            title: "Lake Tekapo, New Zealand",
            image: "https://picsum.photos/200/200",
            content:
              "While purple, pink, and blue-hued lupin flowers may not be native to New Zealand (they hail from North America), they really do seem to bloom most vibrantly on the Oceanian nation’s South Island. At Lake Tekapo, in particular, the flowers juxtapose against the backdrop of the crystal clear water to create one of the country’s most stunning vistas.",
            count: 10,
            like: 0,
            date: "21st Jan",
            bookmark: 0,
          },
        ],
      },
      {
        id: "2",
        name: "Eating Right",
        color: "#A7F0F9",
        posts: [],
      },
    ],
    pop: false,
    search: "",
    parentId: "",
    childId: "",
  });
  return (
    <AppContext.Provider value={{ store, setStore }}>
      {children}
    </AppContext.Provider>
  );
};
