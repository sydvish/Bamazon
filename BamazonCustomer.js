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
                    // validate: function(val){

                    // },
                    message: "Please input the ID number of the item you would like to purchase"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function (answer) {

                console.log(answer.choice);
                // get the information of the chosen item
                var chosenItem;
                var stock_quantity;
                connection.query("SELECT stock_quantity FROM products WHERE id=" + answer.choice, function (err, res) {
                    stock_quantity = res - answer.units
                    if (res <= (answer.units)) {
                        console.log("Thank you for your order");
                        connection.query("UPDATE products SET stock_quantity=" + stock_quantity + 'WHERE id=' + parseInt(answer.choice));
                    } else {
                        console.log("Not enough units for purchase");
                    }

                    // if (chosenItem < parseInt(answer.units)) {
                    //     // bid was high enough, so update db, let the user know, and start over
                    //     connection.query(
                    //         console.log("we are connected"),
                    //         "UPDATE products SET ? WHERE ?",
                    //         [
                    //             {
                    //                 unitAmount: answer.units
                    //             },
                    //             {
                    //                 id: chosenItem.id
                    //             }
                    //         ],
                    //         function (error) {
                    //             if (error) throw err;
                    //             console.log("You've purchased " + chosenItem);
                    //             start();
                    //         }
                    //     );
                    // }
                    // else {
                    //     // bid wasn't high enough, so apologize and start over
                    //     console.log("Your bid was too low. Try again...");
                    //     start();
                    // }
                })

                // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

                // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
                // However, if your store does have enough of the product, you should fulfill the customer's order.


            });

    });
}



// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.


