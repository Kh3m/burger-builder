
export const updateObject = (state, objectToUpdate) => {
    return {
        ...state,
        ...objectToUpdate
    }
}