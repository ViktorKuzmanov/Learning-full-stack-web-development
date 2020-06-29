const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
// Database

const mongoose = require("mongoose");
const databaseName = "/todolistDB"
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://viksaa39:viksaa39mongodb@cluster0-v8ujf.mongodb.net" + databaseName);
// This is my module on getting the curret day
// This line runs the code in my data.js module
const date = require(__dirname + "/date.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Tell express server to server these files in the public folder
app.use(express.static("public"));
// This line tells our server to use EJS as its view engine
// This view engine will look for .ejs template files in views folder
app.set('view engine', 'ejs');


// Insert items in database
const itemsSchema = mongoose.Schema({ name: String});
const itemsCollectionName = "Item"
const ItemsModel = mongoose.model(itemsCollectionName, itemsSchema);
const item1Document = new ItemsModel({name: "Welcome to todolist app"})
const item2Document = new ItemsModel({name: "Hit the + button to add new item"})
const item3Document = new ItemsModel({name: "<-- Hit this to delete an item"})
const defaultsItems = [item1Document, item2Document, item3Document]

app.get("/", function (req, res) {
  // here i pass variables(day variable) from my express server to my .ejs template file in the marker
  // Here you provide all the variables needed(for all the markers) to render the list.ejs file

  let day = date.currentDate();

  // Read(retrieve) data from database
  ItemsModel.find({}, function (err, retrievedItems) {

    if(retrievedItems.length === 0) {
      ItemsModel.insertMany(defaultsItems, function (err) {
        if(err) { console.log(err);}
        else {console.log("Successfully inserted all 3 items")};
      })
      res.redirect("/");
    } else {
      res.render("list", {listTitle: day, newListItems: retrievedItems});
    }
  })
})

// Prepare the data for our custom list
const listSchema = {
  name: String,
  items: [itemsSchema]
};
const listCollectionName = "List";
const ListModel = mongoose.model(listCollectionName, listSchema);

// Listen for custom dynamic route parameres
app.get("/:customListName" ,function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  ListModel.findOne({name: customListName}, function (err, foundList) {
    if(!err) {
      if(!foundList) {
        const listDocument = new ListModel({
          name: customListName,
          items: defaultsItems
        });
        listDocument.save();
        res.redirect("/" + customListName);
      } else {
        // Show an existing list
        res.render("list", {listTitle: customListName, newListItems:foundList.items});
      }
    }
  });
})

app.post("/", function (req, res) {
  const newItemName = req.body.newItem;
  const requestedListName = req.body.list;
  const mainListName = date.currentDate();

  const newItemDocument = new ItemsModel({name: newItemName});

  if(requestedListName == mainListName) {
    newItemDocument.save();
    res.redirect("/");
  } else {
    // add new item to the custom todolist which is created using dynamic links
    ListModel.findOne({name: requestedListName}, function (err, foundList) {
      foundList.items.push(newItemDocument);
      foundList.save();
      res.redirect("/" + requestedListName)
    });
  }

});

app.post("/delete", function (req, res) {
  const idOfClickedElement = req.body.checkbox;
  const listName = req.body.listName;
  const mainListName = date.currentDate();
  if(listName === mainListName) {
    //
    ItemsModel.deleteOne({_id: idOfClickedElement}, function (err) {
      if(err) { console.log(err);}
      else { console.log("Successfully delete element"); }
      res.redirect("/");
    });
  } else {
    // the delete post request is coming from a custom list
    // update(delete) item in the property items (array) in ListModel document
    ListModel.findOneAndUpdate({name: listName}, {$pull: {items:{_id: idOfClickedElement}}}, function (err, found) {
      if(!err) {
        res.redirect("/" + listName);
      }
    });
  }


})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function (req, res) {
  console.log("Server started running on port 3000...");
})
