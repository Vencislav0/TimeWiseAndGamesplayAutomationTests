export const REGISTER = {
    BUTTON: 'a[href="/register"]',
    
}

export const LOGIN = {
    BUTTON: 'text=Login'

}

export const CONSTANT = {
    SUBMIT_BUTTON: '[type="submit"]',
    DETAILS_BUTTON: '.allGames .allGames-info:has-text("Random Title") .details-button',
    DETAILS_BUTTON_NOT_OWNER: '.allGames .allGames-info:has-text("MineCraft") .details-button',
    DETAILS_BUTTON_EDITED: '.allGames .allGames-info:has-text("Edited Title") .details-button',
}

export const LOGOUT = {
    BUTTON: 'text=Logout'
}

export const NAVBAR = {
    ALL_GAMES_BUTTON: 'nav >> text=All games',
    CREATE_GAME_BUTTON: 'nav >> text=Create Game',
    LOGOUT_BUTTON: 'nav >> text=Logout',
    LOGIN_BUTTON: 'nav >> text=Login',
    REGISTER_BUTTON: 'nav >> text=Register'
}

export const GAME_FORM = {
    BUTTON: 'text=Create Game',
    TITLE: '[name="title"]',
    CATEGORY: '[name="category"]',
    MAXLEVEl: '[name="maxLevel"]',
    IMAGEURL: '[name="imageUrl"]',
    SUMMARY: '[name="summary"]'
}