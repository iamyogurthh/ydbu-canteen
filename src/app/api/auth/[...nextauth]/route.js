import { getCanteenById } from '@/models/canteen'
import { getUserByPhone } from '@/models/user'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const OPTIONS = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        console.log('i am authorizing')
        console.log(credentials)
        const user = await getUserByPhone(credentials.ph_no)
        if (user && user.password === credentials.password) {
          const canteen = await getCanteenById(user.canteen_id);
          console.log("canteen is ", canteen)
          return {
            id: user.id,
            name: user.name,
            role_id: user.role_id,
            canteen_id: user.canteen_id,
            canteen_name: canteen?.name,
            ph_no: user.ph_no,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.name = user.name
        token.role_id = user.role_id
        token.ph_no = user.ph_no
        token.canteen_id = user.canteen_id
        token.canteen_name = user.canteen_name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.sub,
          name: token.name,
          role_id: token.role_id,
          canteen_id: token.canteen_id,
          canteen_name: token.canteen_name,
          ph_no: token.ph_no,
        }
      }
      console.log(session)
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }
