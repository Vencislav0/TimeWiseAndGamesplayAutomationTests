QUnit.config.reorder = false;
const baseUrl = "http://localhost:3030"
let user = {
    email: "",
    password: "123456"
};

let game = {
    title: "",
    category: "",
    maxLevel: "80",
    imageUrl: ".../images/ZombieLang.png",
    summary: ""

};

let gameId = "";
let token = "";
let userId = "";

QUnit.module("User Functionalities", () => {
    QUnit.test("registration", async (assert) => {
        //arrange
        let path = '/users/register';
        let random = Math.floor(Math.random() * 10000);
        let email = `abv${random}@abv.bg`;
        user.email = email;

        //act
        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let json = await response.json();
        

        //assert
        assert.ok(response, "User register successfully")

        //Email validation
        assert.ok(json.hasOwnProperty('email'), 'email exists')
        assert.equal(json['email'], user.email, 'correct expected email')
        assert.strictEqual(typeof json.email, 'string', 'property is in correct format')

        //Password validation
        assert.ok(json.hasOwnProperty('password'), 'password exists')
        assert.equal(json['password'], user.password, 'correct expected password')
        assert.strictEqual(typeof json.password, 'string', 'property is in correct format')

        //Token validation
        assert.ok(json.hasOwnProperty('accessToken'), 'token exists')
        assert.strictEqual(typeof json.accessToken, 'string', 'property is in correct format')

        //Id validation
        assert.ok(json.hasOwnProperty('_id'), 'Id exists')
        assert.strictEqual(typeof json._id, 'string', 'property is in correct format')

        token = json['accessToken'];
        userId = json['_id'];
        sessionStorage.setItem('game-user', JSON.stringify(user))



    });
    QUnit.test("login", async (assert) => {
        //arrange
        let path = "/users/login";

        //act
        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                "content-type": "application/json"

            },
            body: JSON.stringify(user)
        })
        let json = await response.json();
        
        
        assert.ok(response.ok, "User logged in correctly")

        //Email validation
        assert.ok(json.hasOwnProperty('email'), 'email exists')
        assert.equal(json['email'], user.email, 'correct expected email')
        assert.strictEqual(typeof json.email, 'string', 'property is in correct format')

        //Password validation
        assert.ok(json.hasOwnProperty('password'), 'password exists')
        assert.equal(json['password'], user.password, 'correct expected password')
        assert.strictEqual(typeof json.password, 'string', 'property is in correct format')

        //Token validation
        assert.ok(json.hasOwnProperty('accessToken'), 'token exists')
        assert.strictEqual(typeof json.accessToken, 'string', 'property is in correct format')

        //Id validation
        assert.ok(json.hasOwnProperty('_id'), 'Id exists')
        assert.strictEqual(typeof json._id, 'string', 'property is in correct format')
        

        token = json['accessToken'];
        userId = json._id;
        sessionStorage.setItem('game-user', JSON.stringify(user))
    })
})
QUnit.module("Games Functionalities", () => {
    QUnit.test("get all games", async (assert) => {
        //arrange
        let path = "/data/games/";
        let queryParams = "?sortBy=_createdOn%20desc"
        //act
        let response = await fetch(baseUrl + path + queryParams);
        let json = await response.json()
        //assert
        assert.ok(response.ok, "Successfully fetching all games")
        assert.ok(Array.isArray(json), "Response is an array");

        json.forEach(objProperty => {
            assert.ok(objProperty.hasOwnProperty("category", "property category exists"))
            assert.strictEqual(typeof objProperty.category, 'string', "property category is in correct format")
            assert.ok(objProperty.hasOwnProperty("imageUrl", "property imageUrl exists"))
            assert.strictEqual(typeof objProperty.imageUrl, 'string', "property imageUrl is in correct format")
            assert.ok(objProperty.hasOwnProperty("maxLevel", "property maxLevel exists"))
            assert.strictEqual(typeof objProperty.maxLevel, 'string', "property maxLevel is in correct format")
            assert.ok(objProperty.hasOwnProperty("title", "property title exists"))
            assert.strictEqual(typeof objProperty.title, 'string', "property title is in correct format")
            assert.ok(objProperty.hasOwnProperty("summary", "property summary exists"))
            assert.strictEqual(typeof objProperty.summary, 'string', "property summary is in correct format")
            assert.ok(objProperty.hasOwnProperty("_createdOn", "property _createdOn exists"))
            assert.strictEqual(typeof objProperty._createdOn, 'number', "property _createdOn is in correct format")
            assert.ok(objProperty.hasOwnProperty("_id", "property _id exists"))
            assert.strictEqual(typeof objProperty._id, 'string', "property _id is in correct format")
            assert.ok(objProperty.hasOwnProperty("_ownerId", "property _ownerId exists"))
            assert.strictEqual(typeof objProperty._ownerId, 'string', "property _ownerId is in correct format")
            
        });

        
    });
    QUnit.test("create game", async (assert) => {
        //arrange
        let path = "/data/games";
        let random = Math.floor(Math.random() * 10000)

        game.title = `Random game title_${random}`
        game.category = `Random game category_${random}`
        game.summary = `Random game summary_${random}`
        //act
        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'X-Authorization': token
            },
            body: JSON.stringify(game)
        });
        let json = await response.json();
        gameId = json._id;

        //assert
        assert.ok(response.ok, 'Successful response')

        assert.ok(json.hasOwnProperty('category'), "Property category exists")
        assert.strictEqual(typeof json.category, "string", "Property category is in correct format")
        assert.strictEqual(json.category, game.category, "Propery category has expected value")

        assert.ok(json.hasOwnProperty('imageUrl'), "Property imageUrl exists")
        assert.strictEqual(typeof json.imageUrl, "string", "Property imageUrl is in correct format")
        assert.strictEqual(json.imageUrl, game.imageUrl, "Propery imageUrl has expected value")

        assert.ok(json.hasOwnProperty('maxLevel'), "Property maxLevel exists")
        assert.strictEqual(typeof json.maxLevel, "string", "Property maxLevel is in correct format")
        assert.strictEqual(json.maxLevel, game.maxLevel, "Propery maxLevel has expected value")

        assert.ok(json.hasOwnProperty('summary'), "Property summary exists")
        assert.strictEqual(typeof json.summary, "string", "Property summary is in correct format")
        assert.strictEqual(json.summary, game.summary, "Propery summary has expected value")

        assert.ok(json.hasOwnProperty('title'), "Property title exists")
        assert.strictEqual(typeof json.title, "string", "Property title is in correct format")
        assert.strictEqual(json.title, game.title, "Propery title has expected value")

        assert.ok(json.hasOwnProperty('_createdOn'), "Property _createdOn exists")
        assert.strictEqual(typeof json._createdOn, "number", "Property _createdOn is in correct format")

        assert.ok(json.hasOwnProperty('_id'), "Property _id exists")
        assert.strictEqual(typeof json._id, "string", "Property _id is in correct format")

        assert.ok(json.hasOwnProperty('_ownerId'), "Property _ownerId exists")
        assert.strictEqual(typeof json._ownerId, "string", "Property _ownerId is in correct format")
       





    })
})