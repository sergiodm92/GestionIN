import Swal from "sweetalert2"

//FUNCION PARA EJECUTAR EL SWEETALERT SIN BOTON DE CONFIRMAR
export const createToast = (icon: any, title: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon,
    title,
  });
};

export const questionAlert = (title: string, text: string, trueFunction: any, falseMsj: string  )=>{
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#43815A",
    cancelButtonColor: "#b32020",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        trueFunction()
    } catch (error) {
        createToast("error","ocurrio un error, vuelva a intentar");
        console.error(error);
    }
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
      createToast("warning",falseMsj);
  }
});
}
