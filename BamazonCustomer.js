var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    // run the start function after the connection is made to prompt the user
    //   start();
    displayItems();

});

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

function displayItems() {
    console.log("       *** WELCOME TO BAMAZON! ***    ");
    console.log("-----------------------------------------")
    console.log("The most convient node shopping app ever!");
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to see what we have in stock?",
            default: true
        }
    ]).then(function (answers) {
        if (answers.confirm) {
            queryProducts();
        } else {
            console.log("Awwww, maybe another day. Hope to see you again soon!");
            connection.end();
        }
    });
}
function queryProducts() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) console.log(err);
        console.table(res);
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "Please input the ID number of the item you would like to purchase"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function (answer) {
                const query = connection.query(
                    "SELECT stock_quantity, price FROM products WHERE ?",
                    [
                        {
                            id: answer.choice
                        }
                    ],
                    function (error, res) {
                        if (error) throw err;
                        // console.log(query.sql)
                        // console.log(res)
                        let quantChange = parseFloat(res[0].stock_quantity) - parseFloat(answer.units)
                        if (res[0].stock_quantity >= answer.units) {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: quantChange
                                    },
                                    {
                                        id: answer.choice
                                    }
                                ],
                                function (error) {
                                    if (error) throw err;
                                    console.log("Your total is " + parseFloat(res[0].price) * parseFloat(answer.units) + "\nThank you for you purchase!")

                                }
                            );
                        } else {
                            console.log("So sad! :( We just don't have enough to fill that order.");
                            // start();
                        }
                    }
                );
                
            });

    });
}



// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


