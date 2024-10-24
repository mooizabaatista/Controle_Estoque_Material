import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export function showMessage(
  title: string,
  icon: 'success' | 'error' | 'warning' | 'info',
  text: string,
  showCancelButton: boolean = false,
  router?: Router,  // Opcionalmente, se quiser incluir redirecionamentos
  actionMethod?: Function,
  actionUrl?: string
) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: "#3F51B5"
  }).then((result) => {
    if (result.isConfirmed) {
      if (actionMethod && actionUrl && router) {
        actionMethod();
        router.navigate([actionUrl]);
      } else if (actionMethod) {
        actionMethod();
      } else if (actionUrl && router) {
        router.navigate([actionUrl]);
      }
    }
  });
}