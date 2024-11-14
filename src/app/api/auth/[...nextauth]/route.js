import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 30,
          }),
        });

        const data = await res.json();

        if (res.ok && data) {
          return {
            ...data.user,
            username: credentials.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            image: data.image,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            iat: data.iat,
            exp: data.exp,
            jti: data.jti,
          };
        } else {
          throw new Error("CredentialsSignin");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          profileImage: user.profileImage,
          admin: user.admin,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        username: token.username,
        fullName: token.fullName,
        profileImage: token.profileImage,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        admin: token.admin,
        dummyImage: "/assets/images/dummy-profile-img.webp",
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };