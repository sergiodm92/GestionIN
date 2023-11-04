import { Request } from "../../types/requestsInterfaces";
import { createToast } from "../Notifications/Notifications";

export const validateRequest = (form: Request) => {
  const validationList = [
    {
      field: "funeral",
      message: "Debe proporcionar un Lugar de velatorio",
      condition: !form.funeral,
    },
    {
      field: "holder_name",
      message: "Debe proporcionar Apellido y Nombre del Titular",
      condition: !form.holder_name,
    },
    {
      field: "holder_relationship",
      message: "Debe proporcionar un Parentesco",
      condition: !form.holder_relationship,
    },
    {
      field: "certificate_number",
      message: "Debe proporcionar un número de certificado válido",
      condition: isNaN(form.certificate_number),
    },
    {
      field: "policy",
      message: "Debe proporcionar una póliza",
      condition: !form.policy,
    },

    {
      field: "way_to_pay",
      message: "Debe proporcionar una forma de pago",
      condition: !form.way_to_pay,
    },
    {
      field: "agreement",
      message: "Debe proporcionar un convenio",
      condition: !form.agreement,
    },
    {
        field: "id_coffin_group",
        message: "Debe proporcionar todos los datos del ataúd",
        condition: !form.id_coffin_group || form.id_coffin_group.length !== 10,
      },
    {
      field: "additional",
      message: "Debe proporcionar Adicional",
      condition: !form.additional,
    },
    {
      field: "present",
      message: "Debe proporcionar Presente de funeral",
      condition: !form.present,
    },
    {
      field: "burial_place",
      message: "Debe proporcionar un Lugar de inhumación",
      condition: !form.burial_place,
    },
    {
      field: "burial_time",
      message: "Debe proporcionar una hora de inhumación válida",
      condition: !form.burial_time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(form.burial_time),
    },
    {
      field: "cladding",
      message: "Debe proporcionar un revestimiento",
      condition: !form.cladding,
    },
    {
      field: "service_improvement",
      message: "Debe proporcionar mejoramiento del servicio",
      condition: !form.service_improvement,
    },
    {
        field: "date",
        message: "Debe proporcionar una fecha",
        condition: isNaN(form.date),
      },
    {
      field: "place",
      message: "Debe proporcionar un lugar",
      condition: !form.place,
    },
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof Request]) {
      createToast("error", message)
      return false;
    }
  }

  return true;
};
