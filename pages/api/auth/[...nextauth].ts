import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: 'auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {
      Object.assign(session.user, {
        username: session.user?.name
          ? session.user?.name.split(' ').join('').toLocaleLowerCase()
          : '',
        uid: token.sub ? token.sub : '',
      })
      return session
    },
  },
})
