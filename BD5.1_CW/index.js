let express = require("express");
let app = express();
let port = 3000;
// Import the Track model and Sequelize instance from the previously defined paths
let track = require("./models/track.model");

let { sequelize } = require("./lib/index");
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
/*
The distinction between using braces `{}` and not using them in your import statements relates to how JavaScript modules export and import items. Here's an explanation for both of your examples:

### 1. Without Braces: `let track = require("./models/track.model");`
- **Usage:** When you use `require` without braces, it means you are importing the default export from that module.
- **Context:** In the file `track.model.js`, you likely have something like `module.exports = Track;`. This means the entire module is exported as a single `Track` object, which represents the model.
- **Explanation:** Since there is only one item being exported from `track.model.js` (the `Track` model), you don’t need to destructure it; you’re simply importing the whole exported object.

### 2. With Braces: `let { sequelize } = require("./lib/index");`
- **Usage:** Using braces `{}` in the import statement is known as destructuring. It's used when you want to import specific exports from a module where multiple exports are present.
- **Context:** In the `lib/index.js` file, you are exporting multiple items: `module.exports = { DataTypes: sq.DataTypes, sequelize };`. This means the module exports an object containing both `sequelize` and `DataTypes`.
- **Explanation:** When you use `{ sequelize }`, it means you are specifically extracting the `sequelize` property from the exported object. This is necessary because you are only interested in the `sequelize` part of what `lib/index.js` exports, not everything it exports.

In summary:
- **Without Braces:** Use when the module exports a single entity (default export).
- **With Braces:** Use when you need to extract specific properties from an object that contains multiple exported items.

This distinction helps ensure that your imports are precise and that your code only imports what it needs, leading to cleaner and more maintainable code.*/
let movieData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD5.1 - Setting up ORM" });
});
// end point to see the db
app.get("/seed_db", async (req, res) => {
  try {
    // Synchronize the database, forcing it to recreate the tables if they already exist

    await sequelize.sync({ force: true });
    // Bulk create entries in the Track table using predefined data
    await track.bulkCreate(movieData);

    // Send a 200 HTTP status code and a success message if the database is seeded successfully
    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    // Send a 500 HTTP status code and an error message if there's an error during seeding

    console.log("Error in seeding db", error.message);
    return res.status(500).json({
      code: 500,
      message: "Error in seeding db",
      error: error.message,
    });
  }
});
