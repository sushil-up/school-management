import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { email, password, localData } = credentials;
        const parsedData = JSON.parse(localData)||[];
        const user = parsedData.find(
          (item) => item.email === email && item.password === password
        );
        if (user) {
          return {
            email: user.email,
            password: user.password,
            role: user.role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          email: user.email,
          password: user.password,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role||"guest",
      };
      return session;
    }
  }, 
});

export { handler as GET, handler as POST };       