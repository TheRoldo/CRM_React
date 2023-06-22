import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { agregarCliente  } from '../data/clientes'

export async function action({request}) {
  const  formData = await request.formData()

  const datos = Object.fromEntries(formData)

  const email = formData.get('email')
  const nombre = formData.get('nombre')
  const telefono = formData.get('telefono')

  //Validación
  const errores = []
  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  let regex1 = new RegExp("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$");

  let regex2 = new RegExp("[0-9]{3}[0-9]{2}[0-9]{2}");

  if(!regex.test(email)) {
    errores.push('El Email no es valido')
  }

  if(!regex1.test(nombre)) {
    errores.push('El Nombre no es valido')
  }

  if(!regex2.test(telefono)) {
    errores.push('El Telefono no es valido')
  }

  //Retornar datos si hay errores
  if(Object.keys(errores).length) {
    return errores
  }

  await agregarCliente(datos)

  return redirect('/')
}

function NuevoCliente() {

  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Clientes</h1>
      <p className="mt-3 text-black font-medium uppercase">Llena todos los Campos para registrar un nuevo cleinte</p>

      <div className="flex justify-end">
        <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md" onClick={() => navigate(-1)}>volver</button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10'>

        {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}

        <Form method='POST'>
          <Formulario />

          <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md cursor-pointer' value="Registrar Cliente" />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente
