import * as constants from '../constants'

export function selectArticles(selectedArticles) {
    return {
        type: constants.SELECT_ARTICLES,
        selectedArticles
    }
}

export function deleteArticle(id) {
    return {
        type: constants.DELETE_ARTICLE,
        id
    }
}

export function setDayRange(range) {
    return {
        type: constants.SET_DAY_RANGE,
        day: range
    }
}

export function resetDays() {
    return {
        type: constants.RESET_DAYS
    }
}