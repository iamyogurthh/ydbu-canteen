import { getUserByPhone } from '@/models/user'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const OPTIONS = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        console.log('i am authorizatig')
        console.log(credentials)
        const user = await getUserByPhone(credentials.ph_no)
        if (user && user.password === credentials.password) {
          return user
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
        token.canteen_id = user.canteen_id;
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.sub,
          name: token.name,
          role_id: token.role_id,
          canteen_id : token.canteen_id,
          ph_no: token.ph_no,
        }
      }
      console.log(session);
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
