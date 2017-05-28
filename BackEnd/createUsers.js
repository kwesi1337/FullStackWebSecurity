/**
 * Created by josephawwal on 28/05/17.
 */

var userFacade = require("./userFacade")

userFacade.createNewUser("testbruger", "lol123", function(data){
    if(data != null) console.log("User created..")
})

userFacade.createNewUser("Test2", "boolean", function(data){
    if (data != null) console.log("Success creating the test.")

})