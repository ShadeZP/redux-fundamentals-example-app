export const changeStatusFilter = (filterValue) =>  ({type: 'filters/statusFilterChanged', payload: filterValue})
export const changeColorFilter = (color, changeType) => ({type: 'filters/colorFilterChanged', payload: {color, changeType}})
