
export default function validation(inputs) {
    const errors = {};
  
    if (inputs.title === "") errors.title = "Falta el titulo!";
    if (inputs.title.length > 0 && inputs.title.length < 140)
      errors.title = `Te quedan ${140 - inputs.title.length} caracteres`;
    if (inputs.title.length > 140)
      errors.title = "El titulo debe tener menos de 140 caracteres";
    if (inputs.healthScore > 100)
      errors.healthScore = "No puede ser mayor a 100";
    if (inputs.summary === "") errors.summary = "Falta una descripcion!";
  
    return errors;
  }