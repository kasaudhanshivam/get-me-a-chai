
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "@/models/user"


const authOptions = NextAuth ({
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (account.provider == 'github') {
          // connect to the database
          const client = await mongoose.connect(process.env.MONGODB_URI); 
          // // check if the user exists in the database
          const currUser = await User.findOne({ email: user.email });
          // // if the user does not exist, create a new user
          if (!currUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split('@')[0],
            });
            await newUser.save();
            user.name = newUser.username;
          }else{
            user.name = currUser.username;
          }
          return true;
        }
      }
    }
})
export {authOptions as GET, authOptions as POST}