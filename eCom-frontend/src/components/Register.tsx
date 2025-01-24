export default function Register() {
  return (
    <div className='border p-5 rounded-13 flex flex-col gap-4 items-end'> 
      <div className='flex gap-3 items-center'>
        <label htmlFor='email'>Email</label>
        <input type="email" name='email' placeholder='Enter email' className='rounded-13 border px-3 py-1 hover:ml-1 hover:transition-all' />
      </div>
      <div className='flex gap-3 items-center'>
        <label htmlFor='password'>Password</label>
        <input type="password" name='password' placeholder='Enter password' className='rounded-13 border px-3 py-1 hover:ml-1 hover:transition-all' />
      </div>
      <div className='flex gap-3 items-center'>
        <label htmlFor='password'>Confirm</label>
        <input type="password" name='password' placeholder='Confirm password' className='rounded-13 border px-3 py-1 hover:ml-1 hover:transition-all' />
      </div>
      <button className='bg-black text-white m
      ax-w- px-4 py-2 w-full rounded-60 mx-auto hover:bg-gray-800'>Register</button>
    </div>
  )
}
