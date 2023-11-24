import { ACTUAL_USER, USER_LOGOUT_DELETE } from "../Actions/actions";

const initialState = {
    user: {},
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTUAL_USER:
            return {
                ...state,
                user: action.payload
            }
        case USER_LOGOUT_DELETE:
            return {
                ...state,
                user: {}
            }

        default:
            return {
                ...state,

            }

    }
}

export default rootReducer;