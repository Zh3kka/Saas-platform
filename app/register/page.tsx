import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

async function Register() {
  const session = await getServerSession(authOptions)

  return <div>register page</div>
}

export default Register
