const {test, describe, beforeAll, afterAll, beforeEach, afterEach, expect} = require('@playwright/test')
const {chromium} = require('playwright')
const {REGISTER, LOGIN, CONSTANT, LOGOUT, NAVBAR, GAME_FORM} = require('./playwrightUtils.js')

const host = 'http://localhost:3000'

let browser;
let context;
let page;

let user = {
    email: "",
    password: "123456",
    confirmPassword: "123456"
}

let game = {
    title: "Random Title",
    category: "Random Category",
    maxLevel: "80",
    imageUrl: "./images/ZombieLang.png",
    summary: "Random summary"

}


describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });
    afterAll(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
        
    });

    describe("authentication", () => {
        test("register makes correct API call", async () => {
            //arrange
            await page.goto(host)
            let random = Math.floor(Math.random() * 10000)
            user.email = `abv${random}@abv.bg`
            //act
            await page.click(REGISTER.BUTTON)
            await page.waitForSelector('form')

            await page.locator('#email').fill(user.email);
            await page.locator('#register-password').fill(user.password);
            await page.locator('#confirm-password').fill(user.confirmPassword);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click(CONSTANT.SUBMIT_BUTTON)
            ])
            let userData = await response.json();

            //assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email)
            expect(userData.password).toBe(user.password)

            

        })

        test("register with empty fileds validation", async () => {
            //arrange
            await page.goto(host)
            
            //act
            await page.click(REGISTER.BUTTON)
            await page.waitForSelector('form')                                  
            await page.click(CONSTANT.SUBMIT_BUTTON)

                        
            //assert
            expect(page.url()).toBe(host + '/register')

            

        })

        test("login makes correct API calls", async () => {
            //arrange
            await page.goto(host);
            await page.click(LOGIN.BUTTON)
            await page.waitForSelector('form')

            //act

            await page.locator('#email').fill(user.email)
            await page.locator('#login-password').fill(user.password)
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click(CONSTANT.SUBMIT_BUTTON)
            ]);
            let userData = await response.json();

            //assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);


        })

        test("login does not work with empty fields", async () => {
            //arrange
            await page.goto(host);
            await page.click(LOGIN.BUTTON);
            await page.waitForSelector('form');

            //act
            await page.click(CONSTANT.SUBMIT_BUTTON);

            //assert
            expect(page.url()).toBe(host + '/login');
        })

        test("logout makes correct API calls", async() => {
            //arrange
            await page.goto(host);
            await page.click(LOGIN.BUTTON);
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click(CONSTANT.SUBMIT_BUTTON);
            
            //act
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.click(LOGOUT.BUTTON)

            ])
            await page.waitForSelector(LOGIN.BUTTON);

            //assert
            expect(response.ok).toBeTruthy();
            expect(page.url()).toBe(host + '/');
        })

        describe("navigation bar", () => {
            test('logged in users should see correct navigation buttons', async () => {
            //arrange
            await page.goto(host)                
            await page.click(LOGIN.BUTTON);
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click(CONSTANT.SUBMIT_BUTTON);

            //assert
            await expect(page.locator(NAVBAR.ALL_GAMES_BUTTON)).toBeVisible();
            await expect(page.locator(NAVBAR.CREATE_GAME_BUTTON)).toBeVisible();
            await expect(page.locator(NAVBAR.LOGOUT_BUTTON)).toBeVisible();
            await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeHidden();
            await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeHidden();


            })

            test('guest user should see correct navigation buttons', async () => {
                //arrange
                await page.goto(host)                
                
    
                //assert
                await expect(page.locator(NAVBAR.ALL_GAMES_BUTTON)).toBeVisible();
                await expect(page.locator(NAVBAR.CREATE_GAME_BUTTON)).toBeHidden();
                await expect(page.locator(NAVBAR.LOGOUT_BUTTON)).toBeHidden();
                await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
                await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
    
    
                })
    
        })

        describe("Games functionality", () => {
            beforeEach(async () => {
            await page.goto(host);
            await page.click(LOGIN.BUTTON);
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click(CONSTANT.SUBMIT_BUTTON);

            })

            test("create does not work with empty fileds", async () => {
                //arrange
                await page.click(NAVBAR.CREATE_GAME_BUTTON)
                await page.waitForSelector('form');

                //act
                await page.click(CONSTANT.SUBMIT_BUTTON)

                //assert
                expect(page.url()).toBe(host + '/create')
                
            })

            test("create makes correct API call for logged in user", async () => {
                //arrange
                await page.click(GAME_FORM.BUTTON);
                await page.waitForSelector('form');

                //act
                await page.fill(GAME_FORM.TITLE, game.title)
                await page.fill(GAME_FORM.CATEGORY, game.category);
                await page.fill(GAME_FORM.MAXLEVEl, game.maxLevel);
                await page.fill(GAME_FORM.IMAGEURL, game.imageUrl);
                await page.fill(GAME_FORM.SUMMARY, game.summary);

                let [response] = await Promise.all([
                    page.waitForResponse(res => res.url().includes('/data/games') && res.status() === 200),
                    page.click(CONSTANT.SUBMIT_BUTTON)
                ])
                let gameData = await response.json();

                //assert
                await expect(response.ok()).toBeTruthy()
                expect(gameData.title).toBe(game.title)
                expect(gameData.category).toBe(game.category)
                expect(gameData.maxLevel).toBe(game.maxLevel)
                expect(gameData.imageUrl).toBe(game.imageUrl)
                expect(gameData.summary).toBe(game.summary)

            })

            test("details show edit/delete buttons for owner", async () => {
                //arrange
                await page.goto(host + '/catalog');

                //act
                await page.click(CONSTANT.DETAILS_BUTTON)

                //assert
                await expect(page.locator('text="Delete"')).toBeVisible();
                await expect(page.locator('text="Edit"')).toBeVisible();
            })

            test("non owner does not see delete/edit buttons", async () => {
                //arrange
                await page.goto(host + '/catalog');

                //act
                await page.click(CONSTANT.DETAILS_BUTTON_NOT_OWNER)

                //assert
                await expect(page.locator('text="Delete"')).toBeHidden();
                await expect(page.locator('text="Edit"')).toBeHidden();
            })

            test("edit button makes correct API calls", async () => {
                //arrange
                await page.goto(host + '/catalog');
                await page.click(CONSTANT.DETAILS_BUTTON)
                await page.click('text=Edit')
                await page.waitForSelector('form');

                //act
                await page.locator('[name="title"]').fill("Edited title")
                let [response] = await Promise.all([
                    page.waitForResponse(res => res.url().includes('/data/games') && res.status() === 200),
                    page.click(CONSTANT.SUBMIT_BUTTON)
                ])
                let gameData = await response.json();

                //assert
                expect(gameData.title).toEqual("Edited title");
                expect(gameData.category).toEqual(game.category)
                expect(gameData.maxLevel).toEqual(game.maxLevel)
                expect(gameData.summary).toEqual(game.summary)



            })

            test("delete makes correct API call", async () => {
                //arrange
                await page.goto(host + '/catalog');
                await page.click(CONSTANT.DETAILS_BUTTON_EDITED)

                //act
                let [response] = await Promise.all([
                    page.waitForResponse(res => res.url().includes('/data/games') && res.status() === 200),
                    page.click('text=Delete')
                ])

                //assert
                expect(response.ok()).toBeTruthy();

                

            })
            
            describe("Home Page", () => {
                test("home page validation", async () => {
                    //arrange
                    await page.goto(host); 

                    //assert
                    await expect(page.locator(".welcome-message h2")).toHaveText("ALL new games are")
                    await expect(page.locator(".welcome-message h3")).toHaveText("Only in GamesPlay")
                    await expect(page.locator("#home-page h1")).toHaveText("Latest Games")

                    const games = await page.locator('#home-page .game').all();
                    expect(games.length).toBeGreaterThanOrEqual(3)


                })
                
                
            })
        })
    })

});