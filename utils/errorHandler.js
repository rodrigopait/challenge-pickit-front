// import store from '../store';
// import router from '../router';

const errorHandler = (res) => {
  switch (res.status) {
    case 401:
      // store.dispatch('session/logout', {error: 'No tiene permisos para realizar esta consulta'})
      // if (router.currentRoute.name !== 'login') {
      //   router.push({name: 'login'})
      // }
      return "No tiene permisos para realizar esta consulta";
    case 400:
      return "Error de validación";
    case 409:
      return res.data.msg
        ? res.data.msg
        : res.data.errors
        ? res.data.errors
        : "Error en la consulta";
    default:
      return "Error en la consulta";
  }
};

export default errorHandler;
