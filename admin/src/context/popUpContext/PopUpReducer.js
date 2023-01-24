export const PopUpReducer = (state,action) => {
    switch (action.type) {
        case 'USER_SHOW':
            return{
                show:true,
                content:'This is admin account so, you cant delete this account',
            }
    
        case 'MOVIE_SHOW':
            return{
                show:true,
                content:'Check this movie is use in any of the list if movie is not used means go and update the delete access before delete',
            }
    
        case 'DONT_SHOW':
            return{
                show:false,
                content:null
            }
    
        default:
            return{...state};
    }
}