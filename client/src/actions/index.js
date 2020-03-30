import property from '../api/property';
import history from '../history';

export const signIn = (values) => async (dispatch, getState) => {
    //console.log(values.userId)
    await property.post('/newUser', { values });
    dispatch({
        type: 'SIGN_IN',
        payload: values.userId
    })
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const addProperty = (formValues,Image) => async (dispatch, getState) => {
    console.log(formValues)
    //formValues.set('Image',Image)
    const { userId } = getState().auth;
    const config={
        headers:{
            'content-type':'multipart/form-data'
        }
    }
    
    let formdata = new FormData();
    formdata.append('HouseNo', formValues.HouseNo);
    formdata.append('State', formValues.State);
    formdata.append('City', formValues.City);
    formdata.append('Price', formValues.Price);
    formdata.append('Image',Image);
    formdata.append('userId',userId)
   const response = await property.post('/addProperty', formdata);
   dispatch({ type: 'ADD_PROPERTY', payload: response.data });
  history.push('/');
}

export const fetchProperties = () => async dispatch => {
    const response = await property.get('/propertyList');

    dispatch({ type: 'FETCH_PROPERTIES', payload: response.data })
}

export const fetchProperty = (id) => async dispatch => {
    const response = await property.get(`/property/${id}`);

    dispatch({ type: 'FETCH_PROPERTY', payload: response.data });

}

export const editProperty = (id, formValues) => async dispatch => {
    console.log(formValues);
    const response = await property.patch(`/property/${id}`, formValues);

    dispatch({ type: 'EDIT_PROPERTY', payload: response.data });
    history.push('/buyer');
}

export const deleteProperty = (id) => async dispatch => {
    await property.delete(`/property/${id}`);

    dispatch({ type: 'DELETE_PROPERTY', payload: id });

    history.push('/buyer');
}